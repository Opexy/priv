'use strict';
const assert = console.assert
function splitOnLast(str, sep){
  let pos = str.lastIndexOf('.');
  if(pos >= 0) {
    return [str.slice(0, pos), str.slice(pos+sep.length)];
  }
  else 
    return [str];
}

function splitOnLast(str, sep){
  let pos = str.lastIndexOf('.');
  if(pos >= 0) {
    return [str.slice(0, pos), str.slice(pos+sep.length)];
  }
  else 
    return [str];
}
function objSort(obj, compare) {
  return Object.fromEntries(Object.entries(obj).sort(compare));
}

function objMatch(src, test, matcher){
  for(let key in test){
    if(!matcher(key, src[key], test[key]))
      return false;
  }
  return true;
}

function ksp(spec) {
  function setkey(parent, key, value){
    let ptgt = parent.tgt;
    let cur = {key, value};
    let obj = {...ptgt.obj, [key.name]:cur};
    let tgt = Object.assign(function(){}, {cls:ptgt.cls, obj, cur});
    let ret = new Proxy(tgt, ksp_hdlr);
    tgt.proxy = ret;
    return ret;
  }

  function obj_toString(obj){
    let keylist = Object.values(obj).sort((a, b)=>a.key.idx - b.key.idx);
    let keylist_obj = Object.fromEntries(keylist.map(entry=>{
      let value = entry.value ?? entry.key.default_value;
      return [entry.key.name, value];
    }))
    let ret = JSON.stringify(keylist_obj);
    assert(ret != '{}');
    return ret;
  }
  function obj_meta(obj){
    let meta = {};
    const addkey = (key, value)=>{
      assert(!meta[key.name]);
      meta[key.name] = {key, value};
    }
    Object.values(obj).forEach(elem=>{
      if(elem.value === ksp.Any){
        addkey(elem.key, ksp.Any); // TODO: unless parent spec is specific.
      } else {
        if(elem.value === ksp.Specified) {
          addkey(elem.key.parent, ksp.Specific);
        }
        else {
          addkey(elem.key, ksp.Specific);
        }
      }
    });
    return objSort(meta, (a, b)=>a[1].key.idx - b[1].key.idx)
  }
  ksp.obj_meta = obj_meta;
  const methods = {
    clsAddSpec(self, spec){
      let tgt = self.tgt;
      let cls = tgt.cls;
      for(let [key, keyspec] of Object.entries(spec)) {
        if(tgt.cur)
          key = tgt.cur.key.addChild(key);
        else
          key = cls.emplacePath(key);
        key.setSpec(keyspec);
      }
    },
    vkeyPerform(self, verb, vobj){
      let mobj = methods._marshall(self, true);
      let oldv = mobj.vobj;
      let newv = self.tgt.cls.verbs[verb](self, verb, oldv, vobj);
      if(newv !== undefined){
        mobj.vobj = newv;
      }
      else {
        mobj.vobj = undefined; // delete?
      }
      return newv;
    },
    // will marshall.
    toString(self){
      return methods._marshall(self).ostr;
    },
    _marshall(self, insert=false){
      let tgt = self.tgt, cls=tgt.cls, obj=tgt.obj;
      let ret = cls.marshalled.get(obj)
      if(!ret) {
        let ostr = obj_toString(obj);
        let marshalled_obj = cls.strobj[ostr];
        if(marshalled_obj){
          obj = marshalled_obj;
          ret = cls.marshalled.get(obj);
          assert(ret.obj === obj);
          tgt.obj = obj;
        } else if(insert){
          let meta = cls.emplaceMeta(obj_meta(obj));
          ret = {obj, ostr, meta, vobj:undefined, marshalled:true};
          cls.strobj[ostr] = obj;
          cls.marshalled.set(obj, ret);
          meta.objs[ostr] = ret;
        } else {
          ret = {obj, ostr, vobj:undefined, marshalled:false};
        }
      }
      return ret;
    }
  }
  const ksp_hdlr = {
    get(tgt, prop, self){
      assert(tgt.proxy === self)
      // vkey: key, toPrimitive: 
      if(prop === Symbol.toPrimitive){
        return self.toString();
      }
      if(prop === 'vobj') {
        return methods._marshall(self).vobj;
      }
      if(prop === 'tgt')
        return tgt;
      let method = methods[prop];
      if(method)
        return method.bind(null, self);
      let key = tgt.cls.keys[prop]
      if(key){
        return setkey(self, key, null);
      }
      if(tgt.design){
        return clsAddKey(self, prop);
      }
      else{
        if(!tgt.cur){
          return tgt.cls.props[prop];
        }
        else
          assert(false);
      }
    },
    apply(tgt,self,args){
      assert(tgt.cur);
      assert(args.length === 1);
      assert(args[0] !== undefined);
      if(tgt.cls.marshalled.get(tgt.obj)) {
        tgt.obj = {...tgt.obj}; // unmarshall this...
        if(tgt.cur){
          tgt.cur = tgt.obj[tgt.cur.key.name]
        }
      }
      tgt.cur.value = args[0];
      return tgt.proxy;
    },
    set(tgt, prop, val, self){
      if(prop in tgt.cls.keys)
        self[prop].vkeyPerform('set', val);
      else
        tgt.cls.props[prop] = val;
      return true;
    }
  }
  let tgt = Object.assign(function(){}, 
    {cls:new ksp.cls(), obj:{}, cur:undefined});
  let ret = new Proxy(tgt, ksp_hdlr);
  tgt.proxy = ret;
  ret.clsAddSpec(spec);
  return ret;
}
ksp.Any = "_ANY_"
ksp.Specific = "_SPECIFIC_"
ksp.Specified = "_1_"
ksp.meta_tostr = function(meta){
  return JSON.stringify(meta, (key, val)=>{
    if(!key)
      return val;
    else
      return val.value;});
}
ksp.cls = class cls{
  constructor(){
    this.keys = {}; // name -> prev -> prev -> ..., Object
    this.tmps = {};
    this.verbs = {set(pxy, verb, ov, nv){assert(ov === undefined);return nv;}};
    this.props = {};
    this.strobj = {};
    this.marshalled = new Map(); // from obj to {obj, ostr, vkv}
    this.meta = {};
  }
  emplacePath(path){
    let [parent, name] = splitOnLast(path, ".");
    if(!name) {
      name = parent;
      parent = undefined;
    }
    let key = this.keys[name];
    if(key){
      assert(key.path === path);
    }
    else {
      key = new ksp.key({cls:this, parent, idx: this.length, name, path, default_value:undefined, keys:{}});
      if(parent){
        parent = this.emplacePath(parent);
        parent.keys[name] = key;
        key.parent = parent;
      }
      this.keys[name] = key;
    }
    return key;
  }
  emplaceMeta(meta){
    let metastr = ksp.meta_tostr(meta);
    let ret = this.meta[metastr];
    if(!ret) {
      ret = Object.assign(new ksp.metaobj(), {meta, metastr, objs:{}});
      this.meta[metastr] = ret;
    }
    return ret;
  }
  getKey(name){return this.keys[name]}
  get length(){return Object.keys(this.keys).length;}
}
ksp.key = class key{
  constructor(...spec){Object.assign(this, ...spec)}
  setSpec(spec){
    if(spec.type === "options" || spec.type === "dynamicKey") {
      this.type = spec.type;
      this.default_value = spec.default_value;
      spec.options.forEach(optname=>{
        let default_value = ksp.Specified;
        let child = this.addChild(optname);
        child.default_value = default_value;
      });
    } else {
      assert(false);
    }
  }
  hassub(keyb){
    for(let iter = keyb.parent; iter?.idx >= this.idx; iter = iter.parent){
      if(iter.idx == this.idx) {
        assert(iter === this);
        return true;
      }
    }
    return false;
  }
  addChild(childPath){
    return this.cls.emplacePath(`${this.path}.${childPath}`);
  }
  isLeaf(){
    return (this.type !== "dynamicKey") &&
      (Object.entries(this.keys).length === 0)
  }
  getKey(name){return this.keys[name]}
}
ksp.options = function options(...args){
  return {type:"options", default_value: ksp.Any, options:[...args]}
}
ksp.dynamicKey = function dynamicKey(...args){
  return {type:"dynamicKey", default_value: ksp.Any, options:[...args]}
}
ksp.objval_explicit = function(obj){
  if(!obj.explicit){
    obj.explicit = obj.key.cls.tmps[obj.key.name];
  }
}

