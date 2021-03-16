#CXX=~/llvm-project/build/bin/clang
CXX=gcc
CFLAGS="-I~/priv/common/cpp -std=c++2a -g -O4 -flto -fPIC -pthread"
set -x #echo on
$CXX $CFLAGS ~/priv/common/cpp/mt_utils_avx2.cc -c -o /tmp/mt_utils_avx2.cc.o &
$CXX $CFLAGS ~/priv/common/cpp/mt_utils.cc -c -o /tmp/mt_utils.cc.o &
$CXX $CFLAGS ~/cctest/mt_queue.cc -c -o /tmp/libmt_queue.so -shared &
wait
#llvm-lto /tmp/mt_queue.cc.o /tmp/mt_utils.cc.o  --mcpu=x86-64 -O=3 -o /tmp/mt_out.o --exported-symbol="main"
$CXX $CFLAGS /tmp/libmt_queue.so /tmp/mt_utils.cc.o /tmp/mt_utils_avx2.cc.o -lstdc++ -lbenchmark -lm -lfmt -ldl -lrt -lprofiler $@