#include "mt_utils.hh"

#include <unordered_map>
#include <benchmark/benchmark.h>
#include <tsl/robin_map.h>
#include <cstdlib>
#include <iostream>
#include <sparsehash/sparse_hash_map>
#include <sparsehash/dense_hash_map>
#include "linearprobing.h"
#define COUNT 104857600

#define BM_MT_MAP_1
#define BM_TBB_MAP
#define BM_DENSE_MAP
#define BM_CUDA_MAP

#define RAND (((unsigned)rand() >>2 ) + 1)
//#define RAND (((unsigned)ii) + 1)
auto seed = std::time(0);
#define SRAND std::srand(seed)

#define NTH 4

template <int CNT, class Ftn>
static void run(Ftn&&ftn){
  SRAND;
  if constexpr (CNT == 1) {
    ftn(CNT, 0);
  } else {
    std::thread threads[CNT];
  for(int ii = 0; ii < CNT; ii++)
    threads[ii] = std::thread(ftn, CNT, ii);
  for(auto &th:threads)
    th.join();
  }
  
}

#ifdef BM_MT_MAP
auto mt_map = hmap32_avx2<COUNT>();
static void __attribute__ ((noinline)) bm_mt_map(){
  run<NTH>([](int nth, int th){
    (void)th;
    auto size = (COUNT + nth - 1) / nth;
    for(int ii = 1; ii <= size; ii++){
      mt_map.find(RAND);
    }
  });
}
static void BM_mt_map(benchmark::State& state) {
  SRAND;
  for(int ii = 1; ii <= COUNT; ii++){
    mt_map.append_or_update(RAND,ii);
  }

  for (auto _ : state) {
    bm_mt_map();
  }
}
BENCHMARK(BM_mt_map);
#endif
#ifdef BM_MT_MAP_1
// single-threaded fast hasher
auto mt_map_1 = hmap32_avx2_1<COUNT>();
static void __attribute__ ((noinline)) bm_mt_map_1(){
  run<NTH>([](int nth, int th){
    (void)th;
    auto size = (COUNT + nth - 1) / nth;
    for(int ii = 1; ii <= size; ii++){
      mt_map_1.find(RAND);
    }
  });
}

static void BM_mt_map_1(benchmark::State& state) {
  SRAND;
  for(int ii = 1; ii <= COUNT; ii++){
    mt_map_1.append_or_update(RAND,ii);
  }

  for (auto _ : state) {
    bm_mt_map_1();
  }

  std::cout<<mt_map_1.count<<std::endl;
}
BENCHMARK(BM_mt_map_1);
#endif

#ifdef BM_TBB_MAP
auto std_map = std::unordered_map<uint32_t, uint32_t>(COUNT);
static void __attribute__ ((noinline)) bm_tbb_map(){
  run<NTH>([](int nth, int th){
    (void)th;
    auto size = (COUNT + nth - 1) / nth;
    for(int ii = 1; ii <= size; ii++){
      tbb_map.emplace(RAND,ii);
    }
  });
}
static void BM_tbb_map(benchmark::State& state) {
  for (auto _ : state) {
    bm_tbb_map();    
  }
}
BENCHMARK(BM_tbb_map);
#endif 
#ifdef BM_STD_MAP
auto tbb_map = tbb::concurrent_hash_map<uint32_t, uint32_t>(COUNT);
static void __attribute__ ((noinline)) bm_std_map(){
  run<1>([](int nth, int th){
    (void)th;
    auto size = (COUNT + nth - 1) / nth;
    for(int ii = 1; ii <= size; ii++){
      std_map.emplace(RAND,ii);
    }
  });
}
static void BM_std_map(benchmark::State& state) {
  for (auto _ : state) {
    bm_std_map();    
  }
}
BENCHMARK(BM_std_map);
#endif
#ifdef BM_ROBIN_MAP
auto robin_map = tsl::robin_map<uint32_t, uint32_t>(COUNT);
static void __attribute__ ((noinline)) bm_robin_map(){
  run<1>([](int nth, int th){
    (void)th;
    auto size = (COUNT + nth - 1) / nth;
    for(int ii = 1; ii <= size; ii++){
      robin_map.find(RAND,ii);
    }
  });
}
static void BM_robin_map(benchmark::State& state) {
  SRAND;

  for (auto _ : state) {
    for(uint32_t ii = 1; ii <= COUNT; ii++){
      robin_map.emplace(RAND,ii);
    }
  }
}
BENCHMARK(BM_robin_map);
#endif

#ifdef BM_SPARSE_MAP
auto sparse_map = google::sparse_hash_map<uint32_t, uint32_t>(COUNT);
static void __attribute__ ((noinline)) bm_sparse_map(){
  run<1>([](int nth, int th){
    (void)th;
    auto size = (COUNT + nth - 1) / nth;
    for(int ii = 1; ii <= size; ii++){
      uint32_t key = RAND;
      sparse_map.find(key);
    }
  });
}
static void BM_sparse_map(benchmark::State& state) {
  SRAND;

  for (auto _ : state) {
    for(uint32_t ii = 1; ii <= COUNT; ii++){
      sparse_map[RAND] = ii;
    }
  }
}
BENCHMARK(BM_sparse_map);
#endif

#ifdef BM_DENSE_MAP
auto dense_map = google::dense_hash_map<uint32_t, uint32_t>(COUNT);
static void __attribute__ ((noinline)) bm_dense_map(){
  run<1>([](int nth, int th){
    (void)th;
    auto size = (COUNT + nth - 1) / nth;
    for(int ii = 1; ii <= size; ii++){
      uint32_t key = RAND;
      dense_map.find(key);
    }
  });
}
static void BM_dense_map(benchmark::State& state) {
  dense_map.set_empty_key(0);
  SRAND;

  for (auto _ : state) {
    for(uint32_t ii = 1; ii <= COUNT; ii++){
      dense_map[RAND] = ii;
    }
  }
}
BENCHMARK(BM_dense_map);
#endif

#ifdef BM_CUDA_MAP
auto cuda_kvs = std::vector<KeyValue>();

KeyValue* cuda_map = create_hashtable();
static void __attribute__ ((noinline)) bm_cuda_map(){
  run<1>([](int nth, int th){
    (void)th;
    auto size = (COUNT + nth - 1) / nth;
    const uint32_t num_insert_batches = 16;
    uint32_t num_inserts_per_batch = (uint32_t)cuda_kvs.size() / num_insert_batches;
    for (uint32_t i = 0; i < num_insert_batches; i++)
    {
      insert_hashtable(cuda_map, cuda_kvs.data() + i * num_inserts_per_batch, num_inserts_per_batch);
    }
  });
}
static void BM_cuda_map(benchmark::State& state) {
  cuda_kvs.resize(COUNT);
  SRAND;
  for(uint32_t ii = 1; ii <= COUNT; ii++){
    cuda_kvs[ii] = {RAND, ii};
  }

  for (auto _ : state) {
    bm_cuda_map();
  }
}
BENCHMARK(BM_cuda_map);
#endif
BENCHMARK_MAIN();
