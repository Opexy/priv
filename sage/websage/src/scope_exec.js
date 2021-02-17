'use strict';
import _ from 'lodash';
var {isArray, isString, isNumber, isObject, isMatch, isEmpty, includes, merge, groupBy, findLast} = _;
Object.prototype._merge = (...args)=>merge(this, ...args);
Object.prototype._entries = ()=>Object.entries(this);
Object.prototype._values = ()=>Object.values(this);
Object.prototype._includes = (...args)=>includes(this, ...args);

const der = x=> typeof x === 'function' ? x():x;
function oEmpl(obj, name, obj){
  let ret = obj[name];
  if(ret === undefined){
    ret = der(obj);
    obj[name] = ret;
  }
  return ret;
}

import SymbolTree from '/usr/local/lib/node_modules/symbol-tree/lib/SymbolTree.js';
import antlr4 from 'antlr4';
var { CharStreams, CommonTokenStream, ParserRuleContext, tree:{ParseTreeWalker} } = antlr4;
//var { ParseTreeWalker } = require('antlr4/tree/ParseTreeWalker');

import GenaLexer from './gena/GenaLexer.js';
import GenaParser  from './gena/GenaParser.js';
import GenaListener from './gena/GenaListener.js';
Rmap.idgroups = {};
Rmap.idobjs = {};
Rmap.mkId = function mkId(e, group){
  let {idgroups, idobjs} = Rmap;
  if(isString(e) || isNumber(e))
    return JSON.stringify([e]); // TODO: if string is too long.
  else if(isObject(e)){
    if(!e._rmapid){
      group = group ?? e._rmapGroup ?? '';
      let num = idgroups[group] ?? 1;
      idgroups[group] = num + 1;
      e._rmapid = group + '_' + num
      idobjs[e._rmapid] = e;
    }
    return e._rmapid;
  }
  else assert(false);
}
function Rmap(){
  // array is not allowed.
  let paths = {}
  let mkId = Rmap.mkId;
  const KeyArray = path=>path.map(e=>[mkId(e), e]);
  const KeyStr = keyArray=>keyArray.map(e=>e[0]).join('#')
  const setKeyArray = (arr)=>{
    let keyStr = KeyStr(arr);
    let ret = paths[kstr];
    if(!ret) {
      let [keyId, keyObj] = arr.slice(-1)[0];
      ret = {
        parent:undefined, keyStr, keyId, keyObj, subKeys:{}, 
        get hierArr(){
          let iter = this, ret = [this]; 
          while(iter.parent){
            iter=iter.parent;
            ret.push(iter);}
          return ret.reverse();
        }};
      if(arr.length > 1){
        ret.parent = setKeyArray(arr.slice(0,-1));
        ret.parent.subKeys[keyId] = keyObj;
      }
      paths[kstr] = ret;
    }
  }
  function set(path){
    let keyArray = KeyArray(path);
    return setKeyArray(keyArray);
  }
  function get(path){
    let keyStr = KeyStr(KeyArray(path));
    return paths[keyStr];
  }
  return {set,get};
}
var rmap = Rmap();


function ObjectCreate({base=Object.prototype, protos=[], excludes=[]}){
  let protoDescriptors = Object.assign({}, 
    ...protos.map(x=>Object.getOwnPropertyDescriptors(x)));
  for(excl of excludes) delete protoDescriptors[excl];
  return Object.create(base, protoDescriptors);
}

function FlowBase({base=Object.prototype, protos=[]} = {}){
  const proto = {
    _freeze(){return Object.freeze(this)},
    _getOwnProp(propName){return Object.getOwnPropertyDescriptor(this, propName)},
    _getOwnProps(props){
      if(!props) return Object.getOwnPropertyDescriptors(this);
      else return Object.fromEntries(props.map(prop=>[prop, Object.getOwnPropertyDescriptor(this, prop)]));
    },
    _save(){
      this._isSaved=true; 
      this._freeze(); 
      return this;
    },
    _update(...changes){
      for(var change of changes){
        if(typeof change === 'function')
          change(this);
        else
          Object.assign(this, change);
      }
      this._rawChanges.push(...changes);
      return this;
    },
    transact(...changes){
      return this._create()._update(...changes)._save();
    },
    _create(){
      let ret = Object.create(this);
      if(Object.getPrototypeOf(this) !== base){
        let props = this._getOwnProps();
        Object.values(props).forEach(prop=>prop.writable=true);
        Object.defineProperties(ret, props)
      }
        
      Object.defineProperties(ret, {
        _isSaved:{value:false, writable:true},
        _rawChanges:{value:[], enumerable:false, writable:false}
      });
      return ret;
    },
  }
  let ret = ObjectCreate({base:Object.prototype, protos:[proto, ...protos]});
  return ret;
}

