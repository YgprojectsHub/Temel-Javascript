function heapify(arr, length, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < length && arr[left] > arr[largest]) largest = left;
    if (right < length && arr[right] > arr[largest]) largest = right;

    if (largest != i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, length, largest);
    }
}

function heapSort(arr) {
    let length = arr.length;
    for (let i = Math.floor(length / 2) - 1; i >= 0; i--) heapify(arr, length, i);
    for (let i = length - 1; i >= 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
    return arr;
}

let data = [3, 6, 8, 10, 1, 2, 1];

function create(element) {
    data.push(element);
    data = heapSort(data);
}

function read() {
    return data;
}

function update(index, newElement) {
    if (index >= 0 && index < data.length) {
        data[index] = newElement;
        data = heapSort(data);
    }
}

function del(index) {
    if (index >= 0 && index < data.length) {
        data.splice(index, 1);
        data = heapSort(data);
    }
}
