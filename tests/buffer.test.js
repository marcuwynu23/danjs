import {test} from 'node:test';
import assert from 'node:assert';
import {decode} from '../index.js';
import {Buffer} from 'buffer';

test('decode: handles Buffer input', () => {
  const text = 'name: John\nage: 30';
  const buffer = Buffer.from(text, 'utf-8');
  const result = decode(buffer);
  assert.deepStrictEqual(result, {
    name: 'John',
    age: 30,
  });
});

test('decode: handles string input', () => {
  const text = 'name: John\nage: 30';
  const result = decode(text);
  assert.deepStrictEqual(result, {
    name: 'John',
    age: 30,
  });
});

test('decode: throws error for invalid input type', () => {
  assert.throws(
    () => decode(123),
    {
      name: 'TypeError',
      message: /Expected string or Buffer/,
    }
  );
});

