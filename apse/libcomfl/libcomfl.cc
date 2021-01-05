// Copyright 2020 Taugoal LLC. All Rights Reserved.
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <assert.h>
#include <sys/mman.h>
#include <unistd.h>
#include "libcomfl.hh"

// Communication Flow Machine
#pragma region // comfl_shmem.hh
void shmctrl::do_resize(size_t nmax, int fd){
  ftruncate(fd, nmax);
  max = nmax;
}
int shmctrl::open(const char *_name, size_t initmax){
  int fd = -1;
  if(strcpys(this->name, SHM_NAME_SIZE, _name)){
    assert(false);
  }

  if(_name[0]){
    fd = shm_open(_name, O_RDWR | O_CREAT, S_IRUSR | S_IWUSR);
    assert(fd != -1);
    struct stat statbuf={};
    fstat(fd, &statbuf);
    if(!max)max = statbuf.st_size;
    if(!align) align = initmax >= 2*1024*1024 ? 2*1024*1024 : getpagesize();
    reserve(initmax, fd);
  }

  return fd;
}
void shmem::do_attach(){
  int flags = MAP_ANONYMOUS | MAP_PRIVATE;
  if(fd != -1){
    flags = MAP_SHARED;
  }
  max = ctrl->max;
  mmptr = mmap(nullptr, max, PROT_READ | PROT_WRITE, flags, fd, 0);
  assert(mmptr != MAP_FAILED);
  if(isprivate && fd)
    shm_unlink(ctrl->name);
}
shmem shmmgr::open(shmctrl *ctrl, const char *name, size_t initmax){
  shmem ret = {};
  if(nullptr == ctrl) {
    ctrl = (shmctrl *)calloc(1, sizeof(shmctrl));
    ret.isprivate = true;
  }
  ret.ctrl = ctrl;
  ret.fd = ctrl->open(name, initmax);
  ret.do_attach();
  return ret;
}
void shmem::do_remap(size_t curmax, size_t nmax){
  auto nptr = mremap(mmptr, curmax, nmax, 0);
  if(nptr == MAP_FAILED) {
    nptr = mmap(nullptr, nmax, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);
    assert(nptr != MAP_FAILED);
  }
  mmptr = nptr;
  mk_atomic(max) = nmax;
}
void shmem::do_release(){
  munmap(mmptr, max); mmptr = MAP_FAILED;
  close(fd); fd = -1;
  free(ctrl); ctrl = nullptr;
}
shmmgr shmmgr::mgr = shmmgr();
#pragma endregion




// template <typename CflType>
// CflType *cflAlloc(size_t sz_addl=0){
  // return (CflType *)calloc(1, sizeof(CflType)+sz_addl);

// struct cfl_s {
//   cfl_p parent;
//   cfv_p cfv;
// };

// struct cfvt_pp_arr_priv{
//   std::vector<cfv_p> elems;
//   // other information here...
// };
// // array need its own pointer collection... 
// struct cfvt_pp_arr:cfv_pp<cfvt_pp_arr_priv>{
// };

// void cfv_p::push(cfv_p cfv){
//   // if this is an array, easy... otherwise create array.
//   // if this is a value... create a different value (morph this.)
//   if(cfvt() == cfvt_v7parr){
//     auto *arr = cfvt_pp_arr::at(get<i56>);
//     arr.elems.push_back(cfv);
//   }
// }
// void cfv_p::set(const std::initializer_list<cfv_p> &val){

// }
// void cfv_p::set(int64_t val){

// }
// void cfv_p::set(double val){

// }
// void cfv_p::set(const std::string &val){

// }
// cfv_p cfv_p::at(size_t pos){
//   //
//   return cfv_p();
// }


// cfv_p::char *val_str();
// const cfv_p::int64_t*val_int();
// cfv_p cfv_p::at(size_t pos);

// cfl_p cflScript(cfl_p parent, const char *script){
//   if(!parent)
//     parent = cflAlloc<CflSrc>();
//   parent->ingestScript(script);
//   return parent;
// }
// cflsys_p cflSystem(cfl_p cfl){return cfl;}
// cflruncmd_p cflRunCmd(cfl_p cfl) {return cfl;}

