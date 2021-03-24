#include "fmt/format.h"
#include "flow.h"
using namespace flow;
struct flow_schema {
  keysp s;
  keysp pathver;

  keysp cmdline; // [subcmds:cmdlines,  cmdline_flags, cmdline_inputs, cmdline_outputs];
  keysp cmdline_main;
  keysp cmdline_arg; // each flag may associate with a file.
  keysp cmdline_arg_flag;
  keysp cmdline_arg_file;
  keysp cmdline_implicit_inputs;
  flow_schema();
};

flow_schema::flow_schema(){
  s = create_schema();
  pathver = create_ksp(s, "pathver", "", KSP_COMPOSIT, KSP_COLUMN, 0,0);
  create_ksp(pathver, "path", "path", KSP_PATH, KSP_COLUMN, 1, 1);
  create_ksp(pathver, "mtime", "mtime", KSP_TIMESTAMP, KSP_INLINE, 1, 1);
  create_ksp(pathver, "gitver", "gitver", KSP_HASH_SHA1, KSP_INLINE, 1, 1);

  cmdline = create_ksp(s, "cmdline", "", KSP_COMPOSIT, KSP_COLUMN, 0,0);
  cmdline_main = create_ksp(cmdline, "cmdline_main", "pathver", KSP_REFERENCE, KSP_INLINE, 1, 1);
  cmdline_arg = create_ksp(cmdline, "cmdline_arg", "", KSP_COMPOSIT, KSP_INLINE, 0, 0);
  cmdline_arg_flag = create_ksp(cmdline_arg, "cmdline_arg_flag", "", KSP_STRING, KSP_INLINE, 0, 1);
  cmdline_arg_file = create_ksp(cmdline_arg, "cmdline_arg_file", "pathver", KSP_REFERENCE, KSP_INLINE, 0, 1);

  cmdline_implicit_inputs = create_ksp(s, "cmdline_implicit_inputs", "pathver", KSP_REFERENCE, KSP_INLINE, 0, 0);
}
int main(int argc, char **argv) {
  flow_schema fs = flow_schema();

  auto st = create_stor();
  //auto trans = st.begin_transaction();
  auto compile_line = kval_add(NULL, cmdline);
  
  x.set(cmdline_main, "");
  x.set(cmdline_main);
  x.commit();


  return 0;
}