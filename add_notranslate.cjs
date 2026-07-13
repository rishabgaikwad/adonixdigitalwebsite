const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  if (!content.includes('notranslate')) {
    content = content.replace('<head>', '<head>\n    <meta name="google" content="notranslate">');
    fs.writeFileSync(file, content);
    console.log(`Added notranslate to ${file}`);
  }
});

// also check stable_scrollytelling_backup
const backupDir = path.join(__dirname, 'stable_scrollytelling_backup');
if (fs.existsSync(backupDir)) {
  const backupFiles = fs.readdirSync(backupDir).filter(f => f.endsWith('.html'));
  backupFiles.forEach(file => {
    let filePath = path.join(backupDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    if (!content.includes('notranslate')) {
      content = content.replace('<head>', '<head>\n    <meta name="google" content="notranslate">');
      fs.writeFileSync(filePath, content);
      console.log(`Added notranslate to ${filePath}`);
    }
  });
}
