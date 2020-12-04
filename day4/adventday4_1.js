const fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'passports.txt');

fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) =>{
    const pp = data.split("\n\n");
   for(let i = 0; i < pp.length; i++){
       let p = pp[i];
       if(p.indexOf("byr") > -1 &&
          p.indexOf("iyr") > -1 &&
          p.indexOf("eyr") > -1 &&
          p.indexOf("hgt") > -1 &&
          p.indexOf("hcl") > -1 &&
          p.indexOf("ecl") > -1 &&
          p.indexOf("pid") > -1)
           valid +=1;
   }
   console.log(valid);
});