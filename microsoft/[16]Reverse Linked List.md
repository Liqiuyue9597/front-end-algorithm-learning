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

---

### ⚠️ `prev` 初始化的反例对照卡

**核心概念**：在 JS 链表里，**`null` 是"没有节点"**，**`new ListNode(...)` 是"一个真实节点"**——这两个东西完全不同，混用会出错。

#### 反例对照表

| 写法 | `prev` 的值 | 第一轮 `cur.next = prev` 后 `1.next` 是 | 结果 |
|---|---|---|---|
| ✅ `let prev = null;` | `null` | `null` | **正确**：原 head 反转后变成尾巴，`next` 是 `null`，符合链表约定 |
| ❌ `let prev;` | `undefined` | `undefined` | **错误**：尾节点 `next === undefined`，`undefined !== null`，LeetCode 遍历时会报 `Cannot read properties of undefined` |
| ❌ `let prev = new ListNode(null);` | `{val:null, next:null}` | 一个真实节点 | **严重错误**：造了个垃圾节点，被反转进结果尾部，链表多出一个 `val:null` 的节点 |
| ❌ `let prev = 0;` / `false` / `{}` | 任意非 null 值 | 该值本身 | **错误**：尾节点 `next` 不是 `null`，违反链表约定 |

#### 三个关键概念

```
null              → "没有节点"(链表的尽头)
undefined         → "变量没赋值"(JS 默认行为,不是程序员的"空"语义)
new ListNode(x)   → "造了一个节点出来"(实体对象)
```

**`null` 是唯一表达"链表尽头"的值。**

#### 为什么 dummy 用 `new ListNode(0)` 没事？

| 写法 | 创造了节点 | 节点结局 |
|---|---|---|
| `prev = new ListNode(null)` | ✓ | **被反转进结果链表** ← 污染 |
| `dummy = new ListNode(0, head)` | ✓ | 最后 `return dummy.next` **跳过它** ← 干净 |

**dummy 的精髓是"用完即弃"**——它只是临时锚点，最终通过 `return dummy.next` 把它抛弃，不进入结果。

#### 写链表代码时永远问自己两个问题

1. **这个变量代表"节点"还是"空"？**
   - 节点 → 用 `new ListNode(...)`
   - 空   → 用 `null`（**永远不要用 `undefined` 或 `new ListNode(null)`**）

2. **这个变量最终会不会进入结果链表？**
   - 会   → 必须是题目要求的真实数据
   - 不会 → 用 `dummy.next` 跳过它

#### 一句话记忆

> **`prev = null` 不是凑巧——它精准对应了"原 head 反转后变成尾巴，next 必须是 null"这一事实。**
>
> 任何其他初始值都会让节点 1 的 `next` 指向错误的东西。

