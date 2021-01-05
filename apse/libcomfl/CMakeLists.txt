add_library(libcomfl SHARED libcomfl.cc)
set_target_properties(libcomfl PROPERTIES PREFIX "")
target_include_directories(libcomfl PUBLIC include)
target_link_libraries(libcomfl PUBLIC -lpthread -ldl -lfmt -flto -lrt)
add_dependencies(libcomfl apse_py)
#add_custom_command(TARGET libcomfl
#    PRE_BUILD DEPENDS apse_py WORKING_DIRECTORY
#    COMMAND cog -r -c -I \"${CMAKE_SOURCE_DIR}:${CMAKE_BINARY_DIR}/parsers\" -p \"from gencode import codeout;\"
#        ${CMAKE_CURRENT_SOURCE_DIR}/include/comfl_metacode.hh
#)

#[[
add_custom_command(TARGET libcomfl
    PRE_BUILD
    COMMAND cog odb ${CMAKE_SOURCE_DIR}/gencode.py -o /home/david/dev/ --std c++11 -I/home/david/dev/ -d sqlite --generate-    query --generate-schema ${PROMOTER_LIB_PREFIX}/entities/person.hpp
    DEPENDS ${PROJECT_NAME}
    WORKING_DIRECTORY ${CMAKE_CURRENT_SORUCE_DIR}
    VERBATIM
)
]]