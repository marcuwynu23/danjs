import {test} from 'node:test';
import assert from 'node:assert';
import {decode} from '../index.js';
import {Buffer} from 'buffer';

test('decode: empty string returns empty object', () => {
  const result = decode('');
  assert.deepStrictEqual(result, {});
});

test('decode: empty Buffer returns empty object', () => {
  const emptyBuffer = Buffer.from('', 'utf-8');
  const result = decode(emptyBuffer);
  assert.deepStrictEqual(result, {});
});

test('decode: whitespace only returns empty object', () => {
  const result = decode('   \n  \t  \n  ');
  assert.deepStrictEqual(result, {});
});

test('decode: newlines only returns empty object', () => {
  const result = decode('\n\n\n');
  assert.deepStrictEqual(result, {});
});

test('decode: Buffer with only whitespace returns empty object', () => {
  const whitespaceBuffer = Buffer.from('   \n  \t  ', 'utf-8');
  const result = decode(whitespaceBuffer);
  assert.deepStrictEqual(result, {});
});

test('decode: empty file content (simulated) returns empty object', () => {
  // Simulate reading an empty file
  const emptyFileContent = '';
  const result = decode(emptyFileContent);
  assert.deepStrictEqual(result, {});
  assert.strictEqual(Object.keys(result).length, 0);
});

