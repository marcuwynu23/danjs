/**
 * DAN (Data Advanced Notation) Parser and Encoder
 *
 * A library for parsing and encoding DAN format files.
 * DAN is a human-readable, structured data format that supports
 * nested blocks, arrays, tables, comments, and type inference.
 */

/**
 * Represents a value that can be parsed from or encoded to DAN format.
 */
export type DanValue =
  | string
  | number
  | boolean
  | null
  | DanValue[]
  | DanObject;

/**
 * Represents an object in DAN format.
 */
export interface DanObject {
  [key: string]: DanValue;
}

/**
 * Represents a row in a DAN table.
 */
export interface DanTableRow {
  [column: string]: DanValue;
}

/**
 * Parses a DAN format string or Buffer and returns a JavaScript object.
 *
 * @param text - The DAN format text to parse (string or Buffer)
 * @returns The parsed JavaScript object
 *
 * @example
 * ```typescript
 * const obj = decode('name: John\nage: 30');
 * // { name: 'John', age: 30 }
 * ```
 *
 * @example
 * ```typescript
 * import fs from 'fs';
 * const buffer = fs.readFileSync('data.dan');
 * const obj = decode(buffer); // Automatically converts Buffer to string
 * ```
 */
export function decode(text: string | Buffer): DanObject;

/**
 * Encodes a JavaScript object to DAN format string.
 *
 * @param obj - The JavaScript object to encode
 * @param indent - Starting indentation level (default: 0)
 * @returns The DAN format string
 *
 * @example
 * ```typescript
 * const dan = encode({ name: 'John', age: 30 });
 * // name: "John"
 * // age: 30
 * ```
 */
export function encode(obj: DanObject, indent?: number): string;

