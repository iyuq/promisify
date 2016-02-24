var fs = require('fs');
var promisefy = require('./promisefy').promisefy;

var readFile = promisefy(fs.readFile);
readFile('file1.txt', 'utf8').then(function (file1) {
    return readFile(file1.trim(), 'utf8');
}).then(function (file2) {
    console.log(file2);
});