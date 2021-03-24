#include "flow.h"
namespace flow {



keysp create_schema(){
  return NULL;
}

keysp create_ksp(keysp parent, strarg ksp_name, strarg ksp_from,
                 ksp_type entry_type, ksp_attr attr, int min, int max)
{
  return NULL;
}





enum keysp_type {
  KSP_KEY = 0x0,      // this is the key entries
  KSP_BLOB = 0x1,     // of the parent
  KSP_HASH_MAP = 0x2, // of the parent

  KSP_VAL_STR = 0x4,
  KSP_VAL_PATH = 0x8,
};


stor create_stor(strarg stor_path);
stor create_tmp_stor();
value stor_put_val(keysp keysp, val_idx idx, args_val val);

extern stor tmp;
struct val_idx {
  int idx;
};

struct _value{
  keysp keysp;
  stor stor;
  val_idx idx;
};

enum db_scope_attrs {
  DBS_SRC_COMPONENT_ONE   = 0x1,
  DBS_SRC_COMPONENT_MANY  = 0x2,
  DBS_SRC_COMPONENT_MASK  = DBS_SRC_COMPONENT_ONE | DBS_SRC_COMPONENT_MANY,

  DBS_SRC_KEY_ONE         = 0x4,
  DBS_SRC_KEY_MANY        = 0x8,
  DBS_SRC_KEY_MASK        = DBS_SRC_KEY_ONE | DBS_SRC_KEY_MANY,
  
  DBS_SRC_OP_KEY        = 0x10,
  DBS_SRC_OP_LIST_AND   = 0x20,
  DBS_SRC_OP_LIST_OR    = 0x40,

  DBS_SRC_OP_NOT_THEN   = 0x80,
  DBS_SRC_OP_THEN_NOT   = 0x100,
};

// functional meta input/output



struct _stor_file_stat {
  uint32_t cnt;
  uint32_t max;
};
struct _stor_content {
  static const int MAX_STOR_FILES = 1024;
  _stor_file_stat stats[MAX_STOR_FILES];
};

struct _stor {

};
stor create_stor(strarg stor_path){
  return NULL;
}

struct LocalObjectEntry{
  uint8_t LoScope;
  uint8_t LoEntry;
 
};



}