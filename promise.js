// Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）
// 只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

// 一个小的dom
var p = new Promise(function(resolve,rejcet){
  setTimeout(function(){
      if(true){
          //异步操作成功
          resolve('success');
      }else{
          //异步操作失败
          rejcet('failure');
      }
  },1000);
});

p.then(function(value){ console.log(value);},  //成功的回调
       function(error){ console.log(error);}); //失败的回调


// es5实现promise
function Promise(callback) {

  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  if (!(this instanceof Promise)) {
      return new Promise(callback);
  }

  var self = this; // promise实例
  self.data = undefined; // promise结果为undefined
  self.status = 'PENDING'; // promise初始状态为pending
  self.onResolveCallbak = []; // promise resolve时的回调函数集
  self.onRejectCallback = []; // promise reject时的回调函数集

  callback(resolve, reject); // 执行callbak并传入相应参数

  // 成功
  function resolve(value) {
    if(self.status === 'PENDING') {
      self.status = 'FULFILLED';
      self.data = value;
      // 依次执行成功之后的函数栈
      self.onResolveCallbacks.forEach(cb => cb(value));
    }
  };


  // 失败
  function reject(error) {
    if(self.status === 'PENDING'){
      self.status = 'REJECTED';
      self.data = error;
      // 依次执行失败之后的函数栈
      self.onRejectedCallbacks.forEach(cb => cb(error));
    }
  };
}


// 为promise添加then方法
// 一个promise.then方法接受两个参数
// 1. onFulfilled 和 onRejected 都是可选参数，调用次数均不可超过一次
  // 如果 onFulfilled 不是函数，其必须被忽略
  // 如果 onRejected 不是函数，其必须被忽略

// 2. then方法可以被同一个promise多次调用

// 3. then方法必须返回一个promise
Promise.prototype.then = function(onResolved, onRejected) {
  var self = this;
  var promise,
      x;

  // 规则1：参数不为函数，则必须被忽略
  onResolved = typeof onResolved === 'function' ? onResolved : v => v;
  onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e };


  // 如果promise1(此处即为this/self)的状态已经确定并且是FULFILLED，则调用onResolved
  // 因为考虑到有可能throw，所以我们将其包在try/catch块里
  if (self.status === 'FULFILLED') {
    promise = new Promise(function(resolve, reject) {
      try {
        x = onResolved(self.data);
        analysisPromise(x, resolve, reject);
         /*
          * 如果返回一个 promise 对象，直接取结果作为 promise 的结果
            if (x instanceof Promise) {
                x.then(resolve, reject);
            }
            否则以它的返回值作为 promise 的结果
            resolve(x);
          */
      } catch(e) {
        reject(e); // 如果出错，以捕获到的错误做为promise2的结果
      }
    })
  }

  // 同成功的回调
  if (self.status === 'REJECTED') {
    promise = new Promise(function(resolve, reject) {
      try {
        x = onRejected(self.data);
        analysisPromise(x, resolve, reject);
      } catch(e) {
        reject(e);
      }
    })
  }


  // 如果当前的Promise还处于pending状态，并不能确定调用onResolved还是onRejected，
  // 只能等到Promise的状态确定后，才能确实如何处理。
  // 所以需要把我们的**两种情况**的处理逻辑做为callback放入promise1(此处即this/self)的回调数组里
  // 逻辑本身跟上述几乎一致
  if (self.status === 'PENDING') {
    promise = new Promise(function(resolve, reject) {
      self.onResolveCallbak.push(function(value) {
        try {
          x = onResolve(self.data);
          analysisPromise(x, resolve, reject);
        } catch(e) {
          reject(e);
        }
      })

      self.onRejectedCallback.push(function(reason) {
        try {
          x = onRejected ? onRejected(self.data) : undefined;
          analysisPromise(x, resolve, reject);
        } catch (e) {
          reject(e)
        }
      })
    })
  }
  return promise;
};

Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}


// 分析结果
var analysisPromise = function (x, resolve, reject) {

  var then, y;
  if (x instanceof Promise) {
    // 状态不确定，可能被一个 thenable 决定最终值
    // 状态确定，存在正常的值直接读取状态
    if (x.status === 'PENDING') {
        x.then(v => analysisPromise(v, resolve, reject), reject);
    } else {
        x.then(resolve, reject);
    }
    return;
  }

  if (x !== undefined && (typeof x === 'object' || typeof x === 'function')) {
    // x.then 可能是 getter，多次读取可能用副作用
    // 三种情况存在一种情况直接返回结果
    then = x.then;
    if (then && typeof then === 'function') {
      then.call(x, function (value) {
        // callback return a promise
        analysisPromise(value, resolve, reject);
      }, function (error) {
        reject(error);
      });
    // normal
    }else {
      resolve(x);
    }
  // normal
  }else {
    resolve(x);
  }
};


// 将现有对象转为 Promise 对象
Promise.resolve = function(value) {
  var promise =  new Promise((resolve, reject) => analysisPromise(value, resolve, reject), reject);
  return promise
}

//Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected
Promise.reject = function(reason) {
  return new Promise((resolve, reject) => reject(reason));
};

// finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作
Promise.prototype.finally = function(fn) {
  return this.then(function(v) {
    setTimeout(fn);
    return v;
  }, function(r) {
      setTimeout(fn);
      return r;
  });
}


// delay 延迟执行
Promise.prototype.delay = function(duration) {
  return this.then(function(value) {
      return new Promise(function(resolve, reject) {
          setTimeout(function() {
              resolve(value);
          }, duration);
      });
  }, function(reason) {
      return new Promise(function(resolve, reject) {
          setTimeout(function() {
              reject(reason);
          }, duration);
      });
  });
}

// done  stop 停掉promise链
Promise.done = Promise.stop = function() {
  return new Promise(function() {});
}

// Promise.all(arr)方法用于将多个 Promise 实例，包装成一个新的 Promise 实例
// arr为多个promise实例组成的数组
Promise.all = function (pArray) {
  var rArray = [];
  var promise = new Promise(function (resolve, reject) {

    pArray.forEach(function (pr, i) {

        if (pr instanceof Promise) {
          pr.then(function (value1) {
            analysisPromise(value1, function (value2) {
              rArray[i] = value2;
              if (rArray.length === pArray.length) {
                resolve(rArray);
              }
            }, reject);

          }, function (error) {
            reject(error);
          });

        }else {
          rArray[i] = pr;
          if (rArray.length === pArray.length) {
            resolve(rArray);
          }
        }

    });

  });

  return promise;
};


//Promise.race 传入的任意一个promise的状态改变都会直接表现为整个promise对象的状态最终值
Promise.race = function (pArray) {
  var rArray = [];
  var promise = new Promise(function (resolve, reject) {
    pArray.forEach(function (pr, i) {
      if (pr instanceof Promise) {
        pr.then(function (value) {
          analysisPromise(value, resolve, reject);
        }, function (error) {
          reject(error);
        });
      }else {
        rArray[i] = pr;
      }
    });
  });

  return promise;
};
