// LSO: Local Synchronous Object
// RSO: Remote Synchronous Object

let assert = console.assert;
let _sys = {};
class Lsys{
  constructor(sysName){
    if(_sys[sysName]) return _sys[sysName];
    this.sysName = sysName;
    this.lsot = [undefined];
    this.remoteSystems = {[sysName]:{rsot:this.lsot}};
    _sys[sysName] = this;
  }
  lso(){
    let lid = this.sot.length - 1;
    let ret = this.sot[lid] = {lid, sys:this};
    return ret;
  }
  /**
   * Remote System Object
   * @param {*} sysName -- the name of the system 
   * @param {*} rid -- the id from the remote system.
   * @param {*} lid -- the local id that was associated with the remote id.
   */
  rso(sysName, rid, lid){
    let rsys = this.remoteSystems[sysName];
    if(!rsys){
      rsys = this.remoteSystems[sysName] = {rsot:[]};
    }
    let ret = rsys.rsot[rid];
    if(!ret){
      if(lid)
        ret = this.lsot[lid];
      else
        ret = this.lso();
      rsys.rsot[rid] = ret;
    }
    return ret;
  }
  msgSend(rcvr, msg){
    if(isString(rcvr))rcvr = _sys[rcvr];
    assert(rcvr);
    let imsg = {sndr:this.sysName, rcvr:rcvr.sysName, msg};
    rcvr.msgRecv(imsg);
  }
  msgRecv(msg){
    this.msgs.push(msg);
    if(!this.msgProc) {
      this.msgProc = new Promise(()=>{
        let msgs = this.msgs;
        this.msgs.clear();
        this.msgProc = null;
        msgs.forEach(imsg=>{
          imsg.sndr = _sys[imsg.sndr];
          imsg.rcvr = _sys[imsg.rcvr];
          using({lsys:this}, ()=>imsg.proc(imsg))
        })
      })
    }
  }
  mkview(init, spec){
  }
}

function mklsys(sysName, idx){
  return new Lsys(sysName+ (idx??""));
}

let {pathflow} = utils;


// TODO:
// Query Binary
// Mpak::= eMpak MpakSize8 MpakHash16 MpakElement+
// MpakElem::= MpakElemStr | MpakElemBlob | MpakElemNumber | MpakElemIndirect | MpakCtxtIndirect | MpakList

// Generic Queries:
// (CmdString, CmdArgs+)+
// CmdString: FindNameInto(Name,target,{sysid, lid}=target) -- Find Name from parent scope

// Hierarchical Dimension
// hde (hierarchical dimensional extension) trigger: msg: (type=table, containsmsg=true), (), then ...
// table, name;
// query(tables, columns, condition, group, sort)...list
// exec(params, subflows, outputs) -- params can be overriden, subflows can be added, outputs can be specified (for pulling)


let msgs = {};
msgs.EmplName = {
  fields:{
    parent:(prop)=>prop.parent.lid,
    name:(prop)=>prop.propName,
    prop:(prop)=>prop.lid
  },
  proc(imsg){
    let {sndr, rcvr, msg} = imsg;
    let {parent:rid_parent, name, prop:rid_prop} = msg;
    let parent = rcvr.rso(msg.parent);
    let prop = rcvr.rso(msg.prop);
    objset(parent, ["names", msg.propName], prop); 
    // how can we provide asynchronous update to another?
  }
}

msgs.emplace = {
  
}


function msg(cmd, args){
  return {cmd, args};
}
function send(sender, receiver, msg){
  sender.msgSend(receiver, msg);
}

