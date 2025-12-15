/**
 * Example: Reading from and writing to DAN files
 */

import {decode, encode} from "../index.js";
import {readFileSync, writeFileSync} from "fs";
import {join} from "path";

// Example: Read a DAN file (with encoding - returns string)
try {
  const danContent = readFileSync(
    join(process.cwd(), "examples", "sample.dan"),
    "utf-8"
  );
  const data = decode(danContent);
  console.log("Read from file (with encoding):");
  console.log(JSON.stringify(data, null, 2));
} catch (error) {
  console.log("Note: sample.dan not found, creating it...");
}

// Example: Read a DAN file (without encoding - returns Buffer, but decode handles it)
try {
  const danBuffer = readFileSync(join(process.cwd(), "examples", "sample.dan"));
  const data = decode(danBuffer); // decode automatically converts Buffer to string
  console.log("\nRead from file (Buffer, auto-converted):");
  console.log(JSON.stringify(data, null, 2));
} catch (error) {
  // Ignore if file doesn't exist
}

// Example: Empty file handling (returns empty object, no error)
try {
  const emptyFile = readFileSync(join(process.cwd(), "examples", "empty.dan"));
  const emptyData = decode(emptyFile); // Returns {} for empty files
  console.log("\nEmpty file result:", emptyData);
  console.log("Is empty object:", Object.keys(emptyData).length === 0);
} catch (error) {
  // File might not exist, but if it does and is empty, decode returns {}
  console.log("\nNote: empty.dan not found (this is expected)");
}

// Example: Empty string handling
const emptyResult = decode("");
console.log("\nEmpty string result:", emptyResult);
console.log("Is empty object:", Object.keys(emptyResult).length === 0);

// Example: Write a DAN file
const sampleData = {
  project: {
    name: "My Project",
    version: "1.0.0",
    description: "A sample project",
  },
  dependencies: ["express", "lodash", "axios"],
  scripts: {
    start: "node index.js",
    test: "npm test",
    build: "npm run build",
  },
  team: [
    {name: "Alice", role: "Developer", active: true},
    {name: "Bob", role: "Designer", active: true},
  ],
};

const danOutput = encode(sampleData);
const filePath = join(process.cwd(), "examples", "output.dan");
writeFileSync(filePath, danOutput, "utf-8");
console.log("\nWritten to output.dan:");
console.log(danOutput);
