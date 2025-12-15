# DAN Features

This document provides a comprehensive overview of all features supported by the DAN (Data Advanced Notation) format and parser.

## Core Features

### 1. Key-Value Pairs

Simple key-value pairs with automatic type inference:

```dan
name: John
age: 30
active: true
price: 99.99
```

**Supported Types:**
- Strings (quoted or unquoted)
- Numbers (integers and floats)
- Booleans (`true`/`false`)
- Arrays
- Objects (blocks)

### 2. Nested Blocks

Organize data hierarchically using block syntax:

```dan
user {
  name: John
  email: john@example.com
  address {
    street: 123 Main St
    city: New York
    zip: 10001
  }
}
```

**Features:**
- Unlimited nesting depth
- Clear visual structure with `{` and `}`
- Easy to read and maintain

### 3. Arrays

Store lists of values:

```dan
tags: [javascript, nodejs, dan]
numbers: [1, 2, 3, 4, 5]
mixed: [hello, 42, true, "world"]
```

**Features:**
- Supports any value type
- Mixed types allowed
- Empty arrays: `[]`
- Nested arrays supported

### 4. Tables

Native table support for structured tabular data:

```dan
users: table(id, name, email, active) [
  1, Alice, "alice@example.com", true
  2, Bob, "bob@example.com", false
  3, Charlie, "charlie@example.com", true
]
```

**Features:**
- Column headers defined in `table()` declaration
- Type inference per column
- Clean, readable syntax
- Perfect for datasets and configuration tables

### 5. Comments

Add documentation and notes anywhere:

```dan
# This is a block comment
name: John  # Inline comment
age: 30     // Alternative comment style

// Multi-line comments
// are also supported
```

**Comment Styles:**
- `#` - Hash comment (most common)
- `//` - Double-slash comment
- Both work inline and on separate lines

### 6. Type Inference

Automatic type detection without explicit declarations:

```dan
# Numbers
count: 42
price: 99.99
negative: -10

# Booleans
enabled: true
disabled: false

# Strings (quoted or unquoted)
name: John
title: "Senior Developer"
description: "A long description with spaces"

# Arrays
items: [apple, banana, cherry]
```

**Type Inference Rules:**
- Numbers: Any valid numeric value
- Booleans: `true` or `false` (case-sensitive)
- Strings: Everything else, or quoted values
- Arrays: Values between `[` and `]`

### 7. Quoted Strings

Use quotes when needed:

```dan
# Quotes required for strings with spaces or special characters
name: "John Doe"
path: "/usr/local/bin"
message: "Hello, world!"

# Quotes optional for simple identifiers
simple: hello
```

**When to Quote:**
- Strings containing spaces
- Strings with special characters
- Strings that might be confused with other types
- When you want explicit string type

## Advanced Features

### 8. Nested Arrays

Arrays can contain other arrays:

```dan
matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
nested: [outer, [inner, values], more]
```

### 9. Tables with Complex Values

Tables can contain arrays and other complex types:

```dan
data: table(id, tags, metadata) [
  1, [tag1, tag2], {key: value}
  2, [tag3], {other: data}
]
```

### 10. Empty Values

Handle empty structures gracefully:

```dan
emptyArray: []
emptyBlock: {}
emptyTable: table(col1, col2) []
```

### 11. Mixed Content

Combine all features in one file:

```dan
# Configuration file
app {
  name: "My App"
  version: 1.0.0
  
  # Server settings
  server {
    host: localhost
    port: 3000
  }
  
  # Feature flags
  features: [auth, logging, analytics]
  
  # User roles table
  roles: table(id, name, permissions) [
    1, admin, [read, write, delete]
    2, user, [read]
    3, guest, [read]
  ]
}
```

## Parser Features

### 12. Buffer Support

Parse directly from Node.js Buffers:

```javascript
import fs from 'fs';
import { decode } from '@marcuwynu23/dan';

const buffer = fs.readFileSync('config.dan');
const data = decode(buffer); // Automatically handles Buffer
```

### 13. Empty File Handling

Gracefully handles empty files:

```javascript
const empty = decode(''); // Returns {}
const whitespace = decode('   \n  '); // Returns {}
```

### 14. Error Handling

Robust parsing with clear error messages for malformed data.

## Encoder Features

### 15. Pretty Printing

Automatic formatting with proper indentation:

```javascript
const data = {
  user: {
    name: "John",
    settings: {
      theme: "dark"
    }
  }
};

const dan = encode(data);
// Automatically formats with proper indentation
```

### 16. Table Detection

Automatically detects and formats arrays of objects as tables:

```javascript
const data = {
  users: [
    {id: 1, name: "Alice"},
    {id: 2, name: "Bob"}
  ]
};

const dan = encode(data);
// Outputs as table format
```

### 17. Type Preservation

Maintains data types during encoding:

```javascript
const data = {
  number: 42,
  boolean: true,
  string: "hello",
  array: [1, 2, 3]
};

const dan = encode(data);
// Types are preserved in output
```

## TypeScript Support

### 18. Full Type Definitions

Complete TypeScript support with exported types:

```typescript
import { decode, encode, type DanObject, type DanValue } from '@marcuwynu23/dan';

const obj: DanObject = decode('name: John');
const dan: string = encode(obj as DanObject);
```

**Available Types:**
- `DanObject` - Root object type
- `DanValue` - Union of all possible values
- `DanTableRow` - Table row type

### 19. Type Safety

TypeScript provides compile-time type checking and IntelliSense support.

## Performance Features

### 20. Single-Pass Parsing

Efficient parsing algorithm that processes files in a single pass for optimal performance.

### 21. Memory Efficient

Handles large files efficiently without excessive memory usage.

## Use Cases

DAN is ideal for:

- ✅ Configuration files
- ✅ Structured datasets
- ✅ Application settings
- ✅ Data serialization
- ✅ Human-readable data storage
- ✅ Documentation with embedded data
- ✅ Tabular data representation

## Comparison with Other Formats

See the [README.md](README.md) for detailed comparisons with JSON, YAML, TOML, CSV, XML, and INI formats.

## Future Features

Potential features under consideration:

- Schema validation
- Streaming parser for large files
- Custom type definitions
- Import/include directives
- Multi-line strings
- Date/time type support

Have a feature request? Open an issue on GitHub!

