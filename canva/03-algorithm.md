# 算法题（递归 & 函数式编程重点）

> Canva 算法面试偏好：递归、函数式编程、数组/字符串操作。
> 难度：LeetCode Easy - Medium，不考 Hard。
> 重点考察思路清晰 + 代码简洁，不追求最优解。

---

## 一、递归（Canva 最爱考的方向）

### 1. 树形结构扁平化

```javascript
// 将嵌套的树结构扁平化
const tree = {
  name: 'root',
  children: [
    { name: 'a', children: [{ name: 'a1', children: [] }] },
    { name: 'b', children: [{ name: 'b1', children: [] }, { name: 'b2', children: [] }] }
  ]
};

function flattenTree(node) {
  return [node.name, ...node.children.flatMap(child => flattenTree(child))];
}

// 输出: ['root', 'a', 'a1', 'b', 'b1', 'b2']
```

### 2. 深度嵌套对象取值（lodash.get）

```javascript
function get(obj, path, defaultValue = undefined) {
  const keys = Array.isArray(path) ? path : path.replace(/\[(\d+)\]/g, '.$1').split('.');
  let result = obj;
  
  for (const key of keys) {
    result = result?.[key];
    if (result === undefined) return defaultValue;
  }
  
  return result;
}

// 测试
const data = { a: { b: [{ c: 42 }] } };
console.log(get(data, 'a.b[0].c'));        // 42
console.log(get(data, 'a.b[1].c', 'N/A')); // 'N/A'
```

### 3. JSON 深度比较

```javascript
function deepEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== typeof b) return false;
  
  if (typeof a === 'object') {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every(key => deepEqual(a[key], b[key]));
  }
  
  return false;
}
```

### 4. 文件路径解析

```javascript
// 给定文件系统结构，找到所有文件的完整路径
const fileSystem = {
  src: {
    components: {
      'Button.tsx': null,
      'Modal.tsx': null
    },
    utils: {
      'helpers.ts': null
    }
  },
  'package.json': null
};

function getAllPaths(fs, currentPath = '') {
  const paths = [];
  for (const [name, content] of Object.entries(fs)) {
    const fullPath = currentPath ? `${currentPath}/${name}` : name;
    if (content === null) {
      paths.push(fullPath);
    } else {
      paths.push(...getAllPaths(content, fullPath));
    }
  }
  return paths;
}

// 输出: ['src/components/Button.tsx', 'src/components/Modal.tsx', 'src/utils/helpers.ts', 'package.json']
```

---

## 二、数组操作

### 5. 数组分组（groupBy）

```javascript
function groupBy(arr, keyFn) {
  return arr.reduce((groups, item) => {
    const key = typeof keyFn === 'function' ? keyFn(item) : item[keyFn];
    (groups[key] = groups[key] || []).push(item);
    return groups;
  }, {});
}

// 测试
const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 }
];
console.log(groupBy(people, 'age'));
// { 25: [{name:'Alice',...}, {name:'Charlie',...}], 30: [{name:'Bob',...}] }
```

### 6. 数组交集/并集/差集

```javascript
const intersection = (a, b) => a.filter(x => b.includes(x));
const union = (a, b) => [...new Set([...a, ...b])];
const difference = (a, b) => a.filter(x => !b.includes(x));

// 高效版本（大数组用 Set）
const intersectionSet = (a, b) => {
  const setB = new Set(b);
  return a.filter(x => setB.has(x));
};
```

### 7. 数组去重（多种方式）

```javascript
// 方式1：Set
const unique1 = arr => [...new Set(arr)];

// 方式2：filter
const unique2 = arr => arr.filter((item, index) => arr.indexOf(item) === index);

// 方式3：reduce
const unique3 = arr => arr.reduce((acc, cur) => acc.includes(cur) ? acc : [...acc, cur], []);

// 对象数组按 key 去重
function uniqueByKey(arr, key) {
  const seen = new Set();
  return arr.filter(item => {
    const val = item[key];
    if (seen.has(val)) return false;
    seen.add(val);
    return true;
  });
}
```

### 8. 两数之和（LeetCode #1）

```javascript
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
```

### 9. 合并两个有序数组

```javascript
function mergeSorted(arr1, arr2) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      result.push(arr1[i++]);
    } else {
      result.push(arr2[j++]);
    }
  }
  
  return [...result, ...arr1.slice(i), ...arr2.slice(j)];
}
```

---

## 三、字符串操作

### 10. 字符串模板解析

```javascript
// 实现简易模板引擎
function template(str, data) {
  return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] !== undefined ? data[key] : match;
  });
}

// 测试
console.log(template('Hello {{name}}, you are {{age}} years old', { name: 'Canva', age: 10 }));
// "Hello Canva, you are 10 years old"
```

### 11. 驼峰/下划线转换

```javascript
// camelCase → snake_case
function toSnakeCase(str) {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

// snake_case → camelCase
function toCamelCase(str) {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}
```

### 12. 有效括号（LeetCode #20）

```javascript
function isValid(s) {
  const stack = [];
  const map = { ')': '(', ']': '[', '}': '{' };
  
  for (const char of s) {
    if ('([{'.includes(char)) {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) return false;
    }
  }
  
  return stack.length === 0;
}
```

---

## 四、链表 & 二叉树

### 13. 反转链表（LeetCode #206）

```javascript
function reverseList(head) {
  let prev = null;
  let curr = head;
  
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  
  return prev;
}

// 递归版
function reverseListRecursive(head) {
  if (!head || !head.next) return head;
  const newHead = reverseListRecursive(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
}
```

### 14. 二叉树层序遍历（LeetCode #102）

```javascript
function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  
  while (queue.length) {
    const level = [];
    const size = queue.length;
    
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    result.push(level);
  }
  
  return result;
}
```

### 15. 二叉树最大深度（LeetCode #104）

```javascript
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
```

---

## 五、动态规划（偶尔考）

### 16. 爬楼梯（LeetCode #70）

```javascript
function climbStairs(n) {
  if (n <= 2) return n;
  let prev = 1, curr = 2;
  for (let i = 3; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}
```

### 17. 最长递增子序列长度（LeetCode #300）

```javascript
function lengthOfLIS(nums) {
  const dp = new Array(nums.length).fill(1);
  
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  
  return Math.max(...dp);
}
```

---

## 复习 Tips

1. **Canva 偏好递归 + 函数式**：用 map/reduce/filter 解题能加分
2. **不用刷 Hard**：Medium 难度足够，重点是思路清晰
3. **边写边讲**：Pair Programming 要求你解释每一步
4. **考虑边界**：空输入、单元素、极大值
5. **时间复杂度**：面试官会追问，提前想好
