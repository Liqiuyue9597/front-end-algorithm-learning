# Moonshot · 智谱 · 阶跃星辰 前端社招面经汇总

> 整理日期：2026/05/30 · 来源：牛客 / 掘金 / 知乎 / CSDN / V2EX / i人事 等公开面经
>
> **数据透明度声明**：三家公司的公开前端社招面经普遍稀缺。本文档基于 fetch 阶段抓取的 6 个搜索 angle、约 30 篇候选源整理，最终筛出与"前端 + 社招"高度相关的一手帖共 5 篇，以及 12 篇技术备考辅料和横向参考帖。**所有数字与原文叙述均来源于公开链接；如某公司某轮次在公开面经中查不到具体信息，文中明确写"暂无公开面经数据"，不做猜测**。

---

## 速览对比表

| 公司 | 主营产品 | 面试流程（公开口径） | 难度倾向 | 算法/手写风格 | 特色考点 | 一手前端面经命中数 |
| --- | --- | --- | --- | --- | --- | --- |
| **Moonshot AI** 月之暗面 | Kimi 长文本对话、Kimi 视觉、Kimi+ | 公开口径中"3 轮"为主，但纯前端社招贴极少 | 公开样本不足以判断 | 公开样本不足 | 长文本前端、SSE 流式、Markdown 渲染、Kimi API 集成 | **0 篇** 直接命中前端社招（仅有内容运营/普通后端帖） |
| **智谱 AI**（智谱华章 / GLM / 智谱清言） | GLM-4 / AutoGLM / 智谱清言 | 网申 → 在线测评/笔试 → 一面（技术/业务）→ 二面（交叉/系统设计）→ 三面（主管/Boss）→ HR 面，从投递到 offer 通常 2–4 周（来源为 i人事综合攻略，非个人一手） | 中等偏基础（基于 2022 社招 + 2024 实习两条样本） | 一面有手撕（二叉树叶子等差数列、Tab 组件、Promise+setTimeout 输出顺序） | React Router Outlet、useEffect 依赖、大文件分片上传、小程序性能优化项目追问 | **2 篇社招（2022）+ 1 篇实习（2024）** |
| **阶跃星辰 StepFun** | Step 系列多模态（语音/图像/视频） | 公开样本不足以归纳轮次 | 一面手撕被描述为"偏 hard，风格类似字节" | 公开提到大模型评测相关算法（BLEU、AUC） | 大模型评测题、RAG 挑战、"大模型时代前端研究方向"开放题、STAR 法则项目深挖 | **1 篇** 直接命中（牛客 1 帖） |

> 注：上表"流程"一栏，**Moonshot 与 StepFun 的轮次未在抓取到的公开面经中查到具体描述**，所以只列了公开口径下能确认的内容；不要把表格当成确定结论。

---

## 一、Moonshot 月之暗面（Kimi）

### 1.0 数据稀缺性说明

抓取阶段在 6 个搜索 angle 下，**没有命中一篇严格意义上的"Moonshot 前端社招"一手面经帖**。能找到的相关帖大致分三类：

