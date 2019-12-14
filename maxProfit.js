/*Dec 1, 2019
  Frederick Lee
*/

/**
 * Calculates the maximm profit for a given stock from buying once, then selling at a later day.
 * - Brute force method. O(n^2) time
 * @param {array} prices array of stock prices. The order is the price in time. 0 index is first day and nth index is nth day
 * @returns {number} maximum profit or -1 if no profit can be made
 */
const maxProfit = (prices) => {
  let profit = -1;

  if (prices.length === 1) {
    return profit;
  }

  const arrayHalfIndex = Math.floor(prices.length / 2);
  const leftArr = prices.slice(0, arrayHalfIndex);
  const rightArr = prices.slice(arrayHalfIndex);

  const leftMaxProfit = maxProfit(leftArr);
  const rightMaxProfit = maxProfit(rightArr);

  const max = rightArr.reduce((prv, cur) => cur - prv > 0 ? cur : prv);
  const min = leftArr.reduce((prv, cur) => cur - prv > 0 ? prv : cur);

  profit = Math.max(
    leftMaxProfit,
    rightMaxProfit,
    max - min
  );

  return profit;
};
/**
 * Calculates the maximm profit for a given stock from buying once, then selling at a later day.
 * - Recursion method. O((n-1)^2) time. Still basically O(n^2) time
 * @param {array} prices array of stock prices. The order is the price in time. 0 index is first day and nth index is nth day
 * @returns {number} maximum profit or -1 if no profit can be made
 */
const maxProfitRecursion = (prices) => {
  let max = -1;

  // == recursion way == NOT proper divide an conquer
  if (prices.length < 2) {
    return max;
  } else {
    const currentPrice = prices[0];
    for (let futureIndex = 1; futureIndex < prices.length; futureIndex++) {
      if (prices[futureIndex] - currentPrice > max) {
        // console.log('cur:', currentPrice, 'future:', prices[futureIndex]);
        max = prices[futureIndex] - currentPrice;
      }
    }
    const futureProfic = maxProfitRecursion(prices.slice(1));
    max = futureProfic > max ? futureProfic : max;
  }

  return max;
};

/**
 * Calculates the maximm profit from buying once, then selling at a later day.
 * - Brute force method. O(n^2) time
 * @param {array} prices array of stock prices. The order is the price in time. 0 index is first day and nth index is nth day
 * @returns {number} maximum profit or -1 if no profit can be made
 */
const maxProfitBruteForce = (prices) => {
  let max = -1;
  // == brute force ==
  prices.forEach((currentPrice, index) => {
    for (let futureIndex = index + 1; futureIndex < prices.length; futureIndex++) {
      if (prices[futureIndex] - currentPrice > max) {
        // console.log('cur:', currentPrice, 'future:', prices[futureIndex]);
        max = prices[futureIndex] - currentPrice;
      }
    }
  });

  return max;
};

module.exports = {
  maxProfitBruteForce,
  maxProfitRecursion,
  maxProfit,
};