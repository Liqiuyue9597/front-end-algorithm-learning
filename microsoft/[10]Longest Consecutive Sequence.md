## Longest Consecutive Sequence
[Longest Consecutive Sequence](https://leetcode.cn/problems/longest-consecutive-sequence)：Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time.

### 思路
核心思路：只从「序列起点」开始数

连续序列比如 [3, 4, 5, 6] 可以看成：从 3 开始，一直往后 +1。
关键观察：同一个数只应该作为「某一段连续序列」的起点被数一次，否则会重复遍历，做不到 O(n)。

所以思路是：只从「某个连续序列的最小那个数」开始往后数。

#### 怎么判断「最小」？

对当前数 x，如果 x - 1 不在数组里，说明没有比它小 1 的数，那 x 就是这一段连续序列的起点，可以从它开始往后数。

如果 x - 1 在数组里，说明前面还有数，x 不是起点，就跳过，不从这里开始数。
这样每一段连续序列只会被从它的起点开始数一遍，每个数最多被访问常数次，整体是 O(n)。


### 代码
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  const set = new Set(nums);
  let res = 0;

  for (const num of set) {
    if (set.has(num - 1)) continue;

    let count = 1;
    while (set.has(num + count)) count++;
    res = Math.max(res, count);
  }

  return res;
};
```
