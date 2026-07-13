const fs = require('fs');

const cssPath = 'c:/Users/rishab/adonixdigital/src/style.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Fix the "embossed/black" text bug caused by combining transparent text with text-shadow

// 1. Fix .main-headline
cssContent = cssContent.replace(
  /background:\s*linear-gradient\(135deg,\s*#ffffff\s*0%,\s*#e2e8f0\s*50%,\s*#a0aec0\s*100%\);\s*-webkit-background-clip:\s*text;\s*-webkit-text-fill-color:\s*transparent;/g,
  'color: #ffffff;'
);

// 2. Fix .section-header h2
cssContent = cssContent.replace(
  /background:\s*linear-gradient\(180deg,\s*#ffffff\s*0%,\s*#a0aec0\s*100%\);\s*-webkit-background-clip:\s*text;\s*-webkit-text-fill-color:\s*transparent;/g,
  'color: #ffffff;'
);

// 3. Just in case there are any other instances
cssContent = cssContent.replace(
  /-webkit-background-clip:\s*text;\s*-webkit-text-fill-color:\s*transparent;/g,
  '/* Removed transparent text fill to fix shadow artifacts */'
);

fs.writeFileSync(cssPath, cssContent);
console.log('✅ Fixed CSS transparent text shadow artifact');