1. **非前端岗位** — 牛客《社招，月之暗面怎么样，可以去吗？》明确提到岗位是"普通后端，不是做大模型"（来源：[牛客社招讨论帖](https://www.nowcoder.com/feed/main/detail/f522798f925941178f607dc1495d0542)）；CSDN《文科生勇闯 AI 大厂》岗位实际是**内容运营（Content Operations）**，并非前端工程师，且文章被识别为对"幕语 AI"工具的软文/广告（来源：[CSDN 二手贴](https://blog.csdn.net/lele_lele_lele/article/details/158069852)）。
2. **横向综合贴** — CSDN 两篇国内大模型公司面经汇总贴里提到 Moonshot 流程节奏，但都不是纯前端，仅做面试氛围参考（[CSDN 综合贴 1](https://blog.csdn.net/shanguicsdn000/article/details/139782918)、[CSDN 综合贴 2](https://blog.csdn.net/2401_85280106/article/details/145159735)，二手综合面经）。
3. **基于 Kimi API 的项目教程** — 不是面经，但官方业务方向能从中印证（[掘金：React 智能前端，调用月之暗面 API](https://juejin.cn/post/7523731174762643497)、[掘金：拍照识别单词调用 Kimi](https://juejin.cn/post/7524676569470615602)）。

**因此本节大量子章节会标"暂无公开面经数据"，请以社招实际节奏为准。**

### 1.1 流程与节奏

暂无公开前端社招面经数据可以归纳具体轮数与时长。仅有的间接参考（仍为非前端岗）：

- CSDN《文科生勇闯 AI 大厂》提到 Moonshot 内容运营岗有"三轮面试结构 + HR 提问"，但此条与前端无关，仅做公司侧面试氛围参考（来源：[CSDN 二手贴（非前端，软文嫌疑）](https://blog.csdn.net/lele_lele_lele/article/details/158069852)）。
- V2EX 上有 8 年前端在两周内集中面试多家的实录，回帖提到月之暗面/智谱/阶跃星辰（来源：[V2EX 八年前端两周面试实录](https://staging.v2ex.com/t/1110790#reply129)），但需进入回帖逐条筛选，本次抓取阶段未提取到针对 Moonshot 前端的可证伪声明。

### 1.2 算法真题

| 题目 | LeetCode | 难度 | 来源 |
| --- | --- | --- | --- |
| —— | —— | —— | **暂无公开前端社招面经数据，未在抓取到的来源中查到 Moonshot 前端社招算法原题** |

### 1.3 手写题

暂无公开前端社招面经数据。

### 1.4 八股 / 原理

暂无公开前端社招面经数据。

### 1.5 项目深挖（推测方向，非真题）

> ⚠️ 以下不是从 Moonshot 面经中抽出的题，而是从 Moonshot **业务方向**反推的高概率方向，仅作准备参考：

- **长文本前端处理**：Kimi 主打超长上下文（百万级 token），前端如何承接超长会话历史的渲染、滚动、虚拟列表 — 这是 Kimi 业务最显眼的差异点。
- **SSE 流式渲染 + Markdown 增量解析**：Kimi 输出包含代码块、表格、LaTeX，流式输出场景下未闭合代码块如何渲染（参考 Streamdown 思路，见第四章共通考点）。
- **多模态前端**：Kimi 视觉、Kimi+ 助手，文件上传 + 图像 base64 + Prompt 设计（来源：[掘金 - 拍照识别单词调用 Kimi 项目教程](https://juejin.cn/post/7524676569470615602)、[掘金 - 基于月之暗面 API 的图片分析页面](https://juejin.cn/post/7523731174762643497)）。

### 1.6 Leader / HR 面常问

暂无公开前端社招面经数据。CSDN 二手综合贴笼统提到"Moonshot HR 提问风格"，但未列具体问题，且原文是非前端岗，参考价值有限（来源：[CSDN 二手贴](https://blog.csdn.net/lele_lele_lele/article/details/158069852)）。

### 1.7 薪资 / Offer 信息

暂无公开前端社招面经数据。牛客《社招，月之暗面怎么样》一帖的评论区据称有薪资范围与团队氛围反馈，但抓取阶段未提取到具体数字，且原帖岗位是普通后端而非前端（来源：[牛客社招讨论帖](https://www.nowcoder.com/feed/main/detail/f522798f925941178f607dc1495d0542)）。

---

## 二、智谱 AI（智谱华章 / GLM / 智谱清言）

### 2.0 数据来源说明

智谱前端公开面经中，**最一手、信息最完整的两篇是 2022 年 3 月的"智谱华章"前端一面/二面**（智谱华章是智谱 AI 的法人主体名称）。这两篇时间早于 GLM-4（2024 年 1 月发布）和 AutoGLM 时代，属于"前 LLM 时代"的智谱面试，参考价值在于了解智谱传统的面试风格，不一定反映当前 AI 大模型业务下的新考察方向。

| 来源 | 类型 | 日期 | 命中度 |
| --- | --- | --- | --- |
| [掘金：智谱华章前端面试（一面）](https://juejin.cn/post/7070306951732658207) | 社招一面，原作者亲历 | 2022-03-02 | 高（含具体题与代码） |
| [掘金：智谱华章前端面试（二面）](https://juejin.cn/post/7070535573395472391) | 社招二面，同一作者 | 2022-03-03 | 高（行为面记录） |
| [牛客：北京智谱 前端开发 日常实习一面面经](https://www.nowcoder.com/feed/main/detail/890d42b64b6547efafdc370e0d4e4d3b?sourceSSR=post) | 实习（**非社招**） | 2024-11-26 | 中（社招非完全等同，仅作风格参考） |
| [i人事：智谱 AI 公司面试攻略](https://irenshi.cn/p/385563) | 综合攻略，非个人一手 | （未标注） | 低（流程描述偏算法岗，前端不直接对应） |

> **注意：i人事攻略明确写到智谱 AI 招聘岗位为"研究 / 算法 / 平台工程 / 应用工程（Agent/RAG/服务端）/ 产品 / 解决方案"，并未列出"前端工程师"作为独立岗位族**，且其面试流程描述更贴近算法岗（DPO/RLHF/分布式训练等）（来源：[i人事攻略](https://irenshi.cn/p/385563)）。所以本节流程描述以掘金一手社招贴 + 牛客实习贴交叉为准。

### 2.1 流程与节奏

- **2022 社招一面**：腾讯会议视频面试，女性面试官主持，氛围友好（候选人形容为"温柔的小姐姐"），晚 8:31 开始，时长约 30–40 分钟（含收尾讨论）（来源：[掘金一面](https://juejin.cn/post/7070306951732658207)）。
- **2022 社招二面**：晚 8:30 开始，面试官为事业部负责人；候选人被告知将成为该新事业部第一位前端工程师，反映彼时智谱前端团队仍处于早期组建阶段；本轮**几乎不考察技术**，全部围绕项目 + 个人发展（来源：[掘金二面](https://juejin.cn/post/7070535573395472391)）。
- **2024 实习一面**：30 分钟（来源：[牛客实习一面](https://www.nowcoder.com/feed/main/detail/890d42b64b6547efafdc370e0d4e4d3b?sourceSSR=post)）。
- **公司层面综合流程**（i人事攻略，非前端专属）：网申/内推 → 在线测评/笔试 → 一面（技术/业务）→ 二面（交叉/系统设计）→ 三面（主管/Boss）→ HR 面，**从投递到 offer 一般 2–4 周**（来源：[i人事攻略](https://irenshi.cn/p/385563)）。HR 轮关注 motivation、稳定性、薪资期望、团队 fit。

> ⚠️ 一面 + 二面同一作者公开两轮，但原文未提到三面/HR 面是否拿到，**社招完整轮次（一面到 offer 落地）暂无公开面经数据**。

### 2.2 算法 / 手写真题（一面）

> 来源主要为 [掘金一面](https://juejin.cn/post/7070306951732658207)（2022-03-02 社招）。这些是抓取数据中**唯一直接命中"智谱前端社招"的题目集合**。

#### 2.2.1 Promise + setTimeout 事件循环

```js
// 题目：写出输出顺序
new Promise(resolve => {
  console.log(1);
  setTimeout(resolve, 100, 2);
  console.log(3);
}).then(data => console.log(data));

// 输出：1 → 3 → 2
// 考点：
// - Promise executor 同步执行：先打印 1
// - setTimeout 第三参数 2 会被作为参数传给 resolve（即 resolve(2)）
// - 同步代码继续打印 3
// - 100ms 后定时器触发 resolve(2)，then 回调拿到 2
```

来源：[掘金一面](https://juejin.cn/post/7070306951732658207)；考点字面引用："事件循环机制、setTimeout 第三参数用法"。

#### 2.2.2 递归 + ES6 数组 API（fun(2,3,4) 执行结果）

题面要求分析一个递归函数 `fun(2,3,4)` 的执行结果。考点（原文表述）：递归、ES6 解构、rest 参数、Array 构造函数、`fill()`、`map()` 在稀疏数组上的行为（来源：[掘金一面](https://juejin.cn/post/7070306951732658207)）。

> ⚠️ 抓取的 claim 中只摘录了"考点列表"，**原题完整代码未在抓取出的 quote 中给出**。建议直接打开掘金原帖核对。

知识点要点（背记型）：

```js
// Array 构造函数 + fill + map 稀疏数组陷阱
new Array(3);                    // 长度 3 但是稀疏（slot 是 empty，不是 undefined）
new Array(3).map(x => 1);        // 稀疏数组上 map 不执行回调，结果仍为稀疏数组
new Array(3).fill(undefined);    // 先填实，让 slot 变成 undefined
new Array(3).fill(undefined).map(x => 1);  // 现在 map 才会执行 → [1, 1, 1]

// Array.from 也能把稀疏变实
Array.from({length: 3}).map((_, i) => i);  // [0, 1, 2]
```

#### 2.2.3 二叉树叶子节点是否构成等差数列（手写）

> 来源：[掘金一面](https://juejin.cn/post/7070306951732658207)。原帖要求**给出暴力解和优化解两种实现**。

```js
// 暴力解：先中序遍历收集所有叶子节点值，再判断是否构成等差数列
function isLeavesArithmetic(root) {
  const leaves = [];
  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    if (!node.left && !node.right) leaves.push(node.val);
    inorder(node.right);
  }
  inorder(root);
  if (leaves.length < 2) return true;
  const diff = leaves[1] - leaves[0];
  for (let i = 2; i < leaves.length; i++) {
    if (leaves[i] - leaves[i - 1] !== diff) return false;
  }
  return true;
}

// 优化解（O(1) 额外空间）：边遍历边校验，只保留前一个叶子值与公差
function isLeavesArithmeticOpt(root) {
  let prev = null, diff = null, ok = true;
  function inorder(node) {
    if (!node || !ok) return;
    inorder(node.left);
    if (!node.left && !node.right) {
      if (prev !== null) {
        const d = node.val - prev;
        if (diff === null) diff = d;
        else if (d !== diff) ok = false;
      }
      prev = node.val;
    }
    inorder(node.right);
  }
  inorder(root);
  return ok;
}
```

#### 2.2.4 现场写一个 Tab 组件

> 出自 2024 年 11 月日常实习一面（**非社招**），但题目本身在前端面试中通用性极高（来源：[牛客实习一面](https://www.nowcoder.com/feed/main/detail/890d42b64b6547efafdc370e0d4e4d3b?sourceSSR=post)）。

```jsx
// React 极简 Tab 组件参考实现
function Tabs({ items, defaultActive = 0 }) {
  const [active, setActive] = React.useState(defaultActive);
  return (
    <div className="tabs">
      <div className="tabs-nav" role="tablist">
        {items.map((item, i) => (
          <button
            key={item.key ?? i}
            role="tab"
            aria-selected={active === i}
            className={active === i ? 'active' : ''}
            onClick={() => setActive(i)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="tabs-pane" role="tabpanel">
        {items[active]?.content}
      </div>
    </div>
  );
}
```

#### 2.2.5 大文件分片上传（提问式，非手撕）

实习一面提到"大文件分片上传"作为追问点（来源：[牛客实习一面](https://www.nowcoder.com/feed/main/detail/890d42b64b6547efafdc370e0d4e4d3b?sourceSSR=post)）。要点（备答方向）：

- 用 `Blob.prototype.slice` 切片
- 每片算 hash（spark-md5 / Web Worker）
- 服务端秒传：先校验 hash 是否存在
- 断点续传：上传前先问服务端"已传哪些片"，只传缺失片
- 并发控制：限制同时上传分片数（参见 MiniMax 文件中的并发控制器）

### 2.3 八股 / 原理（一面追问点）

| 话题 | 具体问题 | 来源 |
| --- | --- | --- |
| **React 版本** | 用的 React 几？ | [牛客实习](https://www.nowcoder.com/feed/main/detail/890d42b64b6547efafdc370e0d4e4d3b?sourceSSR=post) |
| **React Router 6** | Outlet 的作用是什么？ | [牛客实习](https://www.nowcoder.com/feed/main/detail/890d42b64b6547efafdc370e0d4e4d3b?sourceSSR=post) |
| **React Hooks** | 常用钩子有哪些？`useEffect` 依赖项是数组怎么办？ | [牛客实习](https://www.nowcoder.com/feed/main/detail/890d42b64b6547efafdc370e0d4e4d3b?sourceSSR=post) |
| **JS 数组** | `Map` 和 `forEach` 的区别？`map` 会不会改变原数组？ | [牛客实习](https://www.nowcoder.com/feed/main/detail/890d42b64b6547efafdc370e0d4e4d3b?sourceSSR=post) |
| **CSS 布局** | 左右定宽中间自适应的三栏布局；`flex: 1` 是什么意思？ | [牛客实习](https://www.nowcoder.com/feed/main/detail/890d42b64b6547efafdc370e0d4e4d3b?sourceSSR=post) |
| **工程化** | 常见的 git 命令；项目难点 | [牛客实习](https://www.nowcoder.com/feed/main/detail/890d42b64b6547efafdc370e0d4e4d3b?sourceSSR=post) |
| **技术栈适应性** | 从公司自研技术栈转向 React 的可行性 | [掘金一面](https://juejin.cn/post/7070306951732658207) |

参考答案（八股要点）：

- **`flex: 1`**：等价于 `flex: 1 1 0%`，即 `flex-grow:1 / flex-shrink:1 / flex-basis:0%`，元素会按比例分配剩余空间，且 basis 从 0 起算导致按 grow 比例严格分摊。
- **三栏布局**（左右定宽中间自适应）：常用 flex（`display:flex; 中间 flex:1`）、grid（`grid-template-columns: 200px 1fr 200px`）、绝对定位 + 中间 margin。
- **`map` vs `forEach`**：`map` 返回新数组、有返回值且不改变原数组（仅在原数组元素是引用类型时改 element 属性会影响原数组）；`forEach` 无返回值（返回 `undefined`）。
- **`useEffect` 依赖项是数组怎么办**：依赖数组是值（非引用）相等才不触发；引用类型每次新建会无限触发，需要 `useMemo`/`useCallback` 稳定引用，或将比较粒度改为 primitive。

### 2.4 项目深挖（二面重点）

二面 **没有问技术方面的问题**（原话："二面没有问技术方面的问题，问的主要是项目还有个人方面的问题"），围绕项目经历与个人发展（来源：[掘金二面](https://juejin.cn/post/7070535573395472391)）：

1. **自我介绍**
2. **最满意的项目** — 候选人讲了"小程序性能优化"项目；面试官追问"小程序各阶段的优化"和"底层优化方向"
3. **离职原因** — 候选人答前公司"使用落后的自研框架（Vue 2.x）"
4. **个人优势** — 逻辑思维、代码质量、业务能力
5. **职业期望** — 技能成长 vs 管理路线
6. **反向提问** — 候选人问了：项目独立负责情况、新事业部工作内容、职级与调薪机制

> 备考建议：智谱社招二面如果继续保持这个风格，**项目讲述按 STAR 拆解 + 主动量化指标 + 准备 1 个能讲 8 分钟的核心项目** 是关键。

### 2.5 Leader / HR 面

公开一手帖只覆盖到一面 + 二面（业务负责人轮）。HR 轮关注内容（来源：[i人事攻略](https://irenshi.cn/p/385563)）：

- motivation（为什么选智谱）
- 稳定性
- 薪资期望
- 团队 fit

> 智谱具体三面/HR 轮的真题暂无公开面经数据。

### 2.6 薪资 / Offer 信息

暂无公开前端社招面经数据。仅 V2EX 八年前端实录回帖区据称提及智谱年包，本次抓取未提取到具体数字（来源：[V2EX 八年前端](https://staging.v2ex.com/t/1110790#reply129)，需自行进入回帖筛选）。

### 2.7 重要数据警示

- **2022 vs 2024 时间差**：本节大部分一手数据（一面/二面真题、流程节奏）来自 **2022 年 3 月**，已超出"2024–2026 主体范围"约 22 个月。智谱在 2024 年 1 月发布 GLM-4 后业务结构和招聘方向已变（[掘金一面 publish date 2022-03-02 / 二面 2022-03-03，与 GLM-4 时代不同](https://juejin.cn/post/7070306951732658207)）。
- **实习 vs 社招混用**：2024 年 11 月那篇是日常实习岗，原作者明确标注（来源：[牛客实习一面](https://www.nowcoder.com/feed/main/detail/890d42b64b6547efafdc370e0d4e4d3b?sourceSSR=post)）。题目复用率高，但社招深度可能更深、追问更细。
- **社招前端 vs 社招算法**：i人事攻略的"在线测评 / 系统设计"流程偏算法岗（DPO/RLHF/RAG），不能直接套用前端流程（来源：[i人事攻略](https://irenshi.cn/p/385563)）。

---

## 三、阶跃星辰 StepFun（Step 系列多模态）

### 3.0 数据稀缺性说明

阶跃星辰公开前端社招面经**极其稀缺**。本节内容主要基于：

| 来源 | 类型 | 命中度 |
| --- | --- | --- |
| [牛客：阶跃星辰面试](https://www.nowcoder.com/feed/main/detail/2a490ce67d1848988656d93c4bb8c7de?fromPut=jj-blog&urlSource=extension-api) / [镜像 URL](https://www.nowcoder.com/feed/main/detail/2a490ce67d1848988656d93c4bb8c7de) | 牛客一手帖（**唯一直接命中**） | 中（岗位标注不完整，需以贴内描述为准） |
| [掘金：字节前端一面深度复盘](https://oj.juejin.cn/post/7595974133098102818) | 字节面经，**借此对标阶跃星辰**（因有面经作者描述阶跃风格"类字节 hard"） | 低（仅风格参考） |
| [掘金：Vue 流式输出 Bug 修复实录](https://juejin.cn/post/7619537611879596086) | 项目实战，备考素材 | 低 |
| [掘金：2025 大厂必考题 — 流式输出实战](https://aicoding.juejin.cn/post/7526826421295857690) | 备考素材，针对大模型公司 | 低 |
| [字节青训营：2024 前端面试经验 + STAR 法则](http://youthcamp.bytedance.com/post/7442988041583149093) | STAR 模板，备考辅料 | 低 |

> ⚠️ **本次抓取阶段未对牛客阶跃星辰原帖完整抽取细粒度 claims**（在抓取结果中此源对应的 claims 数组为空），但搜索结果摘要中对该贴有较为详细的描述。下面所有以"阶跃星辰一面/二面"开头的条目，**主要来源是搜索结果摘要的二次描述**，不是从原帖逐条抽取的引文，**需要打开原帖二次核实**。

### 3.1 流程与节奏

公开样本不足以总结轮次结构。仅知该贴覆盖一面 + 二面两轮（来源：[牛客阶跃星辰](https://www.nowcoder.com/feed/main/detail/2a490ce67d1848988656d93c4bb8c7de?fromPut=jj-blog&urlSource=extension-api)）。整体题目风格被描述为"**偏 hard、风格类似字节**"。

### 3.2 算法 / 手写真题（一面）

根据搜索结果摘要：一面手撕题涉及 **BLEU、AUC** 等大模型评测相关算法题（属于**偏冷门**方向）（来源：[牛客阶跃星辰摘要](https://www.nowcoder.com/feed/main/detail/2a490ce67d1848988656d93c4bb8c7de?fromPut=jj-blog&urlSource=extension-api)）。

> ⚠️ **重要提醒**：BLEU / AUC 是 NLP / ML 领域的评估指标，不是常规前端算法题。这种考察方向在前端岗里非常罕见，建议把"原帖岗位是否纯前端"作为第一优先级核对。

参考实现（仅供准备，不保证与原题一致）：

```js
// BLEU-1 简化版（unigram precision）：参考翻译片段命中率
function bleu1(reference, candidate) {
  const refSet = new Map();
  for (const w of reference) refSet.set(w, (refSet.get(w) || 0) + 1);
  let match = 0;
  for (const w of candidate) {
    if ((refSet.get(w) || 0) > 0) {
      match++;
      refSet.set(w, refSet.get(w) - 1);
    }
  }
  return candidate.length === 0 ? 0 : match / candidate.length;
}

// AUC 计算（基于排序，O(n log n)）
function auc(scores, labels) {
  const pairs = scores.map((s, i) => [s, labels[i]]);
  pairs.sort((a, b) => a[0] - b[0]);
  let posCnt = 0, rankSum = 0;
  for (let i = 0; i < pairs.length; i++) {
    if (pairs[i][1] === 1) {
      rankSum += i + 1;
      posCnt++;
    }
  }
  const negCnt = labels.length - posCnt;
  if (posCnt === 0 || negCnt === 0) return 0;
  return (rankSum - (posCnt * (posCnt + 1)) / 2) / (posCnt * negCnt);
}
```

### 3.3 八股 / 原理

公开摘要中提到的考察方向以**开放性问题**为主（非传统八股），见 3.5 节。

### 3.4 项目深挖（二面重点）

二面要求"用 STAR 法则讲项目难点"，重点考察 **性能优化** 与 **组件封装**（来源：[牛客阶跃星辰摘要](https://www.nowcoder.com/feed/main/detail/2a490ce67d1848988656d93c4bb8c7de?fromPut=jj-blog&urlSource=extension-api)）。

STAR 模板（备考结构，参考辅料：[字节青训营 STAR 法则示例](http://youthcamp.bytedance.com/post/7442988041583149093)）：

```
S (Situation) — 业务场景：例如 Step 助手 Web 端在长对话场景下卡顿
T (Task) — 你要解决：FCP 从 2.8s → 1.2s，长对话滚动 fps 60 不掉帧
A (Action) — 拆解：
  1. 流式渲染节流（30ms 间隔，参考 Vue3 时间切片方案）
  2. Markdown 增量解析（容忍未闭合 code block）
  3. 虚拟列表（react-virtuoso）承接超长会话历史
  4. Web Worker 处理 Markdown 解析，避免主线程阻塞
R (Result) — 量化：FCP -57%，长会话滚动 jank 从 32% → 4%
```

### 3.5 Leader / 开放性问题（特色考点）

阶跃星辰公开摘要里抓到两个**很有信息量的开放问题**（来源：[牛客阶跃星辰摘要](https://www.nowcoder.com/feed/main/detail/2a490ce67d1848988656d93c4bb8c7de?fromPut=jj-blog&urlSource=extension-api)）：

1. **"大模型能力强大后，前端还有哪些研究方向？"**

   备答方向（候选人自己组织）：
   - **多模态交互前端**：语音/视频/图像混合输入输出（与 Step 多模态业务直接相关）
   - **Agent 工作流前端**：多步骤 Tool Use 可视化、人机协作 UI
   - **超长上下文渲染**：百万 token 上下文的虚拟化、增量解析
   - **端侧推理 + 隐私计算**：WebGPU / WebLLM 在浏览器跑小模型
   - **AI 原生交互范式**：从"按钮 + 表单"到"对话 + 自然语言指令"的 UX 重构

2. **"RAG 的挑战是什么？"**（前端视角）

   - 检索结果的**引用展示**（点击高亮原文片段）
   - 流式输出与引用注入的**时序协调**（先到的 token vs 引用 anchor）
   - 长文档的**渐进加载** 与 **关键词高亮**
   - 多文档**冲突信息**的可视化（哪些来源支持/反对当前结论）

> ⚠️ 这两个问题被多次引用为阶跃星辰特色考点，但**也都基于二手摘要**，原帖建议直接打开核对。

### 3.6 HR 面 / 薪资

暂无公开面经数据。

---

## 四、三家共通的 AI 应用前端考点

> 这部分内容来自 fetch 阶段的两个跨公司搜索 angle："AI 大模型前端 SSE/流式渲染/Markdown/Agent 面试题"和"前端社招手写题与算法八股真题"。**这些题目不是某家公司原题**，是 AI 公司前端社招的**共性高频考点**，三家面试都极有可能涉及。

### 4.1 SSE 流式渲染（最高频考点）

#### 4.1.1 协议层基础（必背）

- **SSE 本质**：基于持久化 HTTP 连接，服务端以 `text/event-stream` 响应类型连续推送事件，客户端通过 `EventSource` 被动接收（来源：[掘金 SSE 全解析](https://juejin.cn/post/7574958975159812139)、[掘金 SSE 与流式处理](https://juejin.cn/post/7581081334851289129)）。
- **消息格式**：纯文本，由 `data:`、`id:`、`event:`、`retry:` 字段组成；事件之间用**双换行 `\n\n`** 分隔（来源：[掘金 SSE 与流式处理](https://juejin.cn/post/7581081334851289129)、[掘金 SSE 实战指南](https://juejin.cn/post/7574958975159812139)）。
- **解析规则**：前端按 `\n\n` split buffer，**保留尾部不完整 chunk 等待下一段拼接**（关键，来源：[掘金 SSE 实战指南](https://juejin.cn/post/7574958975159812139)，原文代码 `const messages = buffer.split("\n\n"); buffer = messages.pop() || "";`）。
- **结束标记**：OpenAI 风格使用 `data: [DONE]` 标记结束（这是 OpenAI 引入的约定，**不是 SSE 规范本身的一部分**，但已成大模型 API 事实标准；Kimi、GLM、StepFun 都遵循该约定）（来源：[掘金 - 流式输出 SSE → fetch + ReadableStream](https://juejin.cn/post/7623695556121264162)）。

#### 4.1.2 三种实现方式对比

| 方式 | 通信方向 | 是否支持 POST | 自动重连 | 选型场景 |
| --- | --- | --- | --- | --- |
| `EventSource`（SSE） | 单向（服务器→客户端） | ❌ 仅 GET | ✅ 内置 | 简单 LLM 流式输出（GET） |
| `fetch + ReadableStream` | 单向（响应流） | ✅ | ❌ 需自实现 | LLM 推理（参数多需 POST，**主流方案**） |
| WebSocket | 双向 | ✅ | ❌ 需自实现 | 多人协作 / 双向交互 |

来源：[掘金 - 2025 大厂必考题 流式输出](https://aicoding.juejin.cn/post/7526826421295857690)、[掘金 - SSE → fetch + ReadableStream](https://juejin.cn/post/7623695556121264162)、[掘金 SSE 实战](https://juejin.cn/post/7574958975159812139)。

#### 4.1.3 标准实现（fetch + ReadableStream）

```js
// AI 前端打字机效果：fetch + ReadableStream + SSE 解析
async function streamChat(url, body, onToken) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream',
    },
    body: JSON.stringify(body),
  });

  const reader = res.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    // stream:true 保留 UTF-8 跨 chunk 边界字符
    buffer += decoder.decode(value, { stream: true });
    const messages = buffer.split('\n\n');
    buffer = messages.pop() || '';  // 保留不完整尾部

    for (const msg of messages) {
      const line = msg.replace(/^data:\s*/, '');
      if (line === '[DONE]') return;
      try {
        const json = JSON.parse(line);
        onToken(json.choices[0].delta.content || '');
      } catch (e) {
        // 容错：跳过解析失败的行
      }
    }
  }
}
```

> 关键点：
> 1. `TextDecoder` 必须传 `stream: true`，否则 UTF-8 多字节字符会在 chunk 边界乱码（来源：[掘金 SSE 与流式处理](https://juejin.cn/post/7581081334851289129)）。
> 2. SSE 行可能被截断，**parse 失败的行要跳过容错**（来源：[掘金 - SSE → fetch + ReadableStream](https://juejin.cn/post/7623695556121264162)）。

#### 4.1.4 性能优化（追问点）

- **节流渲染**：30ms 间隔合并 setState，否则 React 高频 re-render 会卡顿（来源：[CSDN - Vue3 + SSE 终极优化](https://blog.csdn.net/weixin_45549481/article/details/160024617)）。
- **时间切片**：长任务拆成 8ms 段，让出主线程响应用户输入/滚动（来源同上）。
- **React 优化**："只更新最后一条 assistant 消息"而不是 re-render 整个列表（来源：[掘金 - SSE → fetch + ReadableStream](https://juejin.cn/post/7623695556121264162)）。
- **打字机缓冲**：生产者-消费者模式，固定 `TICK_MS=24`、`CHARS_PER_TICK=2` 平滑输出节奏，防止 UI 抖动（来源同上）。

#### 4.1.5 后端配合（接口约束）

```
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
X-Accel-Buffering: no   (Nginx 关闭代理 buffer)
```

- 心跳：约每 15 秒一个 `: heartbeat\n\n` 注释，避免代理超时（来源：[掘金 SSE 与流式处理](https://juejin.cn/post/7581081334851289129)）。
- Nginx 必须关闭 `proxy_buffering off`，否则前端会等满 buffer 才到一批，毫无流式体验（来源：[掘金 SSE 实战](https://juejin.cn/post/7574958975159812139)）。

#### 4.1.6 五类常见 SSE 前端故障（来源：[掘金 SSE 与流式处理](https://juejin.cn/post/7581081334851289129)）

1. 请求头错误（缺 `Accept: text/event-stream`）
2. 未启用 chunked transfer
3. 解析错误（split 规则错）
4. 服务端返回数据格式不规范
5. 回调传递问题（闭包/this 丢失）

### 4.2 Markdown 增量渲染

#### 4.2.1 核心难点

- **未闭合代码块/列表/表格**：流式输出过程中代码块只到一半，普通 Markdown parser 会把后面所有内容都当作 code（来源：[掘金 - SSE + Streamdown 实现 Markdown 流式渲染](https://juejin.cn/post/7568796644347723776)）。
- **频繁重渲染抖动**：每来 1 个 token 就重新 parse 整个文档 → 主线程爆炸。

#### 4.2.2 主流方案（Streamdown / 自实现增量解析）

- **Streamdown 库**（Vercel 出品）：可容忍未闭合 code block / list / table 边输入边渲染（来源：[掘金 - SSE + Streamdown](https://juejin.cn/post/7568796644347723776)）。
- **关键策略**：边解析边补全占位（如未闭合 code block 暂时补 ` ``` `）；**只 diff 末尾变化的 AST 节点**而不是全量重渲。
- **Vue 实战 bug 修复**（参考：[掘金 - Vue 流式输出 Bug 修复实录](https://juejin.cn/post/7619537611879596086)）：流式 token 渲染抖动、Markdown 增量解析、滚动跟随。

### 4.3 长文本性能优化（Kimi 业务尤其相关）

> 公开面经中没有任何一家直接出题到这个方向（暂无社招原题），以下为业务方向反推的备考清单。

- **虚拟列表**：react-virtuoso / TanStack Virtual 承接百万 token 历史
- **增量解析**：流式 token 用 Web Worker 解析 Markdown / LaTeX，避免主线程阻塞
- **首屏分桶**：长会话只渲染最近 N 条，旧消息按需 lazy 加载
- **滚动跟随**：用户主动滚到上方时停止 auto-scroll，防止打断阅读

### 4.4 Agent / Tool Use 前端（暂无社招原题）

> 三家产品（Kimi+ 助手 / 智谱清言 / Step 助手）都有 Agent 形态，但抓取数据中**没有命中具体的 Agent 前端面试题**。备考方向：

- **多步骤状态机**：Agent 每个 Tool Call 是一个节点，前端用状态机渲染（pending / running / success / error）
- **工具调用流可视化**：调用入参、返回值、引用源
- **错误恢复**：某一步失败时如何重试、如何让用户介入修正
- **流式 + 工具调用混合协议**：tool_call 与 content delta 在同一 SSE 流里交错，前端需路由到不同 UI 分支

### 4.5 通用手写题（社招高频）

来源：[掘金 - 2025 大厂手写题 5 个隐形加分点](https://juejin.cn/post/7572385850636140550)。

#### 4.5.1 深拷贝（进阶要求）

```js
// 进阶：处理循环引用 + Date / RegExp / Map / Set
function deepClone(obj, seen = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (seen.has(obj)) return seen.get(obj);

  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Map) {
    const out = new Map();
    seen.set(obj, out);
    obj.forEach((v, k) => out.set(deepClone(k, seen), deepClone(v, seen)));
    return out;
  }
  if (obj instanceof Set) {
    const out = new Set();
    seen.set(obj, out);
    obj.forEach(v => out.add(deepClone(v, seen)));
    return out;
  }

  const clone = Array.isArray(obj) ? [] : {};
  seen.set(obj, clone);
  // Reflect.ownKeys 处理 Symbol 与不可枚举键
  for (const key of Reflect.ownKeys(obj)) {
    clone[key] = deepClone(obj[key], seen);
  }
  return clone;
}
```

来源声明的进阶要求：用 WeakMap 处理循环引用 + Date/RegExp 等特殊类型（来源：[掘金 - 2025 大厂手写题加分点](https://juejin.cn/post/7572385850636140550)）。

#### 4.5.2 防抖（带 cancel + leading/trailing）

```js
function debounce(fn, wait, { leading = false, trailing = true } = {}) {
  let timer = null;
  let lastArgs = null;
  let result;

  function debounced(...args) {
    lastArgs = args;
    const callNow = leading && timer === null;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (trailing && lastArgs) {
        result = fn.apply(this, lastArgs);
        lastArgs = null;
      }
    }, wait);
    if (callNow) result = fn.apply(this, args);
    return result;
  }

  debounced.cancel = () => {
    clearTimeout(timer);
    timer = null;
    lastArgs = null;
  };
  return debounced;
}
```

来源：[掘金 - 2025 大厂手写题加分点](https://juejin.cn/post/7572385850636140550)，进阶加分点为：cancel 函数 + leading/trailing 选项 + 立即执行标志（这一论述被多个 verify 通过的核查项交叉确认与 Lodash 标准实现一致）。

#### 4.5.3 Promise.all（容错版）

```js
// 进阶：支持部分失败、参数校验、分离成功失败结果
function promiseAllSettledLike(iterable, { suppressError = false } = {}) {
  if (!iterable || typeof iterable[Symbol.iterator] !== 'function') {
    return Promise.reject(new TypeError('argument must be iterable'));
  }
  const arr = [...iterable];
  const success = [];
  const failed = [];
  let done = 0;

  return new Promise((resolve, reject) => {
    if (arr.length === 0) return resolve({ success: [], failed: [] });
    arr.forEach((p, i) => {
      Promise.resolve(p).then(
        v => {
          success.push({ index: i, value: v });
          if (++done === arr.length) resolve({ success, failed });
        },
        e => {
          failed.push({ index: i, reason: e });
          if (suppressError) {
            if (++done === arr.length) resolve({ success, failed });
          } else {
            reject(e);
          }
        }
      );
    });
  });
}
```

来源：[掘金 - 2025 大厂手写题加分点](https://juejin.cn/post/7572385850636140550)。原文提到 Promise.all 进阶要求三件事："支持部分失败、参数校验、分离成功失败结果"。

#### 4.5.4 useDebounce Hook（避闭包陷阱）

```ts
import { useRef, useEffect, useCallback } from 'react';

function useDebounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
  const fnRef = useRef(fn);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 每次 fn 变更同步到 ref，避免闭包陷阱
  useEffect(() => { fnRef.current = fn; }, [fn]);
  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  return useCallback((...args: Parameters<T>) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => fnRef.current(...args), delay);
  }, [delay]);
}
```

来源：[掘金 - 2025 大厂手写题加分点](https://juejin.cn/post/7572385850636140550)，关键考察点：闭包陷阱规避，用 useRef 存储定时器、useCallback 做函数记忆化。

### 4.6 通用算法（社招中等题为主）

> 直接命中三家社招原题的算法极少，以下是中国前端社招中等题"基础盘"，三家面试都可能问（来源：[牛客 - 58 前端社招一二面面经](https://nowcoder.com/discuss/353155981389537280)、[牛客前端面经聚合页](https://www.nowcoder.com/discuss/experience?tagId=644) 用作参考样本）。

| 题型 | 典型 LeetCode | 难度 |
| --- | --- | --- |
| 二叉树遍历变种（如等差数列叶子） | LC 94 / 自定义 | 中等 — 智谱原题 |
| Promise + setTimeout 输出顺序 | 非 LC | 中等 — 智谱原题 |
| 大文件分片上传 | 工程题 | 中等 — 智谱原题 |
| LRU Cache | LC 146 | 中等 |
| 合并区间 | LC 56 | 中等 |
| 最长无重复子串 | LC 3 | 中等 |
| K 个一组反转链表 | LC 25 | 困难 |

---

## 五、参考来源清单

> 本清单只列**抓取阶段实际访问到 URL** 的来源，不补造引用。

### 5.1 智谱 AI / 智谱华章

- [智谱华章前端面试（一面）— 掘金](https://juejin.cn/post/7070306951732658207) — **2022-03-02 社招一面，原作者亲历**，含 Promise+setTimeout、二叉树叶子等差数列、ES6 数组 API、Tab 组件等具体真题。
- [智谱华章前端面试（二面）— 掘金](https://juejin.cn/post/7070535573395472391) — **2022-03-03 社招二面**，记录非技术轮全部内容（项目深挖 / 离职原因 / 反向提问）。
- [北京智谱 前端开发 日常实习一面面经 — 牛客](https://www.nowcoder.com/feed/main/detail/890d42b64b6547efafdc370e0d4e4d3b?sourceSSR=post) — 2024-11-26 实习（**非社招**），覆盖 React Router 6、useEffect、flex:1、三栏布局、map vs forEach、Tab 组件、大文件分片上传等。
- [智谱AI前端实习一面 — 牛客](https://www.nowcoder.com/discuss/606800518211436544) — 实习一面（标题为"实习"，**非社招**）。
- [智谱AI 中兴 智源研究院 面经 — 牛客](https://m.nowcoder.com/feed/main/detail/b78c3cea340e4381a884842501c37463) — **算法岗** 校招，非前端，仅做流程参考。
- [智谱AI 公司面试攻略 — i人事](https://irenshi.cn/p/385563) — 综合攻略（**非个人一手面经**），含面试流程综述、常见考察方向、各岗位族群描述。

### 5.2 Moonshot 月之暗面（Kimi）

- [社招，月之暗面怎么样，可以去吗？— 牛客](https://www.nowcoder.com/feed/main/detail/f522798f925941178f607dc1495d0542) — 2024-10-31 讨论帖，岗位**普通后端**而非前端，仅做公司侧参考。
- [文科生勇闯 AI 大厂：靠'作弊'智能助手拿下月之暗面 Offer — CSDN](https://blog.csdn.net/lele_lele_lele/article/details/158069852) — 岗位为**内容运营**，疑似软文（推广"幕语 AI"），非前端，仅做面试氛围间接参考（**二手来源**，建议谨慎使用）。
- [聊一聊国内大模型公司面经和感受 — CSDN](https://blog.csdn.net/shanguicsdn000/article/details/139782918) — 横向多家面经，**非纯前端**，仅做流程节奏参考（二手综合贴）。
- [聊下国内大模型公司面经和感受（MCP 镜像）— CSDN](https://mcp.csdn.net/683570ce606a8318e85a9831.html) — 上一条的镜像，可交叉验证（二手镜像）。
- [聊一聊国内大模型公司面经和感受 — CSDN（另一作者镜像）](https://blog.csdn.net/2401_85280106/article/details/145159735) — 横向比较月之暗面/智谱/阶跃星辰等面试体感，含薪资带宽与流程口径（二手综合贴）。
- [React 智能前端：从零写图片分析页面（基于月之暗面 API）— 掘金](https://juejin.cn/post/7523731174762643497) — **非面经**，可作 Kimi 业务方向项目准备素材。
- [如何打造一个让大厂面试官眼前一亮的智能 AI 前端项目（拍照识别单词，调用 Kimi）— 掘金](https://juejin.cn/post/7524676569470615602) — **非面经**，Kimi 多模态 API 项目教程。
- [八年前端分享最近两周面试情况 — V2EX](https://staging.v2ex.com/t/1110790#reply129) — 8 年前端两周内面多家社招实录，回帖区据称提及月之暗面/智谱/阶跃星辰，需进入回帖筛选。

### 5.3 阶跃星辰 StepFun

- [阶跃星辰面试 — 牛客](https://www.nowcoder.com/feed/main/detail/2a490ce67d1848988656d93c4bb8c7de?fromPut=jj-blog&urlSource=extension-api) — **唯一直接命中阶跃星辰前端面经**的牛客一手帖，含一面 BLEU/AUC 算法、开放性问题（"大模型时代前端研究方向"、"RAG 挑战"）、二面 STAR 法则项目深挖。岗位标注不完整。
- [阶跃星辰面试 — 牛客（同帖镜像 URL）](https://www.nowcoder.com/feed/main/detail/2a490ce67d1848988656d93c4bb8c7de)
- [字节前端一面深度复盘 — 28 道真题（含 AI 流式传输）— 掘金](https://oj.juejin.cn/post/7595974133098102818) — **字节面经**，因阶跃星辰风格被描述"类字节 hard"而作为对标参考（不是阶跃原题）。
- [Vue 流式输出 Bug 修复实录 — 掘金](https://juejin.cn/post/7619537611879596086) — **非面经**，AI 流式输出实战 bug 复盘，备考素材。
- [2025 大厂必考题：从原理到实战，手把手教你实现流式输出 — 掘金](https://aicoding.juejin.cn/post/7526826421295857690) — **非面经**，2025 年大模型公司前端面试针对性题集。
- [2024 前端面试经验分享（简历 + STAR 法则项目梳理）— 字节青训营](http://youthcamp.bytedance.com/post/7442988041583149093) — **非面经**，STAR 模板与项目亮点提炼方法。

### 5.4 共通考点（SSE / 流式 / Markdown / 手写）

- [前端玩转 AI 应用开发｜SSE 协议与 JS 中的流式处理 — 掘金](https://juejin.cn/post/7581081334851289129) — SSE 协议、EventSource、fetch + ReadableStream、Markdown 流式渲染综合长文。
- [前端实现 Server-Sent Events(SSE) 全解析：从代码到调试的实战指南 — 掘金](https://juejin.cn/post/7574958975159812139) — EventSource vs fetch + ReadableStream 取舍、断线重连、proxy_buffering off 等坑。
- [使用 SSE 与 Streamdown 实现 Markdown 流式渲染 — 掘金](https://juejin.cn/post/7568796644347723776) — Markdown 增量解析方案，未闭合 code block 处理。
- [流式输出：让 AI 回复像 ChatGPT 一样打字机效果（SSE → fetch + ReadableStream）— 掘金](https://juejin.cn/post/7623695556121264162) — 完整对比两种打字机实现 + 队列缓冲 + 节流渲染。
- [从零到一实现流式输出：SSE 技术在前端应用中的魔法时刻 — 掘金](https://article.juejin.cn/post/7522700103075135539) — SSE 原理 + Node.js/Express + EventSource 完整 demo，作者 FogLetter，2025-07-04。
- [Vue3 + SSE 流式输出终极优化：节流 + 时间切片 — CSDN](https://blog.csdn.net/weixin_45549481/article/details/160024617) — 节流 30ms + 时间切片 8ms 的生产级方案。
- [2025 大厂手写题 5 个隐形加分点 — 掘金](https://juejin.cn/post/7572385850636140550) — 深拷贝 / 防抖节流 / Promise.all / useDebounce 进阶版本。
- [58 前端社招一二面面经 — 牛客](https://nowcoder.com/discuss/353155981389537280) — 中国社招前端面试流程参照样本。
- [前端工程师精选面经合集（校招/实习/社招）— 牛客](https://www.nowcoder.com/discuss/experience?tagId=644) — 牛客前端面经聚合页，可按"社招"筛选。

---

## 六、备考建议（基于本次数据）

| 方向 | 建议 |
| --- | --- |
| **智谱** | 一面手撕题集中在 **JS 基础 + 二叉树 + 组件实现 + 工程题（分片上传）**；二面**纯项目 + STAR 法则**，准备 1 个能讲透的核心项目；HR 轮关注稳定性与薪资期望。注意 2022 年数据可能与 GLM-4 时代存在偏差，建议针对 GLM/智谱清言业务方向额外补充 AI 应用前端题。 |
| **Moonshot** | **公开前端社招面经几乎为零，按通用 AI 公司前端社招准备**：通用手写题 + SSE 流式 + Markdown 渲染 + 长文本场景。可主动准备一个调用 Kimi API 的多模态 demo（参考第 5.2 节的两篇项目教程）作为面试加分项目。 |
| **StepFun** | 一面可能出现**冷门题**（BLEU/AUC 这类 ML 评测指标）；准备 RAG 前端展示思路与"大模型时代前端研究方向"的开放回答；二面强 STAR + 性能优化与组件封装。整体题难度类似字节。 |
| **共通** | **SSE 流式渲染必背**（协议格式、`\n\n` 分隔、`stream: true`、节流 30ms、容错跳过失败行、关闭 Nginx proxy_buffering）；**Markdown 增量渲染知道 Streamdown 思路**；**手写题进阶版本**（深拷贝 + WeakMap、防抖 + cancel/leading/trailing、Promise.all 容错）必须能现场写出。 |

---

## 七、本次数据透明度报告

- **抓取规模**：6 个搜索 angle，30+ 候选源，**32 条 claim 提取**（其中 19 条通过对抗核查）。
- **三家直接命中前端社招的一手贴**：
  - 智谱 AI：**3 篇**（2 篇 2022 社招一/二面 + 1 篇 2024 实习一面，**实际严格社招仅 2 篇且都是 2022 年**）
  - Moonshot：**0 篇**（仅有非前端岗与综合二手贴）
  - 阶跃星辰：**1 篇**（牛客唯一一手帖，且抓取阶段未对原帖完整抽取 claim，**部分细节需打开原帖二次核实**）
- **数据时效与岗位边界警示**：
  - 智谱社招一手数据为 **2022 年**，时间偏早；
  - 智谱 2024 一手贴是 **实习** 而非社招；
  - Moonshot 直接命中 0；
  - 阶跃星辰描述大量来自搜索结果摘要，非 claim 级核实。
- **共通考点章节（第四章）的来源是技术教程帖**而非面经原题，所有"大概率会问到"都是技术方向反推，不是某家公司的具体真题。

> 强烈建议候选人：将本文档作为**起点**，在面试前一周到 [牛客前端面经聚合页](https://www.nowcoder.com/discuss/experience?tagId=644) 用公司名 + 时间过滤，补充最新 1–2 个月的 ground-truth。
