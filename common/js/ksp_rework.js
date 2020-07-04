'use strict';
const assert = console.assert;
function pathBuilder(hdlr){
  const pbhdlr = {
    get(tgt, prop, recv) {
      if(prop === 'tgt')
        return tgt;
      if(prop === Symbol.toPrimitive){
        return recv.toString();
      }
      let action = hdlr?.actions?.[prop];
      if(action)
        return action.bind({tgt, path:tgt.path, prop})

      if(prop === 'toString')
        return Object.toString.call(this);
      if(prop === 'toJSON')
        return undefined;
      
      let cur = {kstr:prop, kval:undefined};
      let path = [...tgt.path, cur];
      let ntgt = mktgt(path);
      if(hdlr.onGet) {
        ntgt = hdlr.onGet(ntgt, tgt);
      }
      return ntgt.proxy;
    },
    apply(tgt, recv, args) {
      let last = tgt.last;
      assert(args.length === 1);
      let ntgt = mktgt([...tgt.path.slice(0,-1), {...last, kval:args[0]}])
      if(hdlr.onApply) {
        return hdlr.onApply(ntgt, tgt, args);
      }
      return ntgt.proxy;
    },
    set(tgt, prop, value){
      // dirty and simple
      if(hdlr.onSet){
        if(prop in {toString:1, toJson:1, tgt:1})
          assert(false);
        let path = (prop === 'val')? tgt.path : [...tgt.path, {kstr:prop, kval:undefined}];
        return hdlr.onSet.call(tgt, path, value);
      }
      else assert(false);
    }
  }
  class pbtgt extends Function{constructor(){super();}
    get cur(){return this.last}
    get last(){return this.path[this.path.length - 1]}
  }
  function mktgt(path){
    let tgt = Object.assign(new pbtgt(), {hdlr, path});
    tgt.proxy = new Proxy(tgt, pbhdlr);
    return tgt;
  }
  return mktgt([]).proxy;
}

