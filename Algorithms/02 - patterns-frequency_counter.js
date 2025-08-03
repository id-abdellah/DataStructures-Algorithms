console.log("Naive Solution")
// Naive Solution. O(n^2)
function same(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    
    for (let i = 0; i < arr1.length; i++) {
        const currentNum = arr1[i];
        const index = arr2.indexOf(currentNum ** 2);
        if (index === -1) return false;
        arr2.splice(index, 1)
    }

    return true
}


console.log(same([1, 2, 3], [4, 1, 9])) // true
console.log(same([1, 2, 3], [1, 9])) // false
console.log(same([1, 2, 1], [4, 4, 1])) // false 
console.log(same([5, 2, 9, 2, 10, 3], [9, 100, 4, 4, 81, 25])) // true



console.log("Frequency Counter")
// Frequency counter Pattern Solution

function same2(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    
    let arr1Frequency = {};
    let arr2Frequency = {};
    
    for (let num of arr1) {
        arr1Frequency[num] = (arr1Frequency[num] || 0) + 1;
    }
    for (let num of arr2) {
        arr2Frequency[num] = (arr2Frequency[num] || 0) + 1;
    }
    
    for (let key in arr1Frequency) {
        if (!(key ** 2 in arr2Frequency)) return false;
        if (arr1Frequency[key] !== arr2Frequency[key ** 2]) return false;
    }

    return true
}

console.log(same2([1, 2, 3], [4, 1, 9])) // true
console.log(same2([1, 2, 3], [1, 9])) // false
console.log(same2([1, 2, 1], [4, 4, 1])) // false 
console.log(same2([5, 2, 9, 2, 10, 3], [9, 100, 4, 4, 81, 25])) // true


""