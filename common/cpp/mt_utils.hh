#pragma once

// More recent routines is appended last.
#include <chrono>
#include <string_view>
#include <cstring>
#include <atomic>
#include <thread>
#include <cassert>
#include <cstdint>
#include <oneapi/tbb.h>
#include <cstddef>
#define SIZE_INVALID (-1ULL)
#ifndef HAS_AVX2
#define HAS_AVX2 1
#endif


#define _inline inline __attribute__((always_inline))
static constexpr int POS_INVALID = -1;
#define mk_atomic(r) (*(std::atomic<typename std::remove_reference<decltype(r)>::type> *)(&r))
using namespace std::chrono_literals;

inline std::size_t strcpys(char *dest, std::size_t dest_size, const char *src){
  auto len = std::string_view(dest).length();
  if(len >= dest_size){
    return 1;
  } else {
    std::memcpy(dest, src, len + 1);
    return 0;
  }
}
template <typename Ty, Ty INVALID_VAL = (Ty)-1, int retries_before_sleep = 100>
Ty lock(Ty *atom){
  auto ret = *atom;
  int ii = 0;
  while(mk_atomic(*atom).compare_exchange_weak(ret, INVALID_VAL) != true || ret == INVALID_VAL){
    ii++;
    if(ii == retries_before_sleep){
      ii = 0;
      std::this_thread::sleep_for(1us);
    }
  }
  return ret;
}
inline int __yieldexec_count(int done){
  if(done == -100) {
    std::this_thread::sleep_for(1us);
    done = -1;
  }
  return done;
}
#define YIELDEXEC for(int done = -1; done < 0; done = __yieldexec_count(done))

// so the auto variable goes into the whole if statement.
#define TRYHOLD(var, tmpvar, cond_bypass, val_wait) YIELDEXEC \
if(auto tmpvar = mk_atomic(var).load(); tmpvar != val_wait && (cond_bypass)) \
  break;\
else if(false == mk_atomic(var).compare_exchange_strong(tmpvar, val_wait)) \
  continue;\
else 

template <typename Ty>
void unlock(Ty *atom, const Ty &val){
  mk_atomic(*atom) = val;
}

template <int retries_before_sleep = 100, typename Ty, Ty INVALID_VAL = (Ty)-1>
Ty atom_wait(Ty &atom){
  auto ret = mk_atomic(atom).load();
  int ii = 0;
  while(ret == INVALID_VAL) {
    ret = mk_atomic(atom).load();
    ii++;
    if(ii == retries_before_sleep){
      ii = 0;
      std::this_thread::sleep_for(1us);
    }
  }
  return ret;
}

template <typename Num>
constexpr Num ce_order(Num num) {
  Num max = sizeof(num) * 8;
  if(!num) return 0;
  Num ii;
  for(ii=0; ii < max; ii++){
    if((1 << ii) >= num) return ii;
  }
  return ii;
}

