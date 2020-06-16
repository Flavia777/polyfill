// pubsub 发布订阅模式

function pubsub() {
  var callbacks = {};

  // 添加事件时，将监听器加到数组中
  function on(type, callback) {
    if(callbacks[type]) {
      callbacks[type].push(callback);
    } else {
      callback[type] = [callback];
    }
  };

  // 触发事件，循环遍历并触发所有的事件
  function emit(type) {
    if (callbacks[type]) {
      callbacks[type].forEach(val => val());
    } 
  }

  // 删除事件，移除监听器
  function off(type, callback) {
    if(!callbacks[type]) {
      return false;
    }

    if(typeof callback === 'function') {
      for (var i in callbacks[type]) {
        callbacks[type][i] === callback && callbacks[type].splice(i, 1);    
      }
    } else {
      delete callbacks[type];
    }

    return true;
  }

  return {
    on: on,
    off: off,
    emit: emit,
  };
}