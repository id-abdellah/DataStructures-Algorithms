function selectionSort(arr) {

    for (let i = 0; i < arr.length; i++) {
        let minimum = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                minimum = j
            }
        }
        [arr[i], arr[minimum]] = [arr[minimum], arr[i]]
    }
    return arr
}


console.log(selectionSort([2, 1, 5, 4, 32, 12, 34, 23, 7, 45, 34, 56]))