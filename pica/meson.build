# Process IO/Cognitive Analyzer
project(
  'pica',
  'c', 'cpp', default_options : ['c_std=c17', 'cpp_std=c++17'],
  version:'1.0.0'
)

inc = include_directories('include')

subdir('include')


libpica_mem_sources = 'mem/pica_mem.cpp'
libpica_mem = shared_library('pica_mem', libpica_mem_sources, 
  include_directories:inc, install:true)

test_pica_mem_sources = 'tests/test_pica_mem.cpp'
test_pica_mem = executable('test_pica_mem', test_pica_mem_sources, 
  include_directories:inc, link_with:libpica_mem)


#subdir(msg)
#subdir(proc)

