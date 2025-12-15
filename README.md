<div align="center">

# 📊 Data Advanced Notation (DAN)

**A human-readable, structured data format** that combines the best features of JSON, YAML, CSV, and TOON.

[![npm version](https://img.shields.io/npm/v/@marcuwynu23/dan?style=flat-square)](https://www.npmjs.com/package/@marcuwynu23/dan)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)](https://opensource.org/licenses/ISC)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-ESM-green?style=flat-square&logo=node.js)](https://nodejs.org/)

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Examples](#-examples)

</div>

---

## ✨ Why DAN?

**DAN** (Data Advanced Notation) is designed for developers who want:

- 🎯 **Human-readable** syntax with minimal punctuation
- 📋 **Native table support** for structured data
- 💬 **Comments** anywhere (`#` or `//`)
- 🔍 **Type inference** - no explicit type declarations needed
- ⚡ **Fast parsing** with single-pass algorithm
- 🎨 **Beautiful syntax** that's easy to read and write

Perfect for **configuration files**, **datasets**, **structured data**, and any scenario where JSON/YAML/CSV fall short.

---

## 🚀 Quick Start

### Installation

```bash
npm install @marcuwynu23/dan
```

### Basic Usage

```javascript
import { decode, encode } from "@marcuwynu23/dan";

// Parse DAN text to JavaScript object
const danText = `
name: John
age: 30
active: true
tags: [developer, javascript]
`;

const obj = decode(danText);
console.log(obj);
// { name: 'John', age: 30, active: true, tags: ['developer', 'javascript'] }

// Encode JavaScript object to DAN format
const data = {
  user: {
    name: "Jane",
    email: "jane@example.com",
  },
  roles: ["admin", "user"],
};

const danOutput = encode(data);
console.log(danOutput);
// user {
//   name: "Jane"
//   email: "jane@example.com"
// }
// roles: [admin, user]
```

---

## 📚 Table of Contents

- [Features](#-features)
- [TypeScript Support](#-typescript-support)
- [API Reference](#-api-reference)
- [Syntax Guide](#-syntax-guide)
- [Examples](#-examples)
- [Comparison with Other Formats](#-comparison-with-other-formats)
- [Use Cases](#-use-cases)
- [Documentation](#-documentation)
- [Contributing](#-contributing)

---

## ✨ Features

| Feature               | Description                                      |
| --------------------- | ------------------------------------------------ |
| 🎨 **Human-readable** | Minimal syntax, easy for humans to understand    |
| 📦 **Nested blocks**  | Organize data hierarchically with `{}`           |
| 📋 **Arrays**         | Simple list syntax with `[]`                     |
| 📊 **Native tables**  | Built-in table support with column headers       |
| 💬 **Comments**       | Inline and block comments using `#` or `//`      |
| 🔍 **Type inference** | Automatically detects numbers, booleans, strings |
| ⚡ **Fast parsing**   | Optimized single-pass parser for performance     |
| 📝 **Buffer support** | Parse directly from Node.js Buffers              |
| 🎯 **TypeScript**     | Full type definitions included                   |

---

## 📘 TypeScript Support

This library includes **full TypeScript support** with comprehensive type definitions.

### TypeScript Example

```typescript
import {
  decode,
  encode,
  type DanObject,
  type DanTableRow,
} from "@marcuwynu23/dan";

// Decode with type inference
const obj: DanObject = decode(`
name: John
age: 30
active: true
`);

// Type-safe access
const name: string = obj.name as string;
const age: number = obj.age as number;

// Encode with type safety
interface Config {
  user: {
    name: string;
    email: string;
  };
  roles: string[];
}

const config: Config = {
  user: { name: "Jane", email: "jane@example.com" },
  roles: ["admin", "user"],
};

const dan: string = encode(config as DanObject);
```

### Available Types

- `DanObject` - Represents a parsed DAN object
- `DanValue` - Union type for all possible DAN values
- `DanTableRow` - Represents a row in a DAN table

---

## 📖 API Reference

### `decode(text: string | Buffer): DanObject`

Parses a DAN format string or Buffer and returns a JavaScript object.

**Parameters:**

- `text` (string | Buffer): The DAN format text to parse. Can be a string or a Node.js Buffer (e.g., from `fs.readFileSync`)

**Returns:**

- `DanObject`: The parsed JavaScript object

**Example:**

```javascript
// With string
const obj = decode("name: John\nage: 30");
// { name: 'John', age: 30 }

// With Buffer (from fs.readFileSync)
import fs from "fs";
const buffer = fs.readFileSync("data.dan");
const obj = decode(buffer); // Automatically converts Buffer to string

// Empty file handling (returns empty object, no error)
const emptyBuffer = fs.readFileSync("empty.dan");
const emptyObj = decode(emptyBuffer); // Returns {} for empty files
// {}
```

**TypeScript:**

```typescript
const obj: DanObject = decode("name: John\nage: 30");

// Or with Buffer
import fs from "fs";
const buffer = fs.readFileSync("data.dan");
const obj: DanObject = decode(buffer);
```

### `encode(obj: DanObject, indent?: number): string`

Encodes a JavaScript object to DAN format string.

**Parameters:**

- `obj` (DanObject): The JavaScript object to encode
- `indent` (number, optional): Starting indentation level (default: 0)

**Returns:**

- `string`: The DAN format string

**Example:**

```javascript
const dan = encode({ name: "John", age: 30 });
// name: "John"
// age: 30
```

**TypeScript:**

```typescript
const dan: string = encode({ name: "John", age: 30 } as DanObject);
```

---

## 📝 Syntax Guide

### Blocks

Organize data hierarchically with nested blocks:

```dan
context {
  key: value
  nestedBlock {
    key: value
  }
}
```

### Arrays

Store lists of values:

```dan
friends: [ana, luis, sam]
numbers: [1, 2, 3, 4, 5]
mixed: [hello, 42, true, "world"]
```

### Tables

Native table support for structured tabular data:

```dan
hikes: table(id, name, distanceKm) [
  1, "Blue Lake Trail", 7.5
  2, "Ridge Overlook", 9.2
]
```

### Comments

Add documentation anywhere:

```dan
# This is a block comment
name: John  # Inline comment
age: 30     // Alternative comment style
```

---

## 💡 Examples

### Complete Example

```dan
# Context for the hiking trip
context {
  task: "Our favorite hikes together"  # main task description
  location: Boulder
  season: spring_2025

  // forecast for the week
  weatherForecast {
    monday: sunny
    tuesday: cloudy
    wednesday: rainy
    thursday: sunny
  }
}

friends: [ana, luis, sam, julia, mike]  # list of friends

# Hike details table
hikes: table(id, name, distanceKm, elevationGain, companion, wasSunny, difficulty) [
  1, "Blue Lake Trail", 7.5, 320, ana, true, medium
  2, "Ridge Overlook", 9.2, 540, luis, false, hard
  3, "Wildflower Loop", 5.1, 180, sam, true, easy
]

# Animal companions
animals: table(type, name, age, vaccinated) [
  dog, Putcholo, 5, true
  cat, Sebastian, 3, false
  parrot, Polly, 2, true
  rabbit, Fluffy, 1, false
]

games: [chess, "board games", puzzles, "escape room", sudoku]  // fun activities
```

### Configuration File Example

```dan
# Application configuration
app {
  name: "My Application"
  version: 1.0.0
  environment: production

  # Server settings
  server {
    host: localhost
    port: 3000
    ssl: false
  }

  # Database configuration
  database {
    type: postgresql
    host: db.example.com
    port: 5432
    name: myapp
  }
}

# Feature flags
features {
  authentication: true
  analytics: false
  logging: true
}

# User roles
roles: [admin, user, guest]

# API endpoints
endpoints: table(method, path, handler, auth) [
  GET, "/api/users", getUsers, true
  POST, "/api/users", createUser, true
  GET, "/api/public", getPublic, false
]
```

Check out more examples in the [`examples/`](./examples/) directory!

---

## ⚖️ Comparison with Other Formats

DAN combines the best features of multiple data formats. Here's how it compares:

### Feature Comparison

| Feature             | DAN             | JSON | YAML   | TOML   | CSV | XML           | INI            |
| ------------------- | --------------- | ---- | ------ | ------ | --- | ------------- | -------------- |
| **Comments**        | ✅ `#` and `//` | ❌   | ✅ `#` | ✅ `#` | ❌  | ✅ `<!-- -->` | ✅ `#` and `;` |
| **Type Inference**  | ✅              | ❌   | ✅     | ✅     | ❌  | ❌            | ❌             |
| **Nested Objects**  | ✅              | ✅   | ✅     | ✅     | ❌  | ✅            | ❌             |
| **Arrays**          | ✅              | ✅   | ✅     | ✅     | ❌  | ✅            | ❌             |
| **Tables**          | ✅ Native       | ❌   | ❌     | ❌     | ✅  | ❌            | ❌             |
| **Minimal Syntax**  | ✅              | ❌   | ⚠️     | ⚠️     | ✅  | ❌            | ✅             |
| **Human Readable**  | ✅              | ⚠️   | ✅     | ✅     | ⚠️  | ❌            | ✅             |
| **Quotes Optional** | ✅              | ❌   | ✅     | ✅     | ❌  | ❌            | ✅             |
| **Trailing Commas** | ✅              | ❌   | ✅     | ✅     | ❌  | N/A           | N/A            |

### Side-by-Side Examples

The same data structure represented in different formats:

<details>
<summary><b>DAN</b> - Clean and readable</summary>

```dan
# User configuration
user {
  name: John
  age: 30
  active: true
  tags: [developer, javascript, nodejs]
}

# User roles table
roles: table(id, name, permissions) [
  1, admin, [read, write, delete]
  2, user, [read]
  3, guest, [read]
]
```

</details>

<details>
<summary><b>JSON</b> - Verbose, no comments</summary>

```json
{
  "user": {
    "name": "John",
    "age": 30,
    "active": true,
    "tags": ["developer", "javascript", "nodejs"]
  },
  "roles": [
    { "id": 1, "name": "admin", "permissions": ["read", "write", "delete"] },
    { "id": 2, "name": "user", "permissions": ["read"] },
    { "id": 3, "name": "guest", "permissions": ["read"] }
  ]
}
```

**Issues:**

- ❌ No comments
- ❌ Requires quotes for all strings
- ❌ More verbose syntax
- ❌ Tables require verbose object arrays

</details>

<details>
<summary><b>YAML</b> - Indentation-sensitive</summary>

```yaml
# User configuration
user:
  name: John
  age: 30
  active: true
  tags:
    - developer
    - javascript
    - nodejs

# User roles table
roles:
  - id: 1
    name: admin
    permissions:
      - read
      - write
      - delete
  - id: 2
    name: user
    permissions:
      - read
  - id: 3
    name: guest
    permissions:
      - read
```

**Issues:**

- ⚠️ Indentation-sensitive (can be error-prone)
- ⚠️ Tables require verbose nested structures
- ⚠️ More verbose for tabular data
- ⚠️ Complex syntax for simple values

</details>

### Why Choose DAN?

**Choose DAN when you need:**

- ✅ Tabular data with native table support
- ✅ Comments for documentation
- ✅ Minimal, readable syntax
- ✅ Type inference without explicit typing
- ✅ Mix of structured and tabular data
- ✅ Fast parsing performance

**Consider alternatives when:**

- ⚠️ You need maximum compatibility (use JSON)
- ⚠️ You need strict schema validation (use JSON Schema + JSON)
- ⚠️ You need industry-standard format (use YAML/TOML)
- ⚠️ You only need simple key-value pairs (use INI)

---

## 🎯 Use Cases

DAN is perfect for:

- 📝 **Configuration files** for applications or services
- 📊 **Human-readable datasets** for analytics
- 🧪 **Structured experiment results**
- 📋 **Data serialization** with human readability
- 🗂️ **Documentation** with embedded data
- 📈 **Tabular data representation**

---

## 📄 File Extension

DAN files use the `.dan` extension:

```
filename.dan
```

Example: `hiking_trip.dan`, `config.dan`, `data.dan`

---

## 📚 Documentation

- **[FEATURES.md](./FEATURES.md)** - Comprehensive feature documentation
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Guidelines for contributing
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history and changes
- **[Examples](./examples/)** - Code examples and use cases

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details on:

- Code of conduct
- Development setup
- Pull request process
- Coding standards

See our [Security Policy](./.github/SECURITY.md) for reporting vulnerabilities.

---

## 📜 License

This project is licensed under the **ISC License** - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

DAN is inspired by the best features of JSON, YAML, CSV, and TOON, combining them into a single, powerful format.

---

<div align="center">

**Made with ❤️ for developers who love clean, readable data formats**

[Report Bug](https://github.com/marcuwynu23/dan/issues) • [Request Feature](https://github.com/marcuwynu23/dan/issues) • [Documentation](./FEATURES.md)

</div>
