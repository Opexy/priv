#include <iostream>
#include <benchmark/benchmark.h>
#include "apse_tokenizer.hh"
// build with:
// clang apse_tokenizer_benchmark.cc -o /tmp/program.bin -lpthread -std=c++2a -lstdc++ -g -O3 -lbenchmark -lm

auto to_match = "hello(this is not interesting [ { yet, very in:teresting.}]) /*...*/";
auto tokener = apse_tokener();

static void BM_nore(benchmark::State& state) {
  size_t ntok;
  for (auto _ : state) {
    tokener.parse(to_match);
    ntok = tokener.tokens.size();
  }
  static bool outstr = false;
  if(!outstr) {
    std::cout<<"BM_nore ntok:"<<tokener.tokens.size()<<std::endl;
    for(auto x:tokener.tokens)
      std::cout<<x.type << " " << x.capture<<std::endl;
  }
  outstr = true;
}
BENCHMARK(BM_nore);
BENCHMARK_MAIN();
