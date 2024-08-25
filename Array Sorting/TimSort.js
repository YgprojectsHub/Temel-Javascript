
function timSort(arr) {
    return arr.sort((a, b) => a - b);
}

let data = [3, 6, 8, 10, 1, 2, 1];

function create(element) {
    data.push(element);
    data = timSort(data);
}

function read() {
    return data;
}

function update(index, newElement) {
    if (index >= 0 && index < data.length) {
        data[index] = newElement;
        data = timSort(data);
    }
}

function del(index) {
    if (index >= 0 && index < data.length) {
        data.splice(index, 1);
        data = timSort(data);
    }
}
