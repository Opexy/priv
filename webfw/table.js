//import {mkschema} from "./wf_alt.js";
let {assert} = utils;
function pfl(){
  //{steps}
  function mkstep(){
    let step = {parent:this, steps:[], add_any, add_inline};
  }
  function add_anyelem(...items){
    return this.add_step({type:anyelem, elems:{}});
  }
  function add_step(stepdesc){
    let step = {parent:this, ...stepdesc};
    return step;
  }
}

(function unittest(){
  schema = pfl();
  let {MODEL, REPROC} = 
    schema.add_anyof("MODEL", "REPROC");
  MODEL.add_inline({elem:1, ftn(){}});
  let {FIELD} = 
    MODEL.add_anyof("FIELD");
  let {STRING, ELEM_MODEL} = MODEL.add_oneof("STRING", "ELEM_MODEL");
  ELEM_MODEL.add_inline({elem:1, ftn(){}})
  afl.ingest(()=>[[MODEL, table, 
    [FIELD, table.name, STRING],
    [FIELD, table.columns, ELEM_MODEL, table.column],
    [FIELD, table.rows, ELEM_MODEL, table.row]],
  [REPROC, client.table.create, API,
    [INIT, table.name, FROM_PARAM],
    [SYNC, table, WITH, server]],
  ]);

})()

/*
function decl(name, model, ...descs){
  return {name,model,descs};
}
function rootClass(name, ...descs){
  return decl(name, rootClass, ...descs);
}
rootClass.addToParentModel = function(ctxt, parentModel, me){
  me.parent = schema;
  objset(schema, ["rootClasses", me.name], me, {onConflict:"assert"});
  addAllChildren(ctxt, parentModel, me);
}
function addAllChildren(ctxt, parentModel, me){
  //ctxt.stack.push({me, method:addAllChildren});
  for(let desc of me.descs) {
    if(desc.model) {
      desc.model.addToParentModel(ctxt, me, desc);
    } else {
      assert(false);
    }
  }
  //ctxt.stack.pop();
}
function field(name, ...descs){
  return decl(name, field, ...descs);
}
field.addToParentModel = function(ctxt, parentModel, me){
  me.parent = parentModel;
  objset(parentModel, ["fields", me.name], me, {onConflict:"assert"});
  for(let desc of me.descs) {
    if(desc.nary) {
      let nary = me.nary = {...desc.nary}
      if(isString(nary.elementModel)) {
        nary.elementModel = {name:nary.elementModel};
      } else assert(nary.elementModel);
    }
    else if(desc.verbs) {
      let verbs = me.verbs = desc.verbs;
      for(let verb of verbs) {
        if(verb === 'create'){
        }
      }

    }
    else assert(false);
  }
}
function nary(relation, elementModel, ...attrs) {
  return {nary:{relation, elementModel, attrs}};
}
function verbs(...verbs){
  return {verbs};
}

function mkSchema(...descs){
  let schema = {descs};
  let ctxt = {stack:[schema]};
  for(let desc of schema) {
    desc.model.addToParentModel(ctxt, schema, desc);
  }
  return schema;
}
// Goal: process to process information transfer, query chaining.
// Listener: receive by element, receive by path.

function dmTable(){
  // Table: column list (not a view? yes a view? a view?)
  let schema = mkSchema(
    rootClass("Table",
      field("ID", nary("1", "ID")),
      field("Name", nary("1", "String"), verbs("Set")),
      field("Columns", nary("0+"), verbs("Create", "Update", "Delete")),
      field("Rows", nary("0+", "Row"), verbs("Create", "Update", "Delete")),
      // Index: uniqueness (lookup), rank (from rowid to order), order (b-tree)
      rootClass("Column",
        field("ID", nary("1", "ID")),
        field("Name", nary("1", "String", IndexedBy(ColumnNames)), verbs("Set")),
        // Specifies ["Field", "Data"] 
        field("Table/Field/Data", nary("1", "String"), verbs("Set")),
        field("ColumnData", nary("1", "ColumnData"), verbs("Set")),
      ),
      function rtable(){"1", "ID")),
      ),
      rootClass("Field",
        field("Column", nary("1", "Column")),
        field("Row", nary("1", "Row")),
        field("Data", nary())
      ),
      rootClass("Field",
        field("ID", nary("1", "ID")),
        field("Column", nary("1", "Column")),
        field("Data", nary("1", "FieldData")),
      )
    ),
  );

  function addCol(colName){
    let actf = BeginActionFlow();
    let create = actf.Create({create:["Table", "Column"], exposesAs:["Column"]});
    // create: lid, ctxt_id:(msglid)...
    Use(create.Column, ).Then(
      setName = create.addNewMsg(""),
      Action("Set", create.Column, ["Column", "Name"], colName),
      Action("Add", ["Column"], ["Table", "Columns"]),
    );
    
  }
  
  return {addcol, addrow};
}
function rtable(){
  function mount(){

  }
  function connect(){

  }
  return {mount, connect};
}

function unittest(){
  let table = rtable();
  table.connect();
  table.mount(document.querySelector( 

  const memory = new WebAssembly.Memory({initial:300, maximum:30000});
  const response = await fetch('./wlib.wasm');
  const bytes = await response.arrayBuffer();
  var instances = [];
  var integer = 0;
  var elem = document.querySelector("#status");
  setInterval(async ()=>{
    if(!instances[integer])
      instances[integer] = (await WebAssembly.instantiate(
        bytes, {env:{memory}})).instance;
    elem.innerHTML = instances[integer].exports.counter();
    integer = (integer + 1) % 2;
  }, 1000)
})()
*/