# 前端系统设计题

> Canva 终面（Loop）必考。时长约 45 分钟。
> 特点：贴近实际工作、协作式讨论、允许使用 AI 工具。
> 答题框架：需求澄清 → 高层设计 → 深入细节 → 扩展优化。

---

## 答题框架模板

```
1. 需求澄清（5 min）
   - 功能性需求：核心功能是什么？
   - 非功能性需求：QPS、延迟、一致性要求？
   - 约束条件：用户量、数据量级？

2. 高层架构（10 min）
   - 画出核心组件图
   - 确定前后端分工
   - 数据流向

3. 核心模块深入（15 min）
   - 数据模型设计
   - API 设计
   - 状态管理方案
   - 关键技术选型

4. 扩展与优化（10 min）
   - 性能优化
   - 离线支持
   - 国际化 / 无障碍
   - 监控 & 错误处理

5. Trade-offs 讨论（5 min）
   - 为什么选 A 而不是 B？
   - 这个方案的局限性？
```

---

## 题目 1：设计实时协作编辑器（类 Canva 编辑器）

### 需求
- 多人同时编辑一个设计文档
- 实时看到他人光标和操作
- 支持撤销/重做
- 离线编辑 + 自动同步

### 参考架构

```
┌─────────────┐     WebSocket      ┌──────────────┐
│   Client A  │◄──────────────────►│              │
├─────────────┤                    │  Collaboration│
│ Local State │                    │    Server     │
│ (CRDT/OT)  │                    │              │
│ Canvas 渲染  │                    │  ┌─────────┐ │
│ 操作日志     │                    │  │ OT/CRDT │ │
└─────────────┘                    │  │ Engine  │ │
                                   │  └─────────┘ │
┌─────────────┐     WebSocket      │              │
│   Client B  │◄──────────────────►│              │
└─────────────┘                    └──────┬───────┘
                                          │
                                   ┌──────▼───────┐
                                   │   Database   │
                                   │  (Document   │
                                   │   Snapshots) │
                                   └──────────────┘
```

### 关键技术决策

| 问题 | 选项 A | 选项 B | 推荐 |
|------|--------|--------|------|
| **冲突解决** | OT (Operational Transform) | CRDT (Conflict-free Replicated Data Types) | CRDT（无需中心服务器协调） |
| **通信协议** | WebSocket | SSE + HTTP | WebSocket（双向实时） |
| **状态管理** | 中心化（服务器权威） | 去中心化（客户端优先） | 混合（客户端乐观更新 + 服务器确认） |
| **离线支持** | Service Worker + IndexedDB | localStorage | IndexedDB（大数据量） |

### 深入：CRDT 简述

```javascript
// 简化的 Last-Writer-Wins Register
class LWWRegister {
  constructor(nodeId) {
    this.nodeId = nodeId;
    this.state = { value: null, timestamp: 0, nodeId: '' };
  }

  set(value) {
    this.state = {
      value,
      timestamp: Date.now(),
      nodeId: this.nodeId
    };
  }

  merge(remote) {
    if (remote.timestamp > this.state.timestamp ||
        (remote.timestamp === this.state.timestamp && remote.nodeId > this.state.nodeId)) {
      this.state = remote;
    }
  }

  get() {
    return this.state.value;
  }
}
```

---

## 题目 2：设计前端性能监控系统

### 需求
- 采集 Core Web Vitals（LCP、FID、CLS）
- 采集 JS 错误、网络错误、资源加载
- 数据上报 & 可视化看板
- 对业务代码零侵入

### 参考架构

```
┌──────────────────────────────────────────────┐
│                  Browser                      │
│                                              │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐ │
│  │PerformanceObserver│  │Error│  │Network │ │
│  │(LCP,FID,CLS)│  │Listener│  │Interceptor│ │
│  └─────┬────┘  └────┬─────┘  └─────┬─────┘ │
│        │             │              │        │
│        └─────────────┼──────────────┘        │
│                      ▼                       │
│            ┌─────────────────┐               │
│            │   SDK Core      │               │
│            │  - 采样控制      │               │
│            │  - 数据聚合      │               │
│            │  - 批量上报      │               │
│            └────────┬────────┘               │
└─────────────────────┼────────────────────────┘
                      │ Beacon API / fetch
                      ▼
              ┌───────────────┐
              │  Data Pipeline │
              │  (Kafka/SQS)  │
              └───────┬───────┘
                      │
              ┌───────▼───────┐
              │   Analytics   │
              │   Dashboard   │
              └───────────────┘
```

