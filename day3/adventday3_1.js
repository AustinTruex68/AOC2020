const fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'trees.txt');

fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) =>{
    const rows = data.split("\n");
    let coords = [3, 1];
        treeCnt = 0;

    for(let i= coords[1]; i < rows.length; i++)
        checkTree(rows[i], i);

    function checkTree(r, index) {
       const position = r.charAt(coords[0]);
       if(!position || position == ""){
           r+=r.replace(/(\r\n|\n|\r)/gm, "");
           checkTree(r, index);
       } else {
           coords[0] += 3;
           if(position === "#")
               treeCnt+=1;
       }
    }

    console.log(treeCnt);
});

