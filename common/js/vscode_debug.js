#!/usr/bin/env node
const process = require('process');
const shell = require('shelljs');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const merge = require('deepmerge');
const async = require('async');
const assert = console.assert;
const fread = file=>fs.readFileSync(file, {encoding:'utf8', flag:'r'})
const fext = file=>path.extname(file)
let procline = [process.argv0, ...process.execArgv, ...process.argv.slice(1)];
console.log(procline.join(" "));
// cuda, webassembly, and file dependency.
let wcwd = undefined;
let sh = {
  mkdir(path){
    try{shell.mkdir("-p", path.abspath ?? path )}catch(e){
      let stats = fs.lstatSync(path.abspath);
      if(!stats.isDirectory()){
        assert(false);
      }
    }},
  cd(ctxt, cwd){
    if(!cwd.cwdpath){
      cwd = new Wfile(path.relative(workspaceFolder, cwd));
    }
    shell.cd(cwd.abspath);
    wcwd = path.join(workspaceFolder, cwd.relpath)
  },
  exec(cmd){
    if(isArray(cmd))cmd = cmd.join(" ");
    console.log(cmd);
    let ret = shell.exec(cmd);
    return {code:ret.code, stdout:ret.stdout, stderr:ret.stderr};
  },
  async execAsync(cmd, cb){
    if(isArray(cmd))cmd = cmd.join(" ");
    console.log(cmd);
    return shell.exec(cmd, cb);
  }
}

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
    default: process.cwd()
  })
  .option('file', {
    alias: 'f',
    type: 'string'
  })
  .option('targets', {
    type: 'array',
    default: []
  })
  .option('buildspec', {
    type: 'string',
    default: 'buildspec.js'
  })
  .help()
  .argv

const workspaceFolder = argv.workspaceFolder;
const mkSpec = require('./ksp.js');
const { isArray } = require('util');
const rex_slash_str = `(${/\/\*dbg(.*?)\*\//.source})|` +
                   `(${/\/\/dbg(.*?)\n/.source})`
const rex_slash = new RegExp(rex_slash_str, 'gm');
const rex_pound_str = `(${/^\s.*#dbg(.*?)$/.source})`
const rex_pound = new RegExp(rex_pound_str, 'g');
const spec_lines = (txt,re) => {
  let result = [...txt.matchAll(re)];
  return result.map(x=>(x[2]??x[4]).trim()).join('\n')}
//const build = require('./cfgspec');

/* GEN++ */
// GEN--
const rex_debug_target = /^debug\s+(\w+)\s+(.*)$/
const rex_build_target = /^build\s+(.*)$/
const rex_jspec_target = /^jspec\s+(.*)$/

function srcspec(file){
  const filetxt = fread(file);
  const file_regexs = {
    '.js':rex_slash, '.c':rex_slash, '.cpp':rex_slash, '.cc':rex_slash, 
    '.h':rex_slash, '.hh':rex_slash, '.hpp':rex_slash}
  const srctypes = {
    '.cpp':"cpp", ".cc":"cpp", ".c":"c"
  };
  let src = new Wfile(file)
  src.set({srctype:srctypes[src.ext],filetxt});
  let re = file_regexs[src.ext];
  if(!re) return src;
  let spec = spec_lines(filetxt, re);
  if(spec){
    let specer = new Function("src", spec);
    src.set({specer});
    specer(src);
  }
  return src;
}

class Props{
  props = {}
  protos = {}
  addProps(propspec){
    Object.assign(this.protos, propspec);
    for(let prop in propspec) {
      let access = this.protos[prop];
      this.props[prop] = this.protos[prop].init;
      Object.defineProperty(this, prop, {
        get(){
          let val = access.onGet ? access.onGet.call(this, this.props[prop]):
            this.props[prop];
          return val;
        }, set(val){
          this.props[prop] = access.onSet ? access.onSet.call(this, val, this.props[prop]): val;
          return true;
        }})
    }
  }
  setProps(propspec){
    let to_init = {}
    let to_merge = {};
    forEach(propspec, (val, key)=>{
      if(key in this.props) to_merge[key] = val;
      else to_init[key] = {init:val}
    })
    this.addProps(to_init);
    Object.assign(this.props, merge(this.props, to_merge));
  }
  set(...args) {
    let obj = args[args.length - 1];
    args.slice(0,-1).forEach(x=>{
      assert(!isObject(x))
      obj = {[x]:obj};
    });
    if(!isObject(obj))
      obj = {[obj]:obj};
    this.setProps(obj);
  }
}
class Obj {
  set(...args){
    let obj = args[args.length - 1];
    args.slice(0,-1).forEach(x=>{
      assert(!isObject(x))
      obj = {[x]:obj};
    });
    if(!isObject(obj))
      obj = {[obj]:obj};
    Object.assign(this, merge(this, obj));
  }
}
class Wfile extends Obj{
  constructor(relpath){
    super();
    let rp = relpath;
    if(isArray(relpath)) {
      rp = ()=>path.join(...relpath.map(x=>x.relpath ?? x));
    }
    Object.defineProperty(this, "relpath", (typeof rp === 'function')?
      {get:rp}:{value:rp})
  }
  get ext(){return fext(this.relpath);}
  get abspath(){return path.join(workspaceFolder, this.relpath)}
  get cwdpath(){return path.relative(wcwd, this.abspath) || "."};
}

