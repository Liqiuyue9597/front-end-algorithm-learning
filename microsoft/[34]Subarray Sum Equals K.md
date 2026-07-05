## Subarray Sum Equals K
[Subarray Sum Equals K](https://leetcode.cn/problems/subarray-sum-equals-k)：Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.

A subarray is a contiguous non-empty sequence of elements within an array.

 

Example 1:

Input: nums = [1,1,1], k = 2
Output: 2
Example 2:

Input: nums = [1,2,3], k = 3
Output: 2
 

### 思路


### 代码
```js
var subarraySum = function (nums, k) {
  const map = new Map([[0, 1]]);
  let count = 0;
  let sum = 0;

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    count += map.get(sum - k) || 0;
    map.set(sum, (map.get(sum) || 0) + 1);
  }

  return count;
};
```
