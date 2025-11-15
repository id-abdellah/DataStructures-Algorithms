import { describe, it, expect, beforeEach } from 'vitest';
import { Stack } from '../Data Structures/03 - Stack';

describe('Stack', () => {
    let stack: Stack<number>;

    beforeEach(() => {
        stack = new Stack<number>();
    });

    it('should initialize empty', () => {
        expect(stack.size).toBe(0);
        expect(stack.peek()).toBeUndefined();
        expect(stack.pop()).toBeNull();
        expect(stack.toArray()).toEqual([]);
    });

    it('should push and increase size', () => {
        stack.push(1);
        expect(stack.size).toBe(1);
        expect(stack.peek()).toBe(1);
        stack.push(2);
        expect(stack.size).toBe(2);
        expect(stack.peek()).toBe(2);
    });

    it('should pop and return top value', () => {
        stack.push(1);
        stack.push(2);
        expect(stack.pop()).toBe(2);
        expect(stack.size).toBe(1);
        expect(stack.peek()).toBe(1);
        expect(stack.pop()).toBe(1);
        expect(stack.size).toBe(0);
        expect(stack.pop()).toBeNull();
    });

    it('should maintain correct order in toArray', () => {
        stack.push(1);
        stack.push(2);
        stack.push(3);
        expect(stack.toArray()).toEqual([3, 2, 1]);
    });

    it('should handle single element correctly', () => {
        stack.push(1);
        expect(stack.peek()).toBe(1);
        expect(stack.pop()).toBe(1);
        expect(stack.size).toBe(0);
        expect(stack.peek()).toBeUndefined();
        expect(stack.toArray()).toEqual([]);
    });

    it('should handle multiple pushes and pops', () => {
        stack.push(1);
        stack.push(2);
        stack.pop();
        stack.push(3);
        expect(stack.peek()).toBe(3);
        expect(stack.size).toBe(2);
        expect(stack.toArray()).toEqual([3, 1]);
    });
});