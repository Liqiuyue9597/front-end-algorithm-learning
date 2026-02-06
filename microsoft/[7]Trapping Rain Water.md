## Trapping Rain Water
[Trapping Rain Water](https://leetcode.cn/problems/trapping-rain-water)：Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.


### 思路

**核心思路**：对于每一列，能接的水 = min(左边最高, 右边最高) - 当前高度

---

## ⚡ 为什么预处理方法速度不够快？

### 预处理方法的性能分析

```js
// 方法1：预处理左右最大值
const leftMax = new Array(n);  // 空间 O(n)
const rightMax = new Array(n); // 空间 O(n)

// 第一次遍历：预处理左边最大值
for (let i = 1; i < n; i++) { ... }  // O(n)

// 第二次遍历：预处理右边最大值
for (let i = n - 2; i >= 0; i--) { ... }  // O(n)

// 第三次遍历：计算
for (let i = 0; i < n; i++) { ... }  // O(n)
```

**性能瓶颈**：
1. **三次遍历**：需要遍历数组三次
2. **空间开销**：需要两个长度为 n 的数组（O(n) 空间）
3. **内存访问**：需要频繁访问数组，缓存不友好

**时间复杂度**：O(n) ✅  
**空间复杂度**：O(n) ⚠️  
**实际运行**：虽然时间复杂度是 O(n)，但常数因子较大（三次遍历 + 数组操作）

---

## 🚀 更快的解法：双指针（一次遍历 + O(1) 空间）

**核心思想**：我们只需要知道「左边最高」和「右边最高」的**较小值**，不需要知道具体是哪个。

**关键洞察**：
- 当 `height[left] < height[right]` 时，说明 `leftMax < rightMax`（因为右边至少有一个 `height[right]` 这么高）
- 所以 `left` 这一列的水位由 `leftMax` 决定（水会从矮的一边流走）
- 可以安全地计算 `left` 这一列的水，然后 `left++`
- 同理，当 `height[right] <= height[left]` 时，可以安全地计算 `right` 这一列

**优势**：
- ✅ **一次遍历**：只需要遍历一次数组
- ✅ **O(1) 空间**：只需要几个变量，不需要额外数组
- ✅ **缓存友好**：顺序访问，内存访问效率高
- ✅ **实际运行更快**：常数因子小，在 LeetCode 上通常能跑进前 90%+

---

### 代码

**方法一：预处理左右最大值（好理解，但较慢）**

```js
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  const n = height.length;
  if (n <= 2) return 0;
  
  // 预处理：leftMax[i] = height[0..i-1] 的最大值
  const leftMax = new Array(n);
  leftMax[0] = 0;
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i - 1]);
  }

  // 预处理：rightMax[i] = height[i+1..n-1] 的最大值
  const rightMax = new Array(n);
  rightMax[n - 1] = 0;
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i + 1]);
  }

  // 计算
  let water = 0;
  for (let i = 0; i < n; i++) {
    const waterLevel = Math.min(leftMax[i], rightMax[i]);
    water += Math.max(0, waterLevel - height[i]);
  }
  
  return water;
};
```

**方法二：双指针（推荐，更快）**

```js
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  const n = height.length;
  if (n <= 2) return 0;
  
  let left = 0;
  let right = n - 1;
  let leftMax = 0;  // left 左边（包括 left）遇到过的最高值
  let rightMax = 0; // right 右边（包括 right）遇到过的最高值
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      // 此时 leftMax < rightMax（因为右边至少有一个 height[right] 这么高）
      // 所以 left 这一列的水位由 leftMax 决定
      if (height[left] >= leftMax) {
        leftMax = height[left]; // 更新左边最高值
      } else {
        water += leftMax - height[left]; // 计算 left 这一列的水
      }
      left++;
    } else {
      // height[left] >= height[right]，此时 rightMax <= leftMax
      // 所以 right 这一列的水位由 rightMax 决定
      if (height[right] >= rightMax) {
        rightMax = height[right]; // 更新右边最高值
      } else {
        water += rightMax - height[right]; // 计算 right 这一列的水
      }
      right--;
    }
  }

  return water;
};
```

**双指针简化写法（更常见）**：

```js
var trap = function (height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      height[left] >= leftMax 
        ? (leftMax = height[left])
        : (water += leftMax - height[left]);
      left++;
    } else {
      height[right] >= rightMax
        ? (rightMax = height[right])
        : (water += rightMax - height[right]);
      right--;
    }
  }

  return water;
};
```

---

## 📊 性能对比

| 方法 | 时间复杂度 | 空间复杂度 | 遍历次数 | LeetCode 运行时间 | 推荐度 |
|------|-----------|-----------|---------|------------------|--------|
| 预处理左右最大值 | O(n) | O(n) | 3次 | ~80-100ms | ⭐⭐⭐ |
| **双指针** | **O(n)** | **O(1)** | **1次** | **~60-80ms** | **⭐⭐⭐⭐⭐** |
| 单调栈 | O(n) | O(n) | 1次 | ~90-110ms | ⭐⭐⭐ |

**为什么双指针更快？**
1. ✅ **一次遍历** vs 三次遍历（减少循环开销）
2. ✅ **O(1) 空间** vs O(n) 空间（减少内存分配和访问）
3. ✅ **顺序访问** vs 多次数组访问（缓存友好）
4. ✅ **代码简洁**：逻辑清晰，执行效率高

---

## 💡 总结

- **预处理方法**：好理解，但需要三次遍历 + O(n) 空间，实际运行较慢
- **双指针方法**：一次遍历 + O(1) 空间，实际运行更快，**推荐使用**！

**建议**：在 LeetCode 上提交时，优先使用双指针方法，通常能获得更好的运行时间排名。

```
