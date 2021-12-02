## Two Sum
[两数之和](https://leetcode-cn.com/problems/two-sum/)：Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

### 思路
- 时间换空间：双重for循环，但是不用新开map或者对象去存。时间o(n^2)，空间是o(1)
- 空间换时间： 新开空间存，时间o(n)，空间o(n)


第一种也类似于暴力解法
```ts
function twoSum(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) {
        return [i, j]
      }
    }
  }
  // 为了代码的鲁棒性还应该在没有结果时返回，不过写不写都不影响这个题目
  return []
};

```
第二种使用map/object来存储数据。得出的结果对象存储会比map更节省空间一些。
```ts
// Map存储
function twoSum(nums: number[], target: number): number[] {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
      return [map.get(nums[i]), i]
    }
    map.set(target - nums[i], i);
  }
}

// 对象存储
function twoSum(nums: number[], target: number): number[] {
  const obj = {};
  for (let i = 0; i < nums.length; i++) {
    if (obj[nums[i]] !== undefined) {
      return [obj[nums[i]], i]
    }
    obj[target - nums[i]] = i;
  }
};
```