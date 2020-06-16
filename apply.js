// apply方法  调用一个函数, 其具有一个指定的this值，以及作为一个数组（或类似数组的对象）提供的参数  (thisArg, [argsArray])

Function.prototype.apply = function(context, arr) {
  var fn = this,
      args = [],
      res;

  if (typeof(fn) !== 'function') {
    throw new TypeError('fn is not a function');
  }

  cosntext = context || window;
  context.fn = fn;

  if (!arr || !Array.isArray(arr)) {
    res = context.fn();
  } else {
    for (var i = 0; i < arr.length; i++) {
      arguments.push(arr[i]);
    };
    res = eval('context.fn('+ args.toString() +'))');    // es6 res = context.fn(...args);
  }

  delete context.fn;
  return res;
}

this.name = 'jiushijiang';

function a() {
  console.log(this.name);
}

a.apply();
