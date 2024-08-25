function getDigit(num, place) {
    return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

function digitCount(num) {
    if (num === 0) return 1;
    return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigits(nums) {
    let maxDigits = 0;
    for (let i = 0; i < nums.length; i++) {
        maxDigits = Math.max(maxDigits, digitCount(nums[i]));
    }
    return maxDigits;
}

function radixSort(arr) {
    let maxDigitCount = mostDigits(arr);
    for (let k = 0; k < maxDigitCount; k++) {
        let digitBuckets = Array.from({ length: 10 }, () => []);

        for (let i = 0; i < arr.length; i++) {
            let digit = getDigit(arr[i], k);
            digitBuckets[digit].push(arr[i]);
        }

        arr = [].concat(...digitBuckets);
    }
    return arr;
}

let data = [329, 457, 657, 839, 436, 720, 355];

function create(element) {
    data.push(element);
    data = radixSort(data);
}

function read() {
    return data;
}

function update(index, newElement) {
    if (index >= 0 && index < data.length) {
        data[index] = newElement;
        data = radixSort(data);
    }
}

function del(index) {
    if (index >= 0 && index < data.length) {
        data.splice(index, 1);
        data = radixSort(data);
    }
}
