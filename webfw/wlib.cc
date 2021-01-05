//./clang-wasm-debug wlib.cc -o wlib.wasm
//#include "emscripten.h"

//EMSCRIPTEN_KEEPALIVE
// Goal: threads handling I/O, map from integer to...
//#include <stdio.h>
#define wftn(fname) __attribute__((export_name(#fname))) fname

struct add_result{int a, b;};
add_result add(int a, int b) {
  return add_result{a*a + b, b};
}


auto wftn(realadd)(int a, int b){
  return add(a,b);
}

auto wftn(counter)(){
  static int counter = 0;
  return counter++;
}