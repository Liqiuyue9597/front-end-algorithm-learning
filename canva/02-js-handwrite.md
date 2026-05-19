# JavaScript 手写实现题

> 技术面高频手写题，要求不借助框架、从零实现。
> Canva 面试中特别强调函数式编程（map/reduce/filter）和 Promise。

---

## 一、Promise 相关

### 1. 实现 Promise.all

```javascript
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('argument must be an array'));
    }
    
    const results = [];
    let completed = 0;
    const len = promises.length;
    
    if (len === 0) return resolve([]);
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        (value) => {
          results[index] = value;
          completed++;
          if (completed === len) {
            resolve(results);
          }
        },
        (reason) => {
          reject(reason);
        }
      );
    });
  });
}

// 测试
const p1 = Promise.resolve(1);
const p2 = new Promise(resolve => setTimeout(() => resolve(2), 100));
const p3 = Promise.resolve(3);
promiseAll([p1, p2, p3]).then(console.log); // [1, 2, 3]
```

### 2. 实现 Promise.race

```javascript
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(promise => {
      Promise.resolve(promise).then(resolve, reject);
    });
  });
}
```

### 3. 实现带并发限制的 Promise 调度器

```javascript
class Scheduler {
  constructor(maxConcurrent) {
    this.maxConcurrent = maxConcurrent;
    this.running = 0;
    this.queue = [];
  }

  add(promiseCreator) {
    return new Promise((resolve) => {
      this.queue.push(() => promiseCreator().then(resolve));
      this.run();
    });
  }

  run() {
    while (this.running < this.maxConcurrent && this.queue.length > 0) {
      const task = this.queue.shift();
      this.running++;
      task().then(() => {
        this.running--;
        this.run();
      });
    }
  }
}

// 测试
const timeout = (time) => new Promise(resolve => setTimeout(resolve, time));
const scheduler = new Scheduler(2);
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};
addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
// 输出顺序：2, 3, 1, 4
```

### 4. 实现简易 Promise（A+ 规范核心）

```javascript
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e; };

    const promise2 = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value);
            resolve(x);
          } catch (e) {
            reject(e);
          }
        });
      };

      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason);
            resolve(x);
          } catch (e) {
            reject(e);
          }
        });
      };

      if (this.state === 'fulfilled') fulfilledMicrotask();
      else if (this.state === 'rejected') rejectedMicrotask();
      else {
        this.onFulfilledCallbacks.push(fulfilledMicrotask);
        this.onRejectedCallbacks.push(rejectedMicrotask);
      }
    });

    return promise2;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static resolve(value) {
    return new MyPromise(resolve => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }
}
```

---

## 二、深拷贝

### 5. 完整版深拷贝（处理循环引用）

```javascript
function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  
  // 处理循环引用
  if (map.has(obj)) return map.get(obj);
  
  const clone = Array.isArray(obj) ? [] : {};
  map.set(obj, clone);
  
  for (const key of Object.keys(obj)) {
    clone[key] = deepClone(obj[key], map);
  }
  
  return clone;
}

// 测试循环引用
const obj = { a: 1, b: { c: 2 } };
obj.self = obj;
const cloned = deepClone(obj);
console.log(cloned.self === cloned); // true
console.log(cloned.b === obj.b);     // false
```

---

## 三、函数式编程（Canva 重点考察）

### 6. 实现 Array.prototype.map

```javascript
Array.prototype.myMap = function(fn, thisArg) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) { // 处理稀疏数组
      result[i] = fn.call(thisArg, this[i], i, this);
    }
  }
  return result;
};
```

### 7. 实现 Array.prototype.reduce

```javascript
Array.prototype.myReduce = function(fn, initialValue) {
  let acc = initialValue;
  let startIndex = 0;
  
  if (acc === undefined) {
    if (this.length === 0) throw new TypeError('Reduce of empty array with no initial value');
    acc = this[0];
    startIndex = 1;
  }
  
  for (let i = startIndex; i < this.length; i++) {
    if (i in this) {
      acc = fn(acc, this[i], i, this);
    }
  }
  return acc;
};

// 用 reduce 实现 map
function mapWithReduce(arr, fn) {
  return arr.reduce((acc, cur, idx, src) => {
    acc.push(fn(cur, idx, src));
    return acc;
  }, []);
}
```

