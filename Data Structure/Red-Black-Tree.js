class Node {
    constructor(data, color = 'red') {
        this.data = data;
        this.color = color;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

class RedBlackTree {
    constructor() {
        this.TNULL = new Node(null, 'black');
        this.root = this.TNULL;
    }

    rotateLeft(x) {
        let y = x.right;
        x.right = y.left;
        if (y.left !== this.TNULL) {
            y.left.parent = x;
        }
        y.parent = x.parent;
        if (x.parent === null) {
            this.root = y;
        } else if (x === x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }
        y.left = x;
        x.parent = y;
    }

    rotateRight(x) {
        let y = x.left;
        x.left = y.right;
        if (y.right !== this.TNULL) {
            y.right.parent = x;
        }
        y.parent = x.parent;
        if (x.parent === null) {
            this.root = y;
        } else if (x === x.parent.right) {
            x.parent.right = y;
        } else {
            x.parent.left = y;
        }
        y.right = x;
        x.parent = y;
    }

    insert(key) {
        let node = new Node(key);
        node.parent = null;
        node.data = key;
        node.left = this.TNULL;
        node.right = this.TNULL;
        node.color = 'red';

        let y = null;
        let x = this.root;

        while (x !== this.TNULL) {
            y = x;
            if (node.data < x.data) {
                x = x.left;
            } else {
                x = x.right;
            }
        }

        node.parent = y;
        if (y === null) {
            this.root = node;
        } else if (node.data < y.data) {
            y.left = node;
        } else {
            y.right = node;
        }

        if (node.parent === null) {
            node.color = 'black';
            return;
        }

        if (node.parent.parent === null) {
            return;
        }

        this.fixInsert(node);
    }

    fixInsert(k) {
        while (k.parent.color === 'red') {
            if (k.parent === k.parent.parent.right) {
                let u = k.parent.parent.left;
                if (u.color === 'red') {
                    u.color = 'black';
                    k.parent.color = 'black';
                    k.parent.parent.color = 'red';
                    k = k.parent.parent;
                } else {
                    if (k === k.parent.left) {
                        k = k.parent;
                        this.rotateRight(k);
                    }
                    k.parent.color = 'black';
                    k.parent.parent.color = 'red';
                    this.rotateLeft(k.parent.parent);
                }
            } else {
                let u = k.parent.parent.right;
                if (u.color === 'red') {
                    u.color = 'black';
                    k.parent.color = 'black';
                    k.parent.parent.color = 'red';
                    k = k.parent.parent;
                } else {
                    if (k === k.parent.right) {
                        k = k.parent;
                        this.rotateLeft(k);
                    }
                    k.parent.color = 'black';
                    k.parent.parent.color = 'red';
                    this.rotateRight(k.parent.parent);
                }
            }
            if (k === this.root) {
                break;
            }
        }
        this.root.color = 'black';
    }
    inOrderHelper(node) {
        if (node !== this.TNULL) {
            this.inOrderHelper(node.left);
            console.log(node.data);
            this.inOrderHelper(node.right);
        }
    }

    printTree() {
        this.inOrderHelper(this.root);
    }

    searchTreeHelper(node, key) {
        if (node === this.TNULL || key === node.data) {
            return node;
        }

        if (key < node.data) {
            return this.searchTreeHelper(node.left, key);
        }
        return this.searchTreeHelper(node.right, key);
    }

    searchTree(key) {
        return this.searchTreeHelper(this.root, key);
    }
}

const tree = new RedBlackTree();

tree.insert(8);
tree.insert(18);
tree.insert(5);
tree.insert(15);
tree.insert(17);
tree.insert(25);
tree.insert(40);
tree.insert(80);

console.log("Kırmızı-Siyah Ağaç (In-Order Traversal):");
tree.printTree();

let searchResult = tree.searchTree(15);
console.log("15 bulundu:", searchResult !== tree.TNULL);
