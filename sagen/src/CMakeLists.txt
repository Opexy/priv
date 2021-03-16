if("${CMAKE_SYSTEM_NAME}" STREQUAL "Emscripten")
  add_executable(sagen_web sagen_webmain.cc)
else()
  add_executable(sagen_test sagen_test_main.cc sagen_runtime.cc sagen_noweb.cc mt_utils.cc mt_utils_avx2.cc)
#set_source_files_properties(mt_utils_avx2.cc PROPERTIES COMPILE_FLAGS -mavx2)
  target_link_options(sagen_test PRIVATE -lfmt)
endif()

