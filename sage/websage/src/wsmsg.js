const { olen, mkprop, assert, isArray } = require('./utils.js');
const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function GProtoBuf(){
  let {EncMsgPack} = require("./encmsg_pb.js");
  let {EncArr, EncMsg, EncVal} = EncMsgPack;
  function MkVal(vtype, vidx) {
    let val = new EncVal;
    val.setVtype(vtype);
    val.setVidx(vidx);
    return val;
  }
  function MkArr(elems){
    let val = new EncArr;
    val.setValsList(elems);
    return val;
  }
  function MkMsg(lid, arr){
    let val = new EncMsg;
    val.setLid(lid);
    val.setArr(arr);
    return val;
  }
  function MkMsgPack({collections, starts}){
    let mp = new EncMsgPack;
    Object.entries(collections).forEach(([k, v])=>{
      let camelName = capitalize(k);
      let setListName = 'set' + camelName + 'List';
      let setStartName = 'setStart' + camelName;
      if(!isArray(v)){
        v = Object.entries(v);
      }
      v = v.slice(starts[k])
      if(k === 'msgs') {
        v = v.map(msg => MkMsg(msg.lid, msg.arr));;
      } else if(k === 'arrs') {
        v = v.map(arr=>MkArr(arr[1].map(elem=>MkVal(elem.vtype, elem.vidx))));
      } else {
        v = v.map(elem=>elem[1]?.val ?? elem[0]);
      }
      mp[setListName](v);
      mp[setStartName](starts[k]);
    })
    /*
    val.setMsgsList(lids.slice(start_msgs))
    val.setArrsList(arrs.slice(start_arrs))
    val.setStrsList(strs.slice(start_strs))
    val.setIntsList(ints.slice(start_ints))
    val.setNumsList(nums.slice(start_nums))
    val.setBytsList(byts.slice(start_byts))*/
    return mp;
  }
  function Decode(bin){
    let decoded = EncMsgPack.deserializeBinary(bin).toObject();
    let msgOut = {collections:{},starts:{}};
    Object.entries(decoded).forEach(([key, vals])=>{
      if(key.endsWith('List')) {
        key = key.slice(0, -4);
        if(vals[0]?.valsList){
          vals = vals.map(val=>Object.freeze(val.valsList.map(elem=>Object.freeze(elem))));
        }
        msgOut.collections[key] = vals;
      }
      else if(key.startsWith('start')){
        key = key.slice(5).toLowerCase();
        msgOut.starts[key] = vals;
      }
    })
    return msgOut;
  }
  return {Decode, MkVal, MkArr, MkMsg, MkMsgPack};
}
const {Decode, MkMsgPack} = GProtoBuf();

const VT = {
  VT_UNDEFINED:{},
  VT_MSG:{},
  VT_ARR:{vtype:2 ,field:"arrs"},
  VT_STR:{vtype:3 ,field:"strs"},
  VT_I32:{vtype:4 ,field:"i32s"},
  VT_DBL:{vtype:5 ,field:"dbls"},
  VT_BYT:{vtype:6 ,field:"byts"},
  lidref:{vtype:7 ,field:"i32s", typed:true},
  cmdint:{vtype:8 ,field:"i32s", typed:true},
  cmdstr:{vtype:9 ,field:"strs", typed:true},
  fromVtype(vtype){
    let ret = Object.entries(this).find(([k, v])=>v.vtype === vtype)
    assert(ret);
    return ret;
  }
};

class Msg {
  // Id.Key
  constructor(lid, data=[]){
    this.lid = lid; this.data = data;
  }
  SendVia(sender){
    sender.sendMsg(this);
  }
}

