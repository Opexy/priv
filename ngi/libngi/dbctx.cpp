#include "ngidb.h"

class DbCtxImpl {
  struct Frame {
    uint32_t self;
    uint32_t next;
    uint32_t parent;
    uint32_t idSelf;
  };
  void *ctxFrame; // object pointer
  uint32_t ctxStart; // from ctxFrame to ctxStart to ctxEnd
  uint32_t ctxEnd;
  uint32_t ctxTail;
  // references?

  enum RetTransform {
    RetNext, // next
    RetSelf,
    RetCreateChild,
    Parent,
  };

  // pipelines
  struct FlowStep {
    RetTransform ret;
    // wait for prior steps to finish
    // set existing but allow staged processing.
    // re-run friendly structure.
  };

  struct DbCtxCmd {
    int cmd;
    int args;
    void *argv;
  };
  
  DbCtxImplPtr flow(DbCtxCmd &cmd);

  DbCtxImplPtr createClass(ArgStr clsName) {
    
    return this;
  }
};

DbCtx DbCtx::createClass(ArgStr clsName) {
  DbCtxImpl *ret = impl->flow(DBCmd::createClass(clsName));
  return DbCtx(ret);
}