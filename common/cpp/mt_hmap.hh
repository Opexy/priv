#pragma once
#include <cstdint>
#include <oneapi/tbb.h>
#include <popcntintrin.h>
#include <immintrin.h>
struct alignas(64) hmap32_node {
  uint32_t mCount;
  uint32_t mKeys[7];
  int32_t mNext = 0;
  uint32_t mData[7];
};
template <typename _Size>
inline _Size alignup(_Size num, int align) { return (num + align - 1)/align * align;}
#define ASSFAIL(cond) do {if(cond)(*(int *)1) = 1;} while (0);
// Hash Table, make sense without deleting; rapid deleting and re-inserting is not considered here.
// Rapid modification is furtile without external synchronization.
// Insert conflict is resolved by checking the count field.
template <uint32_t _CAP=114688, uint32_t _EMPTY = 0,
  template<typename Type, typename...> class Container = tbb::concurrent_vector>
struct hmap32_avx2 {
  Container<hmap32_node> nodes;
  //tbb::concurrent_vector<hmap32_node> nodes;
  _inline uint32_t bucketOf(uint32_t key) {return key % HASH_CEIL;}

private:
  static constexpr uint32_t EMPTY = _EMPTY;
  static constexpr uint32_t HASH_CEIL = std::bit_ceil((_CAP + 6) / 7);

  struct iterator {
    //hmap32_node *firstBucket;
    hmap32_node *bucket;
    //uint32_t bucket_base;
    uint32_t count;
    uint8_t subidx;
    _inline void init(hmap32_node *fb){
      //firstBucket = fb;
      bucket = fb;
      count = 0; // doesn't matter
      subidx = 0; // doesn't matter
    }
    _inline uint32_t &wait_for_data() {
      while(subidx >= (count = mk_atomic(bucket->mCount).load())){}
      return bucket->mData[subidx];
    }
    _inline bool hasChanged(){
      return !mk_atomic(bucket->mCount).compare_exchange_weak(count, count);
    }

    /*
    //_inline std::atomic<uint32_t> & mCount(){return mk_atomic(firstBucket->mCount);}
    //_inline bool hasChanged() {return count != firstBucket->mCount;}
    // succeeds: beginning of the write. Caller will call atomic_thread_fence(memory_order_release) and make modifications
    // failed: beginning to read. will read all and then call atomic_thread_fence(memory_order_acquire);

    _inline bool begin_append_or_read(){
      return mCount().compare_exchange_weak(count, count+1, std::memory_order_relaxed, std::memory_order_acquire);
    }
    _inline void release(uint32_t newCount){
      assert(
        mCount().compare_exchange_weak(count, newCount, 
          std::memory_order_release, std::memory_order_relaxed));
      count = newCount;
    }
    _inline void done_reading(){
      std::atomic_thread_fence(std::memory_order_acquire);
    }
    _inline void done_write(){
      std::atomic_thread_fence(std::memory_order_release);
    }*/
  };