// lock_vector needs to be unsigned
template <typename lv_t=uint32_t, int8_t orders=3, lv_t users=255>
class mt_lockv{
  static const lv_t lv_user = 1 << ce_order(users+1);
  static_assert(users >= 1); // no sense to init lock with users == 1
  static_assert(orders * ce_order(users+1) <= sizeof(lv_t)*8);
  typedef int8_t lvo_t;
  static const lvo_t LV_UNLOCK = 0;
  static const lvo_t LV_READ = 1;
  static const lvo_t LV_WRITE = 2;
  lv_t lv = 0;
public:
  lvo_t lock(lvo_t lvo_new, lvo_t lvo_old = 0, bool exclusive = false){
    auto lv_new = 0 + (lvo_new == 1) + (lvo_new > 1 ) * (lv_user << (lvo_new - 2));
    auto lv_old = 0 + (lvo_old == 1) + (lvo_old > 1 ) * (lv_user << (lvo_old - 2));
    auto &lv_atom = mk_atomic(lv);

    if(lv_old >= lv_new) {
      lv_atom -= (lv_old - lv_new);
      return lvo_new; // downgrade/unlock... sorry but downgraders have priorities.
    }

    auto lv_next = lv_new * lv_user;
    int retries = 0;
    lv_t lv_change = lv_new - lv_old;
    auto lv_cur = lv_atom.load();
    while(lv_cur < lv_next){
      if(exclusive){
        if(lv_cur >= lv_new) // any two person cannot lock... hence exclusive.
          return lvo_old;
        if(true == lv_atom.compare_exchange_strong(lv_cur, lv_cur + lv_change)){
          lv_cur = lv_cur + lv_change;
          while((lv_cur != lv_new) && (lv_cur < lv_next)) {
            retries++;
            if((retries & 0x80) == 0) {
              retries = 0;
              std::this_thread::sleep_for(1us);}
            lv_cur = lv_atom.load();
          }
          if(lv_cur == lv_new) {
            return lvo_new;
          }
          // else retry
          lv_cur = lv_atom.fetch_add(-lv_change) - lv_change;
        }
      } else {
        lv_cur = lv_atom.fetch_add(lv_change) + lv_change;
        if(lv_cur < lv_next) {
            return lvo_new;
        }
        lv_cur = lv_atom.fetch_add(-lv_change) - lv_change;
      }
      //retry: 
      retries++;
      if((retries & 0x80) == 0) {
        retries = 0; 
        std::this_thread::sleep_for(1us);
      }
    }
    return lvo_old;
  }
  inline void unlock(lvo_t &lvo_old) {lvo_old = lock(0, lvo_old);}
  inline lvo_t lock_exclusive(lvo_t lvo_new, lvo_t lvo_old){return lock(lvo_new, lvo_old, true);}
};

template <typename _Ty, std::size_t max>
struct flatmap {
  size_t _count = 0;
  std::array<_Ty, max> _items;

  inline size_t count(){
    size_t ret;
    YIELDEXEC{
      ret = mk_atomic(_count).load();
      if(ret != SIZE_INVALID)break;
    }
    return ret;
  }
  inline size_t indexof(_Ty *item){return item - _items.data();}
  inline _Ty *at(size_t idx){return &_items[idx];}
  template <typename FtnFind>
  inline _Ty *find(FtnFind ftnFind){
    auto cnt = count();
    _Ty *ret = nullptr;
    for(size_t ii = 0; ii < cnt; ii++){
      ret = ftnFind(at(ii));
      if(ret) break;
    }
    return ret;
  }
  template <typename FtnFind, typename FtnNew>
  _Ty *emplace(FtnFind && ftnFind, FtnNew && ftnNew){
    _Ty *ret = find(std::forward<FtnFind>(ftnFind));
    if(!ret) {
      TRYHOLD(_count, cnt, false, SIZE_INVALID){
        for(size_t ii = 0; ii < cnt; ii++)
          if(ret = ftnFind(at(ii)); ret)
            break;
        if(!ret && cnt < max) {
          ret = at(cnt);
          ftnNew(ret);
        }
        mk_atomic(_count) = cnt;
        break;
      }
    }
    return ret;
  }
};

template <typename ET, typename FT, int FB>
struct FlagFields {
  private:
  ET &Elem(int idx){return ((ET *)this)[idx];}
  public:
  typedef ET ElemType;
  static const int ITEMS_PER_ET = sizeof(ET) * 8 / FB;
  struct IdxOff {int idx; int off;};
  static IdxOff PosIdxOff(int pos){return {pos / ITEMS_PER_ET, pos & (ITEMS_PER_ET - 1)};}
  static const ET ALL_OCCUPIED = ET(-1);
  static const ET ET_AVAIL = 0;
  static const ET ET_OCCUPIED = 1;
  
