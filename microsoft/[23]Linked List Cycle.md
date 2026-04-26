## Linked List Cycle
[Linked List Cycle](https://leetcode.cn/problems/linked-list-cycle)：Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.

### 思路

**核心算法: 快慢指针(Floyd判圈算法)**

想象操场跑圈:
- 两个人同时起跑,一个跑得快(每次2步),一个跑得慢(每次1步)
- 如果是**直线跑道**(无环) → 快的人先到终点,永不相遇
- 如果是**环形跑道**(有环) → 快的人会套圈,必然相遇

**步骤**:
1. 设置两个指针 `slow` 和 `fast`,都从 `head` 开始
2. `slow` 每次走1步,`fast` 每次走2步
3. 循环条件: `fast && fast.next`(快指针能走两步)
4. 如果 `slow === fast` → 相遇了,返回 `true`(有环)
5. 如果 `fast` 到达 `null` → 无环,返回 `false`

**为什么快指针必定能追上慢指针?**
- 进入环后,快指针每轮比慢指针多走1步
- 距离差每轮缩小1,最终必定相遇
- 不会"跳过"慢指针(因为每次只缩小1步)

### 代码
```js
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    // 边界: 空链表或单节点无环
    if (!head || !head.next) return false;
    
    let slow = head;
    let fast = head;
    
    // 快指针每次走2步,慢指针走1步
    while (fast && fast.next) {
        slow = slow.next;        // 慢指针走1步
        fast = fast.next.next;   // 快指针走2步
        
        // 相遇了!说明有环
        if (slow === fast) {
            return true;
        }
    }
    
    // 快指针到头了,说明无环
    return false;
};
```

### 执行过程示例

**Example 1: 有环**
```
链表: 3 → 2 → 0 → -4 ↶
           ↑_________|
           
初始状态:
slow = 3, fast = 3

第1步:
slow = 2 (走1步)
fast = 0 (走2步)

第2步:
slow = 0
fast = 2

第3步:
slow = -4
fast = -4  ← 相遇!返回 true
```

**Example 2: 无环**
```
链表: 1 → 2 → 3 → null

初始状态:
slow = 1, fast = 1

第1步:
slow = 2
fast = 3

第2步:
fast.next = null  ← 快指针到头,循环结束
返回 false
```

**Example 3: 单节点无环**
```
链表: 1 → null

head.next = null
直接返回 false (边界条件)
```

### 复杂度
- **时间复杂度**: O(n)
  - 无环: 快指针遍历到末尾,最多走n/2步
  - 有环: 快指针最多绕环2圈追上慢指针
- **空间复杂度**: O(1),只用了两个指针

### 其他解法对比

**方法2: 哈希表(Set)**
```js
var hasCycle = function(head) {
    const visited = new Set();
    let current = head;
    
    while (current) {
        if (visited.has(current)) return true;  // 访问过,有环
        visited.set(current);
        current = current.next;
    }
    return false;
};
```
- 时间复杂度: O(n)
- 空间复杂度: O(n) ← 需要额外存储

**快慢指针 vs 哈希表**:
- 快慢指针: 空间O(1),更优!✅
- 哈希表: 空间O(n),但思路更直观

### 易错点
1. **循环条件错误**: 必须是 `fast && fast.next`,不能只判断 `fast`
2. **边界遗漏**: 忘记处理空链表或单节点
3. **相遇判断错误**: 应该判断 `slow === fast`(引用相等),不是 `slow.val === fast.val`(值相等)

### 进阶题目
**LeetCode 142. Linked List Cycle II** - 找到环的入口节点(需要数学推导!)
