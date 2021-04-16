#pragma once
#include "mt_utils.hh"
#include <cstdint>
#include <cassert>
#include <thread>
enum msg_status {
  MSG_INIT,
  MSG_READY,
  MSG_PROCESSING,
  MSG_INVALID
};


struct ring_buffer {
  struct msg {
    ring_buffer &rb;
    int64_t offset;
    uint32_t sz_blank;
    uint32_t sz_msg;
    inline uint32_t &hdr(){
      return rb.hdr_at(offset);
    }
    inline bool wait_to_write() {
      rb.wait_to_write(offset);
      if(sz_blank) {
        hdr() = (sz_blank << 2) | MSG_INVALID;
        rb.try_advance_head();
        offset+=sz_blank;
        sz_blank = 0;
        rb.wait_to_write(offset);
      }
      hdr() = (sz_msg << 2) | MSG_INIT;
      return true;
    }; // caller has to call this.
    inline void done_write() {
      hdr() = (sz_msg << 2) | MSG_READY;
      rb.try_advance_head();
    }
    inline void done_read() {
      hdr() = (sz_msg << 2) | MSG_INVALID;
      rb.try_advance_tail();
    }
  };

  uint32_t buffer_size;
  int64_t &head; // reader can read until here
  int64_t &tip;  // writer will write at this
  int64_t &tail; // reader will read this next
  uint64_t *data;
  bool wait_to_write(int64_t offset) {
    // TODO: add customized timeouts
    for(int ii = 0; offset > tail; ii++){
      if(0 == (ii % 8192)) {
        std::this_thread::sleep_for(1us);
      }
    }
    return true;
  }
  inline uint32_t &hdr_at(int64_t offset) {
    auto data_offset = offset%buffer_size;
    return *(uint32_t *)((char *)data + data_offset);
  }
  inline void try_advance_head(){
    int64_t cur_head;
    while(true) {
      cur_head = head;
      if((hdr_at(cur_head) & 0x3) != MSG_INVALID) {
        // Initializing... no advance.
        break;
      } else {
        auto sz_align = (((hdr_at(cur_head) >> 2) + 7) >> 3) << 3;
        if(false == mk_atomic(head).compare_exchange_strong(
          cur_head, cur_head + sz_align)){
            break;
        }
      }
    }
  }
  inline void try_advance_tail(){
    int64_t cur_tail;
    while(true) {
      cur_tail = tail;
      if((hdr_at(cur_tail) & 0x3) == 0x3) {
        // Initializing... no advance.
        break;
      } else {
        auto sz_align = (((hdr_at(cur_tail) >> 2) + 7) >> 3) << 3;
        if(false == mk_atomic(tail).compare_exchange_strong(
          cur_tail, cur_tail + sz_align)){
            break;
        }
      }
    }
  }
  inline msg produce_begin(uint32_t msg_size){
    int64_t offset;
    uint32_t to_alloc;
    uint32_t to_avail;
    uint32_t sz_align = (((msg_size + 4 + 7) >>3) <<3); // align to 8 bytes.

    assert(sz_align < buffer_size);
    do {
      offset = tip;
      to_avail = buffer_size - (tip % buffer_size);
      to_alloc = to_avail < sz_align ? sz_align + to_avail : sz_align;
    } while(false == mk_atomic(tip).compare_exchange_strong(tip, tip+to_alloc));

    return msg{*this, offset, to_alloc - sz_align, msg_size+4};
  }
  msg produce_end();
};

struct msg_received {
  
  int32_t *mptr;
};
struct msg_queue {

};
struct msg_queue_shm:msg_queue {

};