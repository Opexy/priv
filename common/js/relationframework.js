//#region Header
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory) /* global define */
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    root.RelationFramework = factory()
  }
}(this, function(){
'use strict';

function RelationFramework(){
//#endregion
const { assert } = console;
const { isNumber, isString, isFunction, mki, Pathflow, 
  mapinit, opatch, orevert, forEach} = utils;
function guse(...obj){
  return opatch(globalThis, ...obj);
}
function gunuse(change) {
  return orevert(globalThis, change);
}

let rf = {next_uoid:1, uos:{}, ustrs:{}};
let {uos, ustrs} = rf;
//#region ecodes
function eUpdated(ec) {return ec === eUpdated || ec === eAdded || ec === eRemoved};
function eAdded(ec) {return ec === eAdded};
function eRemoved(ec) {return ec === eRemoved};
function eUnchanged(ec) {return ec === eUnchanged};
let ecodes = {eUpdated, eAdded, eRemoved, eUnchanged};
rf.ecodes = ecodes;
//#endregion ecodes
let proto = {};
proto.Uo = [{constructor(){
  if(!this.uoid) this.uoid = rf.next_uoid++;
  uos[this.uoid] = this;}}]
proto.UoStr = [proto.Uo, {
  constructor(){ustrs[this.str]=this},
  toString(){return this.str;}
}];
function Uo(){
  return mki({}, proto.Uo);
}
function UoStr(str){
  str = str.str ?? str;
  assert(typeof str === 'string');
  let uo = ustrs[str] ?? mki({uoid:undefined, str}, proto.UoStr);
  return uo;
};

let mkstrs = new Pathflow({onGet(tgt, prop){
  if(typeof prop === 'string') return UoStr(prop);
}})

Object.assign(rf, {ustrs, UoStr, Uo, mkstrs});
function addProc(procobj, {procs} = this){
  for(let [procName, procftn] of Object.entries(procobj)){
    addProcFtn.call(this, procName, procftn);
  }
}
function addProcFtn(procName, procftn, {procs} = this){
  assert(!procs[procName]);
  procName = UoStr(procName);
  mki({hoist:this, procName}, proto.UoProc)
  let uoProc = mki({}, proto.UoProc);
  procs[procName] = uoProc;
  parseProc.call(this, uoProc, procftn);
}
function parseProc(uoProc, procftn) {
  let gchanges = guse({
    Runon(runon){UoProcCode({Runon:runon, hoist:uoProc})},
    Params(...params){
      params.forEach(param=>
        uoProc.params[param] = 
          mki({hoist:uoProc, paramName:UoStr(param)}, 
              proto.UoProcParam))},
    AssignMember(Obj, Member){
      UoProcCode({AssignMember:{Obj, Member}, hoist:uoProc})},
    Callsub(ftn, iospec){
      UoProcCode({Callsub:{ftn, iospec}, hoist:uoProc})
    },
    Exec(ftn) {
      UoProcCode({Exec:ftn, hoist:uoProc});
    },
    Subprocs(procobj){addProc.call(uoProc, procobj)}
  });
  procftn();
  gunuse(gchanges);
}
proto.UoGlobal = [{
  constructor(){this.clss = {}, this.roles = {}, this.procs = {}},
  addCls(clsName, {clss} = this){
    return clss[clsName] ??
      (clss[clsName] = mki({hoist:this, clsName}, proto.UoCls))
  },
  addClss(...clss){
    let ret = {};
    clss.forEach(cls=>ret[cls]=this.addCls(cls));
    return ret;
  },
  addRole(roleName, {roles} = this) {
    return roles[roleName] ??
      (roles[roleName] = mki({hoist:this, roleName}, proto.UoRole))
  },
  addRoles(...roles){
    let ret = {};
    roles.forEach(role=>ret[role] = this.addRole(role));
    return ret;
  },
  addProc,
  compile(compileSpec){
    let uoCompile = mki({hoist:this, compileSpec}, proto.UoCompile);
    uoCompile.getSpecSystems();
    uoCompile.compileEntries();
    return uoCompile;
  }
}]
proto.UoCls = [proto.Uo, {
  constructor(){type:"UoCls", this.props = {}},
  addProp(propName, propCls, {props} = this){
    assert(!props[propName]);
    let ret = props[propName] = 
      mki({cls:this, propName, propCls}, proto.UoProp);
    return ret;
  }
}]
proto.UoProp = [proto.Uo, {}];
proto.UoRole = [proto.Uo, {constructor(){this.roleName = UoStr(this.roleName)}}];
proto.UoProc = [proto.Uo, {constructor(){this.params = {}; this.code = []; this.procs = {}}}];
proto.UoProcParam = [proto.Uo, {}];
proto.UoProcCode = [proto.Uo, {
  constructor(){this.idx = this.hoist.code.length; this.hoist.code.push(this)}
}];

function UoProcCode(codeObj){return mki(codeObj, proto.UoProcCode)};
let global = mki(mkstrs.global, proto.UoGlobal);
Object.assign(rf, {global});

proto.UoSystem = [proto.Uo, {
  constructor({hoist, systemSpec, systemName} = this){
    this.Roles = {};
    for(let role in systemSpec.roles)
      this.Roles[role] = global.addRole(role);
    hoist.Systems[systemName] = this;
  }
}]


proto.UoCompile = [proto.UoProc, {
  constructor(){this.Systems = {}},
  getSpecSystems({compileSpec:{Systems:specSystems}}=this){
    forEach(specSystems, (systemSpec, systemName)=>{
      mki({hoist:this, systemName, systemSpec}, proto.UoSystem);
    })
  },
  compileEntries({compileSpec:{Entries}} = this) {
    forEach(Entries, (entrySpec, entryName)=>{
      assert(false);
    })
  }
}];

// Class, Prop
/*
let classes = {}
function mkClasses(...clss){
  
  let ret = {};
  clss.forEach(clsName=>{
    assert(clsName.ustr);
    let uoCls = classes[clsName.ustr];
    if(!uoCls) {
      uoCls = mkUo(null, {clsName}).uo;
      classes[clsName.ustr] = uoCls;
    }
    let clsKey = clss.keys. cls.kstr ?? cls;
    let uoCls = classes[]; uoClsName.asClass;
    if(!uoCls){

    } ?? (
      uoClsName.asClass = mkUo(null, {clsName, uoClsName})
    );

    if(!uoCls) {
      ret = mkUo(null, {clsName, uoClsName})
      classes[clsName] = ret;
    }
    return ret;
  })
  for(x in ustrs) {
  }
  let hdlr = {get(tgt, prop, recv){ if(tgt.prop) return tgt.prop; 
    let ret = mkUo(prop);
    uoSetPropsOnce(ret.uo, {type:otClass});
    return ret.uo;
  }};
  return new Proxy({}, hdlr);
}
function uoAddProp(uo, propName, propType){
  let ret = rf.uoAddNameExt(uo, propName), {uo:prop} = ret;
  uoSetPropsOnce(prop, {type:otProp});
  if(propType) prop.refto = {val:undefined, type:propType};
  uo[propName] = prop;
  return ret.uo;
}
*/
// Object.assign(rf, {otClass, otProp, mkClasses, uoAddProp});
// let ftn = ctxt.push("ftn");
// ftn.begin(ctxt.push("scope"));
// ftn.end()
// ftn begin(x), when ended, go upper.
// obj.append(ctxt.push());
// 1: x: push x
// 2: y: push 2
// 3: z: push k
// 4: t: push 5
// Proc
let procs = {};
function uoProc(proc) {
  if(typeof proc !== 'function') {
    assert(typeof proc === 'object');
    for(let x in proc)uoProc(proc[x]);
  } else {
    let ftn = ftnhdr(proc);
    ftn.stmts = ftn.exp.body.body;
    assert(!procs[ftn.name]);
    procs[ftn.name] = ftn;  
  }
}
// Compiler stack
function Cst(){
  let stack = [{ast:[], lscope:{}, fscope:{}}];
  let nextid = 0;
  function top(){return stack[stack.length - 1];}
  Object.defineProperty(stack, "top", {get(){return top();}})

  function addAst(item){
    let parent = top(), lid = parent.ast.length;
    let ret = {ast:[], lscope:{}, fscope:{},
      ...item, gid:nextid++, parent, lid};
    parent.ast.push(ret);
    return ret;
  }

  function beginAst(ast){
    ast.parent = top();
    stack.push(ast);
    return ast;
  }
  function endAst(ast) {
    assert(ast === top());
    ast.fin = true;
    stack.pop();
    return top();
  }
  function lscope(name, elem) {
    let ast = addAst({scope:'lscope', name, ...elem});
    top().lscope[name] = ast;
    return ast;
  }

  function resolveSubproc(name) {
    let ret = stack.rewFind(frame=>{
      return frame.fscope[name] ?? frame.lscope[name];
    }) ?? procs[name];
    assert(ret);
    return ret;
  }
  return {stack, addAst, beginAst, endAst, lscope, resolveSubproc};
}
function turm(spec){

}
globalThis.turm = function(ftn){
  globalThis.HelloWorld = ()=>{console.log("hello");}
  ftn();
}
function uoCompile(name) {
  let cst = Cst();
  let ast = cst.addAst({type:'Callsub', subproc:name})
  cst.beginAst(ast);
  uoCompileProc(cst.resolveSubproc(name), cst);
  return cst;
}
function uoCompileProc(proc, cst) {
  let {stmts} = proc; 
  function parseExp(exp) {
    if(exp.type === 'BinaryExpression') {
      let binexp = cst.addAst({type:'cond', cond:'BinaryExpression', 
      operator:condexp.operator});
      binexp.left = parseExp(exp.left);
      binexp.right = parseExp(exp.right);
    }
    else {
      assert(false);
    }
  }
  // pass 1: parse all stmts.
  function defSubproc(name, exp) {
    cst.lscope(name, {type:"Subproc", name, exp, stmts:exp.body.body});
  }
  function defParam(param) {
    cst.lscope(param, {type:"Param"});
  }
  for(let stmt of stmts) {
    if(stmt.type === 'ExpressionStatement' && stmt.expression.type === 'CallExpression'){
      if(stmt.expression.callee.type === 'Identifier') {
        let callee = stmt.expression.callee.name;
        let args = stmt.expression.arguments;
        if(callee === 'Runon') {
          if(args.length === 1 &&
            args[0].type === 'Identifier'){
               cst.addAst({type:"Runon", runon:args[0].name});
            } else {
            assert(false);
          }
        } else if(callee === 'Params') {
          args.forEach(param=>{
            assert(param.type === 'Identifier');
            defParam(param.name)
          })
        } else if(callee === 'AssignMember') {
          let obj = args[0].name ?? assert(false);
          let memb = args[1].name ?? assert(false);
          let val = args[2]?.name ?? memb;
          cst.addAst({type:"ObjInitMemb", obj, memb, val}); // afterwards the variable becomes ...
          cst.addAst({type:"UseMemb", obj, memb});
        } else if(callee === 'ParallelCases'){
          args.forEach(({elements:[cond, act]})=>{
            assert(false);
          })
          assert(false);
        } else if(callee === 'Callsub') {
          cst.addAst({type:'Callsub', Subproc:args[0].name});
          if(args[1])
            defSubproc(args[0].name, args[1]);
        } else if(callee === 'Subproc') {
          defSubproc(args[0].name, args[1]);
        }
        else {
          assert(false);
        }
      }
    }
    else{
      assert(false);
    }
  }
  // pass 2: graph flow
  let ast = cst.stack.top.ast;
  let runon = undefined;
  for(let ae of ast) {
    if(ae.type === 'Runon') {runon = ae;}
    else if(ae.type === 'ObjInitMemb'){
      // TODO
    }
    else if(ae.type === 'UseMemb') {
      cst.stack.top.fscope[ae.memb] = ae; // TODO
    }
    else if(ae.type === 'Callsub') {
      cst.beginAst(ae);
      uoCompileProc(cst.resolveSubproc(ae.Subproc), cst);
    }
    else {
      if(ae.type === 'Param' ||
         ae.type === 'Subproc') {}
      else assert(false);
    }
  }
  cst.endAst(cst.stack.top);
  return cst;
}

Object.assign(rf, {uoProc, uoCompile});

rf.SystemTech = {
  BrowserClient:mki({Tech:UoStr("BrowserClient")}, proto.Uo),
}

return rf;
} return RelationFramework;
}))