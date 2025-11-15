import { describe, it, expect, beforeEach } from 'vitest';
import { Queue } from '../Data Structures/04 - Queue';

describe('Queue', () => {
    let queue: Queue<number>;

    beforeEach(() => {
        queue = new Queue<number>();
    });

    it('should initialize empty queue', () => {
        expect(queue.toArray()).toEqual([]);
        expect(queue.size).toBe(0);
        expect(queue.getFront()).toBeNull();
        expect(queue.getBack()).toBeNull();
    });

    it('should enqueue single item', () => {
        queue.enqueue(1);
        expect(queue.size).toBe(1);
        expect(queue.getFront()).toBe(1);
        expect(queue.getBack()).toBe(1);
        expect(queue.toArray()).toEqual([1]);
    });

    it('should enqueue multiple items', () => {
        queue.enqueue(1).enqueue(2).enqueue(3);
        expect(queue.size).toBe(3);
        expect(queue.getFront()).toBe(1);
        expect(queue.getBack()).toBe(3);
        expect(queue.toArray()).toEqual([1, 2, 3]);
    });

    it('should dequeue from empty queue', () => {
        expect(queue.dequeue()).toBeNull();
    });

    it('should dequeue single item', () => {
        queue.enqueue(1);
        expect(queue.dequeue()).toBe(1);
        expect(queue.size).toBe(0);
        expect(queue.getFront()).toBeNull();
        expect(queue.getBack()).toBeNull();
    });

    it('should dequeue multiple items in order', () => {
        queue.enqueue(1).enqueue(2).enqueue(3);
        expect(queue.dequeue()).toBe(1);
        expect(queue.size).toBe(2);
        expect(queue.getFront()).toBe(2);
        expect(queue.dequeue()).toBe(2);
        expect(queue.size).toBe(1);
        expect(queue.getFront()).toBe(3);
        expect(queue.dequeue()).toBe(3);
        expect(queue.size).toBe(0);
    });

    it('should handle mixed enqueue and dequeue', () => {
        queue.enqueue(1).enqueue(2);
        expect(queue.dequeue()).toBe(1);
        queue.enqueue(3);
        expect(queue.getFront()).toBe(2);
        expect(queue.getBack()).toBe(3);
        expect(queue.toArray()).toEqual([2, 3]);
    });

    it('should work with strings', () => {
        const strQueue = new Queue<string>();
        strQueue.enqueue('a').enqueue('b');
        expect(strQueue.toArray()).toEqual(['a', 'b']);
        expect(strQueue.dequeue()).toBe('a');
        expect(strQueue.getFront()).toBe('b');
        expect(strQueue.getBack()).toBe('b');
    });
});