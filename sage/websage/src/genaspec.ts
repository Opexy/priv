import { CharStreams, CommonTokenStream, ParserRuleContext } from 'antlr4ts';
import {GenaLexer} from './gena/GenaLexer';
import {GenaParser, StmtNseContext} from './gena/GenaParser';
import {GenaListener} from './gena/GenaListener';
import { ParseTreeWalker } from 'antlr4ts/tree/ParseTreeWalker'
import {isMatch, isEmpty, includes, merge, groupBy, findLast} from 'lodash'
import { assert } from "console";
import { stringify } from 'querystring';
import { chmodSync } from 'fs';
import { kStringMaxLength } from 'buffer';


function GenaFramework(){
  type NseNameString = string;
  //type NseNameStringElem = string;

  //class NseName{
  //  constructor(public name:Array<NseNameStringElem>){};
  //  toString():NseNameString{return this.name.join('.')}
  //  get tail(){return this.name[this.name.length - 1]}
  //  get isValid():boolean{return this.name.length && this.name[0] != 'let'}
  //};
  type NseName = string;

  type SpecType = 'Root' | 'Unknown' | 'Type' | 'Data' | 'NameFrag' | 'Event'| 'Param';
  type SpecSubType = 'Default' | 
                     'Class' | 'Frag' | 'Enum' | 'StdType' |
                     'Alias';
  type SpecModel = {model:string, [key:string]:string}
  type SpecModelElemType = string;
  type SpecObj = {
    specType?:SpecType,
    specSubType?:SpecSubType,
    specModel?:SpecModel,
  };

  type DefCmd = CmdModel; // {[key:string]:string|DefCmd|DefNode};
  type CmdModel = {cmd:"model", model:string, props:[{[key:string]:string}]}
  class DefNode{
    constructor(
      public parent:DefNode,
      public aspect:string,
      public name:string,
      public cmds:Array<DefCmd> = [],
      public defs:Array<DefNode> = [],
      public _src:string = ''){
      if(parent)parent.defs.push(this);
    }
    get isLet(){return this.name === 'let'};
    pushCmd(...cmds:DefCmd[]){cmds.push(...cmds)}
  }

  function Def(parent:DefNode, name:string, ...cmds:DefCmd[]):DefNode{
    return new DefNode(parent, '', name, cmds);
  }

  // "Name:ModelName"
  // "parent", "vroot", "name" "target"
  // in case it is coherenced, there will be multiple potentials, xxx @ virtualroot
  // Class:;
  // Model: When resolving Child, treat a few children as Type Params (Automatic Name Coherence)
  // 

  type NseStdTypeSpec = {
    subType:'StdType', traits:NseStdTypeTraits, 
    lngNames:{[key in 'cxx'|'js']?:string}, nbits:number
  }
  type NseStdTypeTraits = {[key in 'number'|'ptr'|'custom']?:any};

  var defRoot:DefNode = Def(undefined, '');

  function DefSystemType(typeName:NseNameString, specInfo:any){
    return Def(defRoot, typeName, {cmd:'StdType', ...specInfo});
  }
  function createSystemTypes(){
    const systemTypes:{[key:string]:NseStdTypeSpec} = {
      Int32  :{lngNames:{cxx:'int32_t'}, nbits:32, traits:{number:1}, subType:'StdType'},
      Int64  :{lngNames:{cxx:'int64_t'}, nbits:64, traits:{number:1}, subType:'StdType'},
      Double :{lngNames:{cxx:'double'},  nbits:64, traits:{number:1}, subType:'StdType'},
      Float  :{lngNames:{cxx:'float'},   nbits:32, traits:{number:1}, subType:'StdType'},
      Bool   :{lngNames:{cxx:'bool'},    nbits:32, traits:{number:1}, subType:'StdType'},
      Utf8   :{lngNames:{cxx:'string'},  nbits:128,traits:{number:1}, subType:'StdType'},
    }
    for(var typeName in systemTypes){
      DefSystemType(typeName, systemTypes[typeName]);
    }
  };
  createSystemTypes();
  
  function parseSource(input:string){
    const chars = CharStreams.fromString(input);
    const lexer = new GenaLexer(chars);
    const tokens  = new CommonTokenStream(lexer);
    const parser = new GenaParser(tokens);
    parser.buildParseTree = true;
    const tree = parser.doc();

    type ListenerFrame = {
      node:DefNode;
      lets:Array<DefNode>;
    }
    class GenaListener1 implements GenaListener{
      ctx:ParserRuleContext;
      enterEveryRule(ctx:ParserRuleContext){
        this.ctx = ctx;
      }

      stack: Array<ListenerFrame> = [{node:defRoot, lets:[]}];
      get top():ListenerFrame{
        return this.stack[this.stack.length - 1];
      }
      get lets():Array<DefNode>{return this.top.lets;}
      get curr(){return this.top};
      pushScope(){
        this.stack.push({node:this.top.node, lets:this.top.lets.slice()})
      }
      pushNse(name:NseName, ...cmds:DefCmd[]){
        if(this.lets.length) {
          this.lets.forEach(x=>assert(x.defs.length === 0));
          cmds = [...this.lets.map(x=>x.cmds).flat(), ...cmds]
        }
        let frame = {node:Def(this.top.node, name, ...cmds), lets:this.top.lets.slice()}
        frame.node._src = this.ctx.text;
        this.stack.push(frame);
        return this.curr;
      }
      popNse(){
        let pop = this.stack.pop();
        if(pop.node.isLet)
          this.top.lets = pop.lets;
      }
      enterStmtNse(ctx:StmtNseContext){
        let iden = ctx.nseIden()[0].text;
        const modelCmd = {
          event:'Event',
          param:'Param',
        }
        let models = ctx.nseModel().map(model=>({cmd:'model',
          model:model.nseModelName().text,
          props:Object.fromEntries(model.nseModelProp().map(p=>
            [p.nseModelPropKey().text, p.nseModelPropVal()?.text]))
          })) as unknown as CmdModel[];

        if(iden === 'let') {
          assert(models.length);
        } else if(iden === 'frag'){
          assert(!models.length);
          this.pushScope();
          return;
        }
        //let spec:NseSpec = undefined;
        this.pushNse(iden, ...models);
      }
      exitStmtNse(ctx:StmtNseContext){
        this.popNse();
      }
    }
    ParseTreeWalker.DEFAULT.walk(new GenaListener1(), tree)

    return gf;
  }

  class EvalNode{
    // 
    // path
    // subNames
    // eval target path/step stack
    // eval path parent
    // [target dotted name => EvalNode]
    // source stack
  }
  function evalAll(){
    function stage_1(def:DefNode){
      if(def.cmds.length > 1) {
        console.log(def.cmds)
      }
      def.defs.forEach(child=>stage_1(child));
    }
    stage_1(defRoot);
    return gf;
  }
  function genaCpp():string{
    return `//{How many}`;
  }
  var gf = {defRoot, parseSource, evalAll, genaCpp};
  return gf;
}

export{GenaFramework};