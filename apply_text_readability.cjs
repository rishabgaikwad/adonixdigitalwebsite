const fs = require('fs');

const cssPath = 'c:/Users/rishab/adonixdigital/src/style.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

// 1. Update Typography Shadows and Weights
// Apply strong multi-layered text-shadow to main headings
if (!cssContent.includes('text-shadow: 0px 4px 24px rgba(0, 0, 0, 0.9)')) {
  cssContent = cssContent.replace(
    /\.main-headline\s*\{/g, 
    '.main-headline {\n  text-shadow: 0px 4px 24px rgba(0, 0, 0, 0.9), 0px 2px 4px rgba(0, 0, 0, 0.6);'
  );
  cssContent = cssContent.replace(
    /\.subheadline\s*\{/g, 
    '.subheadline {\n  font-weight: 500;\n  text-shadow: 0px 2px 12px rgba(0, 0, 0, 0.8), 0px 1px 2px rgba(0, 0, 0, 0.6);'
  );
  
  // Add generic heading shadows
  const headingShadow = `
h1, h2, h3, h4, h5, h6 {
  text-shadow: 0px 4px 24px rgba(0, 0, 0, 0.9), 0px 2px 4px rgba(0, 0, 0, 0.6);
}`;
  if (!cssContent.includes(headingShadow.trim())) {
    cssContent += headingShadow;
  }
}

// 2. Deepen Glassmorphism for better background contrast
cssContent = cssContent.replace(
  /--glass-bg:\s*rgba\(255,\s*255,\s*255,\s*0\.03\);/g,
  '--glass-bg: rgba(5, 5, 5, 0.6); /* Deepened for readability */'
);

cssContent = cssContent.replace(
  /--glass-blur:\s*blur\(16px\);/g,
  '--glass-blur: blur(24px); /* Stronger blur for readability */'
);

// If there are other hardcoded glass backgrounds, deepen them
cssContent = cssContent.replace(
  /background:\s*rgba\(255,\s*255,\s*255,\s*0\.05\);/g,
  'background: rgba(8, 8, 8, 0.65);'
);
cssContent = cssContent.replace(
  /background:\s*rgba\(255,\s*255,\s*255,\s*0\.02\);/g,
  'background: rgba(5, 5, 5, 0.7);'
);
cssContent = cssContent.replace(
  /background:\s*rgba\(255,\s*255,\s*255,\s*0\.04\);/g,
  'background: rgba(8, 8, 8, 0.65);'
);


fs.writeFileSync(cssPath, cssContent);
console.log('✅ Applied text readability enhancements to style.css');
