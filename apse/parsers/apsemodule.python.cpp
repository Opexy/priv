#include "apse_ast1.hh"
#include <pybind11/pybind11.h>
#include <pybind11/stl.h>
#include <pybind11/stl_bind.h>

//clang -O3 -Wall -shared -std=c++2a -fPIC `python3 -m pybind11 --includes` apsemodule.python.cpp -o apse`python3-config --extension-suffix` -ldl -lpthread -lstdc++
namespace py = pybind11;
std::string toparse;
auto tokener = new apse_tokener();
auto parse(const char *str){toparse = str; return tokener->parse(std::string_view(toparse));}


using asn = apse_ast1::asn;
using asnptr = apse_ast1::asnptr;
using asnptrlist = apse_ast1::asnptrlist;
using asn_scope = apse_ast1::asn_scope;
using asn_source = apse_ast1::asn_source;
using asn_list = apse_ast1::asn_list;
using asn_word = apse_ast1::asn_word;


PYBIND11_MAKE_OPAQUE(std::vector<apse_ast1::asnptr>);
PYBIND11_DECLARE_HOLDER_TYPE(T, std::shared_ptr<T>);
PYBIND11_MODULE(apse_py, m) {
  py::enum_<token_type>(m, "token_type")
      .value("token_invalid", token_invalid)
      .value("token_comment", token_comment)
      .value("token_word", token_word)
      .value("token_string", token_string)
      .value("token_punct", token_punct)
      .value("token_ws", token_ws)
      .value("token_max", token_max);

  py::class_<apse_tokener<>::token_t>(m, "token")
      .def_readonly("type", &apse_tokener<>::token_t::type)
      .def_readonly("capture", &apse_tokener<>::token_t::capture);

  py::class_<apse_tokener<>>(m, "tokener")
      .def("parse", &apse_tokener<>::parse)
      .def_readonly("tokens", &apse_tokener<>::tokens)
      .def_readonly("errors", &apse_tokener<>::errors);

  m.doc() = "apse_py framework"; // optional module docstring
  m.def("parse", &parse, "parse a string");

  
  py::class_<asn, asnptr>(m, "asn")
//      .def(py::init<>())
      .def_property_readonly("arr", &apse_ast1::asnptr_arr)
      .def_property_readonly("str", &apse_ast1::asnptr_str)
      .def_property_readonly("type", &apse_ast1::asnptr_type)
      .def_property_readonly("scope", [](asnptr ptr){return ptr->scope();}, py::return_value_policy::reference)
      .def_property_readonly("source", [](asnptr ptr){return ptr->source();}, py::return_value_policy::reference)
      .def_property_readonly("list", [](asnptr ptr){return ptr->list();}, py::return_value_policy::reference)
      .def_property_readonly("word", [](asnptr ptr){return ptr->word();}, py::return_value_policy::reference);
  py::class_<apse_ast1>(m, "ast1")
      .def(py::init<>())
      .def("ingest", &apse_ast1::ingest);
  py::class_<asn_source>(m, "asn_source")
      .def_property_readonly("name", [](asn_source *src){return src?src->name:"";})
      .def_property_readonly("uri", [](asn_source *src){return src?src->uri:"";})
      .def_property_readonly("text", [](asn_source *src){return src?src->text:"";});

  py::class_<asn_scope>(m, "asn_scope")
      .def_property_readonly("content", [](asn_scope *scope)->asnptr{return scope?scope->scope_content:NULL;})
      .def_property_readonly("op", [](asn_scope *scope){return scope?scope->scope_op():"";});

  py::class_<asn_list>(m, "asn_list")
      .def_property_readonly("content", [](asn_list *list){return list?list->items:asnptrlist();})
      .def_property_readonly("op", [](asn_list *list){return list?list->list_op():"";});

  py::bind_vector<asnptrlist>(m, "asnptrlist");
  /*
  py::class_<asnptrlist>(m, "asnlist")
      .def("__len__", [](const asnptrlist &v) { return v.size(); })
      .def("__iter__", [](asnptrlist &v) {
        return py::make_iterator(v.begin(), v.end());
      }, py::keep_alive<0, 1>()); /* Keep vector alive while iterator is used */
      
}
