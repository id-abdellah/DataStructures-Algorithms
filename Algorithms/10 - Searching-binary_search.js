function binarySeach(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        const middle = Math.floor((left + right) / 2);
        if (arr[middle] === target) return middle;
        if (arr[middle] < target) {
            left = middle + 1;
        } else if (arr[middle] > target) {
            right = middle - 1;
        }
    }
    return -1;
}


const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ,14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24 ,25, 26, 27, 28, 29, 30];

console.log(binarySeach(nums, 8));
console.log(binarySeach(nums, 29));
console.log(binarySeach(nums, 80));