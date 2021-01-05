#pragma once
#include <chrono>
#ifndef __FILE_NAME__
#define __FILE_NAME__ __FILE__
#endif

#define STR(...) #__VA_ARGS__

#define mk_atomic(ptr) (*(std::atomic<decltype(ptr)>*)(&ptr))
struct stamp_t {int64_t tick;};
inline static stamp_t nsstamp(){
  // TODO: 
  union {
    struct timespec ts;
    stamp_t ret;
  };
  clock_gettime(CLOCK_REALTIME, &ts); // what the...
  ret.tick = ts.tv_sec * 1000000000 + ts.tv_nsec;
  return ret;
}


template <typename _Ty>
struct sptr{
  typedef _Ty *Ptr;
  _Ty *pme;
  inline sptr(_Ty *ptr=nullptr):pme(ptr){}
  inline operator _Ty *() const{return pme;}
  inline _Ty &operator *()const {return *pme;}
  inline _Ty *operator ->()const {return pme;}
  template <typename Type>
  inline Type *ptras(){return (_Ty *)pme;};
};



/*

/usr/local/include/fmt/core.h:1876: undefined reference to `fmt::v7::vprint(fmt::v7::basic_string_view<char>, fmt::v7::format_args)'

0000000000001d60 T fmt::v7::vprint(fmt::v7::basic_string_view<char>, fmt::v7::format_args)
0000000000001ca0 T fmt::v7::vprint(_IO_FILE*, fmt::v7::basic_string_view<char>, fmt::v7::format_args)
000000000000030d t fmt::v7::vprint(_IO_FILE*, fmt::v7::basic_string_view<char>, fmt::v7::format_args) [clone .cold]


*/