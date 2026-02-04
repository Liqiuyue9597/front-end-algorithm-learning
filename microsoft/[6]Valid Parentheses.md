## Valid Parentheses
[Valid Parentheses](https://leetcode.cn/problems/valid-parentheses/)：Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

1.Open brackets must be closed by the same type of brackets.
2.Open brackets must be closed in the correct order.
3.Every close bracket has a corresponding open bracket of the same type.


### 思路
用**栈**去配对。

### 代码
```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  const map = {
    '(': ')',
    '{':'}',
    '[':']'
  };
  const arr = []
  for (let i=0; i<s.length;i++) {
    if (map[s[i]]) {
      arr.push(s[i])
    } else {
      const a = arr.pop();
      if (map[a] !== s[i]) return false;
    }
  }
  return arr.length === 0
};

```
