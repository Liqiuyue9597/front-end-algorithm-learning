## Best Time To Buy And Sell Stock
[Best Time To Buy And Sell Stock](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock)：You are given an array prices where prices[i] is the price of a given stock on the i^th day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

### 思路

- **题意**：选一天买入、之后某一天卖出，求最大利润；不能获利则返回 0。
- **一次遍历**（推荐）：
  - 对「今天」来说，如果在**之前出现过的历史最低价**买入、今天卖出，就是以今天为卖出日的最大利润。
  - 维护两个变量：
    - `minPrice`：到当前为止的最低价格（候选买入价）
    - `maxProfit`：到当前为止的最大利润
  - 遍历每天：先更新 `minPrice = min(minPrice, 当天价格)`，再算「今天卖」的利润 `当天价格 - minPrice`，用其更新 `maxProfit`。
- **复杂度**：时间 O(n)，空间 O(1)。

### 代码
```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let minPrice = prices[0];
  let maxProfit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > minPrice) {
      maxProfit = Math.max(maxProfit, prices[i] - minPrice);
    }
    minPrice = Math.min(minPrice, prices[i]);
  }

  return maxProfit;
};
```
