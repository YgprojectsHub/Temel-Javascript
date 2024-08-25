function countingSort(arr, min, max) {
    let i, z = 0, count = [];
    for (i = min; i <= max; i++) {
        count[i] = 0;
    }
    for (i=0; i < arr.length; i++) {
        count[arr[i]]++;
    }
    for (i = min; i <= max; i++) {
        while (count[i]-- > 0) {
            arr[z++] = i;
        }
    }
    return arr;
}

let data = [3, 6, 8, 10, 1, 2, 1];

function create(element) {
    data.push(element);
    let minValue = Math.min(...data);
    let maxValue = Math.max(...data);
    data = countingSort(data, minValue, maxValue);
}

function read() {
    return data;
}

function update(index, newElement) {
    if (index >= 0 && index < data.length) {
        data[index] = newElement;
        let minValue = Math.min(...data);
        let maxValue = Math.max(...data);
        data = countingSort(data, minValue, maxValue);
    }
}

function del(index) {
    if (index >= 0 && index < data.length) {
        data.splice(index, 1);
        let minValue = Math.min(...data);
        let maxValue = Math.max(...data);
        data = countingSort(data, minValue, maxValue);
    }
}
