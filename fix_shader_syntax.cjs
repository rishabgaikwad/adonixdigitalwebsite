const fs = require('fs');
const path = 'c:/Users/rishab/adonixdigital/src/main.js';
let content = fs.readFileSync(path, 'utf8');

// Fix GLSL swizzle bug in 3D simplex noise
if (content.includes('ns.z.xxxx')) {
  content = content.replace(/ns\.z\.xxxx/g, 'ns.zzzz');
  fs.writeFileSync(path, content);
  console.log('Shader syntax fixed (ns.z.xxxx -> ns.zzzz).');
} else {
  console.log('ns.z.xxxx not found.');
}