### 关键实现

```javascript
// Core Web Vitals 采集
class PerformanceMonitor {
  constructor(options = {}) {
    this.buffer = [];
    this.sampleRate = options.sampleRate || 1; // 采样率
    this.reportUrl = options.reportUrl;
    this.init();
  }

  init() {
    this.observeLCP();
    this.observeFID();
    this.observeCLS();
    this.observeErrors();
    this.setupBeforeUnload();
  }

  observeLCP() {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.record('LCP', lastEntry.startTime);
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  }

  observeCLS() {
    let clsValue = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      this.record('CLS', clsValue);
    }).observe({ type: 'layout-shift', buffered: true });
  }

  observeErrors() {
    window.addEventListener('error', (e) => {
      this.record('JS_ERROR', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        stack: e.error?.stack
      });
    });

    window.addEventListener('unhandledrejection', (e) => {
      this.record('PROMISE_ERROR', { reason: e.reason?.toString() });
    });
  }

  record(type, data) {
    if (Math.random() > this.sampleRate) return;
    this.buffer.push({ type, data, timestamp: Date.now(), url: location.href });
    if (this.buffer.length >= 10) this.flush();
  }

  flush() {
    if (this.buffer.length === 0) return;
    const payload = JSON.stringify(this.buffer);
    this.buffer = [];
    // 使用 Beacon API 确保页面关闭时也能发送
    navigator.sendBeacon(this.reportUrl, payload);
  }

  setupBeforeUnload() {
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') this.flush();
    });
  }
}
```

---

## 题目 3：设计图片/模板搜索系统（前端部分）

### 需求
- 搜索 Canva 模板库（百万级模板）
- 支持筛选（类型、颜色、风格）
- 瀑布流展示 + 无限滚动
- 快速预览 + 点击使用

### 前端架构

```
┌─────────────────────────────────────────┐
│              Search Page                 │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │         Search Bar                │  │
│  │  [输入框] [筛选器] [排序]          │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │       Results Grid (Masonry)      │  │
│  │  ┌─────┐ ┌─────┐ ┌─────┐        │  │
│  │  │ 模板 │ │ 模板 │ │ 模板 │        │  │
│  │  │ Card │ │ Card │ │ Card │        │  │
│  │  └─────┘ └─────┘ └─────┘        │  │
│  │  ┌─────┐ ┌─────┐                │  │
│  │  │ 模板 │ │ 模板 │ [Skeleton]    │  │
│  │  └─────┘ └─────┘                │  │
│  └───────────────────────────────────┘  │
│                                         │
│  [Intersection Observer → Load More]    │
└─────────────────────────────────────────┘
```

### 关键优化策略

```javascript
// 1. 搜索防抖 + 缓存
class SearchManager {
  constructor() {
    this.cache = new Map(); // LRU Cache
    this.abortController = null;
  }

  search = debounce(async (query, filters) => {
    const cacheKey = JSON.stringify({ query, filters });
    
    // 命中缓存
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // 取消上次请求
    this.abortController?.abort();
    this.abortController = new AbortController();

    const results = await fetch(`/api/search?q=${query}`, {
      signal: this.abortController.signal
    }).then(r => r.json());

    this.cache.set(cacheKey, results);
    return results;
  }, 300);
}

// 2. 图片渐进式加载
function progressiveImage(container, thumbUrl, fullUrl) {
  const thumb = new Image();
  thumb.src = thumbUrl;
  thumb.style.filter = 'blur(10px)';
  container.appendChild(thumb);

  const full = new Image();
  full.src = fullUrl;
  full.onload = () => {
    full.style.opacity = 0;
    container.appendChild(full);
    requestAnimationFrame(() => {
      full.style.transition = 'opacity 0.3s';
      full.style.opacity = 1;
      thumb.remove();
    });
  };
}
```

