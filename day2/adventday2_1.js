const fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'passwords.txt');

fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) =>{
    let passSpecs = data.split("\n");
    let validCnt = 0;
    for(let i = 0; i < passSpecs.length; i++){
        const p = passSpecs[i];
              min = Number(p.split(" ")[0].split("-")[0]);
              max = Number(p.split(" ")[0].split("-")[1]);
              char = p.split(" ")[1].replace(":", "");
              pass = p.split(" ")[2];

        const re = new RegExp(char, 'g');
        const count = (pass.match(re) || []).length;

        if(count <= max && count >= min)
            validCnt++;
    }
    console.log(validCnt);
});