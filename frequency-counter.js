function solvepb(arr1, arr2){
    freq1 = {}
    freq2 = {}
    for (let el of arr1) {
        freq1[el] = (freq1[el] || 0) + 1
    }

    for (let el of arr2) {
        freq2[el] = (freq2[el] || 0) + 1
    }

    console.log("freq1: ", freq1);
    console.log("freq2: ", freq2);
    for (let key in freq1) {
        if (freq2[key ** 2] !== freq1[key]){
            return false;
        }
    }
    return true;
};

console.log(solvepb([1,2,3], [1,4,9,9]));