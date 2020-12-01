const fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'numbers.txt');

fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) =>{
    let nums = data.split("\n").map((x) => Number.parseInt(x));
    let answer = 0;
    for(let i = 0; i < nums.length; i++)
        for(let x = 0; x < nums.length; x++)
                if((nums[i] + nums[x]) === 2020){
                    answer = (nums[i] * nums[x]);
                    break;
                }
    console.log(answer);
});