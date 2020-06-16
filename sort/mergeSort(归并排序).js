/*
  <1>.把长度为n的输入序列分成两个长度为n/2的子序列；
  <2>.对这两个子序列分别采用归并排序；
  <3>.将两个排序好的子序列合并成一个最终的排序序列。

  最佳情况：T(n) = O(n)
  最差情况：T(n) = O(nlogn)
  平均情况：T(n) = O(nlogn)
*/

function mergeSort(arr) {
  if(!arr || !Array.isArray(arr)) {
    throw new TypeError(arr + 'is not an array');
  }

  if(arr.length < 2) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const left = arr.splice(0, middle);
  const right = arr.splice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  const res = [];
  while(left.length && right.length) {
    if(left[0] < right[0]) {
      res.push(left.shift());
    } else {
      res.push(right.shift());
    }
  }

  while(left.length) {
    res.push(left.shift());
  }

  while(right.length) {
    res.push(right.shift());
  }

  return res;

}