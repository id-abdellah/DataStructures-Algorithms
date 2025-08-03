function collectOdds(arr) {
    let newArr = [];
    if (arr.length === 0) {
        return newArr;
    }
    if (arr[0] % 2 !== 0) {
        newArr.push(arr[0]);
    }
    newArr = newArr.concat(collectOdds(arr.slice(1)));
    return newArr;
}

console.log(collectOdds([3, 2, 1, 4, 5, 6, 3, 2, 8, 5, 0, 22, 12, 32, 13, 43, 76, 79, 45, 3])) // [3, 1, 5, 3, 5, 13, 43, 79, 45]