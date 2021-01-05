#include "comfl_concurrency.hh"
#include "comfl_shmem.hh"
typedef size_t szptr;
struct iptr{
  szptr ptr;
  operator void *() const {
    return (void *)ptr;
  }
};
iptr ialloc(size_t size){
  return iptr{(szptr)calloc(1, size)};
}
iptr irealloc(iptr oldptr, size_t newsz){
  return iptr{(szptr)realloc(oldptr, newsz)};
}
void ifree(iptr & oldptr){
  free(oldptr);
  oldptr.ptr = 0;
}
/*  [[[cog
    codeout("""{enum:now I look like an enum}""")
    ]]]*/
hello, world
// [[[end]]] (checksum: 22c3683b094136c3398391ae71b20f04)

// meta code type
enum mctype:uint8_t {
  mct_invalid,
  mct_stub,
  mct_handle,
  mct_mcstart,
  mct_mcend,
  mct_arr,
  mct_max,
};

static inline constexpr std::array<uint32_t, mct_max> _mct_cmdlengths_init(){
  std::array<uint32_t, mct_max> mct_cmdlengths = {};
  mct_cmdlengths[mct_invalid] = 0;
  mct_cmdlengths[mct_handle] = 16;
  mct_cmdlengths[mct_hidx] = 8;

  mct_cmdlengths[mct_mcstart] = 8;
  mct_cmdlengths[mct_mcend] = 8;

  return mct_cmdlengths;
}

inline static constexpr size_t mctlen(mctype mct){
    static inline constexpr const std::array<uint32_t, mct_max> mct_cmdlengths = _mct_cmdlengths_init();
    return mct_cmdlengths[mct];
}

__attribute__((packed))
struct metacode {
  mctype mct:8;
  inline size_t cmdlen(){return ::mctlen(mct);}
  template <typename _Ty>
  _Ty *as(){if(_Ty::_mct == mct) return (_Ty *)this else return NULL;}
  metacode *next(){
    return (metacode *)(this + cmdlen());
  }
};
template <typename Ty>
struct mcbase:metacode{
  inline mcbase():metacode{Ty::_mct}{}
};
static_assert(sizeof(metacode) == 1);

struct mcstart:mcbase<mcstart> {
  using mcbase::mcbase;
  const static mctype _mct = mct_mcstart;
  uint8_t _unused_u8;
  uint16_t _unused_u16;
  uint16_t len;
  uint16_t maxlen;
  metacode *begin(){return next();}
  metacode *end(){return (metacode *)this + len;}
  template <typename Mc>
  Mc *find(){
    for(auto *iter:*this){
      auto ret = iter->as<Mc>();
      if(ret)
        break;
    }
    return ret;
  }
};
static_assert(sizeof(mcstart) == mctlen(mcstart::_mct));

enum mc_arr_elem_type {
  mcae_invalid,
  mcae_int,
  mcae_double,
  mcae_float,
};

struct mc_arr_iter{
  struct mc_arr *arr;
  uint32_t idx;
  mc_arr_elem_type type;
  void *data;
  size_t datasize;
};
struct mc_arr:mcbase<mc_arr>{
  const static mctype _mct = mct_arr;
  mc_arr();
  uint8_t  _ety:8; 
  uint32_t _esz:24;
  uint32_t _count;

  size_t cur; // current offset
  size_t max; // max of elems
  void *elems;
  size_t *elszoffsets;
  uint8_t *types;

  
  template <typename _Ty>
  void add_elems(_Ty *data, size_t count = 1){
    assert(sizeof(_Ty) == _esz);
    // todo: here
  }
};

struct mc_stub {
  mt_lockv<>lock;
  mcstart *meta;

  #define FMC(tok) auto tok = _findmc<mc_##tok>()
  inline size_t array_size(){FMC(arr); return arr?arr->size():0;}
  template <typename Mc>
  inline Mc *_findmc() {return meta? meta->find<Mc>()?nullptr;}
};

struct mch:mcbase<mch> {
  const static mctype _mct = mct_handle;
  size_t idx:48;
  mc_stub &stub(){return *stubs.at(idx);}
  inline static infiarr<mc_stub> stubs = infiarr<mc_stub>();
};
static_assert(sizeof(mch) == 8);
