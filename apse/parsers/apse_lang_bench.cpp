#include <iostream>
#include <fmt/format.h>
#include "ctre.hpp"
#include <regex>
#include <benchmark/benchmark.h>
#define PCRE2_CODE_UNIT_WIDTH 8
#include <pcre2.h>
#include <re2/re2.h>

//gcc apse_lang.cpp -o /tmp/program.bin -lpthread -std=c++2a -lstdc++ -g -O3 -lbenchmark -lm -lpthread -fPIC -lpcre2-8 -lboost_regex -flto
/*
results:
BM_ctre           190 ns          189 ns      3701811
BM_re            4866 ns         4866 ns       144873
BM_pcre2         9766 ns         9764 ns        71102
*/

//typedef match_result {
// reference that is based on a index-stable manager
// index-stable memory

typedef uint8_t imm_id_t;
struct imem_mgr {
  size_t size;
  size_t max;
  void *data;
  imm_id_t imm_id;
  inline size_t alloc_ptr(size_t chunk){
    reserve(chunk + size);
    auto ret = size;
    size += chunk;
    return ret;
  }
  inline void *get_ptr(size_t ptr){
    return (void*)((size_t)data + ptr);
  }
  inline void clearall(){memset(data, 0, size); size = 0;}
  inline void freeall(){free(data); data = NULL; max = 0; size = 0;}
  inline void reserve(size_t maxsize){
    if(maxsize > max) {
      size_t newmax = max;
      if(newmax != 0) {
        while(newmax < maxsize) newmax *=2;
      } else {
        newmax = maxsize;
      }
      void * newdata = calloc(1, newmax);
      if(data) memcpy(newdata, data, size);
      data = newdata; max = newmax;
    }
  }
};

struct iptr {
  imm_id_t  imm_id:8;
  uint8_t   d8_1;
  uint8_t   d8_2;
  size_t    ptr:40;
};

struct imm_list{
  std::vector<imem_mgr>mems;
  imm_id_t imm_create(size_t initmax){
    auto &ret = mems.emplace_back();
    ret.imm_id = mems.size();
    ret.reserve(initmax);
    return ret.imm_id;
  }
  void *get_ptr(const iptr& ptr){
    return mems[ptr.imm_id-1].get_ptr(ptr.ptr);
  }
  inline iptr alloc_ptr(imm_id_t imm_id, size_t size){
    //assert(imm_id > 0);
    return iptr{imm_id, 0, 0, mems[imm_id-1].alloc_ptr(size)};
  }
};

struct parser:imm_list{
  imm_id_t mem_create, mem_token, mem_traverse;
  inline parser():
    mem_create(imm_create(64*1024)),
    mem_token(imm_create(64*1024)), 
    mem_traverse(imm_create(64*1024)){}
  enum ptr_type_t:uint8_t {
    ptr_token_strv,
    ptr_token_astn_list,
    ptr_token_astn_qualifier,
  };
  ptr_type_t &ptr_type(iptr &ptr){return *(ptr_type_t*)&ptr.d8_1;}
  ptr_type_t &ptr_subtype(iptr &ptr){return *(ptr_type_t*)&ptr.d8_2;}

  enum token_strv_type_t {
    token_strv_type_comment,
    token_strv_type_ws,
    token_strv_type_punct,
    token_strv_type_word, // quoted string is also here.
  };
  struct token_strv{
    static const ptr_type_t type = ptr_token_strv;
    token_strv_type_t token_type;
    std::string_view str;
  };
  enum token_astn_list_type_t {
    token_astn_list_dot,
    token_astn_list_colon,
    token_astn_list_space,
    token_astn_list_comma,
  };
  struct token_astn_list{
    static const ptr_type_t ptr_type = ptr_token_astn_list;
    token_astn_list_type_t list_type;
    std::vector<iptr> children;
  };

  enum token_astn_scope_type_t {
    token_astn_scope_brace,
    token_astn_scope_bracket,
    token_astn_scope_parenthesis,
  };
  struct token_astn_qualifier {
    static const ptr_type_t ptr_type = ptr_token_astn_qualifier;
    iptr list;
  };
  void ingest(const char *src){
  }
  
  struct travn {
    iptr travn_parent; // travn parent
    iptr iself;
  };
};

