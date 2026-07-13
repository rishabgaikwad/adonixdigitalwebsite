const fs = require('fs');
const path = 'c:/Users/rishab/adonixdigital/src/main.js';
let content = fs.readFileSync(path, 'utf8');

// 1. Replace Objects (Lines 1061-1221 roughly)
const objStart = content.indexOf('// 1. Premium AI Core (Replacing the generic sphere)');
const objEnd = content.indexOf('// 2. Sprint 3B & 3C: Topological Intelligence Network');
if (objStart > -1 && objEnd > -1) {
  const newObjCode = `// 1. Premium AI Core (Replacing the generic sphere)
const aiCore = new THREE.Group();
groups.aiCore.add(aiCore);
sceneRefs.aiCore = aiCore;

// --- PLANET & RINGS (Saturn-Style) ---

// Procedural Shader for Planet (Amber/Gold Gas Giant Bands)
const planetGeo = new THREE.SphereGeometry(0.8, 64, 64);

const planetVertexShader = \`
  varying vec2 vUv;
  varying vec3 vNormal;
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
\`;

const planetFragmentShader = \`
  uniform float u_time;
  uniform float u_rimIntensity;
  varying vec2 vUv;
  varying vec3 vNormal;

  // Simple 2D noise
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
               mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
  }

  void main() {
    // Latitude-based banding
    float band = noise(vec2(vUv.y * 15.0, vUv.x * 2.0 + u_time * 0.05));
    float band2 = noise(vec2(vUv.y * 30.0, u_time * 0.02));
    
    vec3 colorDark = vec3(0.6, 0.4, 0.1); // Dark amber
    vec3 colorLight = vec3(0.9, 0.7, 0.3); // Warm gold
    vec3 baseColor = mix(colorDark, colorLight, band * 0.7 + band2 * 0.3);

    // Rim lighting (Atmosphere glow)
    float rim = 1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0);
    rim = smoothstep(0.6, 1.0, rim);
    vec3 rimColor = vec3(1.0, 0.8, 0.5) * rim * u_rimIntensity;

    gl_FragColor = vec4(baseColor + rimColor, 1.0);
  }
\`;

const planetMat = new THREE.ShaderMaterial({
  vertexShader: planetVertexShader,
  fragmentShader: planetFragmentShader,
  uniforms: {
    u_time: { value: 0 },
    u_rimIntensity: { value: 1.2 }
  }
});

const planet = new THREE.Mesh(planetGeo, planetMat);
aiCore.add(planet);
sceneRefs.planet = planet;
sceneRefs.planetMat = planetMat;

// Procedural Rings
const ringGeo = new THREE.RingGeometry(1.1, 2.2, 64);
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
    // Rings from 1.1 to 2.2
    float normDist = (dist - 1.1) / 1.1; 
    
    // Create dust bands and gaps
    float alpha = sin(normDist * 30.0) * 0.5 + 0.5;
    alpha *= sin(normDist * 15.0) * 0.5 + 0.5;
    
    // Main gap
    if (normDist > 0.6 && normDist < 0.65) alpha *= 0.1;
    if (normDist > 0.85 && normDist < 0.9) alpha *= 0.2;
    
    // Fade at edges
    alpha *= smoothstep(0.0, 0.1, normDist) * smoothstep(1.0, 0.9, normDist);
    
    vec3 ringColor = mix(vec3(0.8, 0.7, 0.5), vec3(1.0, 0.9, 0.7), u_flare);
    gl_FragColor = vec4(ringColor, alpha * (0.6 + u_flare * 0.4));
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
// Start nearly edge-on
rings.rotation.x = Math.PI / 2 - 0.05; 
aiCore.add(rings);
sceneRefs.rings = rings;
sceneRefs.ringMat = ringMat;

aiCore.scale.set(0.5, 0.5, 0.5);

`;
  content = content.substring(0, objStart) + newObjCode + content.substring(objEnd);
}

