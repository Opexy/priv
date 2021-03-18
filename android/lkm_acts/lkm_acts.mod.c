#include <linux/module.h>
#include <linux/build-salt.h>
#include <linux/vermagic.h>
#include <linux/compiler.h>

BUILD_SALT;

MODULE_INFO(vermagic, VERMAGIC_STRING);
MODULE_INFO(name, KBUILD_MODNAME);

__visible struct module __this_module
__section(.gnu.linkonce.this_module) = {
	.name = KBUILD_MODNAME,
	.init = init_module,
#ifdef CONFIG_MODULE_UNLOAD
	.exit = cleanup_module,
#endif
	.arch = MODULE_ARCH_INIT,
};

#ifdef CONFIG_RETPOLINE
MODULE_INFO(retpoline, "Y");
#endif

static const struct modversion_info ____versions[]
__used __section(__versions) = {
	{ 0x3be6cc8f, "module_layout" },
	{ 0xfb578fc5, "memset" },
	{ 0xbfdcb43a, "__x86_indirect_thunk_r11" },
	{ 0xf0fdf6cb, "__stack_chk_fail" },
	{ 0x2b71db1e, "current_task" },
	{ 0x999e8297, "vfree" },
	{ 0x972f7bb9, "send_sig" },
	{ 0x624ccbce, "kthread_stop" },
	{ 0x997535fe, "kernel_recvmsg" },
	{ 0x6df1aaf1, "kernel_sigaction" },
	{ 0x94ffb7c, "sock_release" },
	{ 0x12a38747, "usleep_range" },
	{ 0xb3f7646e, "kthread_should_stop" },
	{ 0x2cd90edd, "__cfi_slowpath" },
	{ 0xee33f6c, "sock_create" },
	{ 0x37a0cba, "kfree" },
	{ 0x659d1a47, "wake_up_process" },
	{ 0x4d0e257, "kthread_create_on_node" },
	{ 0xd6ee688f, "vmalloc" },
	{ 0xc5850110, "printk" },
};

MODULE_INFO(depends, "");

