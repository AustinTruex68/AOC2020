const fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'answers.txt');

fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
    const surveys = data.split("\n");

    console.log(surveys);
});