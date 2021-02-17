import {GenaFramework} from './genaspec';

var assert = console.assert;
import {SourceMapGenerator} from 'source-map'
import jsTokens from 'js-tokens'
import { write, writeFile, writeFileSync, readFile, readFileSync } from 'fs';
declare global {
  var readFileSync: any;
}
globalThis.readFileSync = readFileSync;

var isBrowser=new Function("try {return this===window;}catch(e){ return false;}");
async function ReadSource(uri:string):Promise<DocSource>{
  var stamp = "";
  if(isBrowser()){
    return fetch(uri)
    .then(response=>{
      stamp = response.headers.get("Last-Modified")
      return response.text()
    })
    .then(text=>new DocSource(uri, text, Date.now()));
  } else {
    var fs = await import('fs')
    var util = await import('util')
    var read = util.promisify(readFile)
    var Base64 = await import('base64-js')
    globalThis.btoa = function(x:string) {return Base64.fromByteArray(new TextEncoder().encode(x));}
    return read(uri, {encoding: 'utf8'}).then(text=>new DocSource(uri, text, Date.now()))
  }
}

interface NumberRange{
  start:number;
  end:number;
}

interface NumberRangeCluster<T extends NumberRange>{
  start: number;
  end: number;
  list:Array<T>;
  byStart:Array<T>;
}

function clusterNumberRanges<T extends NumberRange>(ranges:Array<T>):Array<NumberRangeCluster<T>>{
  let cells:Array<any> = ranges.map((x,idx)=>({start:x.start,end:x.end, idx}))
    .sort((a,b)=>a.start-b.start);
  var cluster:NumberRangeCluster<T> = undefined;
  let clusters:Array<any> = [];
  for(var cell of cells){
    if(!cluster || cell.start >= cluster.end) {
      // @ts-ignore
      cluster = {start:cell.start,end:cell.end, list:[cell]};
      clusters.push(cluster);
    }
    else {
      if(cluster.end < cell.end){
        cluster.end = cell.end;
      }
      cluster.list.push(cell);
    }
  }
  for(cluster of clusters){
    // @ts-ignore
    cluster.byStart = cluster.list.map(cell=>ranges[cell.idx]);
    // @ts-ignore
    cluster.list = cluster.list.sort((a,b)=>a.idx - b.idx).map(cell=>ranges[cell.idx]);
  }
  return clusters;
}

interface LineColumn{
  pos:number;
  line:number;
  column:number;
};

function lineColumn(content:string, poslist:Array<number>):Array<LineColumn>{
  let lines = content.split('\n');
  var ret:Array<LineColumn> = [];
  var remainder = poslist.slice();
  var pos = remainder.shift();
  var line = 1;
  var lstart = 0, lend = 0;
  for(var linestr of lines){
    lend += linestr.length + 1;
    while(pos < lend && pos >= lstart){
      poslist.length = 1;
      ret.push({pos, line, column:pos-lstart})
      pos = remainder.shift();
      if(pos === undefined)
        break;
    }
    lstart = lend;
    line++;
  }
  assert(!pos);
  return ret;
}

type DocName = string;
type SortedNumbers = Array<number>
class DocSource {
  constructor(
    public name     :string,
    public content  :string,
    public stamp    :number,
  ){}
  get fext():string {return /\.[0-9a-z]+$/i.exec(this.name)?.[0]??""};
}
class DocElem{
  constructor(
    public src      :DocSource,
    public srcStart :number,
    public srcEnd   :number
  ){Object.freeze(this)}
  str():string{
    return this.src.content.slice(this.srcStart, this.srcEnd)
  }
  get startLineColumn():LineColumn{
    return lineColumn(this.src.content, [this.srcStart])[0];
  }
}
class DocElemList{
  constructor(
    public list:Array<DocElem> = []
  ){}
  str():string{
    return this.list.map(x=>x.str()).join('');
  }
}

interface DocUpdate extends NumberRange{
  basis:any;
  oval:string;
  nval:string;
}