// 2. Remove legacy update calls in UpdatePipeline
content = content.replace(/UpdatePipeline\.updatePulse.*?\n/g, 'const pulseVal=0;\n');
content = content.replace(/UpdatePipeline\.updateCore.*?\n/g, '');
content = content.replace(/UpdatePipeline\.updateParticles.*?\n/g, '');
content = content.replace(/UpdatePipeline\.updateStreams.*?\n/g, '');

// 3. Replace GSAP Timeline
const tlStart = content.indexOf('// Chapter 2 Transition: AI Core Wakes Up');
const tlEnd = content.indexOf('// Trigger results counters');
if (tlStart > -1 && tlEnd > -1) {
  const newTlCode = `// Hero (0-0.1): planet distant and small, rings nearly edge-on/closed, camera pushes in as scroll starts.
main3DTimeline.to(aiCore.scale, { x: 0.8, y: 0.8, z: 0.8 }, 0)
  .to(camera.position, { z: 4.5 }, 0)
  
// Services (0.1-0.25): rings open up to full tilt, planet scales up slightly.
  .to(sceneRefs.rings.rotation, { x: Math.PI / 2 - 0.4 }, 0.1)
  .to(aiCore.scale, { x: 1.0, y: 1.0, z: 1.0 }, 0.1)

// AI (0.25-0.4): camera orbits partway around the planet, revealing the ring's far side.
  .to(aiCore.rotation, { y: Math.PI * 0.5 }, 0.25)
  .to(camera.position, { x: 1.0, z: 3.5 }, 0.25)

// Results (0.4-0.55): closer zoom, rim-light glow intensifies, ring catches highlight.
  .to(camera.position, { x: 0.5, z: 2.5 }, 0.4)
  .to(sceneRefs.planetMat.uniforms.u_rimIntensity, { value: 2.5 }, 0.4)
  .to(sceneRefs.ringMat.uniforms.u_flare, { value: 0.5 }, 0.4)

// Industries/Cases (0.55-0.75): planet drifts to one side of the screen
  .to(aiCore.position, { x: 1.2 }, 0.55)
  .to(aiCore.scale, { x: 0.8, y: 0.8, z: 0.8 }, 0.55)
  
// Why-us/Testimonials (0.75-0.9): gentle pulsing glow / light flare pass across the rings.
  .to(sceneRefs.ringMat.uniforms.u_flare, { value: 1.0 }, 0.75)
  .to(sceneRefs.ringMat.uniforms.u_flare, { value: 0.0 }, 0.85)

// Process/Contact (0.9-1.0): planet recedes and fades slightly, camera pulls back for a closing feel.
  .to(aiCore.position, { x: 0, y: 0.5, z: -2 }, 0.9)
  .to(camera.position, { x: 0, z: 6 }, 0.9)
  .to(sceneRefs.planetMat.uniforms.u_rimIntensity, { value: 0.5 }, 0.9);

`;
  content = content.substring(0, tlStart) + newTlCode + content.substring(tlEnd);
}

// 4. Update tick() 
const tickStart = content.indexOf("if (typeof aiCore !== 'undefined') {");
const tickEnd = content.indexOf('particleSystem.rotation.y = elapsedTime * 0.02;');
if (tickStart > -1 && tickEnd > -1) {
  const newTickCode = `if (typeof aiCore !== 'undefined') {
      // Continuous slow self-rotation on the planet's axis
      if (sceneRefs.planet) {
        sceneRefs.planet.rotation.y = elapsedTime * 0.05;
        sceneRefs.planetMat.uniforms.u_time.value = elapsedTime;
      }
      // Slower independent ring rotation
      if (sceneRefs.rings) {
        sceneRefs.rings.rotation.z = elapsedTime * -0.02;
      }
    }

    `;
  content = content.substring(0, tickStart) + newTickCode + content.substring(tickEnd);
}

fs.writeFileSync(path, content);
console.log('Update complete.');
