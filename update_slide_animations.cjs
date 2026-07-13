const fs = require('fs');
const path = 'c:/Users/rishab/adonixdigital/src/main.js';
let content = fs.readFileSync(path, 'utf8');

// 1. Define the entrance animation function and update initial planet state
const loaderSectionMarker = `/* ==========================================================================
   CINEMATIC LOADER TIMER
   ========================================================================== */`;

if (content.includes(loaderSectionMarker) && !content.includes('function triggerEntranceAnimation')) {
  const entranceFunc = `/* ==========================================================================
   CINEMATIC LOADER TIMER & ENTRANCE DROP ANIMATION
   ========================================================================== */
function triggerEntranceAnimation() {
  if (typeof aiCore === 'undefined' || !aiCore) return;
  
  console.log('🚀 Triggering Saturn Drop Entrance Animation!');
  
  // Set initial drop start positions (high above and deep in space)
  aiCore.position.set(0, 7.5, -4);
  aiCore.scale.set(0.1, 0.1, 0.1);
  if (sceneRefs.rings) sceneRefs.rings.rotation.set(Math.PI / 2 + 0.8, 0.5, 0);
  if (sceneRefs.ringMat) sceneRefs.ringMat.uniforms.u_flare.value = 2.0;

  // Drop animation into Hero center
  gsap.to(aiCore.position, {
    x: 0,
    y: 0,
    z: 0,
    duration: 2.4,
    ease: "power3.out"
  });
  gsap.to(aiCore.scale, {
    x: 0.85,
    y: 0.85,
    z: 0.85,
    duration: 2.4,
    ease: "elastic.out(1, 0.75)"
  });
  if (sceneRefs.rings) {
    gsap.to(sceneRefs.rings.rotation, {
      x: Math.PI / 2 - 0.2,
      y: 0,
      z: 0,
      duration: 2.6,
      ease: "power3.out"
    });
  }
  if (sceneRefs.ringMat) {
    gsap.to(sceneRefs.ringMat.uniforms.u_flare, {
      value: 0.2,
      duration: 2.0,
      ease: "power2.out"
    });
  }

  // Animate Hero UI elements dropping in smoothly
  if (document.querySelector(".main-headline")) {
    gsap.fromTo(".main-headline, .subheadline, .hero-actions, .hologram-dashboards",
      { opacity: 0, y: 45 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.4 }
    );
  }
}`;

  content = content.replace(loaderSectionMarker, entranceFunc);
}

// 2. Hook triggerEntranceAnimation into loader completion
if (content.includes('loader.classList.add("loaded");') && !content.includes('triggerEntranceAnimation();')) {
  // Replace all instances of loader.classList.add("loaded") with adding class AND triggering entrance
  content = content.replace(/loader\.classList\.add\("loaded"\);/g, `loader.classList.add("loaded");\n    setTimeout(() => triggerEntranceAnimation(), 100);`);
}

// 3. Replace main3DTimeline with Major Animation in First Two Slides
const tlStartStr = '// Main 3D Scroll Timeline';
const tlEndStr = '// 3. Add Continuous Self-Rotation in tick()';
const tlStart = content.indexOf(tlStartStr);
const tlEnd = content.indexOf(tlEndStr);

