## Compare Version Numbers
[Compare Version Numbers](https://leetcode.cn/problems/compare-version-numbers)：Given two version strings, version1 and version2, compare them. A version string consists of revisions separated by dots '.'. The value of the revision is its integer conversion ignoring leading zeros.

To compare version strings, compare their revision values in left-to-right order. If one of the version strings has fewer revisions, treat the missing revision values as 0.

Return the following:

If version1 < version2, return -1.
If version1 > version2, return 1.
Otherwise, return 0.

### 思路

**核心考点**:
1. **字符串分割**: 用 `.` 分割版本号,得到各个修订号
2. **数字比较**: 将字符串转为数字比较(否则 `"10" < "2"` 字符串比较会出错)
3. **长度不一致处理**: 短的版本号缺失部分当 `0` 处理

**步骤**:
1. 用 `split('.')` 分割两个版本号
2. 遍历到较长数组的长度
3. 每次取出对应位置的修订号,转为整数(缺失用 `0`)
4. 比较大小:
   - 如果 `num1 > num2`,返回 `1`
   - 如果 `num1 < num2`,返回 `-1`
   - 继续下一位
5. 全部相等,返回 `0`

**关键点**:
- `parseInt()` 会自动忽略前导零:`parseInt("01") === 1`
- 缺失部分用 `v1[i] || 0` 处理
- 必须转数字比较,不能直接字符串比较

### 代码
```js
/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function(version1, version2) {
    // 1. 按点分割成数组
    const v1 = version1.split('.');
    const v2 = version2.split('.');
    
    // 2. 取较长数组的长度
    const maxLen = Math.max(v1.length, v2.length);
    
    // 3. 逐位比较
    for (let i = 0; i < maxLen; i++) {
        // 转为整数,缺失部分当0处理
        const num1 = parseInt(v1[i] || 0, 10);
        const num2 = parseInt(v2[i] || 0, 10);
        
        // 比较当前位
        if (num1 > num2) return 1;
        if (num1 < num2) return -1;
        // 相等则继续下一位
    }
    
    // 4. 全部相等
    return 0;
};
```

### 执行过程示例

**Example 1**: `version1 = "1.2"`, `version2 = "1.10"`
```
v1 = ["1", "2"]
v2 = ["1", "10"]
maxLen = 2

i=0: num1=1, num2=1 → 相等,继续
i=1: num1=2, num2=10 → 2 < 10 → 返回 -1
```

**Example 2**: `version1 = "1.01"`, `version2 = "1.001"`
```
v1 = ["1", "01"]
v2 = ["1", "001"]
maxLen = 2

i=0: num1=1, num2=1 → 相等,继续
i=1: num1=1, num2=1 → 相等,继续
返回 0 (相等)
```

**Example 3**: `version1 = "1.0"`, `version2 = "1.0.0.0"`
```
v1 = ["1", "0"]
v2 = ["1", "0", "0", "0"]
maxLen = 4

i=0: num1=1, num2=1 → 相等,继续
i=1: num1=0, num2=0 → 相等,继续
i=2: num1=0(缺失,用0), num2=0 → 相等,继续
i=3: num1=0(缺失,用0), num2=0 → 相等,继续
返回 0 (相等)
```

### 复杂度
- **时间复杂度**: O(max(n, m)),n 和 m 是两个版本号的修订号数量
- **空间复杂度**: O(n + m),存储分割后的数组

### 易错点
1. **直接字符串比较**: `"10" < "2"` 作为字符串是 `false`,必须转数字
2. **忘记处理长度不一致**: `"1.0"` vs `"1.0.0"` 应该相等
3. **前导零**: `"01"` 应该当 `1` 处理,`parseInt()` 自动处理
