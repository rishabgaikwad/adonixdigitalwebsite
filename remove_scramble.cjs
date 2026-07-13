const fs = require('fs');
const jsPath = 'c:/Users/rishab/adonixdigital/src/main.js';

let content = fs.readFileSync(jsPath, 'utf8');

// The exact string block we want to remove
const cyberScrambleBlock = `
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

if (content.includes(cyberScrambleBlock.trim())) {
  // Try exact replacement first
  content = content.replace(cyberScrambleBlock, '');
  
  // If the exact replacement failed because of whitespace, try a regex
  if (content.includes('2. Cyber Scramble Text Reveal for Headings')) {
    content = content.replace(/\/\/ 2\. Cyber Scramble Text Reveal[\s\S]*\}\);\s*\n\}\);\s*\n/m, '');
  }
  
  fs.writeFileSync(jsPath, content);
  console.log('✅ Cyber Scramble removed successfully');
} else {
  // Fallback regex if formatting changed slightly
  content = content.replace(/\/\/ 2\. Cyber Scramble Text Reveal[\s\S]*\}\);\s*\n\}\);\s*\n/m, '');
  fs.writeFileSync(jsPath, content);
  console.log('✅ Cyber Scramble removed via regex fallback');
}
