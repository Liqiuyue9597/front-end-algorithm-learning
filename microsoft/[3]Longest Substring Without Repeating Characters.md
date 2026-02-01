## Longest Substring Without Repeating Characters
[Longest Substring Without Repeating Characters](https://leetcode.cn/problems/longest-substring-without-repeating-characters)：Given a string s, find the length of the longest substring without duplicate characters.


### 思路
这道题的思路比较简单，就是用一个滑动窗口[left, right]两边去限定不重复的字符串就行。
但是这道题很多人第一次运行失败都是因为边界case
1.如果是全重复的字符串，初始的0就不对
2.容易忽略遍历的s[index]，这个重复的index不在滑动窗口[left, right]中的情况

### 代码
```js

```
