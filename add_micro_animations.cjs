const fs = require('fs');

const jsPath = 'c:/Users/rishab/adonixdigital/src/main.js';

const microAnimationsCode = `
/* ==========================================================================
   MICRO-ANIMATIONS: 3D GLASS TILT & CYBER SCRAMBLE
   ========================================================================== */

// 1. 3D Glass Card Tilt Effect
document.querySelectorAll('.glass').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (-10 to +10 degrees max)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    card.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale3d(1.02, 1.02, 1.02)\`;
    card.style.transition = 'none';
    
    // Add subtle glare follow
    card.style.boxShadow = \`\${(centerX - x) / 5}px \${(centerY - y) / 5}px 30px rgba(212, 175, 55, 0.1)\`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = \`perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)\`;
    card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease';
    card.style.boxShadow = 'none';
  });
});

// 2. Cyber Scramble Text Reveal for Headings (AI Theme)
const chars = '01AB01CD01X#%*@&';
document.querySelectorAll('h2').forEach(heading => {
  // Save original text in a data attribute so we don't lose it if translations update
  if(!heading.hasAttribute('data-original')) {
    heading.setAttribute('data-original', heading.innerText);
  }
  
  ScrollTrigger.create({
    trigger: heading,
    start: 'top 85%',
    onEnter: () => {
      const originalText = heading.getAttribute('data-original') || heading.innerText;
      let iteration = 0;
      clearInterval(heading.scrambleInterval);
      
      heading.scrambleInterval = setInterval(() => {
        heading.innerText = originalText
          .split('')
          .map((letter, index) => {
            if(letter === ' ') return ' ';
            if (index < Math.floor(iteration)) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
        
        if (iteration >= originalText.length) {
          clearInterval(heading.scrambleInterval);
          heading.innerText = originalText;
        }
        iteration += 1/2; // Speed of decode
      }, 30);
    },
    // Allows it to replay if you scroll way past and come back, or set to true to only happen once
    once: true 
  });
});
`;

let content = fs.readFileSync(jsPath, 'utf8');
if (!content.includes('MICRO-ANIMATIONS: 3D GLASS TILT')) {
  fs.appendFileSync(jsPath, '\n' + microAnimationsCode);
  console.log('✅ Added micro-animations to main.js');
} else {
  console.log('⚠️ Micro-animations already present.');
}
