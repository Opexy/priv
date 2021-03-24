// Copyright (C) Mi Chen 2021 All Rights Reserved
// You may use, distribute and modify this code under

#pragma once
#include "flow_common_defs.h"
#include "flow_value.h"
#include "flow_keysp.h"
#include "db_mmap.h"

namespace flow {

enum ksp_type {
  KSP_REFERENCE,
  KSP_COMPOSIT,
  KSP_DYNAMIC,
  KSP_PATH,
  KSP_STRING,
  KSP_HASH_SHA1,
  KSP_TIMESTAMP
};
enum ksp_attr {
  KSP_COLUMN,
  KSP_INLINE,
};
enum ksp_nary {
  KSP_DST_ONE,
  KSP_DST_MANY
};
keysp create_schema();

keysp create_ksp(keysp parent, strarg ksp_name, strarg ksp_from,
                 ksp_type entry_type, ksp_attr attr, int min, int max);

kval kval_add(kval parent, keysp ksp);
kval kval_set_string(kval, keysp, strarg);
kval kval_set_timestamp(kval, keysp, stamparg);

}




