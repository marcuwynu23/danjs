import { test } from 'node:test';
import assert from 'node:assert';
import { decode } from '../index.js';

test('decode: simple key-value pairs', () => {
  const text = `name: John
age: 30
active: true`;
  const result = decode(text);
  assert.deepStrictEqual(result, {
    name: 'John',
    age: 30,
    active: true
  });
});

test('decode: nested blocks', () => {
  const text = `user {
  name: John
  address {
    city: New York
    zip: 10001
  }
}`;
  const result = decode(text);
  assert.deepStrictEqual(result, {
    user: {
      name: 'John',
      address: {
        city: 'New York',
        zip: 10001
      }
    }
  });
});

test('decode: arrays', () => {
  const text = `friends: [ana, luis, sam]
numbers: [1, 2, 3, 4]`;
  const result = decode(text);
  assert.deepStrictEqual(result, {
    friends: ['ana', 'luis', 'sam'],
    numbers: [1, 2, 3, 4]
  });
});

test('decode: tables', () => {
  const text = `hikes: table(id, name, distance) [
  1, "Blue Lake Trail", 7.5
  2, "Ridge Overlook", 9.2
]`;
  const result = decode(text);
  assert.deepStrictEqual(result, {
    hikes: [
      { id: 1, name: 'Blue Lake Trail', distance: 7.5 },
      { id: 2, name: 'Ridge Overlook', distance: 9.2 }
    ]
  });
});

test('decode: comments with #', () => {
  const text = `# This is a comment
name: John
age: 30 # inline comment`;
  const result = decode(text);
  assert.deepStrictEqual(result, {
    name: 'John',
    age: 30
  });
});

test('decode: comments with //', () => {
  const text = `// This is a comment
name: John
age: 30 // inline comment`;
  const result = decode(text);
  assert.deepStrictEqual(result, {
    name: 'John',
    age: 30
  });
});

test('decode: mixed comments', () => {
  const text = `# Block comment
name: John
age: 30 // inline comment
active: true # another comment`;
  const result = decode(text);
  assert.deepStrictEqual(result, {
    name: 'John',
    age: 30,
    active: true
  });
});

test('decode: boolean values', () => {
  const text = `active: true
inactive: false`;
  const result = decode(text);
  assert.deepStrictEqual(result, {
    active: true,
    inactive: false
  });
});

test('decode: number values', () => {
  const text = `age: 30
price: 99.99
negative: -5`;
  const result = decode(text);
  assert.deepStrictEqual(result, {
    age: 30,
    price: 99.99,
    negative: -5
  });
});

test('decode: string values with quotes', () => {
  const text = `name: "John Doe"
description: "A long description with spaces"`;
  const result = decode(text);
  assert.deepStrictEqual(result, {
    name: 'John Doe',
    description: 'A long description with spaces'
  });
});

test('decode: string values without quotes', () => {
  const text = `name: John
status: active`;
  const result = decode(text);
  assert.deepStrictEqual(result, {
    name: 'John',
    status: 'active'
  });
});

test('decode: empty table', () => {
  const text = `hikes: table(id, name) [
]`;
  const result = decode(text);
  assert.deepStrictEqual(result, {
    hikes: []
  });
});

test('decode: complex nested structure', () => {
  const text = `context {
  task: "Our favorite hikes"
  location: Boulder
  weatherForecast {
    monday: sunny
    tuesday: cloudy
  }
}
friends: [ana, luis, sam]
hikes: table(id, name, distance) [
  1, "Blue Lake Trail", 7.5
  2, "Ridge Overlook", 9.2
]`;
  const result = decode(text);
  assert.deepStrictEqual(result, {
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
  });
});

test('decode: empty string', () => {
  const result = decode('');
  assert.deepStrictEqual(result, {});
});

test('decode: whitespace only', () => {
  const result = decode('   \n  \t  \n  ');
  assert.deepStrictEqual(result, {});
});

test('decode: table with mixed types', () => {
  const text = `data: table(id, name, active, count) [
  1, "Item 1", true, 10
  2, "Item 2", false, 20
]`;
  const result = decode(text);
  assert.deepStrictEqual(result, {
    data: [
      { id: 1, name: 'Item 1', active: true, count: 10 },
      { id: 2, name: 'Item 2', active: false, count: 20 }
    ]
  });
});

