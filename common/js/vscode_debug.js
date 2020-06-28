#!/usr/bin/env node
let argv = require('yargs') // eslint-disable-line
let argv = require('~/priv/common/js/utils.js')
  .scriptName("Vscode Debug Launcher")
  .usage('$0 [args]')
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    describe: 'Verbose Logging'
  })
  .option('workspaceFolder', {
    alias: 'w',
    type: 'string',
    default: process.env.cwd
  })
  .option('file', {
    alias: 'f',
    type: 'string'
  })
  .option('targets', {
    type: 'array',
    default: []
  })
  .option('cfgspec', {
    type: 'string',
    default: 'cfgspec.js'
  })
  .help()
  .argv

const process = require('process');
const shell = require('shelljs');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const build = require('./cfgspec');
const { resolve } = require('path');
const { isNullOrUndefined } = require('util');
const { start } = require('repl');
const { string, showHidden } = require('yargs');
const { createSecretKey } = require('crypto');
const assert = console.assert;
const fread = file=>fs.readFileSync(file, {encoding:'utf8', flag:'r'})
const fext = file=>path.extname(file)

const rex_slash_str = `(${/\/\*dbg(.*?)\*\//.source.slice(1,-1)})|` +
                   `(${/\/\/dbg(.*?)$/.source.slice(1, -1)})`
const rex_slash = new RegExp(re_slash_str, 'g');
const rex_pound_str = `(${/^\s.*#dbg(.*?)$/.source.slice(1, -1)})`
const rex_pound = new RegExp(re_pound_str, 'g');
const spec_lines = (txt,re) => txt.matchAll(re).map(x=>(x[2]??x[4]).trim()).join('\n')

/*
const rex_debug_target = /^debug\s+(\w+)\s+(.*)$/
const rex_build_target = /^build\s+(.*)$/
const rex_jspec_target = /^jspec\s+(.*)$/
*/
function fspec(file){
  const filetxt = fread(file);
  const file_regexs = {'js':rex_slash, 'c':rex_slash, 'cpp':rex_slash, 
                 'h':rex_slash, 'hh':rex_slash, 'hpp':rex_slash}
  let spec = spec_lines(filetxt, [fext(file)]);
  if(spec){
    spec = JSON.parse(spec);
  }
  else
    spec = undefined;
  return spec;
}

const workspaceFolder = argv.workspaceFolder;

// target flow
var DepGraph = require('dependency-graph').DepGraph;
var deps = new DepGraph();
tgts = {};
srcs = {};
globalThis.mktgt = function mktgt(tgtname, ...tgtdeps){
  let _mktgt = name=>{
    let ret = tgts[name];
    if(!ret){
      ret = {name, type:name.startsWith("lib")?"lib":"exe", srcs:{}};
      tgts[name] = ret;
      deps.addNode(name);
    }
    return ret;
  }
  let ret = _mktgt(tgtname);
  tgtdeps.forEach(depname => {
    let dep = _mktgt(depname);
    deps.addDependency(tgtname, depname);
  })
  return ret;
}
function get_tgt(tgtname){
  let ret = tgts[tgtname];
  assert(ret);
  return ret;
}
function add_src(srcfile){
  let src = srcs[srcfile];
  if(!src){
    let relpath = path.relative(workspaceFolder, srcfile);
    src = {name:path.basename(srcfile), type:fext(srcfile), path:relpath, tgts:{}}
    srcs[srcfile] = src;

    let spec = fspec(srcfile);
    src.spec = spec;
    if(spec?.build){
      for(tgt in spec.build){
        tgt_add_src(tgt, src);
      }
    } else if(spec?.debug){
      for(tgt in spec.build){
        tgt_add_src(tgt, src);
      }
    } else assert(false);
  }
  return src;
}
function tgt_add_src(tgtname, srcfile){
  let src = add_src(srcfile);
  let tgt = tgts[tgtname];
  assert(tgt);
  tgt.srcs[srcfile] = src;
  src.tgts[tgtname] = tgt;
}

