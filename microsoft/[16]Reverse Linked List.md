## Reverse Linked List
[Reverse Linked List](https://leetcode.cn/problems/reverse-linked-list)：Given the head of a singly linked list, reverse the list, and return the reversed list.


### 思路
使用迭代法，通过三个指针逐个反转节点的指向：

1. 使用三个指针：prev（前一个节点）、current（当前节点）、next（下一个节点）
2. 遍历链表，对每个节点进行反转：
   - 先保存下一个节点 next = current.next（防止断链）
   - 反转当前节点的指向 current.next = prev
   - 移动指针：prev = current，current = next
3. 当 current 为 null 时，prev 就是新的头节点

时间复杂度：O(n)，空间复杂度：O(1)

### 代码
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    // prev：前一个节点，初始为 null
    let prev = null;
    // current：当前处理的节点
    let current = head;
    
    // 遍历链表，逐个反转节点
    while (current !== null) {
        // 1. 先保存下一个节点（防止断链）
        const next = current.next;
        
        // 2. 反转当前节点的指向
        current.next = prev;
        
        // 3. 移动 prev 和 current 指针
        prev = current;
        current = next;
    }
    
    // 此时 current 为 null，prev 是新的头节点
    return prev;
};
```
