/**
 * Basic example: Reading and writing DAN files
 */

import { decode, encode } from '../index.js';
import { readFileSync, writeFileSync } from 'fs';

// Example 1: Decode a DAN string
const danText = `
name: John Doe
age: 30
active: true
tags: [developer, javascript, nodejs]
`;

const obj = decode(danText);
console.log('Decoded object:', JSON.stringify(obj, null, 2));

// Example 2: Encode an object to DAN format
const data = {
  user: {
    name: 'Jane Smith',
    email: 'jane@example.com',
    preferences: {
      theme: 'dark',
      notifications: true
    }
  },
  roles: ['admin', 'user'],
  settings: {
    language: 'en',
    timezone: 'UTC'
  }
};

const danOutput = encode(data);
console.log('\nEncoded DAN:');
console.log(danOutput);

// Example 3: Round-trip (encode then decode)
const original = { name: 'Test', value: 42 };
const encoded = encode(original);
const decoded = decode(encoded);
console.log('\nRound-trip test:', JSON.stringify(decoded) === JSON.stringify(original));

