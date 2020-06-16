/*
  <1>.从第一个元素开始，该元素可以认为已经被排序；
  <2>.取出下一个元素，在已经排序的元素序列中从后向前扫描；
  <3>.如果该元素（已排序）大于新元素，将该元素移到下一位置；
  <4>.重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；
  <5>.将新元素插入到该位置后；
  <6>.重复步骤2~5。

  最佳情况：输入数组按升序排列。T(n) = O(n)
  最坏情况：输入数组按降序排列。T(n) = O(n2)
  平均情况：T(n) = O(n2)

*/

function insertSort(arr) {
  if (!arr || !Array.isArray(arr)) {
    throw new TypeError(arr + 'is not an array');
  }

  if (arr.length < 2) {
    return arr;
  }

  for(let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while(j >=0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }

  return arr;
}