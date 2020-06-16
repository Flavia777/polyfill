// bind方法  创建一个函数  在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用

Function.prototype.bind = function(context) {
  var fn = this,
      args,
      fNop,
      fBound;
  if (typeof fn !== 'function') {
    throw new TypeError(this + 'is not a function');
  }

  context = context || window;
  args = Array.prototype.slice.call(arguments, 1);

  fBound = function() {
    // new.target
    return fn.apply(fn instanceof fNop ? fn : context, args.concat(Array.prototype.slice.call(arguments)));
  }

  fNop.prototype = fn.prototype;
  fBound.prototype = new fNop();

  return fBound;
}