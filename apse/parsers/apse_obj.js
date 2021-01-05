let assert = console.assert;
var extend = require("extend");

//#region utils
Object.defineProperty(Object.prototype, "empl", {value:function empl(name, item, itemIsObj=false){
  let ret = this[name];
  if(ret)
    return [ret, false];
  if(itemIsObj || !item.isctor) {
    ret = item;
  } else {
    ret = item(name, this);
  }
  this[name] = ret;
  return [ret, true];
}});
Object.defineProperty(Array.prototype, "back", {value:function back(){return this?.[this.length-1];}});
function ctor(ftn){
  ftn.isctor = true;
  return ftn;
}
// Dict Array
class Dicta{
  Dicta(){this.props = {}, this.arr = []; this.arr.iall = 0;}
  get(prop){
    return this.props?.[prop]?.back()?.content;
  }
  set(prop, obj){
    let pl = this.props.empl(prop, ctor(()=>{Object.assign([], {isArray:true, prop})}));
    let owrap = {prop, obj, iall: this.arr.length, iprop: pl.length};
    pl.push(owrap);
    this.arr.push(owrap);
    return this;
  }
  eall(prop){
    if(!prop) return this.arr; else return this.props[prop] ?? [];}
  erest(prop){
    if(!prop){
      return this.arr.filter(e=>e.iprop >= this.props[e.prop]);
    } // else
    let pl = this.props[prop] ?? [];
    return pl.filter(e=>e.iprop >= pl.icur);
  }
  efirst(prop){
    let ret = prop ? this.props[prop]?.[0] : this.arr[0];
    if(ret) this.props[prop].iprop = ret.iprop;
    return ret;
  }
  elast(prop){
    let ret = prop ? this.props[prop]?.back() : this.arr.last.back();
    if(ret)this.props[prop].iprop = ret.iprop;
    return ret;
  }
  enext(prop, cur = this.props[prop]?.cur){
    if(prop) {
      let pl = this.props[prop];
      if(pl.iprop < pl.length)pl.iprop++;
      return pl[pl.iprop];
    } else {
      if(this.arr.iall < this.arr.length) this.arr.iall++;
      let ret = this.arr[this.arr.iall];
      if(ret) {
        this.props[ret.prop].iprop = ret.iprop;
      }
      return ret;
    }
  }
  ereset(prop, cur = this.props[prop]?.cur){
    if(prop){
      let pl = this.props?.[prop];
      if(pl)pl.iprop = -1;
    } else {
      this.props.values.forEach(pl=>pl.iprop = -1);
    }
  }
};

// Meta Class
class Mcl{
  get isRoot(){return !this.parent};
  get root(){return this.parent ? this.parent.root :this;}
  constructor(parent, type, name){
    this.parent = parent;
    this.type = type;
    this.name = name;
    this.relkstr = type
    this.kstr = parent?.kstr ?? "" + `{${type}:${name}}`
    this.props = {};
    this.allprops = [];
    Object.defineProperty(this, "types", {value:{}});
  }
  
  // Make a name of type
  mk(ok, [[type, name]] = Object.entries(ok)){
    let ty = this.types.empl(type, {})[0];
    let ret = ty.empl(name, ctor(()=>new Mcl(this, type, name)))[0];
    this.props[name] = ret;
    return ret;
  }
  // Add a property object to this entry.
  add(ok, [[prop]] = Object.entries(ok)){
    let pl = this.props.empl(prop, [])[0];
    assert(pl.isArray());
    pl.push(ok);
    ok.iprop = pl.length();
    this.allprops.push(ok);
    ok.iall = allprops.length();
  }
  // Set a property as property entry object.
  set(ok, [[prop]] = Object.entries(ok)){
    this.props[prop] = ok;
    // A little leak will happen...
    this.allprops.push(ok);
    ok.iall = allprops.length();
  }
}