const assert = console.assert;
function ProxyGet(onProp){
  return new Proxy({},{get(target, prop, recv){
    if(prop in target) return target[prop]
    else return onProp(prop, target, recv);
  }})
}

function procScope(){

  //DefNode.prototype
  // or should we use html node instead...?
  function DefFlow(){
    let ds = {
      roots:[],
      stack:[{def:undefined, lets:[]}],
      get top(){return _.last(this.stack);},
      _PushDef(def){
        this.stack.push({lets:this.top.lets, def});
        if(!def.parent)
          this.roots.push(def);
      },
      Def(names, models, children=[]){
        let def = {parent:this.top.def, lets:this.top.lets, names, models, children};
        this._PushDef(def);
      },
      DefNameGroup(nameGroup, models, children=[]){
        let ngs = this.top.def.nameGroups = this.top.def.nameGroups ?? {};
        let ng = this.top.def.nameGroups[nameGroup] = this.top.def.nameGroups[nameGroup] ?? {};
        let namestr = `${nameGroup+'_'+_.keys(ng).length}`
        let def = {parent:this.top.def, lets:this.top.lets, names:[namestr], models,children, nameGroup }
        this._PushDef(def);
      },
      Frag(){
        this.stack.push({lets:this.top.lets, def:this.top.def});
      },
      Pop(){
        let popped = this.stack.pop();
        if(popped.def.names == 'let'){
          top.lets.push(popped.def);
        }
      },
    };
    
    // scope vector
    class AstListener extends GenaListener{
      enterEveryRule(ctx){
        this.ctx = ctx;
      }
      enterStmtNse(ctx){
        let idens = ctx.nseIden().map(x=>x.getText());
        if(idens == 'frag') {
          ds.Frag();
          assert(0 === ctx.nseModel().length)
        }
        let models = ctx.nseModel().map(model=>({
          model:model.nseModelName().getText(),
          modelProps:Object.fromEntries(model.nseModelProp().map(p=>
            [p.nseModelPropKey().getText(), p.nseModelPropVal()?.getText()]))
          }));
        if(idens == 'let') {
          ds.DefNameGroup('let', models);
        } else {
          ds.Def(idens, models);
        }
      }
      exitStmtNse(ctx){
        ds.Pop();
      }
    }
    let genaListener = new AstListener();
    return {ds, genaListener}
  }
  var defFlow = DefFlow();
  
  const SysTypes = ProxyGet(prop=>{
    //sysTypes[prop] = new DefNode({cmd:'SysType', name:prop});
  })
  // Elements has to be command.
  // Command can be scoping. It may not have an nse, but a predecessor and eventually see an nse.
  // Commands are associated with a namespace -- and each namespace extension has its own modifer.
  // and that needs to be added to the commands.
  // the commands should/may have an ID...
  
  function parseSource(input){
    const chars = CharStreams.fromString(input);
    const lexer = new GenaLexer(chars);
    const tokens  = new CommonTokenStream(lexer);
    const parser = new GenaParser(tokens);
    parser.buildParseTree = true;
    const tree = parser.doc();
    ParseTreeWalker.DEFAULT.walk(defFlow.genaListener, tree)
    return gf;
  }

  // Name Resolution Node
  class NseVisitNode{
    // Resolving strategy: resolve all class/statically scope first.
    // then solve anything that doesn't have a parameters.
    // then resolve function calls based on the flows.
  }
  // Model: We need Elem as parameter.
  // Model: will expose aggregates as subspace
  // Pointer: Pointer:..., chain( as recursive)
  // Model Stack.
  // Instance: 

  function NseSpace(){
    function NseNode(parent, edges, kstr = edges.join('.'), models = [], exts={}){
      return {parent, edges, exts, kstr,
        models,
        // todo: combine models...
        concat(...edges){return Nse([...this.edges, ...edges])},
        // Nse specific
      }
    }
    let nses = Nse.nses = {};
    Nse.root = NseNode(undefined, [])
    Nse.NseNode = NseNode;
    function Nse(...edges){
      if(edges.length == 0) return Nse.root; 
      let kstr = edges.join(".");
      let ret = nses[kstr];
      if(!ret){
        let parent = Nse(...edges.slice(0, -1));
        ret = NseNode(parent, edges, kstr);
        parent.exts[_.last(edges)] = ret;
      }
      return ret;
    }
    return Nse;
  }

  // Flow Instruction/Information Point.
  var _fidnext = 1;
  var _fips = {};
  // references will be list of children etc.
  function Fip({code, fParent, fChildren={}, ...spec}){
    let ret = {
      fid:`fip_${_fidnext++}`, code, ...spec, fParent, fChildren, 
      Fip(code){return Fip(code, this)}
    };

    if(fParent)
      fParent.fChildren[ret.fid] = ret;
  }
  var fRoot = Fip({code:'root'});
  // functional indexer may override.
  // each function is a class why? because just like a class, a function have names.
  // however the names are collective flow-ers as it may mean different things at different time.
  // previous states.
  function FiUniqName(fParent, nameGroup, name, spec, onConflict){
    let group = fParent[nameGroup] = fParent[nameGroup]?? {};
    let ret = oEmpl(group, name, ()=>Fip({fParent, name, nameGroup, ...spec}));
    onConflict?.(ret, ret.fid === _fidnext-1);
    return ret;
  }
  function FiNse(fParent, name, spec, onConflict){
    return FiUniqName(fParent, 'nses', name, spec, onConflict);
  }

  
  

  function evalAll(){
    let nse = fRoot;
    //let Nse = NseSpace();
    //let nse = Nse.root;
    function PushNse(name){
      return nse = FiNse(nse, name);
    }
    function PopNse(){
      return nse = nse.parent;
    }
    function procDef(def){
      for(var name of def.names){
        if(name === 'let') continue;
        assert(name);
        let models = [];
        for(var ldef of def.lets){
          assert(ldef.children.length === 0);
          models.push(...ldef.models);
        }
        models.push(...def.models);
        PushNse(name);
        nse.models = models;
        for(var child of def.children){
          procDef(child);
        }
        PopNse();
      }
    }
    defFlow.ds.roots.forEach(def=>procDef(def));

    // process all classes
    // Flow Instruction Point
    function procModel(nse){
      if(nse.fParent === fRoot){
        assert(nse.models.length === 1);
        // ModelTarget, ModelTargetParams, ... TODO: Here
        if(nse.models[0] === 'class') {
          nse.fClass = FiClass(nse, models[0]);
          // create class perspective of the model.
        } else {
          nse.fField = FiField(nse, models[0]);
          // if flavor is class...
        }
      }
      if(nse.edges.length === 0){
        _.forEach(nse.exts, ext=>procModel(ext));
      } else if(nse.models[0].model === 'class'){
        if(nse.parent === undefined) { // root level class

        } else {
          assert(false);
        }

        //TODO: combine models
        // when solving model: list of models, list of subkeys (when creating, needs to create alias)
        // ModelResolver:
        //  ResolverKeyList, [Class:x], [''->Model], [''->Name]
        //  Holder of the keys list.
        //  OnResolverModel, OnResolverNse

        assert(nse.models.length === 1);
        modelStack.push(nse);
        procModel()
        modelStack.pop();
      } else {
        assert(false);
      }
    }
    procModel(Nse.root);

    /*
        let fb = FlowBase({protos:[{
      pushNse(name){
        fb = this.transact({nse}); return fb;
      },
      pushLets(lets){
        fb = this.transact({lets:[...fb.let, ...lets]});
      },
    }]}).transact({nse:Nse.root});

    */

    // App.Users,       List,           /,       List<User>, 'self'
    // App.Users,       User,           /,       List<User>, 'elem'
    // App.Users,       User, 'UserName'/,       List<User>, 'elem'
    // App.Users.Email, User, 'UserName'/,       List<User>, 'elem'
    // App, User, Query, ...
    // If it is "Include model", or template model...
    // Then when resolving the model, will look at HyperRoot for details.
    // HyperAlias: specify "x,y" to be the same namespace.

    // SrcRoot, TargetRoot, RelPath, Model, ModelParam
    return gf;
  }
  function genaCpp(){
  }
  function testGen(){
    var specSys = `
      Timestamp:systype(CSIZE:8, generator:CurrentTime, args:{Role});
      UiDeviceRef:systype(CSIZE:8);
    `;
    parseSource(specSys);
    let spec = `
    frag {
      let:String;
      Name;
    };
    RegisteredUserAccessCtrl:{
      PasswordDigestSaved:Grants(),
      AccessToken(),
      PasswordDigestActive:Grants(passwordLengthRead(),Store()), PasswordDigestActive, SecretQuestionActive)
    };
    RegisteredUser:Class() {
      Id;
      RegisteredUserName:ClassKey(type:String);
      CreatorPayload;
      CreationTime:TimeStamp;
      Abcd:ClassKey {
        ab,ef:String;
        cd:Field(type:String);
      };
      UiDevice:Class {
        Id;
        UiDeviceRef;
      };
    };
    Id:ClassKey;
    System:{Server,Client};
    Role:{Server,Client};
    
    PasswordDigest:Ftn(runsWith:{Server,Client}); ### will choose where to run.
    CreateUser:Ftn(name:String, clientPassword, clientPasswordDigest){
      let passwordDigest:String = password.digest;
      user:any = create insert into Server.RegisteredUsers(registeredUserName=name);
      user.SetPassword
    };
    `
    parseSource(spec).evalAll().genaCpp();
    return gf;
  }
  var gf = {parseSource, evalAll, genaCpp, testGen};
  return gf
}
if(import.meta.url.indexOf(process.argv[1])){
  procScope().testGen();
}