const fs = require('fs');
const path = 'c:/Users/rishab/adonixdigital/src/main.js';
let content = fs.readFileSync(path, 'utf8');

// 1. Replace Object Generation
const startStr = '// --- PLANET & RINGS (Saturn-Style) ---';
const endStr = '// 2. Sprint 3B & 3C: Topological Intelligence Network';
const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr);
if(startIndex !== -1 && endIndex !== -1) {
  const newObj = `// --- PLANET & RINGS (Saturn-Style) ---

// Procedural Texture for Bands
function createPlanetTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  
  for(let y=0; y<256; y++) {
    const v = y / 255.0;
    const noise = Math.sin(v * 20.0) * 0.4 + Math.sin(v * 45.0) * 0.3 + Math.sin(v * 100.0) * 0.1;
    const r = Math.min(255, Math.floor(220 + noise * 15)); 
    const g = Math.min(255, Math.floor(226 + noise * 12)); 
    const b = Math.min(255, Math.floor(205 + noise * 8));  
    ctx.fillStyle = \`rgb(\${r},\${g},\${b})\`;
    ctx.fillRect(0, y, 1, 1);
  }
  return new THREE.CanvasTexture(canvas);
}

const planetGeo = new THREE.SphereGeometry(1, 64, 64);
const planetMat = new THREE.MeshStandardMaterial({
  map: createPlanetTexture(),
  color: 0xffffff,
  emissive: 0x555540,
  emissiveIntensity: 0.25,
  roughness: 0.7,
  metalness: 0.1
});

const planet = new THREE.Mesh(planetGeo, planetMat);
aiCore.add(planet);
sceneRefs.planet = planet;

// Atmosphere/Rim Light Glow
const rimGeo = new THREE.SphereGeometry(1.04, 64, 64);
const rimMat = new THREE.ShaderMaterial({
  vertexShader: \`
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  \`,
  fragmentShader: \`
    uniform float u_rimIntensity;
    varying vec3 vNormal;
    void main() {
      float rim = 1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0);
      rim = smoothstep(0.5, 1.0, rim);
      vec3 rimColor = vec3(1.0, 0.85, 0.5) * rim * u_rimIntensity; 
      gl_FragColor = vec4(rimColor, rim * 0.5 * u_rimIntensity);
    }
  \`,
  uniforms: {
    u_rimIntensity: { value: 1.5 }
  },
  transparent: true,
  blending: THREE.AdditiveBlending,
  side: THREE.BackSide,
  depthWrite: false
});
const rimMesh = new THREE.Mesh(rimGeo, rimMat);
planet.add(rimMesh);
sceneRefs.rimMat = rimMat;

// Procedural Rings
const ringGeo = new THREE.RingGeometry(1.4, 2.8, 64);
const ringVertexShader = \`
  varying vec2 vUv;
  varying vec3 vPos;
  void main() {
    vUv = uv;
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
\`;
const ringFragmentShader = \`
  uniform float u_flare;
  varying vec2 vUv;
  varying vec3 vPos;
  void main() {
    float dist = length(vPos);
    float normDist = (dist - 1.4) / 1.4; 
    
    float alpha = sin(normDist * 35.0) * 0.5 + 0.5;
    alpha *= sin(normDist * 18.0) * 0.5 + 0.5;
    
    if (normDist > 0.55 && normDist < 0.6) alpha *= 0.1;
    if (normDist > 0.8 && normDist < 0.85) alpha *= 0.2;
    
    alpha *= smoothstep(0.0, 0.1, normDist) * smoothstep(1.0, 0.9, normDist);
    
    vec3 ringColor = mix(vec3(0.9, 0.8, 0.6), vec3(1.0, 0.9, 0.5), u_flare);
    gl_FragColor = vec4(ringColor, alpha * (0.5 + u_flare * 0.5));
  }
\`;
const ringMat = new THREE.ShaderMaterial({
  vertexShader: ringVertexShader,
  fragmentShader: ringFragmentShader,
  uniforms: {
    u_flare: { value: 0 }
  },
  transparent: true,
  side: THREE.DoubleSide,
  depthWrite: false
});

const rings = new THREE.Mesh(ringGeo, ringMat);
rings.rotation.x = Math.PI / 2 - 0.02; 
aiCore.add(rings);
sceneRefs.rings = rings;
sceneRefs.ringMat = ringMat;

aiCore.scale.set(0.5, 0.5, 0.5);

`;
  content = content.substring(0, startIndex) + newObj + content.substring(endIndex);
}

