const fs = require('fs');
const files = ['about.html', 'contact.html', 'services.html', 'products.html', 'blog.html', 'blog-post.html'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace('<html lang="en" dir="ltr">', '<html lang="ar" dir="rtl">');
    content = content.replace('Initializing Digital Ecosystem...', 'جاري تهيئة النظام الرقمي...');
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
});
