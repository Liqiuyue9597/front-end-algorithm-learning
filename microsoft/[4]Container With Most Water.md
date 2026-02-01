## Container With Most Water
[Container With Most Water](https://leetcode.cn/problems/container-with-most-water)：You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

### 思路

**题意**：在数组 `height` 中选两条竖线（下标 i 和 j），它们与 x 轴围成的「容器」能装的水量 = **宽度 × 矮的那条线的高度**，即：

```
面积 = min(height[i], height[j]) × (j - i)
```

求所有可能容器中的**最大面积**。

**暴力**：枚举所有 (i, j)，O(n²)。

**双指针（贪心）**：

1. 左指针 `left = 0`，右指针 `right = n - 1`，初始宽度最大。
2. 当前面积 = `min(height[left], height[right]) × (right - left)`，用其更新答案。
3. **移动较矮的那一侧指针**（左或右）向中间收缩一步，重复 2，直到 `left >= right`。

**为什么移动矮的一侧是对的？**

- 面积由「宽度」和「短板高度」共同决定。
- 每次收缩，宽度一定变小。
- 若移动**高**的那一侧，新高度至多等于原来的矮边，宽度还变小，面积只会更小。
- 若移动**矮**的那一侧，虽然宽度变小，但有可能遇到更高的线，从而用更高的「短板」弥补宽度损失，面积有可能变大。

因此只有移动矮的一侧，才有机会得到更大的面积。时间复杂度 O(n)，空间 O(1)。

### 代码
```js
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let left = 0;
  let right = height.length - 1;
  let max = 0;

  while (left < right) {
    const w = right - left;
    const h = Math.min(height[left], height[right]);
    max = Math.max(max, w * h);

    if (height[left] <= height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return max;
};
```
