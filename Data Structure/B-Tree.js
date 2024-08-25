class BTreeNode {
    constructor(t, leaf = true) {
        this.t = t; 
        this.leaf = leaf; 
        this.keys = []; 
        this.children = []; 
    }
}

class BTree {
    constructor(t) {
        this.t = t;
        this.root = new BTreeNode(t); 
    }

    search(node, key) {
        let i = 0;
        while (i < node.keys.length && key > node.keys[i]) {
            i++;
        }

        if (i < node.keys.length && key === node.keys[i]) {
            return node;
        }

        if (node.leaf) {
            return null;
        } else {
            return this.search(node.children[i], key);
        }
    }

    insert(key) {
        let root = this.root;
        if (root.keys.length === 2 * this.t - 1) {
            let newRoot = new BTreeNode(this.t, false);
            newRoot.children[0] = root;
            this.splitChild(newRoot, 0, root);
            this.root = newRoot;
            this.insertNonFull(newRoot, key);
        } else {
            this.insertNonFull(root, key);
        }
    }

    insertNonFull(node, key) {
        let i = node.keys.length - 1;
        if (node.leaf) {
            while (i >= 0 && key < node.keys[i]) {
                node.keys[i + 1] = node.keys[i];
                i--;
            }
            node.keys[i + 1] = key;
        } else {
            while (i >= 0 && key < node.keys[i]) {
                i--;
            }
            i++;
            if (node.children[i].keys.length === 2 * this.t - 1) {
                this.splitChild(node, i, node.children[i]);
                if (key > node.keys[i]) {
                    i++;
                }
            }
            this.insertNonFull(node.children[i], key);
        }
    }

    splitChild(parent, i, fullChild) {
        let t = this.t;
        let newChild = new BTreeNode(t, fullChild.leaf);
        parent.children.splice(i + 1, 0, newChild);
        parent.keys.splice(i, 0, fullChild.keys[t - 1]);

        newChild.keys = fullChild.keys.splice(t, t - 1);
        if (!fullChild.leaf) {
            newChild.children = fullChild.children.splice(t, t);
        }
    }

    traverse(node, callback) {
        for (let i = 0; i < node.keys.length; i++) {
            if (!node.leaf) {
                this.traverse(node.children[i], callback);
            }
            callback(node.keys[i]);
        }
        if (!node.leaf) {
            this.traverse(node.children[node.keys.length], callback);
        }
    }
}

const bTree = new BTree(3);

bTree.insert(10);
bTree.insert(20);
bTree.insert(5);
bTree.insert(6);
bTree.insert(12);
bTree.insert(30);
bTree.insert(7);
bTree.insert(17);

console.log("B-Tree traversal:");
bTree.traverse(bTree.root, key => console.log(key));

let searchResult = bTree.search(bTree.root, 6);
console.log("6 bulundu:", searchResult !== null);
