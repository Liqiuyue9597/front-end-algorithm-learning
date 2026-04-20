## Merge Two Sorted Lists
[Merge Two Sorted Lists](https://leetcode.cn/problems/merge-two-sorted-lists/)：You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

### 思路
使用迭代法，通过虚拟头节点简化边界处理：

1. 创建一个虚拟头节点 dummy，用 current 指针指向当前构建链表的末尾
2. 比较 list1 和 list2 的当前节点值，把较小的节点接到 current.next
3. 移动对应的链表指针和 current 指针
4. 当一个链表遍历完后，另一个链表剩余部分直接接到末尾
5. 返回 dummy.next（跳过虚拟头节点）

时间复杂度：O(m + n)，空间复杂度：O(1)

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
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    // 创建虚拟头节点，简化边界处理
    const dummy = new ListNode(-1);
    let current = dummy;
    
    // 同时遍历两个链表
    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            // list1 的值更小，接到 current 后面
            current.next = list1;
            list1 = list1.next;
        } else {
            // list2 的值更小，接到 current 后面
            current.next = list2;
            list2 = list2.next;
        }
        // 移动 current 指针
        current = current.next;
    }
    
    // 处理剩余节点：直接接上剩余的链表
    // 因为都是有序的，剩余部分已经排好序了
    current.next = list1 !== null ? list1 : list2;
    
    // 返回合并后的链表（跳过虚拟头节点）
    return dummy.next;
};
```
