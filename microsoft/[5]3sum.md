## 3sum
[3sum](https://leetcode.cn/problems/3sum/)：Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

### 思路

**题意**：在数组 `nums` 中找所有**不重复**的三元组 `[a, b, c]`，满足 `a + b + c == 0`（三个数下标不同）。

**暴力**：三重循环枚举 (i, j, k)，再去重，O(n³)，且去重麻烦。

**排序 + 固定一端 + 双指针**：

1. **排序**：先对 `nums` 排序。这样便于用双指针做「两数之和」，也便于跳过重复。
2. **枚举第一个数**：下标 `i` 从 0 到 n-3，令 `target = -nums[i]`，问题变成在 `i` 右侧找两个数之和为 `target`（即 2Sum 在有序数组上的做法）。
3. **双指针找两数之和**：在 `[i+1, n-1]` 上设 `left = i+1`、`right = n-1`：
   - 若 `nums[left] + nums[right] == target`，记录 `[nums[i], nums[left], nums[right]]`，然后 left、right 向中间收缩并跳过重复。
   - 若和 < target，`left++`；若和 > target，`right--`。
4. **去重**：
   - 固定 `i` 时：若 `nums[i] == nums[i-1]`，直接 `i++`，避免重复的「第一个数」。
   - 找到一组解后：`left++`、`right--` 时要一直跳过与当前值相同的数，避免重复三元组。

时间复杂度 O(n²)（排序 O(n log n) + 外层枚举 O(n) × 内层双指针 O(n)），空间 O(log n) 或 O(n) 取决于排序。

### 代码
```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const n = nums.length;
  const res = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < n - 2; i++) {
     //第一个优化点 第一个数已为正，后面更大，不可能和为 0
    if (nums[i] > 0) break;
    if (i > 0 && nums[i] === nums[i - 1]) continue; // 第二个优化点 去重：第一个数

    const target = -nums[i];
    let left = i + 1;
    let right = n - 1;

    while (left < right) {
      const sum = nums[left] + nums[right];
      if (sum === target) {
        res.push([nums[i], nums[left], nums[right]]);
        // 保证不重复
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }
    }
  }

  return res;
};
```
