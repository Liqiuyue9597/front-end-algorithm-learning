## Reverse Integer
[Reverse Integer](https://leetcode.cn/problems/reverse-integer)：Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.
Assume the environment does not allow you to store 64-bit integers (signed or unsigned).


### 思路

**数学取余法**:
1. 通过 `x % 10` 获取最后一位数字
2. 通过 `Math.trunc(x / 10)` 去掉最后一位
3. 用 `result = result * 10 + digit` 构建反转后的数字
4. **关键**: 每次更新前检查是否会溢出 32 位整数范围 `[-2^31, 2^31 - 1]`

**溢出判断**:
- 32位整数范围: `[-2147483648, 2147483647]`
- 在 `result * 10 + digit` 之前判断是否会超出范围

### 代码
```js
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    const INT_MAX = 2 ** 31 - 1;  // 2^31 - 1
    const INT_MIN = -(2 ** 31); // -2^31
    
    let result = 0;
    
    while (x !== 0) {
        // 获取最后一位数字
        const digit = x % 10;
        // 去掉最后一位
        x = Math.trunc(x / 10);
        
        // 溢出检查:在更新result前判断
        // 如果 result * 10 + digit 会溢出,则返回0
        if (result > Math.trunc(INT_MAX / 10) || 
            (result === Math.trunc(INT_MAX / 10) && digit > 7)) {
            return 0;
        }
        if (result < Math.trunc(INT_MIN / 10) || 
            (result === Math.trunc(INT_MIN / 10) && digit < -8)) {
            return 0;
        }
        
        result = result * 10 + digit;
    }
    
    return result;
};
```

**复杂度分析**:
- 时间复杂度: O(log x),数字有多少位就循环多少次
- 空间复杂度: O(1),只用了常数个变量
