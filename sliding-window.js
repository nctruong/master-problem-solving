// slice counts from 1st (not zero) and ignore begin number
function sumSubArray(arr, _begin, _end) {
    return arr.slice(_begin, _end).reduce((a, b) => (a+b))
}

function maxSum(arr, n) {
    let _begin = 0;
    let _end = n;
    let max = sumSubArray(arr, _begin, _end)
    console.log(`${_begin + 1} - ${_end} : ${max}`);
    while (_end + 1 <= arr.length){
        _begin++;
        _end++;
        sum = sumSubArray(arr, _begin, _end);
        console.log(`${_begin + 1} - ${_end} : ${sum}`);
        if (sum > max) {
            max = sum;
        }
    }
    return max;
}
console.log(maxSum([1,2,3,4,5],2));