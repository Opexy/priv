#Streamlined Automatic Generative Engine
cmake_minimum_required(VERSION 3.16)
project(sage VERSION 1.0)
if (NOT CMAKE_BUILD_TYPE) 
set(CMAKE_BUILD_TYPE Debug) 
endif()
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/${CMAKE_BUILD_TYPE})

set(compile_wall "$<BUILD_INTERFACE:-Wall;-Wextra;-Wshadow;-Wformat=2;-Wunused>")
set(gcc_cxx_like "$<COMPILE_LANG_AND_ID:CXX,ARMClang,AppleClang,Clang,GNU>")
set(gcc_c_like "$<COMPILE_LANG_AND_ID:C,ARMClang,AppleClang,Clang,GNU>")

add_compile_options(
  "$<${gcc_cxx_like}:-std=c++2a;-fPIC;-fno-omit-frame-pointer>"
  "$<${gcc_c_like}:-std=c18;-fPIC;-fno-omit-frame-pointer>"
  "$<$<CONFIG:Debug>:-D_DEBUG;-O0;${compile_wall}>"
  "$<$<CONFIG:Release>:-DNDEBUG;${compile_wall}>")

add_link_options(-lpthread -ldl -lfmt -flto)
add_link_options(
    "$<$<CONFIG:Debug>:-O0>")

#add_subdirectory(parsers)
#add_subdirectory(websage)
add_subdirectory(libsage)
add_subdirectory(appsage)
#add_subdirectory(libsage)
#add_subdirectory(comli)
#add_subdirectory(apse)


