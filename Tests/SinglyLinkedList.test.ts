import { describe, it, expect, beforeEach } from 'vitest';
import { SinglyLinkedList } from "../Data Structures/01 - SinglyLinkedList.ts"

describe('SinglyLinkedList', () => {
    it('should initialize empty', () => {
        const list = new SinglyLinkedList<number>();
        expect(list.length).toBe(0);
        expect(list.toArray()).toEqual([]);
    });

    it('should append elements', () => {
        const list = new SinglyLinkedList<number>();
        list.append(1).append(2).append(3);
        expect(list.length).toBe(3);
        expect(list.toArray()).toEqual([1, 2, 3]);
    });

    it('should prepend elements', () => {
        const list = new SinglyLinkedList<number>();
        list.prepend(1).prepend(2).prepend(3);
        expect(list.length).toBe(3);
        expect(list.toArray()).toEqual([3, 2, 1]);
    });

    it('should pop elements', () => {
        const list = new SinglyLinkedList<number>();
        list.append(1).append(2).append(3);
        expect(list.pop()).toBe(3);
        expect(list.length).toBe(2);
        expect(list.toArray()).toEqual([1, 2]);
        expect(list.pop()).toBe(2);
        expect(list.pop()).toBe(1);
        expect(list.pop()).toBeUndefined();
        expect(list.length).toBe(0);
    });

    it('should shift elements', () => {
        const list = new SinglyLinkedList<number>();
        list.append(1).append(2).append(3);
        expect(list.shift()).toBe(1);
        expect(list.length).toBe(2);
        expect(list.toArray()).toEqual([2, 3]);
        expect(list.shift()).toBe(2);
        expect(list.shift()).toBe(3);
        expect(list.shift()).toBeUndefined();
        expect(list.length).toBe(0);
    });

    it('should get elements by index', () => {
        const list = new SinglyLinkedList<number>();
        list.append(1).append(2).append(3);
        expect(list.get(0, 'value')).toBe(1);
        expect(list.get(1, 'value')).toBe(2);
        expect(list.get(2, 'value')).toBe(3);
        expect(() => list.get(3, 'value')).toThrow('Invalid index');
        expect(() => list.get(-1, 'value')).toThrow('Invalid index');
    });

    it('should insert at index', () => {
        const list = new SinglyLinkedList<number>();
        list.append(1).append(3);
        list.insertAt(1, 2);
        expect(list.toArray()).toEqual([1, 2, 3]);
        expect(list.length).toBe(3);
        list.insertAt(0, 0);
        expect(list.toArray()).toEqual([0, 1, 2, 3]);
        list.insertAt(4, 4);
        expect(list.toArray()).toEqual([0, 1, 2, 3, 4]);
        expect(() => list.insertAt(6, 6)).toThrow('Invalid index');
    });

    it('should remove at index', () => {
        const list = new SinglyLinkedList<number>();
        list.append(1).append(2).append(3);
        expect(list.removeAt(1)).toBe(2);
        expect(list.toArray()).toEqual([1, 3]);
        expect(list.length).toBe(2);
        expect(list.removeAt(0)).toBe(1);
        expect(list.removeAt(0)).toBe(3);
        expect(() => list.removeAt(0)).toThrow('Invalid index');
    });

    it('should clear list', () => {
        const list = new SinglyLinkedList<number>();
        list.append(1).append(2).append(3);
        list.clear();
        expect(list.length).toBe(0);
        expect(list.toArray()).toEqual([]);
    });

    it('should find element index', () => {
        const list = new SinglyLinkedList<number>();
        list.append(1).append(2).append(3);
        expect(list.find((v) => v === 2)).toBe(1);
        expect(list.find((v) => v === 4)).toBeUndefined();
        list.clear();
        expect(list.find((v) => v === 1)).toBeUndefined();
    });
});