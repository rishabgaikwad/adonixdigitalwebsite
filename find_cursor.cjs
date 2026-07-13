const fs = require('fs');
const content = fs.readFileSync('c:/Users/rishab/adonixdigital/src/main.js', 'utf8');
content.split('\n').forEach((l, i) => {
  if (l.includes('cursor') || l.includes('mousemove') || l.includes('addEventListener')) {
    console.log(`${i + 1}: ${l.trim().substring(0, 80)}`);
  }
});
