// Copyright (C) Mi Chen 2021 All Rights Reserved
// You may use, distribute and modify this code under

#pragma once
#include "flow_common_defs.h"
#include "flow_value.h"
#include "flow_keysp.h"
#include "db_mmap.h"

namespace flow {

enum ksp_type {
  KSP_STRING    = 0x1,
  KSP_PATH      = 0x3,
  KSP_TIMESTAMP = 0x4,
  KSP_HASH_SHA1 = 0x8,
  KSP_LEAF = KSP_STRING | KSP_PATH | KSP_TIMESTAMP | KSP_HASH_SHA1,

  KSP_COMPOSIT  = 0x100,

  
  //KSP_DYNAMIC   = 0x20,

  KSP_KEY = 0x1000,
  KSP_KEY_STRING = KSP_KEY | KSP_STRING,
  KSP_KEY_PATH = KSP_KEY | KSP_PATH,
  KSP_KEY_COMPOSIT = KSP_KEY | KSP_COMPOSIT,
  KSP_KEY_TIMESTAMP = KSP_KEY | KSP_TIMESTAMP,
  
  KSP_REFERENCE  = 0x2000,
  

};
enum ksp_attr {
  KSP_ATTR_INLINE = 0x1,
  KSP_ATTR_COMPONENT = 0x2,
  KSP_ATTR_COLUMN = 0x4,
};
enum ksp_nary {
  KSP_DST_ONE,
  KSP_DST_MANY
};
keysp_schema create_schema();

keysp create_ksp(keysp parent, strarg ksp_name, keysp ksp_super,
                 ksp_type entry_type, ksp_attr attr, int min, int max);
keysp create_ksp(keysp parent, strarg ksp_name, strarg ksp_super,
                 ksp_type entry_type, ksp_attr attr, int min, int max);

inline keysp schema_create_ksp(keysp_schema schema, strarg ksp_name, strarg ksp_from,
                 ksp_type entry_type, ksp_attr attr, int min, int max)
{
  return create_ksp(reinterpret_cast<keysp>(schema), ksp_name, ksp_from, entry_type,
    attr,min, max);
}
kval kval_add(kval parent, keysp ksp);
kval kval_add_string(kval, keysp, strarg);
kval kval_add_timestamp(kval, keysp, stamparg);


stor create_stor(strarg stor_path, keysp_schema schema);

}