const pathcat = (a, b)=> a?a+"."+b:b
const flatobj = (obj, cb) => {
  let objpath = [];
  let evalnext = function evalnext(){
    if(typeof this.val === 'object') {
      this.decision = this.step;
    } else {
      this.decision = this.add;
    }
    this.cb?.call(this, this)
    this.decision();
  }
  let ctx = {
    cb, output:[], stack:[[undefined, obj]], pstr:undefined, kstr:undefined, 
    key:undefined, val:obj, decision:undefined,
    add(){
      this.output.push([this.kstr, this.val, [...this.stack, [this.key, this.val]]]);
    }, discard(){}, step(){
      this.stack.push([this.key, this.val]);
      const old_pstr = this.pstr, pstr = this.kstr, obj=this.val;
      Object.keys(obj).forEach(key=>{
        this.pstr = pstr;
        this.key = key;
        this.kstr = pathcat(pstr, key);
        this.val = obj[key];
        evalnext.call(this);
      })
      this.stack.pop();
    }}
  evalnext.call(ctx);
  return ctx.output;
}
const setobjpathval = (obj, path, val)=>{
  let iter = obj;
  path.slice(0, -1).forEach(elem=>{iter = iter[elem] ? iter[elem]: {}});
  iter[path[path.length-1]] = val;
}
const unflat = (obj)=>{
  let ret = {};
  Object.keys(obj).forEach(kp=>{
    setobjpathval(ret, kp.split('.'), obj[kp]);
  })
}
function keySpace(){

//      Caskey: Cascaded key under this key.
//      Data shouldn't exist without key..., but in reality it shall just be
//      a separate key.
//      All Object with Key x set;
//      All Object with key y set;
// Mko: Key(x), key(b), key(c) => Values/Query/Flow
// Omc: Object (Meta) Class ==> List of items
// Tgt: target

let ksp = this;
let proto = {};
let reflection = new WeakMap();
const delimiter = "."
const Any = keySpace.Any = "_Any_"
const Specific = keySpace.Specific = "_Specific_"
const Specified = keySpace.Specified = "_Specified_"

ksp.key = {}
ksp.allkeys = [];
ksp.keyslist = {all:ksp.allkeys};
ksp.rulekey = {};
ksp.rulekeymeta = {};
ksp.rule = {};
// has to be immutable.


const pbhdlr = {
  onGet: function(ntgt, otgt){
    assert(ntgt.cur.kstr in ksp.key); return ntgt;},
  onApply:function(ntgt, tgt, args){
    return ntgt.proxy;
  },
  actions:{toString(){return this.tgt.toString()}}
}

proto.pb = pathBuilder(pbhdlr);
// ksp.keysalist.all cannot be wrote.
const emplacePath = proto.emplacePath = function emplacePath(pstr){
  assert(pstr);
  let pathelems = pstr.split('.');
  let keyname = pathelems[pathelems.length - 1];
  let key = ksp.key[keyname];
  if(key) {
    assert(key.pstr === pstr);
  } else {
    if(pathelems.length > 1) {
      ksp.emplacePath(pathelems.slice(0,-1).join('.'));
    }
    key = new kspKey({pstr, keyname, idx:ksp.allkeys.length})
    ksp.allkeys.push(key);
    ksp.key[keyname] = key;
  }
  return key;
}
const addKeys = proto.addKeys = function addKeys(keydef, pstr = undefined){
  if(typeof keydef === 'string') {
    ksp.emplacePath(pathcat(pstr, keydef))
  } else if(Array.isArray(keydef)){
    keydef.forEach(elem=>ksp.addKeys(elem, pstr));
  } else if(typeof keydef === 'object') {
    if(keydef?._keytype in ksp.KeyTypes) {
      ksp.emplacePath(pstr).keydesc = keydef;
    } else {
      for(let key in keydef) {
        ksp.addKeys(keydef[key], pathcat(pstr, key))
      }
    }
  } else
    assert(false);
}

const jsonkval = obj=>JSON.stringify(obj, (key, val)=> {
  if(key === 'key') return val? val.kval : val
  else return val;
})

const pb_to_rk = proto.pb_to_rk = function pb_to_rk(pb){
  let rko = {};
  pb.tgt.path.forEach((entry, idx)=>{let {kstr, kval} = entry;
  rko[kstr] = {key:ksp.key[kstr], kval, idx:idx}});
  rko = Object.fromEntries(Object.entries(rko).sort((a,b)=>a[1].key.idx - b[1].key.idx));
  let rkstr = jsonkval(rko);
  let rk = ksp.rulekey[rkstr];
  if(!rk) {
    let rkmo = {};
    Object.entries(rko).forEach(([key, entry])=>{
      rkmo[key] = {key:entry.key, kval:entry.kval ? Specific : Any}; // key idx?
    })
    let rkmstr = jsonkval(rkmo);
    let rkm = ksp.rulekeymeta[rkmstr];
    if(!rkm){
      rkm = new kspRuleKeyMeta({rkmstr, rkmo, rk:{}});
    }
    rk = new kspRuleKey({rkstr, rko, rkm, rule:[]})
  }
  return rk;
}

const setRuleKivo = proto.setRuleKivo = function setRuleKivo(pb, ro){
  let rk = pb_to_rk(pb), rkstr = rk.rkstr, rkm = rk.rkm, rkmstr = rkm.rkmstr;
  if(!ksp.rulekey[rkstr]) {
    ksp.rulekey[rkstr] = rk;
    if(!ksp.rulekeymeta[rkmstr]){
      ksp.rulekeymeta[rkmstr] = rkm;
    }
    rkm.rk[rkstr] = rk;
  }

  let rotype = kspValPlain;
  let roflat = flatobj(ro, (ctx)=>{
    if(ctx.val?.kspType === kspValXstr){
      ctx.decision = ctx.add;
      rotype = kspValFormula;
    }
  });
  let roval = new rotype({ro, roflat:Object.fromEntries(roflat)});
  rk.rule.push(new kspRule({rk, roval}));
}
const valXstr = proto.valXstr = function valXstr(strlist, ...args){
    return new kspValXstr({strlist, args})
}

const meta_rel = proto.meta_rel = function meta_rel(a, b){
  //assert((a.rt === 'inout') && (b.rt === 'inout'));
  let ret = {
    a_complies_to_b:'match', b_complies_to_a:'match',
    details:{...a, ...b}, conditions:{}}
  
  for(let key in ret.details) {
    let enta = a[key], entb = b[key];
    let result = {key:enta?.key ?? entb.key, enta, entb};
    ret.details[key] = result;
    if(enta && entb) {
      if(enta.kval === Any && entb.kval === Any) {
        result.res = "match"
      } else {
        result.res = 'conditional'
        ret.a_complies_to_b = 'conditional'
        ret.conditions[key] = result;
      }
    }
  }
  for(let key in ret.details){
    let result = ret.details[key];
    let {enta, entb} = result;
    if(!enta || !entb) {
      result.res = "unmatched"
      let src_ent = enta?enta:entb;
      let set_dst = dst_ent=>{
        if(enta)result.entb = dst_ent;
        else if(entb) result.enta = dst_ent;}
      let dst = enta?b:a;
      // check b for anything that is specific to keya
      // check b for anything that is general to keya
      for(key in dst) {
        let dst_ent = dst[key];
        if(src_ent.key.hassub(dst_ent.key)) {
          // a is more general than b
          //assert(src_ent.value === ksp.Any); // TODO: assert if parent is matched.
          set_dst(dst_ent);
          result.res = "match";
        }
        else if(dst_ent.key.hassub(src_ent.key)) {
          //assert(dst_ent.value === ksp.Any);
          set_dst(dst_ent);
          result.res = "match";
        }
      }
      if(result.res === 'unmatched') {
        if(enta)ret.b_complies_to_a = 'unmatched'
        else ret.a_complies_to_b = 'unmatched'
      }
    }
  }
  return ret;
}
function objMatch(src, test, matcher){
  for(let key in test){
    if(!matcher(key, src[key], test[key]))
      return false;
  }
  return true;
}

const meta_match = proto.meta_match = function meta_match(rkm, to_match){
  // todo: performance improvement.
  let ret = [];
  Object.values(rkm.rk).forEach(rk=>{
    if(objMatch(rk.rko, to_match, (key, src, test)=>
      src?.value === test?.value)) {
      ret.push(rk);
    }})
  return ret;
}
const query = proto.query = function query(pb, cb) {
  let rk = pb_to_rk(pb), rko = rk.rko;
  let result = [];
  let add_entry = (rkm, rk)=>{
    assert(rkm === rk.rkm);
    rk.rule.forEach(rule=>{
      let entry = {rkm, rk, rule, roval:rule.roval};
      if(entry) entry = cb(entry)
      if(entry) result.push(entry);
    })
  }
  Object.values(ksp.rulekeymeta).forEach(rkm=>{
    let meta_rel = ksp.meta_rel(rkm.rkmo, rk.rkm.rkmo);
    if(meta_rel.b_complies_to_a === 'match'){
      Object.values(rkm.rk).forEach(rk_match=>add_entry(rkm, rk_match));
    } else if(meta_rel.b_complies_to_a === 'conditional'){
      let to_match = {};
      for(let condkey in meta_rel.conditions){
        to_match[condkey] = rko[condkey];
      }
      let list = meta_match(rk.rkm, to_match);
      list.forEach(rk_match=>add_entry(meta, rk_match))
    } else {
      //console.log("not matching: " + meta.metastr)
      //console.log("to: " + ksp.meta_tostr(objmeta))
    }
  })
  return result;
}

const KeyTypes = proto.KeyTypes = Object.fromEntries(['Option', 'Property', 'DynamicKey'].map(entry=>{
  proto[entry] = function (desc){return {...desc, _keytype:entry}}
  return [entry, ksp[entry]]
}))

const kspObj = proto.kspKey = class kspObj {
  static _nextid = 0;
  static props = {};
  static get nextid(){return kspObj._nextid++}
  constructor(kspType, ...obj){this.id =kspObj._nextid++; Object.assign(this, {kspType}, ...obj)}
  get props(){return props[this.id]}
  prop(prop, val) {
    let props = this.props;
    let propval = {}
    let iter = obj;
    path.slice(0, -1).forEach(elem=>{iter = iter[elem] ? iter[elem]: {}});
    iter[path[path.length-1]] = val;
  
    setobjpathval(this, prop, val)}
  getProp(prop, val) {
    
  }
  get ksp(){return ksp;}
};
const kspKey = proto.kspKey = class kspKey extends kspObj{
  constructor(...obj){super(kspKey, fields, ...obj)}// TODO: NOW.
  get keypath(){return this.pstr.split('.').map(x=>ksp.key[x])}
  hassub(keyb){
    let kp = keyb.keypath;
    for(let iter = kp.length-1; kp[iter]?.idx >= this.idx; iter--) {
      if(kp[iter].idx === this.idx) {
        assert(kp[iter] === this);
        return true;
      }
    }
    return false;
  }
  get keyType(){return this.desc?._keytype}
  addSubkey(){this.desc.subkeys}
};
// Rule stands for evaluation order
const kspRule = proto.kspRule = class kspRule extends kspObj {
  constructor(...obj){super(kspRule); Object.assign(this, ...obj)}}
const kspRuleKey = proto.kspRuleKey = class kspRuleKey extends kspObj{
  constructor(...obj){super(kspRuleKey); Object.assign(this, ...obj)}
}
const kspRuleKeyMeta = proto.kspRuleKeyMeta = class kspRuleKeyMeta extends kspObj {
  constructor(...obj){super(kspRuleKeyMeta); Object.assign(this, ...obj)}}
// Rule may have multiples of kspValPlain... 
const kspValPlain = proto.kspValPlain = class kspValPlain extends kspObj {
  constructor(...obj){super(kspValPlain); Object.assign(this, ...obj)}}
// Each formula essentially embeds a path to derive the value of a kspRule.
const kspValFormula = proto.kspValFormula = class kspValFormula extends kspObj {
    constructor(...obj){super(kspValFormula); Object.assign(this, ...obj)
    // Depends on Compound Key.
  }
}
const kspValXstr = proto.kspValXstr = class kspValXstr extends kspObj {
  constructor(...obj){super(kspValXstr); Object.assign(this, ...obj)}}

//Object.setPrototypeOf(proto, keySpace);
//Object.setPrototypeOf(ksp, proto);
} // end of ksp

