## Zigzag Conversion
[Zigzag Conversion](https://leetcode.cn/problems/zigzag-conversion/)：The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

P   A   H   N
A P L S I I G
Y   I   R
And then read line by line: "PAHNAPLSIIGYIR"

### 思路

把题目翻译成人话：按 Z 字形把字符依次填进 `numRows` 行，最后**逐行**拼起来。所以你只需要解决一件事：

> **每个字符最终落在第几行？**

观察 `numRows = 3` 时每个字符的行号：

```
字符:  P A Y P A L I S H I R I N G
行号:  0 1 2 1 0 1 2 1 0 1 2 1 0 1
```

行号像**钟摆**一样在 `[0, numRows-1]` 之间来回弹：先 `0→1→2` 往下走，撞底反弹 `2→1→0`，撞顶又往下，循环往复。

#### 核心做法：按行收集

1. 准备 `numRows` 个空字符串数组 `rows`
2. 维护 `curRow`（当前行号）和 `goingDown`（方向布尔值）
3. 顺序扫描每个字符：
   - 把字符追加到 `rows[curRow]`
   - 如果 `curRow` 已经到达顶端 `0` 或底端 `numRows - 1`，**翻转方向**
   - 按当前方向更新 `curRow`（往下 `+1`，往上 `-1`）
4. 最后把 `rows` 全部拼接返回

注意"**先写字符，写完再判断是否撞边界翻方向**"，这样行号序列 `0,1,2,1,0,1,2,1,...` 才会自然出现。

#### 边界

- `numRows === 1` 或 `numRows >= s.length`：根本弯不起来，直接返回原串。前者还会让钟摆死循环（顶 = 底），必须特判。

#### 复杂度

- 时间 `O(n)`：每个字符只被访问常数次。
- 空间 `O(n)`：`numRows` 个桶总共存 `n` 个字符。

#### 一句话记忆

> **开 numRows 个桶，行号像钟摆在 `[0, numRows-1]` 反弹，逐字符塞进当前行，最后逐桶拼接。**

回溯式记忆链：这题和[18] Subsets 不同，不是"决策树前序遍历"，是**线性扫描 + 状态机**——状态只有 `curRow` 和 `goingDown` 两个变量。

### 代码

```js
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
    // 边界：弯不起来时直接原样返回
    if (numRows === 1 || numRows >= s.length) return s;

    // 准备 numRows 个桶
    const rows = new Array(numRows).fill('');
    let curRow = 0;
    let goingDown = false;

    for (const ch of s) {
        rows[curRow] += ch;
        // 撞到顶端或底端就翻方向
        if (curRow === 0 || curRow === numRows - 1) {
            goingDown = !goingDown;
        }
        curRow += goingDown ? 1 : -1;
    }

    return rows.join('');
};
```

### 走一遍 `s = "PAYPALISHIRING", numRows = 3`

| 步 | ch | 写入前 curRow | goingDown 翻转? | 写入后方向 | 下一步 curRow |
|----|----|---------------|-----------------|------------|---------------|
| 1  | P  | 0             | 是 → true       | 下         | 1             |
| 2  | A  | 1             | 否              | 下         | 2             |
| 3  | Y  | 2             | 是 → false      | 上         | 1             |
| 4  | P  | 1             | 否              | 上         | 0             |
| 5  | A  | 0             | 是 → true       | 下         | 1             |
| 6  | L  | 1             | 否              | 下         | 2             |
| 7  | I  | 2             | 是 → false      | 上         | 1             |
| ...| ...| ...           | ...             | ...        | ...           |

最后三个桶：

```
rows[0] = "PAHN"
rows[1] = "APLSIIG"
rows[2] = "YIR"
```

`join('')` → `"PAHNAPLSIIGYIR"` ✅

### 进阶解法（数学公式法，了解即可）

不用桶，直接计算每行字符在原串中的下标，按行号外层循环、按周期内层循环输出。

周期 `cycle = 2 * numRows - 2`。对第 `r` 行：
- 每个周期内，第一个字符在原串下标 `j + r`（`j` 是周期起点）
- **中间行**还有第二个字符，在 `j + cycle - r`（即斜线上那个）
- 顶行和底行每个周期只有一个字符

```js
var convert = function (s, numRows) {
    if (numRows === 1 || numRows >= s.length) return s;

    const cycle = 2 * numRows - 2;
    let res = '';
    for (let r = 0; r < numRows; r++) {
        for (let j = 0; j + r < s.length; j += cycle) {
            res += s[j + r];
            // 中间行(非顶非底)还要加斜线上那个字符
            if (r !== 0 && r !== numRows - 1 && j + cycle - r < s.length) {
                res += s[j + cycle - r];
            }
        }
    }
    return res;
};
```

时间空间和按行收集法完全一样（`O(n)` / `O(n)`，输出串本身），但代码不直观，**面试推荐第一种**。

