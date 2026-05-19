## 3Sum With Target（三数之和变种）

[3sum](https://leetcode.cn/problems/3sum/) 变种：给定数组 `nums` 和目标值 `target`，找出所有不重复的三元组 `[a, b, c]`，满足 `a + b + c == target`。

### 思路

**与经典 3Sum 的区别**：经典版 target = 0，这里是任意 target。核心逻辑完全一致，只是把 `-nums[i]` 换成 `target - nums[i]`。

**排序 + 固定一端 + 双指针**：

1. **排序**：先对 `nums` 排序，获得单调性。
2. **枚举第一个数**：下标 `i` 从 0 到 n-3，固定 `nums[i]`，问题退化为在 `[i+1, n-1]` 中找两数之和 = `target - nums[i]`。
3. **双指针夹逼**：`left = i+1`，`right = n-1`：
   - `sum < target - nums[i]` → `left++`（和太小，需要变大）
   - `sum > target - nums[i]` → `right--`（和太大，需要变小）
   - `sum === target - nums[i]` → 记录结果，收缩双指针并跳过重复
4. **两层去重**：
   - 外层：`nums[i] === nums[i-1]` 时 skip（避免第一个数重复）
   - 内层：找到解后跳过相同的 left/right 值（避免第二、第三个数重复）

**为什么 left 从 i+1 开始而不是 0？**

> 任何一组解 `[a, b, c]`（排序后 a ≤ b ≤ c），一定会在 `i = a的位置` 那一轮被发现。因为那一轮的搜索范围 `[i+1, n-1]` 已覆盖 b 和 c 的位置。所以后续轮次不需要回头看——"只往右看"保证不重不漏。

**为什么去重要放在找到解之后？**

> 去重的含义是"我已经用过这个值了，下次别再用"。如果还没找到解就跳过，可能错误跳过合法候选（比如 left 的前一个恰好是 i 位置的值，这不是重复解）。

**复杂度**：Time O(n²) / Space O(log n)（排序栈空间）

### 代码

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var threeSum = function (nums, target = 0) {
  nums.sort((a, b) => a - b);
  const len = nums.length;
  const res = [];

  for (let i = 0; i < len - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue; // 外层去重

    let left = i + 1;
    let right = len - 1;
    const remain = target - nums[i];

    while (left < right) {
      const sum = nums[left] + nums[right];
      if (sum > remain) {
        right--;
      } else if (sum < remain) {
        left++;
      } else {
        res.push([nums[i], nums[left], nums[right]]);
        left++;
        right--;
        // 内层去重：跳过相同值
        while (left < right && nums[left] === nums[left - 1]) left++;
        while (left < right && nums[right] === nums[right + 1]) right--;
      }
    }
  }

  return res;
};
```

### 关联题目

| 题目 | 关系 |
|------|------|
| [LC 15 三数之和](https://leetcode.cn/problems/3sum/) | 本题的 target=0 特殊情况 |
| [LC 16 最接近的三数之和](https://leetcode.cn/problems/3sum-closest/) | 不求精确匹配，求 min(\|sum - target\|)，双指针框架不变 |
| [LC 18 四数之和](https://leetcode.cn/problems/4sum/) | 再加一层循环，k-sum 的泛化 |
| [LC 1 两数之和](https://leetcode.cn/problems/two-sum/) | 三数之和的内核：固定一个后剩余部分就是 two-sum |

### 泛化模式

> **k-sum 问题** = 排序 + (k-2) 层循环固定前缀 + 最内层双指针处理 two-sum。去重靠排序后跳过相邻重复值。"固定前缀，只在后缀中搜索" 是组合枚举避免重复的通用技巧。
