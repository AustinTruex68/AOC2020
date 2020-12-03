const fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'trees.txt');

fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) =>{
    const rows = data.split("\n");
    const coords = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
    let incCoords = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
        treeCnt = 0;
        toMulti = [];

    for(let c = 0; c < coords.length; c++){
      for(let i= coords[c][1]; i < rows.length; i+=coords[c][1])
          checkTree(rows[i], incCoords[c], c);

        toMulti.push(treeCnt);
        treeCnt = 0;
    }
    function checkTree(r, c, ci) {
         const position = r.charAt(c[0]);
         if(!position || position == ""){
             r+=r.replace(/(\r\n|\n|\r)/gm, "");
             checkTree(r, c, ci);
         } else {
             c[0] += coords[ci][0];
             if(position === "#")
                 treeCnt+=1;
         }
      }

    const answer = toMulti.map(Number).reduce((p, v) => p * v);
    console.log(answer);
});

