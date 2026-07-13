const fs = require('fs');
const path = 'c:/Users/rishab/adonixdigital/src/main.js';
let content = fs.readFileSync(path, 'utf8');

// 1. Add import
if (!content.includes('import saturnTexUrl')) {
  content = content.replace("import Lenis from 'lenis';", "import Lenis from 'lenis';\nimport saturnTexUrl from './assets/saturn-reference.png';");
}

// 2. Add DirectionalLight
if (!content.includes('const dirLight')) {
  const lightTarget = `const ambientLight = new THREE.AmbientLight(0xffffff, ambIntensity);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(pointColor, pointIntensity, 20);
pointLight.position.set(2, 2, 2);
scene.add(pointLight);`;
  const lightReplacement = `const ambientLight = new THREE.AmbientLight(0xffffff, ambIntensity);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(pointColor, pointIntensity, 20);
pointLight.position.set(2, 2, 2);
scene.add(pointLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.position.set(5, 3, 5);
scene.add(dirLight);`;
  content = content.replace(lightTarget, lightReplacement);
}

// 3. Replace Planet & Rings Block
const startStr = '// --- PLANET & RINGS (Saturn-Style) ---';
const endStr = '// Atmosphere/Rim Light Glow';
const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr);
if (startIndex !== -1 && endIndex !== -1) {
  const newObj = `// --- PLANET & RINGS (Saturn-Style) ---

const planetGeo = new THREE.SphereGeometry(1, 64, 64);
const planetMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  emissive: 0x444433, // Warm pale gold base so it's never invisible
  emissiveIntensity: 0.2,
  roughness: 0.8,
  metalness: 0.1
});

// Load the texture safely with logging and fallback
const textureLoader = new THREE.TextureLoader();
textureLoader.load(
  saturnTexUrl,
  (texture) => {
    console.log('✅ Saturn texture loaded successfully!');
    texture.colorSpace = THREE.SRGBColorSpace;
    planetMat.map = texture;
    planetMat.needsUpdate = true;
  },
  undefined,
  (err) => {
    console.error('❌ Failed to load Saturn texture:', err);
    // Fallback is already handled by the base emissive color
  }
);

const planet = new THREE.Mesh(planetGeo, planetMat);
aiCore.add(planet);
sceneRefs.planet = planet;

`;
  content = content.substring(0, startIndex) + newObj + content.substring(endIndex);
}

// 4. Update the GSAP timeline
const tlStartStr = 'const main3DTimeline = gsap.timeline({';
const tlEndStr = '// Trigger results counters & bars animation when reaching results section';
const tlStart = content.indexOf(tlStartStr);
const tlEnd = content.indexOf(tlEndStr);

if (tlStart !== -1 && tlEnd !== -1) {
  const newTl = `const main3DTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".scroll-container",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  }
});

// 0 – 0.08 (Hero, on-load state): distant/small, rings nearly edge-on
main3DTimeline.to(aiCore.scale, { x: 0.6, y: 0.6, z: 0.6 }, 0)
  .to(camera.position, { x: 0, z: 5.5 }, 0)
  .to(sceneRefs.rings.rotation, { x: Math.PI / 2 - 0.02 }, 0)
  
// 0.08 – 0.22 (Hero → Services): camera pushes in continuously, rings smoothly open, planet scales up
  .to(camera.position, { z: 4.0 }, 0.08)
  .to(aiCore.scale, { x: 1.0, y: 1.0, z: 1.0 }, 0.22)
  .to(sceneRefs.rings.rotation, { x: Math.PI / 2 - 0.4 }, 0.22)
  .to(camera.position, { z: 3.2 }, 0.22)

// 0.22 – 0.35 (Services): orbit partway, revealing far side
  .to(camera.position, { x: 1.5, z: 2.8 }, 0.35)
  .to(aiCore.rotation, { y: Math.PI * 0.4 }, 0.35)
  .to(sceneRefs.rimMat.uniforms.u_rimIntensity, { value: 2.5 }, 0.35) // rim intensifies

// 0.35 – 0.48 (AI section): drifts to side, scales slightly
  .to(aiCore.position, { x: 1.2 }, 0.48)
  .to(aiCore.scale, { x: 0.85, y: 0.85, z: 0.85 }, 0.48)
  .to(sceneRefs.ringMat.uniforms.u_flare, { value: 0.6 }, 0.48)

// 0.48 – 0.6 (Results): closer zoom
  .to(camera.position, { x: 2.0, z: 2.5 }, 0.6)
  .to(sceneRefs.ringMat.uniforms.u_flare, { value: 0.8 }, 0.6)

// 0.6 – 0.75 (Industries/Cases): screen-edge position, slight tilt
  .to(aiCore.position, { x: 1.5 }, 0.75)
  .to(sceneRefs.rings.rotation, { x: Math.PI / 2 - 0.3 }, 0.75)

// 0.75 – 0.88 (Why-us/Testimonials): flare sweep
  .to(sceneRefs.ringMat.uniforms.u_flare, { value: 1.2 }, 0.80)
  .to(sceneRefs.ringMat.uniforms.u_flare, { value: 0.2 }, 0.88)

// 0.88 – 1.0 (Process/Contact): recedes, fades slightly, camera pulls back
  .to(aiCore.position, { x: 0, y: 0.5, z: -2 }, 1.0)
  .to(camera.position, { x: 0, z: 6 }, 1.0)
  .to(sceneRefs.rimMat.uniforms.u_rimIntensity, { value: 0.5 }, 1.0);

`;
  content = content.substring(0, tlStart) + newTl + content.substring(tlEnd);
}

fs.writeFileSync(path, content);
console.log('Update Complete.');
