#ifndef tpdef
#define tpdef(...)
#endif
// string enum/strname, 
tpdef(tp_invalid)
// v7 objects are references that is managed by several arrays.
// The type here is needed to differentiate them into their corresponding storages.
tpdef(tp_i56) // 56 bit of integer
tpdef(tp_arr) // pointer to cachline objects
tpdef(tp_ptp)  // pointer to another (managed) v7 element. usually a key.
tpdef(tp_str) // string that is used as key.
tpdef(cfvt_v7parr) // fixed 64-byte array of v7 elements --
tpdef(cfvt_max)
/*
enum cfvt{
  cfvt_invalid,
  cfvt_i56,
  cfvt_str,
  cfvt_d64,
  cfvt_i64,
  cfvt_kstr,
  cfvt_ki64,
  cfvt_kd64,
  cfvt_karr,
};
*/