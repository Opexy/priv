export const isArray = Array.isArray;
export const getProps = Object.getOwnPropertyDescriptors;
export const setProps = Object.defineProperties;
export const assert = console.assert;
export function mkro(obj) {return Object.freeze(obj)}
export function assign(tgt, ...items){
  let protoDescs = Object.assign({}, ...[items].flat().map(x=>getProps(x)));
  setProps(tgt, protoDescs);
}
export function assignThis(...items){
  assign(this, ...items);
}
export function mkprop(obj, prop, ctor, error){
  let ret;
  if(obj instanceof Map || obj instanceof WeakMap){
    getprop = ()=>obj.get(prop);
    setprop = ()=>obj.set(prop, ret);
  } else {
    getprop = ()=>obj[prop];
    setprop = ()=>obj[prop] = ret;
  }
  ret = getprop();
  if(ret === undefined) {
      ret = (typeof ctor === 'function') ? ctor(obj, prop) : ctor;
      setprop();
  } else {
    assert(!error);
  }
  return ret;
}
export function emplr(obj, ctor){
  return new Proxy(obj, {get(obj,prop){
    return mkprop(obj, prop, ctor);
  }})
}
export function defprop(obj) {
  return new Proxy(obj, {
    get(obj, gs){
      if(gs === 'get' || prop === 'set'){
        return new Proxy({}, {set(_, prop, ftn){
          setProps(obj, {[prop]:{[gs]:ftn}})
          return true;
        }})
      } else 
        assert(false);
    },
    set(obj, prop, val){
      setProps(obj, {[prop]:{get:val}});
      return true;
    }
  })
}
export function defget(obj){return defprop(obj).get};
export function defset(obj){return defprop(obj).set};
export function olen(obj){return Object.keys(obj??{}).length}
export function Interface(tgt, exts, {ctor, ctors, ...proto}){
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
    let ret = this ?? {};
    assign(ret, this.proto);
    if(ret.ctors)
      ret.ctors.forEach(ctor=>ctor.call(ret, ...args));
    else if(ret.ctor)
      ret.ctor.call(ret, ...args);
    return ret;
  }
  return tgt;
}
export const utils = {isArray, getProps, setProps, assert, mkro, assign, assignThis, mkprop, emplr,
  olen, Interface,defprop, defget, defset};
assign(globalThis, utils);