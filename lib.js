// DAN (Data Advanced Notation) Parser and Encoder
export function decode(text) {
  // Handle Buffer inputs (from fs.readFileSync)
  if (Buffer.isBuffer(text)) {
    text = text.toString('utf-8');
  }
  // Ensure text is a string
  if (typeof text !== 'string') {
    throw new TypeError(`Expected string or Buffer, got ${typeof text}`);
  }
  // Handle empty input - return empty object
  if (!text || text.trim().length === 0) {
    return {};
  }
  const lines = text.split(/\r?\n/);
  const stack = [{obj: {}, type: "root"}];
  let currentTable = null;

  const tableRe = /^(\w+):\s*table\(([^)]+)\)\s*\[$/;
  const kvRe = /^(\w+):\s*(.+)$/;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Remove comments and trim
    const commentIndex1 = line.indexOf("#");
    const commentIndex2 = line.indexOf("//");
    let cutIndex = -1;
    if (commentIndex1 >= 0 && commentIndex2 >= 0)
      cutIndex = Math.min(commentIndex1, commentIndex2);
    else cutIndex = Math.max(commentIndex1, commentIndex2);
    if (cutIndex >= 0) line = line.slice(0, cutIndex);
    line = line.trim();
    if (!line) continue;

    const top = stack[stack.length - 1];

    // Block start
    if (line.endsWith("{")) {
      const key = line.slice(0, -1).trim();
      const newObj = {};
      top.obj[key] = newObj;
      stack.push({obj: newObj, type: "block"});
      continue;
    }

    // Block end
    if (line === "}") {
      stack.pop();
      continue;
    }

    // Table start
    const tableMatch = tableRe.exec(line);
    if (tableMatch) {
      const key = tableMatch[1];
      const columns = tableMatch[2].split(",").map((c) => c.trim());
      const table = [];
      top.obj[key] = table;
      currentTable = {obj: table, columns};
      continue;
    }

    // Table end
    if (line === "]") {
      currentTable = null;
      continue;
    }

    // Table row
    if (currentTable) {
      const row = {};
      let start = 0,
        colIdx = 0;
      for (let j = 0; j <= line.length; j++) {
        if (j === line.length || line[j] === ",") {
          let val = line.slice(start, j).trim();
          row[currentTable.columns[colIdx]] = parseValue(val);
          start = j + 1;
          colIdx++;
        }
      }
      currentTable.obj.push(row);
      continue;
    }

    // Key-value
    const kvMatch = kvRe.exec(line);
    if (kvMatch) {
      const key = kvMatch[1];
      const val = kvMatch[2];
      top.obj[key] = parseValue(val);
    }
  }

  return stack[0].obj;
}

export function encode(obj, indent = 0) {
  const lines = [];
  const pad = "  ".repeat(indent);

  for (const [key, val] of Object.entries(obj)) {
    if (Array.isArray(val)) {
      if (
        val.length > 0 &&
        typeof val[0] === "object" &&
        !Array.isArray(val[0])
      ) {
        // Table
        const columns = Object.keys(val[0]);
        lines.push(`${pad}${key}: table(${columns.join(", ")}) [`);
        for (const row of val) {
          lines.push(
            pad + "  " + columns.map((c) => serializeValue(row[c])).join(", ")
          );
        }
        lines.push(`${pad}]`);
      } else {
        lines.push(`${pad}${key}: ${serializeValue(val)}`);
      }
    } else if (typeof val === "object" && val !== null) {
      lines.push(`${pad}${key} {`);
      const nestedLines = encode(val, indent + 1);
      if (nestedLines) {
        // Split nested lines and add them individually for proper formatting
        const nestedLinesArray = nestedLines.split("\n");
        lines.push(...nestedLinesArray);
      }
      lines.push(`${pad}}`);
    } else {
      lines.push(`${pad}${key}: ${serializeValue(val)}`);
    }
  }

  return lines.join("\n");
}

// --- Internal helpers ---
function parseValue(val) {
  if (typeof val !== "string") return val;
  if (val === "true") return true;
  if (val === "false") return false;
  if (val.length >= 2 && val[0] === '"' && val[val.length - 1] === '"') {
    return val.slice(1, -1);
  }
  if (!isNaN(val) && val.trim() !== "") return Number(val);
  if (val.length >= 2 && val[0] === "[" && val[val.length - 1] === "]") {
    const content = val.slice(1, -1).trim();
    if (content === "") return [];
    // Split by comma, but preserve empty strings for explicit empty values
    const parts = content.split(",").map((v) => v.trim());
    return parts.map((v) => parseValue(v));
  }
  return val;
}

function serializeValue(val) {
  if (typeof val === "boolean") return val ? "true" : "false";
  if (typeof val === "string") return `"${val}"`;
  if (typeof val === "number") return val.toString();
  if (Array.isArray(val)) return `[${val.map(serializeValue).join(", ")}]`;
  return val;
}
