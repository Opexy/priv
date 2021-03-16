#pragma once

#include <string_view>
#include <cstddef>
#include <functional>

#ifdef SAGEN_RUNTIME_IMPL
#define MT_UTILS_IMPL
#endif
#include "mt_utils.hh"

#define ftn []
#define var auto



struct NoCopy{
  NoCopy() = delete;
  NoCopy(const NoCopy &) = delete;
};

typedef int32_t i32;
typedef int64_t i64;
namespace sr{
// Enum Fields
/*GEN++
gen = `
struct Var {
  enum Name{
    enum Nona;
    bool None;
    enum ; 
    enum ;
    enum ;
  }
  enum.flag a:flag;
  enum., b:flag, c:field, {}
  enum IntegerValType {
    val Notagroup=1,
    val Notagroup=2,
    val Notagroup=3,
  };
  enum.group {
    enum.elem a {name=""};
    enum.elem b;
    enum.flag c,d,e;
  }
  enu.flag ahhead features{
  }
  enum x features{
    a.init = true;
    b.init = true;
    field x;
    field y;
  };
  enum y {c:true, d:true} features{
    get<x>
  };
  enum c {d:true, e:true} features {
  };
};
`;
*/
//oh no//GEN--
struct Vm;
enum Otype {
  OtUndefined=0,
  OtFci,
  VT_SLOT, // belongs to an ACTOR
  VT_STRING, // belongs to an ACTOR
  VT_I64,
  VT_FP64,
  VT_BLOB,
  VT_LID, // Local (Resource Manager ID)
  OtMax
};
struct Ohdr;

struct OtInfo {
  uint32_t szConst;
  uint32_t (*szDyn)(Ohdr &hdr);
};
extern OtInfo _otiArr[OtMax];
// Flow Context Information

struct Optr {
  Ohdr &hdr;
  OtInfo &oti;
  inline Optr(Ohdr &hdr, Otype ot):hdr(hdr),oti(_otiArr[hdr.ot]){};
  inline size_t size(){return oti.szConst ? oti.szConst: oti.szDyn(hdr);}
};

struct Ohdr {
  Otype ot;
  Optr self(){return Optr(*this, ot);}
  inline size_t size(){return self().size();}
};

struct Fci:Ohdr {
  inline Fci(){ot = OtFci;}
};

struct SingleQueueActor{
  static SingleQueueActor * create();
  void addTask(Ohdr *hdr);
  void checkAndRunOne();
};


#ifdef SAGEN_RUNTIME_IMPL
OtInfo _otiArr[OtMax];
#endif 
// Feature bits
}
