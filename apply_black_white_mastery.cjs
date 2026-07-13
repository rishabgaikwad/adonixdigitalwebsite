const fs = require('fs');

// 1. Update src/style.css for Pure Black (#000000) Backgrounds
const cssPath = 'c:/Users/rishab/adonixdigital/src/style.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

cssContent = cssContent.replace(/--bg-dark-pure:\s*#[0-9a-fA-F]+;/g, '--bg-dark-pure: #000000;');
cssContent = cssContent.replace(/--bg-dark-deep:\s*#[0-9a-fA-F]+;/g, '--bg-dark-deep: #000000;');
cssContent = cssContent.replace(/--bg-dark-card:\s*rgba\([^)]+\);/g, '--bg-dark-card: rgba(8, 8, 8, 0.7);');
cssContent = cssContent.replace(/background:\s*radial-gradient\(circle at center,\s*#[0-9a-fA-F]+\s*0%,\s*#[0-9a-fA-F]+\s*100%\);/g, 'background: #000000 !important;');

fs.writeFileSync(cssPath, cssContent);
console.log('✅ Updated style.css to Pure Black background.');

// 2. Update src/main.js for Pure Brilliant White/Silver Particles & Animations
const jsPath = 'c:/Users/rishab/adonixdigital/src/main.js';
let jsContent = fs.readFileSync(jsPath, 'utf8');

// A. Update Planet Shader Colors (Monochrome Platinum & Diamond White)
jsContent = jsContent.replace(/vec3 colObsidian\s*=\s*vec3\([^)]+\);/g, 'vec3 colObsidian = vec3(0.0, 0.0, 0.0);');
jsContent = jsContent.replace(/vec3 colAmber\s*=\s*vec3\([^)]+\);/g, 'vec3 colAmber = vec3(0.18, 0.18, 0.20);');
jsContent = jsContent.replace(/vec3 colGold\s*=\s*vec3\([^)]+\);/g, 'vec3 colGold = vec3(0.75, 0.78, 0.82);');
jsContent = jsContent.replace(/vec3 colChampagne\s*=\s*vec3\([^)]+\);/g, 'vec3 colChampagne = vec3(1.0, 1.0, 1.0);');
jsContent = jsContent.replace(/vec3 colAIBlue\s*=\s*vec3\([^)]+\);/g, 'vec3 colAIBlue = vec3(0.88, 0.95, 1.0);');

// B. Update Rim Halo Color
jsContent = jsContent.replace(/mix\(vec3\(0\.83,\s*0\.69,\s*0\.22\),\s*vec3\(0\.29,\s*0\.55,\s*1\.0\),\s*0\.3\)/g, 'vec3(0.9, 0.95, 1.0)');

// C. Update Ring Colors
jsContent = jsContent.replace(/mix\(vec3\(0\.83,\s*0\.69,\s*0\.22\),\s*vec3\(0\.29,\s*0\.55,\s*1\.0\),\s*u_flare\s*\*\s*0\.5\)/g, 'mix(vec3(0.7, 0.75, 0.8), vec3(1.0, 1.0, 1.0), u_flare * 0.5)');
jsContent = jsContent.replace(/mix\(ringColor,\s*vec3\(1\.0,\s*0\.95,\s*0\.8\),\s*smoothstep/g, 'mix(ringColor, vec3(1.0, 1.0, 1.0), smoothstep');

// D. Update Asteroid Debris Belt Material
jsContent = jsContent.replace(/color:\s*0xd4af37,\s*emissive:\s*0x4a8cff/g, 'color: 0xffffff, emissive: 0xcccccc');

// E. Update Starlight Dust Field Colors (Pure White & Platinum)
jsContent = jsContent.replace(/dustColors\[i\*3\]\s*=\s*0\.83;\s*dustColors\[i\*3\+1\]\s*=\s*0\.69;\s*dustColors\[i\*3\+2\]\s*=\s*0\.22;/g, 'dustColors[i*3] = 1.0; dustColors[i*3+1] = 1.0; dustColors[i*3+2] = 1.0;');
jsContent = jsContent.replace(/dustColors\[i\*3\]\s*=\s*0\.29;\s*dustColors\[i\*3\+1\]\s*=\s*0\.55;\s*dustColors\[i\*3\+2\]\s*=\s*1\.0;/g, 'dustColors[i*3] = 0.85; dustColors[i*3+1] = 0.9; dustColors[i*3+2] = 0.95;');

// F. Update Topological Intelligence Network Colors
jsContent = jsContent.replace(/color:\s*0x59F3FF/g, 'color: 0xffffff');
jsContent = jsContent.replace(/color:\s*0x2266CC/g, 'color: 0xaaaaaa');

fs.writeFileSync(jsPath, jsContent);
console.log('✅ Updated main.js to Pure White & Silver particles and animations.');
