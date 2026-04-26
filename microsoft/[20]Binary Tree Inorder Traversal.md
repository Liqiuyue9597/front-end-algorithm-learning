## Binary Tree Inorder Traversal
[Binary Tree Inorder Traversal](https://leetcode.cn/problems/binary-tree-inorder-traversal/)：Given the root of a binary tree, return the inorder traversal of its nodes' values.


### 思路

#### 中序遍历的定义

**中序遍历顺序:左 → 根 → 右**

```
      1
    /   \
   2     3
  / \
 4   5

中序遍历结果:[4, 2, 5, 1, 3]
访问顺序: 左子树(4,2,5) → 根(1) → 右子树(3)
```

#### 方法一:递归法⭐ 最简洁

递归三步:
1. 递归遍历左子树
2. 访问根节点(加入结果)
3. 递归遍历右子树

**关键**:和前序遍历只差一行代码的位置!
- 前序:`访问 → 左 → 右`
- 中序:`左 → 访问 → 右`

时间复杂度:O(n),空间复杂度:O(n)(递归栈)

#### 方法二:迭代法⭐⭐ 更复杂

和前序遍历的迭代不同,中序遍历的迭代需要:
1. 一直往左走,把所有左节点入栈
2. 到最左端,弹出节点并访问
3. 处理右子树

**为什么复杂?** 因为节点出栈时机 ≠ 访问时机
- 前序:出栈即访问 ✅ 简单
- 中序:要先处理完左子树才能访问 ⚠️ 复杂

时间复杂度:O(n),空间复杂度:O(n)(栈)

### 代码

#### 方法一:递归法 ⭐ 推荐

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
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    const result = [];
    
    // 递归函数
    function inorder(node) {
        if (node === null) return;  // 递归终止条件
        
        // 中序遍历三步:左 → 根 → 右
        inorder(node.left);         // 1. 递归左子树
        result.push(node.val);      // 2. 访问根节点
        inorder(node.right);        // 3. 递归右子树
    }
    
    inorder(root);
    return result;
};
```

**对比前序遍历**:
```js
// 前序遍历
result.push(node.val);  // 先访问
inorder(node.left);
inorder(node.right);

// 中序遍历
inorder(node.left);
result.push(node.val);  // 后访问(在左右之间)
inorder(node.right);
```

#### 方法二:迭代法 

```js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    const result = [];
    const stack = [];
    let current = root;
    
    while (current !== null || stack.length > 0) {
        // 1. 一直往左走,把所有左节点入栈
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }
        
        // 2. 到最左端了,弹出节点并访问
        current = stack.pop();
        result.push(current.val);  // 此时才访问!
        
        // 3. 处理右子树
        current = current.right;
    }
    
    return result;
};
```

**执行过程示例**(树结构:1 → 2/3,2 → 4/5):
```
初始:current = 1, stack = []

阶段1: 一直往左走
  current = 1 → 入栈 → stack = [1], current = 2
  current = 2 → 入栈 → stack = [1, 2], current = 4
  current = 4 → 入栈 → stack = [1, 2, 4], current = null

阶段2: 到最左端,开始访问
  出栈: current = 4
  访问: result = [4]
  右子树: current = null

阶段3: 继续出栈
  出栈: current = 2
  访问: result = [4, 2]
  右子树: current = 5

阶段4: 处理节点5(往左走)
  current = 5 → 入栈 → stack = [1, 5], current = null

阶段5: 访问节点5
  出栈: current = 5
  访问: result = [4, 2, 5]
  右子树: current = null

阶段6: 访问根节点1
  出栈: current = 1
  访问: result = [4, 2, 5, 1]
  右子树: current = 3

阶段7: 处理节点3
  current = 3 → 入栈 → stack = [3], current = null
  出栈: current = 3
  访问: result = [4, 2, 5, 1, 3]
  右子树: current = null

完成! 返回 [4, 2, 5, 1, 3]
```

### 三种遍历对比

| 遍历方式 | 顺序 | 递归代码位置 |
|---------|------|-------------|
| **前序** | 根→左→右 | `push` 在最前 |
| **中序** | 左→根→右 | `push` 在中间 ⭐ |
| **后序** | 左→右→根 | `push` 在最后 |

**递归法简单原因**: 只需要调整 `result.push(node.val)` 的位置!
