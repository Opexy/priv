import antlr4 from 'antlr4';
var { CharStreams, CommonTokenStream, ParserRuleContext, tree:{ParseTreeWalker} } = antlr4;
import GenaLexer from './gena/GenaLexer.js';
import GenaParser  from './gena/GenaParser.js';
import GenaListener from './gena/GenaListener.js';
import mkprop from '../../websrc/js/utils.js';
let {ExprContext} = GenaParser;
var oAssign = Object.assign;
function traverse(node, ftnCollection, ftnEnter, ftnExit=()=>{}, idx=0, parent=undefined) {
  ftnEnter(node, idx, parent);
  let collection = ftnCollection(node);
  collection ?? [].forEach((child, idx)=> traverse(child, ftnEnter, ftnExit, idx, node));
  ftnExit(node, idx, parent);
}

import { write, writeFile, writeFileSync, readFile, readFileSync } from 'fs';
import { assert } from 'console';
import {findLast} from 'lodash';
function GenaFramework() {


class Cmd {
  subCmds=[];
  constructor(parent, cmd, args){
    oAssign(this, {parent, cmd, args});
  }
  mkCmd(cmd, args) {
    this.subCmds = new Cmd(this, cmd, args);
  }
};

// This is Dim
class Scope {
  namedScopes = {};
  subScopes = [];
  constructor(parent, spec){this.parent = parent; oAssign(this, spec);}
  mkWithName(name){
    if(namedScopes[name])
      return namedScopes[name];
    else {
      let ret = new Scope(this, {name});
      this.subScopes.push(ret);
      this.namedScopes[name] = ret;
      return ret;
    }
  }
  findLast(pred){
    for(let iter = this; iter; iter = iter.parent) 
      if(pred(this)) 
        return this;
    return undefined;
  }
};
class Ctx {
  scopeRoot = {};
  scope = this.scopeRoot;
  beginName(name, autopop=true){
    this.scope = this.scope.mkWithName(name);
    this.scope.autopop = autopop;
  }
};

const CmdProc = {
  dim:{
    dimStart: function(ctx, cmd, {args}=cmd){
      ctx.beginName(args.name);
    },
    dimEnd:function(ctx, cmd, {args}=cmd){
      ctx.pop();
    },
    type: function(ctx, cmd, {args}=cmd){
      ctx.set("type", args[0]);
    },
    defaultStmt:{
    },
  },
  struct:{
    
  }
}

function procCmd(cmd, ctx, proc = CmdProc){
  let cmdName = cmd.cmd;
  cmdProc[cmdName+"Start"]?.(ctx, subcmd);
  for(let sub of cmd.subCmds) {
    let subCmd = sub.cmd;
    let subProc = proc[subCmd];
    procCmd(subcmd, ctx, subProc);
  }
  cmdProc[cmdName+"End"]?.(ctx, subcmd);
  
  findLast(ctx.scope);
  if(ctx.scope.autopop && ctx.scope.cmd === cmd){
    ctx.scope.findLast(scope=>scope.cmdCreate = cmd)
    ctx.scope = ctx.scope.parent;
  }
}

function ingest(input){
  const chars = CharStreams.fromString(input);
  const lexer = new GenaLexer(chars);
  const tokens  = new CommonTokenStream(lexer);
  const parser = new GenaParser(tokens);
  parser.buildParseTree = true;
  const doc = parser.doc();
  const cmdSrc = procNodeExpr(mkNode({expr:doc.expr()}));
  procCurly(cmdSrc);
  function mkNode(args, parent=this){
    let ret = {parent, children:[], ...args, mkNode, 
      get path(){
        let ret = [];
        for(let iter = this; iter !== undefined; iter = iter.parent)
          ret.push(iter);
        return ret.reverse();
      }}
    if(parent) parent.children.push(ret);
    return ret;
  }
  function procNodeExpr(cursor, expr=cursor.expr){
    assert(cursor.expr === expr);
    assert(expr instanceof ExprContext);
    if(expr.lhs) {
      if(expr.opr === null){cursor.opr = ' ';}
      else {cursor.opr = expr.opr.text;}
      cursor.mkNode({expr:expr.rhs})
      for(var iter = expr.lhs; (iter.opr === expr.opr) && iter.lhs; iter = iter.lhs) {
        cursor.mkNode({expr:iter.rhs})
      }
      cursor.mkNode({expr:iter});
      cursor.children.forEach(child => procNodeExpr(child));
    } else if('([{'.includes(expr.opr?.text)) {
      cursor.enclosures = cursor.enclosures ?? '' + expr.opr.text;
      cursor.enclosure_expr = cursor.expr;
      let exprs = expr.expr();
      if(exprs.length === 0){
        cursor.opr = ' ';
      } else if(exprs.length === 1){
        cursor.expr = exprs[0];
        procNodeExpr(cursor);
      }
    } else if(expr.iden){
      cursor.opr = 'iden';
      cursor.val = cursor.iden = expr.iden.text;
    } else if(expr.val) {
      let text = expr.getText();
      if(expr.val.str){
        cursor.val = cursor.str = text;
        cursor.valType = 'string';
      }
      else if(expr.val.numfloat) {
        cursor.val = cursor.numfloat = Number(text);
        cursor.valType = 'float'
      }
      else if(expr.val.numdec) {
        let bi = BigInt(text);
        let num = Number(text);
        cursor.valType = 'int';
        cursor.val = (bi == num)?num:bi;
      } else assert(false);
    } else {
      assert(false);
    }
    return cursor;
  }

   function mkCmdDim(dimName){
    this.dims = this.dims ?? {};
    let cmdDim = mkprop(this.dims, dimName, {parent:this, name:dimName, cmd:'dim', cmdDimAddSpec, addSpec:cmdDimAddSpec});
    return cmdDim;
  }
  function cmdDimAddSpec(cmdSrc){
    if(cmdSrc.)
  }

  let cmdRoot = {
    dims:{},
    mkCmdDim(){}
  }


  function procStmt(cmdSrc){
    if(cursor.opr === ' '){
      cursor.type = 'stmt';
      if(cursor.children[0].opr in stmtKeywords) {
        cursor.stmtCmd = cursor.children[0].val;
        cursor.stmtArgs = cursor.children.slice(1);
      } else {
        getDefaultStmt();
      }
      
      
      if(cursor.children[0]){

      }

      if(cursor.children[0]){

      }
    } else {
      assert(false);
    }
  }
  function procPart(cursor){

  }


  //ParseTreeWalker.DEFAULT.walk(astListener, tree);
}

function genCpp(){

}

return {ingest, genCpp}
}

if(import.meta.url.indexOf(process.argv[1])){
  let gf = GenaFramework();
  for(var fileName of  process.argv.splice(2)){
    let str = readFileSync(fileName, {encoding:'utf8', flag:'r'});
    gf.ingest(str);
  }
  gf.genCpp();
}