#define ReTokenStr(name, restr) static auto constexpr name##_str = restr
#define ReToken(name, restr) ReTokenStr(name, restr); \
static auto constexpr name##_ctll = ctll::fixed_string{restr};
#include "apse_lang_defs.hh"
#undef ReToken
/* single string */
static constexpr std::string_view substr(std::string_view str, int start, int count = 0){
  if(count < 0) count = str.length() + count - start;
  else if(count == 0) count = str.length() - 1 - start;
  if(count < 0) count = 0;
  return str.substr(start, count);
}
static auto lexer_str = "("
#define ReToken(name, restr) restr ")|(" 
#include "apse_lang_defs.hh"
#undef ReToken
")";
enum token_type{
  token_invalid = -1,
#define ReToken(name, restr) token_##name, 
#include "apse_lang_defs.hh"
#undef ReToken
  token_max
};
struct token_t {
  token_type type;
  std::string_view capture;
};

class lexer_ctre {
public:
  static token_t next_token(std::string_view strv){
    token_t result = {};
    int type = 0;
    do {
    #define ReToken(name, restr) ReTokenStr(name, restr); \
      auto name##result = ctre::starts_with<name##_ctll>(strv);\
      if(name##result){result.type = (token_type)type; result.capture = name##result.to_view(); break;} \
      type++;
    #include "apse_lang_defs.hh"
    #undef ReToken
    } while(false);
    return result;
  }
};

#include <boost/regex.hpp>
class lexer_boost {
public:
  static inline auto e = boost::regex(std::string(lexer_str), boost::regex_constants::ECMAScript | boost::regex_constants::optimize);
  inline static boost::cmatch m = boost::cmatch();
  inline static token_t next_token(std::string_view strv){
    token_t result = {};
    if(true == boost::regex_search (strv.data(),m,e,
        boost::regex_constants::match_continuous)){
      for(auto ii = 1; ii < m.size(); ii++)
      {
        auto & x = m[ii];
        if(x.length()){
          result.capture = std::string_view(strv.data(), x.length());
          result.type = (token_type)(ii - 1);
        } else {
          
        }
      }
    }
    return result;
  }
};

class lexer_re {
public:
  static inline auto e = std::regex(std::string(lexer_str), std::regex_constants::ECMAScript | std::regex_constants::optimize);
  inline static std::cmatch m;
  inline static token_t next_token(std::string_view strv){
    token_t result = {};
    if(true == std::regex_search (strv.data(),m,e,
        std::regex_constants::match_continuous)){
      for(auto ii = 1; ii < m.size(); ii++)
      {
        auto & x = m[ii];
        if(x.length()){
          result.capture = std::string_view(strv.data(), x.length());
          result.type = (token_type)(ii - 1);
        } else {
          
        }
      }
    }
    return result;
  }
};

#define ReToken(name, restr) \
static const auto name##_re = std::regex(restr, std::regex_constants::ECMAScript | std::regex_constants::optimize);
#include "apse_lang_defs.hh"
#undef ReToken
class lexer_re_simple {
public:
  inline static std::cmatch m;
  inline static token_t next_token(std::string_view strv){
    token_t result = {};
    int type = 0;
    do {
    #define ReToken(name, restr) \
      if(true == std::regex_search (strv.data(),m,name##_re, \
        std::regex_constants::match_continuous)) { \
          result.type = (token_type)type; result.capture = std::string_view(strv.data(), m.length(0));\
          break;\
        } type++;
    #include "apse_lang_defs.hh"
    #undef ReToken
    } while(false);
    return result;
  }
};
class lexer_pcre2{
  static inline int errornumber;
  static inline PCRE2_SIZE erroroffset;
  static inline auto re = pcre2_compile(
    (PCRE2_SPTR8)std::string(lexer_str).c_str(),               /* the pattern */
    PCRE2_ZERO_TERMINATED, /* indicates pattern is zero-terminated */
    0,                     /* default options */
    &errornumber,          /* for error number */
    &erroroffset,          /* for error offset */
    NULL);
  static inline auto match_data = pcre2_match_data_create_from_pattern(re, NULL);
public:
  inline static token_t next_token(std::string_view strv){
    int rc;
    token_t result = {};
    auto to_match = (PCRE2_SPTR8)strv.data();
    rc = pcre2_match(
      re,                   /* the compiled pattern */
      to_match,              /* the subject string */
      strv.length(),       /* the length of the subject */
      0,                    /* start at offset 0 in the subject */
      0,                    /* default options */
      match_data,           /* block for storing the result */
      NULL);
    PCRE2_SIZE *ovector = pcre2_get_ovector_pointer(match_data);
    for (auto i = 1; i < rc; i++)
    {
      PCRE2_SPTR substring_start = to_match + ovector[2*i];
      size_t substring_length = ovector[2*i+1] - ovector[2*i];
      if(substring_length){
        result.type = (token_type)(i-1);
        result.capture = std::string_view(strv.data(), substring_length);
        break;
      }
      //printf("%2d: %.*s\n", i, (int)substring_length, (char *)substring_start);
    }
    return result;
  }
};

class lexer_re2{
  static inline auto re = RE2(lexer_str);
  static inline std::array<std::string_view, token_max> captures = {};
  static inline RE2::Arg * mkarg(int i){
    return new RE2::Arg(&captures[i], [](const char* str, size_t n, void* dest) -> bool {
      *(std::string_view *)dest = std::string_view(str, n);
      return true;
  });

  }
  static inline auto args = std::array<RE2::Arg*, token_max>{
    mkarg(0), mkarg(1), mkarg(2), mkarg(3), mkarg(4)
  };

public:
  inline static token_t next_token(std::string_view strv){
    token_t result = {};
    auto strp = re2::StringPiece(strv);
    if(RE2::ConsumeN(&strp, re, args.data(), args.size())){
      for (auto i = 0; i < token_max; i++){
        if(captures[i].size()){
          result.type = (token_type)i;
          result.capture = std::string_view(strv.data(), captures[i].length());
          break;
        }
      }
    }
    return result;
  }
};


class lexer_nore{
  typedef std::array<char, 256> charr;
  #define initcharr(checkchar) ([]()->charr{\
    charr ret = {};\
    for(auto i = 0; i < 256; i++){\
      if((checkchar)(i))\
        ret[i] = 1;\
    }\
    return ret;\
  })()
  inline static charr isblank = initcharr(std::isblank);
  inline static charr isalnum = initcharr([](int c)->bool {return std::isalnum(c) || c == '_';});
  inline static charr ispunct = initcharr(std::ispunct);
  inline static token_t parseword(const char *begin, const char *end){
    auto iter = begin + 1;
    for(; iter < end; iter++){
      if(!isalnum[*iter]){
        break;
      }
    }
    return token_t{token_word, std::string_view(begin, iter-begin)};
  }
  inline static token_t parseblank(const char *begin, const char *end){
    auto iter = begin + 1;
    for(; iter < end; iter++){
      if(!isblank[*iter]){
        break;
      }
    }
    return token_t{token_word, std::string_view(begin, iter-begin)};
  }
  inline static token_t parsecomment(const char *begin, const char *end){
    auto iter = begin + 2;
    for(; iter < end; iter++){
      if(iter[0] == '/' && *(iter-1) == '*'){
        iter++;
        break;
      }
    }
    return token_t{token_comment, std::string_view(begin, iter-begin)};
  }
  inline static token_t parsestring(const char *begin, const char *end){
    auto iter = begin + 1;
    auto symend = begin[0];
    int nslashes = 0;
    for(; iter < end; iter++){
      if(iter[0] == '\\') {nslashes++; continue;}
      else if(iter[0] == symend && (nslashes & 1) == 0 ){
        iter++;
        break;
      }
      nslashes = 0;
    }
    return token_t{token_comment, std::string_view(begin, iter-begin)};
  }
