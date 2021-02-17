// Copyright 2020 Taugoal LLC. All Rights Reserved.
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <unistd.h>
#include "libsage.hh"
#include "libsage_shmem.hh"

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