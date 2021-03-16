import {isBrowser, ReadSource, SourceGen} from './src_editor.js'
function sage_gen_main(){
  if(isBrowser()){
    var uri = "../../" + "libsage/include/libsage_flow.hh";
  }else {
    var uri = process.argv[2] ?? "libsage/include/libsage_flow.hh"
  }
  ReadSource(uri).then
    (doc=>SourceGen(doc));
}
sage_gen_main();