#include "comfl_concurrency.hh"
#include <cassert>

static constexpr size_t SHM_NAME_SIZE = 32;
struct shmctrl{
  size_t max;
  size_t cur;
  size_t align;
  double growth;
  char name[SHM_NAME_SIZE];
  inline size_t reserve(size_t size, int fd = -1){
    TRYHOLD(max, nmax, nmax >= size, SIZE_INVALID) {
      if(nmax < size)
        nmax *= growth > 0 ? growth:2;
      if(nmax < size)
        nmax = size;
      auto r = nmax % align;
      nmax += r ? align - r: 0;
      do_resize(nmax, fd);
    }
    return max;
  }
private:
  void do_resize(size_t nmax, int fd);
  int open(const char *_name, size_t initmax);
  friend struct shmmgr;
  friend struct shmem;
};
struct shmem{
  size_t  max;
  int     fd;
  shmctrl*ctrl;
  void   *mmptr;
  bool    isprivate;
  //int     lock;
  inline void *alloc(size_t size){
    size_t ret = mk_atomic(ctrl->cur).fetch_add(size);
    size_t end = ret + size;
    if(end >= max) {
      auto nmax = ctrl->reserve(end, fd);
      TRYHOLD(max, curmax, curmax >= nmax, SIZE_INVALID) {
        assert(curmax < nmax);
        do_remap(curmax, nmax);
        break;
      }
    }
    return (void *)((size_t)mmptr + ret);
  }
  inline size_t size() const {return ctrl->cur;}
  inline void release(){
    if(isprivate){
      do_release();}
  }
private:
  friend struct shmmgr;
  void do_attach();
  void do_remap(size_t curmax, size_t nmax);
  void do_release();
};

struct shmmgr{
private:
  static constexpr size_t MAX_SHM = 128;
  typedef flatmap<shmctrl, MAX_SHM> shmmgr_;
  shmem mgrshm;
  shmmgr_ *_mgr;
  flatmap<shmem, MAX_SHM> mems;
  inline shmmgr(){
    mgrshm = open(nullptr, "/shmmgr", sizeof(shmmgr_));
    _mgr = (shmmgr_ *)mgrshm.mmptr;
  }
  shmem _attach(const char *name, size_t initmax){
    shmem *mem = mems.emplace(
      [&](shmem *shm){
        return (0 == strncmp(shm->ctrl->name, name, SHM_NAME_SIZE))?
          shm:nullptr;},
      [&](shmem *shm){
        auto _ctrl = _mgr->emplace(
          [&](shmctrl *ctrl){
            return (0 == strncmp(ctrl->name, name, SHM_NAME_SIZE))?
              ctrl:nullptr;},
          [&](shmctrl *ctrl){
            shm->fd = ctrl->open(name, initmax);
          }
        );
        shm->ctrl = _ctrl;
        if(!shm->fd)
          shm->fd = _ctrl->open(name, initmax);
      }
    );
    return *mem;
  }

public:
  static shmmgr mgr;
  static inline shmem attach(const char *name, size_t initmax){return mgr._attach(name, initmax);}
  static shmem open(shmctrl *ctrl, const char *name, size_t initmax);
};


template< typename Ty>
class infiarr {
  shmem mem;
public:
  struct iter {
    const infiarr *arr;
    size_t idx;
    inline operator bool() const {return idx < arr->size();}
    inline operator Ty *() const {return arr->at(idx);}
  };

  inline infiarr(size_t szinit = 4):mem(shmmgr::open(nullptr, "/nah", sizeof(Ty)*szinit)){}
  Ty * data()const{return (Ty *)mem.mmptr;}
  size_t size()const{return mem.size() / sizeof(Ty);}
  Ty * at(size_t idx)const{return data()[idx];}
  iter begin()const{return iter{this, 0};}
  iter end()const{return iter{this, size()};}

  Ty *push(){return (Ty *)mem.alloc(sizeof(Ty));}
};