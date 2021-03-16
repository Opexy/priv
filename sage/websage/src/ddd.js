'using strict';
/// Data Driven Document
/// last: -1, first: 1
/// 0: before first
/// last: -1
// Data Node Atom
const utils = require('./utils.js');
var wsmsg = require('./wsmsg.js');
function DataFramework(config){
  // Unviersal Scope specifier extends spec
  class Node {
  }

  const df = {
    Compile, addFunction,
    Entity, Verb,  SysRole,
    entities:{}, verbs:{}, sysRoles:{}
  };
  const {entities, verbs, sysRoles} = df;
  df.mkEntities = emplr(entities, (obj, name)=>Entity(name));
  df.mkVerbs = emplr(verbs, (obj, name)=>Verb(name));
  df.mkSysRoles = emplr(sysRoles, (obj, name)=>SysRole(name));
  const Defn = Interface({}, [], {
    ctors:[assignThis],
  })
  const DefnWithName = Interface({}, [], {
    ctors:[assignThis, function(){assert(this.name)}]
  })

  function SysRole(name){
    return mkprop(sysroles, name, ()=>SysRole.new({name}))
  }
  Interface(SysRole, [DefnWithName], {
    type:'SysRole',
  })

  function Verb(name){
    return mkprop(verbs, name, ()=>Verb.new({name}))
  }
  Interface(Verb, [DefnWithName], {
    type:'Verb',
  })

  const CmdList = Interface({},[], {
    ctor({parent}){
      this.parent = parent;
      parent.cmdlist.push(this);
    },
    //Invokes, Handles,
    cmdlist:[],
  })

  // Atom: classes
  function Entity(name){
    return entities[entity] ?? (entities[entity]=Entity.new({name}));
  }
  Interface(Entity, DefnWithName, {
    type:'Entity',
  })

  
  function addFunction(ftn, args=[], ftnName=ftn.name){
    ftns()
  }

  function Compile(sysRoles, tech){

  }
  
  return df;
}

// Synchronization: MsgProcId, MsgProcKeys,
// What to resolve? Run information on system it should reside.
// Minimum code change for "design" changes

let df = DataFramework();
function Init(){
  let roles = {Client, Server} = df.mkSysRoles;
  df.connects(Client, Server);
  /*
  BackendServer {
  }
  Server {
    storagemethod DirectStorage default;
    persistent Users:Collection(User) via DirectStorage{
      key User.id Fields {
        User.username,
        User.passdigest,
        User.email
      }
    }
    roles {};
    threadgroup DbRequestHandler;
    tier {
      
    }

    actiongroup CRUD {Create, Read, Update, Delete}
    handles CRUD(elements) from UiClient via UiRequestHandler

    
  }

  */



  /*
  
  let verbs = {Create, Print} = df.mkVerbs;
  let ents = {User} = df.mkEntities;

  Client.Handles(Print).RouteTo('Server');
  Client.Handles(Create, User).RouteTo('Server');

  Server.Handles(Print).Invokes(printAll).Args({}, {});
  let root = document.querySelector('#client');
  if(root){
    df.Compile([Client], 'js-web').start();
  } else {
    root = document.querySelector('#server');
    df.Compile([Server], 'js-web').start();
  }
*/
  
  


  /*
  let flow = BeginFlow(caller, whence, verb, args);
  let client = df.RegisterSystem(Client);
  let server = df.RegisterSystem(Server);
  let User = df.Datm('User');
  let User = df.Datf([['FlatAny', 'System', 'Local'],[],[]]);
  df.compile();
  server.Add('Users', 'User')
    .addField(UserName)
    .addField(Password);
  df.addCollection('Users');



  let form = new DataNode();
  let formFields = new DataNode();
  for(let i = 0; i < 10; i++){
    let formField = new DataNode();
    let formFieldLabel = new DataNode();
    let formFieldText = new DataNode();
    formField.push('label', formFieldLabel);
      ["label", formFieldLabel], 
      ["text", formFieldText]);
    formFields.push(formField);
  }
*/
}
Init();