function search(longString, subString) {
    let counter = 0;

    for (let i = 0; i < longString.length; i++) {
        let letter = longString[i];
        
        if (letter !== subString[0]) continue; 

        for (let j = 1; j < subString.length; j++) {
            if (subString[j] !== longString[i + j]) break;
            if (j === subString.length - 1) {
                counter++;
            }
        }
    }
    return counter;
}

// OR

function search2(longStr, pattern) {
    const pLength = pattern.length;
    const where = [];
    for (let i = 0; i < longStr.length - pLength + 1; i++) {
        if (longStr.slice(i, i + pLength) === pattern) {
            where.push(i)
        }
    }
    return where;
}

console.log(search("wowoomgzomg", "omg")); // 2
console.log(search("abababcabababcabababc", "ababc")); // 3
console.log(search("aaaaa", "aa")); // 4