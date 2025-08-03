function isAnagram(str1, str2) {
    if (str1.length !== str2.length) return false;
    if (str1 + str2 === "") return true;

    let freqCounter1 = {};
    let freqCounter2 = {};

    for (let letter of str1) {
        freqCounter1[letter] = (freqCounter1[letter] || 0) + 1
    }
    for (let letter of str2) {
        freqCounter2[letter] = (freqCounter2[letter] || 0) + 1
    }

    for (let key in freqCounter1) {
        if (freqCounter1[key] !== freqCounter2[key]) return false
    }
    return true
}

console.log(isAnagram("", "")); // true
console.log(isAnagram("cinema", "iceman")); // true
console.log(isAnagram("rat", "car")); // false
console.log(isAnagram("awesome", "awesom")); // false
console.log(isAnagram("texttwisttime", "timetexttwist")); // true