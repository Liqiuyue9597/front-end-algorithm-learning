## Binary Tree Preorder Traversal
[Binary Tree Preorder Traversal](https://leetcode.cn/problems/binary-tree-preorder-traversal)：Given the root of a binary tree, return the preorder traversal of its nodes' values.


### 思路

#### 方法一:递归法⭐ 推荐初学者

**前序遍历顺序:根 → 左 → 右**

递归三步:
1. 访问根节点(加入结果)
2. 递归遍历左子树
3. 递归遍历右子树

时间复杂度:O(n),空间复杂度:O(n)(递归栈)

#### 方法二:迭代法(栈模拟)⭐⭐

用栈模拟递归过程:
1. 根节点入栈
2. 循环:出栈节点,访问它,然后**先压右子节点,再压左子节点**
3. 重复直到栈为空

**关键**:先压右再压左,因为栈是后进先出(LIFO),这样左子树会先被访问

时间复杂度:O(n),空间复杂度:O(n)(栈)

### 代码

#### 方法一:递归法
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
var preorderTraversal = function(root) {
    const result = [];
    
    // 递归函数
    function preorder(node) {
        if (node === null) return;  // 递归终止条件
        
        // 前序遍历三步:根 → 左 → 右
        result.push(node.val);      // 1. 访问根节点
        preorder(node.left);        // 2. 递归左子树
        preorder(node.right);       // 3. 递归右子树
    }
    
    preorder(root);
    return result;
};
```

#### 方法二:迭代法(栈)
```js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    if (root === null) return [];
    
    const result = [];
    const stack = [root];  // 初始化栈,根节点入栈
    
    while (stack.length > 0) {
        // 出栈一个节点
        const node = stack.pop();
        
        // 访问当前节点
        result.push(node.val);
        
        // 关键:先压右子节点,再压左子节点
        // 因为栈是后进先出,这样左子树会先被访问
        if (node.right !== null) {
            stack.push(node.right);  // 先压右
        }
        if (node.left !== null) {
            stack.push(node.left);   // 再压左(后压的先出)
        }
    }
    
    return result;
};
```

**执行过程示例**(树结构:1 → 2/3,2 → 4/5):
```
初始:stack = [1]

第1次循环:
  pop: node = 1
  result = [1]
  压右:stack = [3]
  压左:stack = [3, 2]

第2次循环:
  pop: node = 2 (左子树先出)
  result = [1, 2]
  压右:stack = [3, 5]
  压左:stack = [3, 5, 4]

第3次循环:
  pop: node = 4
  result = [1, 2, 4]
  无子节点,stack = [3, 5]

第4次循环:
  pop: node = 5
  result = [1, 2, 4, 5]
  无子节点,stack = [3]

第5次循环:
  pop: node = 3
  result = [1, 2, 4, 5, 3]
  无子节点,stack = []

结束,返回 [1, 2, 4, 5, 3]
```
