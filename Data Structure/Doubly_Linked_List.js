class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
    }

    append(data) {
        let newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
            newNode.prev = current;
        }
    }

    printList() {
        let current = this.head;
        while (current) {
            console.log(current);
            current = current.next;
        }
    }
}

let list = new DoublyLinkedList();
list.append(1);
list.append(2);
list.printList();