// modifies the top of DocUpdate
function DocEdit(_sources:Array<DocSource>){
  var snaps:Array<DocSnap> = [];
  var threads:{[key:string]:DocThread} = {}
  var basis:DocSnap;
  var sources = _sources.slice();

  //#region classes
  class DocThread{
    constructor(
      public name:DocName,
      public snaps:Array<DocSnap>
    ){};
    get tip():DocSnap{
      return this.snaps[this.snaps.length - 1];
    };
    get basis():DocSnap{
      return this.snaps[0];
    }
  };

  class DocUpdate implements DocUpdate{
    oval:string;
    nval:string;
    constructor(
      public basis:any,
      public start:number,
      public end:number
    ){}
  }

  class DocSnap{
    static _UpdateCount:number = 0;
    constructor(
      public basis:DocSnap,
      public updates:Array<DocUpdate>,
      public result:DocElemList,
    ){}
    beginUpdate(start:number, end:number):DocUpdate{
      var ret = new DocUpdate(this.basis, start, end);
      ret.basis = this;
      ret.oval = this.sliceStr(start, end);
      ret.nval = ret.oval;
      return ret;
    }
    commitUpdates(_updates:Array<DocUpdate>):DocSnap{
      if(!_updates.length) return this; // ??
      var clusters = clusterNumberRanges(_updates).filter(cluster=>{
        return cluster.list.length > 1 || cluster.list[0].nval != cluster.list[0].oval
      });
      var result:DocElemList = new DocElemList();
      var skip = clusters[0];
      var skipIdx = 0;
      var elStart = 0;
      var elEnd = 0;
      var clusterPushed = false;
      var caret = 0;
      function push_cluster(){
        if((false == clusterPushed) && skip){
          for(var update of skip.list){
            var src = createSource(`update#${DocSnap._UpdateCount++}`, update.nval, Date.now());
            var elem = new DocElem(src, 0, update.nval.length);
            result.list.push(elem);
          }
          clusterPushed=true;
        }
      }
      for(var elem of this.result.list){
        caret = elStart;
        elEnd = elStart + (elem.srcEnd - elem.srcStart);
        if(!skip){
          result.list.push(elem); // and continue
        }
        // if elem before skip, add elem
        else if(elEnd <= skip.start){
          result.list.push(elem); // and continue
        } else {
          // intersect or after.
          while(skip && elEnd >= skip.end){
            if(caret < skip.start){
              var elemSrcStart = elem.srcStart + (caret - elem.srcStart);
              var elemSrcEnd = elem.srcStart + skip.start - elStart;
              result.list.push(new DocElem(elem.src, elemSrcStart, elemSrcEnd));
            }
            push_cluster();
              // skip may be over.
            if(elEnd > skip.end){
              var elSrcStart = elem.srcEnd - (elEnd - skip.end);
              result.list.push(new DocElem(elem.src, elSrcStart, elem.srcEnd));
            }
            caret = skip.end;
            skip = clusters[++skipIdx];
          } 
        }
        elStart = elEnd;
      }
      push_cluster();
      return new DocSnap(this, _updates, result);
    }
    sliceStr(start:number, end:number):string{
      var seekStart:number = 0;
      var seekRemain:number = end - start;
      var result:string = "";
      for(var elem of this.result.list){
        var {srcStart, srcEnd} = elem;
        var avail = srcEnd - srcStart;
        if(seekStart < start){
          if(seekStart + avail <= start) {
            seekStart += avail;
            continue;
          } else {
            var diff = start - avail;
            seekStart += diff;
            srcStart += diff;
            avail -= diff;
          }
        }
        if(avail > 0){
          var amount =Math.min(seekRemain, avail);
          result += elem.src.content.slice(srcStart, srcStart+amount);
          seekRemain -= amount;
        }
        if(seekRemain == 0) {
          return result;
        }
      }
      if(seekRemain)
        assert(false);
      return result;
    }
  };
  //#endregion

  ctor();
  var edit = {sources, snaps, threads, basis, DocThread, DocSnap, DocUpdate, 
    createSource, emplaceThread};
  return edit;

  function ctor(){
    basis = new DocSnap(undefined, [], 
      new DocElemList(sources.map(src=>new DocElem(src, 0, src.content.length)))
    );
    threads["Tip"] = new DocThread("Tip", [basis]);
  }
  function createSource(name: string, content: string, stamp: number): DocSource {
    let ret = new DocSource(name, content, stamp);
    sources.push(ret);
    return ret;
  }
  function emplaceThread(name:DocName, baseThreadName:DocName = "Tip"):DocThread{
    let doc = this.threads[name];
    if(!doc) {
      var baseThread = threads[baseThreadName];
      doc = new DocThread(name, [baseThread.tip]);
    }
    return doc;
  }
}

