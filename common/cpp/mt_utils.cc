#include "mt_utils.hh"

uint32_t bitmap_decode_ctzll(uint64_t *array, uint32_t start, uint32_t cnt, uint32_t *posOut) {
  uint32_t pos = 0;
  uint64_t bitset;
  for (uint32_t ii = 0; ii < cnt; ++ii) {
    bitset = array[start+ii];
    while (bitset != 0) {
      uint64_t t = bitset & -bitset;
      int r = __builtin_ctzll(bitset);
      posOut[pos++] = ii * 64 + r;
      bitset ^= t;
    }
  }
  return pos;
}
