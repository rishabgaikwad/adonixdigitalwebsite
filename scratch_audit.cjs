const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const files = ['index.html', 'about.html', 'services.html', 'products.html', 'contact.html', 'blog.html', 'blog-post.html'];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  
  const content = fs.readFileSync(filePath, 'utf8');
  const dom = new JSDOM(content);
  const document = dom.window.document;
  
  // Find all text nodes
  const textNodes = [];
  const walk = document.createTreeWalker(document.body, dom.window.NodeFilter.SHOW_TEXT, null, false);
  let n;
  while(n = walk.nextNode()) {
    if (n.textContent.trim().length > 0 && /[a-zA-Z]/.test(n.textContent)) {
      // Check if any ancestor has data-translate
      let parent = n.parentElement;
      let hasTranslate = false;
      while (parent && parent !== document.body) {
        if (parent.hasAttribute('data-translate') || parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE') {
          hasTranslate = true;
          break;
        }
        parent = parent.parentElement;
      }
      if (!hasTranslate) {
        textNodes.push(n.textContent.trim());
      }
    }
  }
  
  if (textNodes.length > 0) {
    console.log(`\n--- ${file} ---`);
    const unique = [...new Set(textNodes)];
    unique.forEach(t => console.log(`Untranslated: "${t}"`));
  }
});
