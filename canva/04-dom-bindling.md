# DOM 操作 & 原生 JavaScript 实战

> Canva 技术面中有一轮专门考察**不使用任何框架**的 DOM 操作能力。
> 重点：事件机制、原生 DOM API、异步处理、浏览器渲染。

---

## 一、事件机制

### 1. 实现事件委托

```javascript
// 给动态列表添加点击事件（不能给每个 li 绑定）
function delegate(parent, selector, event, handler) {
  parent.addEventListener(event, function(e) {
    let target = e.target;
    while (target !== parent) {
      if (target.matches(selector)) {
        handler.call(target, e);
        return;
      }
      target = target.parentNode;
    }
  });
}

// 使用
const ul = document.querySelector('#list');
delegate(ul, 'li', 'click', function(e) {
  console.log('Clicked:', this.textContent);
});
```

### 2. 事件冒泡 vs 捕获

```javascript
// 面试题：点击 inner，输出顺序是什么？
/*
<div id="outer">
  <div id="inner">Click me</div>
</div>
*/

document.getElementById('outer').addEventListener('click', () => {
  console.log('outer capture');
}, true);  // 捕获阶段

document.getElementById('outer').addEventListener('click', () => {
  console.log('outer bubble');
}, false); // 冒泡阶段

document.getElementById('inner').addEventListener('click', () => {
  console.log('inner capture');
}, true);

document.getElementById('inner').addEventListener('click', () => {
  console.log('inner bubble');
}, false);

// 点击 inner 输出顺序：
// outer capture → inner capture → inner bubble → outer bubble
```

### 3. 自定义事件

```javascript
// 创建和触发自定义事件
const event = new CustomEvent('canva-design-saved', {
  detail: { designId: '123', name: 'My Design' },
  bubbles: true,
  cancelable: true
});

document.querySelector('#editor').addEventListener('canva-design-saved', (e) => {
  console.log('Design saved:', e.detail);
});

document.querySelector('#editor').dispatchEvent(event);
```

---

## 二、DOM 操作实战

### 4. 实现无限滚动（Infinite Scroll）

```javascript
function createInfiniteScroll(container, loadMore) {
  let loading = false;
  let page = 1;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !loading) {
      loading = true;
      loadMore(page++).then(() => {
        loading = false;
      });
    }
  });

  // 创建哨兵元素
  const sentinel = document.createElement('div');
  sentinel.id = 'sentinel';
  container.appendChild(sentinel);
  observer.observe(sentinel);

  return () => observer.disconnect(); // 返回清理函数
}

// 使用
createInfiniteScroll(document.querySelector('#feed'), async (page) => {
  const data = await fetch(`/api/posts?page=${page}`).then(r => r.json());
  data.forEach(post => {
    const el = document.createElement('div');
    el.textContent = post.title;
    document.querySelector('#feed').insertBefore(el, document.querySelector('#sentinel'));
  });
});
```

### 5. 实现虚拟列表（Virtual List）

```javascript
class VirtualList {
  constructor(container, items, itemHeight) {
    this.container = container;
    this.items = items;
    this.itemHeight = itemHeight;
    this.visibleCount = Math.ceil(container.clientHeight / itemHeight);
    
    this.wrapper = document.createElement('div');
    this.wrapper.style.height = `${items.length * itemHeight}px`;
    this.wrapper.style.position = 'relative';
    container.appendChild(this.wrapper);
    
    container.addEventListener('scroll', () => this.render());
    this.render();
  }

  render() {
    const scrollTop = this.container.scrollTop;
    const startIndex = Math.floor(scrollTop / this.itemHeight);
    const endIndex = Math.min(startIndex + this.visibleCount + 1, this.items.length);
    
    // 清空并重绘可见区域
    this.wrapper.innerHTML = '';
    
    for (let i = startIndex; i < endIndex; i++) {
      const el = document.createElement('div');
      el.style.position = 'absolute';
      el.style.top = `${i * this.itemHeight}px`;
      el.style.height = `${this.itemHeight}px`;
      el.textContent = this.items[i];
      this.wrapper.appendChild(el);
    }
  }
}
```

### 6. 实现拖拽排序（Drag & Drop）

```javascript
function enableDragSort(container) {
  let draggedEl = null;

  container.addEventListener('dragstart', (e) => {
    draggedEl = e.target;
    e.target.style.opacity = '0.5';
  });

  container.addEventListener('dragend', (e) => {
    e.target.style.opacity = '1';
    draggedEl = null;
  });

  container.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    if (afterElement) {
      container.insertBefore(draggedEl, afterElement);
    } else {
      container.appendChild(draggedEl);
    }
  });
}

function getDragAfterElement(container, y) {
  const elements = [...container.querySelectorAll('[draggable]:not(.dragging)')];
  
  return elements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    }
    return closest;
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}
```

