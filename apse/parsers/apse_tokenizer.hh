
#pragma once
#include <array>
#include <vector>
#include <string_view>
#include <cctype>
enum token_type:uint8_t{
  token_invalid = 0,
  token_comment,
  token_word,
  token_string,
  token_punct,
  token_ws,
  token_max
  // TODO: add number/IP address
};

template <typename Char=char>
class lexer_nore{
public:
  typedef Char _Char;
  typedef std::basic_string_view<Char> string_view;
  struct token_t {
    token_type type;
    string_view capture;
  };
  inline static token_t next_token(string_view strv){
    auto begin = strv.begin(), end = strv.end();
    auto c = *begin;
    auto cht = chtype(c);
    if(token_word == cht){
      return parseword(begin, end);
    } else if(token_ws == cht) {
      return parseblank(begin, end);
    } else if(token_punct == cht) {
      if(c == '/' && begin < end - 1 && begin[1] == '*')
        return parsecomment(begin, end);
      else if(c == '"' || c == '\'')
        return parsestring(begin, end);
      else return token_t{token_punct, string_view(strv.data(), 1)};
    } else {
      return token_t{token_invalid, string_view(strv.data(), 1)};
    }
  }

private:
  typedef std::array<token_type, 256> chtarr_t ; // not a mistake.
  inline static chtarr_t initchtarr(){
    chtarr_t ret = {};
    for(auto i = 0; i < 256; i++) {
      if(i >= 128) ret[i] = token_invalid;
      else if(std::isalnum(i) || i == '_') ret[i] = token_word;
      else if(std::isblank(i)) ret[i] = token_ws;
      else if(std::ispunct(i)) ret[i] = token_punct;
      else ret[i] = token_invalid;
    }
    return ret;
  }
  inline static chtarr_t chtarr = initchtarr();
  inline static token_type chtype(Char ch){
    return chtarr[(uint8_t)ch];
  }
  inline static token_t parseword(const Char *begin, const Char *end){
    auto iter = begin + 1;
    for(; iter < end; iter++){
      if(token_word != chtype(*iter)){
        break;
      }
    }
    return token_t{token_word, string_view(begin, iter-begin)};
  }
  inline static token_t parseblank(const Char *begin, const Char *end){
    auto iter = begin + 1;
    for(; iter < end; iter++){
      if(*iter != *begin){
        break;
      }
    }
    return token_t{token_ws, string_view(begin, iter-begin)};
  }
  inline static token_t parsecomment(const Char *begin, const Char *end){
    auto iter = begin + 2;
    for(; iter < end; iter++){
      if(iter[0] == '/' && *(iter-1) == '*'){
        iter++;
        break;
      }
    }
    return token_t{token_comment, string_view(begin, iter-begin)};
  }
  inline static token_t parsestring(const Char *begin, const Char *end){
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
    return token_t{token_string, string_view(begin, iter-begin)};
  }
};

template <typename Char = char, typename Lexer =lexer_nore<Char>>
struct apse_tokener{
  typedef Char _Char;
  typedef Lexer _Lexer;
  typedef typename Lexer::token_t token_t;
  typedef typename Lexer::string_view string_view;
  string_view strv;
  std::vector<token_t> tokens;
  int errors = 0;

  inline apse_tokener():tokens(1024){};
  template <typename...Args>
  inline apse_tokener(Args&&... args):apse_tokener(){
    parse(string_view(std::forward<Args>(args)...));
  }
  inline apse_tokener *parse(string_view str){
    this->strv = str;
    tokens.clear();
    errors = 0;
    while(strv.size()){
      auto token = Lexer::next_token(strv);
      if(token.capture.size()) {
        tokens.push_back(token);
        strv.remove_prefix(token.capture.size());
      } else {
        errors++;
        strv.remove_prefix(1);
      }
    }
    return this;
  }
};
// auto tokener = apse_tokener(); tokener.parse("hello world");