function linearSearch(arr, value) {
    for (let i = 0; i < arr.length; i++) {
        const currentElement = arr[i];
        if (currentElement === value) return i
    };
    return -1;
}

const arr = [8, 3, ,4 ,1, 3, 4, 22, 32, 12, "a", "b", "c", "Obito"];

console.log(linearSearch(arr, 4)); // 3
console.log(linearSearch(arr, "a")); // 9
console.log(linearSearch(arr, "A")); // -1