// Def Space
function ksp() {
  function obj_setkey(obj, key) {
    let ki = key, kc=undefined;
    while(ki) {
      ki.subkeys.forEach(subkey=>{
        if(subkey != kc)
          delete obj[subkey.name]
      })
      obj[ki.name] = {value:ksp[ki.name]}
      kc = ki;
      ki = ki.parent;
    }
    return obj;
  }
  function setkey(parent, key){
    let ptgt = parent.tgt;
    let obj = {...ptgt.obj};
    obj_setkey(obj, key);
    let tgt = {cls:ptgt.cls, obj, cur:key};
    let ret = new Proxy(tgt, ksp_hdlr);
    tgt.proxy = ret;
    return ret;
  }
  const methods = {
    addOption()
  }
  const ksp_hdlr = {
    get(tgt, prop, self){
      if(prop === 'tgt')
        return tgt;
      let method = methods[prop];
      if(method = methods[prop])
        return ftn.bind(self);
      let key = tgt.cls[prop]
      if(key){
        if(key.type === 'string')
          return methods.setkey.bind(self, key)
        else 
          return setkey(self, key, undefined)
      }
    }
  }
  let ret = new Proxy({}, ksp_hdlr);
  return ret;
}
let osp = new ksp();
globalThis.ds = optionspace(
  {
    scope:{global:osp.default, target:osp.string, file:osp.string}},

  }
  ["opt:scope", "hidden", {subopts:[

  ]}]:
);

ds.addOptions(
  {
    {option}
  scope:{type:'hidden', default:"global", {type:'option', target:{type:'string', file:{type:'string'}}}},
  compiler:{type:'hidden', clang:'',gcc:'',msvc:''},
  //tools:{cc:'string', cxx:'string', ld:'string'},
  arch:{all:'all', x64:'',arm:''},
  build_type:{all:'all', release:'',debug:''},
  filetype:{all:'all', c:'',cpp:''},
  stage:{all:'all', compile:'',link:''}
})

function parse_def(def){
  let str = def;
  let ret = {scope:undefined, op:undefined, arg:undefined, val:undefined, str:def}
  scoper = {file:0, global:0, target:0}
  for(scope in scoper) {
    if(def.startsWith(scope+':')){
      ret.scope = scope;
      
      ret.str = str = def.slice(scope.length+1);
      break;
    }
  }
  let terms = str.split('=');
  ret.op = terms[0];
  ret.val = terms.slice(1).join('=');
  if(ret.op.startsWith('-O')){
    ret.val = str.slice(2); ret.op = "-O";
  }
  else if(str.startsWith('-D')){
    ret.arg = ret.op.slice(2); ret.op = ret.op.slice(0, 2);
  }
  else if(str.startsWith('-U')){
    ret.arg = ret.op.slice(2); ret.op = ret.op.slice(0, 2);
  }
  else if(str.startsWith('-I')){
    ret.val = ret.op.slice(2); ret.op = ret.op.slice(0, 2);
  }
  else if(str.startsWith('-L')){
    ret.val = ret.op.slice(2); ret.op = ret.op.slice(0, 2);
  }
  else if(str.startsWith('-l')){
    ret.val = ret.op.slice(2); ret.op = ret.op.slice(0, 2);
  }
  return ret;
}
function defs(scoper, deflist){
  let ret = deflist.map(x=>parse_def(x));
}

file.set_target("libshink").fileflags("Mon");
globalThis.bs = {};
bs.compilers = {clang:{cc:"clang-10", cxx:"clang-10", ld:"clang-10"}}
bs.compiler = bs.compilers.clang;
bs.outdir = `build`
bs.flags = {}

defs("global.compiler", "-Dcc=clang-10 -Dcxx=clang-10, -Dld=clang-10") 

bs.clang = {cc:"clang-10", cxx:"clang-10", ld:"clang-10"}
bs.flags = {}
bs.flags.c.opts = ["-std=c17"]
bs.flags.cpp.opts = ["-std=c++2a"]
bs.flags.opts = ["-pthread", "-fPIC"]
bs.flags.include.opts = ["-I/usr/local/include", "-I/usr/include"]
bs.flags.debug.opts = ["-DDEBUG", "-O0", "-g", "-pthread", "-fPIC"]
bs.flags.release.opts = ["-DRELEASE", "-Os", "-flto", "-g", "-pthread", "-fPIC"]
bs.flags.link.opts = ["-L/usr/local/lib", "-L/usr/lib", "-ldl"]
bs.flags.link.debug.opts = [`-L${bs.outdir}/debug`]
bs.flags.link.release.opts = [`-L${bs.outdir}/release`]
bs.flags.link.hascpp.opts = ["-lstdc++"]

