#include <filesystem>
#include "flow.h"
#include "tsl/ordered_map.h"

// file
#include "mt_mmap.h"
#include <sys/types.h>
#include <sys/stat.h>
#include <bitset>
#include <fcntl.h>
#include <fmt/format.h>
namespace flow {
typedef tsl::ordered_map<std::string, keysp> keysp_children;

#define HAS_FLAG(e, f) (f == (e & f))
#define HAS_ANY_FLAG(e, f) (0 != (e & f))

enum subf_format {
  SUBF_INVALID,
  SUBF_INT64,
  SUBF_BLOB_OFFSET_SIZE
};

enum stor_file_type_e{
  STOR_FILE_ELEM,
  STOR_FILE_ELEM_BLOB,
  STOR_FILE_ENTRY_HASHMAP,
  STOR_FILE_TYPE_MAX,
};


inline constexpr subf_format subf_format_from_ksp_type(ksp_type kt) {
  if(kt & KSP_STRING)
    return SUBF_BLOB_OFFSET_SIZE;
  return SUBF_INVALID;
}
struct subf_blob_offset_size{
  int32_t m_blob_offset;
  int32_t m_blob_size;
};

int subfield_format_width(subf_format sf){
  if(sf == SUBF_BLOB_OFFSET_SIZE) {
    return sizeof(subf_blob_offset_size);
  }
  assert(false);
  return 0;
}

struct _subfield {
  keysp m_ksp;
  ksp_file m_file;
  subf_format m_subf_format;
  int m_idx_in_file;
  int m_offset;
  int m_width;
};
typedef _subfield * subfield;

struct _ksp_file{
  keysp m_ksp_hoister;
  int record_width;
  std::bitset<STOR_FILE_TYPE_MAX> m_file_types;
  inline _ksp_file(keysp ksp_hoister):m_ksp_hoister(ksp_hoister),record_width(0){
    assert(!ksp_hoister->m_file);
    ksp_hoister->m_file = this;
  }
  std::vector<subfield> m_subfields;
  subfield add_subfield(keysp ksp, subf_format sf_format) {
    assert(!ksp->m_subfield);
    auto sf = new _subfield();
    sf->m_ksp = ksp;
    sf->m_file = this;
    sf->m_subf_format = sf_format;
    sf->m_idx_in_file = (int)m_subfields.size();
    sf->m_offset = record_width;
    sf->m_width = subfield_format_width(sf_format);
    record_width += sf->m_width;
    m_subfields.push_back(sf);
    ksp->m_subfield = sf;
    ksp->m_subfield_idx = m_subfields.size();
    return sf;
  }
};

struct _keysp {
  int m_id;
  keysp m_name;
  keysp m_parent;
  keysp m_super; // super column: "real" column
  ksp_type m_entry_type;
  ksp_attr m_attr;
  int m_rel_min;
  int m_rel_max;
  keysp_children m_children;
  inline ksp_type entry_type(){
    return m_super?m_super->entry_type():m_entry_type;
  }
  inline keysp get_child(strarg ksp_name){
    return m_children[ksp_name];
  }
  inline keysp hoister(){
    if(m_attr & KSP_ATTR_INLINE) {
      return m_parent->hoister();
    }
    else return this;
  }
  inline keysp _root() {
    if(m_parent) return m_parent->_root();
    else return this;
  }
  inline struct _keysp_schema & schema(){
    return *reinterpret_cast<_keysp_schema *>(_root());
  };
  inline bool is_key(){return HAS_FLAG(m_entry_type, KSP_KEY);}
  inline bool is_leaf(){return HAS_ANY_FLAG(m_entry_type, KSP_LEAF);}

