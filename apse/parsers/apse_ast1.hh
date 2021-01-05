#pragma once
/**
 * @file apse_ast1.hh
 * @author Mi Chen (you@domain.com)
 * @brief parses language into 1st level AST.
 * @details constructs tokens into first-level layered ast. 
 * 
 * @copyright Copyright (c) 2020 Mi Chen ALL RIGHTS RESERVED
 * 
 */
#include <boost/variant2/variant.hpp>
#include <memory>
#include "fmt/format.h"
#include "frozen/unordered_map.h"
#include "apse_tokenizer.hh"
using namespace std;
#ifndef DEBUG
#define INLINE inline
#else
#define INLINE
#endif
template <typename A, typename... Args>
INLINE bool equalsin(A &&a, Args&&... args){
  return ((a == args) || ...);
}

#define ast1_member
struct apse_ast1{
  INLINE apse_ast1(){}
  struct asn_list_op {
    int32_t opchar;
    int32_t oporder; // 0 means immediately associative,
                     // higher order means wait until all others.
                     // higher order will be closer to the ast root.
    bool operator ()() const{return opchar;}
  };
  struct asn_scope_op{
    int32_t ch_open;
    int32_t ch_close;
    template <typename Char>
    bool operator == (Char ch) const{
      return (ch == ch_open) || (ch == ch_close) || 
      (ch == ((Char)ch_open << 8) + (Char)ch_close) ||
      (ch == ((Char)ch_close << 8) + (Char)ch_open);
    }
  };
  struct asn_invalid_op{bool this_is_valid;};
  typedef boost::variant2::variant<asn_list_op, asn_scope_op, asn_invalid_op> asn_op;
  static constexpr frozen::unordered_map<int32_t, asn_op, 15> asn_ops = 
  {
    {';',asn_list_op{';', 8}},
    {' ',asn_list_op{' ', 7}},
    {',',asn_list_op{',', 6}},
    {':',asn_list_op{':', 5}},
    {'.',asn_list_op{'.', 4}},
    {'+',asn_list_op{'+', 3}},
    {'-',asn_list_op{'-', 3}},
    {'*',asn_list_op{'*', 2}},
    {'/',asn_list_op{'/', 2}},
    // cannot be 0.
    
    {'{',asn_scope_op{'{', '}'}},
    {'}',asn_scope_op{'{', '}'}},
    {'[',asn_scope_op{'[', ']'}},
    {']',asn_scope_op{'[', ']'}},
    {'(',asn_scope_op{'(', ')'}},
    {')',asn_scope_op{'(', ')'}},
  };
  static INLINE constexpr asn_op asn_get_op(char ch){
    try{
      return asn_ops.at(ch);
    }catch(const std::out_of_range& oor){
      return asn_op(asn_invalid_op{true});
    }
  }
  static INLINE constexpr asn_list_op asn_get_list_op(char ch){
    return boost::variant2::get<asn_list_op>(asn_get_op(ch));
  }
  static INLINE constexpr asn_scope_op asn_get_scope_op(char ch){
    return boost::variant2::get<asn_scope_op>(asn_get_op(ch));
  }

  typedef long unsigned int size_t;
  // abstract syntax node
  struct asn;
  typedef std::shared_ptr<asn> asnptr;
  typedef std::vector<asnptr> asnptrlist;
  std::vector<asnptr> sources;
  struct asn_scope{
    asn_scope_op op;
    asnptr scope_content;
    std::string scope_op() const {return {(char)op.ch_open, (char)op.ch_close};}
  };
  struct asn_source:asn_scope{
    template <typename Name, typename Uri, typename Text>
    INLINE asn_source(Name name_, Uri uri_, Text text_):
      name(name_),uri(uri_),text(text_){}
    std::string name;
    std::string uri;
    std::string text;
  };
  struct asn_list{
    asn_list(asn_list_op op_):op(op_){}
    asn_list_op op;
    std::vector<asnptr> items;
    void setidx(size_t idx, asnptr item){
      if(items.size() <= idx) {
        items.resize(idx+1);
      }
      items[idx] = item;
    }
    std::string list_op()const{return {(char)op.opchar};}
  };
  struct asn_word{
    std::string_view text;
  };

