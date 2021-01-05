#pragma once
#include <cstddef>
#include <cstdint>

__attribute__ ((packed))
struct cfvt{
  // array at index
  // array elem from array at index a, index b
  // indirect seq
  // indirect indices
  // indirect fullpath (1, 3, 2, 4, 5)
  // list header: list element type, headless element
  // list element header: 
  // list hash
};

struct cfv{
  cfvt type;
  union{
    int64_t ival56:56;
  };
};
struct cfsv {
  cfstore *store;
};

struct cfstore{
};