  bool CompareSet(int pos, FT ov, FT nv){
    auto [idx, off] = PosIdxOff(pos);
    auto &elem = mk_atomic(Elem(idx));
    ET ov_shift = (ET)ov << (off * FB);
    ET nv_shift = (ET)nv << (off * FB);
    ET mask = ((1 << FB) - 1) << (off * FB);
    ET test = (elem &~mask ) | ov_shift;
    while(false == elem.compare_exchange_strong(test, (test & ~mask) | nv_shift)){
      if((test & mask) != ov_shift) {
        return false;
      }
    }
    return true;
  }
  ET At(int pos) {
    auto [idx, off] = PosIdxOff(pos);
    auto &elem = mk_atomic(Elem(idx));
    ET mask = ((1 << FB) - 1) << (off * FB);
    return (ET)(elem & mask >> (off * FB));
  }
  int TryAlloc(int posMax){
    for(int base = 0; base < posMax; base+=ITEMS_PER_ET) {
      int idx = base / ITEMS_PER_ET;
      auto &item = Elem(idx);
      if(item != ALL_OCCUPIED) {
        for(int off = 0; off < ITEMS_PER_ET; off++) {
          auto pos = base + off;
          if((pos < posMax) && CompareSet(pos, ET_AVAIL, ET_OCCUPIED)){
            return pos;
          }
        }
      }
    }
    return POS_INVALID;
  }
  int Alloc(int posMax){
    int pos = POS_INVALID, ii = -posMax;
    do {
      pos = TryAlloc(posMax);
      ii+=posMax;
      if(ii > 8192) {
        ii = 0;
        std::this_thread::sleep_for(1us);
      }
    } while (pos == POS_INVALID);
    return pos;
  }
  void Release(int &pos){
    auto ret = CompareSet(pos, ET_OCCUPIED, ET_AVAIL);
    assert(true == ret);
    pos = POS_INVALID;
  };
};

template <typename Elem, int Max>
class LockList{
  private:
  typedef FlagFields<uint64_t, bool, 1> LockIntf_;
  std::array<uint64_t, (Max+63)/64> mBits;
  std::array<Elem, Max> mElems;
  LockIntf_ &LockIntf(){return *(LockIntf_ *)&mBits;}
  public:
  LockList():mBits(),mElems(){}
  LockList(const LockList &) = delete;
  int IndexOf(Elem *elem) {return elem - mElems.begin();}
  Elem *Lock(){int idx = LockIntf().Alloc(Max); return &mElems[idx];};
  Elem * At(int idx) {return &mElems[idx];}
  void Release(Elem *& elem){
    int idx = IndexOf(elem);
    ReleaseIdx(idx);
    elem = NULL;
  }
  void ReleaseIdx(int & idx){LockIntf().Release(idx);}
};

template <int cnt, typename Elem, typename Param>
constexpr auto ConstArray(Elem (&ftn)(Param)){
  std::array<Elem, cnt> ret;
  for(int ii = 0; ii < cnt; ii++){
    ret[ii] = ftn((Param)ii);
  }
  return ret;
}

uint32_t bitmap_decode_ctzll(uint64_t *array, uint32_t start, uint32_t cnt, uint32_t *posOut);
#if (HAS_AVX2==1)
uint32_t bitmap_decode_avx2(uint64_t *array, uint32_t start, uint32_t cnt, uint32_t *posOut);
const auto bitmap_decode = bitmap_decode_avx2;
//const auto bitmap_decode = bitmap_decode_avx2;
#else
const auto bitmap_decode = bitmap_decode_ctzll;
#endif


static constexpr uint8_t VERB_CREATE_OR_IGNORE = 0;
static constexpr uint8_t VERB_CREATE_OR_UPDATE = 1;
static constexpr uint8_t VERB_UPDATE_IF_EXISTS = 2;
static constexpr uint8_t VERB_SEARCH = 3;

#include "mt_hmap.hh"
//#include "mt_unidata.hh"
