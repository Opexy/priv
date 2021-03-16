KERNEL_PATH=~/kernel
FILES="
.config
arch/x86/boot/bzImage
vmlinux
System.map
"
OUTDIR=$1
if [ ! -f $OUTDIR ]; then 
OUTDIR=$KERNEL_PATH/$1
mkdir -p $OUTDIR;
fi
for f in $FILES; do cp $KERNEL_PATH/common/$f $OUTDIR; done;
cp $KERNEL_PATH/common/scripts/gdb $OUTDIR/scripts/ -rf;
