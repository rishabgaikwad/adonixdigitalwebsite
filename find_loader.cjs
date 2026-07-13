const fs = require('fs');
const content = fs.readFileSync('c:/Users/rishab/adonixdigital/src/main.js', 'utf8');
content.split('\n').forEach((l, i) => {
  if (l.toLowerCase().includes('loader')) {
    console.log(`${i + 1}: ${l.trim()}`);
  }
});
