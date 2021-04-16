cmake_minimum_required(VERSION 3.16)
project(gendb VERSION 1.0)
if (NOT CMAKE_BUILD_TYPE) 
set(CMAKE_BUILD_TYPE Debug) 
endif()

message(${CMAKE_BINARY_DIR})
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR})

set(compile_wall "$<BUILD_INTERFACE:-Wall;-Wextra;-Wshadow;-Wformat=2;-Wunused>")
set(gcc_cxx_like "$<COMPILE_LANG_AND_ID:CXX,ARMClang,AppleClang,Clang,GNU>")
set(gcc_c_like "$<COMPILE_LANG_AND_ID:C,ARMClang,AppleClang,Clang,GNU>")

add_compile_options(
  "$<${gcc_cxx_like}:-std=c++2a;-fPIC;-fno-omit-frame-pointer>"
  "$<${gcc_c_like}:-std=c18;-fPIC;-fno-omit-frame-pointer>"
  "$<$<CONFIG:Debug>:-D_DEBUG;-O0;${compile_wall}>"
  "$<$<CONFIG:Release>:-DNDEBUG;${compile_wall}>")

add_link_options(-lpthread -ldl -flto)
add_link_options(
    "$<$<CONFIG:Debug>:-O0>")

message(CURRENT_BINARY_DIR=${CURRENT_BINARY_DIR})

add_library(hook SHARED libhook.cpp hmsg.pb.cc)
target_link_libraries(hook PUBLIC dl rt protobuf fmt stdc++)

add_library(gendb flow.cpp mt_utils.cc mt_mmap.cpp)
target_link_libraries(gendb PUBLIC tbb hook)

add_executable(client_compiler client_compiler_main.cpp)
target_link_libraries(client_compiler PRIVATE gendb fmt)