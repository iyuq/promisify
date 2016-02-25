var fs = require('fs');
var promisify = require('./promisify').promisify;

var readFile = promisify(fs.readFile);
readFile(null, 'file1.txt', 'utf8').then(function (file1) {
    return readFile(null, file1.trim(), 'utf8');
}).then(function (file2) {
    console.log(file2);
});
