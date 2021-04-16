#pragma once
#include <initializer_list>
#include <cstdint>
#include <cstddef>
#include <variant>
#include "mt_utils.hh"
typedef const char *strarg;
typedef int64_t stamparg;
namespace flow {

// key space -- also flow space -- a space have defined io.
typedef uint32_t ksp_id;
typedef struct _keysp *keysp;
typedef struct _keysp_schema *keysp_schema;

typedef struct _ksp_file *ksp_file;

typedef std::initializer_list<keysp> const & args_keysp;



struct _stor;
typedef _stor *stor;

struct _stor_file;
typedef _stor_file *stor_file;

struct _value;
typedef _value *value;

struct val_idx;

typedef std::variant<const char *, value> val_init;
typedef std::initializer_list<val_init> args_val;

struct ksp_child;
typedef std::initializer_list<ksp_child> ksp_args;


struct _kval;
typedef _kval *kval;


}