public:
  inline static token_t next_token(std::string_view strv){
    auto begin = strv.begin(), end = strv.end();
    auto c = *begin;
    if(isalnum[c]){
      return parseword(begin, end);
    } else if(isblank[c]) {
      return parseblank(begin, end);
    } else if(ispunct[c]) {
      if(c == '/' && begin < end - 1 && begin[1] == '*')
        return parsecomment(begin, end);
      else if(c == '"' || c == '\'')
        return parsestring(begin, end);
      else return token_t{token_puncts, std::string_view(strv.data(), 1)};
    } else {
      return token_t{token_invalid};
    }
  }
};

template <class Lexer>
class tokener:public Lexer{
public:
  inline static void tokenize(std::string_view strv, std::vector<token_t> &tokens){
    size_t nomatch = 0;
    while(strv.size()){
      auto token = Lexer::next_token(strv);
      if(token.capture.size()) {
        tokens.push_back(token);
        strv.remove_prefix(token.capture.size());
      } else {
        nomatch++;
        strv.remove_prefix(1);
      }
    }
  }
};
auto to_match = "hello(this is not interesting [ { yet, very in:teresting.}]) /*...*/";
auto tokens  = std::vector<token_t> (1048576);

template <typename Lexer>
void bench(std::string_view strv){
  tokens.clear();
  tokener<Lexer>::tokenize(strv, tokens);
}

