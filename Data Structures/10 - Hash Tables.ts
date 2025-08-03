
class HashTable {
    private keyMap: [string, any][][]
    constructor(size: number = 53) {
        this.keyMap = (new Array(size));
    }

    private hash(key: string): number {
        let total = 0;
        let prime = 31;
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            let char = key[i];
            let value = char.charCodeAt(0) - 96
            total = (total * prime + value) % this.keyMap.length;
        }
        return Math.abs(total);
    }


    set<T>(key: string, value: T): boolean {
        const index: number = this.hash(key);
        const pair: [string, T] = [key, value];
        const isCollision = !!this.keyMap[index];

        if (!isCollision) {
            this.keyMap[index] = [];
        }

        const bucket = this.keyMap[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1)
                break;
            }
        }

        bucket.push(pair);

        return true;
    }


    get(key: string) {
        let index = this.hash(key);
        let bucket = this.keyMap[index];
        if (!bucket) return undefined;

        for (const [k, v] of bucket) {
            if (k === key) return v
        }

        return undefined;
    }

    delete(key: string) {
        let index: number = this.hash(key);
        let bucket = this.keyMap[index];

        if (!bucket) return false;

        for (let i = 0; i < bucket.length; i++) {
            const [k, v] = bucket[i];
            if (k === key) {
                bucket.splice(i, 1);
                return v;
            }
        }

        return false;
    }

    keys(): string[] {
        let keysArr: string[] = [];
        for (let i = 0; i < this.keyMap.length; i++) {
            if (!this.keyMap[i]) continue;
            for (const [k, v] of this.keyMap[i]) {
                keysArr.push(k)
            }
        }
        return keysArr
    }

    values(): any[] {
        let valuesArr: any[] = [];
        for (let i = 0; i < this.keyMap.length; i++) {
            if (!this.keyMap[i]) continue;
            for (const [k, v] of this.keyMap[i]) {
                valuesArr.push(v)
            }
        }
        return valuesArr
    }

    entries(): any[] {
        let entriesArr: any[] = [];
        for (let i = 0; i < this.keyMap.length; i++) {
            if (!this.keyMap[i]) continue;
            for (const [k, v] of this.keyMap[i]) {
                entriesArr.push([k, v])
            }
        }
        return entriesArr
    }

    print() {
        console.log(this.keyMap)
    }
}

const hashTable = new HashTable()