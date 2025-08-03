// Naive Solution
function maxSubarraySum(arr, num) {
    if (num > arr.length) return null;

    let max = -Infinity;
    for (let i = 0; i < arr.length - num + 1; i++) {
        let temp = 0;
        let subsetTemp = []
        for (let j = 0; j < num; j++) {
            temp += arr[i + j];
        }
        if (temp > max) {
            max = temp;
        }
    }
    return max
}


console.log(maxSubarraySum([1,2,5,2,8,1,5],2)); // 10
console.log(maxSubarraySum([1,2,5,2,8,1,5],4)) ; // 17
console.log(maxSubarraySum([1,2],4)) ; // null




console.log("\nSliding Window Solution\n\n")
// Sliding Window Solution



function maxSubarraySum2(arr, num) {
    let maxSum = 0;
    let tempSum = 0;
    
    if (num > arr.length) return null
    
    for (let i = 0; i < num; i++) {
        maxSum += arr[i]
    }
    tempSum = maxSum;
    for (let i = num; i < arr.length; i++) {
        tempSum = tempSum - arr[i - num] + arr[i];
        maxSum = Math.max(maxSum, tempSum)
    }
    return maxSum
}



// console.log(maxSubarraySum2([1,2,5,2,8,1,5],2)); // 10
console.log(maxSubarraySum2([1,2,5,2,8,1,5],4)) ; // 17
// console.log(maxSubarraySum2([1,2],4)) ; // null











""