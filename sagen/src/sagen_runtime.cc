#define SAGEN_RUNTIME_IMPL
#include "sagen_runtime.hh"

namespace sr{

void sagen_runtime_init(){

}

struct SqaPriv:SingleQueueActor{
  
};

void SingleQueueActor::checkAndRunOne(){
  auto &priv = *static_cast<SqaPriv *>(this);
}
SingleQueueActor * SingleQueueActor::create(){
  return new SingleQueueActorPriv();
}


}

