function bucketSort(arr, bucketSize = 5) {
    if (arr.length === 0) return arr;

    let i,
        minValue = arr[0],
        maxValue = arr[0];

    arr.forEach(value => {
        if (value < minValue) minValue = value;
        else if (value > maxValue) maxValue = value;
    });

    let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    let buckets = new Array(bucketCount);

    for (i = 0; i < buckets.length; i++) {
        buckets[i] = [];
    }

    arr.forEach(value => {
        buckets[Math.floor((value - minValue) / bucketSize)].push(value);
    });

    arr.length = 0;

    buckets.forEach(bucket => {
        insertionSort(bucket);
        bucket.forEach(element => {
            arr.push(element);
        });
    });

    return arr;
}

let data = [3, 6, 8, 10, 1, 2, 1];

console.log(bucketSort(data))

function create(element) {
    data.push(element);
    data = bucketSort(data);
}

function read() {
    return data;
}

function update(index, newElement) {
    if (index >= 0 && index < data.length) {
        data[index] = newElement;
        data = bucketSort(data);
    }
}

function del(index) {
    if (index >= 0 && index < data.length) {
        data.splice(index, 1);
        data = bucketSort(data);
    }
}
