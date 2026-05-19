# AI 辅助编程面试准备（2025 年新增重点）

> 自 2025 年起，Canva 要求技术面试中**必须使用 AI 工具**。
> 这是一个全新的面试维度，传统刷题无法覆盖。
> 核心：你能否利用 AI 作为"10x 工程师的助手"而非"替代品"。

---

## 一、面试形式

### 变化对比

| 传统面试 | AI 辅助面试（2025+） |
|----------|---------------------|
| 手写代码（白板/编辑器） | 使用 Copilot/Cursor/Claude |
| 算法题（LeetCode 风格） | 开放式工程问题 |
| 考察记忆力 & 编码速度 | 考察分解能力 & 技术判断 |
| 面试官观察你写代码 | 面试官观察你**如何使用 AI** |
| 45 分钟解一道题 | 45 分钟构建一个小系统 |

### 面试流程

```
1. 面试官给出开放式问题（如"设计一个机场起降控制系统"）
2. 你使用 AI 工具辅助编码
3. 面试官观察：
   - 你如何分解需求
   - 你如何向 AI 提问（Prompt 质量）
   - 你如何审查 AI 生成的代码
   - 你做了哪些技术决策
   - 你如何处理 AI 的错误输出
4. 最后讨论：trade-offs、扩展性、改进方向
```

---

## 二、核心评估维度

### 1. 需求分解能力

```
❌ 差的表现：直接让 AI "build me an airport control system"
✅ 好的表现：
   1. 先手动列出核心实体：Runway, Flight, Gate, Schedule
   2. 确定核心约束：同一时刻一条跑道只能有一架飞机
   3. 定义 MVP：先做"单跑道调度"，再扩展多跑道
   4. 分步让 AI 实现各模块
```

### 2. Prompt Engineering

```javascript
// ❌ 模糊的 prompt
"Help me write a scheduler"

// ✅ 精确的 prompt
"Write a TypeScript class `RunwayScheduler` that:
- Manages a queue of incoming flights
- Each flight has: id, type ('arrival'|'departure'), priority (1-5), estimatedTime
- Method `schedule()` returns the next flight to use the runway
- Priority 5 (emergency) always goes first
- Among same priority, FIFO order
- Include JSDoc comments
- Write unit tests with Jest"
```

### 3. 代码审查能力

面试官会故意让你使用 AI 生成的代码，然后观察你能否发现问题：

```javascript
// AI 生成的代码（包含 bug）
function processFlights(flights) {
  return flights
    .sort((a, b) => b.priority - a.priority) // ⚠️ sort 会修改原数组
    .filter(f => f.status === 'pending')
    .map(f => ({
      ...f,
      scheduledTime: new Date() // ⚠️ 每次调用都是当前时间，非确定性
    }));
}

// 你应该能指出：
// 1. sort() 会修改原数组 → 应该先 .slice() 或 [...flights]
// 2. new Date() 在 map 中使用是不确定性的 → 应该接收时间参数
// 3. 没有处理空数组边界
// 4. 没有类型检查
```

### 4. 技术决策能力

即使有 AI 辅助，你仍需独立做架构选择：

```
面试官："AI 建议用 WebSocket，你同意吗？"

✅ 好的回答：
"In this case I'd actually prefer Server-Sent Events because:
1. Our data flow is unidirectional (server → client)
2. SSE auto-reconnects, reducing our error handling code
3. SSE works through HTTP/2 multiplexing without extra infrastructure
4. WebSocket would be overkill for a read-only dashboard

However, if we later need client-to-server real-time (e.g., user commands), 
I'd switch to WebSocket."
```

---

## 三、模拟练习题

### 练习 1：实时仪表盘

> **题目**：使用 AI 工具，45 分钟内构建一个实时航班状态仪表盘

**分解步骤**：
1. 定义数据模型（Flight interface）
2. 让 AI 生成 mock 数据服务
3. 实现 SSE 连接
4. 构建 React 组件：FlightBoard、FlightRow、StatusBadge
5. 添加筛选和排序功能
6. 优化：虚拟列表处理大数据量

**你应该手动做的**：
- 定义组件拆分策略
- 决定状态管理方案
- 设计错误恢复机制
- 确定更新策略（全量 vs 增量）

**让 AI 做的**：
- 生成 TypeScript interface
- 实现具体的 UI 组件代码
- 编写单元测试
- 生成样式代码

### 练习 2：设计编辑器中的撤销/重做系统

> **题目**：为一个简单的 Canvas 编辑器实现 Undo/Redo

