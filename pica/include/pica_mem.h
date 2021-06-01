// Copyright (C) 2020-2021 Mi Chen - All Rights Reserved
#pragma once
#include "pica_util.h"
#include "pica_msg.h"

namespace pica{
enum MsgStatus {
  kMsgInit = 0,
  kMsgReady = 1,
  kMsgProcessing = 2,
  kMsgDone = 4, // head can advance only with kMsgReady.
  kMsgSkip = 5,
};
constexpr int kMsgMask = 0x7;
constexpr int kMsgBits = 3;


namespace mem {
class RingBuffer {
  void     *buff_;
  uint32_t  sz_buff_;
  int64_t  &head_; // reader can read until here;
  int64_t  &tip_;  // writer will write at this

  int64_t  &tail_; // between [head_, tail_ + sz_buff) we can write.
  int64_t  &read_; // next read point

  int32_t OffsetIndex(int64_t offset) { return offset % sz_buff_;}
  int32_t OffsetTail(int64_t offset) {return sz_buff_ - OffsetIndex(offset);}

  // Problem: when too many in the queue and requests get dropped off... QueueDepth()
  /**
   * @brief When we're done writing, we can advance forward.
   * 
   */
  inline void TryAdvanceHead(){
    while(true) {
      int64_t head = head_;
      if(head >= std::min(tip_, tail_ + sz_buff_)) {
        assert(head == tail_ + sz_buff_ || head == tip_);
        break;
      }
      
      EntryHdr hdr = HdrAt(head);
      auto status = hdr & kMsgMask;
      if((status == kMsgReady) || (status  == kMsgSkip)) {
        auto sz_align_8 = align_up(hdr>>kMsgBits, 8);
        if(false == mk_atomic(head_).compare_exchange_strong(
          head, head + sz_align_8)) {
          break;
        }
      } else {
        break;
      }
    }
  }

  /**
   * @brief check if we are done processing, we can advance tail (trim) so write can proceed.
   * 
   */
  inline void TryAdvanceTail(){
    while(true) {
      int64_t tail = tail_;
      if(tail_ >= head_)
        break;
      EntryHdr hdr = HdrAt(tail);
      auto status = hdr & kMsgMask;
      if(status == kMsgDone || status == kMsgSkip) {
        auto sz_align = align_up(hdr >> kMsgBits, 8);
        if(false == mk_atomic(tail_).compare_exchange_strong(
          tail, tail + sz_align)){
            break;
        }
      }
    }
  }

 public:
  typedef uint32_t EntryHdr;
  struct Entry {
    int64_t offset;
    int32_t skip; // amount to skip
    int32_t size; // size (include header of the entry)
  };

  RingBuffer(void *buff, uint32_t size, int64_t &head, int64_t &tip, int64_t &tail, int64_t &read):
    buff_(buff), sz_buff_(size), head_(head), tip_(tip), tail_(tail), read_(read) {}
  void *OffsetData(int64_t offset) {
    return (char *)buff_ + OffsetIndex(offset);
  }
  void *EntryData(const Entry &entry) {
    assert(entry.skip == 0);
    return OffsetData(entry.offset + entry.skip + sizeof(EntryHdr));
  }

  inline uint32_t &HdrAt(int64_t offset) {
    return *(uint32_t *)OffsetData(offset);
  }
  inline uint32_t SetHdr(int64_t offset, int32_t size, MsgStatus status) {
    assert(status < 4);
    HdrAt(offset) = (uint32_t)size << 2 | status;
  }

  void WaitToWriteOffset(int64_t offset) {
    // TODO: add customized timeouts
    for(int ii = 0; offset >= tail_ + sz_buff_; ii++){
      if(0 == (ii % 8192)) {
        std::this_thread::sleep_for(1us);
      }
    }
  }
  
  Entry EntryAlloc(int32_t size) {
    Entry ret;
    uint32_t to_alloc, tail, sz_align;

    ret.size = size + sizeof(EntryHdr);
    sz_align = align_up(ret.size, 8);

    assert(sz_align < sz_buff_);
    do {
      ret.offset = tip_;
      tail = OffsetTail(ret.offset);
      to_alloc = tail < sz_align ? sz_align + tail : sz_align;
    } while(false == mk_atomic(tip_).compare_exchange_strong(tip_, tip_+to_alloc));
    return ret;
  }

  void EntryBeginWrite(Entry &entry) {
    WaitToWriteOffset(entry.offset);
    if(entry.skip){
      SetHdr(entry.offset, entry.skip, kMsgSkip);
      TryAdvanceHead(); // Basically throw away this piece of message.
      entry.offset += entry.skip;
    }
    WaitToWriteOffset(entry.offset + entry.size - 1);
    SetHdr(entry.offset, entry.size, kMsgInit);
  }

  inline void EntryEndWrite(Entry &entry) {
    SetHdr(entry.offset, entry.size, kMsgReady);
    TryAdvanceHead();
  }

  inline bool TryFetch(Entry &entry){
    while(true) {
      auto read = read_;
      if(read >= head_) {
        return false;
      }
      auto hdr = HdrAt(read);
      auto status = hdr & kMsgMask;
      if(status == kMsgSkip || status == kMsgReady) {
        auto sz_align = align_up(hdr >> kMsgBits, 8);
        if(true == mk_atomic(read_).compare_exchange_strong(read, read + sz_align)) {
          if(status == kMsgReady) {
            entry.offset = read;
            entry.size = hdr >> kMsgBits;
            return true;
          } else if(status == kMsgBits) {
            SetHdr(read, hdr>>kMsgBits, kMsgDone);
            TryAdvanceTail();        
          }
        } else {
          continue;
        }
      }
    }
  }
  inline void EntryEndRead(Entry &entry) {
    SetHdr(entry.offset, entry.size, kMsgDone);
    TryAdvanceTail();
  }
};



}; // pica
}; // mem