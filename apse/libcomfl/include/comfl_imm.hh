



/*

enum dgnt{
  dgnt_array,
};
// directed graph node... immutable previous and immutable next
enum dgnet{
  dgnet_d7,
  dgnet_d7k,
  dgnet_k,
  dgnet_kk,
  dgnet_kkkk,
};
struct dgne_d7{
  dgnet et:8 = dgnet_d7;
  size_t d7:56;
  dgne_d7(size_t sz):d7(sz){
    assert(sz < (1<<56));
  }
};
enum nektype{
  nekt_idx,
  nekt_uid,
};
struct nek{
  nektype kty:8;
  size_t kidx:56;
};

struct dgne_d7k{
  // metagroups
  dgnet et:8 = dgnet_d7;
  size_t d7:56;
  
  nek keys[1];
  dgne_d7(size_t sz, nek k1):d7(sz), keys{k1}{
    assert(sz < (1<<56));
  }
};

// element key type
struct dgne {
  dgnet et; // element type

  void addElement(){
    // add reference... all references becomes dangling.
  }
};

struct dgne_iter{
  dgne * current;
  dgne * begin;
  dgne * end;
  size_t esz;
  dgn * node;
};
struct dgne_writer{
  void insert(dgne_d7 &d7);
  void remove();

};

struct dgn{
  dgnt type:8;
  dgnet et:8;
  dgnext *ext();
  add(iter_t iter);
  remove(iter_t iter);
  dgne_iter begin();
  dgne_iter next();
  size_t esz(){static size_t et_esz = {}return et_esz[et];}
  inline dgne &at(size_t idx){}
  dgnet et(){}
};

struct dgnp {
  dgn *me;
  dgnt nt(); // node type
  size_t esz(); // element size in bits
  size_t eszb(); // element size in bytes
  size_t count(); // count of this array
  size_t maxcount(); // max count of this node
  dgnp  nprev();
  dgnp  nnext();
};
struct dgp {

};

*/