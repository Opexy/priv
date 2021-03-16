#define HAS_AVX2 1
#include <popcntintrin.h>
#include <immintrin.h>
#include "mt_utils.hh"
#ifdef HAS_AVX2
static inline constexpr uint64_t epu8_bits_epu64_init_(uint8_t ch) {
  uint64_t ret = 0;
  uint64_t cnt = 0;
  uint64_t idx = 0;
  for(; ch != 0; idx++){
    if(ch & 1) {
      ret = ret + (idx << (cnt * 8));
      cnt++;
    }
    ch >>=1;
  }
  return ret;
}
static constexpr auto epu8_bits_epu64 = ConstArray<256>(epu8_bits_epu64_init_);
__attribute__((target("avx2"), noinline))
uint32_t bitmap_decode_avx2(uint64_t *array, uint32_t start, uint32_t cnt, uint32_t *posOut){
 static const __m256i _add8 = _mm256_set1_epi32(8);
 static const __m256i _incVec = _mm256_set1_epi32(64);

 uint32_t *initout = posOut;
 __m256i baseVec = _mm256_set1_epi32(start*64);
 for (uint32_t i = 0; i < cnt; ++i) {
  uint64_t w = array[start+i];
  if (w == 0) {
    baseVec = _mm256_add_epi32(baseVec, _incVec);
  } else {
   for (int k = 0; k < 4; ++k) {
    uint8_t byteA = (uint8_t) w;
    uint8_t byteB = (uint8_t)(w >> 8);
    w >>= 16;
     //_mm256_cvtepu8_epi32(_mm_cvtsi64_si128(*(uint64_t *)(&vt[byteA])))

    //__m256i vecA = _mm256_load_si256(vt[byteA]);
    __m256i vecA = _mm256_cvtepu8_epi32(
      _mm_cvtsi64_si128(*(uint64_t *)(&epu8_bits_epu64[byteA])));

    //__m256i vecB = _mm256_load_si256(vt[byteB]);
    __m256i vecB = _mm256_cvtepu8_epi32(
      _mm_cvtsi64_si128(*(uint64_t *)(&epu8_bits_epu64[byteB])));

    uint8_t advanceA = std::popcount(byteA);
    uint8_t advanceB = std::popcount(byteB);
    vecA = _mm256_add_epi32(baseVec, vecA);
    baseVec = _mm256_add_epi32(baseVec, _add8);
    vecB = _mm256_add_epi32(baseVec, vecB);
    baseVec = _mm256_add_epi32(baseVec, _add8);
    _mm256_storeu_si256((__m256i *) posOut, vecA);
    posOut += advanceA;
    _mm256_storeu_si256((__m256i *) posOut, vecB);
    posOut += advanceB;
   }
  }
 }
 return posOut - initout;
}
#endif