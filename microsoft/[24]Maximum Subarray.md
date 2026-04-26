## Maximum Subarray
[Maximum Subarray](https://leetcode.cn/problems/maximum-subarray)：Given an integer array nums, find the subarray with the largest sum, and return its sum.


### 思路

这是经典的**动态规划**题目,也叫**Kadane算法**。

**核心问题**: 遍历到当前位置时,要不要把前面的子数组"接上"?

**决策逻辑**:
- 如果前面的累加和是**正数** → 接上,继续累加(有增益)
- 如果前面的累加和是**负数** → 不接,从当前位置重新开始(拖后腿)

**举例理解**:
```
数组: [-2, 1, -3, 4, -1, 2, 1, -5, 4]

位置1(值=1):
  前面和=-2(负数) → 不接,从1重新开始 → 当前和=1

位置3(值=4):
  前面和=-2(负数) → 不接,从4重新开始 → 当前和=4

位置5(值=2):
  前面和=3(正数) → 接上! → 当前和=3+2=5

位置6(值=1):
  前面和=5(正数) → 接上! → 当前和=5+1=6 ← 最大!
```

**动态规划三要素**:

1. **状态定义**: `dp[i]` = 以第 `i` 个元素**结尾**的最大子数组和
2. **状态转移方程**:
   ```js
   dp[i] = Math.max(nums[i], dp[i-1] + nums[i])
   //      重新开始    接上前面
   ```
3. **初始状态**: `dp[0] = nums[0]`

**最终答案**: `max(dp[0], dp[1], ..., dp[n-1])` 所有位置的最大值

### 代码

#### 方法1: 动态规划(标准DP)
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    // dp[i] 表示以 nums[i] 结尾的最大子数组和
    let dp = nums[0];        // 当前位置的最大和
    let maxSum = nums[0];    // 全局最大和
    
    for (let i = 1; i < nums.length; i++) {
        // 状态转移: 要么接上前面,要么重新开始
        dp = Math.max(nums[i], dp + nums[i]);
        
        // 更新全局最大值
        maxSum = Math.max(maxSum, dp);
    }
    
    return maxSum;
};
```

#### 方法2: 贪心思想(更直观)
```js
var maxSubArray = function(nums) {
    let currentSum = 0;      // 当前子数组和
    let maxSum = -Infinity;  // 全局最大和
    
    for (let num of nums) {
        // 如果当前和<0,说明拖后腿,重新开始
        currentSum = Math.max(num, currentSum + num);
        
        // 更新最大值
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
};
```

#### 方法3: 更贪心的写法
```js
var maxSubArray = function(nums) {
    let currentSum = 0;
    let maxSum = -Infinity;
    
    for (let num of nums) {
        currentSum += num;           // 先累加
        maxSum = Math.max(maxSum, currentSum);  // 更新最大值
        
        if (currentSum < 0) {        // 如果和变负数
            currentSum = 0;          // 重置为0,重新开始
        }
    }
    
    return maxSum;
};
```

### 执行过程详解

以 `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]` 为例:

```
i=0: num=-2
  dp = max(-2, 0-2) = -2
  maxSum = -2
  当前最优子数组: [-2]

i=1: num=1
  dp = max(1, -2+1) = 1  ← 重新开始!
  maxSum = 1
  当前最优子数组: [1]

i=2: num=-3
  dp = max(-3, 1-3) = -2  ← 接上,但变负了
  maxSum = 1
  当前最优子数组: [1, -3]

i=3: num=4
  dp = max(4, -2+4) = 4  ← 重新开始!
  maxSum = 4
  当前最优子数组: [4]

i=4: num=-1
  dp = max(-1, 4-1) = 3  ← 接上
  maxSum = 4
  当前最优子数组: [4, -1]

i=5: num=2
  dp = max(2, 3+2) = 5  ← 接上
  maxSum = 5
  当前最优子数组: [4, -1, 2]

i=6: num=1
  dp = max(1, 5+1) = 6  ← 接上
  maxSum = 6  ← 最大值!
  当前最优子数组: [4, -1, 2, 1]

i=7: num=-5
  dp = max(-5, 6-5) = 1  ← 接上
  maxSum = 6
  当前最优子数组: [4, -1, 2, 1, -5]

i=8: num=4
  dp = max(4, 1+4) = 5  ← 接上
  maxSum = 6
  当前最优子数组: [4, -1, 2, 1, -5, 4]

最终返回: 6
最优子数组: [4, -1, 2, 1]
```

### 为什么这个算法是对的?

**核心洞察**: 以位置 `i` 结尾的最大子数组,只有两种可能:
1. **只包含 `nums[i]`**: 从当前位置重新开始
2. **包含 `nums[i]` 和前面的子数组**: 接上前面的最大和

所以:
```js
dp[i] = max(nums[i], dp[i-1] + nums[i])
```

这个选择是**局部最优**的,而所有位置的最大值就是**全局最优**。

### 复杂度分析

- **时间复杂度**: O(n) - 只需遍历一次数组
- **空间复杂度**: O(1) - 只用了几个变量(优化后不需要dp数组)

### 易错点

1. **初始值错误**:
   ```js
   // ❌ 错误: 如果数组全是负数会出错
   let maxSum = 0;
   
   // ✅ 正确
   let maxSum = nums[0];  // 或 -Infinity
   ```

2. **忘记更新最大值**:
   ```js
   // ❌ 错误: 只在最后更新
   for (...) {
       dp = ...;
   }
   return dp;  // 错!dp只是最后一个位置的值
   
   // ✅ 正确: 每次都更新
   for (...) {
       dp = ...;
       maxSum = Math.max(maxSum, dp);  // 每次都更新
   }
   return maxSum;
   ```

3. **理解"连续"含义**:
   - 子数组必须是**连续**的,不能跳过元素
   - 不是"最大K个数的和"

### 三种写法对比

| 写法 | 优点 | 缺点 |
|------|------|------|
| 标准DP | 思路清晰,状态转移明确 | 需要理解DP概念 |
| 贪心1 | 最直观,易理解 | 本质和DP一样 |
| 贪心2 | 更像贪心思想 | 需要注意更新顺序 |

**推荐**: 方法1或方法2,思路最清晰!

### 进阶变种

1. **返回最大子数组本身** - 需要记录起始和结束位置
2. **LeetCode 152. Maximum Product Subarray** - 最大子数组乘积(需要同时记录最大值和最小值)
3. **环形数组的最大子数组和** - LeetCode 918
