const fs = require('fs');
const path = 'c:/Users/rishab/adonixdigital/src/main.js';
let content = fs.readFileSync(path, 'utf8');

// 1. Update Imports (Add EffectComposer & passes, remove saturnTexUrl if needed)
if (!content.includes('import { EffectComposer }')) {
  content = content.replace(
    "import Lenis from 'lenis';",
    `import Lenis from 'lenis';\nimport { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';\nimport { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';\nimport { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';`
  );
}

// 2. Add Post-Processing to Renderer Setup
const rendererSetupTarget = `sceneRefs.renderer = renderer;`;
if (content.includes(rendererSetupTarget) && !content.includes('const composer = new EffectComposer')) {
  const composerCode = `sceneRefs.renderer = renderer;

// --- CINEMATIC POST-PROCESSING (Bloom & Atmosphere Glow) ---
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.45, // Bloom strength (luxurious cinematic glow)
  0.3,  // Bloom radius
  0.65  // Bloom threshold (only glow bright rims, rings, and dust crystals)
);
composer.addPass(bloomPass);
sceneRefs.composer = composer;`;
  content = content.replace(rendererSetupTarget, composerCode);
}

// Update ResizeManager for composer
const resizeTarget = `if (camera.type === 'PerspectiveCamera') {
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }`;
if (content.includes(resizeTarget) && !content.includes('if (sceneRefs.composer)')) {
  content = content.replace(resizeTarget, `${resizeTarget}\n  if (sceneRefs.composer) sceneRefs.composer.setSize(w, h);`);
}

// Update tick() for composer
const renderTarget = `renderer.render(scene, camera);`;
if (content.includes(renderTarget) && !content.includes('if (sceneRefs.composer) sceneRefs.composer.render();')) {
  content = content.replace(renderTarget, `if (sceneRefs.composer) {\n    sceneRefs.composer.render();\n  } else {\n    renderer.render(scene, camera);\n  }`);
}

// 3. Replace Planet & Rings Block with Masterpiece Procedural System
const pStartStr = '// --- PLANET & RINGS (Saturn-Style) ---';
const pEndStr = '// 2. Sprint 3B & 3C: Topological Intelligence Network';
const pStart = content.indexOf(pStartStr);
const pEnd = content.indexOf(pEndStr);

