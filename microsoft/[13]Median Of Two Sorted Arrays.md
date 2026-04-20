## Median Of Two Sorted Arrays
[Median Of Two Sorted Arrays](https://leetcode.cn/problems/median-of-two-sorted-arrays)：Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).


### 思路

**方法: 二分查找 - 寻找第K小的数**

关键洞察:
1. 中位数本质是找第K小的数
   - 总长度为奇数: 找第 `(m+n+1)/2` 小的数
   - 总长度为偶数: 找第 `(m+n)/2` 和 `(m+n)/2+1` 小的数,取平均

2. 如何在两个有序数组中找第K小的数?
   - 每次比较两个数组的第 `k/2` 个元素
   - 较小的那一半一定不包含第K小的数,可以排除
   - 递归处理剩余部分,K也相应减小

3. 为什么是 O(log(m+n))?
   - 每次排除 `k/2` 个元素
   - K从 `(m+n)/2` 开始,每次减半
   - 递归深度: `log(m+n)`

**图解示例**:
```
nums1 = [1, 3, 5, 7, 9]
nums2 = [2, 4, 6, 8, 10]
找中位数 = 找第5小的数 (k=5)

第1轮: 比较第k/2=2个元素
  nums1[1] = 3
  nums2[1] = 4
  3 < 4 → 排除 nums1 的 [1,3]
  
第2轮: 剩余 nums1=[5,7,9], nums2=[2,4,6,8,10], k=3
  比较第k/2=1个元素
  nums1[0] = 5
  nums2[0] = 2
  2 < 5 → 排除 nums2 的 [2]
  
第3轮: 剩余 nums1=[5,7,9], nums2=[4,6,8,10], k=2
  比较第k/2=1个元素
  nums1[0] = 5
  nums2[0] = 4
  4 < 5 → 排除 nums2 的 [4]
  
第4轮: 剩余 nums1=[5,7,9], nums2=[6,8,10], k=1
  k=1 时,返回两数组首元素的较小值 = 5
```

### 代码
```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    const m = nums1.length;
    const n = nums2.length;
    const total = m + n;
    
    // 总长度为奇数,找第 (total+1)/2 小的数
    if (total % 2 === 1) {
        return findKth(nums1, 0, nums2, 0, Math.floor(total / 2) + 1);
    } 
    // 总长度为偶数,找第 total/2 和 total/2+1 小的数,取平均
    else {
        const left = findKth(nums1, 0, nums2, 0, total / 2);
        const right = findKth(nums1, 0, nums2, 0, total / 2 + 1);
        return (left + right) / 2;
    }
};

/**
 * 在两个有序数组中找第k小的数
 * @param {number[]} nums1 - 数组1
 * @param {number} start1 - nums1的起始索引
 * @param {number[]} nums2 - 数组2
 * @param {number} start2 - nums2的起始索引
 * @param {number} k - 找第k小的数 (k从1开始)
 */
function findKth(nums1, start1, nums2, start2, k) {
    // 边界情况1: nums1已经用完,直接返回nums2中的第k个
    if (start1 >= nums1.length) {
        return nums2[start2 + k - 1];
    }
    // 边界情况2: nums2已经用完,直接返回nums1中的第k个
    if (start2 >= nums2.length) {
        return nums1[start1 + k - 1];
    }
    // 边界情况3: k=1,返回两个数组当前位置的较小值
    if (k === 1) {
        return Math.min(nums1[start1], nums2[start2]);
    }
    
    // 分别找到两个数组中第 k/2 个元素的位置
    const half = Math.floor(k / 2);
    const idx1 = start1 + half - 1;
    const idx2 = start2 + half - 1;
    
    // 获取第 k/2 个元素的值 (如果越界,设为无穷大)
    const val1 = idx1 < nums1.length ? nums1[idx1] : Infinity;
    const val2 = idx2 < nums2.length ? nums2[idx2] : Infinity;
    
    // 比较两个值,排除较小的那一半
    if (val1 < val2) {
        // nums1 的前 k/2 个元素都小于第k小的数,可以排除
        return findKth(nums1, idx1 + 1, nums2, start2, k - half);
    } else {
        // nums2 的前 k/2 个元素都小于第k小的数,可以排除
        return findKth(nums1, start1, nums2, idx2 + 1, k - half);
    }
}
```

**复杂度分析**:
- 时间复杂度: `O(log(m+n))` - 每次排除k/2个元素,k从(m+n)/2开始递减
- 空间复杂度: `O(log(m+n))` - 递归调用栈的深度

**关键点**:
1. 每次比较两个数组的第 `k/2` 个元素
2. 较小的那一半一定不包含第k小的数
3. 递归时 k 减去已排除的元素数量
4. 注意边界情况: 数组用完、k=1、越界处理