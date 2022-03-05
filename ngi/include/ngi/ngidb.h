#pragma once
#include <cstdint>
#include <string>


class DbCtxImpl;
typedef DbCtxImpl * DbCtxImplPtr;
typedef const std::string & ArgStr;
class DbCtx {

private:
  DbCtxImpl *impl; // TODO: stack vs linked list...
  DbCtx(DbCtxImpl *impl) {this->impl = impl;}
  // DbCtxInfo *info;
public:
  static DbCtx createRoot();

  DbCtx createClass(const std::string & clsName);

  DbCtx lookup();
  DbCtx lookupKey();
  DbCtx lookupValue();

  DbCtx newElem();

  DbCtx setMemb(const std::string & str);

  DbCtx onFinished();

  DbCtx onMember();

  DbCtx setAttr(const char *attr);
  // ftn from Attributes
  DbCtx setInt64();
  DbCtx setInt32();
  DbCtx setText();
};




#if 0
namespace ngi::db
{
#pragma region Ivar
struct I64 {
  int64_t i64;
};

#define VtyCls 0
#define VtySys 1
struct IvCls:I64 {};
struct IvVal:I64 {};
struct IvBase {
  IvCls vty;
  IvVal val;
};

template <typename Ty>
struct Ivar:IvBase {};
#pragma endregion Ivar

struct Cmd:Ivar<Cmd>{
  IvCls(Cmd);
};
struct Sys {
  virtual ~Sys() = 0;
  virtual void Exec(Cmd);
};
struct Cmd {
  CmdName name;
  CmdSys 
};
#define DefIvar(iv_name) struct iv_name:Ivar<iv_name>
DefIvar(Cmd){
  Cmd(cmdName, system){
    cls()
  }
};
} // namespaace ngi::db
#endif

