function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let result = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) result.push(left.shift());
        else result.push(right.shift());
    }
    return result.concat(left, right);
}

let data = [3, 6, 8, 10, 1, 2, 1];

console.log(mergeSort(data))

function create(element) {
    data.push(element);
    data = mergeSort(data);
}

function read() {
    return data;
}

function update(index, newElement) {
    if (index >= 0 && index < data.length) {
        data[index] = newElement;
        data = mergeSort(data);
    }
}

function del(index) {
    if (index >= 0 && index < data.length) {
        data.splice(index, 1);
        data = mergeSort(data);
    }
}
