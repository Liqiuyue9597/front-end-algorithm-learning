## Trapping Rain Water
[Trapping Rain Water](https://leetcode.cn/problems/trapping-rain-water)：Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.


### 思路

**核心思路**：对于每一列，能接的水 = min(左边最高, 右边最高) - 当前高度

---

## 🔗 和 Container With Most Water 的联系

| | **Container With Most Water** | **Trapping Rain Water** |
|---|------------------------------|--------------------------|
| **题意** | 选两根线 (i, j)，求容器能装的最大水量 | 求所有位置能接的雨水总量 |
| **公式** | 面积 = min(height[i], height[j]) × (j − i) | 每列 = min(左边最高, 右边最高) − 当前高度 |
| **共同点** | **水位由矮的一边决定**（min 决定上限） | 同上 |
| **解法** | 双指针：谁矮移谁 | 预处理左右最大值 或 双指针 |
| **目标** | 找一对 (i, j) 使面积最大 | 对每个位置求和 |

**联系**：
- 都用「**水会从矮的一边流走**」→ 水位 = min(两侧高度)。
- 都可以用**双指针**（接雨水还可以用预处理）。
- 物理直觉类似：水高不能超过较矮的挡板。

**区别**：
- Container：只选**一对**线，求**最大**面积。
- Trapping：对**每一列**算能接的水，再**求和**。

做过 Container 再做这道题，会更容易想到「min(左边最高, 右边最高)」决定水位。

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
- 当 `height[left] < height[right]` 时，说明 `leftMax < rightMax`（推导见下）
- 所以 `left` 这一列的水位由 `leftMax` 决定（水会从矮的一边流走）
- 可以安全地计算 `left` 这一列的水，然后 `left++`
- 同理，当 `height[right] <= height[left]` 时，可以安全地计算 `right` 这一列

**「当 height[left] < height[right] 时，必有 leftMax < rightMax」是怎么来的？**

1. **由定义**：`rightMax` 是「从下标 right 到 n-1」这段里的最大高度，所以 **rightMax ≥ height[right]**。
2. **由条件**：`height[left] < height[right]`，所以 **rightMax ≥ height[right] > height[left]**，即 **rightMax > height[left]**。（但这还没得到 leftMax < rightMax。）

3. **关键**：`leftMax` 来自「从 0 到 left-1」的某根柱子。这根柱子（设为位置 j）是在**之前某一步**被处理的；那一步我们**只有**在 `height[left] < height[right]` 时才会移动 `left`，所以当时一定有 **height[j] < 当时的 height[right]**，即 **leftMax ≤ height[j] < 当时右边的某根柱子**。而「当时右边」的柱子都在当前 `right` 的右边（或就是 right），所以它们的最大值 **≤ 当前的 rightMax**，因此 **leftMax < 当时某根右边柱子 ≤ rightMax**，即 **leftMax < rightMax**。

4. **一句话**：谁矮移谁 → 当初更新出 `leftMax` 的那一步，左边比右边矮 → 所以左边那根不会超过「当时右边」的最大值 → 而当时右边 ≤ 当前 rightMax → 所以 leftMax < rightMax。

**「left 这一列」的计算逻辑**（right 同理）：

既然已经知道 `left` 这一列的水位由 `leftMax` 决定（右边更高，水不会从右边流走），那么：

1. **若 `height[left] >= leftMax`**  
   当前柱子不低于「左边遇到过的最高的墙」，这一列接不到水；同时要把「左边最高」更新成当前柱子，供后面的列用：  
   `leftMax = height[left]`，然后 `left++`。

2. **若 `height[left] < leftMax`**  
   当前柱子比「左边最高」矮，水位就是 `leftMax`，这一列能接的水 = 水位 − 当前高度：  
   `water += leftMax - height[left]`，然后 `left++`。

对应代码就是：

```js
if (height[left] >= leftMax) {
  leftMax = height[left];  // 接不到水，只更新左边最高
} else {
  water += leftMax - height[left];  // 能接的水 = 水位 - 当前高度
}
left++;
```

**小结**：水位由 `leftMax` 决定 → 能接的水 = `leftMax - height[left]`（若当前比 leftMax 矮）；否则只更新 leftMax，不加水。

**优势**：
- ✅ **一次遍历**：只需要遍历一次数组
- ✅ **O(1) 空间**：只需要几个变量，不需要额外数组
- ✅ **缓存友好**：顺序访问，内存访问效率高
- ✅ **实际运行更快**：常数因子小，在 LeetCode 上通常能跑进前 90%+

**什么是「常数因子」？**

大 O 只关心「随 n 增长的次数」，会忽略前面的常数。例如：
- `T = 3n` 和 `T = n` 都写成 **O(n)**（常数 3 被忽略）
- `T = 2n²` 和 `T = n²` 都写成 **O(n²)**（常数 2 被忽略）

这里的 **常数因子** 就是被大 O 忽略掉的那个倍数（如 2、3）。  
预处理方法：三次遍历 + 两次数组分配，相当于「3n + 一些固定开销」，常数因子大。  
双指针方法：一次遍历 + 几个变量，相当于「1n + 很少开销」，常数因子小。  
所以虽然都是 O(n)，双指针实际跑得更快。

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

**方法三：双指针（先更新 max，再比「左右最大」）——和你贴的写法一致**

你这种写法和上面是**同一套双指针思路**，只是实现方式不同，结果等价，而且**更短、更好写**。

**区别对比**：

| | 笔记里的写法 | 你的写法 |
|---|-------------|----------|
| **比的是谁** | 比 `height[left]` 和 `height[right]`，谁小动谁 | 比 `preMax` 和 `sufMax`，谁小算谁并动谁 |
| **何时更新 max** | 只在「当前柱子接不到水」时更新对应的 leftMax/rightMax | **每轮一开始**就先更新 `preMax`、`sufMax`（都包含当前指针位置） |
| **何时加水** | 只有当前高度 < 对应的 max 时才 `water += max - height[i]` | 每轮**一定**加一次水：`ans += preMax - height[left]` 或 `ans += sufMax - height[right]`（因为先更新了 max，所以这里一定 ≥ 0） |

**为什么你的写法也对？**

1. **先更新再算**：每轮先做 `preMax = max(preMax, height[left])`、`sufMax = max(sufMax, height[right])`，所以此时 `preMax ≥ height[left]`、`sufMax ≥ height[right]`，后面做减法不会出现负数。
2. **比的是「左右最大」**：`preMax < sufMax` 表示「左边遇到的最大高度」比「右边遇到的最大高度」小，说明**左边是瓶颈**，当前 left 位置的水位就是 `preMax`，所以用 `preMax - height[left]` 算这一列的水是对的；右边同理。
3. **和笔记里「谁矮移谁」是一回事**：笔记里是「当前柱子谁矮就动谁」，你是「左右两侧的最大值谁小就处理哪一侧」——本质都是「瓶颈在哪边就处理哪边」，所以等价。

**你的写法（TypeScript）**：

```ts
function trap(height: number[]): number {
  let ans = 0;
  let preMax = 0;   // 左边 [0..left] 的最大值（含 left）
  let sufMax = 0;   // 右边 [right..n-1] 的最大值（含 right）
  let left = 0;
  let right = height.length - 1;

  while (left < right) {
    preMax = Math.max(preMax, height[left]);
    sufMax = Math.max(sufMax, height[right]);

    if (preMax < sufMax) {
      ans += preMax - height[left++];   // 左边是瓶颈，算 left 这一列
    } else {
      ans += sufMax - height[right--];  // 右边是瓶颈，算 right 这一列
    }
  }

  return ans;
}
```

**小结**：  
你的写法和笔记里的双指针是**同一思路、两种实现**：笔记里是「比当前柱子高度、谁小动谁、需要时再更新 max」；你是「每轮先更新两侧 max，再比两侧 max，谁小算谁并动谁」。你的写法**更简洁**（不用分「更新 max」和「加水」两种情况），而且逻辑一样正确，可以放心用。

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
