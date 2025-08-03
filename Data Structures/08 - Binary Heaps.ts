

export class MaxBinaryHeap {
    public values: number[];

    constructor() {
        this.values = [];
    }

    public get length() {
        return this.values.length
    }

    private parentIndex(childIndex: number) {
        return Math.floor((childIndex - 1) / 2)
    }

    private getChildIndex(parentIndex: number, which: "left" | "right" | "both") {
        let mapping = {
            "left": (2 * parentIndex) + 1,
            "right": (2 * parentIndex) + 2,
            "both": [(2 * parentIndex) + 1, (2 * parentIndex) + 2]
        }
        return mapping[which];
    }

    private swap(idx1: number, idx2: number) {
        [this.values[idx1], this.values[idx2]] = [this.values[idx2], this.values[idx1]]
    }

    private bubbleUp() {
        if (this.length <= 1) return;

        let index = this.length - 1;
        while (index > 0) {
            const parentIndex = this.parentIndex(index);
            if (this.values[index] <= this.values[parentIndex]) break;
            this.swap(index, parentIndex);
            index = parentIndex;
        }
    }

    private bubbleDown() {
        let index = 0;
        let element = this.values[index]
        while (true) {
            const leftIdx = this.getChildIndex(index, "left") as number;
            const rightIdx = this.getChildIndex(index, "right") as number;

            let left = leftIdx < this.length ? this.values[leftIdx] : -Infinity;
            let right = rightIdx < this.length ? this.values[rightIdx] : -Infinity;

            if (element >= left && element >= right) break;

            const largerIdx = left > right ? leftIdx : rightIdx;
            this.swap(index, largerIdx);
            index = largerIdx;
        }
    }

    public insert(value: number) {
        this.values.push(value);
        this.bubbleUp();
        return this
    }

    public extractMax() {
        if (this.length === 0) return undefined;
        if (this.length === 1) return this.values.pop();
        this.swap(0, this.length - 1);
        let max = this.values.pop();
        this.bubbleDown();
        return max
    }

}


const heap = new MaxBinaryHeap();