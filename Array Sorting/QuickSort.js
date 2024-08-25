function quickSort(arr) {
    if (arr.length <= 1) return arr;
    let pivot = arr[Math.floor(arr.length / 2)];
    let left = arr.filter(x => x < pivot);
    let right = arr.filter(x => x > pivot);
    return quickSort(left).concat(pivot, quickSort(right));
}

let data = [3, 6, 8, 10, 1, 2, 1];

console.log(quickSort(data))

function create(element) {
    data.push(element);
    data = quickSort(data);
}

function read() {
    return data;
}

function update(index, newElement) {
    if (index >= 0 && index < data.length) {
        data[index] = newElement;
        data = quickSort(data);
    }
}

function del(index) {
    if (index >= 0 && index < data.length) {
        data.splice(index, 1);
        data = quickSort(data);
    }
}
