// 函数节流
// 在一段时间内多次触发事件，只执行一次

function throttle(callback, wait) {
  var last = 0,
      timer;
  return function() {
    var now = Date.now(),
        args = Array.prototype.slice.call(arguments);  // call  apply 改变this指向
        context = this;

    if (last && last + wait > now) {
        clearTimeout(timer);
        timer = setTimeout(function() {
            callback.apply(context, args);
        }, wait);
    } else {
        last = now;
        callback.apply(context, args);
    }
  }
}