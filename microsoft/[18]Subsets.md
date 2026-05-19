## Subsets
[Subsets](https://leetcode.cn/problems/subsets)：Given an integer array nums of unique elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

 

Example 1:

Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
Example 2:

Input: nums = [0]
Output: [[],[0]]


### 思路

这是一道经典的回溯/子集枚举问题。每个元素对于一个子集来说,只有两种状态:**选** 或 **不选**,因此总共有 2^n 个子集。

#### 方法一:回溯法(DFS)⭐ 推荐

**核心思想**:依次考虑每个元素,做出"选"或"不选"的决策,递归到底后收集当前路径作为一个子集。

回溯三步:
1. **记录当前路径**:每次进入递归,先把当前 path 加入结果(这是一个合法的子集)
2. **遍历选择**:从 start 开始枚举每个元素,避免重复组合
3. **回溯**:选择 → 递归 → 撤销选择

关键点:使用 `start` 参数保证每次只往后取元素,避免出现 `[1,2]` 和 `[2,1]` 这种重复子集。

时间复杂度:O(n × 2^n),空间复杂度:O(n)(递归栈和 path)

#### 方法二:迭代法(逐个添加)⭐⭐

**核心思想**:从空集开始,每遇到一个新元素,就把它加到**已有的所有子集**后面,形成新的子集。

例如 `nums = [1,2,3]`:
- 初始:`[[]]`
- 加入 1:`[[], [1]]`
- 加入 2:`[[], [1], [2], [1,2]]`
- 加入 3:`[[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]`

时间复杂度:O(n × 2^n),空间复杂度:O(1)(不计输出)

#### 方法三:位运算法⭐⭐⭐

n 个元素共有 2^n 个子集,用 0 到 2^n - 1 的每个数字的二进制位表示每个元素是否被选中。

例如 n=3,数字 5 = `101`,表示选第 0 位和第 2 位元素,即 `[1, 3]`。

时间复杂度:O(n × 2^n),空间复杂度:O(1)

### 代码

#### 方法一:回溯法
```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    const result = [];
    const path = [];
    
    // start: 从哪个下标开始选,避免重复组合
    function backtrack(start) {
        // 每个路径都是一个合法的子集,直接加入结果
        result.push([...path]);  // 注意要复制 path
        
        // 从 start 开始枚举后续元素
        for (let i = start; i < nums.length; i++) {
            path.push(nums[i]);        // 选择
            backtrack(i + 1);          // 递归:下一个从 i+1 开始
            path.pop();                // 撤销选择(回溯)
        }
    }
    
    backtrack(0);
    return result;
};
```

#### 方法一·变体:回溯法(选/不选二元决策)⭐ 重要

> **同一个回溯,另一种"画法"**——不用 for 循环,而是对每个元素显式做"选 / 不选"两次递归。
>
> **为什么单独写它**:这个写法的骨架和 [29] Target Sum 的回溯**完全同构**——掌握它能帮你识别一整类"每个元素 N 选 1"的题。

```js
var subsets = function(nums) {
    const result = [];
    const path = [];

    // i: 当前考虑第几个元素
    function dfs(i) {
        if (i === nums.length) {        // 走到底,收集一个子集
            result.push([...path]);
            return;
        }
        // 选项 1: 不选 nums[i]
        dfs(i + 1);
        // 选项 2: 选 nums[i]
        path.push(nums[i]);
        dfs(i + 1);
        path.pop();                     // 撤销
    }

    dfs(0);
    return result;
};
```

**与 for 循环版的区别**:

|  | for + start 版 | 选/不选版 |
|---|---|---|
| 收集时机 | **每进入函数就收集**(每个节点都是子集) | **只在叶子收集**(`i === n` 时) |
| 决策模型 | "从剩余元素里挑一个继续往后" | "对当前元素做二元决策" |
| 递归调用 | `for` 循环里多次递归 | 固定两次递归 |
| 节点数 | 共 2^n 个节点全部收集 | 只 2^n 个叶子收集 |

**两版结果完全相同**(顺序可能不同),只是"画决策树"的方式不同。

**决策树对比**(`nums = [1,2]`):

```
for + start 版:                选/不选版:
backtrack(0,[])  收集[]         dfs(0,[])
├─ 选1: bt(1,[1]) 收集[1]       ├─ 不选1: dfs(1,[])
│  └─ 选2: bt(2,[1,2]) 收集[1,2]│  ├─ 不选2: dfs(2,[]) 收集[]
└─ 选2: bt(2,[2]) 收集[2]       │  └─ 选2: dfs(2,[2]) 收集[2]
                                └─ 选1: dfs(1,[1])
                                   ├─ 不选2: dfs(2,[1]) 收集[1]
                                   └─ 选2: dfs(2,[1,2]) 收集[1,2]
```

**🔑 与 [29] Target Sum 的骨架对应**:

```js
// Subsets 选/不选版          // Target Sum
dfs(i + 1);                    dfs(i + 1, sum + nums[i]);   // 取 +
path.push(nums[i]);
dfs(i + 1);                    dfs(i + 1, sum - nums[i]);   // 取 −
path.pop();
```

→ **两次并列递归 + `i+1` 推进 + 在 `i === n` 时停止**,结构完全对称。

**模板选择口诀**:
- **"从剩余里挑一个" → for + start**(子集、组合、排列、N 皇后)
- **"对每个元素做 N 选 1" → 并列多次递归**(Target Sum、416 分割等和、1049 石头 II)

#### 方法二:迭代法
```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    const result = [[]];  // 初始包含空集
    
    // 依次把每个元素加入到已有所有子集后面
    for (const num of nums) {
        const len = result.length;
        for (let i = 0; i < len; i++) {
            // 在已有子集基础上添加当前元素,形成新子集
            result.push([...result[i], num]);
        }
    }
    
    return result;
};
```

#### 方法三:位运算法
```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    const n = nums.length;
    const result = [];
    
    // 枚举 0 到 2^n - 1 的每个数字
    for (let mask = 0; mask < (1 << n); mask++) {
        const subset = [];
        // 检查每一位,如果为 1 就选中对应元素
        for (let i = 0; i < n; i++) {
            if (mask & (1 << i)) {
                subset.push(nums[i]);
            }
        }
        result.push(subset);
    }
    
    return result;
};
```

**回溯法执行过程示例**(nums = [1,2,3]):
```
backtrack(0), path=[]          → result: [[]]
  选1, backtrack(1), path=[1]  → result: [[], [1]]
    选2, backtrack(2), path=[1,2]     → result: [[], [1], [1,2]]
      选3, backtrack(3), path=[1,2,3] → result: [[], [1], [1,2], [1,2,3]]
      撤销3
    撤销2
    选3, backtrack(3), path=[1,3]     → result: [..., [1,3]]
    撤销3
  撤销1
  选2, backtrack(2), path=[2]  → result: [..., [2]]
    选3, backtrack(3), path=[2,3]     → result: [..., [2,3]]
    撤销3
  撤销2
  选3, backtrack(3), path=[3]  → result: [..., [3]]
  撤销3

最终:[[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
```