---

## 三、定时器与异步（setInterval/setTimeout）

### 7. 用 setTimeout 实现精确的 setInterval

```javascript
function accurateInterval(fn, delay) {
  let expected = Date.now() + delay;
  let stopped = false;

  function step() {
    if (stopped) return;
    const drift = Date.now() - expected;
    fn();
    expected += delay;
    setTimeout(step, Math.max(0, delay - drift));
  }

  setTimeout(step, delay);
  
  return { stop: () => { stopped = true; } };
}
```

### 8. 实现 sleep 函数

```javascript
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 使用
async function demo() {
  console.log('Start');
  await sleep(1000);
  console.log('After 1s');
}
```

### 9. 请求超时控制

```javascript
function fetchWithTimeout(url, options = {}, timeout = 5000) {
  const controller = new AbortController();
  const { signal } = controller;

  const timeoutId = setTimeout(() => controller.abort(), timeout);

  return fetch(url, { ...options, signal })
    .then(response => {
      clearTimeout(timeoutId);
      return response;
    })
    .catch(error => {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error(`Request timeout after ${timeout}ms`);
      }
      throw error;
    });
}
```

### 10. 请求重试

```javascript
async function fetchWithRetry(url, options = {}, maxRetries = 3, delay = 1000) {
  for (let i = 0; i <= maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response;
    } catch (error) {
      if (i === maxRetries) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
}
```

---

## 四、性能优化（Web Performance）

### 11. 实现图片懒加载

```javascript
function lazyLoadImages() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '200px' // 提前 200px 开始加载
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    observer.observe(img);
  });
}
```

### 12. requestAnimationFrame 动画

```javascript
// 平滑滚动到顶部
function smoothScrollToTop(duration = 500) {
  const start = window.scrollY;
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // easeInOutCubic 缓动函数
    const ease = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, start * (1 - ease));

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}
```

### 13. 实现 requestIdleCallback polyfill

```javascript
if (!window.requestIdleCallback) {
  window.requestIdleCallback = function(callback) {
    const start = Date.now();
    return setTimeout(() => {
      callback({
        didTimeout: false,
        timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
      });
    }, 1);
  };
}

// 使用：低优先级任务
requestIdleCallback((deadline) => {
  while (deadline.timeRemaining() > 0) {
    // 执行非紧急任务
    processNextItem();
  }
});
```

---

## 五、浏览器相关概念题

### 14. 重绘 vs 回流

| 特征 | 重绘 (Repaint) | 回流 (Reflow) |
|------|----------------|----------------|
| 触发 | 外观变化（颜色、阴影） | 布局变化（尺寸、位置） |
| 性能 | 较轻 | 较重（会触发重绘） |
| 示例 | `color`, `background` | `width`, `height`, `margin` |

**减少回流的方法：**
```javascript
// Bad: 多次触发回流
el.style.width = '100px';
el.style.height = '100px';
el.style.margin = '10px';

// Good: 批量修改
el.style.cssText = 'width:100px;height:100px;margin:10px';

// Good: 使用 class
el.classList.add('resized');

// Good: 文档碎片
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  fragment.appendChild(li);
}
document.querySelector('ul').appendChild(fragment);
```

### 15. 跨域解决方案

```javascript
// 1. CORS（最常用）
// 服务端设置 Access-Control-Allow-Origin

// 2. JSONP（仅 GET）
function jsonp(url, callback) {
  const callbackName = `jsonp_${Date.now()}`;
  window[callbackName] = (data) => {
    callback(data);
    delete window[callbackName];
    document.head.removeChild(script);
  };
  const script = document.createElement('script');
  script.src = `${url}?callback=${callbackName}`;
  document.head.appendChild(script);
}

// 3. postMessage（跨窗口通信）
// 发送方
targetWindow.postMessage({ type: 'getData' }, 'https://target-origin.com');
// 接收方
window.addEventListener('message', (e) => {
  if (e.origin !== 'https://trusted-origin.com') return;
  console.log(e.data);
});
```

---

## 复习 Tips

1. Canva 这一轮**不允许用 React/Vue 等框架**，纯原生 JS
2. 熟练使用 `IntersectionObserver`、`MutationObserver`、`ResizeObserver`
3. 理解浏览器渲染流程：DOM → CSSOM → Render Tree → Layout → Paint → Composite
4. 事件机制必须掌握：冒泡、捕获、委托、stopPropagation vs preventDefault
5. 性能优化是加分项：懒加载、虚拟列表、rAF 动画
