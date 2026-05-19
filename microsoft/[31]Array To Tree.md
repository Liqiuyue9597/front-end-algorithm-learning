# 扁平数组转树状结构（Array to Tree）

## 题目描述

给定一个扁平数组，每个元素有 `id` 和 `parentId`，实现函数将其转化为树状结构。

```js
// 输入
const list = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 2, name: '部门B', parentId: 1 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 2 },
  { id: 5, name: '部门E', parentId: 3 },
];

// 输出：树形结构
// { id: 1, name: '部门A', parentId: 0, children: [
//     { id: 2, ..., children: [{ id: 4, ... }] },
//     { id: 3, ..., children: [{ id: 5, ... }] },
// ]}
```

## 核心思路

**HashMap 存引用 + 两次遍历建关系 = O(n) 建树**

- 第一遍：用 `id` 做 key 建索引，保证"找父亲"是 O(1)
- 第二遍：遍历数组，通过 `parentId` 找到父节点，把自己 push 到父的 children

## 我踩过的坑

### ❌ 错误思路：用 parentId 做 Map 的 key

最开始我用 `parentId` 作为 Map 的 key，把所有相同 parentId 的节点归到一组：

```js
// ❌ 错误做法
map.set(item.parentId, [item1, item2, ...])
```

**问题**：这样分组后，我知道"每个父亲有哪些孩子"，但我**找不到父节点本身在哪**。想把 children 挂到父节点上时，没有 `id → 节点` 的索引，就卡住了。

### ✅ 正确做法：用 id 做 Map 的 key

```js
// ✅ 正确做法
map.set(item.id, { ...item, children: [] })
```

**为什么用 id？** 因为核心操作是"找到我爸，把我挂到他的 children 下"。要"找到我爸"→ 需要通过 `parentId` 查到父节点对象 → 所以 Map 里应该是 `id → 节点`，这样 `map.get(parentId)` 就直接拿到了父节点。

### ❌ 忘记处理根节点

根节点的 `parentId` 是 0，但 Map 里没有 id=0 的节点，`map.get(0)` 会是 undefined 报错。需要特判：如果 `parentId === 0`，说明它是根节点，记录下来作为返回值。

## 最终代码

```ts
const fn = (list) => {
  const map = new Map();
  let root;

  // 第一遍：建立 id → 节点 的索引
  list.forEach(item => {
    map.set(item.id, { ...item, children: [] })
  });

  // 第二遍：建立父子关系
  list.forEach(item => {
    if (item.parentId === 0) {
      root = map.get(item.id);
    } else {
      map.get(item.parentId).children.push(map.get(item.id))
    }
  })

  return root;
}
```

## 关键理解

| 要点 | 说明 |
|------|------|
| Map 的 key 用什么 | 用 `id`，因为需要"通过 parentId 找到父节点对象" |
| 为什么两遍遍历 | 第一遍保证所有节点都在 Map 里，第二遍连线时不会取到 undefined |
| 为什么能一次遍历 | JS 对象是引用类型，先建壳后填数据，引用不变 |
| 根节点怎么处理 | `parentId === 0` 特判，不往 Map 里找 |
| 时间复杂度 | O(n)，两遍遍历各 O(n) |
| 空间复杂度 | O(n)，Map 存了所有节点 |

## 面试追问

| 追问 | 应对 |
|------|------|
| "能不能一遍遍历？" | 可以，遍历时如果 parent 不在 map 里就先建空壳，后续遍历到时再填充 |
| "如果有多棵树（森林）？" | 返回数组，收集所有 `parentId === 0` 的节点 |
| "如果数据有环？" | 不是合法树结构，可以用 visited Set 检测 |
| "不想修改原数据？" | 第一遍用 `{ ...item, children: [] }` 浅拷贝（已经这么做了） |

## 关联

- 前端常见场景：菜单/目录/评论的树形渲染
- 泛化模式：任何"扁平关系数据 → 层级结构"都是 HashMap 思路
- 逆操作：树形结构拍平成数组（BFS/DFS 遍历）
