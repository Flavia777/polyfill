// 参数：promise数组， limit：限制并发个数

function promiseLimit(promises, limit) {
  if (!promises || !Array.isArray(promises)) {
    throw new TypeError();
  }

  const queue = promises;
  const limit = limit || 0;
  const result = [];
  let count = 0;  // 统计当前运行的promise个数
  let i = 0; // 当前运行的promise的下标

  function init(resolve, reject) {
    // 初始一次性运行limit个promise
    while (count < limit) {
      run(queue.shift(), i);
      i++;
    }

    // 运行promise队列
    function run(curr, i) {
      count++;  // 运行一个promise,count计数+1
      curr.then(data => {
        result[i] = data; // 将运行的第i个promise结果记入result
        count--; // 一个promise完成，count计数-1
        addQueue(); // 完成一个，可再运行一个新的
      }).catch(e => reject(e))
    }


    // 新的promise加入运行队列
    function addQueue() {
      // 如果所有的promise均运行完成，则返回结果数组
      if(!queue.length && !count) {
        resolve(result);
        return;
      }

      // 当前运行promise个数小于限制个数，则按顺序运行下一个promise，计数+1
      if(count < limit) {
        i++;
        run(queue.shift(), i);
      }
    }
  }

  return new Promise(init);
}