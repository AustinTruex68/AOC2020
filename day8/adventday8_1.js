const fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'game.txt');

fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
    const lines = data.split("\n");
    let indexsRan = [];
    let accumulator = 0;
    for(let i = 0; i < lines.length; i++){
        let cmd = lines[i].split(" ")
        if(indexsRan.includes(i)){
            console.log("***** DONE");
            console.log(accumulator);
            return;
        }
        indexsRan.push(i);
        switch (cmd[0]){
            case 'acc':
                accumulator += Number(cmd[1]);
                break;
            case 'jmp':
                i = i + Number(cmd[1] - 1);
                break;
            default:
                break;
        }
    }
});