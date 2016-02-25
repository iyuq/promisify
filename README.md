# promisify
how to write a simple Promise/A+ promisify function

## 自己动手实现一个简单的Promise/A+的promisify函数
Node.js本身的函数没有Promise化，如果要每个函数去封装，将Node.js的每个异步方法都转化成Promise，这将是比较大的代码量，第三方库Bluebird等提供了promisify的函数。
但是，promisify这类的函数到底是如何实现的呢？其实探究其根本，无非是利用Javascipt高阶函数的特征，利用偏函数等，构建一个promisify函数，来减少每次promisify一个api函数的代码量。
我们先来看看如何将Node.js的fs.readFile函数封装成Promise:
```
var promisifyFS = function(path, encode){
    return new Promise(function(resolve, reject){
        fs.readFile(path, encode, function(err, result){
           if(err){
              return reject(err);
           }
           return resolve(result);
        });
    });
};

promisifyFS('file1.txt', 'utf8').then(function(file1){
    console.log(file1);
});

```
这是最简单的将fs.readFile包成Promise。
要将这个函数一般化，那我们必须将要promise化的方法当成一个参数传入，由于不同的函数接收的参数个数不一样，这样的话我们得用到method.apply()函数。
```
var promisify = function (method) {
    return function (ctx) {
    	//获取method调用的需要参数
        var args = Array.prototype.slice.call(arguments, 1);

        //返回一个新的Promise对象
        return new Promise(function (resolve, reject) {
        	//除了函数传入的参数以外还需要一个callback函数来供异步方法调用
            var callback = function () {
                return function (err, result) {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result);
                };
            }
            args.push(callback());
            //调用method
            method.apply(ctx, args);
        });

    };
};

var readFile = promisify(fs.readFile);
readFile(null, 'file1.txt', 'utf8').then(function (file1) {
    return readFile(null, file1.trim(), 'utf8');
}).then(function (file2) {
    console.log(file2);
});
```
这样，一个简单的promisify函数就实现了。
代码见github:https://github.com/iyuq/promisify.git


[^]: 参考文献：朴灵《深入浅出Node.js》
