import { test } from 'node:test';
import assert from 'node:assert';
import { encode, decode } from '../index.js';

test('encode: simple key-value pairs', () => {
  const obj = {
    name: 'John',
    age: 30,
    active: true
  };
  const result = encode(obj);
  const decoded = decode(result);
  assert.deepStrictEqual(decoded, obj);
});

test('encode: nested blocks', () => {
  const obj = {
    user: {
      name: 'John',
      address: {
        city: 'New York',
        zip: 10001
      }
    }
  };
  const result = encode(obj);
  const decoded = decode(result);
  assert.deepStrictEqual(decoded, obj);
});

test('encode: arrays', () => {
  const obj = {
    friends: ['ana', 'luis', 'sam'],
    numbers: [1, 2, 3, 4]
  };
  const result = encode(obj);
  const decoded = decode(result);
  assert.deepStrictEqual(decoded, obj);
});

test('encode: tables', () => {
  const obj = {
    hikes: [
      { id: 1, name: 'Blue Lake Trail', distance: 7.5 },
      { id: 2, name: 'Ridge Overlook', distance: 9.2 }
    ]
  };
  const result = encode(obj);
  const decoded = decode(result);
  assert.deepStrictEqual(decoded, obj);
});

test('encode: boolean values', () => {
  const obj = {
    active: true,
    inactive: false
  };
  const result = encode(obj);
  const decoded = decode(result);
  assert.deepStrictEqual(decoded, obj);
});

test('encode: number values', () => {
  const obj = {
    age: 30,
    price: 99.99,
    negative: -5
  };
  const result = encode(obj);
  const decoded = decode(result);
  assert.deepStrictEqual(decoded, obj);
});

test('encode: string values', () => {
  const obj = {
    name: 'John Doe',
    description: 'A long description with spaces'
  };
  const result = encode(obj);
  const decoded = decode(result);
  assert.deepStrictEqual(decoded, obj);
});

test('encode: empty table', () => {
  const obj = {
    hikes: []
  };
  const result = encode(obj);
  // Empty tables are encoded as arrays, so decode will treat them as arrays
  const decoded = decode(result);
  // Empty array should be preserved
  assert.deepStrictEqual(decoded.hikes, []);
});

test('encode: complex nested structure', () => {
  const obj = {
    context: {
      task: 'Our favorite hikes',
      location: 'Boulder',
      weatherForecast: {
        monday: 'sunny',
        tuesday: 'cloudy'
      }
    },
    friends: ['ana', 'luis', 'sam'],
    hikes: [
      { id: 1, name: 'Blue Lake Trail', distance: 7.5 },
      { id: 2, name: 'Ridge Overlook', distance: 9.2 }
    ]
  };
  const result = encode(obj);
  const decoded = decode(result);
  assert.deepStrictEqual(decoded, obj);
});

test('encode: empty object', () => {
  const obj = {};
  const result = encode(obj);
  assert.strictEqual(result, '');
});

test('encode: table with mixed types', () => {
  const obj = {
    data: [
      { id: 1, name: 'Item 1', active: true, count: 10 },
      { id: 2, name: 'Item 2', active: false, count: 20 }
    ]
  };
  const result = encode(obj);
  const decoded = decode(result);
  assert.deepStrictEqual(decoded, obj);
});

test('encode: array of primitives', () => {
  const obj = {
    tags: ['red', 'blue', 'green'],
    scores: [95, 87, 92]
  };
  const result = encode(obj);
  const decoded = decode(result);
  assert.deepStrictEqual(decoded, obj);
});

test('encode: round-trip with README example', () => {
  const text = `# Context for the hiking trip
context {
  task: "Our favorite hikes together"
  location: Boulder
  season: spring_2025

  weatherForecast {
    monday: sunny
    tuesday: cloudy
    wednesday: rainy
    thursday: sunny
  }
}

friends: [ana, luis, sam, julia, mike]

hikes: table(id, name, distanceKm, elevationGain, companion, wasSunny, difficulty) [
  1, "Blue Lake Trail", 7.5, 320, ana, true, medium
  2, "Ridge Overlook", 9.2, 540, luis, false, hard
  3, "Wildflower Loop", 5.1, 180, sam, true, easy
]`;
  const decoded = decode(text);
  const encoded = encode(decoded);
  const redecoded = decode(encoded);
  assert.deepStrictEqual(redecoded, decoded);
});

