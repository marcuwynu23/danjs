import { test } from 'node:test';
import assert from 'node:assert';
import { encode, decode } from '../index.js';

test('round-trip: simple object', () => {
  const original = { name: 'John', age: 30 };
  const encoded = encode(original);
  const decoded = decode(encoded);
  assert.deepStrictEqual(decoded, original);
});

test('round-trip: nested objects', () => {
  const original = {
    user: {
      profile: {
        name: 'John',
        email: 'john@example.com'
      }
    }
  };
  const encoded = encode(original);
  const decoded = decode(encoded);
  assert.deepStrictEqual(decoded, original);
});

test('round-trip: arrays and tables', () => {
  const original = {
    tags: ['red', 'blue'],
    items: [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' }
    ]
  };
  const encoded = encode(original);
  const decoded = decode(encoded);
  assert.deepStrictEqual(decoded, original);
});

test('round-trip: all data types', () => {
  const original = {
    string: 'hello',
    number: 42,
    float: 3.14,
    booleanTrue: true,
    booleanFalse: false,
    array: [1, 2, 3],
    nested: {
      key: 'value'
    },
    table: [
      { a: 1, b: 'two', c: true },
      { a: 2, b: 'three', c: false }
    ]
  };
  const encoded = encode(original);
  const decoded = decode(encoded);
  assert.deepStrictEqual(decoded, original);
});

