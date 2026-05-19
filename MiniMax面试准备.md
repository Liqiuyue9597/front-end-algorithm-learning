# MiniMax 前端 + Agent 岗位面试准备

> 整理自牛客网、掘金、CSDN 等平台的真实面经，日期：2026/05/15

---

## 一、算法题（手写代码）

> ⚠️ MiniMax 要求「100% 可运行代码」，不接受伪代码，代码需在线编辑器中直接跑通。

| 题目 | 类型 | 对应 LeetCode | 难度 |
|---|---|---|---|
| 合并区间 | 排序 + 贪心 | LC 56 | 中等 |
| 最长无重复子串 | 滑动窗口 | LC 3 | 中等 |
| 二叉树锯齿形层序遍历 | BFS 变种 | LC 103 | 中等 |
| K 个一组反转链表 | 链表递归/迭代 | LC 25 | 困难 |
| 目标和（Target Sum） | DP / 回溯 | LC 494 | 中等 |
| 三数之和变种（sum = target） | 双指针 | LC 15 变种 | 中等 |
| 数组 id/parentId 构建树结构 | 树 + 哈希 | 原创题 | 中等 |

---

## 二、手写前端题

### 2.1 工具函数类

```js
// 1. 深拷贝（需处理循环引用 & Symbol 属性）
function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (map.has(obj)) return map.get(obj);
  const clone = Array.isArray(obj) ? [] : {};
  map.set(obj, clone);
  for (const key of [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)]) {
    clone[key] = deepClone(obj[key], map);
  }
  return clone;
}

// 2. 防抖（支持 immediate 立即执行）
function debounce(fn, delay, immediate = false) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    if (immediate && !timer) fn.apply(this, args);
    timer = setTimeout(() => {
      if (!immediate) fn.apply(this, args);
      timer = null;
    }, delay);
  };
}

// 3. 节流
function throttle(fn, interval) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= interval) {
      last = now;
      fn.apply(this, args);
    }
  };
}

// 4. 柯里化（支持分步传参）
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this, args);
    return function (...args2) {
      return curried.apply(this, args.concat(args2));
    };
  };
}

// 5. Promise 超时控制
function timeoutPromise(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), ms)
    )
  ]);
}

// 6. Promisify（将回调函数转换为 Promise）
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };
}
```

### 2.2 并发控制类（Agent 场景高频）

```js
// 并发请求控制器（同时最多 N 个请求）
class ConcurrentController {
  constructor(limit) {
    this.limit = limit;
    this.running = 0;
    this.queue = [];
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.run();
    });
  }

  run() {
    while (this.running < this.limit && this.queue.length) {
      const { task, resolve, reject } = this.queue.shift();
      this.running++;
      task()
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.running--;
          this.run();
        });
    }
  }
}

// 合并重复 API 请求（同一接口并发调用只发一次）
const cache = new Map();
function dedupeRequest(url) {
  if (cache.has(url)) return cache.get(url);
  const req = fetch(url).finally(() => cache.delete(url));
  cache.set(url, req);
  return req;
}
```

### 2.3 TypeScript 工具类型手写

```ts
type MyPartial<T> = { [K in keyof T]?: T[K] }
type MyRequired<T> = { [K in keyof T]-?: T[K] }
type MyReadonly<T> = { readonly [K in keyof T]: T[K] }
type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : never
```

---

## 三、AI / Agent 岗位专项考点

### 3.1 流式输出与协议选型（必考）

| 问题 | 考察点 |
|---|---|
| SSE vs WebSocket vs fetch streaming 如何选择？ | LLM 场景下的技术选型理由 |
| SSE 消息格式是什么？`id`/`retry` 字段的用途？ | 协议细节 |
| 流式输出中断如何做断点续传？ | `Last-Event-ID` 请求头 |
| 前端如何优化逐 token 渲染性能？ | `requestAnimationFrame`、虚拟列表、批量更新 |

**标准答案方向：**
- AI 输出是**单向推送**，SSE 比 WebSocket 更轻量、自动重连、兼容 HTTP/2，是首选
- 需要 POST 请求时改用 `fetch + ReadableStream`（SSE 仅支持 GET）
- 断点续传：客户端在重连请求中带上 `Last-Event-ID`，服务端从该 ID 后续继续推

```js
// fetch 流式读取示例
async function streamFetch(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  });
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    console.log(decoder.decode(value));
  }
}
```

### 3.2 Agent 工作流 / 产品理解

- 如何将用户需求拆解为多步骤 Agent 任务（工作流设计思路）
- 前端如何展示 Agent 中间步骤的执行状态（进度流 / 状态机）
- Markdown 流式渲染的实现：渐进解析 vs 全量解析的取舍

### 3.3 React 在 AI 产品中的应用

- `useEffect` 依赖项陷阱（在流式更新场景下尤其易错）
- `useState` vs `useRef`：高频更新场景下 `useRef` 不触发渲染，性能更好
- `React.lazy` + `Suspense` 实现大模型响应骨架屏
- Recoil 等原子状态管理库的选型理由

---

## 四、前端基础（追问方向）

| 话题 | 具体问题 |
|---|---|
| **JS 类型** | `==` vs `===`、`typeof null === 'object'`、隐式转换规则 |
| **this 指向** | `eval` 和 `new Function` 中的 `this` 分别指向什么 |
| **浏览器 API** | Intersection Observer 懒加载、Web Worker 在文件上传中的应用 |
| **网络** | XHR vs fetch 的区别、JWT 双 token 刷新机制 |
| **构建工具** | Vite vs Webpack 区别、TailwindCSS 的 tree-shaking 机制 |
| **框架原理** | Vue2 vs Vue3 Diff 算法差异、React Hooks 链表结构 |

---

## 五、备考建议

| 方向 | 建议 |
|---|---|
| **算法** | LeetCode 中等为主，链表/树/双指针/DP，必须写出无 bug 可运行代码 |
| **手写题** | 深拷贝、防抖节流、并发控制、Promise 系列每道都要练熟 |
| **SSE / 流式渲染** | AI 产品前端核心差异点，能清晰说明选型理由和实现细节 |
| **项目追问** | 面试官会深挖「为什么用这个技术」，每个技术选型都要准备理由 |
| **产品了解** | 提前体验 MiniMax 旗下产品（海螺 AI、talkie 等），了解 Agent 功能 |

---

## 参考来源

- [MiniMax 前端实习二面面经 - CSDN](https://blog.csdn.net/weixin_50077637/article/details/158042413)
- [MiniMax 前端一面面经（合并重复请求）- 牛客](https://www.nowcoder.com/discuss/798611554940747776)
- [MiniMax 面试真题汇总 - 牛客](https://m.nowcoder.com/discuss/798036152795004928)
- [MiniMax 面试真题 - CSDN](https://blog.csdn.net/Lonelycity_zyz/article/details/151871271)
- [前端 AI 开发面试题：SSE vs WebSocket - 掘金](https://juejin.cn/post/7551732869267406887)
