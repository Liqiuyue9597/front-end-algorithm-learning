## Target Sum
[Target Sum](https://leetcode.cn/problems/target-sum)：You are given an integer array nums and an integer target.
You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers.
For example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression "+2-1".
Return the number of different expressions that you can build, which evaluates to target.

Example:
```
Input: nums = [1,1,1,1,1], target = 3
Output: 5
解释:有 5 种方式可以构造表达式得到 target=3
  -1 + 1 + 1 + 1 + 1 = 3
  +1 - 1 + 1 + 1 + 1 = 3
  +1 + 1 - 1 + 1 + 1 = 3
  +1 + 1 + 1 - 1 + 1 = 3
  +1 + 1 + 1 + 1 - 1 = 3
```

### 思路

每个数字只能选 `+` 或 `-`,问"有多少种组合方式让总和等于 target"。

有两条路可以走:
- **思路 1:回溯**——朴素地枚举每个数 +/− 的所有组合,O(2^n)
- **思路 2:转化成子集和 + 0/1 背包**——通过数学推导把问题压缩成 DP,O(n × capacity)⭐ 推荐

---

### 思路 1:回溯(和 [18] Subsets 同骨架!)🔑

**核心观察**:这道题的回溯骨架和 [18] Subsets 的"选/不选"版本**完全同构**——都是对每个元素做二元决策。

```js
// [18] Subsets 选/不选版              // [29] Target Sum
function dfs(i) {                       function dfs(i, sum) {
  if (i === nums.length) {                if (i === nums.length) {
    result.push([...path]);                 if (sum === target) count++;
    return;                                 return;
  }                                       }
  dfs(i + 1);                             dfs(i + 1, sum + nums[i]);   // +
  path.push(nums[i]);
  dfs(i + 1);                             dfs(i + 1, sum - nums[i]);   // −
  path.pop();
}                                       }
```

**两次并列递归 + `i+1` 推进 + 在 `i === n` 时停止**,结构完全对称——区别只在:
- Subsets:每个元素"选 / 不选",叶子收集子集
- Target Sum:每个元素"加 + / 加 −",叶子检查和是否 = target

#### 代码

```js
var findTargetSumWays = function(nums, target) {
  let count = 0;
  const dfs = (i, sum) => {
    if (i === nums.length) {
      if (sum === target) count++;
      return;
    }
    dfs(i + 1, sum + nums[i]);    // 选 +
    dfs(i + 1, sum - nums[i]);    // 选 −
  };
  dfs(0, 0);
  return count;
};
```

- ⏱ 时间:O(2^n)——每个元素 2 种选择,共 `2^n` 个叶子
- 💾 空间:O(n)——递归栈深度
- ✅ 能 AC,但有大量重复子问题,可以用 DP 优化

---

### 思路 2:转化成"子集和" + 0/1 背包 ⭐ 推荐

#### 数学推导(关键!)

把数组分成两组:
- **P**:加 `+` 的数集合,和为 `sum(P)`
- **N**:加 `−` 的数集合,和为 `sum(N)`

那么:
```
sum(P) − sum(N) = target           ← 题目要求
sum(P) + sum(N) = sum(nums)        ← 总和固定

两式相加:
2 × sum(P) = target + sum(nums)
sum(P) = (target + sum) / 2
```

→ **问题转化为**:**从 nums 中选出一个子集,使其和等于 `(target + sum) / 2`,问有多少种选法**。

这就是经典的 **0/1 背包"求方案数"** 问题。

#### 边界判断

```js
const sum = nums.reduce((a, b) => a + b, 0);

// 1. target 绝对值超过 sum,不可能凑出来
if (Math.abs(target) > sum) return 0;

// 2. (target + sum) 必须是偶数,否则除以 2 不是整数
if ((target + sum) % 2 !== 0) return 0;

const capacity = (target + sum) / 2;
```

#### DP 设计

| 项 | 含义 |
|---|---|
| 状态 | `dp[j]` = 凑出和为 `j` 的方案数 |
| 转移 | `dp[j] += dp[j - num]`(放 num,从能装下 `j-num` 的方案转移而来) |
| 初始 | `dp[0] = 1`(凑 0 有 1 种方案:啥都不选) |
| 遍历顺序 | 外层 num 顺序,**内层 j 倒序**(0/1 背包标志) |

#### 完整代码

```js
var findTargetSumWays = function(nums, target) {
  const sum = nums.reduce((a, b) => a + b, 0);

  // 边界:无解直接返回 0
  if (Math.abs(target) > sum) return 0;
  if ((target + sum) % 2 !== 0) return 0;

  const capacity = (target + sum) / 2;
  const dp = new Array(capacity + 1).fill(0);
  dp[0] = 1;                              // 和为 0,1 种方案(空集)

  for (const num of nums) {
    for (let j = capacity; j >= num; j--) {  // ← 必须倒序!
      dp[j] += dp[j - num];
    }
  }

  return dp[capacity];
};
```

- ⏱ 时间:O(n × capacity) = O(n × (sum + target) / 2)
- 💾 空间:O(capacity)

---

### 运行追踪:`nums = [1,1,1,1,1], target = 3`

```
sum = 5
capacity = (3 + 5) / 2 = 4

初始:  dp = [1, 0, 0, 0, 0]
              j=0  1  2  3  4

处理 num=1(j: 4→1 倒序):
  dp[4] += dp[3] = 0 + 0 = 0
  dp[3] += dp[2] = 0 + 0 = 0
  dp[2] += dp[1] = 0 + 0 = 0
  dp[1] += dp[0] = 0 + 1 = 1
       dp = [1, 1, 0, 0, 0]

处理 num=1:
  dp[4] += dp[3] = 0
  dp[3] += dp[2] = 0
  dp[2] += dp[1] = 0 + 1 = 1
  dp[1] += dp[0] = 1 + 1 = 2
       dp = [1, 2, 1, 0, 0]

处理 num=1:
  dp[4] += dp[3] = 0
  dp[3] += dp[2] = 0 + 1 = 1
  dp[2] += dp[1] = 1 + 2 = 3
  dp[1] += dp[0] = 2 + 1 = 3
       dp = [1, 3, 3, 1, 0]

处理 num=1:
  dp[4] += dp[3] = 0 + 1 = 1
  dp[3] += dp[2] = 1 + 3 = 4
  dp[2] += dp[1] = 3 + 3 = 6
  dp[1] += dp[0] = 3 + 1 = 4
       dp = [1, 4, 6, 4, 1]

处理 num=1:
  dp[4] += dp[3] = 1 + 4 = 5     ← 答案!
  dp[3] += dp[2] = 4 + 6 = 10
  dp[2] += dp[1] = 6 + 4 = 10
  dp[1] += dp[0] = 4 + 1 = 5
       dp = [1, 5, 10, 10, 5]

返回 dp[4] = 5 ✓
```

---

### 🔑 关键点

#### 1. 为什么要转化成子集和?

直接对"+/−"做 DP 会出现负数下标(sum 可能是负的),处理麻烦。**转成子集和后,所有状态都是非负的,可以直接用数组下标**。

#### 2. 为什么内层循环要**倒序**?

这是 **0/1 背包的标志性特征**:

```js
// ✅ 倒序:每个数只能用一次(0/1 背包)
for (let j = capacity; j >= num; j--) dp[j] += dp[j - num];

// ❌ 正序:数字会被重复使用(变成完全背包)
for (let j = num; j <= capacity; j++) dp[j] += dp[j - num];
```

**直觉**:
- 倒序时 `dp[j - num]` 还是"上一轮(不含当前 num)的旧值"——保证 num 只用一次
- 正序时 `dp[j - num]` 已被本轮更新过——num 会被重复算入

#### 3. 与 [18] Subsets 的联系

| | [18] Subsets | [29] Target Sum |
|---|---|---|
| 回溯骨架 | 完全相同(选/不选二元决策) | 完全相同(+/− 二元决策) |
| 叶子做什么 | 收集 path | 检查 sum === target |
| 时间复杂度 | O(2^n) | 回溯 O(2^n),DP O(n × capacity) |
| 能否优化成 DP | ❌ 不能(要列举所有解) | ✅ 能(只要计数) |

**口诀**:
> **"列举所有解" → 必须 O(2^n) 回溯**
> **"计数 / 求最优" → 通常能 DP 压成多项式**

---

### ⚠️ 易错点

1. **忘了 `(target + sum) % 2` 判断**
   - `capacity` 必须是整数,否则子集和不可能是非整数 → 直接返回 0
   - 例:`nums=[1,2], target=2`,`sum=3, target+sum=5` 是奇数 → 不可能

2. **忘了 `Math.abs(target) > sum` 判断**
   - 如果 |target| 比 sum 还大,无论怎么加 +/− 都凑不出来
   - 例:`nums=[1,1,1], target=100` → 不可能

3. **内层循环写成正序**
   - 正序就变成了完全背包(每个数可重复使用),答案完全错
   - **倒序是 0/1 背包的标志,记牢**

4. **忘了 `dp[0] = 1`**
   - "凑出 0 有 1 种方案"是 base case
   - 如果初始化成 0,所有 dp 值都是 0,永远算不出来

5. **数组里有 0 时容易出错(进阶)**
   - 0 既可以加 +,也可以加 −,**两种都对结果无影响**
   - 此时方案数会翻倍——好在 0/1 背包的转移 `dp[j] += dp[j - 0]` 自动处理了

---

### 复杂度

| 解法 | 时间 | 空间 |
|---|---|---|
| 回溯 | O(2^n) | O(n) 栈 |
| 0/1 背包 DP | O(n × capacity) | O(capacity) |

其中 `capacity = (sum + target) / 2`。

---

### 面试讲解模板

```
1. "暴力是 DFS 枚举每个数 +/−,O(2^n)。和 LC 78 Subsets 的'选/不选'回溯
   骨架完全一样——区别只在叶子节点是数和还是收集子集。"

2. "更优的做法是转化成子集和:
   设加 + 的集合为 P,加 − 的为 N。
     sum(P) − sum(N) = target
     sum(P) + sum(N) = sum
   两式相加:sum(P) = (target + sum) / 2
   → 问题变成'多少种方式从 nums 选子集,使和为 (target+sum)/2'。"

3. "这是经典 0/1 背包求方案数:
     dp[j] = 凑出和为 j 的方案数
     转移: dp[j] += dp[j − num]
     初始: dp[0] = 1"

4. "三个边界要注意:
     - capacity 必须是整数 → (target+sum) 必须偶数
     - |target| 不能超过 sum
     - 内层 j 倒序遍历(保证每个数只用一次)"

5. "时间 O(n × capacity),空间 O(capacity)。"
```

---

### 一句话总结

> **Target Sum = "+/−" → 转化为"子集和" → 0/1 背包求方案数**
>
> **三步公式**:
> 1. `capacity = (target + sum) / 2`
> 2. `dp[j] += dp[j - num]`
> 3. **内层倒序**

### 代码
```js
var findTargetSumWays = function(nums, target) {
  const sum = nums.reduce((a, b) => a + b, 0);

  if (Math.abs(target) > sum) return 0;
  if ((target + sum) % 2 !== 0) return 0;

  const capacity = (target + sum) / 2;
  const dp = new Array(capacity + 1).fill(0);
  dp[0] = 1;

  for (const num of nums) {
    for (let j = capacity; j >= num; j--) {
      dp[j] += dp[j - num];
    }
  }

  return dp[capacity];
};
```
