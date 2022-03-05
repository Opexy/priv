#include <benchmark/benchmark.h>
#include <array>
#include <thread>
#include "pica_mem.h"

using namespace std;
static void BM_RingBufferUnitTest(benchmark::State &state){
  static const int SZ_RB = 1024*1024;
  static const int SZ_PROVIDERS = 10;
  static const int SZ_ITER = 1024*10;
  static const int SZ_MSGMAX = 64;
  static const int SZ_MSGMIN = 8;
  void *buffer = calloc(sizeof(uint32_t), SZ_RB);
  int64_t head, tip, tail, read;
  auto rb = pica::mem::RingBuffer(buffer, SZ_RB * sizeof(uint32_t), head, tip, tail, read);

  int hash_writer = 0;
  int hash_reader = 0;
  //int total = 0;
  bool done = false;

  auto provider_cb = [&](int ii){
    for(int iter = 0; iter < SZ_ITER; iter++){
      int mlen = 8; //(rand()% (SZ_MSGMAX - SZ_MSGMIN)) + SZ_MSGMIN;
      auto entry = rb.EntryAlloc(mlen*sizeof(uint32_t));
      rb.EntryBeginWrite(entry);
      uint32_t *data = (uint32_t *)rb.EntryData(entry);
      for(int offset = 0; offset < mlen; offset++){
        data[offset] = 3;
        mk_atomic(hash_writer)+= data[offset];
      }
      rb.EntryEndWrite(entry);
    }
  };

  auto receiver_cb = [&](int thread_id){
    pica::mem::RingBuffer::Entry entry;
    while(false == done || rb.HasMore()){
      if(false == rb.TryFetch(entry)){
        this_thread::yield();
        this_thread::sleep_for(50us);
      } else{
        uint32_t *data = (uint32_t*)rb.EntryData(entry);
        int length = entry.DataSize()/4;
        for(int ii = 0; ii < length; ii++){
          assert(data[ii] == 3);
          hash_reader +=data[ii];
        }
        rb.EntryEndRead(entry);
      }
    }
  };

  auto providers = array<std::thread, SZ_PROVIDERS>();
  auto receivers = array<std::thread, 1>();

  auto restart = [&](){
    done = false;
    hash_writer = 0;
    hash_reader = 0;
    for(int ii = 0; ii < size(providers); ii++) {
      auto & p = providers[ii];
      p = thread(provider_cb, ii);
    }
    for(int ii = 0; ii < size(receivers); ii++) {
      auto & r = receivers[ii];
      r = thread(receiver_cb, ii);
    }
  };

  auto waitDone = [&](){
    for(auto & p: providers)
      p.join();
    done = true;
    for(auto &r:receivers)
      r.join();
    assert(hash_writer == hash_reader);
  };
  
  for(auto _:state){
    restart();
    waitDone();
  }

  free(buffer);
  buffer = NULL;
}
BENCHMARK(BM_RingBufferUnitTest);
// Run the benchmark
BENCHMARK_MAIN();
