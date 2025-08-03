import { describe, it, expect, beforeEach } from 'vitest';
import { MaxBinaryHeap } from '../Data Structures/08 - Binary Heaps.ts';

describe('MaxBinaryHeap', () => {
    let heap: MaxBinaryHeap;

    beforeEach(() => {
        heap = new MaxBinaryHeap();
    });

    it('should initialize with an empty array', () => {
        expect(heap.values).toEqual([]);
        expect(heap.length).toBe(0);
    });

    it('should insert a single value correctly', () => {
        heap.insert(42);
        expect(heap.values).toEqual([42]);
        expect(heap.length).toBe(1);
    });

    it('should maintain max-heap property after multiple insertions', () => {
        heap.insert(41).insert(39).insert(33).insert(18).insert(27).insert(12).insert(55);
        expect(heap.values).toEqual([55, 39, 41, 18, 27, 12, 33]);
        expect(heap.length).toBe(7);
    });

    it('should handle duplicate values correctly', () => {
        heap.insert(10).insert(10).insert(10);
        expect(heap.values).toEqual([10, 10, 10]);
        expect(heap.length).toBe(3);
    });

    it('should handle negative numbers correctly', () => {
        heap.insert(-1).insert(-2).insert(-10).insert(-4)
        expect(heap.values).toEqual([-1, -2, -10, -4])
        expect(heap.extractMax()).toBe(-1)
        expect(heap.values).toEqual([-2, -4, -10])
        heap.insert(0);
        expect(heap.values).toEqual([0, -2, -10, -4])
        expect(heap.extractMax()).toBe(0)
        expect(heap.values).toEqual([-2, -4, -10])
        expect(heap.extractMax()).toBe(-2)
        expect(heap.values).toEqual([-4, -10])
        expect(heap.extractMax()).toBe(-4)
        expect(heap.values).toEqual([-10])
        expect(heap.extractMax()).toBe(-10)
        expect(heap.values).toEqual([])
    });

    it('should return undefined when extracting from an empty heap', () => {
        expect(heap.extractMax()).toBeUndefined();
        expect(heap.values).toEqual([]);
        expect(heap.length).toBe(0);
    });

    it('should extract the maximum value from a single-element heap', () => {
        heap.insert(42);
        expect(heap.extractMax()).toBe(42);
        expect(heap.values).toEqual([]);
        expect(heap.length).toBe(0);
    });

    it('should extract the maximum value and maintain max-heap property', () => {
        heap.insert(41).insert(39).insert(33).insert(18).insert(27).insert(12).insert(55);
        expect(heap.extractMax()).toBe(55);
        expect(heap.values).toEqual([41, 39, 33, 18, 27, 12]);
        expect(heap.length).toBe(6);
        expect(heap.extractMax()).toBe(41);
        expect(heap.values).toEqual([39, 27, 33, 18, 12]);
        expect(heap.length).toBe(5);
    });

    it('should handle repeated extractions until empty', () => {
        heap.insert(10).insert(20).insert(30);
        expect(heap.extractMax()).toBe(30);
        expect(heap.extractMax()).toBe(20);
        expect(heap.extractMax()).toBe(10);
        expect(heap.extractMax()).toBeUndefined();
        expect(heap.values).toEqual([]);
        expect(heap.length).toBe(0);
    });

    it('should maintain max-heap property after inserting and extracting', () => {
        heap.insert(50).insert(30).insert(40).insert(20);
        expect(heap.extractMax()).toBe(50)
        expect(heap.values).toEqual([40, 30, 20])
        heap.insert(60)
        expect(heap.values).toEqual([60, 40, 20, 30])
        expect(heap.extractMax()).toBe(60)
        expect(heap.extractMax()).toBe(40)
        expect(heap.values).toEqual([30, 20])
    });

    it('should chain insert operations', () => {
        heap.insert(10).insert(20).insert(30);
        expect(heap.values).toEqual([30, 10, 20]);
        expect(heap.length).toBe(3);
    });
});