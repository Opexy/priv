add_executable(apse apse_main.cc)
target_link_libraries(apse PRIVATE libapse)
add_custom_command(TARGET apse
    PRE_BUILD DEPENDS apse_py WORKING_DIRECTORY
    COMMAND cog -r -c -I \"${CMAKE_SOURCE_DIR}:${CMAKE_BINARY_DIR}/parsers\" -p \"from gencode import codeout;\"
        ${CMAKE_CURRENT_SOURCE_DIR}/gena.hh
)
