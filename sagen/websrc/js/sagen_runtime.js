import {require} from './loader.js';
import './lodash.js';
const _ = require('./lodash.js');
import {Interface, assign, defget, assert, mkprop, emplr} from './utils.js';

// Runtime Contextual Stack

export function SagenRuntime (){
  _SagenRuntimeProto();

let defs = {
  get actors(){return emplr(sr, (obj, prop)=>
    ({type:'actor', name:prop, scope:defs.scopeStack}))
  },
  get verbs(){return emplr(sr, (obj, prop)=>
    ({type:'verb', name:prop, scope:defs.scopeStack}))
  },
  get classes(){return emplr(sr, (obj, prop)=>
    ({type:'class', name:prop, scope:defs.scopeStack}))
  },
  scopeStack:[],
  using(sc, desc){
    let ret = {
      def(desc){
        defs.scopeStack.push(sc);
        if(typeof desc === 'function'){
          desc();
        } else {
          procDesc(desc);
        }
        defs.scopeStack.pop(sc);
      },
      procDesc(desc){
        for(lef [key, val] of Object.entries(desc)){
          assert(false);
        }
      }
    }
    ret.def(desc);
    return ret;
  }
}

const mkClass = mkScope;
const mkSingleton = mkScope;
const mkActor = mkScope;
const mkVerb = mkScope;
function mkScope(){return {}};

// Runtime Contextual Scope
const sr = {SrObj, SrParty, defs, mkClass, mkSingleton, mkVerb, mkActor};
return sr;
// nary: 1, any, many
// collateFtn,
// refs
// getRelation()
// Relation: Class, Name, Party Names (end points)

// define function chain.
let nextPartyObjectId = 1;
function SrObj(){
  this.poid = nextPartyObjectId++;
}
SrObj.prototype.getObjParty = function(party){
  return party.getObjParty(this);
}

function SrParty(relation, def){
  this.relation = relation;
  this.name = def.name;
}
SrParty.emplaceObjParty = function(obj){
  let allParties = mkprop(obj, 'parties', ()=>new Map());
  return mkprop(allParties, this, ()=>new Map());
}
SrParty.prototype.getObjParty = function(party){
  return obj.parties?.get(this);
}
SrParty.prototype.attachObjToRel = function(obj, rel){
  let objParty = this.emplaceObjParty(obj);
  let relParty = this.emplaceObjParty(rel);
  assert(false);
  objParty.set(this, rel);
  relParty.set(this, obj);
}

sr.SrNode = class SrNode{
  get relations(){}
  //set relations(){}

  getRelations(){}
  getRelation(name){return }
  getParent(){getRelation({});}
  setParent(parent){}
  get parent(){return this.getParent();}
  set parent(p){this.setParent(p)}
};
sr.mkNode = function(item){
}

class SrRelModelParty {
  constructor(def){
    this.name = def.name;
  }
};

SrRelModelParty.getRelsFromObjParty = function(obj, party){
  return sr.relsByObj(obj).get(party);
}

sr.relsByObj = new Map();


class SrRelModel {
  constructor(def){
    this.name = def.name;
    this.parties = [];
    this.partiesByName = {};
    this.keyParties = [];
    // metamodel? = exec, hier, ...
    for(let pdef of def.parties) {
      let party = pdef;
      this.keyParties.push(party);
      if(party.name) mkprop(this.partiesByName, party.name, party);
    }
  }
}

// Severing
// We want the next relation to inherit previous relation.

SrRelModel.prototype.getEntryPartiesKeyArr = function(entryParties, data){
  let keyArr = [this.name];
  for(let keyParty of def.keyParties) {
    let entryParty = entryParties[keyParty.idx];
    if(entryParty?.roles?.get?.(this)) {
      // TODO: if a object is designated to a party in this relation model,
      // use the designation.
      // Data is ordered...
      assert(false);
    }
    let ftn = entryParty?.relModelGetKeyElem ?? data?.relModelGetKeyElem ?? 
      keyParty?.relModelGetKeyElem ?? this.relModelGetKeyElem;
    keyArr.push(ftn.call(this, entryParty, keyParty.idx, entryParties, data));
  }
  return keyArr;
}

SrRelModel.prototype.getEntryPartiesKeyStr = function(entryParties, data){
  let arr = this.getEntryPartiesKeyArr(entryParties, data).join('#');
  return arr;
}
SrRelModel.prototype.relModelGetKeyElem = function(entryParty, entryPartyIdx, entryParties, data) {
  if(typeof entryParty === 'string' || typeof entryParty === 'number') {
    return entryParty;
  } else if(typeof entryParty === 'object') {
    return entryParty.rpstr ?? entryParty.rpoid ?? assert(false);//sr.mkEntryParty(entryParty);
  } else {
    assert(false);
  }
}

// Combined logic ordering... query

// relation can chain (from relation of the parent we go to relation of child)
// for example graph has a node relation and an edge relation.
// graph.addrel({node:y}), ...
// graph.addrel({edge:{nodeFrom:x, nodeTo:y}}) // no-enforcements as enforcements will be leading to CRUD.
// if there is a relation name "edge"

/*
sr.relModelHier = sr.mkRelModel({
  name:"hierarchy", 
  parties:[{
    name:"parent",
    lookupName:"parent",
    tier:"source",
    nary:"one",
    keytier:'', // assume the relation is fanned out. this key is used in what tier.
    roles:["lookupTarget"], // other parties should store this
  
  // storage: "local", // or "managed", or "persistent", or ...
  }, {
    name:"child",
    lookupName:"children",
    tier:"target",
    nary:"many",
    uniqueness:"repeated", // noneUnique -- test for nothing, objUnique -- test for object, keyUnique, or function, InstanceUnique.
  }],
  tiers:[{
    name:"source",
  },{
    name:"target",
  }],
  enforcements:[{
    chain: ["source", "target"],
    enforcement:"enforced"
  },{
    chain: ["target", "source"],
    enforcement:"enforced"
    // how do you execute the enforcements? will generate events to the related parties that uses the relation.
    // how and when to generate those events?
  }]
});
*/

class ActSpecElem{
  appliesTo(fsc){

  }
  // AnySuccessor
}
function applyElem(elem, fsc, act){
  if(elem.applyElem)
    return elem.applyElem(fsc,this);
  else {
    // verb, verbtgt, verbtgtobj;
    // verb {}
  }
}
class Act{
  constructor(spec, ftn){}
  applyTo(fsc){
    
    if(spec.type === 'all') {
      let toMatch = [];
      let result = 'matched';
      for(let elem of spec.elems) {
        let elemRes = elem.appliesTo(this, fsc);
        if('impossible' === elemRes){
          result = 'impossible';
          break;
        }
        else if('matched' !== elemRes){
          toMatch.push(elemRes);
        } else {
          toMatch.push(elemRes);
        }
      }
    } else {
      assert(false);
    }
  }
};

class FlowScope {
  constructor(parent, fsDesc){

  }
  addAct(act){
    // apply act to this
    act = act.applyTo(this);
    return act;
  }
  createScope(scopeDesc){
    let ret = new FlowScope(this, scopeDesc);
    for(let act of this.acts) {
      ret.addAct(act);
    }
  }
}
  return sr;
}