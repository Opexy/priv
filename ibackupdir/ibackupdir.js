var sqlite3 = require('sqlite3').verbose();
const path = require('path');
// namedfiles
let nf = {};
nf.manifest = process.argv[2];
nf.backupdir = path.dirname(nf.manifest);
console.log(nf.manifest, nf.backupdir);
var db = new sqlite3.Database(nf.manifest, sqlite3.OPEN_READONLY);

dirs = {};
db.all("select * from Files", [], (err, rows)=>{
  rows.forEach((row)=>{
    let {fileID, domain, relativePath} = row;
    let fileName = path.basename(relativePath);
    let filePath = row.domain + "/" + row.relativePath;
    let fileDir = path.dirname(filePath);
    let linkTgt = `${fileID.slice(0,2)}/${fileID}`
    let dir = dirs[fileDir] ?? (dirs[fileDir] = {});
    dir[fileName] = {fileName, filePath, linkTgt, file:row.file};
  })
  Object.entries(dirs).forEach(([dirname, dir])=>{
    console.log(`mkdir -p "${dirname}"`)
    Object.values(dir).forEach(file=>{
      if(file.filePath in dirs) return;
      console.log(`ln -s ${nf.backupdir}/${file.linkTgt} "${dirname}/${file.fileName}"`)
    })
  })
})