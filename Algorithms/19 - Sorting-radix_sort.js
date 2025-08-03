
/**
 * like accessing elements by index. but from the right side.
 * 
 * getDigit(879, 0) => 9   
 * getDigit(879, 1) => 7   
 * getDigit(879, 2) => 8   
 * getDigit(879, 3) => null  
 */
function getDigit(num, place) {
    const numReversed = String(num).split("").reverse().join("");
    const digit = numReversed[place]

    return Number(digit) ? Number(digit) : null;
}

/**
 * returns how many digits in a number
 */
function digitCount(num) {
    return String(num).length
}

/**
 * return the length of the most number which have the most digits
 */
function mostDigits(numsArray) {
    let maxDigits = 0;
    for (let i = 0; i < numsArray.length; i++) {
        maxDigits = Math.max(maxDigits, digitCount(numsArray[i]))
    }
    return maxDigits
}


function radixSort(list) {
    const loopLength = mostDigits(list)

    for (let k = 0; k < loopLength; k++) {
        let buckets = Array.from({ length: 10 }, () => [])
        for (let i = 0; i < list.length; i++) {
            let place = k;
            let currNum = list[i];
            let digit = getDigit(currNum, place)
            buckets[digit ? digit : 0].push(currNum)
        };
        list = buckets.flat(1)
    }

    return list;
}


console.log(radixSort([2, 3, 1, 23, 945, 63, 234, 634, 2343, 9, 4, 9, 6, 5, 7]))