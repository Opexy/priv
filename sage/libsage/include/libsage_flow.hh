#pragma once
namespace sage{
namespace flow{
// Let's just have one flowmgr for now.
enum OpAct_E {
  ActCallProc,
  ActCallScript,
  ActCallProcEach,
  ActCallScriptEach,
};
enum OpCond_E {
  CondNone = 0,
  CondAfter,
  CondAfterEach,
  CondAfterEachOf,
  CondBefore,
  CondBeforeEach,
  CondBeforeEachOf,
};

typedef uint32_t opcode;
inline constexpr opcode OpCode(OpAct_E act, OpCond_E cond) {return (opcode)act | ((opcode)cond<<16); }
// Aggregate??
struct Op {
  opcode mOp;
  OpAct_E Act(){return (OpAct_E)(mOp & 0xFFFF);}
  OpCond_E Cond(){return (OpCond_E)((mOp & 0xFFFF0000) >> 16);}
};

/*GEN++
  let file = fs.readFileSync("/home/diamond/",  {encoding: 'utf8'});
  gen = gf.parseSource().evalAll().genaCpp(); "//Hello !!\n"*/
//Hello !!
//GEN--



/*GEN++
  gen = "//Hello world you!!\n"
*/
//Hello world you!!
//GEN--

struct ActCallProc_Fields{

};
struct ActCallScript_Fields{

};

template <typename... Types> class EmptyBase{};
#define _inherit_on(Cond, Type) std::conditional_t<(Cond), Type, EmptyBase<Type, OpIntf<_ACT, _COND>>>
#define _inherit_onact(actname) _inherit_on(_ACT==actname, actname##_Fields)
template <OpAct_E _ACT, OpCond_E _COND>
struct OpIntf : Op,
  _inherit_onact(ActCallProc), _inherit_onact(ActCallScript) 
{
  typedef OpIntf IntfType;
  static constexpr OpAct_E ACT = _ACT;
  static constexpr OpCond_E COND = _COND;
  OpIntf():Op{OpCode(ACT,COND)}{};
  #define _ENABLE_IF(cond) template <OpAct_E ACT=_ACT, OpCond_E COND=_COND> requires(cond)
  
  _ENABLE_IF(ACT==ActCallProc && COND==CondNone)
  void helloworld(){};
};

class Script{
  std::vector<Op*> mOps;
  public:
  void AddCmd(Op *op){mOps.push_back(op);}
  void CallProc(){}
  void CallScript();
  void ResolveNameToRegister();
};
Script & FsCreate();



struct Frame:CoMgr<Frame>{
};

class Actor:CoMgr<Actor>{
  std::vector<Frame *> mvFrame;
  public:
  static Actor INVALID;
  Frame &FrameSystem(){return *mvFrame[0];}
  Frame &FrameActor(){return *mvFrame[1];}
  Frame &FrameCurrent(){return *mvFrame.back();}
  void BeginFrame(){mvFrame.emplace_back();}
  void EndFrame(){mvFrame.pop_back();}
  Actor();
  Actor(const Actor &) = delete;
  template<typename V>
  void SetVar(const V& v, const typename V::Type & value) {

  }
};

Actor &  FaCreate();
}

}