function ksp_proxy(){

}

function ksp_unit_test(){
  //let x = new ksp(), xp = x.pathBuilder;
  //x.AddOption(xp."target".x,)
  let compiler = new keySpace(), ksp=compiler.proto, xp = compiler.pb, 
    set = ksp.setRuleKivo, xtr = ksp.valXstr;
  compiler.addKeys({
    outdir:[ksp.Property()],
    arch:["x64"],
    buildtype:["release","debug"],
    compiler:["clang", "gcc", "msvc"],
    target: [ksp.DynamicKey()],
    src: [ksp.DynamicKey()],
    compilelink:[{compile:["c", "cpp"]}, "link"]
  })
  compiler.designMode = false;

  set(xp.outdir, "/home${xp.projpath}")
  set(xp.clang, {cc:"cc", cxx:"clang-10", ld:"clans -10"})
  set(xp.c, {flags:["-std=c17"]})
  set(xp.cpp, {flags:["-std=c++2a"]})
  set(xp.compilelink, {flags: ["-pthread", "-fPIC"]})
  set(xp.compile, {flags:["-I/usr/local/include", "-I/usr/include"]})
  set(xp.debug.compile, {flags:[`-DDEBUG`,`-g`,`-O0`]})
  set(xp.debug.link, {flags:[`-DDEBUG`]})
  set(xp.buildtype.link, {flags:[xtr`-L${xp.outdir}/${xp}`]})
  compiler.outdir = "/home/namespace"


  set(xp.target('world').debug.compilelink, {flags:["-World"]})
  set(xp.target('hello').debug.compilelink, {flags:["-Hello"]})
  set(xp.target('hello').src('helloworld.c').debug.compilelink, {flags:["-helloworld.c"]})
  set(xp.target('hello').src('ahelloworld.c').debug.compilelink, {flags:["-ahelloworld.c"]})


  ksp.query(xp.target('hello').src("helloworld.c").debug.link, function(entry){
    console.log(JSON.stringify(entry.roval.ro));
    return entry;
    // target applies to target*, file applies to file*, target & file applies to targetAnyfileAny.
    // one-rule: traverse x, x.base; two-rules: can use index; three-rules: 
    // x -> x.specified; y -> y.specified; z -> z.specified.
  })
  assert(false);
  
}


if (require.main === module) {
  ksp_unit_test()
} else {
  modules.exports = keySpace;
}


