/**
 * Example: Working with nested structures
 */

import { decode, encode } from '../index.js';

// Complex nested structure
const nestedDan = `
application {
  name: "My App"
  version: 1.0
  config {
    database {
      host: localhost
      port: 5432
      credentials {
        username: admin
        password: secret
      }
    }
    cache {
      enabled: true
      ttl: 3600
    }
  }
  features {
    auth: true
    analytics: false
    logging {
      level: info
      output: console
    }
  }
}
`;

const config = decode(nestedDan);
console.log('Decoded nested config:');
console.log(JSON.stringify(config, null, 2));

// Access nested values
console.log('\nDatabase host:', config.application.config.database.host);
console.log('Logging level:', config.application.features.logging.level);

// Modify and re-encode
config.application.version = 2.0;
config.application.config.cache.ttl = 7200;

const updated = encode(config);
console.log('\nUpdated config:');
console.log(updated);

