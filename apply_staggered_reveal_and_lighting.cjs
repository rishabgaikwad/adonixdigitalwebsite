const fs = require('fs');
const jsPath = 'c:/Users/rishab/adonixdigital/src/main.js';
let content = fs.readFileSync(jsPath, 'utf8');

// 1. Fix Lighting & Debris Material to Eliminate Dark/Black Elements
// Boost ambient intensity across presets
content = content.replace(/let ambIntensity\s*=\s*0\.2;/g, 'let ambIntensity = 1.5;');
content = content.replace(/ambIntensity\s*=\s*0\.4;/g, 'ambIntensity = 1.6;');
content = content.replace(/ambIntensity\s*=\s*0\.6;/g, 'ambIntensity = 1.8;');
content = content.replace(/ambIntensity\s*=\s*0\.1;/g, 'ambIntensity = 1.4;');

// Add HemisphereLight for even fill lighting across all instanced mesh faces
const ambAdd = `scene.add(ambientLight);`;
if (content.includes(ambAdd) && !content.includes('HemisphereLight')) {
  content = content.replace(ambAdd, `${ambAdd}\nconst hemiLight = new THREE.HemisphereLight(0xffffff, 0xdddddd, 1.5);\nscene.add(hemiLight);`);
}

// Update Debris Material (Asteroid Crystals) to brilliant self-illuminating diamond white
const oldDebrisMatRegex = /const debrisMat\s*=\s*new THREE\.MeshStandardMaterial\(\{[^}]+\}\);/g;
const newDebrisMat = `const debrisMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  emissive: 0xffffff,
  emissiveIntensity: 0.85, // Self-illuminating diamond light, zero dark silhouettes!
  roughness: 0.1,
  metalness: 0.1 // Low metalness avoids reflecting dark sky void
});`;
content = content.replace(oldDebrisMatRegex, newDebrisMat);

// Ensure dustMat is bright
content = content.replace(/opacity:\s*0\.7,\s*blending:\s*THREE\.AdditiveBlending/g, 'opacity: 0.85, blending: THREE.AdditiveBlending');

// 2. Add u_reveal Uniform to ringFragmentShader for Ring Arc Reveal
const oldRingFragStart = 'const ringFragmentShader = `';
const oldRingFragEnd = 'gl_FragColor = vec4(ringColor, alpha * (0.6 + u_flare * 0.6));\n  }\n`;';
const rfStart = content.indexOf(oldRingFragStart);
const rfEnd = content.indexOf(oldRingFragEnd);

if (rfStart !== -1 && rfEnd !== -1) {
  const newRingFrag = `const ringFragmentShader = \`
  uniform float u_flare;
  uniform float u_time;
  uniform float u_reveal;
  varying vec2 vUv;
  varying vec3 vPos;
  void main() {
    float dist = length(vPos);
    float normDist = (dist - 1.4) / 1.4; 
    
    // Staggered Ring Arc Sweep Reveal
    float angle = atan(vPos.y, vPos.x); // -3.14159 to 3.14159
    float normAngle = (angle + 3.14159265) / (2.0 * 3.14159265); // 0.0 to 1.0
    if (normAngle > u_reveal) {
      discard;
    }
    
    float alpha = sin(normDist * 40.0) * 0.5 + 0.5;
    alpha *= sin(normDist * 15.0 + u_time * 0.2) * 0.5 + 0.5;
    
    if (normDist > 0.55 && normDist < 0.6) alpha *= 0.05; // Cassini division gap
    if (normDist > 0.8 && normDist < 0.85) alpha *= 0.1;
    
    alpha *= smoothstep(0.0, 0.08, normDist) * smoothstep(1.0, 0.88, normDist);
    
    vec3 ringColor = mix(vec3(0.7, 0.75, 0.8), vec3(1.0, 1.0, 1.0), u_flare * 0.5);
    ringColor = mix(ringColor, vec3(1.0, 1.0, 1.0), smoothstep(0.4, 0.5, normDist) * u_flare);
    
    // Bright diamond laser tip at the leading edge as the ring draws itself open
    if (u_reveal < 0.99 && abs(normAngle - u_reveal) < 0.03) {
      ringColor += vec3(1.0, 1.0, 1.0) * 2.5;
      alpha = max(alpha, 0.95);
    }
    
    gl_FragColor = vec4(ringColor, alpha * (0.6 + u_flare * 0.6));
  }
\`;`;
  content = content.substring(0, rfStart) + newRingFrag + content.substring(rfEnd + oldRingFragEnd.length);
}

