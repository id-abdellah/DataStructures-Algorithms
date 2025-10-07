class ListNode<T> {
    public next: ListNode<T> | null;
    public value: T;
    constructor(value: T) {
        this.value = value
        this.next = null;
    }
}

export class SinglyLinkedList<T> {
    private size: number;
    private head: ListNode<T> | null;
    private tail: ListNode<T> | null;

    constructor() {
        this.size = 0;
        this.head = null;
        this.tail = null
    }

    private _isEmpty() {
        return this.size === 0;
    }

    public get length() {
        return this.size;
    }

    public toArray() {
        let arr: T[] = [];
        let curr = this.head;
        while (curr) {
            arr.push(curr.value);
            curr = curr.next;
        }
        return arr
    }



    public append(value: T) {
        const node = new ListNode<T>(value);
        if (this._isEmpty()) {
            this.head = node;
            this.tail = node;
        } else if (this.length === 1 && this.head) {
            this.head.next = node;
            this.tail = node;
        } else {
            this.tail!.next = node;
            this.tail = node
        }
        this.size++;
        return this;
    }

    public prepend(value: T) {
        if (this._isEmpty()) {
            this.append(value);
            return this;
        }
        const node = new ListNode<T>(value);
        node.next = this.head;
        this.head = node
        this.size++;
        return this;
    }

    public pop() {
        if (this._isEmpty()) return undefined;
        if (this.length === 1 && this.head) {
            let value = this.head.value;
            this.head = null;
            this.tail = null;
            this.size--;
            return value
        }
        let prev = this.get(this.length - 2, "node") as ListNode<T>;
        let value = this.tail?.value
        this.tail = prev
        prev.next = null;
        this.size--;
        return value;
    }

    public shift() {
        if (this._isEmpty() || !this.head) return undefined;
        if (this.length === 1) {
            let value = this.head.value;
            this.head = null;
            this.tail = null;
            this.size--;
            return value;
        }
        let temp = this.head.value;
        this.head = this.head.next;
        this.size--;
        return temp;
    }

    public get(index: number, which: "node" | "value") {
        if (this._isEmpty()) return undefined;
        if (index < 0 || index >= this.length) throw new Error("Invalid index");
        let i = 0;
        let curr = this.head;
        while (curr) {
            if (i === index) {
                return which === "node" ? curr : curr.value;
            }
            i++;
            curr = curr.next
        }
        return undefined;
    }

    public insertAt(index: number, value: T) {
        if (index < 0 || index > this.length) throw new Error("Invalid index");
        if (index === 0) {
            this.prepend(value);
            return this;
        } else if (index === this.length) {
            this.append(value);
            return this
        }

        const node = new ListNode(value);

        let previous = this.get(index - 1, "node") as ListNode<T>;
        let wanted = previous.next;

        previous.next = node;
        node.next = wanted;
        this.size++;
        return this
    }

    public removeAt(index: number) {
        if (index < 0 || index >= this.length) throw new Error("Invalid index");
        if (index === 0) {
            return this.shift();
        } else if (index === this.length - 1) {
            return this.pop();
        }
        let previous = this.get(index - 1, "node") as ListNode<T>;
        let wanted = previous.next!
        previous.next = wanted.next;
        this.size--;
        return wanted.value;
    }

    public clear() {
        this.head = null;
        this.tail = null;
        this.size = 0
    }

    public find(callback: (v: T) => boolean) {
        if (this._isEmpty()) return undefined;
        let curr = this.head;
        let i = 0;
        while (curr) {
            if (callback(curr.value)) {
                return i;
            }
            curr = curr.next;
            i++;
        }
        return undefined
    }

}