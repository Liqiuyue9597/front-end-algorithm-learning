## Merge Sorted Array
[Merge Sorted Array](https://leetcode.cn/problems/merge-sorted-array)：You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.

Merge nums1 and nums2 into a single array sorted in non-decreasing order.

The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.

### 思路
这道题的关键点在于：

nums1 的长度是 m + n，前 m 个是有效元素，后 n 个位置是预留给 nums2 的
两个数组都已经是有序的
需要原地修改 nums1，不能使用额外的数组
最优解法：从后往前填充
为什么要从后往前？

如果从前往后合并，会覆盖 nums1 前面的有效元素，需要额外的空间来保存
但 nums1 的后面有 n 个空位，从后往前填充就不会覆盖还没处理的元素

### 代码
```js
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    // 三个指针：p1 指向 nums1 有效元素末尾，p2 指向 nums2 末尾，p 指向 nums1 总末尾
    let p1 = m - 1;
    let p2 = n - 1;
    let p = m + n - 1;
    
    // 从后往前填充
    while (p1 >= 0 && p2 >= 0) {
        // 比较两个数组当前元素，谁大就放到 p 位置
        if (nums1[p1] > nums2[p2]) {
            nums1[p] = nums1[p1];
            p1--;
        } else {
            nums1[p] = nums2[p2];
            p2--;
        }
        p--;
    }
    
    // 如果 nums2 还有剩余元素，需要复制到 nums1 前面
    // 如果 nums1 有剩余，它们已经在正确位置了，不需要处理
    while (p2 >= 0) {
        nums1[p] = nums2[p2];
        p2--;
        p--;
    }
};
```
