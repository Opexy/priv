#pragma once
#include "msg.h"
#include "hmsg.pb.h"

void send_hmsg_proc_start();
void send_hmsg_proc_exit();

extern bool listener_should_exit;

struct hmsg_listener {
  std::function<void(const HmsgProcStart &)>on_proc_start;
  std::function<void(const HmsgProcEnd &)>on_proc_end;
  std::function<void(const HmsgFileOpen &)>on_file_open;
  bool listening;
  bool should_exit;
  inline void start_listening(){listening=true;};
  inline void stop_listening(){listening=false;};
};

struct hook_server {
  std::thread thread;
  std::vector<const char *>envs;
  std::vector<hmsg_listener> listeners;
  bool done;
  void exit();
  inline void join(){thread.join();};
};
hook_server *create_hook_server(char **envpp);
// detect exit
extern "C"{
int __libc_start_main(
    int (*main)(int, char **, char **),
    int argc,
    char **argv,
    int (*init)(int, char **, char **),
    void (*fini)(void),
    void (*rtld_fini)(void),
    void *stack_end);
}