globalThis.dbgcfgs = {
  py(dbg){
    return {
      "name":"Python: Current File",
      "type":"python",
      "request":"launch",
      "program":dbg.file,
      "args": dbg.args ?? [],
      "console":"integratedTerminal"
    }
  },
  chrome(dbg){
    return {
      "name":"chrome",
      "type":"chrome",
      "request":"launch",
      "runtimeArgs": [
        "--window-position=1920,0", "--window-size=1280,1050",
        ...(dbg.runtimeArgs ?? [])],
      "url":dbg.url,
      "webRoot":dbg.webRoot??workspaceFolder
    }
  },
  node(dbg){
    return {
      "type": "node",
      "request": "launch",
      "name": "Launch JS",
      "skipFiles": [
          "<node_internals>/**"
      ],
      "runtimeArgs":["--harmony", "--max-old-space-size=8192", ...(dbg.runtimeArgs ?? [])],
      "program": dbg.file,
      "cwd":dbg.cwd ?? workspaceFolder,
      "args":dbg.argv ?? []
    }
  },
  lldb(dbg){
    return {
      "type": "lldb",
      "request": "launch",
      "name": "lldb cpp",
      "program":dbg.file,
      "args":dbg.argv ?? [],
    }
  }
}

function build_create_dirs(){
  shell.cd(`${workspaceFolder}`)
  shell.mkdir("-p", bs.outdir)
}

function build_prepare_targets(){
  let srcfiles = glob("**/*.{.h,.hh,.hpp,.ch,c,cpp,cc}");
  srcfiles.forEach(src=>{
    add_src(src);
  })
}

function compile_file(tgt, src, conf){
  if(conf === 'release') {
    dst = `${src}.${conf}.o`;
  }

  let flags = [...bs.flags.opts, ...bs.flags.include.opts, ...bs.flags[conf].opts]
  if(fext(src) === 'c') {
    flags.concat(...bs.flags.c.opts);
  } else {
    flags.concat(...bs.flags.cpp.opts);
  }

  bs.flags.link.opts = ["-L/usr/local/lib", "-L/usr/lib", "-ldl"]
  bs.flags.link.debug.opts = [`-L${bs.outdir}/debug`]
  bs.flags.link.release.opts = [`-L${bs.outdir}/release`]
  bs.flags.link.hascpp.opts = ["-lstdc++"]

  if(fext(src) === 'c'){
    
  } else {

  }
}

function build_target(tgt, conf) {
  Object.values(tgt.srcs).forEach(src=>{
    compile_file(tgt, src, conf);
  });
  link_target(tgt, conf);
}

function build_targets(to_build){
  to_build.forEach(tgt=>build_target(tgt, 'debug'));
  to_build.forEach(tgt=>build_target(tgt, 'release'));
}

function build(){
  //const cwd = process.env.cwd;
  build_create_dirs()
  const dbgfile = argv.file;
  var to_build = [...argv.targets]
  var dbg = undefined;
  if(dbgfile){
    dbgfile = path.relative(workspaceFolder, srcfile);
    var spec = fspec(dbgfile);
    if(spec){
      for(tgt in spec.build??{}){
        to_build.push(tgt)
      }
      if(spec.debug){
        dbg = spec.debug;
      }
      if(dbg.type in {lldb:1, gdb:1} && dbg.target){
        to_build.push(dbg.target);
      }
    }
    if(!dbg) {
      if(fext(spec) === 'js')
        dbg = {type:node, file:dbgfile}
      else if(fext(spec) === 'py')
        dbg = {type:py, file:dbgfile}
    }
  }
  
  if(to_build.length) {
    build_prepare_targets()
    deps.addNode('__to_build');
    to_build.forEach(tgt=>deps.addDependency('__to_build', tgt));
    to_build = deps.dependenciesOf('__to_build').map(tgt=>get_tgt(tgt));
    build_targets(to_build);
  }
}


// proj/src -> commands -> proj.dst, proj