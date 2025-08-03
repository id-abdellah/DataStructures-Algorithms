console.log("Naive Solution")
// Naive Solution
function sumZero(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === 0) return [arr[i], arr[j]]
        }
    }
    return undefined
}

console.log(sumZero([-3, -2, -1, 0, 1, 2, 3])) // [-3, 3]
console.log(sumZero([-2, 0, 1, 2, 3])) // [-2, 2]
console.log(sumZero([1, 2, 3])) // undefined



console.log("Multiple Pointers")
// Multiple Pointers

function sumZero2(arr) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        const isZero = arr[left] + arr[right]
        if (isZero < 0) {
            left++
        } else if (isZero > 0) {
            right--
        } else if (isZero === 0) {
            return [arr[left], arr[right]]
        }
    }
}

console.log(sumZero2([-3, -2, -1, 0, 1, 2, 3])) // [-3, 3]
console.log(sumZero2([-4, -3, -2, -1, 0, 1, 2, 5])) // [-3, 3]
console.log(sumZero2([-2, 0, 1, 3, 8])) // undefined
console.log(sumZero2([1, 2, 3])) // undefined



console.log("Count Unique Values")
/*************************************
    Count Unique Values
**************************************/

function countUniqueValue(arr) {
    let back = 0;
    let front = 1;

    while (front < arr.length) {
        if (arr[back] === arr[front]) {
            front++
        } else {
            back++;
            arr[back] = arr[front];
            front++;
        }
    }
    return back + 1
}

console.log(countUniqueValue([1, 1, 1, 2, 3, 3, 4, 4, 5, 6]))
""