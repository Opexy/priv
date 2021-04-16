#pragma once
#include "mt_utils.hh"
#include <cstdint>

#pragma once
struct mm_ctrl {
  size_t m_head;
  size_t m_tip;
  size_t m_tail;
  size_t m_max;
};

struct _mm_file {
  mm_ctrl &m_ctrl;
  int m_fd;
  int page_size;
  size_t m_size;
  void *m_data;
  _mm_file() = delete;
  _mm_file(const _mm_file &rhs) = delete;
  inline size_t alloc_offset(size_t size) {
    size_t to_alloc = (size + 7) / 8;
    size_t ret = mk_atomic(m_ctrl.m_tip).fetch_add(to_alloc);
    size_t ret_end = ret + to_alloc;
    reserve_to(ret_end);
    return ret;
  }
  inline void * alloc(size_t size) {
    return at(alloc_offset(size));
  }
  inline void *at(size_t offset){return (void *)((size_t)m_data + offset);}
  inline void reserve_to(size_t max){
    if(max > m_size) {
      TRYHOLD(m_ctrl.m_max, nmax, nmax >= max, SIZE_INVALID) {
        nmax = std::max(alignup(max, page_size), std::min(nmax * 2, nmax + 10*1024*1024));
        do_fs_reserve(nmax);
      }
      do_remap();
    }

  }
private:
  void do_fs_reserve(size_t size);
  void do_remap();
  _mm_file(const char *path, mm_ctrl &ctrl);
  friend _mm_file * mm_open(const char *path, mm_ctrl &ctrl);
};
typedef _mm_file *mm_file;
inline mm_file mm_open(const char *path, mm_ctrl &ctrl) {
  return new _mm_file(path, ctrl);
}
