function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
  
    // Move elements greater than key one position ahead
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
  
    arr[j + 1] = key;
  }
  return arr;
}


console.log(insertionSort([2, 1, 5, 4, 32, 12, 34, 23, 7, 45, 34, 56]))