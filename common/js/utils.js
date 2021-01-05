//#region Header
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory) /* global define */
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    root.utils = factory()
  }
}(this, function(){
'use strict';
if(globalThis.utils) return globalThis.utils;
let utils = globalThis.utils = {};
globalThis.gg = globalThis;
const assert = utils.assert = console.assert;
const isArray = utils.isArray = Array.isArray;
const isString = utils.isString = (x)=>typeof x === 'string';
const isObject = utils.isObject = (x)=>typeof x === 'object';
const isNumber = utils.isNumber = (x)=>typeof x === 'number';
const isFunction = utils.isFunction = (x)=>typeof x === 'function';
const sizeof = utils.sizeof = (x)=>x ? x.length ?? x.size ?? Object.keys(x).length ?? 0 : 0;

gg.assertUndefined = utils.assertUndefined = assertUndefined;
function assertUndefined(arg){
  assert(arg === undefined);
}

// derive ?? 
gg.der = x=> typeof x === 'function' ? x():x;
gg.bind0 = function(ftn, ...args){return ftn.bind(undefined, ...args)}
gg.mapEmpl = function(map, name, obj){
  let ret = map[name];
  if(!ret){
    ret = der(obj);
    map[name] = ret;
  }
  return ret;
}
gg.getFields = utils.getFields = function getFields(fields, obj){
  let ret = {}
  Object.keys(fields).forEach(field=>ret[field] = obj[field]);
  return ret;
}

gg.Casmap = utils.Casmap = class Casmap {
  constructor(schema){
    this.keys = {};
    /** indices */
    this.idxs = {};
    /** used to find a index */
    this.idxtree = {};
    this.elems = new Map();
    this.refl = new Map();
    this.addSchema(schema);
    /** list of key fields */
  }
  
  addSchema(sch){
    function UniqKeyField(fieldName, desc){
      this.uniqKeyFieldName = fieldName;
      this.keys[fieldName] = {fieldName, ...desc};
    }
    function KeyField(fieldName, desc){
      this.keys[fieldName] = {fieldName, ...desc};
    }
    function Index(idxName, {type, keys}= desc){
      this.idxs[idxName] = {idxName, type, keys, map:new Map()};
      objset(this.idxtree, Object.keys(keys), this.idxs[idxName]);
    }
    let descProc = {UniqKeyField, KeyField, Index};
    Object.entries(sch).forEach(([term, desc])=>{
      let proc = descProc[desc.type]; assert(proc);
      proc.call(this, term, desc);
    })
  }
  
  /*
  setAttr(attrobj){

  }*/
  emplaceSlot(objkey){
    let {keys} = this;
    let {kobj, karr, kstr} = kinfo(this.keys, objkey);
    let slot = this.elems.get(kstr);
    let isnew = false;
    if(!slot){
      slot = new Object();
      slot.kstr = kstr;
      slot.kobj = kobj;
      this.elems.set(kstr, slot);
      isnew = true;
    }
    return {slot, isnew};
  }
  set(objkey, val=objkey){
    let {slot, isnew} = this.emplaceSlot(objkey);
    slot.val = objkey;
    if(isnew) {
      // add to all indices.
      Object.values(this.idxs).forEach(idx=>{
        let idxkeys = getFields(idx.keys, objkey);
        let idxslotkey = {};
        Object.entries(idxkeys).forEach(([kname, kval])=>{
          let idxslotinfo = idx.map.get(kval);
          idxslotkey[kname] = kval;
          if(!idxslotinfo){
            let idxslot = this.emplaceSlot(idxslotkey).slot; // This is optional.
            idxslotinfo = {idxslot, map:new Map()};
            idx.map.set(kval, idxslotinfo);
          }
          idx = idxslotinfo;
        })
        idx.map.set(slot.kstr, {idxslot:slot});
      })
    }
    return slot;
  }
  query(keys){
    let karr = Object.keys(keys);
    let idxlist = objgetdeep(this.idxtree, karr).slice(1).reverse();
    let tails = [];
    let heads = [];
    let idx = undefined;
    let list, ret;
    let items = {};
    for(let [key, obj] of idxlist) {
      if(!obj) tails.push(key);
      else {
        if(!idx) {
          idx = objfindfirst(obj,({obj})=>(obj?.idxName)? obj:undefined)
        }
        heads.push(key);
      }
    }
    if(idx) {
      heads.reverse();
      list = [idx];
      heads.forEach(kstr=>{
        kval = keys[kstr];
        let nlist = [];
        list.forEach(idx => {
          if(typeof kval === 'string') {
            idx = idx.map.get(kval);
            if(idx)
              nlist.push(idx);
          }
          else
            assert(false);
        })
        list = nlist;
        nlist = [];
      })
      function getitems(idxslotinfo){
        let idxslot = idxslotinfo.idxslot;
        let map = idxslotinfo.map
        if(idxslot.val){
          items[idxslot.kstr] = idxslot;
        }
        map?.forEach((idxslotinfo, key)=>{
          getitems(idxslotinfo);
        })
      }
      list.forEach(idxslotinfo=>getitems(idxslotinfo));
    } else {
      items = {};
      for(let [key, slot] of this.elems.entries()){if(slot.val)items[key]=slot};
    }
    if(!tails.length){
      ret = items;
    }
    else {
      tails.reverse();
      items.forEach(item=>{
        let slot = item.idxslot;
        for(let kstr of tails) {
          let kval = keys[kstr];
          if(typeof kval === 'string') {
            if(kval !== slot.kobj[kstr])
              return;
          }
        }
        ret[slot.kstr] = slot;
      })
      tails.forEach(kstr=>{
        kval = keys[kstr];
        let nitems = {};
        list.forEach(idx => {
          if(typeof kval === 'string') {
            idx = idx.map.get(kval);
            if(idx)
              nlist.push(idx);
          }
          else
            assert(false);
        })
        list = nlist;
        nlist = [];
      })
    }
    return ret;
  }
  // most common terms.
}
function kinfo(keys, obj){
  let kobj = getFields(keys, obj);
  let karr = Object.values(kobj), kstr = karr.join(",");
  return {kobj, karr, kstr};
}

gg.objfindfirst = utils.objfindfirst = objfindfirst;
function objfindfirst(obj, ftn){
  return objtrav(obj, (ctxt)=>{
    ctxt.result = ftn(ctxt);
    if(!ctxt.result)
      ctxt.flow = "return";
    }).result;
}
gg.objtrav = utils.objtrav = objtrav;
function objtrav(obj, ftn){
  let ctxt = {
    flow:"continue", 
    get val(){return this.vals[this.vals.length - 1]},
    get key(){return this.keys[this.keys.length - 1]},
    keys:[], vals:[obj]}
  function trav(){
    ftn(ctxt);
    if(ctxt.flow === "continue"){
      if(isObject(ctxt.val))
      for(let [key, val] of Object.entries(ctxt.val)){
        ctxt.keys.push(key);
        ctxt.vals.push(val);
        trav();
        if(ctxt.flow === "return") {
          // don't bother destructuring, go back.
          break;
        }
        ctxt.keys.pop();
        ctxt.vals.pop();
        if(ctxt.flow === "skip_peers") {
          ctxt.flow = "continue";
          break;
        } else {
          assert(ctxt.flow === "continue");
        }
      }
    } else if(ctxt.flow === "skip_this"){
      ctxt.flow = "continue";
    } else if(ctxt.flow === "skip_peers" || ctxt.flow === "return"){
      // go back to process.
    } else {
      assert(false);
    }
  }
  trav();
  return ctxt;
}
gg.objset = utils.objset = objset;
function objset(obj, path, val, {onConflict = "noop"}){
  for(let idx = 0; idx < path.length - 1; idx++) {
    let elem = path[idx];
    obj = obj[elem] ?? (obj[elem] = {})
  }
  assert(obj);
  let propName = path[path.length - 1];
  if(obj[propName]) {
    if(onConflict === 'assert')
      assert(false);
    else if (isFunction(onConflict)){
      onConflict(obj, propName, nval);
    }
  } else {
    obj[propName] = val;
  }
}
objset.collate = function collate(obj, prop, nval){
  let propdesc = Object.getOwnPropertyDescriptor(obj, prop);
  if(propdesc.writable) {
    let arr = [obj[prop], nval];
    Object.defineProperty(obj, prop, {get(){return arr}, set(){assert(false)}});
  } else {
    propdesc.get().push(nval);
  }
}

gg.objgetdeep = utils.objgetdeep = objgetdeep;
/**
 * retrieve all objects associated with a path
 * @param {*} root -- the root object to retrive from
 * @param {*} path -- 
 * @returns {[key, obj]} The array associating with the path
 */
function objgetdeep(obj, path){
  let ret = [];
  ret.push([undefined, obj]);
  path.forEach(key=>{
    let val = obj?.[key];
    ret.push([key, val]);
  });
  return ret;
}

gg.mapSet = utils.mapSet = mapSet;
function mapSet(map, ...args){
  for(let idx = 0; idx < args.length - 2; idx++){
    let key = args[idx];
    let nmap = map.get(key);
    if(!nmap) {
      nmap = new Map();
      map.set(nmap);
    }
  }
  map.set(args[args.length - 2], args[args.length - 1]);
}

/** cascaded get */
gg.mapGet = utils.mapGet = mapGet;
function mapGet(map, ...keys){
  let ret = map;
  for(let idx = 0; idx < keys.length; idx++){
    let key = keys[idx];
    ret = map?.get(key);
    if(!ret) break;
    map = ret;
  }
  return ret;
}
gg.mapGetVals = utils.mapGetVals = function mapGetVals(map, ...keys){
  let ret = []; 
  map = mapGet(...arguments);
  function flatten(val){
    if(val instanceof Map){
      for(let entry of val.values())
        flatten(entry);
    } else {
      ret.push(val);
    }
  }
  return ret;
}
gg.mapDelete = utils.mapDelete = function mapDelete(map, ...keys){
  for(let idx = 0; idx < keys.length - 1 && map?.get; idx++){
    let key = keys[idx];
    map = map.get(key);
  }
  if(map?.delete) {
    return map.delete(keys[keys.length - 1]);
  }
}
gg.refEquals = utils.refEquals = function refEquals(...args){
  return args.every(x=>x === args[0]);
}
Array.prototype.sorted = function(){
  if(this.isSorted) return this;
}
Array.prototype.uniq = function uniq(eq = ((a, b, idxa, idxb, arr)=>a===b)){
  let prev, previdx;
  return this.filter((elem, idx, arr)=>{
    let ret = !eq(elem, prev, idx, previdx, arr);
    prev = elem;
    previdx = idx;
    return ret;
  })
}
Array.prototype.rewFind = function rewFind(cb){
  let ret = undefined;
  for(let ii = this.length-1; ii >= 0 && !ret; ii--){
    ret = cb(this[ii], ii);
    if(ret)return ret;
  }
}
gg.opatch = utils.opatch = function opatch(obj, ...patches) {
  let changes = {};
  for(let patch of patches) {
    for(let [prop, nv] of Object.entries(patch)) {
      let change = changes[prop] ?? (changes[prop] = {ov: obj[prop], nv});
      obj[prop] = nv;
      change.nv = nv;
    }
  }
  return changes;
}
gg.orevert = utils.orevert = function orevert(obj, changes) {
  for(let [prop, change] of Object.entries(changes)) {
    obj[prop] = change.ov;
  }
  return changes;
}
gg.stub = utils.stub = function stub(...args){
  assert(false);
}
const mapval = utils.mapval = function mapval(coll, key, conf = old=>old){
  let {get, set} = coll.get ? coll : {
    get(key){return this[key]}, set(key, val){return this[key] = val;}
  };
  let oldv = get.call(coll, key);
  let newv = oldv;
  if(typeof conf === "function") {
    newv = conf(oldv);
  } else {
    newv = conf;
  }
  if(newv !== oldv)
    set.call(coll, key, newv);
  return newv;
}
const mapinit = utils.mapinit = (coll, key, nval) => mapval(coll, key, old=>old ?? nval?.() ?? nval)

utils.forEach = function forEach(obj, ftn, ...args) {
  if(obj === undefined) return;
  obj = isObject(obj) ? obj : [obj];
  if(obj.forEach) {
    obj.forEach((val, key)=>ftn(val, key, ...args))
  } else {
    for(let key in obj) ftn(obj[key], key, ...args);
  }
  //Object.keys(obj).forEach(x=>ftn(obj[x], x, ...args))
}

class Pathflow extends Function{
  constructor(hdlr, parent){
    super();
    Object.assign(this, parent);
    this.hdlr = hdlr ?? this.hdlr ?? Pathflow.defaultHdlr;
    this.proxy = new Proxy(this, Pathflow);
    if(parent) this.parent = parent;
    return this.proxy;
  }
  get pathDict(){
    let ret = {}, prop =""; 
    this.path.forEach((val, idx)=>{
      if(isString(val)){prop = val; ret[prop] = {val:undefined, idx}}
      else ret[prop] = {val, idx};
    }); return ret; }
  static get(tgt, prop, recv){
    let hdlr = tgt.hdlr;
    if(prop === 'tgt') return tgt;
    else if(prop === Symbol.toPrimitive) return hdlr[prop];
    //else
    let hdlrProp = hdlr?.onGet(tgt, prop);
    if(hdlrProp) return hdlrProp;
    else if(prop in {toString:"", toJSON:""}) return tgt[prop];
    assert(false, prop);
  }
  static set(tgt, prop, value) {
    return tgt.hdlr.onSet(tgt, prop, value);
  }
  static apply(tgt, thisArg, args) {
    return tgt.hdlr.onApply(tgt, thisArg, args);
  }
  static defaultHdlr = {
    onGet(tgt, prop){
      let ntgt = new Pathflow(tgt.hdlr).tgt;
      ntgt.path = [...tgt.path, prop];
      return ntgt.proxy;
    },
    onApply(tgt, thisArg, args){
      let ntgt = new Pathflow(tgt.hdlr).tgt;
      ntgt.path = [...tgt.path, args];
      return ntgt.proxy;
    }
  }
}

function pathflow(hdlr, init){
  let tgt = hdlr.onApply ? function(){}:{};
  tgt.hdlr = hdlr;
  tgt.proxy = new Proxy(tgt, Pathflow);
  if(typeof init === 'function') init(tgt);
  else Object.assign(tgt, init);
  return tgt;
}
utils.pathflow = pathflow;
utils.Pathflow = Pathflow;
gg.dotgen = utils.dotgen = function(obj={}, ftn){
  return new Proxy(obj, {get(tgt, prop, recv){return tgt[prop] ?? ftn.call(tgt, prop, recv)}});
}

function opflow(key, props){
  let hdlr = {
    onGet(tgt, prop){
      if(prop in tgt.props) {
        let ntgt = new Pathflow(tgt.hdlr, tgt).tgt;
        let {"":flat, ...rest} = tgt.props[prop];
        ntgt.props = {...flat, ...rest};
        ntgt.path = [...tgt.path, prop];
        return ntgt.proxy;
      }
      else {
        assert(false);
      }
    },
    onApply(tgt, thisArg, args) {
      let ntgt = new Pathflow(tgt.hdlr).tgt;
      ntgt.path = [...tgt.path, args];
      return ntgt.proxy;
    }
  }
  let ret = new Pathflow().tgt;
  ret.path = [key];
  ret.props = props;
  return ret.proxy;
}
utils.opflow = opflow;

function opchain(name, defs, ctxt = undefined){
  class Ctxt{
    constructor(){
      this.nextidx = 1;
      this.defs = {};
    }
    get curridx(){return this.nextidx-1;}
    addInvoke(option, args){
      let def = this.defs[option];
      if(!def) def = this.defs[option] = {};
      Object.assign(def, {[this.curridx]: args});
    }
  }
  let elem = function _opchain(...args){
    if(elem.ctxt !== undefined) {
      elem.ctxt.addInvoke(name, args);
      return elem;
    }
    else {
      let ctxt = new Ctxt();
      ctxt.addInvoke(name, args);
      return opchain(name, defs, ctxt);
    }
  }
  elem.ctxt = ctxt;
  function getProp(key, val, def) {
    let ctxt = this.ctxt;
    if(!ctxt){
      ctxt = new Ctxt();
      ctxt.addInvoke(name);
    }
    ctxt.nextidx++;
    ctxt.addInvoke(key, undefined);
    return opchain(key, def, ctxt)
  }
  if(isObject(defs)){
    Object.entries(defs).forEach(([key, val])=>{
      // spread syntax.
      if(key === "") {
        Object.entries(defs.spread).forEach(([key, val])=>{
          Object.defineProperty(elem, key, {get(){
            return getProp.call(this, key, val, defs.spread)
          }})
      })}
      else Object.defineProperty(elem, key, {get(){
        return getProp.call(this, key, val, val);
      }})
    })
  }
  return elem;
}
const getAllProps = utils.getAllProps = function getAllProps(obj, optr = {props:{}, obj}){
  let proto = Object.getPrototypeOf(obj);
  if(proto !== Object.prototype) getAllProps(proto, optr);
  Object.entries(Object.getOwnPropertyDescriptors(obj)).forEach(([prop, desc])=>{
    if(prop === 'propvals')return;
    if(desc.get)optr.props[prop] = desc.get.apply(obj);
    else if(desc.value) optr.props[prop] = desc.value;
  });
  return optr.props;
}
gg.mkproto = utils.mkproto = function mkproto(...intfs) {
  return intfs.flat();
}


gg.mki = utils.mki = function mki(obj, intfs){
  intfs.forEach(intf=>{
    let props = Object.getOwnPropertyDescriptors(intf);
    Object.entries(props).forEach(([prop, desc])=>{
      if(desc.value) {
        if(typeof desc.value === 'function') {
          if(prop === 'constructor') {
            desc.value.apply(obj);
          } else {
            assert(!desc.value.name.startsWith("bound ")); // make sure it is a function.
            Object.defineProperty(obj, prop, {value:desc.value.bind(obj),
              enumerable:true, configurable:true});
          }
        }
        else {
          Object.defineProperty(obj, prop, {
            get(){return intf[prop];},
            set(value){intf[prop] = value},
            enumerable:true, configurable:true
          });
        }
      }
      else if(desc.get){
        Object.defineProperty(obj, prop, {get:desc.get, set:desc.set,
          enumerable:true, configurable:true});
      }
    })
  })
  return obj;
}

utils.mkcls = function mkcls(clsName, protos){
  const bases = protos ?? [];
  let fw = {clsName, bases, get propvals(){
    return getAllProps(this);
  }}
  let proto = {...fw};
  function protoflat(obj, optr=obj) {
    let parent = Object.getPrototypeOf(obj);
    if(parent !== Object.prototype) {
      protoflat(parent, optr);
    }
    let props = Object.getOwnPropertyDescriptors(obj);
    Object.entries(props).forEach(([prop, desc])=>{
      if(prop in fw)
        return;
      let destDesc = Object.getOwnPropertyDescriptor(obj, prop);
      // Simple Override
      if(desc.value) 
        Object.defineProperty(proto, prop, {
          get(){return obj[prop]},
          set(value){obj[prop] = value},
          configurable:true, enumerable:true});
      else if(desc.get)
        Object.defineProperty(proto, prop,{get:desc.get, set:desc.set,
          configurable:true, enumerable:true});
    })
  }
  bases.forEach(x=>protoflat(x));
  let x = Object.create(proto, {proto:{value:proto}});
  x.mko = (...objs)=>Object.assign(Object.create(x, {mko:{value:undefined}, proto:{value:proto}}), ...objs);
  return x;
}


gg.nextlid = utils.nextlid = function nextlid(){
  return "l"+ngsid;
}

gg.using = function using(...items){
  let globalSave = globalThis;
  let ret = Object.create(globalThis);
  globalThis = ret;
  items.forEach(x=>{
    Object.assign(globalThis, der(x));
  })
  globalThis = globalSave;
  return ret;
}
gg.dynftn = new Proxy({}, {
  get(tgt, verb, recv) {
    if(isString(verb))
      return function (args, child){return {verb, args, child}};
    else return tgt[verb];
  }
})

gg.dictexec = function(hdlr, root={}){
  let curr = root;
  return function(iobj){

    function exec(iobj){
      for(let kstr in iobj){
        let frame = {kstr, parent: curr, ...iobj[kstr]};
        let verb = hdlr[frame.verb];
        assert(!(kstr in curr));
        curr = curr[kstr] = frame;
        assert(verb);
        let before = verb?.before ?? verb;
        if(isFunction(before))
          before.call(hdlr, frame, root);
        if(frame.child)
          exec(frame.child);
        if(isFunction(verb.after))
          verb.after.call(hdlr, frame, root);
        curr = curr.parent;
      }
    }
    exec();
    if(hdlr.alldone)
      return hdlr.alldone(root);
    else
      return root;
  }
}


//#region time
gg.now = utils.now = {
  get dt(){return new Date()},
  get mils(){return Date().now},
  get secs(){return (now.mils/1000).toFixed(3)},
  get tstr(){
    let now = new Date();
    return now.toLocaleTimeString('en-US', {hour12:false}) +
    `${(now.getMilliseconds()/1000).toString().substr(1)}`},
  get dtstr(){
    let now = new Date();
    return now.toLocaleString('en-US', {hour12:false}) +
    `${(now.getMilliseconds()/1000).toString().substr(1)}`}
}
//#endregion time


//#region mutation
const mutationObserverConfig = 
{ 
  attributes: true, 
  childList: true, 
  characterData:true,
  attributeOldValue:true,
  characterDataOldValue:true,
  subtree: true,
};

function mutationObserverCallback(mutationList, observer) {
  mutationList.forEach((mutation) => {
    switch(mutation.type) {
      default:
        console.log(mutation);
        break;
    }
  });
}
//#endregion mutation
//#region events
gg.evh = function evh(hdlr){
  return function(evt){
    if(evh.evtype[evt.type]){
      console.log(`===begin: ${now.tstr} ${evt.type} ${evt.data} on`)
      console.log(evt.target)
      console.dir(evt.target)
    }
    hdlr.call(this, evt);
    if(evh.evtype[evt.type]){
      console.log(`=====end ${evt.type}`)
    }
  }
}
gg.fparams = function(ftn){
  let ftnstr = ftn.toString();
  let params = [];
  let ftnargs = ftnstr.substr(ftnstr.indexOf("(")+1, ftnstr.indexOf(")")).split(",").forEach(paramStr=>{
    let [paramName, paramDefault] = paramStr.split("=").map(x=>x.trim());
    params.push({paramName, paramDefault});
  });
  return params;
}
gg.mkverbs = function(defs){
  let ret = {}
  Object.entries(defs).forEach(([fname, ftn])=>{
    let params = fparams(ftn);
    ret[fname] = {ftn, params, act(args){
      let ftnparams = [];
      params.forEach(({paramName, paramDefault})=>{
        let paramVal = args[paramName];
        ftnparams.push(paramVal);
        if(paramDefault === 'Required')
          assert(paramVal !== undefined);
        if(paramDefault === 'NotNull')
          assert(paramVal);
      })
      return ftn.apply(defs, ftnparams);
    }}
  })
  ret.act = (verbName, args)=>{
    assert(verbName in ret);
    ret[verbName].act(args);
  };
  return ret;
}

gg.ftnhdr = function ftnhdr(ftnu){
  let hdr = {type: 'Ftn', name: ftnu.name, gsid:ngsid, ftnu, args:{map:{},list:[]}};
  try{
    var exp = esprima.parse('('+ftnu.toString()+')').body[0].expression;
  }
  catch{
    exp = esprima.parse('(function '+ftnu.toString()+')').body[0].expression;
  }
  hdr.exp = exp;
  assert(hdr.exp.type === 'FunctionExpression')
  hdr.exp.params.forEach((arg, idx)=>{
    let ftnarg = {
      type:'FtnParam', name:arg.name ?? arg.left.name, idx, 
      argtype:'', ftnhdr: hdr, descs:[]}
    let right = arg.right;
    while(right) {
      let elem = right.left ?? right
      ftnarg.descs.push(elem.name ?? escodegen.generate(elem));
      right = right.right;
    }
    hdr.args.map[ftnarg.name] = ftnarg;
    hdr.args.list.push(ftnarg)
  })
  return hdr;
}

gg.tokener = function tokener(def){
  let lexer = moo.compile(def);
  let parse = function(text){
    assert(typeof text === 'string')
    lexer.reset(text);
    return Array.from(lexer, token=>{return {type:token.type, text:token.value}})
  };
  return {lexer, parse};
  /*
  var defs = Object.entries(def);
  var terms = defs.map(di => (di[1] instanceof RegExp)? `(${di[1].source})`:assert(false))
  let regstr = "";
  for(let i = 0; i < terms.length; i++) {
    regstr = terms.slice(0, i).join('|');
    retest = new RegExp(regstr + '|', )
  }
  return {regex: new RegExp(regstr, 'g')}
  */
}
gg.next_gsid = 1;
Object.defineProperty(gg, 'ngsid', {get(){return next_gsid++;}})
Object.defineProperty(utils, 'ngsid', {get(){return next_gsid++;}})

return gg.utils;
/*
let spldef = {scopes:['()', '[]', '{}'], splitters:[['=',':'], ',']}


function splatcher(def){
  const escaper = s=>s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

  var scope_opens = Object.fromEntries(def.scopes.map(scope=>[scope[0], scope]));
  var scope_closes = Object.fromEntries(def.scopes.map(scope=>[scope[1], scope]));;

  let splitters = {};
  
  def.splitters.forEach((splitter, i) => {
    let spl = (Array.isArray(splitter)) ? splitter : [splitter];
    spl.forEach(x=>splitters[x] = i)
  })

  const match_str = /(["'])(?:(?=(\\?))\2.)*?\1/;
  const match_sp = /\s+/;
  let match_regex = ''
  match_regex += `(${Object.entries(scope_opens).map(op=>escaper(op[0])).join('|')})`
  match_regex += `|(${Object.entries(scope_closes).map(cl=>escaper(cl[0])).join('|')})`
  match_regex += `|(${Object.entries(splitters).map(sp=>escaper(sp[0])).join('|')})`
  match_regex += `|([\\w\\.]+)`
  match_regex += `|(${match_str.source})|(${match_sp.source})`

  let regex = new RegExp(match_regex, "g")
  function splatch(string, callback){

  }
  return {splatch};
}

splatcher(spldef)

gg.ftnParser = /^(function|)\s*(\w*)\((((\s*(\w+)\s*(=\s*(\w+)\s*|))(,\s*(\w+)\s*(=\s*(\w+)\s*|))*)|)\)/
*/

//#endregion events
}))