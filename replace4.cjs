const fs = require('fs');
const path = 'c:/Users/rishab/adonixdigital/src/main.js';
let content = fs.readFileSync(path, 'utf8');

// 1. Update Planet Material and Lighting
const pStartStr = '// --- PLANET & RINGS (Saturn-Style) ---';
const pEndStr = '// Atmosphere/Rim Light Glow';
const pStart = content.indexOf(pStartStr);
const pEnd = content.indexOf(pEndStr);

if (pStart !== -1 && pEnd !== -1) {
  const newObj = `// --- PLANET & RINGS (Saturn-Style) ---

const planetGeo = new THREE.SphereGeometry(1, 64, 64);

// Create the material first with a fallback base color
const planetMat = new THREE.MeshStandardMaterial({
  color: 0xe6dfcc, // warm pale gold/sage base
  emissive: 0x666655, // ensures it's never completely dark
  emissiveIntensity: 0.4,
  roughness: 0.6,
  metalness: 0.1
});

// Load the texture safely with logging and fallback
const textureLoader = new THREE.TextureLoader();
textureLoader.load(
  saturnTexUrl,
  (texture) => {
    console.log('✅ Saturn texture loaded successfully!');
    texture.colorSpace = THREE.SRGBColorSpace;
    
    // Create a second sphere to overlay the texture so the solid base isn't lost if the texture has transparency
    const overlayMat = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      opacity: 0.9,
      roughness: 0.6,
      metalness: 0.1,
      emissive: 0x222222
    });
    const overlayMesh = new THREE.Mesh(planetGeo, overlayMat);
    overlayMesh.scale.set(1.005, 1.005, 1.005);
    planet.add(overlayMesh);
  },
  undefined,
  (err) => {
    console.error('❌ Failed to load Saturn texture:', err);
  }
);

const planet = new THREE.Mesh(planetGeo, planetMat);
aiCore.add(planet);
sceneRefs.planet = planet;

// Increase lighting to ensure the planet is visibly lit
const dirLight2 = new THREE.DirectionalLight(0xfff5e6, 2.0);
dirLight2.position.set(5, 3, 5);
scene.add(dirLight2);

const ambientLight2 = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambientLight2);

`;
  content = content.substring(0, pStart) + newObj + content.substring(pEnd);
}

// 2. Update GSAP Timeline to have explicit durations mapped perfectly to 0-1
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
    scrub: 1.0, // Smooth scrubbing
  }
});

// Set initial states explicitly at time 0
main3DTimeline.set(aiCore.scale, { x: 0.6, y: 0.6, z: 0.6 }, 0)
  .set(camera.position, { x: 0, y: 0, z: 5.5 }, 0)
  .set(sceneRefs.rings.rotation, { x: Math.PI / 2 - 0.02, y: 0, z: 0 }, 0)
  .set(aiCore.position, { x: 0, y: 0, z: 0 }, 0)
  .set(aiCore.rotation, { x: 0, y: 0, z: 0 }, 0)
  .set(sceneRefs.rimMat.uniforms.u_rimIntensity, { value: 1.5 }, 0)
  .set(sceneRefs.ringMat.uniforms.u_flare, { value: 0.0 }, 0);

// Continuous animation block mapped precisely to durations
// 0.0 -> 0.08 (Hero, on-load state): already set above. Just hold it or add a tiny drift
main3DTimeline.to(camera.position, { z: 5.2, duration: 0.08, ease: "none" }, 0);

// 0.08 -> 0.22 (Hero -> Services): push in, rings open, planet scales up (Duration: 0.14)
main3DTimeline.to(camera.position, { z: 3.2, duration: 0.14, ease: "power1.inOut" }, 0.08)
  .to(aiCore.scale, { x: 1.0, y: 1.0, z: 1.0, duration: 0.14, ease: "power1.inOut" }, 0.08)
  .to(sceneRefs.rings.rotation, { x: Math.PI / 2 - 0.4, duration: 0.14, ease: "power1.inOut" }, 0.08);

// 0.22 -> 0.35 (Services): orbit partway, rim intensifies (Duration: 0.13)
main3DTimeline.to(camera.position, { x: 1.5, z: 2.8, duration: 0.13, ease: "power1.inOut" }, 0.22)
  .to(aiCore.rotation, { y: Math.PI * 0.4, duration: 0.13, ease: "power1.inOut" }, 0.22)
  .to(sceneRefs.rimMat.uniforms.u_rimIntensity, { value: 2.5, duration: 0.13, ease: "none" }, 0.22);

// 0.35 -> 0.48 (AI section): drifts to side, scales slightly (Duration: 0.13)
main3DTimeline.to(aiCore.position, { x: 1.2, duration: 0.13, ease: "power1.inOut" }, 0.35)
  .to(aiCore.scale, { x: 0.85, y: 0.85, z: 0.85, duration: 0.13, ease: "power1.inOut" }, 0.35)
  .to(sceneRefs.ringMat.uniforms.u_flare, { value: 0.6, duration: 0.13, ease: "none" }, 0.35);

// 0.48 -> 0.60 (Results): closer zoom, flare (Duration: 0.12)
main3DTimeline.to(camera.position, { x: 2.0, z: 2.5, duration: 0.12, ease: "power1.inOut" }, 0.48)
  .to(sceneRefs.ringMat.uniforms.u_flare, { value: 0.8, duration: 0.12, ease: "none" }, 0.48);

// 0.60 -> 0.75 (Industries/Cases): screen-edge position, slight tilt (Duration: 0.15)
main3DTimeline.to(aiCore.position, { x: 1.5, duration: 0.15, ease: "power1.inOut" }, 0.60)
  .to(sceneRefs.rings.rotation, { x: Math.PI / 2 - 0.3, duration: 0.15, ease: "power1.inOut" }, 0.60)
  .to(aiCore.rotation, { y: Math.PI * 0.6, duration: 0.15, ease: "power1.inOut" }, 0.60);

// 0.75 -> 0.88 (Why-us/Testimonials): flare sweep (Duration: 0.13)
main3DTimeline.to(sceneRefs.ringMat.uniforms.u_flare, { value: 1.5, duration: 0.06, ease: "power1.in" }, 0.75)
  .to(sceneRefs.ringMat.uniforms.u_flare, { value: 0.2, duration: 0.07, ease: "power1.out" }, 0.81);

// 0.88 -> 1.0 (Process/Contact): recedes, fades slightly, camera pulls back (Duration: 0.12)
main3DTimeline.to(aiCore.position, { x: 0, y: 0.5, z: -2, duration: 0.12, ease: "power1.inOut" }, 0.88)
  .to(camera.position, { x: 0, z: 6, duration: 0.12, ease: "power1.inOut" }, 0.88)
  .to(sceneRefs.rimMat.uniforms.u_rimIntensity, { value: 0.5, duration: 0.12, ease: "none" }, 0.88);

// 3. Add Continuous Self-Rotation in tick()
`;
  content = content.substring(0, tlStart) + newTl + content.substring(tlEnd);
}

// Add independent rotation to aiCore and rings in the update loop (tick)
const tickStartStr = 'UpdatePipeline.updateBlueprints(elapsedTime, progress);';
if (content.includes(tickStartStr) && !content.includes('aiCore.rotation.y +=')) {
  content = content.replace(tickStartStr, 
    `UpdatePipeline.updateBlueprints(elapsedTime, progress);\n  if(sceneRefs.aiCore) sceneRefs.aiCore.rotation.y += 0.001;\n  if(sceneRefs.rings) sceneRefs.rings.rotation.z += 0.0005;`
  );
}

fs.writeFileSync(path, content);
console.log('Update Complete.');