---

## 题目 4：设计 A/B 测试平台（前端 SDK）

### 需求（与 Canva GPTN 岗位直接相关）
- 客户端 SDK 获取实验配置
- 支持多层实验互斥
- 曝光埋点自动上报
- 不影响页面加载性能

### SDK 设计

```javascript
class ABTestSDK {
  constructor(config) {
    this.userId = config.userId;
    this.experiments = new Map();
    this.reported = new Set();
  }

  async init() {
    // 预加载实验配置（不阻塞渲染）
    const config = await fetch('/api/experiments', {
      headers: { 'X-User-ID': this.userId }
    }).then(r => r.json());

    config.experiments.forEach(exp => {
      this.experiments.set(exp.id, {
        variant: this.assignVariant(exp),
        ...exp
      });
    });
  }

  // 基于用户 ID 的确定性分流
  assignVariant(experiment) {
    const hash = this.hashCode(`${this.userId}_${experiment.id}`);
    const bucket = Math.abs(hash) % 100;
    
    let cumulative = 0;
    for (const variant of experiment.variants) {
      cumulative += variant.weight;
      if (bucket < cumulative) return variant.name;
    }
    return 'control';
  }

  getVariant(experimentId) {
    const exp = this.experiments.get(experimentId);
    if (!exp) return 'control';

    // 自动曝光上报
    if (!this.reported.has(experimentId)) {
      this.reportExposure(experimentId, exp.variant);
      this.reported.add(experimentId);
    }

    return exp.variant;
  }

  reportExposure(experimentId, variant) {
    navigator.sendBeacon('/api/exposure', JSON.stringify({
      userId: this.userId,
      experimentId,
      variant,
      timestamp: Date.now()
    }));
  }

  hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  }
}

// 使用
const ab = new ABTestSDK({ userId: 'user_123' });
await ab.init();

if (ab.getVariant('new_onboarding') === 'treatment') {
  showNewOnboarding();
} else {
  showOldOnboarding();
}
```

---

## 题目 5：设计微信小程序集成方案

### 需求（与 Canva 中国本地化直接相关）
- Canva 核心功能封装为微信小程序
- 与微信生态集成（分享、支付、登录）
- 性能要求：首屏 < 2s

### 技术方案

```
┌─────────────────────────────────────────┐
│          微信小程序容器                    │
│                                         │
│  ┌─────────────┐   ┌────────────────┐  │
│  │  原生页面     │   │   Web-View     │  │
│  │  - 登录      │   │   (Canvas 编辑器)│  │
│  │  - 模板市场   │   │   - Fabric.js  │  │
│  │  - 分享      │   │   - 手势识别     │  │
│  └──────┬──────┘   └───────┬────────┘  │
│         │                   │           │
│         │   JSBridge 通信    │           │
│         └───────────────────┘           │
└─────────────────────────────────────────┘
                    │
           ┌───────▼───────┐
           │  Canva API    │
           │  (China CDN)  │
           └───────────────┘
```

### Trade-offs 讨论

| 方案 | 优势 | 劣势 |
|------|------|------|
| 纯原生小程序 | 性能最佳、体验一致 | 编辑器实现成本极高 |
| Web-View 嵌入 | 复用已有编辑器代码 | 性能受限、通信复杂 |
| 混合方案（推荐） | 平衡性能与开发效率 | 维护两套逻辑 |

---

## 面试表达模板（英文）

```
"Let me start by clarifying the requirements..."
"The core trade-off here is between X and Y..."
"I'd choose A over B because in this context..."
"One thing I'd want to validate with metrics is..."
"If we had more time, I'd also consider..."
"The bottleneck in this design is... and here's how I'd address it..."
```

---

## 复习 Tips

1. **不要急着画图**：先花 5 分钟确认需求，面试官会给额外信息
2. **说出 trade-offs**：没有完美方案，展示你的权衡能力
3. **结合 Canva 业务**：把设计和 Canva 的实际场景结合
4. **准备追问**：面试官常追问 "如果用户量增加 10x 怎么办"
5. **画图辅助**：用 Excalidraw 或白板边画边讲
