// 函数式编程compose，按照传入的函数的逆序来执行，后一个函数的结果作为前一个函数的参数
// 即组合  例如：
var compose = function(f,g) {
  return function(x) {
    return f(g(x));
  };
};


function compose() {
  var funcs = Array.prototype.slice.call(arguments);
  if(!funcs || funcs.some(item => typeof item !== 'function')) {
    throw new TypeError();
  }
  var index = funcs.length - 1;
  return function() {
    var args = Array.prototype.slice.call(arguments);
    var result = args[index](...args);
    while (index--) {
      result = funcs[index](result);
    }
    return result;
  }
}