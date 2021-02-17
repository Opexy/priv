add_library(libsage SHARED libsage.cc libsage_flowmgr.cc libsage_shmem.cc)
set_target_properties(libsage PROPERTIES PREFIX "")
target_include_directories(libsage PUBLIC include)
