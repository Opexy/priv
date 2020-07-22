const { get } = require('http');
const { networkInterfaces } = require('os');
const { syncBuiltinESMExports } = require('module');

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory) /* global define */
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    root.ksp = factory()
  }
}(this, function(){
'use strict';
if(globalThis.module_ksp) return globalThis.module_ksp;
let utils = require('./utils.js');
let {assert,isArray,isString,isObject,
  sizeof,mapval,mapinit,now,forEach,Pathflow, opflow} = utils;
let Ptoxy = Symbol.for("Ptoxy");
let Tgt = Symbol.for("Tgt");

const SymbKeys = Symbol.for("SymbKeys");
class Obj {
  static mko(){}
  constructor(){this[SymbKeys] = {}};
  merge(src){}
  get keys(){return this[SymKeys]}
  addKey(){}
}
const mko = Obj.mko;

class KeyOwner{

}

const SymbKstr = Symbol.for("SymbKstr")
class AbstractKey{
  constructor(parent, kty, key) {
    this.parent = parent; this.kty = kty; this.key = key;
  }
  toStr(){assert(false);}
  get kstr(){return this.toStr();}
  get owner(){return this.parent ?? globalOwner}
  
}
function toStr(x){return x?.toStr()??""}

class StrKey extends AbstractKey{
  constructor(parent, str) {
    super(parent, "StrKey", str);
  }
  toStr(){return toStr(parent) + `[${this.str}]`}
}
class IdxKey extends AbstractKey{
  constructor(parent, idx) {
    super(parent, "IdxKey", idx);
  }
  toStr(){return toStr(parent) + `[${this.idx}]`}
}

function mko(proto, assigns){
  function get(tgt, prop, recv) {
    let ret = tgt[prop];
    if(prop === Tgt) ret = tgt;
    return ret;
  }
  function set(tgt, prop, val){
    tgt[prop] = val;
    return true;
  }
  function has(tgt, prop){
    return prop in tgt;
  }
  const proxyHandler = {get, set, has};
  let tgt = Object.create(proto[Tgt]??proto);
  Object.defineProperties(tgt, {
    [Ptoxy]:{value: new Proxy(tgt, proxyHandler)}})
  return tgt[Ptoxy];
}

// List of evaluationary keys.
// Key has to be 
//#region Ksp
class Ks {
  constructor(kstr){this.kstr = kstr;}
}
// items can be:
function mkset(items){}
function Ksp(){
  // Root Level Functions: Schema Manipulation (add) -> Compilation

  //NameFlow("Actor.id", ["ActorName", "Actor.Name"]);
  // Object

  function NameFlow(){
    
  }
  
  
  
  // Objcls([Member.id, ["MemberName", "Member.Name"], )
  // Obj, field(X, ObjKey(Sorted, Random Access, ...), associate with ID) -> Associatte with (Obj.ID)
  ksp= {NameFlow}
  
  return ksp;
}

function Travdo(schema, data) {
  for(x in data) {
  }
}

const sb = function SchemaBuilder(schema){
  let ctxt = {};
  let currentNode = {};
  
  let TravSchmeaBuilder = {
    feed(key, obj){
      if(key === ); if(typeof(obj)...)
      return obj.forEach();
    }
  }
  Travdo(TravSchmeaBuilder, schema);
  return ctxt; 
};
sb.kf = opflow("keyfield", {
  option:{}, 
  string:{"":{notnull:{}, indexed:{}}}
});
sb.root = {};
sb.addSchema = function addSchema(parent, schema){
  if(typeof schema === 'object') {
    if(schema?.tgt?.path) {
      let def = schema.tgt.path.for
    }
  }
  forEach(x in schema)
  
  //  list of options, 
}

Ksp.SchemaBuilder = SchemaBuilder;
//#endregion Ksp

// ksp: creates new Key Spaces

let ksp = Ksp();


globalThis.module_ksp = {Ksp};
return globalThis.module_ksp}))