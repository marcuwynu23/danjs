# Data Advanced Notation (DAN)

**DAN** (Data Advanced Notation) is a **human-readable, structured data format** designed to combine the best features of JSON, YAML, CSV, and TOON. It supports **nested blocks, arrays, tables, comments, and type inference**, making it ideal for configuration files, datasets, and structured human-readable data.

This library provides a fast, reliable parser and encoder for the DAN format.

---

## Installation

```bash
npm install @marcuwynu23/dan
```

---

## Quick Start

```javascript
import {decode, encode} from "@marcuwynu23/dan";

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

## API

### `decode(text: string): object`

Parses a DAN format string and returns a JavaScript object.

**Parameters:**

- `text` (string): The DAN format text to parse

**Returns:**

- `object`: The parsed JavaScript object

**Example:**

```javascript
const obj = decode("name: John\nage: 30");
// { name: 'John', age: 30 }
```

### `encode(obj: object, indent?: number): string`

Encodes a JavaScript object to DAN format string.

**Parameters:**

- `obj` (object): The JavaScript object to encode
- `indent` (number, optional): Starting indentation level (default: 0)

**Returns:**

- `string`: The DAN format string

**Example:**

```javascript
const dan = encode({name: "John", age: 30});
// name: "John"
// age: 30
```

---

## Features

- **Human-readable syntax** with minimal punctuation
- **Nested blocks** using `{}` for clear structure
- **Arrays** using `[ ]`
- **Tables** with column headers and typed values
- **Inline and block comments** using `#` or `//`
- **Type inference** for numbers, booleans, strings, arrays
- **Fast, single-pass parsing** for large datasets

---

## Example DAN File

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

---

## Syntax Overview

### Blocks

```dan
context {
  key: value
  nestedBlock {
    key: value
  }
}
```

### Arrays

```dan
friends: [ana, luis, sam]
```

### Tables

```dan
hikes: table(id, name, distanceKm) [
  1, "Blue Lake Trail", 7.5
  2, "Ridge Overlook", 9.2
]
```

### Comments

```dan
# This is a comment
// This is also a comment
```

---

## Advantages of DAN

- **Readable**: Minimal syntax, easy for humans to understand
- **Structured**: Supports tables, nested objects, and arrays
- **Typed**: Automatically infers numbers, booleans, strings
- **Flexible**: Comments allowed anywhere in the file
- **Fast Parsing**: Optimized single-pass parsers for performance

---

## Comparison with Other Data Formats

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

#### DAN

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

#### JSON

```json
{
  "user": {
    "name": "John",
    "age": 30,
    "active": true,
    "tags": ["developer", "javascript", "nodejs"]
  },
  "roles": [
    {"id": 1, "name": "admin", "permissions": ["read", "write", "delete"]},
    {"id": 2, "name": "user", "permissions": ["read"]},
    {"id": 3, "name": "guest", "permissions": ["read"]}
  ]
}
```

**Issues with JSON:**

- ❌ No comments
- ❌ Requires quotes for all strings
- ❌ More verbose syntax
- ❌ Tables require verbose object arrays

#### YAML

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

**Issues with YAML:**

- ⚠️ Indentation-sensitive (can be error-prone)
- ⚠️ Tables require verbose nested structures
- ⚠️ More verbose for tabular data
- ⚠️ Complex syntax for simple values

#### TOML

```toml
# User configuration
[user]
name = "John"
age = 30
active = true
tags = ["developer", "javascript", "nodejs"]

# User roles table
[[roles]]
id = 1
name = "admin"
permissions = ["read", "write", "delete"]

[[roles]]
id = 2
name = "user"
permissions = ["read"]

[[roles]]
id = 3
name = "guest"
permissions = ["read"]
```

**Issues with TOML:**

- ⚠️ Tables require array of tables syntax `[[table]]`
- ⚠️ More verbose for tabular data
- ⚠️ Requires quotes for strings in some contexts

#### CSV

```csv
user.name,user.age,user.active,user.tags
John,30,true,"developer,javascript,nodejs"

roles.id,roles.name,roles.permissions
1,admin,"read,write,delete"
2,user,read
3,guest,read
```

**Issues with CSV:**

- ❌ No comments
- ❌ No nested structures
- ❌ Poor support for complex data types
- ❌ Escaping issues with commas and quotes
- ❌ No type inference

#### XML

```xml
<!-- User configuration -->
<config>
  <user>
    <name>John</name>
    <age>30</age>
    <active>true</active>
    <tags>
      <tag>developer</tag>
      <tag>javascript</tag>
      <tag>nodejs</tag>
    </tags>
  </user>
  <roles>
    <role>
      <id>1</id>
      <name>admin</name>
      <permissions>
        <permission>read</permission>
        <permission>write</permission>
        <permission>delete</permission>
      </permissions>
    </role>
    <role>
      <id>2</id>
      <name>user</name>
      <permissions>
        <permission>read</permission>
      </permissions>
    </role>
    <role>
      <id>3</id>
      <name>guest</name>
      <permissions>
        <permission>read</permission>
      </permissions>
    </role>
  </roles>
</config>
```

**Issues with XML:**

- ❌ Very verbose
- ❌ Not human-friendly
- ❌ Closing tags add significant overhead
- ❌ Poor readability for configuration

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

## Use Cases

- Configuration files for applications or services
- Human-readable datasets for analytics
- Storing structured experiment results
- Any case where JSON/YAML/CSV are too limited

---

## File Extension

DAN files use the extension:

```
.filename.dan
```

Example:

```
hiking_trip.dan
```
