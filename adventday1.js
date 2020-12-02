const fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'numbers.txt');

fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) =>{
    let nums = data.split("\n").map((x) => Number.parseInt(x));
    let answer = 0;

    for(let i = 0; i < nums.length; i++)
        if (nums.indexOf(2020 - nums[i]) > -1) {
            answer = nums[i] * (2020 - nums[i])
        }
    console.log(answer);
});