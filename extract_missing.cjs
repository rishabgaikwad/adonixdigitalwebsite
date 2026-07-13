const fs = require('fs');
const files = ['about.html', 'services.html', 'products.html', 'contact.html', 'index.html'];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  
  const lines = content.split('\n');
  console.log(`\n--- ${file} ---`);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('<script') || line.includes('<style') || line.includes('<!DOCTYPE')) continue;
    if (line.includes('data-translate=')) continue;
    
    const match = line.match(/>([^<]{2,})</);
    if (match) {
      const text = match[1].trim();
      if (text.length > 2 && /[a-zA-Z]/.test(text)) {
         console.log(`Line ${i + 1}: ${text}`);
      }
    }
  }
});
