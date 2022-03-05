#include "ngi.h"
int main(int argc, char **argv) {
  DbCtx root = DbCtx::createRoot();
  auto processes = root.createClass("Process");
  auto procId = processes.setMemb("procId");
  auto procTime = processes.setMemb("procTime");
  

  auto rec = processes.newElem();
  rec.setProp("hello").setString();
  rec.setProp("hello").addRelation();
  rec.setProp("hello").addRelation();
  // Microfusion into the Database
  
  
  
  return 0;
}
