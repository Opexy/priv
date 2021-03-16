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
#define LISTENS_ON 3232
MODULE_LICENSE("GPL");
MODULE_AUTHOR("Mi Chen");
MODULE_DESCRIPTION("Example Kernel Module");
MODULE_VERSION("0.01");

struct listen_thread {
  struct task_struct *thread;
  struct socket *listen;
  struct sockaddr_in addr;
  int len;
  int alive;
  unsigned char buf[64000];
};
struct listen_thread * listen_thread;

static void start_listener(void){
  int size, err;
  lock_kernel();
  listen_thread->running=1;
  current->flags |= PF_NOFREEZE;
  daemonize(MODULE_NAME);
  allow_signal(SIGKILL);
  unlock_kernel();
  if ((err = sock_create(AF_INET, SOCK_DGRAM, IPPROTO_UDP, &kthread->sock)) < 0)
  {
    printk(KERN_INFO MODULE_NAME": Could not create a datagram socket, error = %d\n", -ENXIO);
    goto out;
  }
  memset(&kthread->buf, 0, sizeof(struct sockaddr));

}

//ref: https://kernelnewbies.org/Simple_UDP_Server
static int __init lkm_acts_init(void) {
  printk(KERN_INFO "Initializing hello world!\n");
  listen_thread = kmalloc(sizeof(*listen_thread));
  memset(listen_thread, 0, sizeof(listen_thread));
  listen_thread->thread = kthread_run(start_listener, NULL, MODULE_NAME);
  if (IS_ERR(listen_thread->thread)) 
  {
    printk(KERN_INFO MODULE_NAME":start_listener failed\n");
    kfree(listen_thread);
    listen_thread = NULL;
    return -ENOMEM;
  }

 return 0;
}
static void __exit lkm_acts_exit(void) {
 printk(KERN_INFO "Exit hello world!\n");
}
module_init(lkm_example_init);
module_exit(lkm_example_exit);


