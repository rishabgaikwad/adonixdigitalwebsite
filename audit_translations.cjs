const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/rishab/adonixdigital';
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const htmlKeys = new Set();
htmlFiles.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const regex = /data-translate="([^"]+)"/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    htmlKeys.add(match[1]);
  }
});

const jsContent = fs.readFileSync(path.join(dir, 'src', 'main.js'), 'utf8');

function extractKeys(blockName) {
  // Simplistic extraction based on "blockName: {" to the next "},"
  const blockRegex = new RegExp(`${blockName}:\\s*\\{([\\s\\S]*?)\\n  \\}`, 'm');
  const match = blockRegex.exec(jsContent);
  if (!match) return new Set();
  
  const block = match[1];
  const keyRegex = /^\s*([a-zA-Z0-9_]+)\s*:/gm;
  const keys = new Set();
  let kMatch;
  while ((kMatch = keyRegex.exec(block)) !== null) {
    keys.add(kMatch[1]);
  }
  return keys;
}

const enKeys = extractKeys('en');
const arKeys = extractKeys('ar');

let errors = 0;

console.log('--- TRANSLATION AUDIT ---');

const missingEn = [...htmlKeys].filter(k => !enKeys.has(k));
if (missingEn.length > 0) {
  console.log('❌ Keys in HTML missing in English dictionary:');
  console.log(missingEn);
  errors++;
} else {
  console.log('✅ All HTML keys found in English dictionary.');
}

const missingAr = [...htmlKeys].filter(k => !arKeys.has(k));
if (missingAr.length > 0) {
  console.log('❌ Keys in HTML missing in Arabic dictionary:');
  console.log(missingAr);
  errors++;
} else {
  console.log('✅ All HTML keys found in Arabic dictionary.');
}

const arMissingEn = [...enKeys].filter(k => !arKeys.has(k));
if (arMissingEn.length > 0) {
  console.log('❌ Keys in English dict missing in Arabic dict:');
  console.log(arMissingEn);
  errors++;
} else {
  console.log('✅ Arabic dictionary matches all English keys.');
}

if (errors === 0) {
  console.log('🎉 Translation Audit Passed! No missing translations.');
}