// Add u_reveal: { value: 1.0 } to ringMat uniforms
content = content.replace(/u_time:\s*\{\s*value:\s*0\s*\}/g, 'u_time: { value: 0 },\n    u_reveal: { value: 1.0 }');

// 3. Redesign main3DTimeline for Staggered Choreographed Reveal (0.00 -> 0.28 scroll progress)
const tlStartStr = '// Main 3D Scroll Timeline';
const tlEndStr = '// 3. Add Continuous Self-Rotation in tick()';
const tlStart = content.indexOf(tlStartStr);
const tlEnd = content.indexOf(tlEndStr);

if (tlStart !== -1 && tlEnd !== -1) {
  const newTimelineCode = `// Main 3D Scroll Timeline (Choreographed Staggered Reveal + Parallax Orbit)
const main3DTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".scroll-container",
    start: "top top",
    end: "bottom bottom",
    scrub: 1.2, // Smooth cinematic scrubbing
  }
});

// Set initial baseline states at time 0 (start of scroll reveal)
main3DTimeline.set(aiCore.scale, { x: 0.85, y: 0.85, z: 0.85 }, 0)
  .set(camera.position, { x: 0, y: 0, z: 5.2 }, 0)
  .set(sceneRefs.planet.scale, { x: 0.65, y: 0.65, z: 0.65 }, 0)
  .set(sceneRefs.planet.rotation, { x: 0.1, y: 0, z: 0 }, 0)
  .set(sceneRefs.ringMat.uniforms.u_reveal, { value: 0.0 }, 0) // Rings initially drawn closed!
  .set(sceneRefs.rings.rotation, { x: Math.PI / 2 - 0.05, y: 0, z: 0 }, 0) // Edge-on tilt!
  .set(sceneRefs.debrisBelt.scale, { x: 0.01, y: 0.01, z: 0.01 }, 0)
  .set(sceneRefs.rimMat.uniforms.u_rimIntensity, { value: 0.2 }, 0)
  .set(sceneRefs.ringMat.uniforms.u_flare, { value: 0.1 }, 0)
  .set(sceneRefs.spaceDust.position, { z: -8 }, 0);

// --- PHASE 1: PLANET BODY REVEAL & 3D ROTATION (0.00 -> 0.11 : 0% to ~40% of reveal range) ---
// Planet scales up independently with back.out overshoot while rotating in 3D space toward camera
main3DTimeline.to(sceneRefs.planet.scale, { x: 1.0, y: 1.0, z: 1.0, duration: 0.11, ease: "back.out(1.2)" }, 0.00)
  .to(sceneRefs.planet.rotation, { x: 0.3, y: Math.PI * 0.5, duration: 0.11, ease: "power3.out" }, 0.00)
  .to(camera.position, { z: 4.2, y: 0.3, duration: 0.11, ease: "power2.out" }, 0.00);

// --- PHASE 2: RING ARC SWEEP & 3D TILT (0.08 -> 0.20 : staggered after planet start) ---
// Ring draws itself open via u_reveal clip while tilting from edge-on to full 3D viewing angle
main3DTimeline.to(sceneRefs.ringMat.uniforms.u_reveal, { value: 1.0, duration: 0.12, ease: "power3.out" }, 0.08)
  .to(sceneRefs.rings.rotation, { x: Math.PI / 2 - 0.55, y: -0.25, duration: 0.12, ease: "power3.out" }, 0.08)
  .to(sceneRefs.debrisBelt.scale, { x: 1.0, y: 1.0, z: 1.0, duration: 0.12, ease: "back.out(1.1)" }, 0.08);

// --- PHASE 3: RIM GLOW & STARLIGHT DUST SETTLE (0.16 -> 0.28 : final settling phase) ---
// Atmosphere halo blooms to full cyber-luxury brilliance and starlight field glides forward into focus
main3DTimeline.to(sceneRefs.rimMat.uniforms.u_rimIntensity, { value: 3.0, duration: 0.12, ease: "expo.out" }, 0.16)
  .to(sceneRefs.ringMat.uniforms.u_flare, { value: 1.5, duration: 0.12, ease: "power2.out" }, 0.16)
  .to(sceneRefs.spaceDust.position, { z: 0, duration: 0.12, ease: "power3.out" }, 0.16);

// --- PHASE 4: SERVICES PARALLAX SWEEP (0.28 -> 0.46) ---
// Fully assembled celestial system glides majestically to the right side of the screen to stand beside Services cards
main3DTimeline.to(aiCore.position, { x: 2.3, y: -0.3, z: 0.3, duration: 0.18, ease: "power2.inOut" }, 0.28)
  .to(camera.position, { x: 1.5, y: -0.2, z: 2.6, duration: 0.18, ease: "power2.inOut" }, 0.28)
  .to(sceneRefs.rings.rotation, { x: Math.PI / 2 - 0.35, y: -0.15, duration: 0.18, ease: "power2.inOut" }, 0.28)
  .to(aiCore.rotation, { y: Math.PI * 1.6, duration: 0.18, ease: "power1.inOut" }, 0.28)
  .to(sceneRefs.rimMat.uniforms.u_rimIntensity, { value: 3.2, duration: 0.18, ease: "none" }, 0.28);

// --- SLIDES 3 to 6 (AI, RESULTS, CASES, CONTACT: 0.46 -> 1.0) --- CALM BACKGROUND PRESENCE
main3DTimeline.to(aiCore.position, { x: 1.2, y: 0.2, z: 0.0, duration: 0.18, ease: "power1.inOut" }, 0.46)
  .to(camera.position, { x: 1.0, y: 0.0, z: 3.2, duration: 0.18, ease: "power1.inOut" }, 0.46)
  .to(aiCore.scale, { x: 0.85, y: 0.85, z: 0.85, duration: 0.18, ease: "power1.inOut" }, 0.46)
  .to(sceneRefs.rimMat.uniforms.u_rimIntensity, { value: 1.8, duration: 0.18, ease: "none" }, 0.46);

main3DTimeline.to(aiCore.position, { x: 1.6, y: 0.0, z: -0.5, duration: 0.18, ease: "power1.inOut" }, 0.64)
  .to(sceneRefs.rings.rotation, { x: Math.PI / 2 - 0.25, duration: 0.18, ease: "power1.inOut" }, 0.64)
  .to(aiCore.rotation, { y: Math.PI * 2.2, duration: 0.18, ease: "none" }, 0.64);

main3DTimeline.to(aiCore.position, { x: 0, y: 0.5, z: -2.5, duration: 0.18, ease: "power2.inOut" }, 0.82)
  .to(camera.position, { x: 0, y: 0, z: 5.5, duration: 0.18, ease: "power2.inOut" }, 0.82)
  .to(sceneRefs.rimMat.uniforms.u_rimIntensity, { value: 0.8, duration: 0.18, ease: "none" }, 0.82)
  .to(sceneRefs.ringMat.uniforms.u_flare, { value: 0.1, duration: 0.18, ease: "none" }, 0.82);

`;
  content = content.substring(0, tlStart) + newTimelineCode + content.substring(tlEnd);
}

// 4. Update triggerEntranceAnimation so initial page drop also draws open staggered
if (content.includes('if (sceneRefs.ringMat) {') && content.includes('u_flare')) {
  content = content.replace(/if \(sceneRefs\.ringMat\) \{[^}]+\}/g, `if (sceneRefs.ringMat) {
    sceneRefs.ringMat.uniforms.u_reveal.value = 0.0;
    gsap.to(sceneRefs.ringMat.uniforms.u_reveal, { value: 1.0, duration: 2.2, ease: "power3.out", delay: 0.4 });
    gsap.to(sceneRefs.ringMat.uniforms.u_flare, { value: 0.2, duration: 2.0, ease: "power2.out" });
  }`);
}

fs.writeFileSync(jsPath, content);
console.log('✅ Applied Staggered Choreographed Reveal and Fixed Dark/Shadow Geometry.');
