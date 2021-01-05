const {assert} = console;
const { isNumber, isString, isFunction, mkproto, mki, Pathflow, 
  mapinit, opatch, orevert, forEach, ngsid, refEquals} = utils;
let proto = {};
function eflow(){}
proto.Data = mkproto({
  constructor(){
    if(!this.lid)this.lid = ngsid; else assert(false);
    this.rels = [];
  },
  empl:dataEmpl,
  emplem:dataEmplem,
  xchg:dataXchg,
  removeAt:dataRemove
});
function dataEmpl(init, proto, obj = this) {
  let ret = obj[init?.rn];
  if(!ret) {
    init.rp = obj; // relation parent
    ret = mki(init, proto);
    if(ret.rn){
      obj[ret.rn] = ret;
      obj.rels.push(ret);
      ret.ridx = obj.rels.length;
      eflow({change:"Updated", obj, rn:ret.rn, ov:undefined, nv:ret});
    }
  }
  return ret;
}
function dataEmplem(init, proto, obj=this){
  let [[cname, einit]] = Object.entries(init);
  let collection = obj[cname];
  assert(collection);
  return collection.empl(init, proto);
}
// change position of a and b
function dataXchg(a, b, obj=this) {
  let oa = obj[a?.rn ?? a];
  let ob = obj[b?.rn ?? b];
  let idxa = oa.ridx, idxb = ob.ridx;
  obj.rels[idxa] = ob;
  obj.rels[idxb] = oa;
  ob.ridx = idxa;
  oa.ridx = idxb;
  eflow({change:"ChildPositionsUpdated", obj, positions:[
    {elem:oa, opos:idxa, npos:idxb},{elem:ob, opos:idxb, npos:idxa}]})
}
function dataRemove(child, obj=this){
}


proto.PDR = mkproto(proto.Data, {
  addTable:pdrAddTable
});
function pdrAddTable(tableName, pdr=this){
  pdr.empl({rn:tableName}, proto.Table);
}

proto.Table = mkproto(proto.Data, {
  constructor(table=this){
    table.empl({rn:"columns"}, proto.TableColumns),
    table.empl({rn:"rows"}, proto.TableRows)
  },
  addColumn:tableAddColumn
})
function tableAddColumns(defs, table=this){
  return table.columns.addColumn(coldef);
}
proto.TableColumns = mkproto(proto.Data, {
  addColumn:columnsAddColumns
});
function columnsAddColumns(defs, columns=this){
  let ret = {};
  forEach(defs, (coldef, colname)=>{
    ret[colname] = columns.empl({rn:colname, coldef}, proto.TableColumn)
  })
  return ret;
}
proto.TableColumn = mkproto(proto.Data, {
  get colName(){return this.rn;},
  get colPos(){return this.ridx;}
})


proto.TableRows = mkproto(proto.Data, {
  
})


function dataAttachHdom(hdomspec, de=this, {hdoms} = de){
  let hdomlist = hdoms[hdomspec];
  assert(!hdomlist);
  if(!hdomlist){
    hdomlist = hdoms[hdomspec] = 
      {spec:hdomspec, list:document.querySelector(hdomspec)};
  }
  let list = hdomlist.list;
  hdomlist.forEach(hdom=>{de.onAttachHdom(hdom)})
}
proto.DR = mkproto(Data, {
  constructor(dr=this){Object.assign(dr, {apps:{}})},
  createApp:dataRootCreateApp,
})
function dataRootCreateApp(app, dr=this){
  return dr.emplem({apps:app}, proto.App)
};

proto.App = mkproto(Data, {
  constructor(app=this){Object.assign(app, {forms:{}})},
  createForm:appCreateForm,
})
function appCreateForm(form, app=this){
  return app.emplem({forms:form}, proto.AppForm)
}

// Listener: Data Node, Listens For (On Event of Object): Add, Data Path, Generates: Item, Associativity:  Parent Dom[(Child) Data].
proto.AppForm = mkproto(Data, {
  constructor(form=this){Object.assign(form, {tables:{}})},
  onAttachHdomDIV(dom, form=this, {tables} = form){
    for(let table in tables) {
      table.onParentAttachHdomDIV(dom);
    }
  },
  onAddedElement(pathy) {
    
    for(let renderer of renderers){
      renderer.render(element);
    }
  }
})

function formCreateTable(table, form=this){
  return table.emplem({tables:table}, proto.AppFormTable)
}

proto.AppFormTable = mkproto(Data, {
  constructor(table=this){Object.assign(table, {columns:{}, rows:{}})},
  createColumn:tableCreateColumn,
  createRow:tableCreateRow,
})
function tableCreateColumn(column, table=this){
  table.emplem({columns:column}, proto.AppFormTableColumn)
}
function tableCreateRow(row, table=this){
  table.emplem({rows:row}, proto.AppFormTableRow)
}

proto.AppFormTableColumn = mkproto(Data, {
  constructor(column=this){}
})
proto.AppFormTableRow = mkproto(Data, {
  constructor(row=this){}
})

function mkpage(){
  let dr = mki({}, proto.DR);
  let table1 = dr.addTable("table1");
  let col1 = table.addColumn("col1");
  dr.addDisplayDriver(TablesDisplayer, "Tables")
}

mkpage();
let dr = mki({apps:{}}, proto.PDR);
let app = dr.createApp({id:"MyApp"});
let form = app.createForm({id:"MyForm"});
let table = form.createTable({id:"MyTable"});
let col1 = table.createColumn({id:"col1"});
let row1 = table.createRow({id:"row1", col1:"hello"});
form.attachDom()