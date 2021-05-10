#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

#include "fmt/format.h"
#include "cxxopts.hpp"

#include "flow.h"
#include "libhook.h"
#include "tokener.hpp"
#define LOG(...) fmt::print(__VA_ARGS__)


using namespace flow;
#if 0
struct flow_schema {
  keysp_schema s;
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
  pathver = schema_create_ksp(s, "pathver", "", KSP_COMPOSIT, KSP_ATTR_COLUMN, 0,0);
  create_ksp(pathver, "path", "path", KSP_PATH, KSP_ATTR_COLUMN, 1, 1);
  create_ksp(pathver, "mtime", "mtime", KSP_TIMESTAMP, KSP_ATTR_INLINE, 1, 1);
  create_ksp(pathver, "gitver", "gitver", KSP_HASH_SHA1, KSP_ATTR_INLINE, 1, 1);

  cmdline = schema_create_ksp(s, "cmdline", "", KSP_COMPOSIT, KSP_ATTR_COLUMN, 0,0);
  cmdline_main = create_ksp(cmdline, "cmdline_main", "pathver", KSP_REFERENCE, KSP_ATTR_INLINE, 1, 1);
  cmdline_arg = create_ksp(cmdline, "cmdline_arg", "", KSP_COMPOSIT, KSP_ATTR_INLINE, 0, 0);
  cmdline_arg_flag = create_ksp(cmdline_arg, "cmdline_arg_flag", "", KSP_STRING, KSP_ATTR_INLINE, 0, 1);
  cmdline_arg_file = create_ksp(cmdline_arg, "cmdline_arg_file", "pathver", KSP_REFERENCE, KSP_ATTR_INLINE, 0, 1);

  cmdline_implicit_inputs = schema_create_ksp(s, "cmdline_implicit_inputs", "pathver", KSP_REFERENCE, KSP_ATTR_INLINE, 0, 0);

  create_stor("/tmp/test", s);
}
#endif

// helper function here.
void add_compilation_cmd(strarg strcmd){
  static constexpr int MAX_ARGS = 2048;
  char *argv[MAX_ARGS] = {};
  int argc = MAX_ARGS;
  std::string str = strcmd;
  if(false == str_argv((char *)str.c_str(), str.length(), argv, argc) ) {
    return;
  }

  auto opts = cxxopts::Options("hello");
  opts.allow_unrecognised_options();
  opts.parse(argc, argv);
}
#include <link.h>
int callback (struct dl_phdr_info *info,
                 size_t size, void *data)
{
  fmt::print("{}\n", info->dlpi_name);
  return 0;
}

int main(int argc, char **argv, char **envpp) {
  //flow_schema fs = flow_schema();

  if(argc > 1) {
    auto *server = create_hook_server(envpp);
    dl_iterate_phdr(callback, NULL);
    pid_t pid = fork ();		/* Run CMD as child process.  */
    if (pid < 0)
      assert(false);
    else if (pid == 0)
    {/* If child.  */
      execvpe(argv[1], argv+1, (char * const *)server->envs.data());
    }
    else {
      int status;
      pid = wait (&status);
      if (pid == -1) {
        LOG("Error Wait");
        return 0;
      }
      server->exit();
    }
  } else {
    strarg strcmd = "clang popcnt.cc -o /tmp/program.bin -lpthread cctest.cc -std=c++2a -lstdc++ -g -lbenchmark -lm -fPIC -flto -lfmt -ldl -lrt  -O3 -mavx";
    add_compilation_cmd(strcmd);
  }
  //
  //auto st = create_stor();
  //auto trans = st.begin_transaction();
  //auto compile_line = kval_add(NULL, cmdline);
  
  //auto cmdline = kval_add(fs.cmdline);
  //auto cmdline_main = kval_add_

  //kval_set_string(compile_line, )x.set(cmdline_main, "hello");
  //x.set(cmdline_main);
  //x.commit();

  return 0;
}