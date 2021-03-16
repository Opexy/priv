import { assert, assign } from "./utils.js";
import {isSafeInteger, isArray} from 'lodash';

export function _SagenRuntimeProto(sr={}){
const priv = mkprop(sr, 'priv', {});

const id_objs = priv.id_objs = [];
priv.mkid_next = 0;
const mkId = sr.mkId = function(proto, obj){
  let mkid = obj.mkid;
  if(mkid === undefined){
    mkid = priv.mkid_next;
    obj.mkid = mkid;
  } else {
    assert(isSafeInteger(mkid));
    assert(id_objs[mkid] === undefined);
  }
  id_objs[mkid] = obj;
  priv.mkid_next = Max(mkid + 1, priv.mkid_next);
  return obj;
}
const SrObj = {}

const SrDyn = mkId([SrObj, {name:"dynamic",
  set(prop, data) {return this.proto.setObjKeyData(this, prop, data)},
  get(prop) {return this.proto.getObjKeyData(this, prop)},
  vcall(verb, ...args) {return this.proto.vcallObj(this, verb, ...args)},
  mkInst(props){return prop.mkInst(data)},
  
}]);
const SrClass = mkId([SrStatic], {mkid:undefined, name:"class", mkClass()});

sr.mkClass = function({name}){
  mkId([SrClass], )
}

return sr;
}
