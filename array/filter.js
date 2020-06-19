// reduce实现filter

Array.prototype.reduceToFilter = function (handler) {
  return this.reduce((target, current, index) => {
    if (handler.call(this, current, index)) {
      target.push(current);
    }
    return target;
  }, [])
};


// es5实现
function selfFilter(fn, context) {

  if(!fn || typeof fn !== "function") {
    throw new TypeError('fn is not a function');
  }

  let arr = Array.prototype.slice.call(this)

  let filteredArr = []

  for (let i = 0; i < arr.length; i++) {

      if(!arr.hasOwnProperty(i)) continue;

       fn.call(context, arr[i], i, this) && filteredArr.push(arr[i])

  }

  return filteredArr

}