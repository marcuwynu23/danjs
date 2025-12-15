/**
 * Example: Working with tables in DAN format
 */

import { decode, encode } from '../index.js';

// Example: Decoding a table
const tableDan = `
employees: table(id, name, department, salary, active) [
  1, "Alice Johnson", Engineering, 95000, true
  2, "Bob Smith", Marketing, 75000, true
  3, "Carol White", Engineering, 98000, true
  4, "David Brown", Sales, 70000, false
]
`;

const data = decode(tableDan);
console.log('Decoded table:');
console.log(JSON.stringify(data, null, 2));

// Access table rows
console.log('\nFirst employee:', data.employees[0]);
console.log('Engineering employees:', 
  data.employees.filter(emp => emp.department === 'Engineering'));

// Example: Creating and encoding a table
const newTable = {
  products: [
    { id: 1, name: 'Laptop', price: 999.99, inStock: true },
    { id: 2, name: 'Mouse', price: 29.99, inStock: true },
    { id: 3, name: 'Keyboard', price: 79.99, inStock: false }
  ]
};

const encoded = encode(newTable);
console.log('\nEncoded table:');
console.log(encoded);

