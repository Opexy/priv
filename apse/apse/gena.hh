#pragma once
#ifndef gena_hh
#define gena_hh
#include <cstdint>
// context flow class
typedef int64_t flid; // flow id
//typedef instid
static const flid ID_UNKNOWN = 0;
flid gena_last();
flid gena_init_with(flid cls, flid cur);
flid gena_done_with(flid cur);

inline flid gena_init(flid cls) {return gena_init_with(cls, gena_last());}
inline flid gena_done(){return gena_done_with(gena_last());}
void SystemStart();

#ifdef _GENA_IMPL
// memory leak mode (always inc) vs slow mode (hashish) vs unsafe mode (reusing id)...
#include "../libcomfl/include/comfl_concurrency.hh"
template <typename Ty, int MAX>
struct mtarr{
  flid count = 1; // wasted a spot...
  Ty items[MAX];
  inline flid mkidx(){auto ret = mk_atomic(count).fetch_add(1); assert(ret < MAX); return ret;}
  inline Ty *mk(){return items[mkidx()];}
  inline Ty &operator [](flid id){return items[id];}
  inline size_t indexof(const Ty *item) const {return item - &items[0];}
};

// global gena inst
struct ginst{
  flid dynpre;// dynamic predecessor
  flid cls;
  inline flid id();
};
mtarr<ginst, 1048576> iarr; // just proto code...
inline flid ginst::id(){return iarr.indexof(this);}

struct gcls{
  // ... code...
  void *impl;
};
mtarr<gcls, 1048576> carr;
static thread_local flid ilast;
void SystemStart(){}
flid gena_last(){
  return ilast;
}
flid gena_init_with(flid cls, flid cur){
  auto &gi = *iarr.mk();
  gi.cls = cls;
  gi.dynpre = cur;
  if(cur == ilast){
    ilast = gi.id();
  }
}
flid gena_done_with(flid cur){
  flid ret = iarr[cur].dynpre;
  if(cur == ilast){
    ilast = ret;
  }
  return ret;
}

#endif /* _GENA_IMPL

/*  [[[cog
spec = readFromFile("gencode/test.gena");
codeout(spec);
]]]*/
//done
//[[[end]]] (checksum: 392e1ea7b124a272e877aa369664fa9d)
// will generate:
#if 1
namespace cls {
  class ki{
  public:
    template<typename Type>
    Type as(){};
  };
  template <typename Type>
  class list:ki{
    Type as(){};
  };
  class AppWin:public ki{
    using ki::ki;
  };
  class App:public ki{
    onaction(App,Init){

    }
    CreateAppWin();
  };
};
extern cls::App App;
//Invoke like this:
void SystemStart();
void main(){

  SystemStart();
  auto appInit = App.Init().Begin();
  // so we are processing appInit event at this time. We pose as App (while processing one of a event)
  // a event may require multiple parties.
  // I.e.,AppMyAss = Begin(App.Init(), HelloWorld.Init());

  appInit.Hokies.Init().Begin();
  // Type will be set to last item... ? Hokies.



  appInit.Release();

  while(1)
    sleep(1);
}
#endif

#endif