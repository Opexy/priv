#include "libhook.h"
#include <dlfcn.h>
#include <thread>
#include <sys/types.h>
#include <unistd.h>
#include <fmt/format.h>
#include <mqueue.h>

#ifdef _DEBUG
#define LOG(...) fmt::print(__VA_ARGS__)
#else
#define LOG(...)
#endif

char **proc_env;
using time_point = std::chrono::system_clock::time_point;
static void on_proc_start(const HmsgProcStart &proc_start){
  LOG("HmsgProcStart {}: {}\n", proc_start.pid(),
    fmt::join(proc_start.argv(), "|"));
}
static void on_proc_end(const HmsgProcEnd &proc_end){
  LOG("HmsgProcEnd {}\n", proc_end.pid());
}
static void on_file_open(const HmsgFileOpen &file_open){
  LOG("HmsgFileOpen {}:{}\n", file_open.pid(), file_open.path());
}
inline static hmsg_listener default_hmsg_listener = {
  on_proc_start, on_proc_end, on_file_open, true, false
};

struct _rawmsg {
  char *buf;
  int buf_sz;
  int payload_sz;
  inline uint8_t *msg(){return (uint8_t *)buf + sizeof(time_point);};
  inline int msg_max(){return buf_sz - sizeof(time_point);};
  inline void set_payload_sz(int payload_size){
    payload_sz = payload_size;
  }
  inline void set_msg_sz(int msg_size){
    set_payload_sz(msg_size - sizeof(time_point));
  }
  inline int msg_sz(){return payload_sz + sizeof(time_point);}
  void reserve_payload(int size) {
    if(buf_sz < size + 4) {
      buf_sz = size + 4;
      buf = (char *)realloc(buf, buf_sz);
    }
  }
  time_point &stamp(){return *(time_point*)buf;}
};


static hook_server* hook_server_ = NULL;
static char mq_name[32] = {};
static char mq_name_env[32] = {};
static char mq_preload_env[32] = {};

static _rawmsg rawmsg_;
static mqd_t mqd; 

static inline 
void sendmsg(Hmsg & m) {
  int payload_size = m.ByteSize();
  rawmsg_.reserve_payload(payload_size);
  m.SerializeWithCachedSizesToArray(rawmsg_.msg());
  rawmsg_.stamp() = std::chrono::system_clock::now();
  rawmsg_.set_payload_sz(payload_size);
  int err = mq_send(mqd, (char *)rawmsg_.buf, rawmsg_.msg_sz(), 0);// When it fails...
  if(err != 0) {
    LOG("{} {}\n",mqd, errno);
    assert(false);
  }
}
void hook_server::exit(){
  Hmsg hexit;
  hexit.set_allocated_exit(new HmsgExit());
  sendmsg(hexit);
  thread.join();
}
inline static void process_msg(hook_server *server, const Hmsg & msg) {
  LOG("Received Message\n");
  auto &listeners = server->listeners;
  if(msg.has_exit()) {
    server->done = true;
    return;
  }
  for(auto &listener : listeners) {
    if(listener.listening) {
      if(msg.has_file_open()) {
        if(listener.on_file_open)
          listener.on_file_open(msg.file_open());
      } else if(msg.has_proc_start()){
        if(listener.on_proc_start)
          listener.on_proc_start(msg.proc_start());
      } else if(msg.has_proc_end()) {
        if(listener.on_proc_end)
          listener.on_proc_end(msg.proc_end());
      }
    }
  }
}

hook_server *create_hook_server(char **envpp){
  if(!hook_server_) {
    hook_server_ = new hook_server();
    snprintf(mq_name, sizeof(mq_name), "/tmp_%x", rand());
    snprintf(mq_name_env, sizeof(mq_name_env), "LIBHOOK_MQ_NAME=%s", mq_name);
    mqd = mq_open(mq_name, O_RDWR |O_CREAT, 0644);
    if(mqd == -1) {
      LOG("mqd server failed with {}\n", errno);
    }
    hook_server_->listeners.emplace_back(default_hmsg_listener);
    for(char **env = envpp; *env != NULL; env++) {
      hook_server_->envs.push_back(*env);
    }
    hook_server_->envs.push_back(mq_name_env);
    hook_server_->envs.push_back("LD_PRELOAD=libhook.so");
    hook_server_->envs.push_back(NULL);
    hook_server_->thread = std::thread([](){
      unsigned int msgprio;
      Hmsg hmsg;
      while(false == hook_server_->done) {
        auto ret = mq_receive(
          mqd, (char *)rawmsg_.buf,
          rawmsg_.buf_sz, &msgprio);
        if(ret > 0){
          rawmsg_.set_msg_sz(ret);
          if(true == hmsg.ParseFromArray(rawmsg_.msg(), rawmsg_.payload_sz)){
            process_msg(hook_server_, hmsg);
          } else {
            assert(false);
          }
        }
        else if(EMSGSIZE == errno) {
          LOG("msg size!\n");
          struct mq_attr attr;
          mq_getattr(mqd, &attr);
          //rawmsg_.set_msg_sz(attr.mq_msgsize);
          rawmsg_.reserve_payload(attr.mq_msgsize);
        } else{
          assert(false);
        }
      }
    });
  }
  return hook_server_;
}


static bool hook_ipc_open_client(void) {
  char *mq_name = getenv("LIBHOOK_MQ_NAME");
  if(mq_name && mq_name[0]) {
    mqd = mq_open(mq_name, O_WRONLY);
    if(mqd == -1) {
      LOG("cannot open: {} => {}\n", mq_name, errno);
    }
    return true;
  }
  return false;
}
static void hook_ipc_open_server();
static void hook_ipc_close();
static void hook_ipc_client_sendmsg(char *msg, int msglen);

static int (*main_orig)(int, char **, char **);
static int main_client_(int argc, char ** argv, char ** envpp){
  auto pid = getpid();
  if(true == hook_ipc_open_client())
  {
    LOG("Client Started\n");

    for(char **env = envpp; *env != NULL; env++) {
      LOG("{}\n", *env);
    }

    Hmsg hmsg = Hmsg();
    HmsgProcStart *proc_start = new HmsgProcStart();
    HmsgProcEnd *proc_end = new HmsgProcEnd();
    proc_start->set_pid(pid);
    proc_start->set_ppid(getppid());
    for(int ii = 0; ii < argc; ii++){
      proc_start->add_argv(argv[ii]);
    }
    hmsg.set_allocated_proc_start(proc_start);
    proc_start = NULL; // hmsg took ownership
    sendmsg(hmsg);
    LOG("hmsg start sent\n");
    LOG("Client Started\n");
    main_orig(argc, argv, envpp);
    LOG("Client exit\n");
    hmsg.Clear();
    proc_end->set_pid(pid);
    hmsg.set_allocated_proc_end(proc_end);
    proc_end = NULL;
    sendmsg(hmsg);
  } else {
    main_orig(argc, argv, envpp);
  }
  return 0;
}

extern "C"{
int __libc_start_main(
  int (*main)(int, char **, char **),
  int argc,
  char **argv,
  int (*init)(int, char **, char **),
  void (*fini)(void),
  void (*rtld_fini)(void),
  void *stack_end)
{
  main_orig = main;
  /* Find the real __libc_start_main()... */
  decltype(__libc_start_main)* orig = reinterpret_cast<decltype(__libc_start_main)*>(dlsym(RTLD_NEXT, "__libc_start_main"));
  /* ... and call it with our custom main function */
  return orig(main_client_, argc, argv, init, fini, rtld_fini, stack_end);
}
}