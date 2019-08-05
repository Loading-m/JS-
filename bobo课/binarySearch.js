/**
 *
 * @param arr 待寻找的数组
 * @param n
 * @param target 目标元素
 */
const binarySearch = (arr, n, target) => {
  let l = 0, r = n - 1; // 在[l...r]的范围里寻找target
  while (l <= r) { // 当 l == r时，区间[l...r]依然是有效的
    let mid = l + (r - l) / 2;
    if (arr[mid] === target) {
      return mid;
    }
    if (target > arr[mid]) {
      l = mid + 1; //target在[mid+1...r]中
    } else { //target < arr[mid]
      r = mid - 1; //target在[l...mid-1]中
    }
  }
  return -1;
};

export function add(num1, num2) {
  return num1 + num2;
}
