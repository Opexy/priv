//#region Header
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory) /* global define */
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    root.ksp = factory()
  }
}(this, function(){
//#endregion header
const assert = globalThis.assert = console.assert;
const isArray = globalThis.isArray = Array.isArray;
const isString = globalThis.isString = (x)=>typeof x === 'string';
const isObject = globalThis.isObject = (x)=>typeof x === 'object';
const sizeof = globalThis.sizeof = (x)=>x ? x.length ?? x.size ?? Object.keys(x).length ?? 0 : 0;

function forEach(obj, ftn, ...args) {
  if(obj === undefined) return;
  obj = isObject(obj) ? obj : [obj];
  if(obj.forEach) {
    obj.forEach((val, key)=>ftn(val, key, ...args))
  } else {
    for(let key in obj) ftn(obj[key], key, ...args);
  }
  //Object.keys(obj).forEach(x=>ftn(obj[x], x, ...args))
}
globalThis.forEach = forEach;
function defProps(obj, defs, writable=false) {
  for(let prop in defs) 
    //if(defs[key]!==undefined)
    Object.defineProperty(obj, prop, {value:defs[prop], writable});
}
function traverse(obj, cb) {
  let ctxt = {path:[]}
  function trav(key, obj){
    ctxt.path.push([key, obj]);
    let res = cb.call(ctxt, obj, key);
    if(res === 'next'){}
    else {
      if(isObject(obj)) {
        for(key in obj) {
          trav(key, obj[key]); // TODO 
        }
      }
    }
    ctxt.path.pop();
  }
  trav(undefined, obj);
}
globalThis.traverse = traverse;
function defOnce(obj, defs){defProps(obj, defs, false)}
// applies to Map and WeakMap
function mapval(coll, key, conf = old=>old){
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
globalThis.mapval = mapval;
globalThis.mapinit = (coll, key, nval) => mapval(coll, key, old=>old ?? nval?.() ?? nval)

function pathBuilder(hdlr){
  const pbhdlr = {
    get(tgt, prop, recv) {
      if(prop === 'tgt')
        return tgt;
      if(prop === Symbol.toPrimitive){
        return hdlr[prop];
      }
      let action = hdlr?.actions?.[prop];
      if(action)
        return action.bind({tgt, pbp:tgt.pbp, prop})

      if(prop === 'toString')
        return Object.toString.call(this);
      if(prop === 'toJSON')
        return undefined;
      
      let cur = {kstr:prop, kval:undefined};
      let pbp = [...tgt.pbp, cur];
      let ntgt = mktgt(pbp);
      if(hdlr.onGet) {
        return hdlr.onGet(ntgt, tgt);
      }
      return ntgt.proxy;
    },
    apply(tgt, recv, args) {
      let last = tgt.last;
      let kval = args.flat();
      if(kval.length === 1) kval = kval[0];
      let ntgt = mktgt([...tgt.pbp.slice(0,-1), {...last, kval}])
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
        let pbp = (prop === 'val')? tgt.pbp : [...tgt.pbp, {kstr:prop, kval:undefined}];
        return hdlr.onSet.call(tgt, pbp, value);
      }
      else assert(false);
    }
  }
  class pbtgt extends Function{constructor(){super();}
    get cur(){return this.last}
    get last(){return this.pbp[this.pbp.length - 1]}
  }
  function mktgt(pbp){
    let tgt = Object.assign(new pbtgt(), {hdlr, pbp});
    tgt.proxy = new Proxy(tgt, pbhdlr);
    return tgt;
  }
  return mktgt([]).proxy;
}

function mkSpec(spec){

  const Any = "_Any_"
  const Specific = "_Specific_"
  const Specified = "_Specified_"

  let keylist = {}
  const addObj = (kstr, type, parkey)=>{
    let key = mapval(keylist, kstr, (old)=>{assert(!old); return {type, kstr}});
    keylist[kstr] = key;
    key.idx = Object.keys(keylist).length - 1;
    if(parkey) {
      defOnce(key, {parkey});
      if(!parkey.subkey) parkey.subkey  = {};
      parkey.subkey[kstr] = key;
    }
    key.hassub = function hassub(keyb) {
      let iter = keyb;
      while(iter) {
        if(iter.idx === this.idx) {
          return true;
        }
        iter = iter.parkey;
      }
      return false;
    }
    return key;
  }
  const traverse = (spec, parkey)=>{
    if(isArray(spec)) {
      forEach(spec,kstr => {
        assert(isString(kstr));
        addObj(kstr, "Key", parkey);
      })
    } else if(isObject(spec)){
      for(let kstr in spec) {
        let childkey = addObj(kstr, "Key", parkey);
        traverse(spec[kstr], childkey);
      }
    } else {
      assert(false);
    }
  }
  traverse(spec, undefined);

  let rulekey = {};
  let rulekeyMeta = {};
  const pbhdlr = {
    onGet(ntgt, otgt) {
      assert(ntgt.cur.kstr in keylist); 
      //ntgt.cur.key = keylist[ntgt.cur.kstr];
      return ntgt.proxy;
    },
    actions:{toString(){
      return this.tgt.toString()}
    }
  }
  const jsonkval = obj=>JSON.stringify(obj, (key, val)=> {
    if(key === 'key') return val? val.kval : val
    else return val;
  })
  function pbGetKs(pb) {
    let rko = {};
    if(pb?.tgt?.pbp) {
      forEach(pb.tgt.pbp, (entry, idx)=>{let {kstr, ...kval} = entry;
        assert(keylist[kstr]);
        rko[kstr] = {key:keylist[kstr], ...kval, idx}});
    } else {
      if(isArray(pb)) {
        let idx = 0;
        forEach(pb, (entry)=>{
          if(isString(entry))rko[entry] = {key:keylist[entry], idx:idx++};
          else if(isObject(entry)) {
            forEach(entry, (kval, kstr)=>{
              if(!keylist[kstr])
                assert(false);
              rko[kstr] = {key:keylist[kstr], kval, idx:idx++}})
          } else assert(false);
        })
      }
    }
    rko = Object.fromEntries(Object.entries(rko).sort((a,b)=>a[1].key.idx - b[1].key.idx));
    let rkstr = jsonkval(rko);
    let rk = rulekey[rkstr];
    if(!rk) {
      let rkmo = {};
      Object.entries(rko).forEach(([key, entry])=>{
        rkmo[key] = {key:entry.key, kval:entry.kval ? Specific : Any}; // key idx?
      })
      let rkmstr = jsonkval(rkmo);
      let rkm = rulekeyMeta[rkmstr];
      if(!rkm){
        rkm = {rkmstr, rkmo, rk:{}};
      }
      rk = {rkstr, rko, rkm, rule:[]}
    }
    return rk;
  }
  function ksAddVal(pb, roval){
    let rk = pbGetKs(pb), rkstr = rk.rkstr, rkm = rk.rkm, rkmstr = rkm.rkmstr;
    rulekey[rkstr] = rk;
    rulekeyMeta[rkmstr] = rkm;
    rkm.rk[rkstr] = rk;

    let rule = {rk, roval}
    rk.rule.push(rule);
  }

  function meta_rel(a, b){
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
          ret.b_complies_to_a = 'conditional'
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
  
  function meta_match(rkm, to_match){
    // todo: performance improvement.
    let ret = [];
    Object.values(rkm.rk).forEach(rk=>{
      if(objMatch(rk.rko, to_match, (key, src, test)=>
        src?.kval === test?.kval)) {
        ret.push(rk);
      }})
    return ret;
  }
  function query(pb, cb) {
    let rk = pbGetKs(pb), rko = rk.rko;
    let result = [];
    console.log("querying for: " + rk.rkstr)
    let add_entry = (rkm, rk)=>{
      assert(rkm === rk.rkm);
      rk.rule.forEach(rule=>{
        let entry = {rkm, rk, rule, roval:rule.roval};
        if(entry) entry = cb(entry)
        if(entry) result.push(entry);
      })
    }
    Object.values(rulekeyMeta).forEach(rkm=>{
      let rel = meta_rel(rkm.rkmo, rk.rkm.rkmo);
      // what we are looking for complies to candidate.
      if(rel.b_complies_to_a === 'match'){
        Object.values(rkm.rk).forEach(rk_match=>add_entry(rkm, rk_match));
      } else if(rel.b_complies_to_a === 'conditional'){
        let to_match = {};
        for(let condkey in rel.conditions){
          to_match[condkey] = rko[condkey];
        }
        let list = meta_match(rkm, to_match);
        list.forEach(rk_match=>add_entry(rkm, rk_match))
      } else {
        //console.log("not matching: " + meta.metastr)
        //console.log("to: " + ksp.meta_tostr(objmeta))
      }
    })
    return result;
  }
  return {query, ksAddVal, keylist, pb: pathBuilder(pbhdlr)};
}
function unit_test(argv){
  // Being able to Flow:
  let {
    query, ksAddVal:set, pb:xp} = mkSpec({
    compilerRule:{
      arch:["x64"],
      buildtype:["release", "debug"],
      compiler:["clang", "gcc", "msvc"],
      outdir:{},
      compilelink:{
        compile:["c", "cpp"],
        link:{}
      },
      target:{},
      src:{},
  }});

  //https://www.ohmanhua.com/16892/1/36.html
  set(xp.outdir, "/home${xp.projpath}")
  set(xp.clang, {cc:"cc", cxx:"clang-10", ld:"clans-10"})
  set(xp.c, {flags:["-std=c17"]})
  set(xp.cpp, {flags:["-std=c++2a"]})
  set(xp.compilelink, {flags: ["-pthread", "-fPIC"]})
  set(xp.compile, {flags:["-I/usr/local/include", "-I/usr/include"]})
  set(xp.debug.compile, {flags:[`-DDEBUG`,`-g`,`-O0`]})
  set(xp.debug.link, {flags:[`-DDEBUG`]})
  set(xp.target('world').debug.compilelink, {flags:["-World"]})
  set(xp.target('hello').debug.compilelink, {flags:["-Hello"]})
  set(xp.target('hello').src('helloworld.c').debug.compilelink, {flags:["-helloworld.c"]})
  set(xp.target('hello').src('ahelloworld.c').debug.compilelink, {flags:["-ahelloworld.c"]})

  query(xp.target('hello').src("helloworld.c").debug.link, function(entry){
    console.log(JSON.stringify(entry.roval))
    return entry;
  });
}
if(require.main === module) unit_test(process.argv);

return mkSpec;
}))