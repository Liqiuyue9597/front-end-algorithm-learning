## Binary Tree Zigzag Level Order Traversal

[Binary Tree Zigzag Level Order Traversal](https://leetcode.cn/problems/binary-tree-zigzag-level-order-traversal)：Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).

```
输入:
       3
      / \
     9  20
        / \
       15  7

输出: [[3], [20,9], [15,7]]
       ↑     ↑       ↑
      左→右  右→左   左→右
```

---

### 思路

#### 一、题型识别

只要题目里出现 **"层序 / 一层一层 / 第 K 层 / zigzag / 锯齿"**，第一反应就是 **BFS（广度优先搜索）**。

| 关键词 | 算法 |
|---|---|
| "层序 / zigzag / 第 K 层" | **BFS（队列）** |
| "前/中/后序 / 路径 / 深度" | DFS（栈或递归） |

zigzag 只是普通层序遍历的变体——**多了一个"方向翻转"**。

#### 二、核心思路：BFS + 方向标志

1. 用**队列**做标准层序遍历
2. 用 `size = queue.length` 锁定当前层的节点数（BFS 标配技巧）
3. 维护一个 `leftToRight` 标志，决定当前层是 `push` 还是 `unshift`
4. 每完成一层，翻转方向

#### 三、为什么用 BFS 不用 DFS？

DFS 的访问顺序**不按层**——同一层的节点会分散在不同时刻被访问。zigzag 要求"每完成一层翻一次方向"，这个"层"的概念在 DFS 里不存在，强行用会让方向翻转时机混乱。

**BFS 天然按层访问**，方向翻转时机和层的边界完全对齐，逻辑最直观。

#### 四、栈 vs 队列：一字之差，算法换种

```js
arr.pop()    // 取尾部 → LIFO → 栈 → DFS
arr.shift()  // 取头部 → FIFO → 队列 → BFS
```

`push + pop` 是栈（DFS），`push + shift` 是队列（BFS）。改一个单词，算法换一种。

---

### 代码

#### 解法一：BFS + 方向标志（推荐 ⭐）

```js
var zigzagLevelOrder = function (root) {
  if (!root) return [];

  const queue = [root];
  const res = [];
  let leftToRight = true;

  while (queue.length > 0) {
    const size = queue.length;        // 锁定当前层节点数
    const level = [];

    for (let i = 0; i < size; i++) {
      const node = queue.shift();

      // 根据方向决定插入位置
      if (leftToRight) {
        level.push(node.val);          // 左→右,尾部追加
      } else {
        level.unshift(node.val);       // 右→左,头部插入
      }

      if (node.left)  queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    res.push(level);
    leftToRight = !leftToRight;        // 每完成一层翻转方向
  }

  return res;
};
```

#### 解法二：BFS + push 后 reverse（消除 unshift 开销）

`unshift` 是 O(level_size)，可以改成统一 `push`，最后再 reverse 偶数层：

```js
var zigzagLevelOrder = function (root) {
  if (!root) return [];

  const queue = [root];
  const res = [];
  let leftToRight = true;

  while (queue.length > 0) {
    const size = queue.length;
    const level = [];

    for (let i = 0; i < size; i++) {
      const node = queue.shift();      // ⚠️ 仍是 O(n),卡复杂度
      level.push(node.val);            // 统一 push,O(1)

      if (node.left)  queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    if (!leftToRight) level.reverse();  // 反向层最后整体翻转,O(level_size)
    res.push(level);
    leftToRight = !leftToRight;
  }

  return res;
};
```

> **注意**：这版只优化了 `unshift`，但 `queue.shift()` 还在，所以总复杂度仍是 **O(n²)**。要做到真正的 O(n)，必须连 `shift` 一起干掉——见解法四。

#### 解法三：单循环 + 节点带 depth（指针消除 shift）

让每个节点携带自己的 `depth`，根据 `depth % 2` 判断方向；用指针代替 `shift`：

```js
var zigzagLevelOrder = function (root) {
  if (!root) return [];

  const queue = [{ node: root, depth: 0 }];
  const res = [];
  let head = 0;                       // 指针代替 shift,O(1)

  while (head < queue.length) {
    const { node, depth } = queue[head++];

    if (res.length === depth) res.push([]);

    // 用 depth 奇偶判断方向,不维护额外状态
    if (depth % 2 === 0) {
      res[depth].push(node.val);
    } else {
      res[depth].unshift(node.val);   // ⚠️ 仍是 O(level_size),卡复杂度
    }

    if (node.left)  queue.push({ node: node.left,  depth: depth + 1 });
    if (node.right) queue.push({ node: node.right, depth: depth + 1 });
  }

  return res;
};
```

> 这版指针解决了 `shift`，但 `unshift` 还在，总复杂度仍是 **O(n²)**。

#### 解法四：指针 + push + reverse（真正的 O(n) ⭐）

要做到 O(n)，必须**同时**消除两个瓶颈：

```js
var zigzagLevelOrder = function (root) {
  if (!root) return [];

  const queue = [root];
  const res = [];
  let head = 0;                          // 指针代替 shift
  let leftToRight = true;

  while (head < queue.length) {
    const size = queue.length - head;    // 当前层节点数
    const level = [];

    for (let i = 0; i < size; i++) {
      const node = queue[head++];        // O(1)
      level.push(node.val);              // O(1),统一 push

      if (node.left)  queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    if (!leftToRight) level.reverse();   // 一次 O(level_size),累加 O(n)
    res.push(level);
    leftToRight = !leftToRight;
  }

  return res;
};
```

---

### 复杂度

| 解法 | 时间 | 瓶颈所在 | 空间 |
|---|---|---|---|
| 解法一 (shift + unshift) | **O(n²)** | shift 和 unshift 各 O(n²) | O(n) |
| 解法二 (shift + push+reverse) | **O(n²)** | shift 仍 O(n²)（unshift 已消除） | O(n) |
| 解法三 (指针 + unshift) | **O(n²)** | unshift 仍 O(n²)（shift 已消除） | O(n) |
| **解法四 (指针 + push+reverse)** | **O(n)** ⭐ | 两个瓶颈都消除 | O(n) |

**关键洞察**：要降到 O(n)，必须**同时**优化 `shift` 和 `unshift`，少一个都会被卡死。

| 操作 | 单次耗时 | n 次累加 | 优化方案 |
|---|---|---|---|
| `arr.shift()` | O(n) | O(n²) | 用 `head++` 指针 → O(1) |
| `arr.unshift(x)` | O(level) | O(n²) | 改 `push` + 最后 `reverse` → 累加 O(n) |

> 面试场景下，写解法一就够用了——不会因为常数因子被卡。但要回答"如何优化"时，必须同时点出两个瓶颈，只说一个会被追问。

---

### 关键点详解

#### 1. `size = queue.length` 是 BFS 分层的灵魂

```js
const size = queue.length;        // ⭐ 必须先存,不能直接用 queue.length
for (let i = 0; i < size; i++) {
  // ...
  queue.push(...);                 // 这里会改变 queue.length!
}
```

如果直接写 `for (let i = 0; i < queue.length; i++)`，循环里新加的下一层节点会被算进当前层，分层就乱了。**先把当前层的节点数"快照"下来**，是层序遍历的标配技巧。

#### 2. 方向翻转时机：每层结束后

```js
res.push(level);
leftToRight = !leftToRight;        // ⭐ 在 res.push 之后
```

不是"每个节点处理后翻转"，也不是"每次进 while 翻转"，**而是"完成一整层后翻转"**。这个时机和 `for` 循环结束完美对齐——这是双层循环写法可读性更好的根本原因。

#### 3. `pop` vs `shift`：DFS 还是 BFS

| 操作 | 取的位置 | 行为 | 算法 |
|---|---|---|---|
| `arr.pop()` | 尾部（最新的） | LIFO 栈 | **DFS** |
| `arr.shift()` | 头部（最早的） | FIFO 队列 | **BFS** |

zigzag 必须用 BFS，所以**只能用 `shift`**。如果误用 `pop`，节点访问顺序会变成 DFS，方向翻转和层的对应关系彻底崩坏。

#### 4. `unshift` vs `push + reverse`：性能差异

```js
// 写法 A: 一边遍历一边 unshift
for (...) level.unshift(node.val);   // 每次 O(k),总共 O(k²)

// 写法 B: 先 push,最后 reverse
for (...) level.push(node.val);      // O(1)
level.reverse();                      // O(k)
                                      // 总共 O(k)
```

一层 k 个节点：
- 写法 A：O(k²)
- 写法 B：O(k)

最坏情况下整棵树的 unshift 总开销可达 O(n²)。`reverse` 写法是 O(n)。

---

### 执行过程示例

以这棵树为例：

```
       3
      / \
     9  20
        / \
       15  7
```

跟踪解法一：

```
初始: queue=[3], res=[], leftToRight=true

─── 第 0 层 ──────────────
size=1, level=[]
  i=0: shift 3, leftToRight=true → level.push(3) → level=[3]
       push 9, 20 → queue=[9, 20]
res=[[3]], leftToRight=false

─── 第 1 层 ──────────────
size=2, level=[]
  i=0: shift 9,  leftToRight=false → level.unshift(9)  → level=[9]
       9 没孩子, queue=[20]
  i=1: shift 20, leftToRight=false → level.unshift(20) → level=[20, 9]
       push 15, 7 → queue=[15, 7]
res=[[3], [20, 9]], leftToRight=true

─── 第 2 层 ──────────────
size=2, level=[]
  i=0: shift 15, leftToRight=true → level.push(15) → level=[15]
  i=1: shift 7,  leftToRight=true → level.push(7)  → level=[15, 7]
res=[[3], [20, 9], [15, 7]], leftToRight=false

queue 空,结束
```

输出 `[[3], [20, 9], [15, 7]]` ✅

---

### 易错点（面试官爱抠）

| 坑 | 说明 |
|---|---|
| 用 `pop` 而不是 `shift` | 直接变成 DFS,访问顺序乱,方向翻转失效 |
| 直接 `for (i < queue.length)` | 没快照 size,新加的节点被算进当前层 |
| 翻转时机放在循环内 | 应该"每层完成后"翻一次,不是每个节点翻一次 |
| 忘了 `if (!root) return []` | 空树会进 while 失败 |
| `res = [...new Array(...)]` 预分配 | 没必要,用 `res.push(level)` 动态添加更简洁 |

---

### 错误写法警示：用 `pop` + 全局 `isRight`

之前的版本：

```js
// ❌ 这是错的
const arr = [{ node: root, idx: 0 }];
let isRight = false;
while (arr.length > 0) {
  const { node, idx } = arr.pop();   // ⚠️ pop 是 DFS!
  if (!res[idx]) {
    res.push([node.val]);
    isRight = !isRight;               // ⚠️ 翻转时机依赖访问顺序
  } else {
    if (isRight) res[idx].unshift(node.val);
    else         res[idx].push(node.val);
  }
  node.left  && arr.push({ node: node.left,  idx: idx + 1 });
  node.right && arr.push({ node: node.right, idx: idx + 1 });
}
```

为什么错？`pop` 让访问顺序变成 DFS——同一层的节点不会连续访问，"第一次见到新层 idx 就翻转"的逻辑只在一路深入时碰巧对，回溯时就乱。

反例 `[1, 2, 3, 4, 5, null, 6]`：期望 `[[1], [3,2], [4,5,6]]`，实际输出 `[[1], [2,3], [4,5,6]]`，第 1 层方向反了。

**修复**：要么 `pop → shift`（改成 BFS），要么不用全局 `isRight`，改用 `depth % 2` 判断方向。

---

### 题目识别速查（树类）

```
看到题目 → 参数有 TreeNode root 吗?
                    │
                   YES
                    ↓
         题目要"分层 / zigzag / 最短"吗?
              │              │
             YES            NO
              ↓              ↓
            BFS            DFS
          (队列+shift)    (递归 or 栈+pop)
              ↓
       size = queue.length
            分层处理
              ↓
        zigzag → 加方向翻转
        最大宽度 → 加 size 对比
        每层最大值 → 每层取 max
```

---

### 兄弟题（一通百通）

| 题目 | LC | 关键差异 |
|---|---|---|
| 二叉树层序遍历 | 102 | zigzag 的"基础版",不要方向翻转 |
| **二叉树锯齿形层序遍历** | **103** | **本题** |
| 二叉树层序遍历 II | 107 | 自底向上,最后整体 reverse 即可 |
| 二叉树右视图 | 199 | 每层只取最后一个 |
| 二叉树最大宽度 | 662 | 每层节点带"虚拟下标",取首尾差 |
| 二叉树每层最大值 | 515 | 每层 Math.max |
| N 叉树层序遍历 | 429 | 把 `node.left/right` 换成 `node.children` 循环 |

**记忆法**：所有"按层做点什么"的题，都是 **BFS 模板 + 当前层数据的不同处理**。模板背一次，全套都会。

---

### 一句话总结

> **zigzag = 标准 BFS 模板 + 一个 `leftToRight` 标志**。BFS 模板的两个关键技巧：`size = queue.length` 锁定当前层；每完成一层后翻转方向。