  // Compute
  ksp_file m_file;
  subfield m_subfield;
  int32_t  m_subfield_idx;
};

struct _keysp_schema:_keysp {
  int m_next_id = 3;
  tsl::ordered_map<keysp, ksp_file> m_files;
  tsl::ordered_map<keysp, subfield> m_subfields;
  inline int assign_keysp_id(){
    return m_next_id++;
  }
};

/**
 * @brief Create a ksp (key space) object
 * 
 * @param parent -- owner of this key, can be schema
 * @param child_name 
 * @param ksp_super 
 * @param entry_type 
 * @param attr -- column, or component_column, inline_column, etc.
 * @param min -- minimum how many per record
 * @param max -- maximum how many per record
 * @return keysp 
 */
keysp create_ksp(
  keysp parent, strarg child_name, keysp ksp_super,
  ksp_type entry_type, ksp_attr attr, int min, int max)
{
  auto ret = parent->get_child(child_name);
  if(ret) {
    assert(false);
    return ret;
  }
  ret = new _keysp();
  ret->m_parent = parent;
  ret->m_children[child_name] = ret;
  ret->m_super = ksp_super;
  ret->m_entry_type = entry_type;
  ret->m_attr = attr;
  ret->m_rel_min = min;
  ret->m_rel_max = max;
  ret->m_id = parent->schema().assign_keysp_id();
  return ret;
}

keysp create_ksp(keysp parent, strarg ksp_name, strarg ksp_super,
                 ksp_type entry_type, ksp_attr attr, int min, int max)
{
  keysp _super = NULL;
  if(ksp_super && ksp_super[0] != '\0') {
    _super = parent->schema().m_children[ksp_super];
    if(_super == NULL) {
      _super = schema_create_ksp(&parent->schema(), ksp_super, NULL,
                                 entry_type, attr, min, max);
    }
  }
  return create_ksp(parent, ksp_name, _super, entry_type, attr, min, max);
}


keysp_schema create_schema(){
  return new _keysp_schema();
}

void compute_schema(keysp ksp) {
  auto &schema = ksp->schema();
  std::function<void(keysp)> compute_ksp = [&](keysp ksp){
    if(ksp->is_leaf()) {
      auto subf = schema.m_subfields[ksp];
      if(!subf) {
        auto ksp_hoister = ksp->hoister();
        ksp_file kf = schema.m_files[ksp];
        if(!kf) {
          kf = new _ksp_file(ksp_hoister);
          schema.m_files[ksp_hoister] = kf;
        }
        kf->add_subfield(ksp, subf_format_from_ksp_type(ksp->m_entry_type));
      }
    }
    // all children.
    for(auto child:ksp->m_children) {
      compute_ksp(child.second);
    }
  };
  compute_ksp(ksp);
}


struct offlen {
  uint32_t offset;
  uint32_t length;
};

struct _stor_ksp {
  stor m_stor;
  keysp m_ksp;
  int m_field_start; // for inline ksp
  int m_field_end; // for inline ksp
  stor_file m_entries;
  stor_file m_blob;
};
typedef _stor_ksp *stor_ksp;

struct _stor_file {
  stor m_stor;
  mm_file m_file;
  std::string m_path;
  inline _stor_file(stor st, int idx) {
    
  }
};

struct _stor_hdr {
  mm_ctrl ctrls[1024];
};
typedef _stor_hdr * stor_hdr;
struct _stor{
  std::string m_path;
  keysp_schema m_schema;
  std::vector<stor_file> m_files;
  stor_hdr m_hdr;
  mm_file m_hdr_file;
  mm_ctrl m_hdr_ctrl;
  _stor() = delete;
  _stor(const _stor &) = delete;

  inline stor_file ksp_elem_file(keysp ksp) {return m_files[ksp->m_id*3+0];}
  inline stor_file ksp_data_file(keysp ksp) {return m_files[ksp->m_id*3+1];}
  inline stor_file ksp_hash_file(keysp ksp) {return m_files[ksp->m_id*3+2];}
private:
  inline _stor(strarg path, keysp_schema schema)
    :m_path(path), m_schema(schema)
  {
    if(path && path[0]) {
      mkdir(path, 0775);
      m_files.resize(schema->m_next_id * STOR_FILE_TYPE_MAX);
      m_hdr_file = mm_open(fmt::format("{}/db_idx", path).c_str(), m_hdr_ctrl);
      m_hdr = (stor_hdr) m_hdr_file->alloc(sizeof(*m_hdr));
      for(uint32_t idx = 0; idx < schema->m_files.size(); idx++) {
        auto ksp_file = schema->m_files.nth(idx)->second;
        for(int ft = 0; ft < STOR_FILE_TYPE_MAX; ft++) {
          if(ksp_file->m_file_types[ft]) {
            int file_idx = idx * STOR_FILE_TYPE_MAX + ft;
            m_files[file_idx] = new _stor_file(this, file_idx);
          }
        }
      }
    } else {
      assert(false);
    }
  }
  
