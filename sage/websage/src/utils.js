const isArray = Array.isArray;
const getProps = Object.getOwnPropertyDescriptors;
const setProps = Object.defineProperties;
const assert = console.assert;
function mkro(obj) {return Object.freeze(obj)}
function assign(tgt, ...items){
  let protoDescs = Object.assign({}, ...[items].flat().map(x=>getProps(x)));
  setProps(tgt, protoDescs);
}
function assignThis(...items){
  assign(this, ...items);
}
function mkprop(obj, prop, ctor){
  if(obj instanceof Map || obj instanceof WeakMap){
    let ret = obj.get(prop);
    if(ret === undefined) {
      ret = (typeof ctor === 'function') ? ctor(obj, prop) : ctor;
      obj.set(prop, ret);
    }
    return ret;
  } else 
  return obj[prop] ?? (obj[prop] = (typeof ctor === 'function') ? ctor(obj, prop) : ctor);
}
function emplr(obj, ctor){
  return new Proxy(obj, {get(obj,prop){
    return mkprop(obj, prop, ctor);
  }})
}
function olen(obj){return Object.keys(obj??{}).length}
function Interface(tgt, exts, {ctor, ctors, ...proto}){
  exts = [exts].flat();
  let protos = assign({}, exts.map(ext=>ext.proto ?? {}), proto);
  ctors = [exts.map(ext=>(ext.ctors ?? ext.ctor)), ctors].flat();
  // Dedupe constructors
  ctors = [...new Set(ctors).values()].filter(x=>(typeof x === 'function'));
  if(ctor) 
    tgt.ctor = ctor; // ignore other ctors
  else 
    tgt.ctors = ctors;
  tgt.new = function(...args){
    let ret = assign({}, this.proto);
    if(ret.ctors)
      ret.ctors.forEach(ctor=>ctor.call(ret, ...args));
    else if(ret.ctor)
      ret.ctor.call(ret, ...args);
    return ret;
  }
  return tgt;
}

module.exports = {isArray, getProps, setProps, assert, mkro, assign, assignThis, mkprop, emplr, olen, Interface};
assign(globalThis, module.exports);
