function DataFlow(){
  let luidNext = 1;
  function Luid(){return String(luidNext++);}
  class DataNode{
    constructor(){this.luid = Luid();}
  }
  // Change Sync Methods:
  //   Push-Root: the node that captures all changes;
  //   Push-Leaves: the individual leaf changes;
  //   Push-Snapshot: Similar to Push-Leaves.
  // Change Cascading Methods:
  //   Atomic User Actions
  //   Timer-Captured Transactions (to be sent to Server)
  //   Server-Committed Transactions (safe-discard list)
  //   Transaction shall have Id.
  //   Transaction Id, Cmd List
  //   Transaction Merge.
  // Transaction Grounds(ID revolution method):
  //   Each ID revolves differently on each system. 
  //   Revoltion will have sub-revolutions (creates) and results in super
  //                                                revolutions.
  //    Within revolution (for merging list of cmds), the data will be morphing.
  //   Transaction Status (version ID, Namespace Node, Namespace Node Keys)
  //                                   User=Hello
  //                                   UserId=123123
  //                                   LocalId=22312
  //                                   22312 changes to 22313 (but resulted in 22311 to change to 22314, 22310 to change to 22315)
  //                                   (Anything refers to 22312 now refers to 22313 in this transaction)
  //   Snapshot: list of basis, list of objects
  //   Committing involves deriving changes from base objects.
  //   DataId -> Name, 
  //   Problem: hard to merge.
  //                                   
  //   

  let revs = {}; // revName:[base, modifications].
                 // endRev:[base will become modified].
  class RevBase{
    constructor(parent, name){
      this.parent = parent;
      this.name = name
    }
    CreateRev(name) {
      return new RevBase(this, name);
    }
    Begin(){

    }
    End(){
      let changesToParent = RevDiff(parent.current, self.tip);
      this.parent.Receive(change);
    }
    Receive(changes){

    }
    // Receive Changes: will incorporate changes or flush local changes.
  };
  let RevRoot = new RevBase(this, "root");
  let RevToServer = RevRoot.CreateRev('PushToServer');
  let RevUserAction = RevToServer.CreateRev

  RevUserAtom = CreateRev('PushToServer', 'UserAtom')
  function BeginRev(revName){}
  function EndRev(revName){
    // revName

  }
  
}
function FlowRoot(rootClsName){
  let Classes = {};
  Classes.Emplacer = new Proxy(Classes, {get(o, name){
      return (name in o)?o[name]:CreateClass(name);
  }});

  function CreateClass(name){
    let fcls = {
      name, nextId:0, 
      _CreateId(){return fcls.nextId++;},
      Create(...args){return document.createElement(name, ...args)}
    };
    let {[name]:hcls} = {[name]:class extends HTMLElement{
      constructor(...args){
        super();
        console.log(name, args);
      }
    }};
    fcls.hcls = hcls;
    Classes[name] = fcls;
    customElements.define("fl-" + name.toLowerCase(), hcls);
    return fcls;
  }
  let FlowRoot = CreateClass(rootClsName).Create();
  FlowRoot.Classes = Classes;
  return FlowRoot;
}

let flr = FlowRoot('FlowApp');
let {FlowDoc, FlowParaGraph, FlowSentence, FlowFragment} = flr.Classes.Emplacer;
