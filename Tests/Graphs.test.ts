import { describe, it, expect, beforeEach } from 'vitest';
import { Graph } from '../Data Structures/11 - Graphs.ts';

describe('Graph', () => {
    let graph: Graph;

    beforeEach(() => {
        graph = new Graph();
    });

    describe('addVertex', () => {
        it('should add a vertex successfully', () => {
            expect(graph.addVertex('A')).toBe(true);
            expect(graph.adjacencyList).toHaveProperty('A');
            expect(graph.adjacencyList['A']).toEqual([]);
        });

        it('should not overwrite existing vertex', () => {
            graph.addVertex('A');
            graph.adjacencyList['A'].push('B');
            expect(graph.addVertex('A')).toBe(true);
            expect(graph.adjacencyList['A']).toEqual(['B']);
        });
    });

    describe('addEdge', () => {
        it('should add an edge between two existing vertices', () => {
            graph.addVertex('A');
            graph.addVertex('B');
            expect(graph.addEdge('A', 'B')).toBe(true);
            expect(graph.adjacencyList['A']).toContain('B');
            expect(graph.adjacencyList['B']).toContain('A');
        });

        it('should throw an error if first vertex does not exist', () => {
            graph.addVertex('B');
            expect(() => graph.addEdge('A', 'B')).toThrow("A doesn't exist");
        });

        it('should throw an error if second vertex does not exist', () => {
            graph.addVertex('A');
            expect(() => graph.addEdge('A', 'B')).toThrow("B doesn't exist");
        });

        it('should throw an error if attempting to add a self-loop', () => {
            graph.addVertex('A');
            expect(() => graph.addEdge('A', 'A')).toThrow('Cannot add self-loop');
        });

        it('should not add duplicate edges', () => {
            graph.addVertex('A');
            graph.addVertex('B');
            graph.addEdge('A', 'B');
            graph.addEdge('A', 'B');
            expect(graph.adjacencyList['A']).toEqual(['B']);
            expect(graph.adjacencyList['B']).toEqual(['A']);
        });
    });

    describe('removeEdge', () => {
        it('should remove an edge between two vertices', () => {
            graph.addVertex('A');
            graph.addVertex('B');
            graph.addEdge('A', 'B');
            expect(graph.removeEdge('A', 'B')).toBe(true);
            expect(graph.adjacencyList['A']).not.toContain('B');
            expect(graph.adjacencyList['B']).not.toContain('A');
        });

        it('should throw an error if first vertex does not exist', () => {
            graph.addVertex('B');
            expect(() => graph.removeEdge('A', 'B')).toThrow("A doesn't exist");
        });

        it('should throw an error if second vertex does not exist', () => {
            graph.addVertex('A');
            expect(() => graph.removeEdge('A', 'B')).toThrow("B doesn't exist");
        });
    });

    describe('removeVertex', () => {
        it('should remove a vertex and its edges', () => {
            graph.addVertex('A');
            graph.addVertex('B');
            graph.addVertex('C');
            graph.addEdge('A', 'B');
            graph.addEdge('A', 'C');
            expect(graph.removeVertex('A')).toBe(true);
            expect(graph.adjacencyList).not.toHaveProperty('A');
            expect(graph.adjacencyList['B']).not.toContain('A');
            expect(graph.adjacencyList['C']).not.toContain('A');
        });

        it('should return false if vertex does not exist', () => {
            expect(graph.removeVertex('A')).toBe(false);
        });
    });

    describe('DFSRecursive', () => {
        it('should perform DFS traversal correctly', () => {
            graph.addVertex('A');
            graph.addVertex('B');
            graph.addVertex('C');
            graph.addVertex('D');
            graph.addEdge('A', 'B');
            graph.addEdge('A', 'C');
            graph.addEdge('B', 'D');
            graph.addEdge('C', 'D');
            expect(graph.DFSRecursive('A')).toEqual(['A', 'B', 'D', 'C']);
        });

        it('should throw an error if vertex does not exist', () => {
            expect(() => graph.DFSRecursive('A')).toThrow("A vertex doesn't exist");
        });
    });

    describe('DFSIterative', () => {
        it('should perform DFS traversal correctly', () => {
            graph.addVertex('A');
            graph.addVertex('B');
            graph.addVertex('C');
            graph.addVertex('D');
            graph.addEdge('A', 'B');
            graph.addEdge('A', 'C');
            graph.addEdge('B', 'D');
            graph.addEdge('C', 'D');
            expect(graph.DFSIterative('A')).toEqual(['A', 'C', 'D', 'B']);
        });

        it('should throw an error if vertex does not exist', () => {
            expect(() => graph.DFSIterative('A')).toThrow("A vertex doesn't exist");
        });
    });

    describe('BFS', () => {
        it('should perform BFS traversal correctly', () => {
            graph.addVertex('A');
            graph.addVertex('B');
            graph.addVertex('C');
            graph.addVertex('D');
            graph.addEdge('A', 'B');
            graph.addEdge('A', 'C');
            graph.addEdge('B', 'D');
            graph.addEdge('C', 'D');
            expect(graph.BFS('A')).toEqual(['A', 'B', 'C', 'D']);
        });

        it('should throw an error if vertex does not exist', () => {
            expect(() => graph.BFS('A')).toThrow("A vertex doesn't exist");
        });
    });
});