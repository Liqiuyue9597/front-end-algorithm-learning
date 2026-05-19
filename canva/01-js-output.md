# JavaScript 输出题（HR 轮必考）

> HR 电面会给 7-8 段代码，要求用英文说出输出结果并解释原因。
> 重点：闭包、事件循环、Promise、this 指向、变量提升、原型链

---

## 一、闭包 & 作用域

### 题目 1：经典 var + setTimeout
```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100);
}
```

<details>
<summary>答案</summary>

输出：`5 5 5 5 5`

**解释**：`var` 是函数作用域，5 个 setTimeout 回调共享同一个 `i`。当回调执行时，循环已结束，`i = 5`。

**修复方式**：
```javascript
// 方式 1：let
for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100);
}

// 方式 2：IIFE
for (var i = 0; i < 5; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 100);
  })(i);
}

// 方式 3：setTimeout 第三个参数
for (var i = 0; i < 5; i++) {
  setTimeout((j) => console.log(j), 100, i);
}
```
</details>

### 题目 2：闭包引用
```javascript
function createFunctions() {
  var result = [];
  for (var i = 0; i < 3; i++) {
    result.push(function() { return i; });
  }
  return result;
}
var funcs = createFunctions();
console.log(funcs[0]());
console.log(funcs[1]());
console.log(funcs[2]());
```

<details>
<summary>答案</summary>

输出：`3 3 3`

**解释**：同理，闭包捕获的是变量 `i` 的引用，而非值。调用时 `i` 已经是 3。
</details>

### 题目 3：块级作用域
```javascript
let a = 1;
{
  console.log(a);
  let a = 2;
}
```

<details>
<summary>答案</summary>

输出：`ReferenceError: Cannot access 'a' before initialization`

**解释**：`let` 存在暂时性死区（TDZ），在声明前访问会报错，不会去外层作用域查找。
</details>

---

## 二、事件循环（Event Loop）

### 题目 4：宏任务 vs 微任务
```javascript
console.log("Start");
setTimeout(() => console.log("Timeout"), 0);
Promise.resolve().then(() => console.log("Promise"));
console.log("End");
```

<details>
<summary>答案</summary>

输出：
```
Start
End
Promise
Timeout
```

**解释**：
1. 同步代码先执行：`Start`、`End`
2. 微任务队列（Promise.then）优先于宏任务队列（setTimeout）
3. 所以 `Promise` 在 `Timeout` 之前
</details>

### 题目 5：复杂事件循环
```javascript
console.log(1);

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => console.log(3));
}, 0);

Promise.resolve().then(() => {
  console.log(4);
  setTimeout(() => console.log(5), 0);
});

console.log(6);
```

<details>
<summary>答案</summary>

输出：`1 6 4 2 3 5`

**解释**：
1. 同步：`1`、`6`
2. 微任务：`4`（此时注册了 setTimeout(5)）
3. 宏任务 setTimeout(2)：输出 `2`，然后其微任务输出 `3`
4. 宏任务 setTimeout(5)：输出 `5`
</details>

### 题目 6：async/await 执行顺序
```javascript
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');
setTimeout(() => console.log('setTimeout'), 0);
async1();
new Promise((resolve) => {
  console.log('promise1');
  resolve();
}).then(() => {
  console.log('promise2');
});
console.log('script end');
```

<details>
<summary>答案</summary>

输出：
```
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
```

**解释**：
1. 同步：`script start`
2. 调用 async1：`async1 start`，执行 async2：`async2`
3. `await` 后面的代码相当于放入微任务队列
4. 继续同步：`promise1`、`script end`
5. 微任务队列：`async1 end`、`promise2`
6. 宏任务：`setTimeout`
</details>

---

## 三、Promise

### 题目 7：Promise 值穿透
```javascript
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log);
```

<details>
<summary>答案</summary>

输出：`1`

**解释**：`.then()` 的参数如果不是函数，会被忽略（值穿透）。`2` 和 `Promise.resolve(3)` 都不是函数，所以值 `1` 一直传递到最后的 `console.log`。
</details>

### 题目 8：Promise 执行顺序
```javascript
const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve();
  console.log(2);
  reject();
});

promise
  .then(() => console.log(3))
  .catch(() => console.log(4));

console.log(5);
```

<details>
<summary>答案</summary>

输出：`1 2 5 3`

**解释**：
1. Promise 构造函数同步执行：`1`、`2`（resolve 后的代码仍然执行，但状态已锁定为 fulfilled）
2. 同步代码：`5`
3. 微任务 then：`3`（reject 无效，状态已经是 fulfilled）
</details>

