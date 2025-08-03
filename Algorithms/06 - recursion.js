function sumRange(num) {
    if (num === 1) return 1;
    return num + sumRange(num - 1)
}

console.log(sumRange(4)); // 4 + 3 + 2 + 1 => 10


function factorial(num) {
    if (num === 1) {
        return 1
    }
    return num * factorial(num - 1);
}

console.log(factorial(4))