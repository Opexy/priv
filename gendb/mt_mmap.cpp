#include "mt_mmap.h"
// Copyright 2020 Taugoal LLC. All Rights Reserved.
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <unistd.h>
#include <cassert>
#include <fmt/format.h>
#define log_error(...) fmt::print(__VA_ARGS__)

_mm_file::_mm_file(const char *path, mm_ctrl &ctrl)
  :m_ctrl(ctrl),m_data(NULL)
{
  page_size = getpagesize();
  m_fd = open(path, O_RDWR | O_CREAT, S_IRUSR | S_IWUSR);
  if(m_fd == -1) {
    log_error("open {} failed with {}", path, errno);
    assert(false);
  }
  reserve_to(m_ctrl.m_max);
}


void _mm_file::do_fs_reserve(size_t nmax) {
  int ret = ftruncate(m_fd, nmax);
  if(ret != 0) {
    log_error("ftruncate failed with {}", errno);
    assert(false);
  }
  else {
    m_ctrl.m_max = nmax;
  }
}

void _mm_file::do_remap() {
  auto nptr = mremap(m_data, m_size, m_ctrl.m_max, 0);
  if(nptr == MAP_FAILED) {
    nptr = mmap(nullptr, m_ctrl.m_max, PROT_READ | PROT_WRITE, MAP_SHARED, m_fd, 0);
    assert(nptr != MAP_FAILED);
  }
  m_data = nptr;
}