  typedef boost::variant2::variant<asn_source, asn_scope, asn_list, asn_word> asn_variant;
  struct asn{
    asn_variant asnv;
    INLINE asnptrlist arr(){
      if(auto sc = scope(); sc){
      return sc->scope_content ? asnptrlist{sc->scope_content}:asnptrlist();
    } else if(auto ls = list(); ls){
      return ls->items;
    } else
      return asnptrlist();
    }
    INLINE std::string str(){
      if(auto ls = list();ls){
      return ls->list_op();
    } else if(auto sc = scope(); sc) {
      return sc->scope_op();
    } else if(auto w = word(); w){
      //cout<<word->text<<endl;
      return std::string(w->text);
    } else
      return "";
    }
    INLINE asn(asn_source &&src):asnv(src){}
    INLINE asn(const asn_scope &&scope):asnv(scope){}
    INLINE asn(const asn_list &&init):asnv(init){}
    INLINE asn(const asn_word &&init):asnv(init){}

    INLINE asn_source *source(){return boost::variant2::get_if<asn_source>(&asnv);}
    INLINE asn_scope *scope(){
      auto ret = boost::variant2::get_if<asn_scope>(&asnv);
      if(!ret) ret = (asn_scope *)source();
      return ret;
    }
    INLINE asn_list *list(){return boost::variant2::get_if<asn_list>(&asnv);}
    INLINE asn_word *word(){return boost::variant2::get_if<asn_word>(&asnv);}
  };

  struct travn {
    asnptr node;
    int opcount; // for operator
    INLINE int list_misses(){
      if(auto list = node->list(); list && list->op.opchar != ' ')
        return opcount + 1 - list->items.size();
      else
        return 0;
    }
    INLINE void list_add_missing_operands(){
      if(auto misses = list_misses()){
        for(auto i = 0; i < misses; i++){
          list()->items.push_back(NULL);
        }
      }
    }
    INLINE asn_list *list(){return node->list();}
    INLINE asn_scope *scope(){return node->scope();}
    asnptr list_back(){
      if(auto l = list(); l) return l->items.back();
      else return NULL;
    }
    INLINE asn_list *listtokenizer_back_as_list(){
      if(auto lb = list_back(); lb) return lb->list();
      else return NULL;
    }
    INLINE int list_oporder(){
      if(auto l = list(); l)
        return l->op.oporder;
      else return 0;
    }
  };
  typedef apse_tokener<>::token_t token_t;
  struct travstack {
    std::vector<travn> list;
    auto operator ->(){return &list.back();}
    travn & operator *(){return list.back();}
  };
  
  asnptr ingest(const char *text){
    // creating source
    travstack stack;
    auto srcnode = std::make_shared<asn>(asn_source("","", text));
    auto src = srcnode->source();
    sources.push_back(srcnode);
    stack.list.push_back({srcnode, 0});
    auto tokener = apse_tokener(src->text);
    for(auto token:tokener.tokens){
      if(equalsin(token.type, token_invalid, token_comment, token_ws))
        continue;
      else if(equalsin(token.type, token_word, token_string)) 
        ingest_word(stack, token);
      else if(token.type == token_punct)
        ingest_punct(stack, token);
      else
        assert(false);
    }
    return srcnode;
  }

