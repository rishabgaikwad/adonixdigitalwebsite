const fs = require('fs');

const jsPath = 'c:/Users/rishab/adonixdigital/src/main.js';
let jsContent = fs.readFileSync(jsPath, 'utf8');

// 1. Fix backgroundMesh shader in main.js (remove navy/violet/blue background plane)
jsContent = jsContent.replace(/vec3 color1\s*=\s*vec3\([^)]+\);/g, 'vec3 color1 = vec3(0.0, 0.0, 0.0); // True Obsidian Black');
jsContent = jsContent.replace(/vec3 color2\s*=\s*vec3\([^)]+\);/g, 'vec3 color2 = vec3(0.008, 0.008, 0.008); // Barely perceptible charcoal wave');
jsContent = jsContent.replace(/vec3 color3\s*=\s*vec3\([^)]+\);/g, 'vec3 color3 = vec3(0.0, 0.0, 0.0); // Pure void');
jsContent = jsContent.replace(/vec3 color4\s*=\s*vec3\([^)]+\);/g, 'vec3 color4 = vec3(0.004, 0.004, 0.004); // Deep black');
jsContent = jsContent.replace(/color\s*\+=\s*vec3\(0\.0,\s*0\.02,\s*0\.04\)/g, 'color += vec3(0.01, 0.01, 0.01)');

// 2. Fix Planet Sphere Colors so it is NEVER dark/empty in the middle!
jsContent = jsContent.replace(/vec3 colObsidian\s*=\s*vec3\([^)]+\);/g, 'vec3 colObsidian = vec3(0.25, 0.28, 0.32); // Shimmering platinum charcoal');
jsContent = jsContent.replace(/vec3 colAmber\s*=\s*vec3\([^)]+\);/g, 'vec3 colAmber = vec3(0.55, 0.60, 0.68); // Pearl silver');
jsContent = jsContent.replace(/vec3 colGold\s*=\s*vec3\([^)]+\);/g, 'vec3 colGold = vec3(0.85, 0.88, 0.92); // Bright silver');
jsContent = jsContent.replace(/vec3 colChampagne\s*=\s*vec3\([^)]+\);/g, 'vec3 colChampagne = vec3(1.0, 1.0, 1.0); // Pure diamond white');
jsContent = jsContent.replace(/vec3 colAIBlue\s*=\s*vec3\([^)]+\);/g, 'vec3 colAIBlue = vec3(0.92, 0.96, 1.0); // Ice white aurora');

// Boost diffuse lighting on planet sphere so center is always brightly lit
jsContent = jsContent.replace(/float diff\s*=\s*max\(dot\(vNormal,\s*lightDir\),\s*0\.15\);/g, 'float diff = max(dot(vNormal, lightDir), 0.45); // Always bright and visible across entire sphere');

// Also check if there was any other diffuse setting
jsContent = jsContent.replace(/float diff\s*=\s*max\(dot\(vNormal,\s*lightDir\),\s*[0-9.]+\);/g, 'float diff = max(dot(vNormal, lightDir), 0.45);');

fs.writeFileSync(jsPath, jsContent);
console.log('✅ Fixed backgroundMesh to pure black and brightened Saturn sphere to platinum/white.');
