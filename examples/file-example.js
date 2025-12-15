/**
 * Example: Reading from and writing to DAN files
 */

import { decode, encode } from '../index.js';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Example: Read a DAN file
try {
  const danContent = readFileSync(join(process.cwd(), 'examples', 'sample.dan'), 'utf-8');
  const data = decode(danContent);
  console.log('Read from file:');
  console.log(JSON.stringify(data, null, 2));
} catch (error) {
  console.log('Note: sample.dan not found, creating it...');
}

// Example: Write a DAN file
const sampleData = {
  project: {
    name: 'My Project',
    version: '1.0.0',
    description: 'A sample project'
  },
  dependencies: ['express', 'lodash', 'axios'],
  scripts: {
    start: 'node index.js',
    test: 'npm test',
    build: 'npm run build'
  },
  team: [
    { name: 'Alice', role: 'Developer', active: true },
    { name: 'Bob', role: 'Designer', active: true }
  ]
};

const danOutput = encode(sampleData);
const filePath = join(process.cwd(), 'examples', 'output.dan');
writeFileSync(filePath, danOutput, 'utf-8');
console.log('\nWritten to output.dan:');
console.log(danOutput);

