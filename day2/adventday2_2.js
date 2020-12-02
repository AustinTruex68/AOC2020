const fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'passwords.txt');

fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) =>{
    let passSpecs = data.split("\n");
    let validCnt = 0;
    for(let i = 0; i < passSpecs.length; i++){
        const p = passSpecs[i];
              pos1 = Number(p.split(" ")[0].split("-")[0]);
              pos2 = Number(p.split(" ")[0].split("-")[1]);
              char = p.split(" ")[1].replace(":", "");
              pass = p.split(" ")[2];

        if(pass.charAt(pos1 - 1) === char && pass.charAt(pos2 - 1) !== char ||
           pass.charAt(pos1 - 1) !== char && pass.charAt(pos2 - 1) === char)
            validCnt++;

    }
    console.log(validCnt);
});