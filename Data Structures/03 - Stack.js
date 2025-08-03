class StackNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}


class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    isEmpty() {
        return this.size === 0;
    }

    print() {
        let start = this.first;
        let arr = [];
        while (start) {
            arr.push(start.value);
            start = start.next;
        }
        return arr;
    }

    debugPrint() {
        let start = this.first;
        let arr = [];
        while (start) {
            arr.push({
                value: start.value,
                next: start.next?.value || null
            })
            start = start.next
        }
        return arr;
    }

    push(value) {
        let newStackNode = new StackNode(value);
        if (this.isEmpty()) {
            this.first = newStackNode;
            this.last = newStackNode;
        } else {
            let currentFirst = this.first;
            this.first = newStackNode;
            this.first.next = currentFirst;
        }
        this.size++;
        return this;
    }

    pop() {
        if (this.isEmpty()) return null;
        if (this.size === 1) {
            const poppedNode = this.first;
            this.first = null;
            this.last = null;
            this.size--;
            return poppedNode.value
        }
        let poppedNode = this.first;
        this.first = poppedNode.next;
        poppedNode.next = null;
        this.size--;
        return poppedNode.value;
    }

    peek() {
        return this.first?.value || null
    }
}