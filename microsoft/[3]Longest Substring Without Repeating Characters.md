## Longest Substring Without Repeating Characters
[Longest Substring Without Repeating Characters](https://leetcode.cn/problems/longest-substring-without-repeating-characters)：Given a string s, find the length of the longest substring without duplicate characters.


### 思路

**核心算法: 滑动窗口(双指针)**

想象一个**可伸缩的窗口**在字符串上滑动:
- **右指针**负责扩展窗口(探索新字符)
- **左指针**负责收缩窗口(移除重复字符)
- 窗口内始终保持**无重复字符**

**具体步骤**:

1. **初始化**:
   - `left = 0`, `right = 0` (窗口初始为空)
   - `set` 或 `map` 记录窗口内的字符
   - `maxLen = 0` 记录最大长度

2. **右指针扩展**:
   - 遍历字符串,右指针不断右移
   - 尝试把新字符加入窗口

3. **遇到重复字符**:
   - 左指针右移,收缩窗口
   - 删除左边的字符,直到窗口内没有重复

4. **更新最大长度**:
   - 每次右指针移动后,计算当前窗口大小
   - `maxLen = max(maxLen, right - left + 1)`

**关键点**:
- **窗口大小** = `right - left + 1`
- **窗口内无重复** = 用 `Set` 或 `Map` 维护
- **时间复杂度** = O(n),每个字符最多访问2次

**形象理解**:
```
字符串: a b c a b c b b
       ↑
       left,right

步骤1: [a] → 无重复,maxLen=1
步骤2: [a,b] → 无重复,maxLen=2
步骤3: [a,b,c] → 无重复,maxLen=3
步骤4: [a,b,c,a] → 有重复!
       删除左边的'a' → [b,c,a] → maxLen=3
步骤5: [b,c,a,b] → 有重复!
       删除左边的'b' → [c,a,b] → maxLen=3
...
```

### 代码

#### 方法1: 滑动窗口 + Set (推荐,最好理解)
```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let left = 0;           // 左指针
    let maxLen = 0;         // 最大长度
    const set = new Set();  // 记录窗口内的字符
    
    // 右指针遍历字符串
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        
        // 如果窗口内有重复,收缩左边界
        while (set.has(char)) {
            set.delete(s[left]);  // 删除最左边的字符
            left++;               // 左指针右移
        }
        
        // 加入当前字符到窗口
        set.add(char);
        
        // 更新最大长度
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
};
```

#### 方法2: 滑动窗口 + Map (优化版)
```js
var lengthOfLongestSubstring = function(s) {
    let left = 0;
    let maxLen = 0;
    const map = new Map();  // 字符 -> 最新出现的索引
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        
        // 如果字符重复,直接跳到重复位置的下一位
        if (map.has(char) && map.get(char) >= left) {
            left = map.get(char) + 1;
        }
        
        // 更新字符的最新位置
        map.set(char, right);
        
        // 更新最大长度
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
};
```

### 执行过程详解

以 `s = "abcabcbb"` 为例(方法1):

```
初始: left=0, maxLen=0, set={}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
right=0, char='a':
  set={} 不包含'a'
  → set.add('a') → set={'a'}
  → left=0, right=0
  → maxLen = max(0, 0-0+1) = 1
  窗口: [a]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
right=1, char='b':
  set={'a'} 不包含'b'
  → set.add('b') → set={'a','b'}
  → left=0, right=1
  → maxLen = max(1, 1-0+1) = 2
  窗口: [a,b]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
right=2, char='c':
  set={'a','b'} 不包含'c'
  → set.add('c') → set={'a','b','c'}
  → left=0, right=2
  → maxLen = max(2, 2-0+1) = 3
  窗口: [a,b,c]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
right=3, char='a':
  set={'a','b','c'} 包含'a' ← 重复!
  → while循环:
      删除s[0]='a', left=1 → set={'b','c'}
      set不再包含'a' → 退出while
  → set.add('a') → set={'b','c','a'}
  → left=1, right=3
  → maxLen = max(3, 3-1+1) = 3
  窗口: [b,c,a]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
right=4, char='b':
  set={'b','c','a'} 包含'b' ← 重复!
  → while循环:
      删除s[1]='b', left=2 → set={'c','a'}
      set不再包含'b' → 退出while
  → set.add('b') → set={'c','a','b'}
  → left=2, right=4
  → maxLen = max(3, 4-2+1) = 3
  窗口: [c,a,b]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
right=5, char='c':
  set={'c','a','b'} 包含'c' ← 重复!
  → while循环:
      删除s[2]='c', left=3 → set={'a','b'}
      set不再包含'c' → 退出while
  → set.add('c') → set={'a','b','c'}
  → left=3, right=5
  → maxLen = max(3, 5-3+1) = 3
  窗口: [a,b,c]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
right=6, char='b':
  set={'a','b','c'} 包含'b' ← 重复!
  → while循环:
      删除s[3]='a', left=4 → set={'b','c'}
      还包含'b' → 继续
      删除s[4]='b', left=5 → set={'c'}
      set不再包含'b' → 退出while
  → set.add('b') → set={'c','b'}
  → left=5, right=6
  → maxLen = max(3, 6-5+1) = 2
  窗口: [c,b]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
right=7, char='b':
  set={'c','b'} 包含'b' ← 重复!
  → while循环:
      删除s[5]='c', left=6 → set={'b'}
      还包含'b' → 继续
      删除s[6]='b', left=7 → set={}
      set不再包含'b' → 退出while
  → set.add('b') → set={'b'}
  → left=7, right=7
  → maxLen = max(3, 7-7+1) = 1
  窗口: [b]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
返回 maxLen = 3
最长无重复子串: "abc" 或 "bca" 或 "cab"
```

### 两种方法对比

| 维度 | Set方法 | Map方法 |
|------|---------|---------|
| **数据结构** | Set(存字符) | Map(存字符→索引) |
| **遇到重复** | 逐个删除左边字符 | 直接跳到重复位置后 |
| **while循环** | 需要 | 不需要 |
| **时间复杂度** | O(2n)=O(n) | O(n) |
| **代码理解** | 更直观 ✅ | 稍微复杂 |
| **性能** | 稍慢 | 稍快 |

**推荐**: 方法1(Set方法),思路更清晰!

### 复杂度分析

- **时间复杂度**: O(n)
  - Set方法: 每个字符最多访问2次(右指针1次+左指针1次)
  - Map方法: 每个字符访问1次
  
- **空间复杂度**: O(min(n, m))
  - n = 字符串长度
  - m = 字符集大小(ASCII=128, Unicode更大)
  - 最坏情况窗口包含所有字符

### 易错点

1. **窗口大小计算错误**:
   ```js
   // ❌ 错误
   maxLen = right - left;
   
   // ✅ 正确 (索引差+1才是长度)
   maxLen = right - left + 1;
   ```

2. **Map方法的left更新**:
   ```js
   // ❌ 错误: left可能往回跳
   left = map.get(char) + 1;
   
   // ✅ 正确: left只能往前移
   left = Math.max(left, map.get(char) + 1);
   ```
   
   例子: `"abba"`,当right=3(第二个'a')时,如果不用max:
   - `left = map.get('a') + 1 = 0 + 1 = 1`
   - 但此时left已经=2了,不应该往回跳!

3. **子串 vs 子序列**:
   - **子串**(substring): 必须连续 ✅ 本题
   - **子序列**(subsequence): 可以不连续 ❌

### 滑动窗口模板

这道题是**滑动窗口**的经典模板:

```js
function slidingWindow(s) {
    let left = 0;
    let result = 0;
    const window = new Set/Map();  // 维护窗口状态
    
    for (let right = 0; right < s.length; right++) {
        // 1. 扩展窗口: 加入right元素
        window.add(s[right]);
        
        // 2. 收缩窗口: 当窗口不满足条件时
        while (窗口不合法) {
            window.delete(s[left]);
            left++;
        }
        
        // 3. 更新结果
        result = Math.max(result, right - left + 1);
    }
    
    return result;
}
```

这个模板可以解决很多类似问题!
