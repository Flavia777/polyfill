Array.prototype.map = function(fn, context) {
  if (!Array.isArray(this)) {
    throw new TypeError(this + 'is not a array');
  }

  var o = Object(this),
      len = o.length,
      i = 0,
      res = new Array(len);
  fn = typeof (fn) !== 'function' ? function() {} : fn;
  while(i < len) {
    // hasOwnProperty返回一个布尔值， 指示对象自身属性中是否有指定的键
    if(o.hasOwnProperty(i)) {
      res[i] = fn.call(this, o[i]);
    }
    i++;
  }
  return res;
}