class Ctxt extends Props{
  constructor(){
    super();
    process.chdir(workspaceFolder);
    this.addProps({
      buildspec:{init:argv.buildspec},
      dbgsrc:{},
      arch:{init:"x64"},
      opsys:{init:"linux"},
      tgtsToBuild:{init:{}},
      tgts:{init:{}},
      compilertype:{init:"clang"},
      tgtToDebug:{onSet(tgt){tgt.debug=true; return tgt;}},
    })
    this.extends = {};
    this.builddir = new Wfile("build");
    // TODO: outdir has to be dynamic. All async functions has to receive ctxt.
    this.dbgsrc = argv.file;
    this.cwd = process.cwd();
  }
  
  outdir(buildtype=this.buildtype){return new Wfile([this.builddir, buildtype])}

  extend(name, spec){return mapinit(this.extends, name, 
    ()=>Object.assign(Object.create(this), spec))}
  addTarget(tgt){return mapval(this.tgts, tgt, (old)=>{
    if(old)return old;
    let targettype = "bin"
    let outfile = tgt;
    if(tgt.toLowerCase().startsWith("lib")){
      targettype = "lib";
      outfile = `${tgt}.so`;
    } 
    let target = {
      tgtName:tgt, targettype, srcs:{}, srctypes:{}, outfile,
      beforeCompile:['ctxt'], beforeLink:[]}
    return target;
  })}
  addTargetToBuild(tgt){
    let ret = this.addTarget(tgt); 
    ret.toBuild = true;
    this.tgtsToBuild[tgt]=ret;
    return ret;
  }
  tgt(tgtname){return this.tgts[tgtname]};
}

let compilerspec = mkSpec({
    arch:["x64"],
    opsys:["linux"],
    buildtype:["release", "debug"],
    compilertype:["clang", "gcc", "msvc"],
    target:{},
    bintype:["bin", "lib"],
    src:{},
    compilelink:["compile", "link"],
    srctype:["c","cpp"],
}), {query, ksAddVal:defs, pb:bs} = compilerspec;

defs(bs.clang.c, {exe:"clang-10"});
defs(bs.clang.cpp, {exe:"clang++-10"});
defs(bs.clang.link, {exe:"clang-10"});
defs(bs.compile, {flags:["-c"]})
defs(bs.c, {flags:["-std=c17"]})
defs(bs.cpp, {flags:["-std=c++2a"]})
defs(bs.compilelink, {flags: ["-pthread", "-fPIC"]})
defs(bs.compilelink.debug, {flags:[`-DDEBUG`,`-DBuildType="Debug"`,`-g`,`-O0`]})
defs(bs.compilelink.release, {flags:[`-DRELEASE`, '-O2', "-flto"]})
defs(bs.linux.compile, {flags:["-I/usr/local/include", "-I/usr/include"]})
defs(bs.linux.link, {flags:["-L/usr/local/lib", "-L/usr/lib", "-ldl", (ctxt)=>`-L${ctxt.outdir().cwdpath}`]})
defs(bs.link.cpp, {flags:["-lstdc++"]})
defs(bs.link.lib, {flags:["-shared"]})

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
      "cwd":dbg.cwd ?? workspaceFolder,
      "args":dbg.argv ?? [],
    }
  }
}

