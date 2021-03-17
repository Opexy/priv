//ref: https://kernelnewbies.org/Simple_UDP_Server
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/init.h>
#include <linux/errno.h>
#include <linux/types.h>
#include <linux/netdevice.h>
#include <linux/ip.h>
#include <linux/in.h>
#include <linux/kthread.h>
#include <linux/delay.h>
//https://www.kernel.org/doc/htmldocs/kernel-locking/locks.html#lock-intro
#include <linux/mutex.h>
#include <linux/circ_buf.h>

#define MODULE_NAME "kudpmsg"
MODULE_LICENSE("GPL");
MODULE_AUTHOR("Mi Chen");
MODULE_DESCRIPTION("Example Kernel Module");
MODULE_VERSION("0.01");

#define LISTEN_PORT 3232
#define BUF_MAXSIZE 63999
#define LOG_INFO_MODULE(...) printk(KERN_INFO  MODULE_NAME __VA_ARGS__)
enum thread_state
{
  THREAD_UNINITIALIZED = 0,
  THREAD_ALIVE         = 1,
  THREAD_KILLED        = 2
};
struct listen_thread_data
{
  struct task_struct  *thread;
  struct socket       *sock_listen;
  struct sockaddr_in  addr;
  struct msghdr       msg;
  enum thread_state   state;
  int err;
  int len;
  unsigned char buf[BUF_MAXSIZE+1];
};
static struct listen_thread_data *ltd;
static void thread_wait_for_mask_(enum thread_state state_mask) {
  while(ltd == NULL || 0 == (ltd->state & state_mask)){
    // Not spin-locking as no hurry to such an action.
    // Not using mutexing as no real contending writes.
    // core.c, "Don't schedule slices shorter than 10000ns", which is 10us
    // not want to sleep more than 10ms which may become noticeable.
    usleep_range(10,10000);
    // may worth investigating: wait_for_completion
  }
}
static int listen_thread_main(void *thread_data)
{  
  int err, sig, iov_copied;
  (void)thread_data;
  current->flags |= PF_NOFREEZE; // shall not be frozen...
  // daemonize(MODULE_NAME); -- 1 ref: no longer needed as later of 2.6.
  allow_signal(SIGKILL);// only allow this signal
  if ((err = sock_create(AF_INET, SOCK_DGRAM, IPPROTO_UDP, &ltd->sock_listen)) < 0)
  {
    LOG_INFO_MODULE( ":thread: Could not create a datagram socket, error = %d\n", err);
    goto out;
  }

  memset(&ltd->buf, 0, sizeof(struct sockaddr));
  ltd->addr.sin_family = AF_INET;
  ltd->addr.sin_addr.s_addr = htonl(INADDR_ANY);
  ltd->addr.sin_port = htons(LISTEN_PORT);
  err = ltd->sock_listen->ops->bind(
    ltd->sock_listen, 
    (struct sockaddr *)&ltd->addr, sizeof(struct sockaddr));
  if (err < 0)
  {
    LOG_INFO_MODULE( ":thread: Could not bind or connect to socket, error = %d\n", -err);
    goto close_and_out;
  }
  
  LOG_INFO_MODULE( ":thread: listening on port %d\n", LISTEN_PORT);
  for (;;) // better than while(true) according to some
  {
    ltd->len = sock_recvmsg(ltd->sock_listen, &ltd->msg, 0);
    //ltd->len = ksocket_receive(ltd->sock_listen, &ltd->addr, buf, BUF_MAXSIZE);
    sig = signal_pending(current);
    if (sig != 0) {
      LOG_INFO_MODULE( ":thread: received signal = %d\n", sig); // kill signal
      if(!kthread_should_stop()){
        LOG_INFO_MODULE( ":thread: didn't want to stop\n"); // kill signal
      }
      break;
    }
    if(kthread_should_stop()){
      LOG_INFO_MODULE( ":thread: kthread_should_stop() evals to TRUE\n");
      break;
    }
    if (ltd->len < 0)
      LOG_INFO_MODULE( ":thread: error getting datagram, sock_recvmsg error = %d\n", ltd->len);
    else if(ltd->len > 0)
    {
      LOG_INFO_MODULE( ":thread: received %d bytes\n", ltd->len);
      // scaterred gather.
      if(ltd->len > BUF_MAXSIZE) {
        LOG_INFO_MODULE( ":thread: message too large: %d bytes\n", ltd->len);
        ltd->len = BUF_MAXSIZE;
      }
      iov_copied = (int)copy_from_iter(ltd->buf, ltd->len, &ltd->msg.msg_iter);
      if(iov_copied != ltd->len) {
        LOG_INFO_MODULE( ":thread: meserror: iov_copied %d != ltd->len %d\n", iov_copied, ltd->len);
      }
      printk("data: %s\n", ltd->buf);
    }
    else {
      usleep_range(10, 10000);
    } // not optimizing for compiler.
  }

close_and_out:
  sock_release(ltd->sock_listen);
  ltd->sock_listen = NULL;
out:
  ltd->thread = NULL;
  ltd->state = THREAD_KILLED;
  return 0;
}

static int __init lkm_acts_init(void)
{
  LOG_INFO_MODULE( ":initializing\n");
  ltd = vmalloc(sizeof(struct listen_thread_data));
  memset(ltd, 0, sizeof(*ltd));
  ltd->thread = kthread_run(listen_thread_main, NULL, MODULE_NAME);
  if (IS_ERR(ltd->thread))
  {
    LOG_INFO_MODULE( ":start_listener failed\n");
    kfree(ltd);
    ltd = NULL;
    return -ENOMEM;
  }

  return 0;
}

static void __exit lkm_acts_exit(void){
  int err = 0;
  LOG_INFO_MODULE(":exit\n");
  // not using lock_kernel and kill_proc, instead use kthread_stop and kthread_should_stop
  // can return -EINTR if wake_up_process is never called
  // which may happen if calling kthread_create instead of kthread_run
  // or 0 for success
  thread_wait_for_mask_(THREAD_ALIVE | THREAD_KILLED);
    if(ltd->state != THREAD_KILLED){
    err = kthread_stop(ltd->thread);
    if (err < 0) {
      LOG_INFO_MODULE(":unknown error %d while trying to terminate kernel thread\n",-err);
      if(ltd->sock_listen != NULL){
        sock_release(ltd->sock_listen);
        ltd->sock_listen = NULL;
      }
      // not freeing as for potential dangling pointer danger.
    }
    else 
    {
      thread_wait_for_mask_(THREAD_KILLED);
      LOG_INFO_MODULE(":succesfully killed kernel thread!\n");
      vfree(ltd);
      ltd = NULL;
    }
  }
}

module_init(lkm_acts_init);
module_exit(lkm_acts_exit);
