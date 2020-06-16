// 数组扁平化


// 使用reduce
function flatten(arr) {
  return arr.reduce((flat, toFlatten) => {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  })
}

// 降维打击法
// 先转成字符串
function flatten(arr){
  let str = arr.toString()
  return str.split(',')
}

// 隐式转换
function flatten(arr) {
  return (arr + '').split(',');
}


// 浅扁平化（只扁平化一层数组）
function shallowFlatten(arr) {
  return [].concat.apply([], arr);
}

function shallowFlatten(arr) {
  return arr.reduce((a, b) => a.concat(b), []);
}

// 深扁平化（迭代调用浅扁平化函数）
function flatten(arr, n = 1) {
  let res = arr;
  while (n--) {
    res = shallowFlatten(res);
  }
  return res;
}
