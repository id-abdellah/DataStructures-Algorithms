import { PriorityQueue } from "./09 - Priority Queue";

export class Edge {
    public node: string
    public weight: number
    constructor(node: string, weight: number) {
        this.node = node;
        this.weight = weight;
    }
}


export class WeightedGraph {
    public adjacencyList: Record<string, Edge[]>
    constructor() {
        this.adjacencyList = {}
    }

    private _checkVertexExists(v: string): boolean {
        return v in this.adjacencyList
    }

    private _checkEdgeExists(v: string, edgeNode: string) {
        return this.adjacencyList[v].some(edge => edge.node === edgeNode)
    }



    addVertex(v: string) {
        if (!this._checkVertexExists(v)) this.adjacencyList[v] = []
    }

    addEdge(v1: string, v2: string, weight: number) {
        if (!this._checkVertexExists(v1)) throw new Error(`${v1} vertex doesn't exist`);
        if (!this._checkVertexExists(v2)) throw new Error(`${v2} vertex doesn't exist`);
        if (v1 === v2) throw new Error("Cannot add self-loop");

        if (!this._checkEdgeExists(v1, v2)) this.adjacencyList[v1].push(new Edge(v2, weight));
        if (!this._checkEdgeExists(v2, v1)) this.adjacencyList[v2].push(new Edge(v1, weight));

        return true;
    }

    removeEdge(v1: string, v2: string) {
        if (!this._checkVertexExists(v1)) throw new Error(`${v1} vertex doesn't exist`);
        if (!this._checkVertexExists(v2)) throw new Error(`${v2} vertex doesn't exist`);

        this.adjacencyList[v1] = this.adjacencyList[v1].filter(edge => edge.node !== v2);
        this.adjacencyList[v2] = this.adjacencyList[v2].filter(edge => edge.node !== v1);
        return true;
    }

    removeVertex(v: string) {
        if (!this._checkVertexExists(v)) return false;
        while (this.adjacencyList[v].length) {
            const edge = this.adjacencyList[v].pop()!;
            this.removeEdge(v, edge.node);
        }
        delete this.adjacencyList[v];
        return true
    }



    dijkstra(start: string, end: string) {
        if (!this._checkVertexExists(start)) throw new Error(`${start} vertex doesn't exist`);
        if (!this._checkVertexExists(end)) throw new Error(`${end} vertex doesn't exist`);
        if (start === end) return { distance: 0, path: [] }


        const distances = new Map<string, number>();
        const previous = new Map<string, string | null>();
        const visited = new Set<string>();
        const priorityQueue = new PriorityQueue();

        for (const v in this.adjacencyList) {
            distances.set(v, v === start ? 0 : Infinity);
            previous.set(v, null);
            priorityQueue.enqueue(v, v === start ? 0 : Infinity)
        }

        while (priorityQueue.length) {
            const smallest = priorityQueue.dequeue()!.value

            if (visited.has(smallest)) continue;

            visited.add(smallest);

            if (smallest === end) {
                const path: string[] = [];
                let curr: string | null = end;
                while (curr) {
                    path.unshift(curr);
                    curr = previous.get(curr)!
                }
                return { distance: distances.get(end), path }
            }

            for (const neighbor of this.adjacencyList[smallest]) {
                const { node: edgeNode, weight: edgeWeight } = neighbor

                const distSum = distances.get(smallest)! + edgeWeight;

                if (distSum < distances.get(edgeNode)!) {
                    distances.set(edgeNode, distSum);
                    previous.set(edgeNode, smallest);
                    priorityQueue.enqueue(edgeNode, distSum)
                }
            }

        }

        return { distance: Infinity, path: [] }
    }
}