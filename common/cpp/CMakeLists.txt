cmake_minimum_required(VERSION 3.16)
project(commoncpp VERSION 1.0 LANGUAGES CXX CUDA)
if (NOT CMAKE_BUILD_TYPE) 
set(CMAKE_BUILD_TYPE Debug) 
endif()

message(${CMAKE_BINARY_DIR})
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR})

#set(compile_wall "$<BUILD_INTERFACE:-Wall;-Wextra;-Wshadow;-Wformat=2;-Wunused>")
set(gcc_cxx_like "$<COMPILE_LANG_AND_ID:CXX,ARMClang,AppleClang,Clang,GNU>")
set(gcc_c_like "$<COMPILE_LANG_AND_ID:C,ARMClang,AppleClang,Clang,GNU>")

add_compile_options(
  "$<${gcc_cxx_like}:-std=c++2a;-fPIC;-fno-omit-frame-pointer;-mavx2>"
  "$<${gcc_c_like}:-std=c18;-fPIC;-fno-omit-frame-pointer;-mavx2>"
  "$<$<CONFIG:Debug>:-D_DEBUG;-O0;${compile_wall};>"
  "$<$<CONFIG:Release>:-DNDEBUG;${compile_wall};-O3>")


add_link_options(-lpthread -ldl -flto)
add_link_options(
  "$<$<CONFIG:Debug>:-O0>")

find_package(TBB REQUIRED tbb)

set(LIBMT_FILES 
  mt_utils.cc
  mt_utils_avx2.cc
)

string(APPEND CMAKE_CUDA_FLAGS "-std=c++17 -gencode arch=compute_35,code=sm_35 -Wno-deprecated-gpu-targets")


add_executable(mt_test mt_test_main.cc ${LIBMT_FILES} linearprobing.cu)
target_include_directories(mt_test PRIVATE "../../../tsl/robin-map/include")
target_link_libraries(mt_test PRIVATE tbb benchmark)
