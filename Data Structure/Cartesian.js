class Node {
    constructor(value, priority) {
        this.value = value;
        this.priority = priority;
        this.left = null;
        this.right = null;
    }
}

class CartesianTree {
    constructor() {
        this.root = null;
    }

    insert(value, priority) {
        const newNode = new Node(value, priority);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.root = this._insert(this.root, newNode);
        }
    }

    _insert(root, newNode) {
        if (root === null) {
            return newNode;
        }

        if (newNode.value < root.value) {
            root.left = this._insert(root.left, newNode);
            if (root.left && root.left.priority > root.priority) {
                root = this._rotateRight(root);
            }
        } else {
            root.right = this._insert(root.right, newNode);
            if (root.right && root.right.priority > root.priority) {
                root = this._rotateLeft(root);
            }
        }

        return root;
    }

    _rotateRight(y) {
        const x = y.left;
        y.left = x.right;
        x.right = y;
        return x;
    }

    _rotateLeft(x) {
        const y = x.right;
        x.right = y.left;
        y.left = x;
        return y;
    }

    inOrder(node) {
        if (node !== null) {
            this.inOrder(node.left);
            console.log(`Value: ${node.value}, Priority: ${node.priority}`);
            this.inOrder(node.right);
        }
    }

    search(value) {
        return this._search(this.root, value);
    }

    _search(node, value) {
        if (node === null || node.value === value) {
            return node;
        }

        if (value < node.value) {
            return this._search(node.left, value);
        } else {
            return this._search(node.right, value);
        }
    }

    delete(value) {
        this.root = this._delete(this.root, value);
    }

    _delete(node, value) {
        if (node === null) {
            return node;
        }

        if (value < node.value) {
            node.left = this._delete(node.left, value);
        } else if (value > node.value) {
            node.right = this._delete(node.right, value);
        } else {
            if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            }

            if (node.left.priority < node.right.priority) {
                node = this._rotateLeft(node);
                node.left = this._delete(node.left, value);
            } else {
                node = this._rotateRight(node);
                node.right = this._delete(node.right, value);
            }
        }

        return node;
    }
}

const cartesianTree = new CartesianTree();

cartesianTree.insert(10, 20);
cartesianTree.insert(5, 30);
cartesianTree.insert(15, 25);
cartesianTree.insert(3, 35);
cartesianTree.insert(7, 40);

console.log("Kartezyen Ağaç:");
cartesianTree.inOrder(cartesianTree.root); 

let searchResult = cartesianTree.search(15);
console.log("15 bulundu:", searchResult !== null); 

cartesianTree.delete(15);
console.log("15 silindi.");
cartesianTree.inOrder(cartesianTree.root);
