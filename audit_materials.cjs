const fs = require('fs');
const content = fs.readFileSync('c:/Users/rishab/adonixdigital/src/main.js', 'utf8');

content.split('\n').forEach((l, i) => {
  if (l.includes('Material') || l.includes('color:') || l.includes('emissive:') || l.includes('Light(') || l.includes('ambientLight')) {
    console.log(`${i+1}: ${l.trim().substring(0, 100)}`);
  }
});
