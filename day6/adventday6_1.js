const fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'answers.txt');

fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
    const surveys = data.split("\n");

    let answered = [];
    let alreadyYes = [];
    let total = [];

    for(let i = 0; i < surveys.length; i++){
        var p = surveys[i];
        for(let c = 0; c < p.length; c++){
           if(!alreadyYes.includes(p[c])){
               alreadyYes.push(p[c]);
               answered.push(1);
           }
        }
        if(p === "")
            calcAndResetGroup(answered);
    }

    function calcAndResetGroup(ans){
        total.push(ans.map(Number).reduce((p, v) => p + v))
        answered = [];
        alreadyYes = [];
    }

    console.log(total.map(Number).reduce((p, v) => p + v));
});