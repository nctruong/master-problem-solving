// inputs need to be sorted in advance
function findFair(arr){
    left = 0;
    right = arr.length - 1
    while (left < right) {
        if ((arr[left] + arr[right]) === 0) {
            console.log([arr[left], arr[right]]);
            left++;
        } else if ((arr[left] + arr[right]) < 0) {
            left++;
        } else {
            right--;
        }
    }
}
// findFair([-4, -3, -2, -1, 0, 1, 2, 5]);

// inputs need to be sorted in advance
function countUniqValue(arr) {
    let first = 0;
    let second = 1;
    while (second < arr.length) {
        if (arr[first] === arr[second]){
            second++;
        } else {
            first++
            arr[first] = arr[second];
        }
    }
    return (arr.slice(0, first + 1)).length;
}
console.log(countUniqValue([1,1,2,2,2,3,3,3,4,4,4,4,4,4,4,4,5,6,6]));