**思考过程展示**：

```
第 1 步：明确需求
- 操作类型：添加元素、移动、删除、修改属性
- Undo 深度：50 步
- 性能要求：Undo/Redo 必须 < 16ms（不掉帧）

第 2 步：技术选型
- 方案 A：保存完整状态快照（简单但内存大）
- 方案 B：Command Pattern（存操作的正向/反向命令）
- 选择方案 B，因为编辑器状态可能很大（多图层、多元素）

第 3 步：让 AI 实现 Command Pattern 基础架构
[AI prompt: "Implement a Command pattern for undo/redo..."]

第 4 步：审查 AI 代码，补充 AI 遗漏的点
- 内存管理（超过 50 步丢弃最早的）
- 分支处理（Undo 后做新操作，清空 Redo 栈）
- 复合命令（一次操作影响多个元素）
```

### 练习 3：国际化（i18n）系统

> **题目**：设计一个前端国际化系统，支持中文、英文切换

**核心 Prompt 示例**：

```
Prompt 1（数据结构）：
"Design a TypeScript type system for i18n that:
- Supports nested translation keys (e.g., 'header.nav.login')
- Provides type-safe access (compiler error if key doesn't exist)
- Supports interpolation: t('greeting', { name: 'Alice' }) → 'Hello, Alice'
- Supports pluralization for English"

Prompt 2（React Hook）：
"Create a useTranslation React hook that:
- Returns t() function and current locale
- Supports lazy loading of locale files
- Triggers re-render on locale change
- Memoizes translations for performance"

Prompt 3（审查）：
[检查 AI 生成的代码是否处理了：RTL 语言、日期/数字格式化、SSR hydration]
```

---

## 四、工具准备

### 推荐练习的 AI 工具

| 工具 | 特点 | 面试适用性 |
|------|------|-----------|
| **GitHub Copilot** | VS Code 内联补全 | ⭐⭐⭐⭐⭐ |
| **Cursor** | AI-native 编辑器，多文件上下文 | ⭐⭐⭐⭐⭐ |
| **Claude（API/Chat）** | 长上下文、推理能力强 | ⭐⭐⭐⭐ |
| **ChatGPT** | 通用性强 | ⭐⭐⭐ |

### 面试前检查

- [ ] 确认面试官会提供工具还是你自带
- [ ] 提前配置好 Copilot/Cursor，确保登录正常
- [ ] 准备一个干净的项目模板（TypeScript + React + 测试框架）
- [ ] 练习在**别人观察**的情况下使用 AI（找朋友模拟）

---

## 五、常见陷阱

### ❌ 过度依赖 AI

```
面试官看到：你把整个问题丢给 AI，然后直接用它的输出。
印象：这个人离开 AI 什么都做不了。

修正：先手动分析和分解，再让 AI 处理具体实现。
```

### ❌ 完全不用 AI

```
面试官看到：你手动敲每一行代码。
印象：这个人不会用现代工具，效率低。

修正：把重复性/模板性工作交给 AI，自己专注于架构和决策。
```

### ❌ 不审查 AI 输出

```
面试官看到：AI 生成了有 bug 的代码，你直接跳过。
印象：代码审查能力不足，在团队中会引入质量问题。

修正：每段 AI 生成的代码都快速扫一遍，指出问题。
```

### ❌ 不解释为什么

```
面试官看到：你让 AI 做了选择，但说不出为什么这么选。
印象：技术判断力不足，只是在"用 AI 的指令"。

修正：主动说"I'm choosing X because..."，展示独立思考。
```

---

## 六、高分行为模式

```
1. 开始 5 分钟：手动分析问题、列出核心模块、确定优先级
2. 中间 30 分钟：交替使用 AI 生成代码 + 人工审查修改
3. 每次 AI 输出后：花 30 秒扫一遍，指出 1-2 个改进点
4. 遇到 AI 错误时：解释为什么是错的，手动修正
5. 最后 10 分钟：讨论 trade-offs，说出"if I had more time, I'd..."
```

---

## 复习 Tips

1. 这是 Canva **2025 年最大的面试变化**，很多候选人还没准备
2. 提前用 Copilot/Cursor 做 2-3 个完整小项目（30-45 分钟计时）
3. 关键不是代码写得多快，而是**决策过程**是否清晰
4. 录屏回看自己使用 AI 的过程，找到"沉默/卡壳"的点
5. 练习边用 AI 边"自言自语"解释思路（think aloud）
