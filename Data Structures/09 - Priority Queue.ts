
class PQNode {

    constructor(
        public value: string,
        public priority: number
    ) { }
}


export class PriorityQueue {
    public values: PQNode[];
    constructor() {
        this.values = [];
    }

    get length() {
        return this.values.length;
    }

    private parentIndex(childIndex: number) {
        return Math.floor((childIndex - 1) / 2)
    }

    private childIndex(parentIndex: number, which: "left" | "right" | "both") {
        let mapping = {
            "left": (2 * parentIndex) + 1,
            "right": (2 * parentIndex) + 2,
            "both": [(2 * parentIndex) + 1, (2 * parentIndex) + 2]
        }
        return mapping[which];
    }

    private swap(idx1: number, idx2: number) {
        [this.values[idx1], this.values[idx2]] = [this.values[idx2], this.values[idx1]];
    }

    private bubbleUp() {
        if (this.length <= 1) return;
        let index = this.length - 1;
        while (index > 0) {
            const parentIdx = this.parentIndex(index);
            if (this.values[parentIdx].priority <= this.values[index].priority) break;
            this.swap(index, parentIdx);
            index = parentIdx;
        }
    }

    private bubbleDown() {
        let index = 0;
        while (true) {
            let element = this.values[index];
            const leftIdx = this.childIndex(index, "left") as number;
            const rightIdx = this.childIndex(index, "right") as number;

            const left = leftIdx < this.length ? this.values[leftIdx].priority : +Infinity;
            const right = rightIdx < this.length ? this.values[rightIdx].priority : +Infinity;

            if (element.priority <= left && element.priority <= right) break;
            const minimum = left < right ? leftIdx : rightIdx;
            this.swap(index, minimum);
            index = minimum;
        }
    }

    enqueue(value: PQNode["value"], priority: PQNode["priority"]): this {
        const newNode = new PQNode(value, priority);
        this.values.push(newNode);
        this.bubbleUp();
        return this
    }

    dequeue() {
        if (this.length === 0) return undefined;
        if (this.length === 1) return this.values.pop();
        this.swap(0, this.length - 1);
        let min = this.values.pop();
        this.bubbleDown();
        return min
    }

    print() {
        return this.values.map((v) => `${v.value}, ${v.priority}`)
    }
}