ksp.metaobj = class metaobj{}
ksp.meta_rel = function meta_rel(a, b){
  let ret = {
    a_complies_to_b:'match', b_complies_to_a:'match',
    details:{...a, ...b}, conditions:{}}
  
  for(let key in ret.details) {
    let enta = a[key], entb = b[key];
    let result = {key:enta?.key ?? entb.key, enta, entb};
    ret.details[key] = result;
    if(enta && entb) {
      if(enta.value === ksp.Any && entb.value === ksp.Any) {
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
ksp.meta_match = function meta_match(meta, to_match){
  // todo: performance improvement.
  let ret = [];
  Object.values(meta.objs).forEach(obj=>{
    if(objMatch(obj.obj, to_match, (key, src, test)=>
      src?.value === test?.value)) {
      ret.push(obj);
    }})
  return ret;
}
ksp.query = function query(self, cb) {
  let tgt = self.tgt, cls=tgt.cls, obj=tgt.obj;
  let objmeta = ksp.obj_meta(obj);
  let result = [];
  let add_entry = (meta, obj)=>{
    assert(meta === obj.meta);
    let entry = {meta:meta, obj};
    if(cb) entry = cb(entry);
    if(entry)result.push(cb);
  }
  Object.values(cls.meta).forEach(meta=>{
    let meta_rel = ksp.meta_rel(meta.meta, objmeta);
    if(meta_rel.b_complies_to_a === 'match'){
      Object.values(meta.objs).forEach(obj=>add_entry(meta, obj));
    } else if(meta_rel.b_complies_to_a === 'conditional'){
      let to_match = {};
      for(let condkey in meta_rel.conditions){
        to_match[condkey] = obj[condkey];
      }
      let list = ksp.meta_match(meta, to_match);
      list.forEach(obj=>add_entry(meta, obj))
    } else {
      //console.log("not matching: " + meta.metastr)
      //console.log("to: " + ksp.meta_tostr(objmeta))
    }
  })
  return result;
}

// values: dontcare, specified_any, specified_specific, specified_query
// subset: specified one...
// x: unspecified.
// specified not.
// buildtype: specified...
// 

let bs = ksp({
  "arch": ksp.options("x64"),
  "buildtype": ksp.options("release", "debug"),
  "compiler": ksp.options("clang", "gcc", "msvc"),
  "target": ksp.dynamicKey(),
  "src": ksp.dynamicKey(),
//  "target.targetHasCpp": ksp.findany("target.src", ),
  "compilelink": ksp.options("compile", "link"),
  "compilelink.compile": ksp.options("c", "cpp"),
  // option, directory?
});

bs.outdir = "/home/namespace"
bs.clang = {cc:"cc", cxx:"clang-10", ld:"clang-10"},
bs.compilelink = {flags:["-pthread", "-fPIC"]} // will pull only if buildstage is specified.
bs.compile    = {flags:["-I/usr/local/include", "-I/usr/include"]}
bs.c = {flags:["-std=c17"]}
bs.cpp = {flags:["-std=c++2a"]}
bs.debug.compile = {flags:[`-DDEBUG -g -O0`]}
bs.debug.link = {flags:[`-L${bs.outdir}/debug`]}
bs.release.compile = {flags:[`-Os`]}
bs.release = {flags:[`-L${bs.outdir}/release`]}

// Bugged...
bs.target('world').debug.compilelink = {flags:["-World"]}
bs.target('hello').debug.compilelink = {flags:["-Hello"]}
bs.target('hello').src('helloworld.c').debug.compilelink = {flags:["-helloworld.c"]}
bs.target('hello').src('ahelloworld.c').debug.compilelink = {flags:["-ahelloworld.c"]}

console.log("objs---")
for(let x in bs.tgt.cls.strobj) console.log(x);
console.log("meta---")
for(let x in bs.tgt.cls.meta) console.log(x);
console.log("helloworld.c---")
ksp.query(bs.target('hello').src("helloworld.c").debug.link, function(entry){
  console.log(JSON.stringify(entry.obj.vobj));
  return entry;
  // target applies to target*, file applies to file*, target & file applies to targetAnyfileAny.
  // one-rule: traverse x, x.base; two-rules: can use index; three-rules: 
  // x -> x.specified; y -> y.specified; z -> z.specified.
})
assert(false);

// applies to {stage:compile, target:x, file:y, project:x, filetype:c}: x: bs.global.compile.flags[xyz]