// Historial Graph State
class Hgs{
  constructor(prev, props, changes){
    this.prev = prev;
    this.mods = [];
    this.props = props ?? {};
    assert(this.props);
    this.addMod(changes);
    if(!prev && !this.props.snapshot){
      this.props.snapshot = this.snapshot();
    }
  }
  find(ftn, iter = this){
    for(var ret = undefined; !ret && iter; iter = iter.prev){
      ret = ftn(iter);
    }
    return ret;
  }
  get branchName(){
    return find(iter=>iter.props.branchName);
  }
  branch(branchName){
    let branches = this.props.empl("branches", {})[0];
    let hgs = branches.empl("branch", ctor(()=>
      new Hgs(this, {branchName}, [])));
    return hgs;
  }
  rev(props, changes = []){
    assert(!this.next);
    this.next = new Hgs(this, props, changes);
    return this.next;
  }
  addMod(change){
    // can't modify if we already has children... 
    // ??? or not... invalidate the snapshots?
    assert(!this.next); 
    assert(!this.props.branches);
    assert(!this.props.snapshot);
    if(Array.isArray(change))
      this.mods = this.mods.concat(change);
    else
      this.mods.push(change);
  }
  snapshot(){
    let chain = [];
    let shot = this.find(iter=>{
      if(iter.props.snapshot) {
        return iter.props.snapshot;
      } else {
        chain.push(iter);
      }
    });
    chain.reverse();
    let snap = Hgs.do_snapshot(shot, chain);
    if(chain.length >= 10) {
      this.props.snapshot = snap; // NO PROTECTION
    }
    return snap;
  }
  static do_snapshot(shot, chain){
    if(chain.length == 0) return shot ?? {}; // NO PROTECTION
    let snap = {};
    extend(true, snap, shot);
    for(let hgs of chain) {
      for(let mod of hgs.mods){
        if(Array.isArray(mod)){
          // TODO... now we use functions instead.
          let [cmd, ...args] = mod;
          if(cmd === 'pop') {
          }
        } else if (typeof mod === 'function') {
          mod(snap);
        } else if(typeof mod === 'object') {
          extend(true, snap, mod);
        }
      }
    }
    return snap;
  }
};

//#endregion utils

function compile(proc, run = undefined){
  if(!run){
    run = {script:[], stack:[proc], nativeProcs:[]};
    run.run = function(){
      this.nativeProcs.forEach(nativeProc=>{
        nativeProc.nativeProc();
      })
    }
    run = new Hgs(undefined, {}, [run]);
  } else {
    run = run.rev({}, (run)=>{
      run.script.push({entering:proc});
      run.stack.push(proc)
    });
    //run.stack.push(proc);
  }
  if(proc.props.procList){
    proc.props.procList.forEach(({procList:proc})=>{
      run = compile(proc, run);
    })
  } else if(proc.props.nativeProc) {
    let nativeProc = proc.props.nativeProc;
    if(nativeProc.args) {
      for(let argDesc of nativeProc.args) {
        resolveArgBeforeCall(argDesc)
      }
    }
    run.addMod((run)=>{run.nativeProcs.push(proc.props.nativeProc)})
    //run.nativeProcs.push(proc.props.nativeProc);
  } 
  // We shall have what we know we have and what the language provides,
  // where to get them (from future execution, i.e.)
  // There are utilities that may fetch from A to a.b to a.c
  // so require A.c means requiring A and require the process to fetch.
  // Require the process to fetch, may merge, as long as the process IO matches.
  // Cond A 

  run = run.rev({}, (run)=>{
    run.script.push({exiting:proc});
    run.stack.pop()
  })
  return run;
}

// Story Frame Node
class Sfn {
  constructor(parent, pidx){
    Object.assign(this, {parent, pidx});
    this.sfns = [];
  }
  _mk(){
    let ret = new Sfn(this, this.sfns.length);
    this.sfns.push(ret);
    return ret;
  }
  addo(obj){
    let ret = new Sfn(this, this.sfns.length);
    this.sfns.push(ret);
    Object.assign(ret, obj);
    return ret;
  }
  seto(obj){
    return this.addo(obj);
  }
  f1(ftn){
    for(let ii = 0; ii < this.sfns.length; ii++){
      let sfn = this.sfns[ii];
      if(ftn(sfn)) return sfn;
    }
    return undefined;
  }
  f1r(ftn){
    for(let ii = this.sfns.length - 1; ii >= 0; ii--){
      let sfn = this.sfns[ii];
      if(ftn(sfn)) return sfn;
    }
    return undefined;
  }
  fAll(ftn){
    let ret = [];
    this.sfns.forEach(sfn=>{if(ftn(sfn))ret.push(sfn)});
    return ret;
  }
}
function f1(ftn){
  return function(sfn){
    return sfn.f1(ftn);
  }
}
function f1r(ftn){
  return function(sfn){
    return sfn.f1r(ftn);
  }
}
function fAll(ftn){
  return function(sfn){
    return sfn.fAll(ftn);
  }
}

