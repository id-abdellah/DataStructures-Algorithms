import { describe, it, expect, beforeEach } from 'vitest';
import { WeightedGraph, Edge } from '../Data Structures/12 - WeightedGraph.ts';

describe('WeightedGraph', () => {
    let graph: WeightedGraph;

    beforeEach(() => {
        graph = new WeightedGraph();
    });

    it('should add a vertex', () => {
        graph.addVertex('A');
        expect(graph.adjacencyList['A']).toEqual([]);
    });

    it('should not overwrite existing vertex', () => {
        graph.addVertex('A');
        graph.addVertex('A');
        expect(graph.adjacencyList['A']).toEqual([]);
    });

    it('should add an edge with weight', () => {
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addEdge('A', 'B', 5);
        expect(graph.adjacencyList['A']).toContainEqual(new Edge('B', 5));
        expect(graph.adjacencyList['B']).toContainEqual(new Edge('A', 5));
    });

    it('should throw error for non-existent vertex in addEdge', () => {
        graph.addVertex('A');
        expect(() => graph.addEdge('A', 'B', 5)).toThrow("B vertex doesn't exist");
    });

    it('should throw error for self-loop in addEdge', () => {
        graph.addVertex('A');
        expect(() => graph.addEdge('A', 'A', 5)).toThrow("Cannot add self-loop");
    });

    it('should not add duplicate edge', () => {
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addEdge('A', 'B', 5);
        graph.addEdge('A', 'B', 10);
        expect(graph.adjacencyList['A']).toHaveLength(1);
        expect(graph.adjacencyList['A'][0].weight).toBe(5);
    });

    it('should remove an edge', () => {
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addEdge('A', 'B', 5);
        graph.removeEdge('A', 'B');
        expect(graph.adjacencyList['A']).toEqual([]);
        expect(graph.adjacencyList['B']).toEqual([]);
    });

    it('should throw error for non-existent vertex in removeEdge', () => {
        graph.addVertex('A');
        expect(() => graph.removeEdge('A', 'B')).toThrow("B vertex doesn't exist");
    });

    it('should remove a vertex and its edges', () => {
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');
        graph.addEdge('A', 'B', 5);
        graph.addEdge('A', 'C', 3);
        graph.removeVertex('A');
        expect(graph.adjacencyList['A']).toBeUndefined();
        expect(graph.adjacencyList['B']).toEqual([]);
        expect(graph.adjacencyList['C']).toEqual([]);
    });

    it('should return false when removing non-existent vertex', () => {
        expect(graph.removeVertex('A')).toBe(false);
    });
});