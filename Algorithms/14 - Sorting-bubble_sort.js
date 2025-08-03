function bubbleSort(arr) {
    let swapped = true;

    while (swapped) {
        swapped = false;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
                swapped = true;
            }
        }
    }

    return arr
}


console.log(bubbleSort([2, 1, 5, 4, 32, 12, 34, 23, 7, 45, 34, 56]))