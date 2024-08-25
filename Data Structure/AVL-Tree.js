class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    height(node) {
        return node ? node.height : 0;
    }

    max(a, b) {
        return a > b ? a : b;
    }

    rightRotate(y) {
        let x = y.left;
        let T2 = x.right;

        x.right = y;
        y.left = T2;
        
        y.height = this.max(this.height(y.left), this.height(y.right)) + 1;
        x.height = this.max(this.height(x.left), this.height(x.right)) + 1;

        return x;
    }

    leftRotate(x) {
        let y = x.right;
        let T2 = y.left;

        y.left = x;
        x.right = T2;

        x.height = this.max(this.height(x.left), this.height(x.right)) + 1;
        y.height = this.max(this.height(y.left), this.height(y.right)) + 1;

        return y;
    }

    getBalance(node) {
        return node ? this.height(node.left) - this.height(node.right) : 0;
    }

    insert(node, key) {

        if (node === null) {
            return new Node(key);
        }

        if (key < node.key) {
            node.left = this.insert(node.left, key);
        } else if (key > node.key) {
            node.right = this.insert(node.right, key);
        } else {
            return node; 
        }

        node.height = this.max(this.height(node.left), this.height(node.right)) + 1;

        let balance = this.getBalance(node);

        if (balance > 1 && key < node.left.key) {
            return this.rightRotate(node);
        }

        if (balance < -1 && key > node.right.key) {
            return this.leftRotate(node);
        }

        if (balance > 1 && key > node.left.key) {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }

        if (balance < -1 && key < node.right.key) {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }

        return node;
    }

    search(node, key) {
        if (node === null || node.key === key) {
            return node;
        }

        if (key < node.key) {
            return this.search(node.left, key);
        }

        return this.search(node.right, key);
    }

    inOrderTraversal(node, result = []) {
        if (node !== null) {
            this.inOrderTraversal(node.left, result);
            result.push(node.key);
            this.inOrderTraversal(node.right, result);
        }
        return result;
    }

    printTree() {
        console.log(this.inOrderTraversal(this.root).join(' '));
    }
}

const avlTree = new AVLTree();

avlTree.root = avlTree.insert(avlTree.root, 10);
avlTree.root = avlTree.insert(avlTree.root, 20);
avlTree.root = avlTree.insert(avlTree.root, 5);
avlTree.root = avlTree.insert(avlTree.root, 6);
avlTree.root = avlTree.insert(avlTree.root, 15);
avlTree.root = avlTree.insert(avlTree.root, 30);
avlTree.root = avlTree.insert(avlTree.root, 25);

console.log("AVL Ağacı (In-Order Traversal):");
avlTree.printTree();

let foundNode = avlTree.search(avlTree.root, 15);
console.log("15 bulundu:", foundNode !== null);
