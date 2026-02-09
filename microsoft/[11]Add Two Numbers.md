## Add Two Numbers
[Add Two Numbers](https://leetcode.cn/problems/add-two-numbers)：You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.


### 思路
这种题目也叫做**大数相加**。在数字大到无法简单的使用编程语言里的加减计算时就需要换一种思路去计算。

因为JavaScript基本数据类Number是双精度浮点数，它可以表示的最大安全范围是正负9007199254740991，也就是2的53次方减一, 任何超出安全范围的数字都可能会失去精度。
转换一下思路：
1. 面试官：在JavaScript里超出精度的数字计算怎么算？->链表的两数相加
1. 面试官追问：不用链表，用字符串可以计算吗？ ->字符串的两数相加

解法：
按照链表的规则相互加，遇到大于10时将进位记录即可，只是要考虑到最后一位也是进位的话，那么最终的结果需要再多加一个**1**的链表节点。

> 注意：链表有一个技巧，未知链表的值但是需要创建链表时，可以先创建一个prev链表作为虚拟节点，实际的结果放弃这个虚拟节点取next就行。使用虚拟指针的目的在于链表初始化时无可用节点值，而且链表构造过程需要指针移动，进而会导致头指针丢失，无法返回结果。

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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  const head = new ListNode(0);
  let prev = head;
  let val1, val2, curry = 0;
  while (l1 || l2) {
    val1 = l1 ? l1.val : 0;
    val2 = l2 ? l2.val : 0;
    sum = val1 + val2 + curry;
    prev.next = new ListNode(sum % 10);
    prev = prev.next;

    curry = sum >= 10 ? 1 : 0;
    if (l1) {
      l1 = l1.next
    }
    if (l2) {
      l2 = l2.next
    }
  }
  if(curry === 1) {
    prev.next = new ListNode(1);
  }
  return head.next;
};

```
