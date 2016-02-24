var fs = require('fs');

var promisefyFS = function(path, encode){
    return new Promise(function(resolve, reject){
        fs.readFile(path, encode, function(err, result){
           if(err){
              return reject(err);
           }
           return resolve(result);
        });
    });
};

promisefyFS('file1.txt', 'utf8').then(function(file1){
    console.log(file1);
});