class GenSection{
  constructor(
    public codeStr:string,
    public codeSrc:DocElemList,
    public block:DocUpdate,
  ){}
  codeFtnStr():string{
    var sourceURL = "src/GEN";
    var mapgen = new SourceMapGenerator({
      file:sourceURL, 
    });
    
    var genpos = 0;
    var fixName = (orig:string)=>"../../libsage/include/libsage_flow.hh"
    // @ts-ignore
    var mappings = [];
    for(var elem of this.codeSrc.list){
      let frag = elem.str();
      let poslist:Array<number> = [];
      let elemStart = elem.srcStart;
      let origpos = elemStart;
      
      for(var token of jsTokens(frag))poslist.push(origpos += token.value.length)
      if(poslist[0] !== elemStart)
        poslist.unshift(elemStart);
      // maybe push one...
      var origlist = lineColumn(elem.src.content, poslist);
      var startline = origlist[0].line;
      var genlist = origlist.map(x=>({
        pos:x.pos - elemStart + genpos,
        line:x.line-startline + 1,
        column:x.column}));
      //generated.line+=2;
      genpos += elem.srcEnd - elem.srcStart;
      for(var ii = 0; ii < origlist.length; ii++){
        mappings.push({
          generated:genlist[ii],
          source:fixName(elem.src.name),
          original:origlist[ii]});
      }
    }
    for(var map of mappings) mapgen.addMapping(map);
    // has to be base64 or has to be escaped.
    let sourceMappingURL=mapgen.toString();
    let ftnBottom=`\n//# sourceURL=${sourceURL}` +
                  `\n//# sourceMappingURL=data:text/plain;base64,` +
                  btoa(sourceMappingURL)
    let ftnsrc = this.codeStr + ftnBottom;
    return ftnsrc;
  }
  process(){
    var ftnsrc = this.codeFtnStr();
    var gen = "";
    var indent = 0;
    var gf = GenaFramework();
    eval(ftnsrc)
    this.block.nval = gen;
  }
}

function SourceGen(source:DocSource){
  var edit = DocEdit([source]);
  var thread = edit.emplaceThread('Tip');
  var sections:Array<GenSection> = [];
  GetSections();
  for(var sect of sections){
    sect.process();
  }
  var snap = thread.tip.commitUpdates(sections.map(x=>x.block));
  var newContent:string = snap.result.str();
  if(newContent !== source.content){
    writeFileSync(source.name, newContent);
    console.log(`Changed: ${source.name}`)
  } else {
    console.log(`Unchanged: ${source.name}`)
  }
  function GetSections(){
    const rex_slash_code_str = 
      `(${/\/\*[ \t]*GEN\+\+([^]*?)\*\/[ \t]*\n?/.source})` + '|' +
      `(${/\/\/[ \t]*GEN\+\+(.*?)\n([ \t]*\/\/(.*?)\n)*/.source})`;
    const rex_slash_end_str = 
      `(${/\/\*\s*GEN\-\-[^]*?\*\//.source})` + '|' +
      `(${/\/\/[ \t]*GEN\-\-.*?\n?/.source})`;
    interface Rex{
      re:RegExp,
      proc():any
    }
    const rex_slash = {
      re:new RegExp(rex_slash_code_str + '|' + rex_slash_end_str, 'gm'),
      proc(){
      }
    }
    const rex_error = {re:/$a/gm, proc(){}}
    const file_rex:{[key:string]:Rex} = {
      '.js':rex_slash, '.c':rex_slash, '.cpp':rex_slash, '.cc':rex_slash, 
      '.h':rex_slash, '.hh':rex_slash, '.hpp':rex_slash, '.java':rex_slash
    }
    var rex = file_rex[source.fext] ?? rex_error;
    var match:RegExpExecArray;
    var codeElemList:DocElemList = undefined;
    var codeStr:string = ''
    var blockStartIdx:number = 0;
    var blockEndIdx:number = 0;
    while(match = rex.re.exec(source.content)){
      if(match[1]){
        blockStartIdx = match.index + match[1].length;
        var start = match.index + match[1].indexOf(match[2]);
        var end = start + match[2].length;
        var elem = new DocElem(source, start, end);
        codeStr += match[2];
        assert(elem.str() === match[2])
        if(!codeElemList){
          codeElemList = new DocElemList([elem]);
        } else {
          codeElemList.list.push(elem);
        }
      }
      else if(match[8]){
        blockEndIdx = match.index;
        assert(codeElemList);
        let update = thread.tip.beginUpdate(blockStartIdx,blockEndIdx)
        sections.push(new GenSection(codeStr, codeElemList, update));
        codeElemList = undefined;
        codeStr = '';
      } else {
        assert(false);
      }
    }
  }
}

class Tokenize{
}
export {isBrowser, Tokenize, ReadSource, SourceGen}