function load_project_defs(ctxt){
  forEach(ctxt.tgtsToBuild, tgt=>{
  })
  try{require(ctxt.buildspec)}catch{
    console.log("no buildspec found")
    let libvfldb = ctxt.addTarget("libvfldb");
    let vfldb_benchmark = ctxt.addTarget("vfldb_benchmark");
    defs(bs.target("vfldb_benchmark").link, {flags:["library:libvfldb.so"]}), 
    vfldb_benchmark.beforeLink.push(libvfldb.tgtName);
  }
}

async function build_prepare_targets(ctx){
  load_project_defs(ctx);
  let srcfiles = glob.sync("**/*.{.h,.hh,.hpp,.ch,c,cpp,cc}");
  await async.eachOfLimit(srcfiles, 10, (file, idx, cb)=>{
    let src = srcspec(file);
    forEach(src.build, tgtName=>{
      let target = ctx.tgt(tgtName);
      target.srcs[src.relpath] = src;
      //target.beforeLink.push(`${tgtName}:${src.relpath}`)
      target.srctypes[src.srctype] = src.srctype;
    })
    cb(null);
  })
  let spec = {ctxt:undefined};
  let to_build = ctx.tgtsToBuild;
  forEach(to_build, (tgt)=>{
    let {tgtName} = tgt;
    let compiles = {}
    spec[`${tgtName}:beforeCompile`] = [...tgt.beforeCompile, (res, cb)=>{cb(null);}];
    forEach(tgt.srcs, (src)=>{
      compiles[`${tgtName}:${src.relpath}`] = [`${tgtName}:beforeCompile`, (res, cb)=>{
        let ctxt = res.ctxt;
        let result = compile_file(cb, ctxt, tgt, src);
      }]
    })
    Object.assign(spec, compiles);
    spec[`${tgtName}:beforeLink`] = [...tgt.beforeLink, ...Object.keys(compiles), (res, cb)=>cb(null)];
    spec[tgtName] = [`${tgtName}:beforeLink`, (res, cb)=>{
      let ctxt = res.ctxt;
      let outfiles = Object.keys(compiles).map(x=>res[x].objfile);
      link_target(cb, ctxt, tgt, outfiles);
    }]
  })
  return spec;
}

const rex_flags = /(-O|-D|-U|-I|-L|-l|-c|-o|-std|library:|-shared|-g|-flto|-fPIC|-pthread)(((.*?)=(.*))|(.*))/
function add_flags(ctxt, props, flags) {
  const flagproc = {
    '-O'(argv){
      props.set(nf("optimization", argv[0], {val:argv[2]}))
    }, '-D'(argv){
      props.set({define:nf(argv[4]??argv[6], argv[0], {val:argv[5]??""})})
      delete props?.undef?.[argv[4]]
    }, "-U"(argv){
      props.set({undef:nf(argv[6], argv[0])})
      delete props?.define?.[argv[6]]
    }, "-I"(argv){
      props.set({include_dir:nf(argv[2], argv[0])})
    }, "-L"(argv){
      props.set({link_dir:nf(argv[2], argv[0])})
    }, "-l"(argv){
      props.set({link_lib:nf(argv[2], argv[0])})
    }, "-std"(argv){
      props.set(nf(argv[1], argv[0]))
    }, "-shared"(argv){
      props.set(nf(argv[0], argv[0]))
    }, "library:"(argv){
      props.set(nf(argv[2], new Wfile([ctxt.outdir(), argv[2]]).cwdpath))
    }
  }
  flags.forEach(elem=>{
    if(typeof elem === 'function')
      elem = elem(ctxt);
    let argv = elem.trim().match(rex_flags);
    let proc = flagproc[argv[1]];
    if(proc)
      proc(argv); 
    else 
      props.set(nf(argv[1], argv[0]))
  })
}
const nf = (kstr, flag=kstr, args) => {return {[kstr]:{kstr, flag, ...args}}}

