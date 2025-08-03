class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.previous = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    isEmpty() {
        return this.length === 0;
    }

    print() {
        let arr = [];
        let start = this.head;
        while (start) {
            arr.push(start.value);
            start = start.next;
        };
        return arr
    }

    printReverse() {
        let arr = [];
        let end = this.tail;
        while (end) {
            arr.push(end.value);
            end = end.previous
        }
        return arr;
    }

    debugPrint() {
        let arr = [];
        let start = this.head;
        while (start) {
            arr.push({
                value: start.value,
                next: start.next?.value || null,
                previous: start.previous?.value || null
            })
            start = start.next;
        };
        return arr
    }

    push(value) {
        const newNode = new Node(value)
        if (this.isEmpty()) {
            this.tail = newNode;
            this.head = newNode;
        } else {
            this.tail.next = newNode;
            newNode.previous = this.tail;
            this.tail = newNode;
        }
        this.length++
        return this;
    }

    pop() {
        if (this.isEmpty()) return null;
        if (this.length === 1) {
            const removed = this.head;
            this.head = null;
            this.tail = null;
            this.length--;
            return removed.value;
        };
        let removed = this.tail;
        this.tail = removed.previous;
        this.tail.next = null;
        removed.previous = null;
        this.length--
        return removed.value;
    }

    shift() {
        if (this.isEmpty()) return null;
        let shiftedNode = this.head;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = shiftedNode.next;
            this.head.previous = null;
            shiftedNode.next = null
        }
        this.length--;
        return shiftedNode.value;
    }

    unshift(value) {
        const newNode = new Node(value);
        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.head.previous = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this
    }

    getNode(index) {
        if (index < 0 || index >= this.length) return -1;

        if (index <= Math.floor(this.length / 2)) {
            let start = this.head;
            let tracker = 0;
            while (tracker !== index) {
                start = start.next;
                tracker++;
            }
            return start;
        } else {
            let end = this.tail;
            let tracker = this.length - 1;
            while (tracker !== index) {
                end = end.previous;
                tracker--
            }
            return end
        }
    };

    get(index) {
        const node = this.getNode(index);
        return node === -1 ? -1 : node.value
    }

    set(index, value) {
        let node = this.getNode(index);
        if (node === -1) return false;
        node.value = value;
        return true;
    }

    insert(index, value) {
        if (index === 0) {
            this.unshift(value);
            return this;
        } else if (index === this.length) {
            this.push(value);
            return this;
        }
        const newNode = new Node(value);
        let currentNode = this.getNode(index);
        if (currentNode === -1) return false;
        let previouseNode = currentNode.previous;

        previouseNode.next = newNode;
        newNode.previous = previouseNode;
        newNode.next = currentNode;
        currentNode.previous = newNode;
        this.length++

        return this;
    }

    remove(index) {
        if (index === 0) {
            return !!this.shift();
        } else if (index === this.length - 1) {
            return !!this.pop();
        }
        const removed = this.getNode(index);
        if (removed === -1) return false;
        let prevNode = removed.previous;
        let nextNode = removed.next;

        prevNode.next = nextNode;
        nextNode.previous = prevNode;

        removed.next = null;
        removed.previous = null;
        this.length--;
        return true;
    }

    findIndex(callback) {
        let start = this.head;
        let tracker = 0;
        while (start) {
            if (callback(start.value)) {
                return tracker;
            }
            start = start.next;
            tracker++;
        }
        return -1
    }
}


const list = new DoublyLinkedList();
