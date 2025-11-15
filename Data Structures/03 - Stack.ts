class StackNode<T> {
    public value: T;
    public next: StackNode<T> | null;

    constructor(v: T) {
        this.value = v;
        this.next = null
    }
}



export class Stack<T> {
    private top: StackNode<T> | null;
    private bottom: StackNode<T> | null;
    public size: number

    constructor() {
        this.top = null;
        this.bottom = null;
        this.size = 0
    }

    private get isEmpty() {
        return this.size === 0
    }

    public toArray() {
        let arr = [];
        let start = this.top
        while (start) {
            arr.push(start.value);
            start = start.next;
        }
        return arr
    }

    public push(value: T) {
        const newNode = new StackNode<T>(value)
        if (this.isEmpty) {
            this.top = newNode;
            this.bottom = newNode
        } else {
            let currentTop = this.top!
            this.top = newNode
            this.top.next = currentTop
        }
        this.size++
        return this
    }


    public pop() {
        let popped: T;
        if (this.isEmpty) return null
        if (this.size === 1) {
            popped = this.top!.value;
            this.top = null;
            this.bottom = null;
        } else {
            let currentTop = this.top!
            this.top = currentTop.next
            popped = currentTop.value
        }
        this.size--
        return popped
    }

    public peek() {
        return this.top?.value
    }

}