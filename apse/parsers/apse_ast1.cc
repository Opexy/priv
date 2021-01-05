#include "apse_ast1.hh"
#include "fmt/format.h"
void apse_ast1::print(fmt::memory_buffer &mem, asnptr node, int indent, const char *suffix){
  auto prl = [&]<typename... Args>(int ind, Args&&... args)->void{
    try{
    fmt::format_to(mem, "{:<{}}", "", ind);
    fmt::format_to(mem, std::forward<Args>(args)...);
    }
    catch(const fmt::format_error &e){
      fmt::print("{}", e.what());
    }
  };
  if(!node) {
    prl(indent, R"("NULL"{})", suffix);
  }
  else if(auto source = node->source(); source){
    prl(indent, R"({{"source":"{}", "uri":"{}", "text":"{}", "ast":{})",
      source->name, source->uri, source->text, "\n");
    print(mem, source->scope_content, indent+2, "\n");
    prl(indent, "}}{}", suffix);
  }
  else if(auto scope = node->scope(); scope){
    prl(indent, R"({{"scope":"{}{}", "scope_content":{})",
      (char)scope->op.ch_open, (char)scope->op.ch_close, "\n");
    print(mem, scope->scope_content, indent+2, "\n");
    prl(indent, "}}{}", suffix);
  }
  else if(auto list = node->list(); list){
    prl(indent, R"({{"opr":"{}", "list":[{})", (char)list->op.opchar, "\n");
    for(auto x:list->items)
      print(mem, x, indent+2, ",\n");
    mem.resize(mem.size()-1);
    mem.data()[mem.size()-1] = '\n';
    prl(indent, "]}}{}", suffix);
  }
  else if(auto word = node->word(); word){
    prl(indent, R"("{}"{})", word->text, suffix);
  }
  else {
    assert(false);
  }
}
std::string apse_ast1::print(asnptr node) {
  fmt::memory_buffer mem;
  print(mem, node, 0, "\n");
  return std::string(mem.data(), mem.size());
}

typedef apse_ast1::asnptr asnptr;
auto asnptr_type(asnptr node){
  return apse_ast1::asnptr_type(node);
}
auto asnptr_str(asnptr node){
  return apse_ast1::asnptr_str(node);
}
auto asnptr_arr(asnptr node){
  return apse_ast1::asnptr_arr(node);
}
std::string asnptr_print(asnptr node){
  return apse_ast1::print(node);
}

int main(){
  auto x = apse_ast1();
  auto src = R"(
UIAction:action{
  Anchor:Widget,
  Type:Exec{ExecType}|Context{}|Drag|Expand|Rotate,
  KeyEvent{}
};
main:(CreateAppMainWindow);
CreateAppMainWindow:(CreateOSAppWin, CreateGLWindow);
CreateGLWindow:OsAppWin;
)";
/*
  auto src = R"(
(a{
  b
});
c:(d);
)";
*/
  auto y = x.ingest(src);
  auto arr0 = y->arr()[0];
  auto arr1 = arr0->arr()[1];
  auto str = arr0->str();
}