#include <unordered_set>
#include <atomic>
using namespace std;

#define SAGEN_RUNTIME_IMPL;
#include "sagen_runtime.hh"
namespace sr{

// SrEntryType
enum ElemType{
  ET_UNDEFINED,
  ET_Int32,
  ET_Int64,
  ET_Fp32,
  ET_Fp64,
  ET_UniqueArray,
  ET_ArrayBuilder,
};
// Array Element

struct Srae {
private:
  template <typename DT>
  inline void _setData(ElemType et, const DT & data){
    static_assert(sizeof(DT) >= sizeof(data));
    this->et = et;
    this->data = 0;
    *(DT *)this->data = data;
  }
protected:
template <typename DT>
  inline Srae(ElemType et, const DT & data){_setData(et, data);}
public:
  ElemType et;
  uint64_t data;
  inline Srae(int32_t val){_setData(ET_Int32, val);}
  inline Srae(int64_t val){_setData(ET_Int64, val);}
  inline Srae(float val){_setData(ET_Fp32, val);}
  inline Srae(double val){_setData(ET_Fp64, val);}
};



}