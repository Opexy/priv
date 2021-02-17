#pragma once
// included from libsage.hh
namespace sage{

struct OcDef{
  int mCls;
};
#define ObjCls(name) static constexpr OcDef name{__COUNTER__}
ObjCls(OcTmpStr);
ObjCls(OcActor);

struct Co {
  int mCls;
  int mIdx;
  auto operator <=> (const Co & rhs) const  = default;
};
template <typename Ty, int _CLS = __COUNTER__>
struct CoMgr:Co{
  protected:
  inline static int &_LastIdx(){static int _lastidx; return _lastidx;}
  inline static int _Create(int offset=1){
    static std::atomic<int> idx = 0;
    auto ret = idx.fetch_add(offset);
    return ret;
  }
  public:
  static constexpr int CLS=_CLS;
  typedef Ty SelfType;
  Ty &Self(){return *(Ty *)this;}
};

// TODO: WAL logging.
struct LinearMgr {
  int last_offset = 0;
  struct _Locked {
    int offset;
    int size;
  };
  int _Create(int size){
    return mk_atomic(last_offset).fetch_add(size);
  }
  _Locked _BeginCreate(int size = 1){
    return {lock(&last_offset), size};
  }
  void _EndCreate(const _Locked &locked){
    unlock(&last_offset, locked.offset + locked.size);
  }
};

template <typename _Base>
struct ObjMgrA:LinearMgr {
  infiarr<_Base *> mList;
  template <typename Ty, typename... Args>
  std::pair<Ty*, int> New(Args &&...args){
    auto *ret = new Ty(std::forward<Args>(args)...);
    *mList.push()=ret;
    return std::make_pair(ret, _Create());
  }
};


/* It is going to be:
   let ArgNow = IteratorList(Actor.Movie)
   let ArgNow->X.Set;...
 */

#define DefineCoIntf(ftn) template <typename Ty> struct CoHas##ftn 
template<int _CLS, class _Intf>
struct CoBase:Co{
  static constexpr int32_t CLS = _CLS;
  static constexpr _Intf Intf = _Intf();
  typedef CoBase CoBaseType;
  typedef _Intf CoIntfType;
  CoBase():Co{CLS, POS_INVALID}{}
  CoBase(const Co & init){assert(init.mCls == CLS); mIdx = init.mIdx;}
};

#define MakeOc(cname, CLS) struct cname:CoBase<CLS, cname##Intf>
struct CoInvalidIntf{};
MakeOc(CoInvalid, 0){};

struct CoTmpStrIntf{
  typedef LockList<std::string_view, 256> Strs_;
  auto &Strs()const{
    static LockList<std::string_view, 256> strs;
    return strs;
  }
};
MakeOc(CoTmpStr, 1){
  using CoBaseType::CoBaseType;
  CoTmpStr(const std::string_view &str){
    auto &strs = Intf.Strs();
    auto *strv = strs.Lock();
    *strv = str;
    mIdx = strs.IndexOf(strv);
  }
  std::string_view GetStrv() const {
    return *Intf.Strs().At(mIdx);
  }
  void Release() {
    Intf.Strs().ReleaseIdx(mIdx);
  }
};

struct CoKeyIntf{

};

struct CoNameIntf:CoKeyIntf{
  
};

}