### 题目 9：Promise.all 与错误处理
```javascript
const p1 = Promise.resolve(1);
const p2 = new Promise((resolve) => setTimeout(() => resolve(2), 100));
const p3 = Promise.reject(3);

Promise.all([p1, p2, p3])
  .then(console.log)
  .catch(console.error);
```

<details>
<summary>答案</summary>

输出：`3`（由 catch 捕获）

**解释**：`Promise.all` 只要有一个 rejected，立即 reject。p3 同步 reject，不会等 p2。
</details>

---

## 四、this 指向

### 题目 10：对象方法中的 this
```javascript
const obj = {
  name: 'Canva',
  greet() {
    console.log(this.name);
  },
  greetArrow: () => {
    console.log(this.name);
  }
};

obj.greet();
obj.greetArrow();
const fn = obj.greet;
fn();
```

<details>
<summary>答案</summary>

输出：
```
Canva
undefined
undefined
```

**解释**：
1. `obj.greet()`：通过对象调用，`this` 指向 `obj`
2. `obj.greetArrow()`：箭头函数没有自己的 `this`，继承外层（全局/module），`this.name` 为 undefined
3. `fn()`：脱离对象调用，`this` 指向全局（严格模式下为 undefined）
</details>

### 题目 11：call/apply/bind
```javascript
function foo() {
  console.log(this.a);
}
var a = 1;
var obj1 = { a: 2, foo };
var obj2 = { a: 3 };

foo();
obj1.foo();
obj1.foo.call(obj2);
new foo();
```

<details>
<summary>答案</summary>

输出：
```
1        (全局调用)
2        (obj1 调用)
3        (call 绑定 obj2)
undefined (new 创建新对象，新对象没有 a 属性)
```
</details>

---

## 五、变量提升 & 类型

### 题目 12：函数声明 vs 变量声明
```javascript
console.log(foo);
var foo = 1;
function foo() {}
console.log(foo);
```

<details>
<summary>答案</summary>

输出：
```
[Function: foo]
1
```

**解释**：函数声明提升优先级高于变量声明。但赋值 `foo = 1` 会覆盖。
</details>

### 题目 13：typeof 陷阱
```javascript
console.log(typeof undefined);
console.log(typeof null);
console.log(typeof NaN);
console.log(typeof []);
console.log(typeof function(){});
```

<details>
<summary>答案</summary>

输出：
```
"undefined"
"object"       ← 历史 bug
"number"       ← NaN 是 number 类型
"object"       ← 数组是对象
"function"
```
</details>

### 题目 14：隐式类型转换
```javascript
console.log([] == false);
console.log([] == ![]);
console.log({} + []);
console.log([] + {});
console.log(+[] + +{});
```

<details>
<summary>答案</summary>

输出：
```
true         ([] → "" → 0, false → 0)
true         (![] → false, [] == false → true)
0            ({} 被解析为代码块，+[] → 0)
"[object Object]"  ([] → "", {} → "[object Object]")
NaN          (+[] → 0, +{} → NaN, 0 + NaN = NaN)
```

注意：`{} + []` 在不同环境可能输出不同（Node vs 浏览器）。
</details>

---

## 六、原型链

### 题目 15：原型链查找
```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.getName = function() {
  return this.name;
};

const p = new Person('Canva');
console.log(p.getName());
console.log(p.hasOwnProperty('name'));
console.log(p.hasOwnProperty('getName'));
console.log(p.__proto__ === Person.prototype);
```

<details>
<summary>答案</summary>

输出：
```
"Canva"
true      (name 是实例自身属性)
false     (getName 在原型上)
true
```
</details>

---

## 七、Set / Map（HR 轮常问）

### 题目 16：Set 去重
```javascript
const set = new Set([1, 2, 3, 2, 1]);
console.log(set.size);
console.log([...set]);

const objSet = new Set([{a:1}, {a:1}]);
console.log(objSet.size);
```

<details>
<summary>答案</summary>

输出：
```
3
[1, 2, 3]
2        ← 两个对象引用不同，不会去重
```
</details>

---

## 复习 Tips

1. **出声练习**：HR 轮需要你用英文解释，提前练习 "Because var has function scope..." 这类表达
2. **画执行栈**：复杂的事件循环题，画出调用栈 + 微任务队列 + 宏任务队列
3. **记住优先级**：同步 > 微任务（Promise.then, async/await 后续）> 宏任务（setTimeout）
4. **this 四规则**：new > bind/call/apply > 对象.方法 > 默认全局