  static INLINE std::string asnptr_type(asnptr ptr){
    if(!ptr) return "NULL";
    else if(auto list = ptr->list();list){
      return "asn_list";
    } else if(auto source = ptr->source(); source) {
      return "asn_source";
    } else if(auto scope = ptr->scope(); scope) {
      return "asn_scope";
    } else if(auto word = ptr->word(); word){
      return "asn_word";
    } else
      return "asn_unknown";
  }
  static INLINE std::string asnptr_str(asnptr ptr){
    if(!ptr) return ""; else return ptr->str();
  }
  static INLINE asnptrlist asnptr_arr(asnptr ptr){
    if(!ptr) return asnptrlist(); else return ptr->arr();
  }
  // defined in apse_ast1.cc, compiler option add -lfmt
  static ast1_member void print(fmt::memory_buffer &mem, asnptr node, int indent, const char *suffix);
  static ast1_member std::string print(asnptr node);
private:
  // add asnptr_new to scope
  INLINE static void scope_add_asn(travstack &stack, asnptr asnptr_new){
    if(auto scope = stack->node->scope(); scope){
      if(!scope->scope_content && (asnptr_new->word() || asnptr_new->scope())){
        // scope doesn't have a content and newscope is a scope
        scope->scope_content = asnptr_new;
      } else {
        assert(!scope->scope_content->list());
        auto asnptr_list = asnptr_new;
        auto list = asnptr_new->list();
        if(!list) {
          asnptr_list = std::make_shared<asn>(asn_list(asn_get_list_op(' ')));
          list = asnptr_list->list();
          list->setidx(1, asnptr_new);
        }
        // if asnptr_new is a list, even if the scope has nothing, 
        // need to insert null to the beginning of its list.
        list->setidx(0, scope->scope_content); // not portable...
        scope->scope_content = asnptr_list;
      }

      auto content = scope->scope_content;

      if(content->word()){
        return;
      } else if(auto sc = content->scope(); sc){
        stack.list.push_back({content, 0});
      } else if(auto ls = content->list(); ls){
        stack.list.push_back({content, 1}); // ' ' will not care about how many spaces...
        if(asnptr_new->scope()){
          stack.list.push_back({asnptr_new, 0});
        }
      } else {
        assert(false);
      }
    } else {
      assert(false);
    }
  }
  INLINE static void replace_last(travstack &stack, asn_list_op op){
    auto asnptr_op = std::make_shared<asn>(asn_list(op));
    if(auto list = stack->list(); list){
      assert(stack->list_misses() == 0);
      auto ptr0 = stack->list_back();
      list->items.pop_back();
      list->items.push_back(asnptr_op);
      asnptr_op->list()->setidx(0, ptr0);
    } else if(auto scope = stack->scope(); scope){
      auto ptr0 = scope->scope_content;
      asnptr_op->list()->setidx(0, ptr0);
      scope->scope_content = asnptr_op;
    }
    stack.list.push_back({asnptr_op, 1});
  }
  INLINE static void ingest_list_op(travstack &stack, asn_list_op op){
    auto &node = stack.list.back();
    if(auto list = stack->list(); list){
      while(stack->list_misses()){
        assert(stack->list_misses() == 1);
        list->items.push_back(NULL);
      }
      if(list->op.opchar == op.opchar) {
        node.opcount++;
      } else {
        if(stack->list_oporder() > op.oporder){
          replace_last(stack, op);
        }
        else {
          stack->list_add_missing_operands();
          stack.list.pop_back();
          return ingest_list_op(stack, op);
        }
      }
    } else if(auto scope = stack->scope(); scope){
      replace_last(stack, op);
    }
  }
  INLINE static void ingest_asn(travstack &stack, asnptr asnptr_ingest){
    bool done = false;
    while(!done){
      auto node = &stack.list.back();
      if(auto list = node->node->list(); list) {
        if(stack->list_misses() || list->op.opchar == ' ') {
          assert(!asnptr_ingest->list());
          list->items.push_back(asnptr_ingest);
          if(asnptr_ingest->scope()){
            stack.list.push_back({asnptr_ingest, 0});
          }
          done = true;
        } else {
          ingest_list_op(stack, asn_get_list_op(' '));
          continue;
        }
      } else if(auto scope = node->node->scope(); scope){
        scope_add_asn(stack, asnptr_ingest);
        done = true;
      }
    }
    if(asnptr_ingest->scope()){
      //stack.list.push_back({asnptr_ingest, 0});
    } else if(asnptr_ingest->word()){

    } else {
      assert(false);
    }
  }
  INLINE static void ingest_word(travstack &stack, const token_t &token){
    auto asnptr_word = std::make_shared<asn>(asn_word{token.capture});
    ingest_asn(stack, asnptr_word);
  }

  INLINE static void ingest_punct(travstack &stack, const token_t &token){
    auto opchar = token.capture[0];
    auto op = asn_get_op(opchar);
    if(auto listop = boost::variant2::get_if<asn_list_op>(&op); listop) {
      ingest_list_op(stack, *listop);
    } else if(auto scopeop = boost::variant2::get_if<asn_scope_op>(&op); scopeop){
      if(opchar == scopeop->ch_open){
        auto asnptr_scope = std::make_shared<asn>(asn_scope{*scopeop, nullptr});
        ingest_asn(stack, asnptr_scope);
      } else if(opchar == scopeop->ch_close) {
        auto scope = stack->scope();
        while(!scope && stack.list.size()){
          if(stack->list()){
            stack->list_add_missing_operands();
          }
          stack.list.pop_back();
          scope = stack->scope();
        }
        assert(scope);
        assert(scope->op.ch_close == scopeop->ch_close);
        stack.list.pop_back();
      }
    }
  }
};
