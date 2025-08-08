import { describe, it, expect, beforeEach } from 'vitest';
import { HashTable } from '../Data Structures/10 - Hash Tables.ts';

describe('HashTable', () => {
    let hashTable: HashTable;

    beforeEach(() => {
        hashTable = new HashTable(7);
    });

    it('should initialize with correct size', () => {
        expect(hashTable['keyMap'].length).toBe(7);
    });

    it('should set and get a key-value pair', () => {
        hashTable.set('key1', 'value1');
        expect(hashTable.get('key1')).toBe('value1');
    });

    it('should return undefined for non-existent key', () => {
        expect(hashTable.get('nonexistent')).toBeUndefined();
    });

    it('should handle collisions', () => {
        hashTable.set('key1', 'value1');
        hashTable.set('key1', 'value2');
        expect(hashTable.get('key1')).toBe('value2');
    });

    it('should delete a key-value pair', () => {
        hashTable.set('key1', 'value1');
        expect(hashTable.delete('key1')).toBe('value1');
        expect(hashTable.get('key1')).toBeUndefined();
    });

    it('should return false when deleting non-existent key', () => {
        expect(hashTable.delete('nonexistent')).toBe(false);
    });

    it('should return all keys', () => {
        hashTable.set('key1', 'value1');
        hashTable.set('key2', 'value2');
        expect(hashTable.keys()).toEqual(['key2', 'key1']);
    });

    it('should return all values', () => {
        hashTable.set('key1', 'value1');
        hashTable.set('key2', 'value2');
        expect(hashTable.values()).toEqual(['value2', 'value1']);
    });

    it('should return all entries', () => {
        hashTable.set('key1', 'value1');
        hashTable.set('key2', 'value2');
        expect(hashTable.entries()).toEqual([['key2', 'value2'], ['key1', 'value1']]);
    });

    it('should handle multiple operations', () => {
        hashTable.set('key1', 'value1');
        hashTable.set('key2', 'value2');
        hashTable.delete('key1');
        hashTable.set('key3', 'value3');
        expect(hashTable.keys()).toEqual(['key2', 'key3']);
        expect(hashTable.values()).toEqual(['value2', 'value3']);
        expect(hashTable.get('key1')).toBeUndefined();
    });
});