function mkschema(){
  let schema = {sctypes:{}, nes:{}, path:[]};
  let NeoHandler = {onGet:NeoOnGet, onSet:NeoOnSet};
  schema = pathflow(NeoHandler, schema);
  let NeoApis = {mkne}
  function NeoOnGet(tgt, prop, recv){
    if(prop === toString) {
      assert(false);
      return;
    }
    let ret;
    ret = tgt[prop]; if(ret) return ret;
    ret = NeoApis[prop]; if(ret) return ret.bind(null, tgt);
    let ntgt = mkne(tgt, prop);
    assert(ntgt);
    ret = ntgt.proxy;
    return ret;
  };
  function NeoOnSet(tgt, prop, val, recv){
    assert(false);
  }
  function mkarray(...args){}
  function mkne(tgt, prop, {init}={}){
    let ntgt = tgt.nes[prop];
    if(!ntgt){
      let ne = undefined;
      [schema.nes].flat().find(nes=>ne = nes[prop]);
      if(init || ne){
        ntgt = pathflow(NeoHandler);
        Object.assign(ntgt, {name:prop, nes:{}, isGlobal:false});
        ntgt.path = [...tgt.path, prop];
        if(typeof init === 'function')
          init(ntgt);
        else
          Object.assign(ntgt, init);
        tgt.nes[prop] = ntgt;
      } else {
        assert(false);
      }
    }
    return ntgt;
  }
  function mknes(tgt, init){
    if(typeof init === 'function')
      return new Proxy(tgt, {get(tgt, prop){return tgt.proxy.mkne(prop, {init}).proxy}})
    else if(init.init)
      return new Proxy(tgt, {get(tgt, prop){return tgt.proxy.mkne(prop, init).proxy}});
    else
      assert(false);
  }
  schema.mknes = mknes.bind(null, schema, {init:{isGlobal:true}});
  return schema.proxy;
}
function mkjsrole(role, instname){
  return role.mkinst(instname);
}
function unittest(){
  let schema = mkschema();
  let {client, server, backend,
       table, name, column, columns, row, rows, create} = schema.mknes();
  let {} = schema.commands;

  
  schema.ingest([
    [MODEL, table, 
      [FIELD, table.name, STRING],
      [FIELD, table.columns, ELEM_MODEL, table.column],
      [FIELD, table.rows, ELEM_MODEL, table.row]],
    [REPROC, client.table.create, API,
      [INIT, table.name, FROM_PARAM],
      [SYNC, table, WITH, server]],
  ]);
  schema.compile();

  



  
  // 3 modes: 
  //   1. {books:{price, stars, otherbooks:{}}} -- graphql
  //   2. create(model:table, tableName:"hello").createColumn(model:tableId, ...)

  /*
  let schema = {};
  schema.roles = {client:{}, clientPeers:{}, server:{}, backend:{}}
  let client1 = mklsys("client", 1);
  let client2 = mklsys("client", 2);
  let server = mklsys("server");
  let backend = mklsys("backend");
  // Create Table
  let table = mkModel({
    client:role(), server:role(), storage:role()
  });
  function clientCreateTable(client, tableName){
    mkviews(Table, {ui:{}, server:{}}, {init:{
      tableName:"customer", 
      tableColumns:{fname:{}, phone:{}, email:{}}, // default merge
      tableRows:[
        {fname:"john", phone:"123-456-7890", email:"john@com"}, 
        {fname:"mi", phone:"111-111-1111", email:"mi@com"}]
      }})
    
    let table = client.lso();
    let tableColumns = client.lso();
    let tableRows = client.lso();
    client.msgSend(server, msg("emplace", {
      cls:"Table", name:tableName, lso:table, children:[
        {name:"columns", lso:tableColumns},
        {name:"rows", lso:tableRows}]}));
    return {table, tableColumns, tableRows};
  }

  function addColumn({table, tableColumns}, columnName) {
    let client = table.sys; 
    client.msgSend(server, msg("emplace", {
      rso: columnName, 
    }))
  }

  let client1Table = clientCreateTable(client1, "unnamed");
  let client2Table = clientCreateTable(client2, "unnamed");

  
  
  
  
*/
}
unittest();

export {mkschema};
