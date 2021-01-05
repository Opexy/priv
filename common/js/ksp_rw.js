const { tokenize } = require('esprima');
const { isFunction } = require('util');

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
let gg = globalThis;
gg.esprima = require('esprima');
let utils = require('./utils.js');
let {assert,isArray,isString,isObject,
  sizeof,mapval,mapinit,now,forEach,Pathflow, opflow, mkcls} = utils;

// Let's don't worry about running... running may involve c code.
// Ns0 -- Name -> Class, Method, System, Role

function Ksp(){
  let objs = {};
  const {mkobj, mkrel} = {
    mkobj(obj = {}){
      assert(!obj.id); 
      obj.id = ngsid; 
      Object.defineProperty(obj, "self", {get(){return obj.aliasTo ?? obj}})
      objs[obj.id] = obj;
      return obj;
    },
    mkrel(spec){
      return {spec, ustr:"{" + Object.entries(spec).map(([key, val])=>
        (val?.self?.id) ?
          `${key}.self.id:${val.self.id}`:
          `${key}:${val}`).join(', ') + '}'};
    }
  };
  let Rels = {
    // Parent Name extent
    Pne(parent, name) {
      assert(parent.self.id);
      return mkrel({reltype:"Pne", parent, name});
    },
    FieldAliasType(field, aliastype) {
      let ret = mkrel({reltype:"FieldAlias", field, aliastype})
      return ret;
    }
  }
  let Rel = {
    Rels, 
    Emplace(relation){
      let ret = Rel.Find(relation);
      if(!ret) {
        ret = Rel.Create(relation);
      }
      return ret;
    },

    Create(relation, aliasTo = relation.aliasTo){
      let ret = mkobj(relation);
      ret.aliasTo = aliasTo??mkobj({heads:{[relation.ustr]:relation}, tails:{}});
      for(let [pin, obj] of Object.entries(relation.spec)){
        let tails = obj?.self?.tails;
        if(tails)tails[relation.ustr] = ret;
      }
      relations[relation.ustr] = ret;
      return ret;
    },
    Find(relation){
      if(relation.ustr) return relations[relation.ustr];
      else assert(false);
    },
    ParentsOf(relation, parents = {}){
      Object.values(relation.heads).forEach(pne=>{
        if(pne.spec.type === "Pne"){
          parents[pne.spec.parent.id] = pne.spec.parent;
        }})
      return parents;
    },
    FindRelName(parents, name){
      let parents = {...parents}, results = {}; 
      let idx = 0;
      let list = undefined;
      for(let idx = 0; idx < (list = Object.keys(parents)).length; idx++){
        let parent = list[idx];
        let result = Rel.Find(Rels.Pne(parent, name));
        if(result) 
          results[result.id] = result;
        Object.assign(parents, ParentsOf(list[idx]));
      }
      return results;
    }
  };
  function mkPnePath(path){
    if(path.length === 1) return path[0];
    let [parent, name] = path;
    assert(parent.id);
    assert(isString(name));
    let ret = Rel.Emplace(Rels.Pne(parent, name));
    if(path.length > 2) {
      return mkPnePath([ret, ...path.splice(2)])
    } else {
      return ret;
    }
  }
  // A relation: 
  //DefineRelation({type:"Relname", parent:"object", name:"str"})
 
  const relations = {};
  function pnedef(ksp, type, opts){
    let ret = mkksp(mkPnePath(ksp.tgt.path)), {self} = ret;
    self.type = type;
    opts.forEach(cb=>{
      if(isFunction(cb)) cb(ret);
      else if(isObject(cb)) Object.assign(self, cb);
    })
    return self;
  }
  const staticMethods = {
    Class(ksp, ...opts){
      let kspClass = pnedef(ksp, "Class", opts);// do classes have to be root?
      return kspClass;
    },
    Field(ksp, ...opts){
      let field = pnedef(ksp, "Field", opts);
      return field;
    },
    KeyField(pne, ...opts){
      let field = Field(pne, {isKey:true}, ...opts);
      return field;
    },
    RelField(pne, ...opts) {
      let field = Field(pne, ...opts);
      let aliastype = field.self?.aliastype;
      if(!aliastype){
        let aliastypes = Rel.FindRelName(field, name);
        delete aliastypes[field.id];
        delete aliastypes[field.self.id];
        let aliastype = Object.values(aliastypes)[0];
        if(!aliastype) {
          // create something associated with root? TODO: wait until all to resolve.
          let aliastype = Rel.Emplace(Rels.Pne(ksproot, name));
        }
      }
      Rel.Emplace(Rels.FieldAliasType(field, aliastype));
    }
  }
  const {Class, Field, KeyField, RelField} = staticMethods;
  function onGet(tgt, prop){
    if(!isString(prop)){return;}
    let ret = staticMethods[prop];
    if(ret) return ret;
    if(prop ==='self') return tgt.path[0].self;
    let {prepath, path} = tgt, ksp = path[0];
    let ntgt = new Pathflow(tgt.hdlr).tgt;
    path = [...path, prop];
    if(path.length === 1){
      let rel = Rel.Find(Rel.Pne(ksp, prop));
      if(rel) {
        prepath = [...(prepath ?? []), rel];
        path = [rel];
      }
    }
    Object.assign(ntgt, {prepath, path});
    return ntgt.proxy;
  }
  function mkksp(relation) {
    assert(relation.self.id);
    let ret = new Pathflow({onGet});
    ret.tgt.path = [relation];
    return ret;
  }
  var ksproot = mkobj({relations});
  return mkksp(ksproot);
}

function unittest(){
  let ksp = Ksp(), kspobj = ksp.self;
  let {Class, KeyField, RelField} = ksp;
  Class(ksp.Target, (Target)=>{
    KeyField(Target.TargetName, {options:["string", "notnull"]})
    RelField(Target.TargetSrc, "1.Many")
  });
  Class(ksp.TargetSrc, (TargetSrc)=>{
    KeyField(TargetSrc.FsPath);
    Relation(TargetSrc.Target);
  })
  
  

  console.log(Object.keys(kspobj.relations).join("\n"));
}
if (require.main === module) {
  unittest();
}



globalThis.module_ksp = {Ksp};
return globalThis.module_ksp}))