async function link_target(cb, ctxt, tgt, outfiles){
  let linkline = new Props();
  //sh.cd(ctxt, ctxt.outdir);
  query([{target:tgt.tgtName}, "link", ...Object.keys(tgt.srctypes), tgt.targettype,
    ctxt.compilertype, ctxt.arch, ctxt.opsys, ctxt.buildtype],
  function parseArgs(entry){
    forEach(entry.roval, (val, key)=>{
      if(key === "flags") {
        add_flags(ctxt, linkline, val);
      } else {
        linkline[key] = val;
      }
    })
    console.log(`link matches: ${entry.rk.rkstr} => ${JSON.stringify(entry.roval)}`)
  })
  let flags = [];
  
  let outfile = new Wfile([ctxt.outdir(), tgt.outfile]);
  linkline.set(nf("output", `-o ${outfile.cwdpath}`));
  traverse(linkline.props, (val, key)=>{
    if(val?.flag) flags.push(val.flag);})
    linkline.set({flagslist:flags})
  let linkcmd = [linkline.exe, ...linkline.flagslist, ...outfiles.map(src=>src.cwdpath)]
  return sh.execAsync(linkcmd, (code, stdout, stderr)=>{
    if(code)
      console.error(val.error);
    cb(code, {code, stdout, stderr, outfile});})
}

async function compile_file(cb, ctxt, tgt, src){
  //let compile = src;
  let compileline = new Props();
  compileline.set({src:src.cwdpath});
  query([{target:tgt.tgtName, src:src.file},"compile", src.srctype, ctxt.compilertype, ctxt.arch, ctxt.opsys, ctxt.buildtype],
    function parseArgs(entry){
      forEach(entry.roval, (val, key)=>{
        if(key === "flags") {
          add_flags(ctxt, compileline, val);
        } else {
          compileline[key] = val;
        }
      })
      console.log(`matches: ${entry.rk.rkstr} => ${JSON.stringify(entry.roval)}`)
  })
  
  let outfile = new Wfile([ctxt.outdir(), `${src.relpath}.o`])
  compileline.set(nf("output", `-o ${outfile.cwdpath}`));
  let flags = [];
  traverse(compileline.props, (val, key)=>{
    if(val?.flag) flags.push(val.flag);})
  compileline.set({flagslist:flags})

  let compilecmd = [compileline.exe, ...compileline.flagslist, compileline.src]
  return sh.execAsync(compilecmd, (code, stdout, stderr)=>{
    if(code)
      console.error(val.error);
    cb(code, {code, stdout, stderr, objfile:outfile});})
}

function perform_build(ctxt, buildspec, buildtype){
  ctxt = Object.create(ctxt, {buildtype:{enumerable:true,value:buildtype}});
  let cfg = cb=>{
    sh.cd(ctxt, workspaceFolder)
    sh.mkdir("/tmp/build");
    sh.mkdir(ctxt.outdir())
    cb(null, ctxt)};
  buildspec = Object.assign({}, buildspec, {ctxt:cfg});
  return async.auto(buildspec);
}

async function build(){
  let ctxt = new Ctxt();
  sh.cd(ctxt, workspaceFolder);
  //const cwd = process.env.cwd;
  forEach(argv.targets, tgt=>ctxt.addTargetToBuild(tgt));
  if(ctxt.dbgsrc){
    ctxt.dbgsrc = path.relative(workspaceFolder, ctxt.dbgsrc);
    var spec = srcspec(ctxt.dbgsrc);
    ctxt.dbgspec = {};
    forEach(spec.build, tgt=>{
      ctxt.tgtToDebug = ctxt.addTargetToBuild(tgt);
      ctxt.dbgspec.file = tgt;
    })
    if(spec.debug){
      ctxt.tgtToDebug = ctxt.addTargetToBuild(spec.debug[0]);
      ctxt.dbgspec.file = new Wfile([ctxt.outdir("debug"), ctxt.tgtToDebug.outfile]).relpath;
    }
  }
  
  if(sizeof(ctxt.tgtsToBuild)) {
    var buildspec = await build_prepare_targets(ctxt);
    let debug = perform_build(ctxt, buildspec, "debug");
    let release = perform_build(ctxt, buildspec, "release");
    await debug;
    await release;
  }
  console.log("---launch_config---\n")
  console.log(JSON.stringify(dbgcfgs.lldb(ctxt.dbgspec)))
}
build();

//function exitHandler(options, exitCode) {
//  if (options.cleanup) console.log('clean');
//  if (exitCode || exitCode === 0) console.log(exitCode);
//  if (options.exit) process.exit();
//}
//
////do something when app is closing
//process.on('exit', exitHandler.bind(null,{cleanup:true}));
//
////catches ctrl+c event
//process.on('SIGINT', exitHandler.bind(null, {exit:true}));
//
//// catches "kill pid" (for example: nodemon restart)
//process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
//process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));
//
////catches uncaught exceptions
//process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
//
//// proj/src -> commands -> proj.dst, proj