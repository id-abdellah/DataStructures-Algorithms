// Undirected Unweighted Graph

export class Graph {
    public adjacencyList: Record<string, string[]>;
    constructor() {
        this.adjacencyList = {};
    }

    private checkVertexExistence(vertex: string) {
        return vertex in this.adjacencyList
    }

    addVertex(value: string) {
        if (!this.checkVertexExistence(value)) this.adjacencyList[value] = [];
        return true;
    }

    addEdge(v1: string, v2: string) {
        if (!this.checkVertexExistence(v1)) throw new Error(`${v1} doesn't exist`);
        if (!this.checkVertexExistence(v2)) throw new Error(`${v2} doesn't exist`);
        if (v1 === v2) throw new Error("Cannot add self-loop");
        if (!this.adjacencyList[v1].includes(v2)) this.adjacencyList[v1].push(v2);
        if (!this.adjacencyList[v2].includes(v1)) this.adjacencyList[v2].push(v1);
        return true;
    }

    removeEdge(v1: string, v2: string) {
        if (!this.checkVertexExistence(v1)) throw new Error(`${v1} doesn't exist`);
        if (!this.checkVertexExistence(v2)) throw new Error(`${v2} doesn't exist`);

        this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== v2);
        this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v !== v1);
        return true;
    }

    removeVertex(vertex: string) {
        if (!this.checkVertexExistence(vertex)) return false;
        while (this.adjacencyList[vertex].length) {
            const edge = this.adjacencyList[vertex].pop();
            if (!edge) break;
            this.removeEdge(vertex, edge)
        }
        delete this.adjacencyList[vertex];
        return true;
    }

    /**
     * Graph Traversal
     */


    DFSRecursive(vertex: string) {
        if (!this.checkVertexExistence(vertex)) throw new Error(`${vertex} vertex doesn't exist`);

        let result: string[] = [];
        let visited: Record<string, boolean> = {};

        const self = this;
        function DFS(v: string) {
            result.push(v);
            visited[v] = true;
            for (const neighbor of self.adjacencyList[v]) {
                if (neighbor in visited) continue;
                DFS(neighbor);
            }
        }
        DFS(vertex);
        return result;
    }

    DFSIterative(vertex: string) {
        if (!this.checkVertexExistence(vertex)) throw new Error(`${vertex} vertex doesn't exist`);

        let stack: string[] = [vertex];
        let result: string[] = [];
        let visited: Record<string, boolean> = {};

        visited[vertex] = true;

        while (stack.length) {
            const v = stack.pop()!;
            result.push(v);
            this.adjacencyList[v].forEach(neighbor => {
                if (!(neighbor in visited)) {
                    visited[neighbor] = true;
                    stack.push(neighbor)
                }
            })
        };

        return result
    }

    BFS(vertex: string) {
        if (!this.checkVertexExistence(vertex)) throw new Error(`${vertex} vertex doesn't exist`);

        let queue: string[] = [vertex];
        let result: string[] = [];
        let visited: Record<string, boolean> = {};
        visited[vertex] = true;

        while (queue.length) {
            const v = queue.shift()!;
            result.push(v);
            this.adjacencyList[v].forEach(neighbor => {
                if (!(neighbor in visited)) {
                    visited[neighbor] = true;
                    queue.push(neighbor)
                }
            })
        }

        return result;
    }
}


const g = new Graph();

// ["Alice", "Bob", "Charlie", "David", "Eve", "Obito"].forEach(name => g.addVertex(name));

// g.addEdge("Alice", "Bob");
// g.addEdge("Alice", "Charlie");
// g.addEdge("Bob", "David");
// g.addEdge("Charlie", "Eve");
// g.addEdge("David", "Eve");

// console.log(g.DFSRecursive("Alice"))

// console.log(g.BFS("Alice"))


// console.log(g.adjacencyList)