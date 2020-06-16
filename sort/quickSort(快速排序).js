/*
  <1>.从数列中挑出一个元素，称为 "基准"（pivot）；
  <2>.重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。
      在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
  <3>.递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序

  最佳情况：T(n) = O(nlogn)
  最差情况：T(n) = O(n2)
  平均情况：T(n) = O(nlogn)
*/

function quickSort(arr) {
  if(!arr || !Array.isArray(arr)) {
    throw new TypeError(arr + 'is not an array');
  }

  if(arr.length < 2) {
    return arr;
  }

  const pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0];
  const left = [];
  const right = [];
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i])
    }
  }

  return quickSort(left).concat([pivot], quickSort(right));
}


