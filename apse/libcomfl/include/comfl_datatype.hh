#pragma once
#include <vector>
#define IPTR_INVALID 0
// typed pointer types
enum tp_e{
  #define tpdef(a, ...) a,
  #include "comfl_datatype_defs.hh"
  #undef tpdef
};
struct cfvt_t{
  cfvt_e cfvt:8;
  cfvt_t(cfvt_e _cfvt = cfvt_invalid):cfvt(_cfvt){};

  static const constexpr char* const cfvtstrs[] = {
    #define cfvtdef(a, ...) STR(a),
    #include "comfl_datatype_defs.hh"
    #undef cfvtdef
  };
  inline const static constexpr char* cfvtname(cfvt_e cfvt){
    return cfvtstrs[cfvt];
  }
};
// 
template <typename Ty, typename iptr_t = int64_t>
struct cfv_pp:cfv_p{
  template <typename... Args>
  inline ptr_t create(Args&&... args){return bank().push_back(new Ty(std::forward<Args>(args)...))}
  inline static ptr_t at(int64_t idx){return ptr_t{idx};}

  // forget about cache line mgmt and concurrency for now... use alloc can resolve...
  inline static std::vector<Ty *> & bank() {
    static std::vector<Ty *> _bank; //todo
    return _bank;
  }

  iptr_t idx = IPTR_INVALID; // don't trust 0 to being valid...
  inline Ty *ptr(){return bank()[idx];}
  Ty *operator ->(){return ptr();}
  inline Ty &operator *()const {return *ptr();}
}; // root level banks regarding items

struct cfv_p:sptr<cfvt_t>{
  using sptr::sptr;
  template<typename Val>
  inline cfv_p(Val && val){setVal(val);}
  inline cfvt_e cfvt(){return pme?pme->cfvt:cfvt_invalid;}
  void push(cfv_p cfv);
  void set(const std::initializer_list<cfv_p> &val);
  void set(int64_t val);
  void set(double val);
  void set(const std::string &val);
  cfv_p at(size_t pos);
  inline int64_t asi56(){
    int64_t ret = 0;
    if(pme) ret = *(int64_t *)pme >> 8;
    return ret;
  }
  // virtual functions here.
};
typedef cfv_p Cfv;
