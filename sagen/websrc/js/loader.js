export function require(arg){
  if(arg === './lodash.js') {
    return globalThis._;
  }
}

function xxx(){
try{
  const loadjs = require;
}catch(ReferenceError){
  const srcName = src=>src.split('/').pop().replace(/\.js$/, "");
  globalThis.allModules = {};
  Object.defineProperties(globalThis, {module:{get(){
    let scripts = document.getElementsByTagName('script');
    let script = scripts[scripts.length - 1];
    let src = script.getAttribute('src');
    let name = srcName(src);
    return allModules[name];
  }}})
  globalThis.loadjs = function loadjs(src, done=(module)=>{}){
    let name = srcName(src);
    allModules[name] = {name, src, done};
    document.write('<script src="' + src + '"></scr' + 'ipt>');
    let allModulesName = `allModules["${name}"]`
    document.write(`<script type="javascript">' ${allModulesName}.done(${allModulesName});console.log('done loading ' + ${allModulesName});</scr' + 'ipt>`);
  }
  globalThis.require = function require(src){
    let name = srcName(src);
    return allModules[name].exports;
  };
}
}



//loadjs('js/lodash.js', (module)=>{module.exports = _})
//loadjs('js/utils.js')
//loadjs('js/sagen_lang.js')
//loadjs('js/sagen_runtime.js')
//loadjs('js/sagen.js')
//loadjs('js/webapp.js')
//
//loadjs = undefined;