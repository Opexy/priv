(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory) /* global define */
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    root.Flob = factory()
  }
}(this, function(){
'use strict';
const {assert} = console;
const { isNumber, isString, isFunction, mkproto, mki, Pathflow, 
  mapinit, opatch, orevert, forEach, ngsid, refEquals} = utils;
let ff = {}; // flow framework
let flob = {nextlid:1, ulos:{}, callables:{}};
let {ulos, callables} = flob;
let protos = {};
// unique local object

function ulo(init){
  let ret = undefined;
  if(init.lid) {
    ret = ulos[init.lid];
    assert(ret);
  }
  else {
    ret = Object.assign({lid:flob.nextlid++, props:{}}, init);
    ret = mki(ret, protos.ulo);
    ulos[ret.lid] = ret;
  }
  return ret;
}
protos.ulo = utils.mkproto({
  prop(prop, optnval){
    if(optnval !== undefined) this.props[prop] = optnval;
    return this.props[prop];
  }
})

// lbe: labeled barrier event, GlobalName (cannot be local named if it is global named)
// lbe: can be a barrier (collects) (which will execute when events are emitted)
//        barrier can be set on a key.
//        can have a timeout for collecting enough items that follows the barrier.
//        events can be packaged on the item.
//        cross system event is virtual (so it can dereference to what it is.)
// Procedure: a list (default uniflow or serialized)
//            when a key is set (that other label events depends on the key), 
//            I.e., the barrier takes item.created.completed as input.
// 
protos.scope = mkproto(ulo, {
  addCallable:flAddCallable,
});
function flScope(init){
  let fl = mki(ulo({callables:{}, ...(init ?? {})}), protos.scope);
  return fl;
}
function flAddCallable(name, ...callspec){
  let {callables} = this;
  return callables[name] = flCallable(name, callspec);
}
function flCallable(name, callspec){
  return flScope({name, callspec});
}
let globalScope = flScope();

function flArgs(...args){return {flArgs:args}}
function flCall(...args){return {flCall:args[0], tails:args.slice(1)}};

function flCompile(){
  return mki(flScope({entries:{}}), protos.compile);
}
function flEvt(){}
function flDone(){}
protos.compile = mkproto({
  addEntries:flcAddEntries,
  compile:flcCompile,
  role:flcRole,
});

function flcAddEntries(...entries){
  entries.forEach(entry=>{
    if(!entry.flCall){
      entry = flCall(entry);
    }
    let name = entry.flCall?.name ?? entry.flCall;
    assert(isString(name));
    this.entries[name] = entry;
  })
}
function flcCompile(){
  let flc = this;
  forEach(flc.entries, entry=>{
    flcCompileElement(flc, entry);
  })
}
// psuedo sequential (pseq): target execution will wait until potential dependency resolvance, or redo for the affected variables.
// Execution patterns: On Data Change.
// Messages represents one potential data revolutions.
// Does data need revolution? depends on querier (need vs availability, UI representation)
// evtor generates event.
// Messages involving one or more potential timeout is an async message.

// flEvtCall(receiver, evt, desc) // calls and generates the event and forward to receiver
//                                   if receiver is a eventor, then upon receiving data,
//                                   will then chain. evt data chain.
// flEvtRecv(receiver, [evts], whatToDoNext)
// Collector: will collect information before forwarding.

function flcCompileElement(fl, elem){
  assert(!elem.compiled);
  elem.parentScope = fl;
  // Someone sets the global variable... and that's bad because it changes the whole flow?
  // As long as interface of the potential flow does not change.
  // {"async1":[MayYield("async2", "async3"), WillYield()]}

  // TODO:here
}
function flcRole(){
  return {begin(){console.log("hello, world!")}}
}

// interface(name, ...)
function flowSystem(actions){
  let fla = mki(ulo(), protos.assembly);
  specs.forEach(spec=>{
    let callable = undefined;
    if(typeof spec === 'string')
      callable = flowResolve(spec);
    assert(callable.lid);
  })
}

function devtest(){
  let hello = globalScope.addCallable("Hello",
    flArgs("HelloFtn"),
    flCall("HelloFtn", flEvt("EvtDone")), // if compiler decides to do this function synchronously,
                        // when done it will run signals.
    flDone("*", "HelloDone") // When all things done, send this out.
  );
  let world = globalScope.addCallable("World",
    flArgs("WorldFtn"),
    flCall("WorldFtn")
  )

  let flc = flCompile();
  flc.addEntries(
    "Hello", 
    flCall("World", {WorldFtn(){console.log("World1")}}),
    flCallable("HelloWorld", 
      flCall("Hello", {HelloFtn(){console.log("Hello")}}),
      flCall("World", {WorldFtn(){console.log("World2")}})
    )
  );

  flc.compile();
  flc.role("default").begin();
}
devtest();
function unittest(){
  let clsTable = flcls("DataTable");
  flclsAddField(clsTable, "columns", manyof("DataTableColumn"));
  flclsAddField(clsTable, "rows", manyof("DataTableRows"));
  flclsAddField(clsTable, "name", "String");

  flow.callable("objCreateWithKey", fl(
    args(model, key, system),
  ))
  //https://www.xbiquge.cc/book/15986/11251917.html
  flow.rootcallable("mktable", fl(
    scope(mktable, 
      args(tablename, dom, tableRows, tablecolumns),
      optArgs("clientAddColumns", "clientAddRows"),
      tmps(table)),

    invoke("objCreateWithKey", {model:DataTable, key:{name:tablename}, result:table}),
    invoke("clientAddColumns"),
    invoke("clientAddRows"),
    invokeas("columnsAll", "objGetAll", table, tableColumns),
    invokeas("rowsAll", "objGetAll", table, tableRows),
    cb("{columnsAll:DataChanged}", callbackjs(table, columnsAll)),
    invoke("invokejs", function x(table){

    }),
    // addcb(renderobj, columnsAll:DataChanged, function onDataChanged())
    // If renderobj is not created, then datachanged is emitted, vs datachanged is saved.
  ))
  flow("mktable", flow.rootcallable());
  fldef({flowName:"helloworld"}, fList(

    fInvokeJs(()=>{
      console.log("hello")}),
    fBeginEvt({evn:"hello"}, fOnEvt({evn:"initialized"})),
    fInvoke({evn:"world"})
  ))
  runfl({flowName:"helloworld"});
}
//unittest();

return flob;

}))