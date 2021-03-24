#pragma once
#include "mt_utils.hh"

struct mmap_handle {
  size_t map_size;
  void *base;
  size_t *cur;
  size_t *max;
  int fd;
  void *reserve(size_t amount) {
    auto ret_offset = mk_atomic(*cur).fetch_add(amount);
    auto size_needed = ret_offset + amount;
    if(size_needed > map_size) {
      TRYHOLD(*max, nmax, nmax >= size_needed, SIZE_INVALID) {
        while(nmax < size_needed)
          nmax *=2;
        do_fd_reserve(nmax);
      }
      // do_remap(void *data);
      //size_changed();
    }
    return (void *)((size_t)base + ret_offset);
  }
  private:
  void do_fd_reserve(size_t nmax);
  void do_remap(size_t nmax);
};