class Node {
    constructor(point, axis) {
        this.point = point;
        this.axis = axis;
        this.left = null;
        this.right = null;
    }
}

class KDTree {
    constructor(k) {
        this.k = k;
        this.root = null;
    }

    insert(point, node = this.root, depth = 0) {
        if (node === null) {
            return new Node(point, depth % this.k);
        }

        const axis = depth % this.k;

        if (point[axis] < node.point[axis]) {
            node.left = this.insert(point, node.left, depth + 1);
        } else {
            node.right = this.insert(point, node.right, depth + 1);
        }

        return node;
    }

    search(point, node = this.root, depth = 0) {
        if (node === null) {
            return null;
        }

        if (this.pointsEqual(point, node.point)) {
            return node;
        }

        const axis = depth % this.k;

        if (point[axis] < node.point[axis]) {
            return this.search(point, node.left, depth + 1);
        } else {
            return this.search(point, node.right, depth + 1);
        }
    }

    pointsEqual(point1, point2) {
        for (let i = 0; i < this.k; i++) {
            if (point1[i] !== point2[i]) {
                return false;
            }
        }
        return true;
    }

    inOrderTraversal(node, result = []) {
        if (node !== null) {
            this.inOrderTraversal(node.left, result);
            result.push(node.point);
            this.inOrderTraversal(node.right, result);
        }
        return result;
    }

    printTree() {
        console.log(this.inOrderTraversal(this.root).map(point => `(${point.join(', ')})`).join(' '));
    }
}

const kdTree = new KDTree(2);

kdTree.root = kdTree.insert([3, 6]);
kdTree.root = kdTree.insert([17, 15]);
kdTree.root = kdTree.insert([13, 15]);
kdTree.root = kdTree.insert([6, 12]);
kdTree.root = kdTree.insert([9, 1]);
kdTree.root = kdTree.insert([2, 7]);
kdTree.root = kdTree.insert([10, 19]);

console.log("KD Ağacı (In-Order Traversal):");
kdTree.printTree(); 

let foundNode = kdTree.search([10, 19]);
console.log("[10, 19] bulundu:", foundNode !== null); 
