import { describe, expect, it } from "vitest"
import { DoublyLinkedList } from "../Data Structures/02 - DoublyLinkedList.ts";


describe('DoublyLinkedList', () => {
    it('should initialize empty', () => {
        const list = new DoublyLinkedList<number>();
        expect(list.size).toBe(0);
        expect(list.isEmpty()).toBe(true);
        expect(list.toArray()).toEqual([]);
        expect(list.toArray(true)).toEqual([]);
    });

    it('should push elements', () => {
        const list = new DoublyLinkedList<number>();
        list.push(1).push(2).push(3);
        expect(list.size).toBe(3);
        expect(list.toArray()).toEqual([1, 2, 3]);
        expect(list.toArray(true)).toEqual([3, 2, 1]);
    });

    it('should unshift elements', () => {
        const list = new DoublyLinkedList<number>();
        list.unshift(1).unshift(2).unshift(3);
        expect(list.size).toBe(3);
        expect(list.toArray()).toEqual([3, 2, 1]);
        expect(list.toArray(true)).toEqual([1, 2, 3]);
    });

    it('should pop elements', () => {
        const list = new DoublyLinkedList<number>();
        list.push(1).push(2).push(3);
        expect(list.pop()).toBe(3);
        expect(list.size).toBe(2);
        expect(list.toArray()).toEqual([1, 2]);
        expect(list.pop()).toBe(2);
        expect(list.pop()).toBe(1);
        expect(list.pop()).toBeUndefined();
        expect(list.size).toBe(0);
    });

    it('should shift elements', () => {
        const list = new DoublyLinkedList<number>();
        list.push(1).push(2).push(3);
        expect(list.shift()).toBe(1);
        expect(list.size).toBe(2);
        expect(list.toArray()).toEqual([2, 3]);
        expect(list.shift()).toBe(2);
        expect(list.shift()).toBe(3);
        expect(list.shift()).toBeUndefined();
        expect(list.size).toBe(0);
    });

    it('should get elements by index', () => {
        const list = new DoublyLinkedList<number>();
        list.push(1).push(2).push(3);
        expect(list.get(0)).toBe(1);
        expect(list.get(1)).toBe(2);
        expect(list.get(2)).toBe(3);
        expect(list.get(3)).toBeUndefined();
        expect(list.get(-1)).toBeUndefined();
        const node = list.get(1, true) as any;
        expect(node.value).toBe(2);
        expect(node.next).toBeDefined();
        expect(node.previous).toBeDefined();
    });

    it('should set elements by index', () => {
        const list = new DoublyLinkedList<number>();
        list.push(1).push(2).push(3);
        expect(list.set(1, 5)).toBe(true);
        expect(list.toArray()).toEqual([1, 5, 3]);
        expect(list.set(3, 6)).toBeUndefined();
        expect(list.set(-1, 6)).toBeUndefined();
        expect(list.size).toBe(3);
    });

    it('should insert elements at index', () => {
        const list = new DoublyLinkedList<number>();
        list.push(1).push(3);
        list.insert(1, 2);
        expect(list.toArray()).toEqual([1, 2, 3]);
        expect(list.size).toBe(3);
        list.insert(0, 0);
        expect(list.toArray()).toEqual([0, 1, 2, 3]);
        list.insert(4, 4);
        expect(list.toArray()).toEqual([0, 1, 2, 3, 4]);
        expect(list.insert(6, 6)).toBeUndefined();
        expect(list.size).toBe(5);
    });

    it('should remove elements at index', () => {
        const list = new DoublyLinkedList<number>();
        list.push(1).push(2).push(3);
        expect(list.remove(1)).toBe(2);
        expect(list.toArray()).toEqual([1, 3]);
        expect(list.size).toBe(2);
        expect(list.remove(0)).toBe(1);
        expect(list.remove(0)).toBe(3);
        expect(list.remove(0)).toBeUndefined();
        expect(list.size).toBe(0);
        expect(list.remove(-1)).toBeUndefined();
    });

    it('should find element index', () => {
        const list = new DoublyLinkedList<number>();
        list.push(1).push(2).push(3);
        expect(list.findIndex((v) => v === 2)).toBe(1);
        expect(list.findIndex((v) => v === 4)).toBeUndefined();
        list.pop();
        list.pop();
        list.pop();
        expect(list.findIndex((v) => v === 1)).toBeUndefined();
    });
});