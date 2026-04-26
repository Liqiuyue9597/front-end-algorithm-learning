## Binary Tree Level Order Traversal
[Binary Tree Level Order Traversal](https://leetcode.cn/problems/binary-tree-level-order-traversal)：Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).



### 思路

#### 什么是层序遍历?

**层序遍历 = 一层一层地访问节点,从左到右**

```
      3
    /   \
   9     20
        /  \
       15   7

层序遍历结果:[[3], [9, 20], [15, 7]]
第1层: [3]
第2层: [9, 20]
第3层: [15, 7]
```

#### 核心思路:BFS(广度优先搜索) ⭐

**和前/中/后序遍历的区别**:
- 前/中/后序 → 用 DFS(深度优先) → 一条路走到底
- 层序遍历 → 用 BFS(广度优先) → 一层一层扫描

**关键数据结构:队列(Queue)**
- 前/中序用**栈**(后进先出)
- 层序用**队列**(先进先出) ⭐

#### 算法步骤

```
1. 根节点入队
2. 循环:
   a. 记录当前层的节点数
   b. 依次处理这一层的所有节点:
      - 出队节点
      - 访问节点
      - 把它的左右子节点入队(为下一层准备)
   c. 保存这一层的结果
3. 重复直到队列为空
```

**为什么用队列?**
- 队列是先进先出(FIFO)
- 先入队的节点(上层)先处理
- 处理时把子节点(下层)加入队尾
- 自然形成"一层一层"的效果

时间复杂度:O(n),空间复杂度:O(n)

### 代码

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if (root === null) return [];
    
    const result = [];
    const queue = [root];  // 队列,初始放入根节点
    
    while (queue.length > 0) {
        const levelSize = queue.length;  // ⭐ 当前层的节点数
        const currentLevel = [];          // 当前层的结果
        
        // 处理当前层的所有节点
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();   // 出队(从头部取)
            currentLevel.push(node.val);  // 访问节点
            
            // 把下一层的节点加入队列(从尾部加)
            if (node.left !== null) {
                queue.push(node.left);
            }
            if (node.right !== null) {
                queue.push(node.right);
            }
        }
        
        result.push(currentLevel);  // 保存这一层的结果
    }
    
    return result;
};
```

**执行过程示例**:

```
      3
    /   \
   9     20
        /  \
       15   7

初始:queue = [3], result = []

=== 第1层 ===
levelSize = 1 (队列中有1个节点)
处理节点3:
  - 出队: node = 3, queue = []
  - 访问: currentLevel = [3]
  - 左子节点9入队: queue = [9]
  - 右子节点20入队: queue = [9, 20]
保存: result = [[3]]

=== 第2层 ===
levelSize = 2 (队列中有2个节点)
处理节点9:
  - 出队: node = 9, queue = [20]
  - 访问: currentLevel = [9]
  - 无子节点
处理节点20:
  - 出队: node = 20, queue = []
  - 访问: currentLevel = [9, 20]
  - 左子节点15入队: queue = [15]
  - 右子节点7入队: queue = [15, 7]
保存: result = [[3], [9, 20]]

=== 第3层 ===
levelSize = 2 (队列中有2个节点)
处理节点15:
  - 出队: node = 15, queue = [7]
  - 访问: currentLevel = [15]
  - 无子节点
处理节点7:
  - 出队: node = 7, queue = []
  - 访问: currentLevel = [15, 7]
  - 无子节点
保存: result = [[3], [9, 20], [15, 7]]

队列为空,结束!
返回: [[3], [9, 20], [15, 7]]
```

### 关键点理解

#### 1. 为什么要记录 `levelSize`?

```js
const levelSize = queue.length;  // 在循环前记录
```

**作用**: 区分不同层的节点

```
错误做法(不记录levelSize):
queue = [9, 20]
出队9,加入15和7 → queue = [20, 15, 7]
出队20 → 此时队列混入了第3层的节点! ❌

正确做法(记录levelSize):
levelSize = 2 (第2层只有2个节点)
只处理2次,确保只处理第2层 ✅
```

#### 2. 为什么用 `for` 循环?

```js
for (let i = 0; i < levelSize; i++) {
    // 处理这一层的节点
}
```

**作用**: 确保只处理当前层
- `levelSize` = 当前层的节点数
- `for` 循环正好执行 `levelSize` 次
- 处理完这一层后,队列中只剩下一层的节点

#### 3. 队列的操作

```js
queue.shift()  // 出队(从头部取)
queue.push()   // 入队(从尾部加)
```

**先进先出(FIFO)**:
```
入队顺序: A → B → C
队列状态: [A, B, C]
出队顺序: A → B → C (和入队顺序一致)
```

**对比栈(LIFO)**:
```
入栈顺序: A → B → C
栈状态: [A, B, C]
出栈顺序: C → B → A (和入栈顺序相反)
```
