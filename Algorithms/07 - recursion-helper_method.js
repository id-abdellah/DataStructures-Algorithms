function collectOdds(arr) {
    let odds = [];

    function helper(helperInput) {
        if (helperInput.length === 0) {
            return;
        }
        if (helperInput[0] % 2 !== 0) {
            odds.push(helperInput[0])
        }    
        helper(helperInput.slice(1))
    }
    
    helper(arr);
    
    return odds;
}


collectOdds([3, 2, 1, 4, 5, 6, 3, 2, 8, 5, 0, 22, 12, 32, 13, 43, 76, 79, 45]) // [3, 1, 5, 3, 5, 13, 43, 79, 45]