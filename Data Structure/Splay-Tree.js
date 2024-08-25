class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

class SplayTree {
    constructor() {
        this.root = null;
    }

    rightRotate(x) {
        let y = x.left;
        x.left = y.right;
        y.right = x;
        return y;
    }

    leftRotate(x) {
        let y = x.right;
        x.right = y.left;
        y.left = x;
        return y;
    }

    splay(root, key) {
        if (root === null || root.key === key) {
            return root;
        }

        if (root.key > key) {
            if (root.left === null) return root;

            if (root.left.key > key) {
                root.left.left = this.splay(root.left.left, key);
                root = this.rightRotate(root);
            } else if (root.left.key < key) {
                root.left.right = this.splay(root.left.right, key);
                if (root.left.right !== null) {
                    root.left = this.leftRotate(root.left);
                }
            }

            return (root.left === null) ? root : this.rightRotate(root);
        } else {
            if (root.right === null) return root;

            if (root.right.key > key) {
                root.right.left = this.splay(root.right.left, key);
                if (root.right.left !== null) {
                    root.right = this.rightRotate(root.right);
                }
            } else if (root.right.key < key) {
                root.right.right = this.splay(root.right.right, key);
                root = this.leftRotate(root);
            }

            return (root.right === null) ? root : this.leftRotate(root);
        }
    }

    insert(key) {
        if (this.root === null) {
            this.root = new Node(key);
            return;
        }

        this.root = this.splay(this.root, key);

        if (this.root.key === key) return;

        let newNode = new Node(key);

        if (this.root.key > key) {
            newNode.right = this.root;
            newNode.left = this.root.left;
            this.root.left = null;
        } else {
            newNode.left = this.root;
            newNode.right = this.root.right;
            this.root.right = null;
        }

        this.root = newNode;
    }

    search(key) {
        this.root = this.splay(this.root, key);
        return this.root !== null && this.root.key === key;
    }

    delete(key) {
        if (this.root === null) return;

        this.root = this.splay(this.root, key);

        if (this.root.key !== key) return;

        if (this.root.left === null) {
            this.root = this.root.right;
        } else {
            let temp = this.root.right;
            this.root = this.splay(this.root.left, key);
            this.root.right = temp;
        }
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

const splayTree = new SplayTree();

splayTree.insert(10);
splayTree.insert(20);
splayTree.insert(5);
splayTree.insert(15);
splayTree.insert(25);

console.log("Splay Tree (In-Order Traversal):");
splayTree.printTree();

let found = splayTree.search(15);
console.log("15 bulundu:", found); 

splayTree.delete(20);
console.log("20 silindi.");
splayTree.printTree();