if (tlStart !== -1 && tlEnd !== -1) {
  const newTimelineCode = `// Main 3D Scroll Timeline (Major Animation Focused on First Two Slides)
const main3DTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".scroll-container",
    start: "top top",
    end: "bottom bottom",
    scrub: 1.2, // Smooth cinematic scrubbing
  }
});

// Set initial baseline states matching the end of the drop entrance
main3DTimeline.set(aiCore.scale, { x: 0.85, y: 0.85, z: 0.85 }, 0)
  .set(camera.position, { x: 0, y: 0, z: 5.2 }, 0)
  .set(sceneRefs.rings.rotation, { x: Math.PI / 2 - 0.2, y: 0, z: 0 }, 0)
  .set(aiCore.position, { x: 0, y: 0, z: 0 }, 0)
  .set(aiCore.rotation, { x: 0, y: 0, z: 0 }, 0)
  .set(sceneRefs.rimMat.uniforms.u_rimIntensity, { value: 1.5 }, 0)
  .set(sceneRefs.ringMat.uniforms.u_flare, { value: 0.2 }, 0);

// --- SLIDE 1 (HERO SCROLL: 0.0 -> 0.16) --- MAJOR ANIMATION 1: DRAMATIC DIVE & TILT
// As you scroll down from Hero, the camera dives deep into the rings while Saturn spins rapidly
main3DTimeline.to(camera.position, { z: 2.8, y: 0.6, duration: 0.16, ease: "power2.inOut" }, 0)
  .to(aiCore.scale, { x: 1.15, y: 1.15, z: 1.15, duration: 0.16, ease: "power2.inOut" }, 0)
  .to(sceneRefs.rings.rotation, { x: Math.PI / 2 - 0.65, y: 0.3, duration: 0.16, ease: "power2.inOut" }, 0)
  .to(aiCore.rotation, { y: Math.PI * 0.8, duration: 0.16, ease: "power1.inOut" }, 0)
  .to(sceneRefs.ringMat.uniforms.u_flare, { value: 1.8, duration: 0.16, ease: "power2.out" }, 0);

// --- SLIDE 2 (SERVICES SCROLL: 0.16 -> 0.36) --- MAJOR ANIMATION 2: SWEEPING ORBIT & PARALLAX
// Planet sweeps majestically to the right side of the screen to stand next to Services cards
main3DTimeline.to(aiCore.position, { x: 2.4, y: -0.4, z: 0.5, duration: 0.20, ease: "power2.inOut" }, 0.16)
  .to(camera.position, { x: 1.5, y: -0.3, z: 2.4, duration: 0.20, ease: "power2.inOut" }, 0.16)
  .to(sceneRefs.rings.rotation, { x: Math.PI / 2 - 0.35, y: -0.2, duration: 0.20, ease: "power2.inOut" }, 0.16)
  .to(aiCore.rotation, { y: Math.PI * 1.6, duration: 0.20, ease: "power1.inOut" }, 0.16)
  .to(sceneRefs.rimMat.uniforms.u_rimIntensity, { value: 3.2, duration: 0.20, ease: "none" }, 0.16)
  .to(sceneRefs.ringMat.uniforms.u_flare, { value: 0.8, duration: 0.20, ease: "power2.inOut" }, 0.16);

// --- SLIDES 3 to 6 (AI, RESULTS, CASES, CONTACT: 0.36 -> 1.0) --- CALM BACKGROUND PRESENCE
// Now that the major animations wowed the user in slides 1 & 2, Saturn glides gracefully behind content
main3DTimeline.to(aiCore.position, { x: 1.2, y: 0.2, z: 0.0, duration: 0.18, ease: "power1.inOut" }, 0.36)
  .to(camera.position, { x: 1.0, y: 0.0, z: 3.2, duration: 0.18, ease: "power1.inOut" }, 0.36)
  .to(aiCore.scale, { x: 0.85, y: 0.85, z: 0.85, duration: 0.18, ease: "power1.inOut" }, 0.36)
  .to(sceneRefs.rimMat.uniforms.u_rimIntensity, { value: 1.8, duration: 0.18, ease: "none" }, 0.36);

main3DTimeline.to(aiCore.position, { x: 1.6, y: 0.0, z: -0.5, duration: 0.22, ease: "power1.inOut" }, 0.54)
  .to(sceneRefs.rings.rotation, { x: Math.PI / 2 - 0.25, duration: 0.22, ease: "power1.inOut" }, 0.54)
  .to(aiCore.rotation, { y: Math.PI * 2.2, duration: 0.22, ease: "none" }, 0.54);

main3DTimeline.to(aiCore.position, { x: 0, y: 0.5, z: -2.5, duration: 0.24, ease: "power2.inOut" }, 0.76)
  .to(camera.position, { x: 0, y: 0, z: 5.5, duration: 0.24, ease: "power2.inOut" }, 0.76)
  .to(sceneRefs.rimMat.uniforms.u_rimIntensity, { value: 0.8, duration: 0.24, ease: "none" }, 0.76)
  .to(sceneRefs.ringMat.uniforms.u_flare, { value: 0.1, duration: 0.24, ease: "none" }, 0.76);

`;

  content = content.substring(0, tlStart) + newTimelineCode + content.substring(tlEnd);
}

fs.writeFileSync(path, content);
console.log('✅ Slide animations and drop entrance updated successfully.');
