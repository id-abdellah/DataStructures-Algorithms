/********************************************************************
    Merge Sort
*********************************************************************/

function mergeSort(list) {
    if (list.length <= 1) return list;
    const middle = Math.floor(list.length / 2);
    const fHalf = mergeSort(list.slice(0, middle));
    const sHalf = mergeSort(list.slice(middle));
    return merge(fHalf, sHalf)
}

console.log(mergeSort([100, 50, 2, 1, 10, 14, 10, 50, 99]))

/********************************************************************
    Merge Function => merging two sorted arrays in a new sorted one
*********************************************************************/

// my own implementation which is wonderful :)
function my_merge(arr1, arr2) {
    let i = 0, j = 0;
    let result = [];
    
    while (result.length !== arr1.length + arr2.length) {
        if (i === arr1.length) {
            result.push(...arr2.slice(j))
            break;
        } else if (j === arr2.length) {
            result.push(...arr1.slice(i))
            break;
        }
        
        if (arr1[i] <= arr2[j]) {
            result.push(arr1[i])
            i++
        } else {
            result.push(arr2[j])
            j++
        }
    }

    return result
}

// an implementation for a better readability
function merge(arr1, arr2) {
    let i = 0, j = 0;
    let result = [];
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] <= arr2[j]) {
            result.push(arr1[i]);
            i++
        } else {
            result.push(arr2[j]);
            j++
        }
    }
    return result.concat(arr1.slice(i)).concat(arr2.slice(j))
}