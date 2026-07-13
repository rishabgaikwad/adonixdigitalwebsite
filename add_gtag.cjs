const fs = require('fs');
const path = require('path');

const gtagSnippet = `<!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-QG9NHE80VF"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-QG9NHE80VF');
    </script>`;

function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isFile() && item.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      // Ensure we don't add it multiple times
      if (!content.includes('G-QG9NHE80VF')) {
        // Regex to replace the first instance of <head>
        content = content.replace(/<head>/i, `<head>\n    ${gtagSnippet}`);
        fs.writeFileSync(fullPath, content);
        console.log(`Added gtag to ${fullPath}`);
      }
    }
  });
}

processDir(__dirname);
processDir(path.join(__dirname, 'stable_scrollytelling_backup'));
