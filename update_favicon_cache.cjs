const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\rishab\\adonixdigital';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\/adonixfavblack\.svg(\?v=\d+)?/g, '/adonixfavblack.svg?v=2');
  fs.writeFileSync(filePath, content);
});

console.log("Updated favicon links with cache buster");
