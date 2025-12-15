import { test } from 'node:test';
import assert from 'node:assert';
import { decode, encode } from '../index.js';

test('decode: empty string in array', () => {
  const text = `items: [a, "", b]`;
  const result = decode(text);
  assert.deepStrictEqual(result, {
    items: ['a', '', 'b']
  });
});

test('decode: array with only empty strings', () => {
  const text = `items: ["", ""]`;
  const result = decode(text);
  assert.deepStrictEqual(result, {
    items: ['', '']
  });
});

test('decode: table with missing columns (should handle gracefully)', () => {
  const text = `data: table(a, b, c) [
  1, 2
  3, 4, 5
]`;
  const result = decode(text);
  // Should create rows with available values
  assert.strictEqual(result.data.length, 2);
  assert.strictEqual(result.data[0].a, 1);
  assert.strictEqual(result.data[0].b, 2);
  assert.strictEqual(result.data[0].c, undefined);
});

test('decode: table with extra columns (should handle gracefully)', () => {
  const text = `data: table(a, b) [
  1, 2, 3
  4, 5
]`;
  const result = decode(text);
  assert.strictEqual(result.data.length, 2);
  assert.strictEqual(result.data[0].a, 1);
  assert.strictEqual(result.data[0].b, 2);
});

test('decode: nested blocks with same key names', () => {
  const text = `
outer {
  name: outer
  inner {
    name: inner
  }
}`;
  const result = decode(text);
  assert.deepStrictEqual(result, {
    outer: {
      name: 'outer',
      inner: {
        name: 'inner'
      }
    }
  });
});

test('decode: numbers as strings when quoted', () => {
  const text = `id: "123"
number: 456`;
  const result = decode(text);
  assert.strictEqual(result.id, '123');
  assert.strictEqual(result.number, 456);
});

test('encode: null values (should be handled)', () => {
  const obj = {
    value: null
  };
  // null should be encoded as a string representation
  const result = encode(obj);
  const decoded = decode(result);
  // null will be decoded as the string "null"
  assert.strictEqual(decoded.value, 'null');
});

test('decode: negative numbers', () => {
  const text = `temp: -10
positive: 10`;
  const result = decode(text);
  assert.strictEqual(result.temp, -10);
  assert.strictEqual(result.positive, 10);
});

test('decode: decimal numbers', () => {
  const text = `pi: 3.14159
price: 99.99`;
  const result = decode(text);
  assert.strictEqual(result.pi, 3.14159);
  assert.strictEqual(result.price, 99.99);
});

test('decode: scientific notation (if supported)', () => {
  const text = `large: 1e10
small: 1e-5`;
  const result = decode(text);
  assert.strictEqual(result.large, 1e10);
  assert.strictEqual(result.small, 1e-5);
});

