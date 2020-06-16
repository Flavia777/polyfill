// reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值
// reduce() 可以作为一个高阶函数，用于函数的 compose。
// reduce() 对于空数组是不会执行回调函数的

Array.prototype.reduce = function(fn, init) {
  if(!fn || typeof fn !== "function") {
    throw new TypeError('fn is not a function');
  }
  var context = this;
  if (!context || !Array.isArray(context)) {
    throw new TypeError(context + 'is not a array');
  }

  var len = context.length,
      k = 0,
      res;
  
  if (init) {
    res = init;
  } else {
    if (k >= len) {
      throw new TypeError('this is a empty array');
    } else {
      res = context[k];
      k++;
    }
  }

  while (k < len) {
    res = fn(res, context[k]);
    k++;
  }

  return res;
}