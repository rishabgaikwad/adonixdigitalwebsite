const fs = require('fs');
const content = fs.readFileSync('c:/Users/rishab/adonixdigital/src/main.js', 'utf8');

content.split('\n').forEach((l, i) => {
  if (l.includes('new THREE.Mesh(') || l.includes('new THREE.InstancedMesh(') || l.includes('new THREE.Points(') || l.includes('new THREE.Line')) {
    console.log(`${i+1}: ${l.trim()}`);
  }
});