// 2. Replace Timeline
const tlStartStr = '// Hero (0-0.1): planet distant and small, rings nearly edge-on/closed, camera pushes in as scroll starts.';
const tlEndStr = '// Trigger results counters & bars animation when reaching results section';
const tlStart = content.indexOf(tlStartStr);
const tlEnd = content.indexOf(tlEndStr);
if(tlStart !== -1 && tlEnd !== -1) {
  const newTl = `// 0: Initial state
main3DTimeline.to(aiCore.scale, { x: 0.6, y: 0.6, z: 0.6 }, 0)
  .to(camera.position, { x: 0, z: 5.5 }, 0)
  .to(sceneRefs.rings.rotation, { x: Math.PI / 2 - 0.02 }, 0)
  
// 0.05
  .to(camera.position, { z: 4.5 }, 0.05)
  .to(aiCore.scale, { x: 0.8, y: 0.8, z: 0.8 }, 0.05)
  .to(sceneRefs.rings.rotation, { x: Math.PI / 2 - 0.2 }, 0.05)
  
// 0.1: rings open up, planet scales up
  .to(aiCore.scale, { x: 1.0, y: 1.0, z: 1.0 }, 0.1)
  .to(sceneRefs.rings.rotation, { x: Math.PI / 2 - 0.4 }, 0.1)
  .to(camera.position, { x: 0.5, z: 3.5 }, 0.1)

// 0.15: start orbit
  .to(camera.position, { x: 1.0, z: 3.0 }, 0.15)
  .to(aiCore.rotation, { y: Math.PI * 0.2 }, 0.15)
  
// 0.2: middle of orbit
  .to(camera.position, { x: 1.5, z: 2.8 }, 0.2)
  .to(aiCore.rotation, { y: Math.PI * 0.4 }, 0.2)
  
// 0.25: end of orbit - z clamped to 2.5 to avoid clipping r=1 sphere
  .to(camera.position, { x: 2.0, z: 2.5 }, 0.25)
  .to(aiCore.rotation, { y: Math.PI * 0.6 }, 0.25)

// Results (0.4-0.55):
  .to(camera.position, { x: 1.5, z: 3.0 }, 0.4)
  .to(sceneRefs.rimMat.uniforms.u_rimIntensity, { value: 2.5 }, 0.4)
  .to(sceneRefs.ringMat.uniforms.u_flare, { value: 0.5 }, 0.4)

// Industries/Cases (0.55-0.75): planet drifts
  .to(aiCore.position, { x: 1.2 }, 0.55)
  .to(aiCore.scale, { x: 0.9, y: 0.9, z: 0.9 }, 0.55)
  
// Why-us/Testimonials (0.75-0.9): flare
  .to(sceneRefs.ringMat.uniforms.u_flare, { value: 1.0 }, 0.75)
  .to(sceneRefs.ringMat.uniforms.u_flare, { value: 0.0 }, 0.85)

// Process/Contact (0.9-1.0): closing
  .to(aiCore.position, { x: 0, y: 0.5, z: -2 }, 0.9)
  .to(camera.position, { x: 0, z: 6 }, 0.9)
  .to(sceneRefs.rimMat.uniforms.u_rimIntensity, { value: 0.5 }, 0.9);

`;
  content = content.substring(0, tlStart) + newTl + content.substring(tlEnd);
}

// 3. Fix tick function
content = content.replace('sceneRefs.planetMat.uniforms.u_time.value = elapsedTime;', '');

fs.writeFileSync(path, content);
console.log('Update Complete.');
