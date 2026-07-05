## Leaves Arithmetic（叶子节点是否构成等差数列）

> 来源：Moonshot / 智谱 / 阶跃星辰 前端面经（掘金一面）  
> 非 LeetCode 原题，相关题：[LC 872 Leaf-Similar Trees](https://leetcode.cn/problems/leaf-similar-trees/) + [LC 1502 Arithmetic Progression](https://leetcode.cn/problems/can-make-arithmetic-progression-from-sequence/)

---

### 题目

给一棵二叉树，实现函数判断其**叶节点数值从左到右是否构成等差数列**。

**输入**：二叉树的根节点 `root`，节点是带有 `left`、`right`、`val` 的对象。

```ts
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}
```

**输出**：`boolean` —— 叶子节点从左到右取出的值序列是否为等差数列。

---

### 示例

```
示例 1：
        4
       / \
      2   6
     / \   \
    1   3   7

叶子从左到右：[1, 3, 7]
判等差：3-1=2, 7-3=4 → 公差不一致
返回：false
```

```
示例 2：
         10
        /  \
       5    15
      / \   / \
     1   3 5   7

叶子从左到右：[1, 3, 5, 7]
判等差：公差均为 2
返回：true
```

```
示例 3：
        1            示例 4：（空树）
                     root = null
返回：true           返回：true
（单节点也算等差）
```

---

### 关键点

1. **叶子节点的定义**：`!node.left && !node.right`
2. **"从左到右"的实现**：DFS 时**先递归 left，再递归 right**
3. **等差判定**：相邻差值相等
4. **边界**：空树、单节点、≤2 个叶子（必然等差）

---

### 要求

> 原题要求**给出暴力解和优化解两种实现**。

- **暴力解**：先 DFS 收集所有叶子值到数组，再遍历数组判断是否等差。空间 O(L)。
- **优化解**：边 DFS 边判断，用 `prev`、`d` 两个变量记录"上一个叶子值"和"公差"，提前剪枝。空间 O(h)（仅递归栈）。

---

### 我的解答

#### 暴力解

```js
// TODO: 在这里写你的暴力解
function isLeavesArithmetic(root) {
  let arr=[]
  const findLeves = (node) => {
    if (!root) return;
    if (!node.left && !node.right) {
      arr.push(node.val);
      return;
    };
    findLeves(node.left)
    findLeves(node.right)
  }
  findLeves(root);
  const canArithmetic = (arr) => {
    const diff = arr[1] -arr[0];
    for(let i=2;i<arr.length;i++) {
      if(arr[i] - arr[i-1] !== diff) return false
    }
    return true;
  }

  return canArithmetic(arr);
}
```

#### 优化解

```js
// TODO: 在这里写你的优化解（边遍历边判断）
function isLeavesArithmeticOptimized(root) {
  let prev = null;
  let diff = null;
  let flag = true;
  const findLeves = (node) => {
    if(!flag || !node) return;

    if (!node.left && !node.right) {
      if (prev !==null) {
        if (diff === null) {
          diff = node.val - prev;
        } else {
          if (node.val - prev !== diff) {
            flag = false;
          }
        }
      }
      prev = node.val;
    }
    if (flag) {
     findLeves(node.left)
     findLeves(node.right)
    }
  }
  findLeves(root)
  return flag;
}
```

---

### 测试用例

```js
// 测试 1：[1, 3, 5, 7] 等差
const t1 = {
  val: 10,
  left: { val: 5, left: { val: 1, left: null, right: null }, right: { val: 3, left: null, right: null } },
  right: { val: 15, left: { val: 5, left: null, right: null }, right: { val: 7, left: null, right: null } }
};
console.log(isLeavesArithmetic(t1)); // 期望 true

// 测试 2：[1, 3, 7] 非等差
const t2 = {
  val: 4,
  left: { val: 2, left: { val: 1, left: null, right: null }, right: { val: 3, left: null, right: null } },
  right: { val: 6, left: null, right: { val: 7, left: null, right: null } }
};
console.log(isLeavesArithmetic(t2)); // 期望 false

// 测试 3：空树
console.log(isLeavesArithmetic(null)); // 期望 true

// 测试 4：单节点
console.log(isLeavesArithmetic({ val: 5, left: null, right: null })); // 期望 true

// 测试 5：单链右倾（只有一片叶子）
const t5 = {
  val: 1,
  left: null,
  right: { val: 2, left: null, right: { val: 3, left: null, right: null } }
};
console.log(isLeavesArithmetic(t5)); // 期望 true（叶子只有 [3]）
```
