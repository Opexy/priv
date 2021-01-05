#pragma once
// Indexed Typed Handle
struct Ith {
  typedef uint64_t Idx56; // Idx56
  typedef Idx56 Index;
  enum Type {
    ITH_Invalid = 0,
    ITH_Kstr = 1
  };
  Type type:8;
  Index vidx:56;
  inline std::string_view toStrv();
};

struct Kstr:Ith {
  inline static std::vector<std::string> _vec = {};
  inline static std::unordered_map<std::string_view, Ith::Index> _dict = {};
  inline Kstr(const char * str):Kstr(std::string_view(str, strlen(str))){}
  Kstr(std::string_view str){
    type = ITH_Kstr;
    if(auto iter = _dict.find(str); iter != _dict.end()){
      vidx = iter->second;
    } else {
      _vec.emplace_back(str);
      auto idx = _vec.size()-1;
      _dict.emplace(_vec.back(), idx);
      vidx = idx;
    }
  }
};

inline std::string_view Ith::toStrv(){
  if(type == ITH_Kstr){
    return Kstr::_vec.at(vidx);
  }
  else return "";
}

struct Svr{
  inline void addRole(Kstr role){
    
  }
  inline void run(const char *spec){};
  inline static Svr *create(){return new Svr();};
};

