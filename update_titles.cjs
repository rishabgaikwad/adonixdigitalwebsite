const fs = require('fs');
const map = {
  'index.html': 'title_home',
  'about.html': 'title_about',
  'services.html': 'title_services',
  'products.html': 'title_products',
  'contact.html': 'title_contact',
  'blog.html': 'title_blog',
  'blog-post.html': 'title_post'
};
Object.keys(map).forEach(f => {
  let p = 'c:/Users/rishab/adonixdigital/' + f;
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/<title>.*?<\/title>/, `<title data-translate="${map[f]}">Adonix Digital</title>`);
  fs.writeFileSync(p, c);
});
console.log('Titles updated.');
