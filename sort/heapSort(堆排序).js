// 堆排序，利用了堆这种数据结构的特性（近似完全二叉树）
// 完全二叉树：二叉树深度为k，除了第k层，其他各层节点数达到最大值， 第 k 层所有的节点也都是连续的
// 特点： 下标为i的节点，其左子节点的下变为 2 * i + 1， 右子节点的下边为 2 * i + 2


// 复杂度：O(nlogn) (最佳，最差，平均 均为这个值)

function heapSort(arr) {
  if (!arr || !Array.isArray(arr)) {
    throw new TypeError(arr + 'is not an array');
  }

  if (arr.length < 2) {
    return arr;
  }

  // 取数组中间值（也是最后一个有子节点的节点）
  // 比较每个节点和它的左右节点的值，取最大值作为中心节点，并且左子节点 > 右子节点
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heap(arr, i, arr.length);
  }

  //经过上一步，最顶部节点为最大值，最底层最右节点为最小值，即 数组的第一个和最后一个值分别为最大值和最小值
  // 交换最大值和最小值，再进行一次上一步，但是刨除最后一个值（最大值）
  // 不断重复上一步，得到最后的数组
  for (let j = arr.length; j >= 0; j--) {
    [arr[0], arr[j]] = [arr[j], arr[0]];
    heap(arr, 0, j);
  }

  function heap(arr, i, len) {
    let large = i;
    let left = large * 2 +1;
    let right = large * 2 + 2;

    if (left < len && arr[left] > arr[large]) {
      large = left;
    }

    if (right < len && arr[right] > arr[large]) {
      large = right;
    }

    if (large === i) {
      return;
    }

    [arr[i], arr[large]] = [arr[large], arr[i]];
    heap(arr, large, len);
  }
}