### 8. 实现 Array.prototype.filter

```javascript
Array.prototype.myFilter = function(fn, thisArg) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this && fn.call(thisArg, this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};
```

### 9. 函数组合 compose / pipe

```javascript
// compose: 从右到左执行
function compose(...fns) {
  return function(x) {
    return fns.reduceRight((acc, fn) => fn(acc), x);
  };
}

// pipe: 从左到右执行
function pipe(...fns) {
  return function(x) {
    return fns.reduce((acc, fn) => fn(acc), x);
  };
}

// 测试
const add1 = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const composed = compose(square, double, add1);
console.log(composed(2)); // (2+1)*2 = 6, 6^2 = 36
```

### 10. 柯里化 curry

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...args2) {
      return curried.apply(this, [...args, ...args2]);
    };
  };
}

// 测试
const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3));    // 6
console.log(curriedAdd(1, 2)(3));    // 6
console.log(curriedAdd(1)(2, 3));    // 6
```

---

## 四、防抖 & 节流

### 11. 防抖 debounce

```javascript
function debounce(fn, delay, immediate = false) {
  let timer = null;
  
  return function(...args) {
    const callNow = immediate && !timer;
    
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (!immediate) fn.apply(this, args);
    }, delay);
    
    if (callNow) fn.apply(this, args);
  };
}
```

### 12. 节流 throttle

```javascript
function throttle(fn, interval) {
  let lastTime = 0;
  
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

// 定时器版本（保证最后一次触发）
function throttleWithTrailing(fn, interval) {
  let lastTime = 0;
  let timer = null;
  
  return function(...args) {
    const now = Date.now();
    const remaining = interval - (now - lastTime);
    
    if (remaining <= 0) {
      clearTimeout(timer);
      timer = null;
      lastTime = now;
      fn.apply(this, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        lastTime = Date.now();
        timer = null;
        fn.apply(this, args);
      }, remaining);
    }
  };
}
```

---

## 五、其他高频手写

### 13. 实现 EventEmitter（发布-订阅）

```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
    return this;
  }

  off(event, listener) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(l => l !== listener);
    }
    return this;
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(...args));
    }
    return this;
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
    return this;
  }
}
```

### 14. 实现 call / apply / bind

```javascript
// call
Function.prototype.myCall = function(context, ...args) {
  context = context || globalThis;
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};

// apply
Function.prototype.myApply = function(context, args = []) {
  context = context || globalThis;
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};

// bind
Function.prototype.myBind = function(context, ...args) {
  const fn = this;
  return function bound(...args2) {
    if (this instanceof bound) {
      return new fn(...args, ...args2);
    }
    return fn.apply(context, [...args, ...args2]);
  };
};
```

### 15. 实现 flatten（数组扁平化）

```javascript
// 递归版
function flatten(arr, depth = Infinity) {
  if (depth <= 0) return arr.slice();
  return arr.reduce((acc, val) => {
    return acc.concat(Array.isArray(val) ? flatten(val, depth - 1) : val);
  }, []);
}

// 迭代版
function flattenIterative(arr) {
  const stack = [...arr];
  const result = [];
  while (stack.length) {
    const item = stack.pop();
    if (Array.isArray(item)) {
      stack.push(...item);
    } else {
      result.unshift(item);
    }
  }
  return result;
}

// 测试
console.log(flatten([1, [2, [3, [4]]]])); // [1, 2, 3, 4]
```

### 16. 实现 instanceof

```javascript
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left);
  const prototype = right.prototype;
  
  while (proto !== null) {
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}
```

---

## 复习 Tips

1. 函数式三件套（map/reduce/filter）是 Canva 面试的**绝对重点**，务必手写流畅
2. Promise 调度器（并发限制）是高频考点
3. 手写时注意边界情况：空数组、null、循环引用
4. Canva Pair Programming 环节会让你**边写边讲**，练习出声编码
