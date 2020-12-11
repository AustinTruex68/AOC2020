const fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'game.txt');

fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
    const rawLines = data.split("\n");

    for(let i = 0; i < rawLines.length; i++){
        let lineDupe = [...rawLines];
        let cmd = lineDupe[i].split(" ");

        if(cmd[0] == 'jmp'){
            lineDupe[i] = lineDupe[i].replace('jmp', 'nop');
            let check = checkGameScript(lineDupe);
            if(check){
                console.log("Correct Accumulator: " + check);
                break;
            }
        } else if(cmd[0] == 'nop'){
            lineDupe[i] = lineDupe[i].replace('nop', 'jmp');
            let check = checkGameScript(lineDupe);
            if(check){
                console.log("Correct Accumulator: " + check);
                break;
            }
        }
    }

    function checkGameScript(lines) {
        let indexsRan = [];
        let accumulator = 0;
        for (let i = 0; i < lines.length; i++) {
            let cmd = lines[i].split(" ")
            if (indexsRan.includes(i)) {
                console.log("Err *");
                return false;
            }
            indexsRan.push(i);
            switch (cmd[0]) {
                case 'acc':
                    accumulator += Number(cmd[1]);
                    break;
                case 'jmp':
                    i = i + Number(cmd[1] - 1);
                    break;
                default:
                    break;
            }

            if(i === lines.length - 1){
                return accumulator;
            }
        }
    }
});