static void BM_ctre(benchmark::State& state) {
  for (auto _ : state) {
    bench<lexer_ctre>(to_match);
  }
  static bool outstr = false;
  if(!outstr)std::cout<<"BM_ctre ntok:"<<tokens.size()<<std::endl;
  outstr = true;
}
// Register the function as a benchmark
BENCHMARK(BM_ctre);

static void BM_boost(benchmark::State& state) {
  for (auto _ : state) {
    bench<lexer_boost>(to_match);
  }
  static bool outstr = false;
  if(!outstr)std::cout<<"BM_boost ntok:"<<tokens.size()<<std::endl;
  outstr = true;
}
BENCHMARK(BM_boost);

static void BM_re(benchmark::State& state) {
  for (auto _ : state) {
    bench<lexer_re>(to_match);
  }
  static bool outstr = false;
  if(!outstr)std::cout<<"BM_re ntok:"<<tokens.size()<<std::endl;
  outstr = true;
}
BENCHMARK(BM_re);

static void BM_re_simple(benchmark::State& state) {
  for (auto _ : state) {
    bench<lexer_re_simple>(to_match);
  }
  static bool outstr = false;
  if(!outstr)std::cout<<"BM_re_simple ntok:"<<tokens.size()<<std::endl;
  outstr = true;
}
BENCHMARK(BM_re_simple);

static void BM_pcre2(benchmark::State& state) {
  for (auto _ : state) {
    bench<lexer_pcre2>(to_match);
  }
  static bool outstr = false;
  if(!outstr)std::cout<<"BM_pcre2 ntok:"<<tokens.size()<<std::endl;
  outstr = true;
}
BENCHMARK(BM_pcre2);

static void BM_re2(benchmark::State& state) {
  for (auto _ : state) {
    bench<lexer_re2>(to_match);
  }
  static bool outstr = false;
  if(!outstr)std::cout<<"BM_re2 ntok:"<<tokens.size()<<std::endl;
  outstr = true;
}
BENCHMARK(BM_re2);


static void BM_nore(benchmark::State& state) {
  size_t ntok;
  for (auto _ : state) {
    bench<lexer_nore>(to_match);
    ntok = tokens.size();
  }
  static bool outstr = false;
  if(!outstr) {
    std::cout<<"BM_nore ntok:"<<tokens.size()<<std::endl;
    for(auto x:tokens)
      std::cout<<x.type << " " << x.capture<<std::endl;
  }
  outstr = true;
}
BENCHMARK(BM_nore);



BENCHMARK_MAIN();
#if 0
int main(){
  int errornumber;
  PCRE2_SIZE erroroffset;
  PCRE2_SIZE *ovector;
  int rc;
  const char *lexer_string = lexer_str.data();
  auto re = pcre2_compile(
    (PCRE2_SPTR8)std::string(lexer_str).c_str(),               /* the pattern */
    PCRE2_ZERO_TERMINATED, /* indicates pattern is zero-terminated */
    0,                     /* default options */
    &errornumber,          /* for error number */
    &erroroffset,          /* for error offset */
    NULL);                 /* use default compile context */
  auto match_data = pcre2_match_data_create_from_pattern(re, NULL);
  if(re){
    rc = pcre2_match(
      re,                   /* the compiled pattern */
      (PCRE2_SPTR8)to_match,              /* the subject string */
      sizeof(to_match),       /* the length of the subject */
      0,                    /* start at offset 0 in the subject */
      0,                    /* default options */
      match_data,           /* block for storing the result */
      NULL);
  }
  ovector = pcre2_get_ovector_pointer(match_data);
  printf("\nMatch succeeded at offset %d\n", (int)ovector[0]);
for (auto i = 0; i < rc; i++)
  {
  PCRE2_SPTR substring_start = (PCRE2_SPTR)to_match + ovector[2*i];
  size_t substring_length = ovector[2*i+1] - ovector[2*i];
  printf("%2d: %.*s\n", i, (int)substring_length, (char *)substring_start);
  }
}
#endif
//int main(){
  //bench<lexer_ctre>(to_match);
  //bench<lexer_re>(to_match);
//}