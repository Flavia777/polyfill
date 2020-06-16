function bubbleSort(arr) {

  if (!arr || !Array.isArray(arr)) {
    throw new TypeError(arr + 'is not an array');
  }

  if (arr.length < 2) {
    return arr;
  }

  const len = arr.length;
  for (var i = 0; i < len - 1; i++) {
      for (var j = 0; j < len - 1 - i; j++) {
          if (arr[j] > arr[j+1]) {        // 相邻元素两两对比
              var temp = arr[j+1];        // 元素交换
              arr[j+1] = arr[j];
              arr[j] = temp;
          }
      }
  }
  return arr;
}