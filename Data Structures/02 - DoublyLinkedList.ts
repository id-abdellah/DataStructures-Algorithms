class ListNode<T> {
    public next: ListNode<T> | null;
    public previous: ListNode<T> | null;
    public value: T;
    constructor(v: T) {
        this.value = v;
        this.next = null;
        this.previous = null
    }
}


export class DoublyLinkedList<T> {
    public head: ListNode<T> | null;
    public tail: ListNode<T> | null;
    public size: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    public isEmpty(): boolean {
        return this.size === 0
    }

    public toArray(reversed?: boolean): T[] {
        let arr: T[] = [];
        let curr = reversed ? this.tail : this.head;
        while (curr) {
            arr.push(curr.value);
            curr = reversed ? curr.previous : curr.next;
        }
        return arr;
    }

    public push(value: T) {
        const node = new ListNode<T>(value);
        if (this.isEmpty()) {
            this.head = node;
            this.tail = node;
        } else if (this.size === 1) {
            this.tail = node;
            this.tail.previous = this.head;
            this.head!.next = this.tail
        } else {
            const oldTail = this.tail!;
            this.tail = node;
            oldTail.next = this.tail;
            this.tail.previous = oldTail
        }
        this.size++;
        return this
    }

    public unshift(value: T) {
        const node = new ListNode<T>(value);
        if (this.isEmpty()) {
            this.push(value);
            return this
        } else if (this.size === 1) {
            this.head = node;
            this.head.next = this.tail;
            this.tail!.previous = this.head;
        } else {
            const oldHead = this.head!;
            this.head = node;
            this.head.next = oldHead;
            oldHead.previous = this.head;
        }
        this.size++;
        return this
    }

    public pop(): T | undefined {
        if (this.isEmpty()) return undefined;
        let poppedValue: T;
        if (this.size === 1) {
            poppedValue = this.head!.value;
            this.head = null;
            this.tail = null;
        } else {
            if (!this.tail) return undefined;
            poppedValue = this.tail.value;
            this.tail = this.tail.previous;
            this.tail!.next = null;
        }
        this.size--;
        return poppedValue;
    }

    public shift(): T | undefined {
        if (this.isEmpty()) return undefined;
        let shiftedValue: T;
        if (this.size === 1) {
            return this.pop();
        } else {
            if (!this.head) return undefined;
            shiftedValue = this.head.value;
            this.head = this.head.next
            this.head!.previous = null;
        }
        this.size--;
        return shiftedValue
    }

    public get(index: number, node?: boolean): T | ListNode<T> | undefined {
        if (index < 0 || index >= this.size) return undefined;
        let i = 0;
        let curr = this.head;
        while (curr) {
            if (i === index) {
                return node ? curr : curr.value;
            }
            curr = curr.next;
            i++;
        }
        return undefined
    }

    public set(index: number, value: T) {
        if (index < 0 || index >= this.size) return undefined;
        let node = this.get(index, true) as ListNode<T>;
        node.value = value;
        return true
    }

    public insert(index: number, value: T) {
        if (index < 0 || index > this.size) return undefined;
        if (index === 0) {
            this.unshift(value)
            return this
        } else if (index === this.size) {
            this.push(value)
            return this
        }
        const newNode = new ListNode<T>(value)
        const replacedNode = this.get(index, true) as ListNode<T>
        if (!replacedNode) return undefined

        replacedNode.previous!.next = newNode;
        newNode.previous = replacedNode.previous;
        newNode.next = replacedNode;
        replacedNode.previous = newNode;

        this.size++;
        return this;
    }

    public remove(index: number) {
        if (this.isEmpty() || index < 0 || index >= this.size) return undefined;
        if (index === 0) {
            return this.shift()
        } else if (index === this.size - 1) {
            return this.pop()
        }
        const removedNode = this.get(index, true) as ListNode<T>;
        if (!removedNode) return undefined;
        removedNode.previous!.next = removedNode.next;
        removedNode.next!.previous = removedNode.previous;

        removedNode.next = null;
        removedNode.previous = null;

        this.size--;
        return removedNode.value
    }

    findIndex(callback: (v: T) => boolean) {
        let start = this.head;
        let i = 0
        while (start) {
            if (callback(start.value)) {
                return i
            }
            start = start.next
            i++
        }
        return undefined
    }

}


// const list = new DoublyLinkedList<number | number[]>();

// list.push(100)
// list.push(200)
// list.push(300)
// list.push([1, 2, 3, 4, 5])
// list.unshift(-100)
// list.unshift(-200)
// list.unshift(-300)


// console.log(
//     "\n\ntoArr", list.toArray(),
//     "\n",
//     // "\nreversed", list.toArray(true),
//     // "\n",
//     "\nsize", list.size
// )