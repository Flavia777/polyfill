// 函数防抖
// 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时

function debounce(callback, wait) {
  var timer;
  return function() {
    var context = this;
    clearTimeout(timer);
    timer = setTimeout(function() {
      callback.apply(context, Array.prototype.slice.call(arguments));
    }, wait);
  }
}