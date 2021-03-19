obj-m:=lkm_acts.o
ccflags-y := -M -MF
all:
	make -C ~/kernel/common M=$(shell pwd)/../ modules

clean:
	make -C ~/kernel/common M=$(shell pwd)/../ clean
