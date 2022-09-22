// 函数节流
// 在一段时间内多次触发事件，只执行一次

function throttle(callback, wait = 1000) {
  let last = 0;
  return function() {
    let now = Date.now(),
        args = Array.prototype.slice.call(arguments);  // call  apply 改变this指向
        context = this;

    if (!last || now - last > wait) {
        callback.apply(context, args);
        last = now;
    }
  }
}