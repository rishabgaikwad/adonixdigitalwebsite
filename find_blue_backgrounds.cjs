const fs = require('fs');

function checkFile(path) {
  const content = fs.readFileSync(path, 'utf8');
  content.split('\n').forEach((l, i) => {
    if (l.toLowerCase().includes('background') || l.toLowerCase().includes('gradient') || l.toLowerCase().includes('0b1020') || l.toLowerCase().includes('050505') || l.toLowerCase().includes('scene.background') || l.toLowerCase().includes('clearcolor')) {
      console.log(`${path} (${i+1}): ${l.trim().substring(0, 100)}`);
    }
  });
}

checkFile('c:/Users/rishab/adonixdigital/src/style.css');
checkFile('c:/Users/rishab/adonixdigital/src/main.js');
checkFile('c:/Users/rishab/adonixdigital/index.html');
