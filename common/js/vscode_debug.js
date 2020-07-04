#!/usr/bin/env node
let argv = require('yargs') // eslint-disable-line
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
const assert = console.assert;
const fread = file=>fs.readFileSync(file, {encoding:'utf8', flag:'r'})
const fext = file=>path.extname(file)

const keySpace = require('~/priv/common/ksp_rework.js')
const rex_slash_str = `(${/\/\*dbg(.*?)\*\//.source.slice(1,-1)})|` +
                   `(${/\/\/dbg(.*?)$/.source.slice(1, -1)})`
const rex_slash = new RegExp(re_slash_str, 'g');
const rex_pound_str = `(${/^\s.*#dbg(.*?)$/.source.slice(1, -1)})`
const rex_pound = new RegExp(re_pound_str, 'g');
const spec_lines = (txt,re) => txt.matchAll(re).map(x=>(x[2]??x[4]).trim()).join('\n')

const workspaceFolder = argv.workspaceFolder ?? ".";

class Source extends Key({properties:{
  
}}){
  
}

//const build = require('./cfgspec');


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
    specer = new Function("bsfile", "env", spec);
  }
  else
    spec = undefined;
  return spec;
}
const rex_flags = /(-O|-D|-U|-I|-L|-l|-std|-g|-flto|-fPIC|-pthread)((.*)=?(.*))/
class CompilerContext{
  optimization = {};
  define={};
  undef={};
  include_dir={};
  link_dir={};
  link_lib={};
  add_flags(flags, info){
    let argv = [];
    const set = (prop, val) => 
      this[prop] = {idx:this.idx++, val, opt:argv[0], info}
    const setkvp = (prop, key, val) => 
      this[prop][key] = {idx:this.idx++, val, opt:argv[0], info}
    const remove = (prop, key) => 
      delete this[prop][key];
    const flagproc = {
      '-O':{proc(argv){
        ctx.set("optimization", argv[2])}},
      '-D':{proc(argv){
        ctx.setkvp("define", argv[3], argv[4])
        ctx.remove("undef", argv[3])
      }},
      '-U':{proc(argv){
        ctx.setkvp("undef", argv[3])
        ctx.remove("define", argv[3])
      }},
      '-I':{proc(argv){
        ctx.setkvp("include_dir", argv[3])
      }},
      '-L':{proc(argv){
        ctx.setkvp("link_dir", argv[3])
      }},
      '-l':{proc(ctx, argv){
        ctx.setkvp("link_lib", argv[3])
      }}
    }
    flags.forEach(elem=>{
      argv = elem.trim().match(rex_flags);
      flagproc[argv[1]]();
    })
  }
}

let compiler = new keySpace(), ksp=compiler.proto, bs = compiler.pb, 
defs = ksp.setRuleKivo, xtr = ksp.valXstr;
compiler.addKeys({
  arch:["x64"],
  opsys:["linux"],
  buildtype:["release","debug"],
  compiler:["clang", "gcc", "msvc"],
  target: [ksp.DynamicKey()],
  src: [ksp.DynamicKey()],
  compilelink:[{compile:["c", "cpp"]}, "link"]
})
compiler.designMode = false;

defs(bs.clang, {cc:"clang-10", cxx:"clang++-10", ld:"clan"})
defs(bs.c, {flags:["-std=c17"]})
defs(bs.cpp, {flags:["-std=c++2a"]})
defs(bs.compilelink, {flags: ["-pthread", "-fPIC"]})
defs(bs.compilelink.debug, {flags:[`-DDEBUG`,`-g`,`-O0`]})
defs(bs.compilelink.release, {flags:[`-DRELEASE`, '-Os', "-flto"]})
defs(bs.linux.compile, {flags:["-I/usr/local/include", "-I/usr/include"]})
defs(bs.linux.link, {flags:["-L/usr/local/lib", "-L/usr/lib", "-ldl", xtr`-L${outdir}`]})
defs(bs.linux.link, {flags:["-lstdc++"]})

console.log("---launch_config---\n")

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