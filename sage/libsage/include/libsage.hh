#pragma once
#include <unordered_map>
#include <cstddef>
#include <cstdint>
#include <atomic>
#include <thread>
#include <chrono>
#include <cstring>
#include <cassert>
#include <vector>
#include <functional>
#include "libsage_concurrency.hh"
#include "libsage_shmem.hh"
#include "libsage_co.hh"
#include "libsage_flow.hh"
namespace sage{

MakeOc(CoName, 2) {
  using CoBaseType::CoBaseType;
  CoName(const std::string_view &str){
    assert(false);
  }
};


struct CoEventClassIntf{
};
MakeOc(CoEventClass, 3){
  using CoBaseType::CoBaseType;
};

struct CoEventIntf{
  
};
MakeOc(CoEvent, 4){
  using CoBaseType::CoBaseType;
  CoEvent(CoEvent parent, CoEventClass evtClass);
  void BeginNew(CoEventClass evtClass);
  void Return();
};

#if 0
std::string_view CoGetStrv(const Co & co){
  std::string_view ret = "";
  switch(co.mCls){
    case CoTmpStr::CLS: ret = CoTmpStr(co).GetStrv(); break;
    default:assert(false);break;
  }
  return ret;
}
#endif

}; // namespace sage







#if 0
template <typename Sample>
class Accumulator{
  public:
  typedef int SampleIndex;
  class RollingWindow {
    Accumulator *mAccumulator;
    public:
    inline RollingWindow(Accumulator *accumulator):mAccumulator(accumulator){}
    virtual void onPush(SampleIndex dataIdx){setTip(dataIdx);}
    virtual void onPop(SampleIndex dataIdx);
    virtual SampleIndex setTip(SampleIndex dataIdx);
  };
  class RollingAverage:RollingWindow {
    public:
  };
  template <class RollingWindow, typename... Args>
  inline RollingWindow CreateRollingWindow(Args&&... args){
    RollingWindow *rollingWindow = new RollingWindow(this, std::forward<Args>(args)...);
    mRollingWindows.push_back(rollingWindow);
    return rollingWindow;
  }
  inline RollingAverage CreateRollingAverage(){
    CreateRollingWindow<RollingAverage>()
  }
  private:
  std::vector<BasicRollingWindow *> mRollingWindows;
};
#endif