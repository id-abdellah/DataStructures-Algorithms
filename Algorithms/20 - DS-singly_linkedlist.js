class Node {
    constructor(val) {
        this.value = val;
        this.next = null;
    }
}


class SinglyLinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
        this.tail = null;
    };

    isEmpty() {
        return this.length === 0;
    };

    print() {
        let arr = [];
        let current = this.head;
        while (current) {
            arr.push(current.value);
            current = current.next;
        }
        return arr
    }

    // O(1)
    push(value) {
        const newNode = new Node(value);
        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length += 1;
        return this;
    }

    // O(n)
    pop() {
        if (this.isEmpty()) return undefined;
        if (this.length === 1) {
            const temp = this.tail.value;
            this.tail = null;
            this.head = null;
            this.length--;
            return temp;
        }
        let prev = this.head;
        while (prev.next.next) {
            prev = prev.next;
        }
        const temp = this.tail.value;
        prev.next = null;
        this.tail = prev;
        this.length--;
        return temp;
    }

    // O(1)
    shift() {
        if (this.isEmpty()) return undefined;
        if (this.length === 1) {
            const temp = this.head.value;
            this.head = null;
            this.tail = null;
            this.length--;
            return temp;
        }
        let current = this.head.value;
        this.head = this.head.next;
        this.length--;
        return current;
    }

    // O(1)
    unshift(value) {
        const newNode = new Node(value);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    }

    // O(n)
    get(index, onlyValue) {
        if (this.isEmpty()) return undefined;
        if (isNaN(index)) throw new Error("Invalid index value");
        if (index >= this.length || index < 0) return null;
        let i = 0;
        let current = this.head;
        while (i < index) {
            current = current.next;
            i++;
        }
        return onlyValue ? current.value : current;
    }

    // O(n)
    set(index, value) {
        if (this.isEmpty()) return undefined;
        if (isNaN(index)) throw new Error("Invalid index value");
        if (index >= this.length || index < 0) return null;
        const foundNode = this.get(index);
        foundNode.value = value;
        return true;
    }

    // O(1) || O(2n)
    insert(index, value) {
        if (index > this.length || index < 0) return false;
        if (isNaN(index)) return false;
        if (index === this.length) {
            this.push(value);
            return true;
        }
        if (index === 0) {
            this.unshift(value);
            return true;
        };
        const newNode = new Node(value);

        let pre = this.get(index - 1);
        let aft = pre.next;

        newNode.next = aft;
        pre.next = newNode;
        this.length++;
        return true;
    }

    // O(1) || O(2n)
    remove(index) {
        if (isNaN(index)) return false;
        if (index >= this.length || index < 0) return false;
        if (index === this.length - 1) {
            this.pop();
            return true;
        };
        if (index === 0) {
            this.shift();
            return true;
        };

        let prevNode = this.get(index - 1);
        let removedNode = prevNode.next;
        prevNode.next = removedNode.next;
        this.length--;
        return true;
    }

    // O(n);
    reverse() {
        let node = this.head;
        this.head = this.tail;
        this.tail = node;

        let prev = null;
        let next = null;

        for (let i = 0; i < this.length; i++) {
            next = node.next;
            node.next = prev;
            prev = node;
            node = next;
        }

        return this
    }

    find(callback) {
        if (this.isEmpty()) return -1;
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
