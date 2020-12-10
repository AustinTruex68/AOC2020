const fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'answers.txt');

fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
    const surveys = data.split("\n");
    const groups = buildGroups(surveys);

    let answered = [];
    let alreadyYes = [];
    alreadyCounted = [];
    let total = [];

    for (let i = 0; i < groups.length; i++) {
        let pplCnt = groups[i][groups[i].length - 1];
        for (let x = 0; x < groups[i].length - 1; x++) {
            var p = groups[i][x];
            if (pplCnt == 1 && !alreadyCounted.includes(p)) {
                answered.push(1);
                alreadyCounted.push(p);
                continue;
            }

            if(groups[i].filter(x => x==p).length >= pplCnt && !alreadyCounted.includes(p)){
                answered.push(1);
                alreadyCounted.push(p);
            } else
                answered.push(0);
        }

        calcAndResetGroup(answered);
    }


    function buildGroups(surveys) {
        let groups = [];
        let currentGroup = [];
        let ppl = 0;
        for (let i = 0; i < surveys.length; i++) {
            ppl++;
            if (surveys[i] === "") {
                currentGroup.push(ppl - 1);
                groups.push(currentGroup);
                currentGroup = [];
                ppl = 0;
            } else {
                for (let x = 0; x < surveys[i].length; x++) {
                    currentGroup.push(surveys[i][x]);
                }
            }
        }
        return groups;
    }

    function calcAndResetGroup(ans) {
        total.push(ans.map(Number).reduce((p, v) => p + v))
        answered = [];
        alreadyYes = [];
        alreadyCounted = [];
    }
    console.log(total.map(Number).reduce((p, v) => p + v));
});