class QueueNode<G> {
    public value: G;
    public next: QueueNode<G> | null
    constructor(v: G) {
        this.value = v;
        this.next = null;
    }
}

export class Queue<T> {
    private first: QueueNode<T> | null
    private last: QueueNode<T> | null
    public size: number

    constructor() {
        this.first = null
        this.last = null
        this.size = 0
    }

    private get isEmpty() {
        return this.size === 0
    }

    public toArray() {
        let arr: T[] = []
        let start = this.first
        while (start) {
            arr.push(start.value)
            start = start.next
        }
        return arr
    }

    public enqueue(v: T) {
        const newNode = new QueueNode<T>(v)
        if (this.isEmpty) {
            this.first = newNode
            this.last = newNode
        } else if (this.size === 1 && this.first && this.last) {
            this.first.next = newNode
            this.last = newNode
        } else {
            this.last!.next = newNode
            this.last = newNode
        }
        this.size++
        return this
    }

    public dequeue() {
        let popped: T;
        if (this.isEmpty) return null
        if (this.size === 1) {
            popped = this.first!.value
            this.first = null
            this.last = null
        } else {
            popped = this.first!.value
            this.first = this.first!.next
        }
        this.size--
        return popped
    }

    public getFront() {
        if (this.isEmpty) return null
        return this.first!.value
    }

    public getBack() {
        if (this.isEmpty) return null
        return this.last!.value
    }
}