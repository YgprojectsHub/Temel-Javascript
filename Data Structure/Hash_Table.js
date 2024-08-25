let hashTable = new Map();

hashTable.set('key1', 'value1');
hashTable.set('key2', 'value2');

console.log(hashTable.get('key1'));

hashTable.set('key1', 'value3');
console.log(hashTable.get('key1')); 

hashTable.delete('key2');
console.log(hashTable.has('key2'));