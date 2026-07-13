const fs = require('fs');
const path = require('path');

// Read main.js to extract the 'ar' translations object
const mainJsContent = fs.readFileSync(path.join(__dirname, 'src', 'main.js'), 'utf8');

// Use regex to extract the ar: { ... } block
const arBlockMatch = mainJsContent.match(/ar:\s*\{([\s\S]*?)\n\s*\}/);

if (!arBlockMatch) {
  console.error("Could not find Arabic translations in main.js");
  process.exit(1);
}

const arText = arBlockMatch[1];
const arTranslations = {};

// Parse the extracted text into an object
const lines = arText.split('\n');
lines.forEach(line => {
  const match = line.match(/^\s*([a-zA-Z0-9_]+)\s*:\s*(['"])([\s\S]*?)\2\s*,?\s*$/);
  if (match) {
    arTranslations[match[1]] = match[3];
  }
});

// Update all HTML files
const files = ['index.html', 'about.html', 'contact.html', 'services.html', 'products.html', 'blog.html', 'blog-post.html'];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace text in data-translate elements
    for (const [key, value] of Object.entries(arTranslations)) {
      // Regex to find: data-translate="KEY">Old Text</
      // or data-translate="KEY" ... >Old Text</
      const regex = new RegExp(`(data-translate="${key}"[^>]*>)[^<]*(<\/)`, 'g');
      content = content.replace(regex, `$1${value}$2`);
      
      // Handle placeholder translations
      if (key.endsWith('_ph')) {
        const phRegex = new RegExp(`(data-translate="${key}"[^>]*placeholder=")[^"]*(")`, 'g');
        content = content.replace(phRegex, `$1${value}$2`);
      }
    }
    
    // Change 'English' to 'العربية' text in nav if it exists as raw text without data-translate
    // Actually the lang toggle says العربية initially because the page was English
    // We should change the lang toggle to say "English" since the page is now Arabic
    content = content.replace(/<button id="lang-toggle" class="lang-btn"[^>]*>.*?<\/button>/g, '<button id="lang-toggle" class="lang-btn" aria-label="Toggle Language">English</button>');

    fs.writeFileSync(filePath, content);
    console.log('Translated ' + file + ' to Arabic natively');
  }
});
