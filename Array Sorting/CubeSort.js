function cubeSort(arr) {
    arr.sort((a, b) => (a[0] + a[1] + a[2]) - (b[0] + b[1] + b[2]));
    return arr;
}

let data = [[3, 2, 1], [6, 5, 4], [8, 7, 6]];

function create(vector) {
    data.push(vector);
    data = cubeSort(data);
}

function read() {
    return data;
}

function update(index, newVector) {
    if (index >= 0 && index < data.length) {
        data[index] = newVector;
        data = cubeSort(data);
    }
}

function del(index) {
    if (index >= 0 && index < data.length) {
        data.splice(index, 1);
        data = cubeSort(data);
    }
}
