class QueueNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

export class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    isEmpty() {
        return this.size === 0
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

    get peek() {
        return this.first?.value || null
    }

    enqueue(value) {
        const newQueueNode = new QueueNode(value);
        if (this.isEmpty()) {
            this.first = newQueueNode;
            this.last = newQueueNode;
        } else if (this.size === 1) {
            this.first.next = newQueueNode;
            this.last = newQueueNode;
        } else {
            this.last.next = newQueueNode;
            this.last = newQueueNode;
        }
        this.size++;
        return this;
    };

    dequeue() {
        if (this.isEmpty()) return null;
        if (this.size === 1) {
            let removed = this.first;
            this.first = null;
            this.last = null;
            this.size--;
            return removed.value;
        };
        let removed = this.first;
        this.first = removed.next;
        removed.next = null;
        this.size--;
        return removed.value
    }
}