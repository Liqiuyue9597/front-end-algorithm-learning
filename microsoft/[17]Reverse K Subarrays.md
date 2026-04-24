## Reverse K Subarrays
[Reverse K Subarrays](https://leetcode.cn/problems/reverse-k-subarrays)：给定一个长度为 n 的整数数组 nums 和一个整数 k。将数组划分为 k 个长度相等的连续子数组，并反转每个子数组。保证 n 能被 k 整除。返回上述操作后的结果数组。

**示例 1:**
```
输入: nums = [1,2,4,3,5,6], k = 3
输出: [2,1,3,4,6,5]
解释: 划分为 3 个子数组 [1,2], [4,3], [5,6]，反转后得到 [2,1], [3,4], [6,5]
```

**示例 2:**
```
输入: nums = [5,4,4,2], k = 1
输出: [2,4,4,5]
解释: 划分为 1 个子数组 [5,4,4,2]，反转后得到 [2,4,4,5]
```

### 思路
这是一道简单的模拟题，使用双指针原地反转每个子数组：

1. **计算子数组长度**：`m = n / k`（每个子数组的长度）
2. **按步长遍历**：以步长 m 遍历数组，每次处理一个子数组
3. **双指针反转**：对每个子数组使用左右指针交换元素
   - 左指针 `l` 从子数组起始位置开始
   - 右指针 `r` 从子数组结束位置开始
   - 当 `l < r` 时交换元素，并移动指针
4. **原地操作**：不需要额外空间，直接在原数组上修改

时间复杂度：O(n)，空间复杂度：O(1)

### 代码
```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var reverseSubarrays = function(nums, k) {
    const n = nums.length;
    // 计算每个子数组的长度
    const m = Math.floor(n / k);
    
    // 按步长 m 遍历数组，每次反转一个子数组
    for (let i = 0; i < n; i += m) {
        // 双指针：左指针从子数组起始位置，右指针从结束位置
        let left = i;
        let right = i + m - 1;
        
        // 交换元素，反转子数组
        while (left < right) {
            // 交换 nums[left] 和 nums[right]
            [nums[left], nums[right]] = [nums[right], nums[left]];
            left++;
            right--;
        }
    }
    
    return nums;
};
```
