#include "libsage.hh"
namespace sage {
namespace flow{
static LockList<Actor, 1024> actors;

Actor::Actor(){
  //mvFrame.push_back(_FrameSystem);
  //mvFrame.push_back(Frame());
}
Actor& FaCreate(){
  return *actors.Lock();
}

//Frame Actor::_FrameSystem;

}
}