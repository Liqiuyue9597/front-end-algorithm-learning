## Reverse Nodes In K Group
[Reverse Nodes In K Group](https://leetcode.cn/problems/reverse-nodes-in-k-group)：Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.

k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.

---

### 思路

#### 起步决策（用模板 2：dummy）

按链表题决策树：

| 问题 | 答案 |
|---|---|
| 要不要修改链表？ | ✅ 要（反转） |
| head 会不会变？ | ✅ 会（前 k 个被反转） |
| 要不要跨组保留前驱？ | ✅ 要（"上一组尾"要在下一组反转完成后做拼接） |

→ **三问全中，必须用 dummy**。

#### 核心抽象：**切 → 反 → 接**

> 把"反转一段"降级成"反转整条"——只要先把段切下来，反转部分就是 LC 206 原题。

```
1. dummy → head, pre = dummy
2. 循环:
   a. 从 pre 出发探测 k 步,够不够? 不够退出
   b. 切: end.next = null, 把 [start...end] 变成独立链表
   c. 反: pre.next = reverse(start)  ← 直接调 LC 206
   d. 接: start.next = next（旧头变新尾,接回剩下的链表）
   e. 前进: pre = start
3. return dummy.next
```

**记三个字：切、反、接。**

---

### ⭐ 推荐做派：模块化"切-反-接"

```js
var reverseKGroup = function(head, k) {
  const dummy = new ListNode(0);
  dummy.next = head;
  let pre = dummy;

  while (true) {
    // —— 探测：从 pre 出发走 k 步 ——
    let end = pre;
    for (let i = 0; i < k && end !== null; i++) {
      end = end.next;
    }
    if (end === null) break;     // 不够 k 个,剩下的保持原样

    // —— 存关键节点 ——
    const start = pre.next;       // 这一组的开头
    const next = end.next;        // 下一组的起点

    // —— 切 + 反 + 接 ——
    end.next = null;              // 切：让 [start...end] 独立
    pre.next = reverse(start);    // 反 + 左接缝（reverse 是 LC 206 原题）
    start.next = next;            // 右接缝：旧头(新尾) → 下一组起点

    // —— 前进 ——
    pre = start;                  // pre 跳到本组新尾
  }

  return dummy.next;
};

// 辅助函数：反转一整条链表（LC 206 原题，零改造）
function reverse(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}
```

#### 为什么这版好？

1. **反转部分 = LC 206 原题，不需要改造** —— 通过 `end.next = null` 把段变独立，反转就退化成普通链表反转
2. **每行职责单一** —— 切、反、接、前进，四件事四行代码
3. **作用域清晰** —— `end` 是 while 内部的局部变量，"出生 → 使用 → 消亡"全在一轮，不需要跨循环维护

#### 关键点：为什么 `let end = pre`？

探测循环会走 k 次 `end = end.next`。要让走完后 `end` **正好停在第 k 个真实节点**上，起点必须是"段前那一格"——也就是 `pre`。

```
dummy → 1 → 2 → 3 → 4 → 5
  ↑     ↑       ↑
 pre   段头     段尾(end 应停在这)
       
       ←——— 走 k=2 步 ———→
```

- 起点 `pre`（dummy）：走 2 步 → `end = 节点2` ✓
- 起点 `pre.next`（节点1）：走 2 步 → `end = 节点3` ✗（多走一格）

**`pre` 是"段前哨兵"，从哨兵走 k 步刚好落在第 k 个节点**。

---

### 完整运行追踪：`1→2→3→4→5, k=2`

```
初始:  dummy → 1 → 2 → 3 → 4 → 5
       pre = dummy

═══ 第一轮 ═══
探测:  end 从 dummy 走 2 步 → end = 节点2
存:    start = 节点1, next = 节点3
切:    end.next = null
       → dummy → 1 → 2 → null    3 → 4 → 5
反:    reverse(节点1) 返回 节点2
       pre.next = 节点2
       → dummy → 2 → 1 → null    3 → 4 → 5
接:    start.next = 节点3
       → dummy → 2 → 1 → 3 → 4 → 5
进:    pre = 节点1

═══ 第二轮 ═══
探测:  end 从节点1 走 2 步 → end = 节点4
存:    start = 节点3, next = 节点5
切:    end.next = null
反:    reverse(节点3) 返回 节点4
       pre.next = 节点4   (pre 是节点1)
       → dummy → 2 → 1 → 4 → 3 → null    5
接:    start.next = 节点5
       → dummy → 2 → 1 → 4 → 3 → 5
进:    pre = 节点3

═══ 第三轮 ═══
探测:  end 走 2 步:
       第1步: end = 节点5
       第2步: end = null
       break

最终:  2 → 1 → 4 → 3 → 5  ✓
```

---

### 备选写法：先求长度（思路最直白）

如果觉得"边走边判"心智负担大，可以先遍历求长度，循环 `n/k` 次：

```js
var reverseKGroup = function (head, k) {
  let n = 0;
  for (let p = head; p !== null; p = p.next) n++;

  const dummy = new ListNode(0, head);
  let pre = dummy;
  const groups = Math.floor(n / k);

  for (let g = 0; g < groups; g++) {
    const start = pre.next;
    let prev = null;
    let cur = start;

    for (let i = 0; i < k; i++) {
      const next = cur.next;
      cur.next = prev;
      prev = cur;
      cur = next;
    }

    pre.next = prev;        // 接左
    start.next = cur;       // 接右（cur 此时正是下一组起点）
    pre = start;            // 前进
  }

  return dummy.next;
};
```

**优点**：循环次数显式（`groups` 次），不需要 `while(true) + break`。
**代价**：多遍历一次链表求长度（仍是 O(n)）。

---

### 🔑 一个值得记的设计原则

> **如果一段代码需要长篇解释才能让人看懂，往往是设计本身的问题，不是讲解的问题。**

之前见过一种写法：

```js
let pre = dummy;
let end = dummy;            // ← 外层声明
while (end.next != null) {
  for (...) end = end.next;
  // ...
  end = pre;                // ← 末尾重置（看起来很反直觉）
}
```

把 `end` 提到外层后，需要花大段篇幅解释"为什么 end 起点要和 pre 一样"、"为什么末尾要 end = pre"。

而把 `end` 放进 while 内部：

```js
while (true) {
  let end = pre;            // ← 一行代码,自我说明
  ...
}
```

**零解释**——`end` 从 `pre` 出发这件事写在了代码字面上。**不是更聪明，而是更诚实**。

---

### ⚠️ 易错点速查卡

#### 1. 存指针总是在修改之前

```js
const next = end.next;    // ✅ 先存
end.next = null;          // 再切

// ❌ 反过来:
end.next = null;
const next = end.next;    // 已经是 null,后半段链表丢了
```

#### 2. 探测循环要防 null

```js
for (let i = 0; i < k && end !== null; i++) {
  end = end.next;
}
```

如果不加 `end !== null`，链表长度不是 k 的倍数时会执行 `null.next` → 崩溃。

#### 3. `pre = start`，不是 `pre = end`

反转后**旧的 start 变成了新尾**（因为反转把头尾对调）。下一组要接在新尾后面，所以 `pre = start`。

#### 4. dummy 必须用，且最后返回 `dummy.next`

前 k 个会被反转，head 一定会变。dummy 统一处理"接左边"的锚点。

---

### 复杂度

- **时间**：O(n)，每个节点被访问常数次（探测 1 次 + 反转 1 次）
- **空间**：O(1)

---

### 面试讲解模板

```
1. "前 k 个会被反转,头会变 → 用 dummy。"
2. "我用一个辅助函数 reverse 反转整条链表（LC 206 原题）。"
3. "主循环做三件事：切 → 反 → 接。
    - 切：end.next = null,让这一段变独立链表
    - 反：调 reverse(start),返回新头
    - 接：旧 start 变成新尾,接回下一组起点"
4. "探测时让 end 从 pre 出发走 k 步,
    走完后 end 正好停在段尾。
    不够 k 个就 break,剩下的保持原样。"
5. "时间 O(n),空间 O(1)。"
```
