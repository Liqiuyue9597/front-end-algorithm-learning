## Group Anagrams
[Group Anagrams](https://leetcode.cn/problems/group-anagrams)：Given an array of strings strs, group the anagrams together. You can return the answer in any order.


### 思路
1. 抓住变位词的本质

两个字符串是变位词 ⟺ 它们包含的字母种类和个数相同，只是顺序不同。

2. 给每个字符串一个「统一代表」

用同一个规则把字符串变成一种「标准形式」，变位词会得到相同的标准形式，非变位词会得到不同的。常用两种方式：
排序：把字符串里的字符按字典序排好，例如 "eat" → "aet"，同一组变位词排序后都一样。
计数：用每个字母出现的次数拼成一个 key，例如 "a1e1t1"，同一组变位词计数 key 相同。

3. 用哈希表分组

key：上面得到的「标准形式」；
value：原字符串组成的数组。
遍历每个字符串，算出它的 key，把原串放进对应 key 的数组里。
输出结果
遍历完后，哈希表里每个 key 对应的数组就是一组变位词，把这些数组收集起来就是答案。
一句话：用「标准化表示」当 key，用哈希表把相同 key 的字符串归到同一组。

### 代码
```js
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const formatKey = (strs) => {
    return strs.split('').sort().join('');
  }

  const map = new Map();
  for (let i = 0; i < strs.length; i++) {
    const key = formatKey(strs[i]);
    if (!map.has(key)) {
      map.set(key, []);
    }

    map.get(key).push(strs[i]);
  }

  return [...map.values()];
};

```
