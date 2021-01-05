#include "apse_ast1.hh"
using asn = apse_ast1::asn;
using asnptr = apse_ast1::asnptr;
using asnptrlist = apse_ast1::asnptrlist;
using asn_scope = apse_ast1::asn_scope;
using asn_source = apse_ast1::asn_source;
using asn_list = apse_ast1::asn_list;
using asn_word = apse_ast1::asn_word;

struct {
  std::string sval;
  ordered_map<enum> enum;
  std::vector<asn_enum *>children;
} asn_enum;