if (pStart !== -1 && pEnd !== -1) {
  const masterpieceObj = `// --- PLANET & RINGS (Saturn-Style) ---

// 1. MASTERPIECE PROCEDURAL GAS GIANT (Swirling Simplex Storms + Luxury Palette)
const planetGeo = new THREE.SphereGeometry(1, 128, 128); // High-res for seamless shader detail

const planetShader = {
  vertexShader: \`
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  \`,
  fragmentShader: \`
    uniform float u_time;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;

    // Simplex noise helper
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 = v - i + dot(i, C.xxx) ;
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i); 
      vec4 p = permute( permute( permute( 
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      float n_ = 0.142857142857;
      vec3  ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z.xxxx);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      // Swirling bands coordinate
      vec3 coord = vPosition * 2.5;
      float n1 = snoise(vec3(coord.x, coord.y * 5.0 + u_time * 0.08, coord.z));
      float n2 = snoise(vec3(coord.x * 2.0 - u_time * 0.05, coord.y * 12.0, coord.z * 2.0));
      
      float band = sin(vPosition.y * 15.0 + n1 * 1.5 + n2 * 0.5) * 0.5 + 0.5;
      
      // Luxury Color Palette (Adonix Brand: Obsidian #0b1020, Gold #d4af37, Electric Blue #4a8cff)
      vec3 colObsidian = vec3(0.04, 0.06, 0.12);
      vec3 colAmber = vec3(0.72, 0.56, 0.12);
      vec3 colGold = vec3(0.83, 0.69, 0.22);
      vec3 colChampagne = vec3(0.98, 0.94, 0.80);
      vec3 colAIBlue = vec3(0.29, 0.55, 1.0);

      vec3 surfaceColor = mix(colObsidian, colAmber, smoothstep(0.1, 0.5, band));
      surfaceColor = mix(surfaceColor, colGold, smoothstep(0.5, 0.85, band));
      surfaceColor = mix(surfaceColor, colChampagne, smoothstep(0.85, 0.98, band));

      // Add subtle polar aurora blue storms at top and bottom
      float polar = smoothstep(0.6, 1.0, abs(vPosition.y));
      surfaceColor = mix(surfaceColor, colAIBlue, polar * (0.5 + 0.5 * sin(u_time + vPosition.x * 10.0)));

      // 3D Lighting & Fresnel Rim Glow
      vec3 lightDir = normalize(vec3(5.0, 3.0, 5.0));
      float diff = max(dot(vNormal, lightDir), 0.15); // Never pure black
      
      float fresnel = 1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0);
      fresnel = pow(fresnel, 3.0);
      vec3 rimColor = mix(colGold, colAIBlue, 0.3) * fresnel * 2.5;

      gl_FragColor = vec4(surfaceColor * diff + rimColor, 1.0);
    }
  \`,
  uniforms: {
    u_time: { value: 0 }
  }
};

const planetMat = new THREE.ShaderMaterial(planetShader);
const planet = new THREE.Mesh(planetGeo, planetMat);
aiCore.add(planet);
sceneRefs.planet = planet;
sceneRefs.planetShader = planetShader;

// Increase studio lighting for debris shimmer
const dirLight2 = new THREE.DirectionalLight(0xfff5e6, 2.5);
dirLight2.position.set(5, 3, 5);
scene.add(dirLight2);

const ambientLight2 = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight2);

// 2. MULTI-LAYERED VOLUMETRIC RINGS & INSTANCED DEBRIS BELT
const ringGeo = new THREE.RingGeometry(1.4, 2.8, 128);
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
  uniform float u_time;
  varying vec2 vUv;
  varying vec3 vPos;
  void main() {
    float dist = length(vPos);
    float normDist = (dist - 1.4) / 1.4; 
    
    float alpha = sin(normDist * 40.0) * 0.5 + 0.5;
    alpha *= sin(normDist * 15.0 + u_time * 0.2) * 0.5 + 0.5;
    
    if (normDist > 0.55 && normDist < 0.6) alpha *= 0.05; // Cassini division gap
    if (normDist > 0.8 && normDist < 0.85) alpha *= 0.1;
    
    alpha *= smoothstep(0.0, 0.08, normDist) * smoothstep(1.0, 0.88, normDist);
    
    vec3 ringColor = mix(vec3(0.83, 0.69, 0.22), vec3(0.29, 0.55, 1.0), u_flare * 0.5);
    ringColor = mix(ringColor, vec3(1.0, 0.95, 0.8), smoothstep(0.4, 0.5, normDist) * u_flare);
    
    gl_FragColor = vec4(ringColor, alpha * (0.6 + u_flare * 0.6));
  }
\`;
const ringMat = new THREE.ShaderMaterial({
  vertexShader: ringVertexShader,
  fragmentShader: ringFragmentShader,
  uniforms: {
    u_flare: { value: 0 },
    u_time: { value: 0 }
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

// --- INSTANCED ASTEROID DEBRIS BELT (1,500 Shimmering Crystals) ---
const debrisCount = 1500;
const debrisGeo = new THREE.OctahedronGeometry(0.015, 0);
const debrisMat = new THREE.MeshStandardMaterial({
  color: 0xd4af37,
  emissive: 0x4a8cff,
  emissiveIntensity: 0.3,
  roughness: 0.3,
  metalness: 0.8
});
const debrisBelt = new THREE.InstancedMesh(debrisGeo, debrisMat, debrisCount);
const dummy = new THREE.Object3D();

for(let i = 0; i < debrisCount; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 1.45 + Math.random() * 1.3;
  const height = (Math.random() - 0.5) * 0.08;
  dummy.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
  dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
  const scale = 0.5 + Math.random() * 1.5;
  dummy.scale.set(scale, scale, scale);
  dummy.updateMatrix();
  debrisBelt.setMatrixAt(i, dummy.matrix);
}
rings.add(debrisBelt);
sceneRefs.debrisBelt = debrisBelt;

// 3. DEEP SPACE STARLIGHT & DUST FIELD (2,000 Floating Particles)
const dustCount = 2000;
const dustGeo = new THREE.BufferGeometry();
const dustPositions = new Float32Array(dustCount * 3);
const dustColors = new Float32Array(dustCount * 3);

for(let i = 0; i < dustCount; i++) {
  dustPositions[i*3] = (Math.random() - 0.5) * 25;
  dustPositions[i*3+1] = (Math.random() - 0.5) * 25;
  dustPositions[i*3+2] = (Math.random() - 0.5) * 25;

  // Mix of luxury gold and AI cyan starlight
  if (Math.random() > 0.3) {
    dustColors[i*3] = 0.83; dustColors[i*3+1] = 0.69; dustColors[i*3+2] = 0.22; // Gold
  } else {
    dustColors[i*3] = 0.29; dustColors[i*3+1] = 0.55; dustColors[i*3+2] = 1.0;  // AI Blue
  }
}
dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
dustGeo.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));

const dustMat = new THREE.PointsMaterial({
  size: 0.04,
  vertexColors: true,
  transparent: true,
  opacity: 0.7,
  blending: THREE.AdditiveBlending
});
const spaceDust = new THREE.Points(dustGeo, dustMat);
scene.add(spaceDust);
sceneRefs.spaceDust = spaceDust;

aiCore.scale.set(0.5, 0.5, 0.5);

`;
  content = content.substring(0, pStart) + masterpieceObj + content.substring(pEnd);
}

// 4. Connect shader time uniform and dust rotation in tick()
const tickTarget = `uniforms.u_time.value = elapsedTime;`;
if (content.includes(tickTarget) && !content.includes('if (sceneRefs.planetShader)')) {
  content = content.replace(tickTarget, 
    `${tickTarget}\n  if (sceneRefs.planetShader) sceneRefs.planetShader.uniforms.u_time.value = elapsedTime;\n  if (sceneRefs.ringMat) sceneRefs.ringMat.uniforms.u_time.value = elapsedTime;\n  if (sceneRefs.spaceDust) sceneRefs.spaceDust.rotation.y = elapsedTime * 0.01;`
  );
}

fs.writeFileSync(path, content);
console.log('Masterpiece Update Complete.');