  friend stor create_stor(strarg stor_path, keysp_schema schema);
};

inline _stor_file::_stor_file(stor st, int idx)
  :m_stor(st)
{
  m_path = fmt::format("{}/{}", m_stor->m_path, idx);
  m_file = mm_open(m_path.c_str(), m_stor->m_hdr->ctrls[idx]);
}


stor create_stor(strarg stor_path, keysp_schema schema) {
  return new _stor(stor_path, schema);
}


enum karg_type {
  KA_UNDEFINED,
  KA_COMPOUND,
  KA_IDX,
  KA_VAL_PATH,
  KA_VAL_UI64,
  KA_VAL_DOUBLE
};
struct evs_opcode {
};
typedef struct _eve *eve;
struct _evscript {
  struct evsnode {
    evs_opcode m_opc;
    int m_px; // parent
    int m_cx; // child
    int m_nx; // next element; 
  };
  std::vector<evsnode> nodes;
  
};
struct _eve{
  exer *m_exer;
  int eve_node;
  evsnode_opcode opcode();
  eve px();
  eve cx();
  eve nx();
  eve emplace(keysp);
  eve set_val(keysp);
  eve add_val(keysp);
  eve exe();
  eve on_done();

  void bind_val(const char *val);
  void reset();
};





struct proc_inserter {
  proc_inserter(){
    keysp m_proc, m_proc_parent, m_proc_args, m_proc_inputs_explicit, m_proc_input_implicit, m_proc_outputs;

  }
};
int test(){
  
  eve script;

  script.set(proc, compound(set(proc_parent, ), set(), set()))
}

// evaluation entity



/*
struct _evn_scope {
  evn_result set_column_val(keysp col, evn_val val);
  void query(keysp ksp);
};



typedef _evn *evn;
evn create_evn(stor stor);
evn create_evn_ksp_1(evn parent, keysp ksp);


struct _karg_ksp_idx {
  stor m_stor;
  keysp m_ksp;
  uint32_t m_idx;
};

typedef struct _karg *karg;
struct _karg {
  stor m_stor;
  karg_type m_type;
  void set_path(keysp ksp, std::filesystem::path &path){
    auto stem = path;
    for(auto stem = path; stem.c_str()[0]; stem = stem.parent_path()){
      _karg_ksp_idx ksp_idx_max = 
      path_idx = stor.find_path_elem(stem);
      if(path_idx == INVALID_INDEX) {
        
      }
    }
    path.parent_path
  }
  void set_ui64(keysp ksp, uint64_t ui64);
};

struct karg {
  stor m_stor;
  struct elem {
    uint32_t elem_idx;
  };

  std::vector<void *>  elems;
  elem root;
};

struct karg_word {
  karg_type m_type;
};


struct _karg_path_elem {

}

struct _karg_path {
  add(karg_path_elem);
};

struct _ksp_arg_path:_ksp_arg{
  _ksp_arg_path 
  const char *ptr;
  const char *
};

ksp_arg ksp_arg_path(strarg path_str) {
  ksp_arg_path ;
  for(std::filesystem::path p = path_str; p.c_str()[0]; p = p.parent_path()) {
    auto name = p.filename();
    auto ext = p.extension();
  }
}



struct ksp_emplacer {
  stor m_stor;
  keysp m_ksp;
  
  void set_component(keysp ksp_component, strarg arg) {
  }
};





stor create_tmp_stor();
value stor_put_val(keysp keysp, val_idx idx, args_val val);




extern stor tmp;
struct val_idx {
  int idx;
};

struct _value{
  keysp keysp_;
  stor stor_;
  val_idx idx;
};
*/
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



//struct _stor_file_stat {
//  uint32_t cnt;
//  uint32_t max;
//};

struct LocalObjectEntry{
  uint8_t LoScope;
  uint8_t LoEntry;
 
};



} // end of namespace