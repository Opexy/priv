add_library(libapse SHARED libapse.cc)
set_target_properties(libapse PROPERTIES PREFIX "")
target_include_directories(libapse PUBLIC include)
target_link_libraries(libapse PUBLIC libcomfl)
