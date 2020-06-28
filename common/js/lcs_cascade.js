const { assert } = require("console");

function lcs2(s1, s2) {
  for(var i = 0; i < s1.length; i++)
    if(s1[i] != s2[i])break;
  return i;
}
function lcs(strlist){
  let strarr = Array.from(Object.entries(strlist), ([k,v])=>v);
  let strl = Array.from(strarr, (str, idx)=>[idx, str, str, []]);
  let sort = ()=>strl.sort((a, b)=>a[2].localeCompare(b[2]));
  sort();
  let len = strarr.length;
  let lst = [];
  let remainder = [];
  let si = 0;
  let changed = true;
  let proc = ()=>{
    for(var group_last = len - 1; group_last > si; group_last--){
      var lcs = lcs2(strl[si][2], strl[group_last][2]);
      if(lcs > 5)
        break;
    }
    if(lcs > 5) {
      for(let ii = si; ii <= group_last; ii++){
        changed = true;
        let item = strl[ii];
        item[3].push(item[2].slice(0, lcs));
        item[2] = item[2].slice(lcs);
      }
    }
    si = group_last +1;
    
    if(si < len - 1)
      proc();
  }
  
  while(changed) {
    changed = false;
    si = 0;
    proc();
    sort();
  }
  let strmap = {};
  strl.forEach(item=>{
    if(item[2])
      item[3].push(item[2]);
    item[2]=""
    item.push([]);
    item[3].forEach(key=>{
      let entry = strmap[key];
      if(!entry) {
        entry = {key, count:0};
        strmap[key] = entry;
      }
      entry.count++;
      item[4].push(entry);
      item.push(key);
    })
  })
  strl.sort((a, b)=>a[0]-b[0]); // sort back to list of string order

  let nc = 1; // name count
  let kp = 'k'; // key prefix
  let defs = {};
  strl.forEach(item=>{
    item[4].forEach(item=>{
      if(item.count > 1 && item.name === undefined) {
        item.name = kp + nc++
        defs[item.name] = `"${item.key}"`;
      }
    })
  })
  strl.forEach(item=>{
    item[0] = Object.entries(strlist)[item[0]][0]
    defs[item[0]] = Array.from(item[4], elem=>elem.count == 1? `"${elem.key}"`:`${elem.name}`).join(' + ');
  })
  
  return {strl, strmap, defs};
}
let paths = {
  popularity:"#special_bg > div:nth-child(3) > div.ui-left.works-intro-wr > div.works-intro.clearfix > div.works-intro-detail.ui-left > div.works-intro-text > p.works-intro-digi > span:nth-child(2) > em",
  author:"#special_bg > div:nth-child(3) > div.ui-left.works-intro-wr > div.works-intro.clearfix > div.works-intro-detail.ui-left > div.works-intro-text > p.works-intro-digi > span.first > em",
  blackvote:"#special_bg > div:nth-child(3) > div.ui-left.works-intro-wr > div.works-vote.clearfix > ul > li:nth-child(2) > strong",
  score:"#special_bg > div:nth-child(3) > div.ui-left.works-intro-wr > div.works-intro.clearfix > div.works-intro-detail.ui-left > div.works-intro-text > div.works-score.clearfix > p > strong",
  scoreWeight:"#special_bg > div:nth-child(3) > div.ui-left.works-intro-wr > div.works-intro.clearfix > div.works-intro-detail.ui-left > div.works-intro-text > div.works-score.clearfix > p > span",
  title:"#special_bg > div:nth-child(3) > div.ui-left.works-intro-wr > div.works-intro.clearfix > div.works-intro-detail.ui-left > div.works-intro-text > div.works-intro-head.clearfix > h2 > strong",
  sign:"#special_bg > div:nth-child(3) > div.ui-left.works-intro-wr > div.works-intro.clearfix > div.works-intro-detail.ui-left > div.works-intro-text > div.works-intro-head.clearfix > i.ui-icon-sign",
  buyout:"#special_bg > div:nth-child(3) > div.ui-left.works-intro-wr > div.works-intro.clearfix > div.works-intro-detail.ui-left > div.works-intro-text > div.works-intro-head.clearfix > i.ui-icon-bout",
  exclusive:"#special_bg > div:nth-child(3) > div.ui-left.works-intro-wr > div.works-intro.clearfix > div.works-intro-detail.ui-left > div.works-intro-text > div.works-intro-head.clearfix > i.ui-icon-exclusive",
  fav:"#coll_count",
  redvote:'#redcount',
}
let result = lcs(paths);
let str = '(()=>{\n  '+
Object.entries(result.defs).map(([k, v])=>`const ${k} = ${v};`).join('\n  ')
+ `\n  return {${Object.entries(paths).map(entry=>entry[0]).join(',')}}})()`;
console.log(str);


let page = {
  link:"body > div.ui-wm.ui-mb40.ui-mt40.clearfix > div.ret-main-wr.ui-mb40.ui-left > div > div.ret-search-result > ul > li:nth-child(1) > div.ret-works-info > h3 > a",
  author:"body > div.ui-wm.ui-mb40.ui-mt40.clearfix > div.ret-main-wr.ui-mb40.ui-left > div > div.ret-search-result > ul > li:nth-child(1) > div.ret-works-info > p.ret-works-author",
  tags:"body > div.ui-wm.ui-mb40.ui-mt40.clearfix > div.ret-main-wr.ui-mb40.ui-left > div > div.ret-search-result > ul > li:nth-child(1) > div.ret-works-info > p.ret-works-tags",
  renqi:"body > div.ui-wm.ui-mb40.ui-mt40.clearfix > div.ret-main-wr.ui-mb40.ui-left > div > div.ret-search-result > ul > li:nth-child(1) > div.ret-works-info > p.ret-works-tags > span > em",
}
result = lcs(page);
str = '(()=>{\n  '+
Object.entries(result.defs).map(([k, v])=>`const ${k} = ${v};`).join('\n  ')
+ `\n  return {${Object.entries(paths).map(entry=>entry[0]).join(',')}}})()`;
console.log(str);

assert(false);