  _inline void _find_current(iterator &iter, __m256i & keyvec) {
    iter.count = mk_atomic(iter.bucket->mCount).load();
    auto found = _mm256_cmpeq_epi32(*(__m256i *)iter.bucket, keyvec);
    uint32_t found_mask = _mm256_movemask_epi8(found) >> 4;
    iter.subidx = std::countr_zero(found_mask) >> 2;
    // iter.subidx: 0, 1, 2, 3, 4, 5, 6, 7
  }
  _inline void _find_weak_continue(iterator & iter, __m256i & keyvec) {
    for(;;iter.bucket = &nodes.at(iter.bucket->mNext)){
      _find_current(iter, keyvec);
      if((iter.subidx<=6) || (iter.bucket->mNext <= 0)) {
        return;
      }
    }
  }
  _inline bool _try_create(iterator &iter, uint32_t key, uint32_t data) {
    if(iter.count >= 7) {
      assert(iter.count == 7); // TODO: remove this line
      _append_node(iter);
      iter.bucket = &nodes.at(iter.bucket->mNext);
      iter.count = 0;
      //iter.bucket_base +=7;
      //subidx -=7;
    }
    uint32_t old_key = 0;
    if(mk_atomic(iter.bucket->mKeys[iter.count]).compare_exchange_weak(old_key,key)) {
      // we just want to grab it!
      mk_atomic(iter.bucket->mData[iter.count]).store(data);
      // todo: remove assert.
      auto ret = mk_atomic(iter.bucket->mCount).compare_exchange_weak(iter.count, iter.count+1);
      assert(ret);
      iter.subidx = iter.count;
      iter.count++;
      return true;
    }
    else {
      //iter.wait_for_data() say 10 threads are here... 
      // who knows how long we've been delayed. might as well continue and re-search.
      return false;
    }
  }
  _inline void _append_node(iterator &iter){
    int32_t mNext = 0;
    if(mk_atomic(iter.bucket->mNext).compare_exchange_weak(mNext, -1)){
      auto next = nodes.emplace_back();
      (__m256i &)(*next) = _mm256_set1_epi32(EMPTY);
      next->mCount = 0;
      mk_atomic(iter.bucket->mNext).store(nodes.emplace_back() - nodes.begin());
    } else {
      atom_wait<1000>(iter.bucket->mNext);
    }
  }

public:
  _inline hmap32_avx2(){
    nodes.reserve(HASH_CEIL * 2);
    nodes.resize(HASH_CEIL);
  }
  _inline uint32_t *find(uint32_t key){
    iterator iter;
    __m256i keyvec = _mm256_set1_epi32(key);
    iter.init(&nodes.at(bucketOf(key)));
    _find_weak_continue(iter, keyvec);
    return (uint32_t *)((iter.subidx <= 6) * (size_t)(&iter.bucket->mData[iter.subidx]));
  }

/**
 * @brief append or ignore, return address of data.
 * 
 * @param key 
 * @param data 
 * @return {uint32_t} data associated with key.
 */
  _inline uint32_t& append_or_ignore(uint32_t key, uint32_t data) {
    iterator iter;
    __m256i keyvec = _mm256_set1_epi32(key);
    iter.init(&nodes.at(bucketOf(key)));
    do {
      _find_weak_continue(iter, keyvec);
      if(iter.subidx <= 6) {
        return iter.wait_for_data();
      }
      if(_try_create(iter, key, data)) {
        return iter.bucket->mData[iter.subidx] = data;
      }
    } while(true);
  }
  /**
   * @brief This really needs to be synchronized by timestamp!
   * 
   * @param key 
   * @param data 
   * @return _inline 
   */
  _inline uint32_t& append_or_update(uint32_t key, uint32_t data) {
    iterator iter;
    __m256i keyvec = _mm256_set1_epi32(key);
    iter.init(&nodes.at(bucketOf(key)));
    do {
      _find_weak_continue(iter, keyvec);
      if(iter.subidx <= 6) {
        auto & ret = iter.wait_for_data();
        ret = data;
        return ret;
      }
      if(_try_create(iter, key, data)) {
        return iter.bucket->mData[iter.subidx] = data;
      }
    } while(true);
  }
};


struct alignas(64) hmap32_1_node {
  uint32_t mKeys[8];
  uint32_t mData[8];
};

template <uint32_t _CAP=1048576>
struct hmap32_avx2_1 {
private:
  static constexpr __m256i zerovec = {0};
  static constexpr uint32_t HASH_CEIL = 
    (std::bit_ceil(_CAP) * 8 / 10 >= _CAP ? std::bit_ceil(_CAP) : std::bit_ceil(_CAP*10/8))/8;
  template <bool INSERT, bool UPDATE>
  _inline uint32_t * _find(uint32_t key, uint32_t data) {
    __m256i keyvec = _mm256_set1_epi32(key);
    for(auto nodeIdx = key % HASH_CEIL;; nodeIdx = (nodeIdx + 1)%HASH_CEIL){
      auto & bucket = nodes.at(nodeIdx);
      auto found = _mm256_cmpeq_epi32(*(__m256i *)&bucket, keyvec);
      uint32_t found_mask = _mm256_movemask_epi8(found);
      uint8_t subidx = std::countr_zero(found_mask) >> 2;
      if(subidx <= 7) {
        if constexpr (UPDATE) {
          bucket.mData[subidx] = data;
        }
        return &bucket.mData[subidx];
      } else {
        found = _mm256_cmpeq_epi32(*(__m256i *)&bucket, zerovec);
        found_mask = _mm256_movemask_epi8(found);
        subidx = std::countr_zero(found_mask) >> 2;
        if(subidx <= 7) {
          if constexpr (INSERT) {
            bucket.mKeys[subidx] = key;
            bucket.mData[subidx] = data;
            count++;
            return &bucket.mData[subidx];
          } else {
            return nullptr;
          }
        }
        // else continue;
      }
    }
  }
public:
  std::vector<hmap32_1_node> nodes;
  uint32_t count = 0;
  _inline hmap32_avx2_1(){nodes.resize(HASH_CEIL);}
  _inline uint32_t & append_or_ignore(uint32_t key, uint32_t data) {
    return *_find<true, false>(key, data);
  }
  _inline uint32_t & append_or_update(uint32_t key, uint32_t data) {
    return *_find<true, true>(key, data);
  }
  _inline uint32_t & find(uint32_t key) {
    return *_find<false, false>(key, 0);
  }
};
