## Longest Palindromic Substring
[Longest Palindromic Substring](https://leetcode.cn/problems/longest-palindromic-substring)：Given a string s, return the longest palindromic substring in s.


### 思路

#### 题型归类:字符串 / 双指针 / 中心扩展

看到"回文"两个字,第一反应应该是:**回文有中心,可以从中心向两边扩展**。

| 解法 | 时间 | 空间 | 推荐度 |
|---|---|---|---|
| 暴力枚举 | O(n³) | O(1) | ❌ 超时 |
| **中心扩展** ⭐ | **O(n²)** | **O(1)** | ✅ 面试推荐 |
| 动态规划 | O(n²) | O(n²) | ⚠️ 空间差 |
| Manacher | O(n) | O(n) | ❌ 面试不要求 |

#### 核心思路:中心扩展法 ⭐

**关键洞察**:任何回文都有一个"中心",从中心向两边扩展时**字符必须对称相等**。

**回文的两种形态**:
```
奇数长度: "aba"     中心是 1 个字符 'b'
偶数长度: "abba"    中心是 2 个字符 'bb' 之间的缝隙
```

所以一个长度为 n 的字符串,**总共有 2n-1 个潜在中心**:
- n 个**单字符中心**(对应奇数回文)
- n-1 个**字符间隙中心**(对应偶数回文)

```
字符串: a   b   b   a       (n=4)
位置:   0   1   2   3
中心: ↑ ↑ ↑ ↑ ↑ ↑ ↑          (共 2*4-1 = 7 个中心)
      a  ab b  bb b  ba a
     (奇)(偶)(奇)(偶)(奇)(偶)(奇)
```

#### 算法步骤

```
对每个 i (0 到 n-1):
   ① expand(i, i)     → 以 i 为单中心,向两边扩(找奇数回文)
   ② expand(i, i+1)   → 以 i 和 i+1 为双中心,向两边扩(找偶数回文)
   ③ 记录最长的那个回文

返回最长回文子串
```

时间复杂度:O(n²) (n 个中心 × 每次最多扩 n)
空间复杂度:O(1) (只存下标和长度)

### 代码

#### 方法一:中心扩展法 ⭐ 推荐

```js
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    if (s.length < 2) return s;
    
    let start = 0;       // 最长回文的起始位置
    let maxLen = 1;      // 最长回文的长度
    
    // 从中心 (left, right) 向两边扩展,返回回文长度
    function expand(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        // 跳出循环时 [left+1, right-1] 才是真正的回文
        // 长度 = (right-1) - (left+1) + 1 = right - left - 1
        return right - left - 1;
    }
    
    for (let i = 0; i < s.length; i++) {
        // 情况 1:奇数长度回文,中心是 i
        const len1 = expand(i, i);
        // 情况 2:偶数长度回文,中心在 i 和 i+1 之间
        const len2 = expand(i, i + 1);
        
        const len = Math.max(len1, len2);
        if (len > maxLen) {
            maxLen = len;
            // 根据中心 i 和长度 len 反推起始位置
            start = i - Math.floor((len - 1) / 2);
        }
    }
    
    return s.substring(start, start + maxLen);
};
```

#### 方法二:动态规划(了解)

**状态定义**:`dp[i][j]` = 子串 `s[i..j]` 是否是回文

**状态转移**:
```
dp[i][j] = (s[i] === s[j]) && (j - i < 2 || dp[i+1][j-1])
            ↑首尾相等       ↑长度≤2 或 内部也是回文
```

**关键**:`dp[i][j]` 依赖 `dp[i+1][j-1]`(左下方),所以必须**按子串长度从短到长枚举**。

```js
var longestPalindrome = function(s) {
    const n = s.length;
    if (n < 2) return s;
    
    const dp = Array.from({length: n}, () => new Array(n).fill(false));
    let start = 0, maxLen = 1;
    
    // 按子串长度枚举
    for (let len = 1; len <= n; len++) {
        for (let i = 0; i + len - 1 < n; i++) {
            const j = i + len - 1;
            if (s[i] !== s[j]) {
                dp[i][j] = false;
            } else if (len <= 2) {
                dp[i][j] = true;
            } else {
                dp[i][j] = dp[i+1][j-1];
            }
            
            if (dp[i][j] && len > maxLen) {
                maxLen = len;
                start = i;
            }
        }
    }
    
    return s.substring(start, start + maxLen);
};
```

### 关键点详解

#### 1. 为什么 `expand` 要调用两次?

回文有奇偶两种,**中心结构完全不同**:

```
奇数 "aba" :  expand(i, i)     从 s[i] 出发,left=right=i
偶数 "abba":  expand(i, i+1)   从 s[i] 和 s[i+1] 出发,相邻
```

**反证**:只用 `expand(i, i)` 跑 `"cbbd"`,会漏掉 `"bb"`(它的中心在两字符缝隙里)。
只用 `expand(i, i+1)` 跑 `"aba"`,会漏掉 `"aba"`(单字符中心)。

#### 2. 为什么返回长度而不是子串?

```js
return right - left - 1;        // ✅ 返回数字
// vs
return s.substring(left+1, right);  // ❌ 返回子串
```

**性能原因**:在 O(n²) 的循环里,字符串切片每次都会**复制字符 + 分配内存**。
- 返回长度:**整个算法只切一次** `substring`
- 返回子串:循环里切 `2n` 次,大量短命字符串 → GC 压力 → 可能超时

**通用编程思想**:能用下标/长度表达的中间状态,就别用切片/复制。**只在最后产出结果时才转成实体**。

#### 3. `expand` 返回值 `right - left - 1` 是怎么来的?

`while` 循环退出时,`s[left] !== s[right]` 或越界。
所以**真正的回文区间是 `[left+1, right-1]`**:

```
长度 = (right-1) - (left+1) + 1 = right - left - 1
```

#### 4. `start = i - Math.floor((len - 1) / 2)` 怎么推出来?

| 情况 | 距离 = `i - start` |
|---|---|
| 奇数 `len=3` (aba)  | 1 |
| 偶数 `len=4` (abba) | 1 |
| 奇数 `len=5`        | 2 |
| 偶数 `len=6`        | 2 |
| 奇数 `len=7`        | 3 |
| 偶数 `len=8`        | 3 |

**规律**:奇数 `len` 和偶数 `len+1` 距离相同。
**统一公式**:`Math.floor((len - 1) / 2)` 同时命中奇偶。

| len | `(len-1)/2` | `Math.floor` |
|---|---|---|
| 3 (奇) | 1.0 | **1** ✅ |
| 4 (偶) | 1.5 | **1** ✅ |
| 5 (奇) | 2.0 | **2** ✅ |
| 6 (偶) | 2.5 | **2** ✅ |

⚠️ **不能用 `Math.floor(len / 2)`**,会对偶数多算 1:
- `len=4` 时算出 2,但应该是 1 → `start = -1` 越界!

### 执行过程示例

```
s = "babad"
     01234

i=0 (b):
  expand(0,0) → 'b',len1=1
  expand(0,1) → s[0]='b' ≠ s[1]='a',len2=0
  len=1, 不更新

i=1 (a):
  expand(1,1) → 扩到 s[0]='b'=s[2]='b',再扩 s[-1] 越界
                 回文 [0,2]='bab',len1=3
  expand(1,2) → s[1]='a' ≠ s[2]='b',len2=0
  len=3 > maxLen=1, 更新:
    maxLen = 3
    start = 1 - Math.floor((3-1)/2) = 1 - 1 = 0

i=2 (b):
  expand(2,2) → 扩到 s[1]='a'=s[3]='a',再扩 s[0]='b' ≠ s[4]='d'
                 回文 [1,3]='aba',len1=3
  expand(2,3) → s[2]='b' ≠ s[3]='a',len2=0
  len=3, 不更新(等于不大于)

i=3 (a):
  expand(3,3) → 'a',len1=1
  expand(3,4) → s[3]='a' ≠ s[4]='d',len2=0
  不更新

i=4 (d):
  expand(4,4) → 'd',len1=1
  expand(4,5) → 越界,len2=0
  不更新

最终:s.substring(0, 3) = "bab" ✅
```

### 易错点(面试官爱抠)

| 坑 | 说明 |
|---|---|
| 只调一次 `expand` | 必漏奇数或偶数回文 |
| 用 `Math.floor(len/2)` | 偶数情况会越界 |
| 返回 `s.substring(...)` 在 expand 里 | 性能差,可能超时 |
| `len-1` 写成 `len` | 长度计算错 |
| 边界 `right < s.length` 写成 `<=` | 越界 |

### 回文相关题目地图

看到"回文"应立刻联想到:

| 题目 | LC | 推荐解法 |
|---|---|---|
| 验证回文串 | 125 | 双指针(首尾向中间) |
| **最长回文子串** | **5** | **中心扩展** ⭐ |
| 最长回文子序列 | 516 | DP(不连续,必须 DP) |
| 回文链表 | 234 | 快慢指针 + 反转后半 |
| 分割回文串 | 131 | 回溯 + 中心扩展预处理 |
| 回文数 | 9 | 反转一半数字 |

**记忆法**:
- **子串**回文 → 中心扩展
- **子序列**回文 → DP
- **判断**回文 → 双指针
