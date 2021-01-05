'use strict';
const {assert} = console;
let rf = gg.RelationFramework();
let {eUpdated, eAdded, eRemoved, eUnchanged} = rf.ecodes;
let {otClass, otProp, mkClasses, uoAddProp, uoProc, uoCompile} = rf;

let {EntityEditor, EntityEditorSetDomroot, Workspace, WorkspaceView, RoleUiClient} = rf.mkstrs;
let {BrowserClient} = rf.SystemTech;
let {clss, addClss, addRole, addProc} = rf.global;
addClss(EntityEditor, Workspace, WorkspaceView);
clss.EntityEditor.addProp(Workspace, clss.Workspace);

addRole(RoleUiClient);

let {Domroot, ConsolePrintLine, ToPrint, HelloWorld} = rf.mkstrs;
addProc({EntityEditorSetDomroot(){
  //Programflow(Automatic);
  // Procedure and iospec. 
  Runon(RoleUiClient);
  Params(EntityEditor, Domroot);
  AssignMember(EntityEditor, Domroot); // InitMember then Use
  /*ParallelCases(
    [CurrentTime.Hour.min < 12, ()=>{
      console.writeline("Good Morning");
      GotoLabel(Morning);
    }],
    [CurrentTime.Hour >= 12, ()=>{
      console.writeline("Good Afternoon");
      GotoLabel(Afternoon);
    }]
  );*/
  Callsub(ConsolePrintLine, {ToPrint:"HelloWorld"})
  Subprocs({ConsolePrintLine(){
    Params(ToPrint);
    
  }})
}}, {
  HelloWorld(){
    Callsub(ConsolePrintLine, {ToPrint:"HelloWorld"})
    Subprocs({ConsolePrintLine(){
      Params(ToPrint);
    }})
  }
});

let {Application} = rf.mkstrs;
rf.global.compile({
  Systems:{UiClient:{Tech:BrowserClient,Roles:{RoleUiClient}}},
  Entries:{HelloWorld:{}, EntityEditor:{EntityEditorSetDomroot}}
});

//uoCompile(Library("EntityEditorSetDomroot", ));
/*
let verbs =mkverbs({
  CanvasViewportScrollRelative(canvas, xinc, yinc, zinc){
    let {viewport_x, viewport_y, viewport_z} = canvas;
    let ov = {viewport_x, viewport_y, viewport_z};
    let nv = {viewport_x:viewport_x+xinc, viewport_y:viewport_y+yinc, viewport_z:viewport_z+zinc};
    mkchange({o:canvas, ov, nv});
  }
})
let {EntityEditor, Workspace, WorkspaceView, WorkspaceView, Class, Subclass, } = KRS();
// OnLoadField, OnLoadItems;
Class(EntityEditor);
Field(EntityEditor, Workspace);
Field(EntityEditor, WorkspaceView);

let stro 



function KRS(){
  let kstrs = {};
  function KstrFromString(str, exe){
    let ret = kstrs[str];
    if(!ret){
      function _Kstr(...args){
        if(_Kstr.exe) return _Kstr.exe(...args); else console.assert(false);
      }
      let ret = _Kstr; ret.kstr = kstr; ret.refs = {};
      if(exe){assert(typeof(exe) === 'function'); ret.exe = exe}
      kstrs[kstr] = ret;
    } 
    return ret
  }
  (function builtins(defs){
    for(let kstr in defs) {
      let kc = KstrFromString(kstr, defs[kstr]);
    }
  })({
  Global() {assert(false);},
  Class(cls, def){
    assert(!cls.type);
    cls.type = "Class";
    cls.scope = def.scope ?? kstrs[Global];
    cls.global = "Global";
    

  },
  })
  let hdlr = {get(tgt, prop, recv){if(tgt.prop) return tgt.prop; else return new Kstr(prop)}};
  return new Proxy({}, hdlr);
}
*/

/*
class Vdom{
  constructor(parent){this.parent = parent; this.vdomChildren = [];}
  get isRoot(){return this.parent === undefined;}
  setVerbs(verbdef){this.verbs = verbs(verbdef)}
  createChild(){let ret = new Vdom(this); this.vdomChildren.push(ret); return ret;}
};
function VdomAct(vdoms, act) {
  let resarr = [];
  vdom.forEach(vdom=>{
    if(!vdom) return;
    let result = {};
    Object.entries(act).forEach(([verb, params])=>{
      result[vdom] = vdom.act(verb, params);
    })
    resarr.push(result);
  })
  return resarr;
}
function Canvas(elemRoot){
  let canvas = new Vdom();
  canvas.setVerbs({
    ViewportScrollRelative(xScroll=0, yScroll=0, zScroll=0){
      assert("false");
    },
    ViewportScaleRelative(scale){
      assert("false");
    },
    ViewportRotateRelative(xRot,yRot,zRot){
      assert(false);
    },
    DomAttach(dom){
      this.dom = dom;
      VdomAct([this.Nav, this.MainMenu, this.Toolbars], {DomAttachCanvas:{dom}});
    }
  });
  canvasCreateNav(canvas);
  canvasCreateMainMenu(canvas);
  canvasCreateToolbars(canvas);
  VdomAct([canvas], {DomAttach:{dom:elemRoot}});
}
function canvasCreateNav(canvas){
  canvas.Nav = canvas.createChild();
  canvas.Nav.setVerbs({DomAttachCanvas(dom){

  }})
}
function canvasCreateMainMenu(canvas){
  canvas.MainMenu = canvas.createChild();
  canvas.MainMenu.setVerbs({DomAttachCanvas(dom){

  }})
}
function canvasCreateToolbars(canvas){
  canvas.MainMenu = canvas.createChild();
  canvas.MainMenu.setVerbs({DomAttachCanvas(dom){

  }})
}

function EntityEditor(dom){
  let ee = Canvas(dom);
}
function eeAddTag(tag){
  
}

Canvas(document.querySelector("#EntityEditor"));
*/