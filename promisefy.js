
var promisefy = function (method) {
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

exports.promisefy = promisefy;
