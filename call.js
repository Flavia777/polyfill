// call方法  调用一个函数 (thisArg, arg1, arg2, arg3, ...)

Function.prototype.call = function(context) {
  var fn = this,
      res,
      args = [];

  context = context || window;
  context.fn = fn;   // 将fn内的this指向context

  if (typeof fn !== 'function') {
      throw new TypeError('args not function');
  }

  for (var i = 1; i < arguments.length; i++) {
      args.push('argument[' + i + ']');
  }

  res = eval('context.fn(' + args.toString() + ')');

  delete context.fn;

  return res;
}