/**
 * TypeScript example: Using DAN with TypeScript
 */

import {
  decode,
  encode,
  type DanObject,
  type DanTableRow,
} from "@marcuwynu23/dan";

// Example 1: Decode with type inference
const danText = `
name: John Doe
age: 30
active: true
tags: [developer, javascript, nodejs]
`;

const obj: DanObject = decode(danText);
console.log("Decoded object:", obj);

// Type-safe access
const name: string = obj.name as string;
const age: number = obj.age as number;
const active: boolean = obj.active as boolean;
const tags: string[] = obj.tags as string[];

console.log(`Name: ${name}, Age: ${age}, Active: ${active}`);
console.log("Tags:", tags);

// Example 2: Encode with type safety
interface UserConfig {
  user: {
    name: string;
    email: string;
    preferences: {
      theme: string;
      notifications: boolean;
    };
  };
  roles: string[];
  settings: {
    language: string;
    timezone: string;
  };
}

const data: UserConfig = {
  user: {
    name: "Jane Smith",
    email: "jane@example.com",
    preferences: {
      theme: "dark",
      notifications: true,
    },
  },
  roles: ["admin", "user"],
  settings: {
    language: "en",
    timezone: "UTC",
  },
};

const danOutput: string = encode(data as DanObject);
console.log("\nEncoded DAN:");
console.log(danOutput);

// Example 3: Working with tables
interface Employee extends DanTableRow {
  id: number;
  name: string;
  department: string;
  salary: number;
  active: boolean;
}

const tableDan = `
employees: table(id, name, department, salary, active) [
  1, "Alice Johnson", Engineering, 95000, true
  2, "Bob Smith", Marketing, 75000, true
  3, "Carol White", Engineering, 98000, true
  4, "David Brown", Sales, 70000, false
]
`;

const tableData: DanObject = decode(tableDan);
const employees: Employee[] = tableData.employees as Employee[];

console.log("\nEmployees:");
employees.forEach((emp) => {
  console.log(`${emp.name} (${emp.department}): $${emp.salary}`);
});

// Example 4: Type-safe table encoding
const products: DanTableRow[] = [
  {id: 1, name: "Laptop", price: 999.99, inStock: true},
  {id: 2, name: "Mouse", price: 29.99, inStock: true},
  {id: 3, name: "Keyboard", price: 79.99, inStock: false},
];

const productsData: DanObject = {products};
const encodedTable: string = encode(productsData);
console.log("\nEncoded table:");
console.log(encodedTable);

// Example 5: Round-trip with type safety
const original: DanObject = {name: "Test", value: 42, active: true};
const encoded: string = encode(original);
const decoded: DanObject = decode(encoded);

console.log(
  "\nRound-trip test:",
  JSON.stringify(decoded) === JSON.stringify(original)
);
