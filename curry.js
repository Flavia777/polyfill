// 柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。

function curry(fn, ...arg1) {
  if(fn.length < arg1.length) {
    return fn(...arg1);
  } else {
    return function(arg2) {
      return curry(fn, ...arg1, ...arg2);
    }
  }
}