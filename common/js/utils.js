'use strict';

const { get } = require("http");

globalThis.gg = globalThis;
gg.assert = console.assert;
gg.isArray = Array.isArray;
gg.der = x=> typeof x === 'function' ? x():x;
gg.bind0 = function(ftn, ...args){return ftn.bind(undefined, ...args)}
gg.mapEmpl = function(map, name, obj){
  let ret = map[name];
  if(!ret){
    ret = der(obj);
    map[name] = ret;
  }
  return ret;
}
//#region time
gg.now = {
  get dt(){return new Date()},
  get mils(){return Date().now},
  get secs(){return (now.mils/1000).toFixed(3)},
  get tstr(){
    let now = new Date();
    return now.toLocaleTimeString('en-US', {hour12:false}) +
    `${(now.getMilliseconds()/1000).toString().substr(1)}`},
  get dtstr(){
    let now = new Date();
    return now.toLocaleString('en-US', {hour12:false}) +
    `${(now.getMilliseconds()/1000).toString().substr(1)}`}
}
//#endregion time
//#region mutation
const mutationObserverConfig = 
{ 
  attributes: true, 
  childList: true, 
  characterData:true,
  attributeOldValue:true,
  characterDataOldValue:true,
  subtree: true,
};

function mutationObserverCallback(mutationList, observer) {
  mutationList.forEach((mutation) => {
    switch(mutation.type) {
      default:
        console.log(mutation);
        break;
    }
  });
}
//#endregion mutation
//#region events
gg.evh = function evh(hdlr){
  return function(evt){
    if(evh.evtype[evt.type]){
      console.log(`===begin: ${now.tstr} ${evt.type} ${evt.data} on`)
      console.log(evt.target)
      console.dir(evt.target)
    }
    hdlr.call(this, evt);
    if(evh.evtype[evt.type]){
      console.log(`=====end ${evt.type}`)
    }
  }
}

gg.ftnhdr = function ftnhdr(ftnu){
  let hdr = {type: 'Ftn', name: ftnu.name, gsid:ngsid, ftnu, args:{map:{},list:[]}};
  let exp = esprima.parse('('+ftnu.toString()+')').body[0].expression;
  hdr.exp = exp;
  assert(hdr.exp.type === 'FunctionExpression')
  hdr.exp.params.forEach((arg, idx)=>{
    let ftnarg = {
      type:'FtnParam', name:arg.name ?? arg.left.name, idx, 
      argtype:'', ftnhdr: hdr, descs:[]}
    let right = arg.right;
    while(right) {
      let elem = right.left ?? right
      ftnarg.descs.push(elem.name ?? escodegen.generate(elem));
      right = right.right;
    }
    hdr.args.map[ftnarg.name] = ftnarg;
    hdr.args.list.push(ftnarg)
  })
  return hdr;
}

gg.tokener = function tokener(def){
  let lexer = moo.compile(def);
  let parse = function(text){
    assert(typeof text === 'string')
    lexer.reset(text);
    return Array.from(lexer, token=>{return {type:token.type, text:token.value}})
  };
  return {lexer, parse};
  /*
  var defs = Object.entries(def);
  var terms = defs.map(di => (di[1] instanceof RegExp)? `(${di[1].source})`:assert(false))
  let regstr = "";
  for(let i = 0; i < terms.length; i++) {
    regstr = terms.slice(0, i).join('|');
    retest = new RegExp(regstr + '|', )
  }
  return {regex: new RegExp(regstr, 'g')}
  */
}
gg.next_gsid = 1;
Object.defineProperty(gg, 'ngsid', {get(){return next_gsid++;}})


/*
let spldef = {scopes:['()', '[]', '{}'], splitters:[['=',':'], ',']}


function splatcher(def){
  const escaper = s=>s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

  var scope_opens = Object.fromEntries(def.scopes.map(scope=>[scope[0], scope]));
  var scope_closes = Object.fromEntries(def.scopes.map(scope=>[scope[1], scope]));;

  let splitters = {};
  
  def.splitters.forEach((splitter, i) => {
    let spl = (Array.isArray(splitter)) ? splitter : [splitter];
    spl.forEach(x=>splitters[x] = i)
  })

  const match_str = /(["'])(?:(?=(\\?))\2.)*?\1/;
  const match_sp = /\s+/;
  let match_regex = ''
  match_regex += `(${Object.entries(scope_opens).map(op=>escaper(op[0])).join('|')})`
  match_regex += `|(${Object.entries(scope_closes).map(cl=>escaper(cl[0])).join('|')})`
  match_regex += `|(${Object.entries(splitters).map(sp=>escaper(sp[0])).join('|')})`
  match_regex += `|([\\w\\.]+)`
  match_regex += `|(${match_str.source})|(${match_sp.source})`

  let regex = new RegExp(match_regex, "g")
  function splatch(string, callback){

  }
  return {splatch};
}

splatcher(spldef)

gg.ftnParser = /^(function|)\s*(\w*)\((((\s*(\w+)\s*(=\s*(\w+)\s*|))(,\s*(\w+)\s*(=\s*(\w+)\s*|))*)|)\)/
*/

//#endregion events