// byts not tested.
class IncrSerializer{
  constructor(){
    this.collections = {msgs:[],arrs:{},strs:{},dbls:{},i32s:{},byts:{}};
    this.starts = {msgs:0,arrs:0,strs:0,dbls:0,i32s:0,byts:0}
  }
  vacuum(){
  }
  encode_msg(lid, arr){
    let msg = {lid, arr:this.ArrIdx(arr).vidx};
    this.collections.msgs.push(msg);
  }
  ArrIdx(arr){
    let encarr = arr.map(elem=>this.ElemIdx(elem));
    let vals = this.collections.arrs;
    assert(isArray(encarr))
    let str = JSON.stringify(encarr);
    let val = mkprop(vals, str, ()=>{
      encarr.vidx = olen(vals);
      return encarr;
    })
    return Object.freeze({vtype:VT.VT_ARR.vtype, vidx:val.vidx});
    // MkVal(VT.VT_ARR.vtype, val.uidx);
  }
  VtIdx(vt, val){
    let vals = this.collections[VT[vt].field];
    let key = String(val);
    if(key === val){
      return Object.freeze({vtype:VT[vt].vtype, vidx:mkprop(vals, String(val), ()=>olen(vals))});
    } else {
      return Object.freeze({vtype:VT[vt].vtype, vidx:mkprop(vals, String(val), 
        ()=>Object.freeze({val, vidx:olen(vals)})).vidx});
    }
  }
  ElemIdx(elem){
    let enc;
    if(typeof elem ==='string'){
      enc = this.VtIdx('VT_STR', elem);
    } else if(typeof elem === 'number'){
      let vt = Number.isInteger(elem)?'VT_I32':'VT_DBL';
      enc = this.VtIdx(vt, elem);
    } else if(isArray(elem)){
      enc = this.ArrIdx(elem);
    } else if(elem.vtype){
      enc = this.VtIdx(elem.vtype, elem.val);
    } else {
      assert(false);
    }
    return enc;
  }
  Serialize(){
    let msg = MkMsgPack(this);
    return msg.serializeBinary();
  }
  UptoDate(){
    Object.entries(this.collections).forEach(([key, vals])=>{
      this.starts[key] =  olen(vals);
    })
  }
  IdxArr(idx){
    let arr = Object.values(this.collections.arrs)[idx].map(elm=>this.IdxElem(elm));
    return arr;
  }
  IdxElem(elm){
    let [vtype, vt] = VT.fromVtype(elm.vtype);
    if(vtype === 'VT_ARR')
      return this.IdxArr(elm.vidx);
    let vals = Object.entries(this.collections[vt.field]);
    let val = vals[elm.vidx][1]?.val ?? vals[elm.vidx][0];
    let ret = vt.typed ? {vtype, val}:val;
    return ret;
  }
  Decode(data){
    let decoded = Decode(data);
    for(let key in this.collections){
      assert(this.starts[key] === decoded.starts[key]);
      let tgt = this.collections[key];
      let inc = decoded.collections[key];
      let size = olen(tgt) + olen(inc);
      if(isArray(tgt)) {
        tgt.push(...inc);
      } else {
        if(key === 'arrs'){
          inc.forEach(elem=>{tgt[JSON.stringify(elem)] = elem});
        } else {
          inc.forEach(elem=>{
            let key = String(elem); 
            if(key !== elem){
              tgt[key] = Object.freeze({val:elem, vidx:olen(tgt)});
            } else {
              tgt[key] = olen(tgt);
            }
          })
        }
      }
      assert(olen(tgt) === size);
    }

    let msgs = this.collections.msgs.slice(this.starts.msgs).map(entry=>
      new Msg(entry.lid, this.IdxArr(entry.arr))
    )
    this.UptoDate();
    // incorporate msg... reverse process.

    return msgs;
  }
}

class WsSender{
  constructor(uri){
    this.uri = uri;
    this.serializer = new IncrSerializer;
    this.pendingMsgs = [];
  }
  sendMsg(msg){
    this.serializer.encode_msg(msg.lid, msg.data);
    this.pendingMsgs.push(this.serializer.Serialize());
    this.serializer.UptoDate();
    // todo: async send.
  }
};

function CreateWebSocket(wsuri, onOpen){
  const socket = new WebSocket('ws://localhost:8080');
  let wsctx = {socket, send, onReceive};
  socket.addEventListener('open', onOpen);
  socket.addEventListener('message', function(event) {
    event.data();
  })
}


function test(){
  let msg = new Msg(1, ["hello", "world", "hello", 33, 0.4, ["not so", {vtype:'lidref', val:123}], [{vtype:'lidref', val:123}]])
  let sender = new WsSender()
  msg.SendVia(sender);
  let data = sender.pendingMsgs[0];
  let receiver = new IncrSerializer();
  let rcmd = receiver.Decode(data);
}
test();
module.exports = {CreateWebSocket}