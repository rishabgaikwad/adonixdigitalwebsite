const fs = require('fs');

// 1. Update src/style.css with Vercel/Linear Spotlight styles
const cssPath = 'c:/Users/rishab/adonixdigital/src/style.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

if (!cssContent.includes('ULTRA-PREMIUM INTERACTIVE SPOTLIGHT')) {
  const spotlightCSS = `
/* ==========================================================================
   ULTRA-PREMIUM INTERACTIVE SPOTLIGHT & 3D TILT (Vercel / Linear Style)
   ========================================================================== */
.holo-card, .service-item, .industry-showcase-card, .metric-item, .test-card, .result-card {
  position: relative;
  overflow: hidden !important;
  transform-style: preserve-3d;
  will-change: transform;
  border: 1px solid var(--glass-border);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.holo-card:hover, .service-item:hover, .industry-showcase-card:hover, .metric-item:hover, .test-card:hover, .result-card:hover {
  border-color: rgba(212, 175, 55, 0.5) !important;
  box-shadow: 0 10px 30px -10px rgba(212, 175, 55, 0.25), 0 0 20px rgba(0, 229, 255, 0.1) !important;
}

.holo-card::after, .service-item::after, .industry-showcase-card::after, .metric-item::after, .test-card::after, .result-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(380px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(212, 175, 55, 0.18), rgba(74, 140, 255, 0.08) 45%, transparent 80%);
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
  z-index: 2;
  border-radius: inherit;
}

.holo-card:hover::after, .service-item:hover::after, .industry-showcase-card:hover::after, .metric-item:hover::after, .test-card:hover::after, .result-card:hover::after {
  opacity: 1;
}
`;
  fs.writeFileSync(cssPath, cssContent + spotlightCSS);
  console.log('✅ Added Vercel/Linear spotlight CSS to style.css');
}

// 2. Update src/main.js with Magnetic 3D Parallax and Spotlight JS
const jsPath = 'c:/Users/rishab/adonixdigital/src/main.js';
let jsContent = fs.readFileSync(jsPath, 'utf8');

// A. Add normalized mouse tracking to mousemove listener
const cursorTarget = `gsap.to(cursorRing, { x: e.clientX, y: e.clientY, duration: 0.15 });`;
if (jsContent.includes(cursorTarget) && !jsContent.includes('window.mouseNormX')) {
  const mouseTrack = `${cursorTarget}\n  // Store normalized mouse coordinates for 3D Magnetic Parallax\n  window.mouseNormX = (e.clientX / window.innerWidth) * 2 - 1;\n  window.mouseNormY = -(e.clientY / window.innerHeight) * 2 + 1;`;
  jsContent = jsContent.replace(cursorTarget, mouseTrack);
}

// B. Replace old card parallax with comprehensive Spotlight + 3D Tilt
const oldParallaxStart = '// Parallax (Tilt Effect) for multiple cards';
const oldParallaxEnd = '// Live AI Console Logs terminal';
const pStart = jsContent.indexOf(oldParallaxStart);
const pEnd = jsContent.indexOf(oldParallaxEnd);

if (pStart !== -1 && pEnd !== -1) {
  const newParallaxCode = `// High-Resolution Spotlight & 3D Parallax Tilt for all interactive cards
const premiumCards = document.querySelectorAll(".holo-card, .service-item, .industry-showcase-card, .metric-item, .test-card, .result-card");
premiumCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set variables for radial CSS gradient spotlight
    card.style.setProperty("--mouse-x", \`\${x}px\`);
    card.style.setProperty("--mouse-y", \`\${y}px\`);
    
    // Smooth 3D Perspective Tilt
    const tiltX = (rect.height / 2 - y) / 18;
    const tiltY = (x - rect.width / 2) / 18;
    
    gsap.to(card, {
      rotateX: tiltX,
      rotateY: tiltY,
      scale: 1.02,
      duration: 0.25,
      ease: "power2.out"
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out"
    });
  });
});

`;
  jsContent = jsContent.substring(0, pStart) + newParallaxCode + jsContent.substring(pEnd);
}

// C. Add magnetic spring rotation into tick()
const tickTarget = `// Extremely subtle camera drift`;
if (jsContent.includes(tickTarget) && !jsContent.includes('window.mouseNormX * 0.18')) {
  const magneticCode = `// High-Resolution Magnetic 3D Mouse Parallax
  if (typeof window.mouseNormX !== 'undefined' && typeof aiCore !== 'undefined' && aiCore) {
    aiCore.rotation.x += (window.mouseNormY * 0.18 - aiCore.rotation.x) * 0.05;
    aiCore.rotation.z += (-window.mouseNormX * 0.18 - aiCore.rotation.z) * 0.05;
    
    // Opposite parallax depth layer for starlight field
    if (sceneRefs.spaceDust) {
      sceneRefs.spaceDust.position.x += (-window.mouseNormX * 0.5 - sceneRefs.spaceDust.position.x) * 0.05;
      sceneRefs.spaceDust.position.y += (-window.mouseNormY * 0.5 - sceneRefs.spaceDust.position.y) * 0.05;
    }
  }

  ${tickTarget}`;
  jsContent = jsContent.replace(tickTarget, magneticCode);
}

fs.writeFileSync(jsPath, jsContent);
console.log('✅ Added Magnetic 3D Parallax and Spotlight JS to main.js');