function compile1(sfn){
  function compileCallProc(dCallProc){
    let proc = dCallProc.callProc;
    let subcalls = fAll(x=>x.callProc)(proc);
    // subcalls following static link, constructing dynamic linkage.
    for(let sc of subcalls){
      //let host = sc;
      host = dCallProc;
      if(dCallProc.indirect) host = dCallProc;
      let subproc = host.addo({callProc:sc.callProc, indirect:sc, compiled:false});
      compileCallProc(subproc);
    }
    let node = f1(node=>node.nativeProc)(proc);
    if(node){
      assert(dCallProc.indirect);
      let subproc = dCallProc.addo({nativeProc:node.nativeProc, indirect:node, compiled:false}); //??
    }
  }
  let callProcs = sfn.fAll(n=>n.callProc);
  if(callProcs.length){
    for(let callProc of callProcs){
      compileCallProc(callProc);
    }
  }
}
//https://www.xbiquge.cc/book/49254/34024196.html
function run1(sfn){
  let nproc = f1(x=>x.nativeProc)(sfn);
  if(nproc){
    argsArr = sfn.fAll(x=>x?.argsArr?.forProc === nproc);
    let proc = nproc.nativeProc;
    proc(...argsArr);
  }
  let callProcs = fAll(x=>x.callProc)(sfn);
  callProcs.forEach(x=>run1(x));
}
if(require.main === module){
  let apse = new Sfn();
  let client = apse.addo({Sys:"client"});
  let writeHelloWorld = apse.addo({Proc:"writeHelloWorld"});
  let writeHello = apse.addo({Proc:"writeHello"});
  let writeWorld = apse.addo({Proc:"writeWorld"});
  let writeHell
  let userWithIdX = apse.addo({DataClass:"User", Input:{ID:"$x"}});
  // May have multiple interfaces... if not specified.
  
  writeHelloWorld.addo({callProc:writeHello});
  writeHelloWorld.addo({callProc:writeWorld});
  // proc points (script)
  // need field, provide field,  automatic autobind points (tryapply)
  
  writeHello.seto({nativeProc:()=>{console.log("hello")}});
  writeWorld.seto({nativeProc:()=>{console.log("world")}})
  client.addo({callProc:writeHelloWorld});
  let clientmain = compile1(client);
  run1(client);
  //clientmain.run();
}

/*
if(require.main === module){
  let apse = new Mcl();
  let client = apse.mk({Sys:"client"});
  let writeHelloWorld = apse.mk({Proc:"writeHelloWorld"});
  let writeHello = apse.mk({Proc:"writeHello"});
  let writeWorld = apse.mk({Proc:"writeWorld"});
  let userWithIdX = apse.mk({DataClass:"User", Input:{ID:"$x"}});

  // May have multiple interfaces... if not specified.
  
  writeHelloWorld.add({procList:writeHello});
  writeHelloWorld.add({procList:writeWorld});
  // proc points (script)
  // need field, provide field,  automatic autobind points (tryapply)
  
  writeHello.set({nativeProc:()=>{console.log("hello")}, args:[{hellouser:{}}]});
  writeWorld.set({nativeProc:()=>{console.log("world")}})
  client.add({procList:writeHelloWorld});
  let clientmain = compile(client)
  clientmain.snapshot().run();
}
*/
/*
function Apse(){
  let apse = this;
  let mcls = apse.mcls = {};
  apse.Mcl = function Mcl(mclName){
    let [mcl, isnew] = mcls.emplace(mclName, {});
    if(isnew){
      mcl.
    }
    return mcl;
  }

}
function Apse(){
  let apse = this;
  apse.syss = {};
  apse.intfs = {}
  apse.mkSys = function mkSys(sysName){
    let sys = apse.syss[sysName];
    if(!sys) {
      sys = new ApseSys(sysName);
      apse.syss[sysName] = sys;
    }
    return sys;
  }
  apse.mkIntf = function mkIntf(intfName){
    let intf = apse.intfs[intfName];
    if(!intf){
      intf = new ApseIntf(intfName);
      apse.intfs[intfName] = intf;
    }
    return intf;
  }
  function ApseSys(sysName){
    let sys = this;
    sys.sysName = sysName;
    sys.intfs = {};
    sys.mkIntf = function mkIntf(intfName){
      let sysintf = sys.intfs[intfName];
      if(!intf) {
        sysintf = new ApseSysIntf(intfName);
        sys.intfs[intfName] = sysintf;
      }
      return sysintf;
    }
    function ApseSysIntf(intfName){
      sysintf = this;
      let intf = apse.mkIntf(intfName)();
      Object.assign(sysintf, {sys, intf});
    }
  }
  function ApseIntf(intfName){
    let intf = this;
    intf.intfName = intfName;
    intf.procs = []
    intf.addChild = function addChild(intfName){
      intf.procs.push(apse.mkIntf(intfName));
    }
    function ApseIntfStep(intfName){
    }
  }
}
*/