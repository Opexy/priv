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
const sizeof = utils.sizeof = (x)=>x ? x.length ?? x.size ?? Object.keys(x).length ?? 0 : 0;
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
    if(parent) this.path = parent;
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
utils.Pathflow = Pathflow;

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

gg.ftnhdr = function ftnhdr(ftnu){
  let hdr = {type: 'Ftn', name: ftnu.name, gsid:ngsid, ftnu, args:{map:{},list:[]}};
  let exp = esprima.parse('('+ftnu.toString()+')').body[0].expression;
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