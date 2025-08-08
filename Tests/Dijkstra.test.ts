import { describe, it, expect, beforeEach } from 'vitest';
import { WeightedGraph } from '../Data Structures/12 - WeightedGraph.ts';


describe('WeightedGraph - Dijkstra Algorithm', () => {
    let graph: WeightedGraph;

    beforeEach(() => {
        graph = new WeightedGraph();
    });

    it('should find shortest path in a simple graph', () => {
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');
        graph.addEdge('A', 'B', 4);
        graph.addEdge('A', 'C', 2);
        graph.addEdge('B', 'C', 1);

        const result = graph.dijkstra('A', 'B');
        expect(result.distance).toBe(3);
        expect(result.path).toEqual(['A', 'C', 'B']);
    });

    it('should handle same start and end vertex', () => {
        graph.addVertex('A');
        const result = graph.dijkstra('A', 'A');
        expect(result.distance).toBe(0);
        expect(result.path).toEqual([]);
    });

    it('should throw error for non-existent start vertex', () => {
        graph.addVertex('B');
        expect(() => graph.dijkstra('A', 'B')).toThrowError('A vertex doesn\'t exist');
    });

    it('should throw error for non-existent end vertex', () => {
        graph.addVertex('A');
        expect(() => graph.dijkstra('A', 'B')).toThrowError('B vertex doesn\'t exist');
    });

    it('should return infinity for disconnected vertices', () => {
        graph.addVertex('A');
        graph.addVertex('B');
        // No edges between A and B
        const result = graph.dijkstra('A', 'B');
        expect(result.distance).toBe(Infinity);
        expect(result.path).toEqual(["B"]);
    });

    it('should return infinity for disconnected vertices p2', () => {
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');
        graph.addVertex('D');
        graph.addVertex('E');
        // No edges between A and B
        const result = graph.dijkstra('A', 'D');
        expect(result.distance).toBe(Infinity);
        expect(result.path).toEqual(["D"]);
    });

    it('should find shortest path in a complex graph', () => {
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');
        graph.addVertex('D');
        graph.addVertex('E');
        graph.addEdge('A', 'B', 2);
        graph.addEdge('A', 'C', 4);
        graph.addEdge('B', 'C', 1);
        graph.addEdge('B', 'D', 4);
        graph.addEdge('C', 'D', 2);
        graph.addEdge('C', 'E', 3);
        graph.addEdge('D', 'E', 2);

        const result = graph.dijkstra('A', 'E');
        expect(result.distance).toBe(6);
        expect(result.path).toEqual(['A', 'B', 'C', 'E']);
    });

    it('should handle updating distances when finding shorter paths', () => {
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');
        graph.addVertex('D');
        graph.addEdge('A', 'B', 10);
        graph.addEdge('A', 'C', 3);
        graph.addEdge('C', 'B', 4);
        graph.addEdge('C', 'D', 2);
        graph.addEdge('B', 'D', 1);

        const result = graph.dijkstra('A', 'D');
        expect(result.distance).toBe(5);
        expect(result.path).toEqual(['A', 'C', 'D']);
    });
});