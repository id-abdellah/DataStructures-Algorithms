import { describe, it, expect, beforeEach } from 'vitest';
import { PriorityQueue } from '../Data Structures/09 - Priority Queue.ts';

describe('PriorityQueue', () => {
    let pq: PriorityQueue;

    beforeEach(() => {
        pq = new PriorityQueue();
    });

    it('enqueues elements correctly', () => {
        pq.enqueue('A', 5).enqueue('B', 3).enqueue('C', 8);
        expect(pq.print()).toContain('B, 3');
        expect(pq.print()).toContain('A, 5');
        expect(pq.print()).toContain('C, 8');
        expect(pq.length).toBe(3);
    });

    it('dequeues elements in correct priority order', () => {
        pq.enqueue('A', 5).enqueue('B', 3).enqueue('C', 8).enqueue('D', 1);
        const out = [pq.dequeue(), pq.dequeue(), pq.dequeue(), pq.dequeue()];
        expect(out.map(n => n?.value)).toEqual(['D', 'B', 'A', 'C']);
    });

    it('handles empty dequeue', () => {
        expect(pq.dequeue()).toBeUndefined();
    });

    it('handles single element enqueue/dequeue', () => {
        pq.enqueue('X', 10);
        expect(pq.dequeue()?.value).toBe('X');
        expect(pq.length).toBe(0);
    });

    it('preserves correct state after mixed enqueue/dequeue', () => {
        pq.enqueue('A', 2).enqueue('B', 4).enqueue('C', 1);
        expect(pq.dequeue()?.value).toBe('C');
        pq.enqueue('D', 0);
        expect(pq.dequeue()?.value).toBe('D');
        expect(pq.dequeue()?.value).toBe('A');
        expect(pq.dequeue()?.value).toBe('B');
        expect(pq.length).toBe(0);
    });

    it('handles duplicate priorities', () => {
        pq.enqueue('A', 2).enqueue('B', 2).enqueue('C', 2);
        const out = [pq.dequeue(), pq.dequeue(), pq.dequeue()];
        const values = out.map(n => n?.value);
        expect(values.sort()).toEqual(['A', 'B', 'C'].sort());
    });
});
