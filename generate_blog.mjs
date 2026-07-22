import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { blogPosts } from './src/blogData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const domain = 'https://adonixdigital.com';

// 1. Create directories if they don't exist
const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const arBlogDir = path.join(__dirname, 'blog');
const enBlogDir = path.join(__dirname, 'en', 'blog');
ensureDir(arBlogDir);
ensureDir(enBlogDir);

// 2. Read templates
const arTemplate = fs.readFileSync(path.join(__dirname, 'blog-post.html'), 'utf8');
const enTemplate = fs.readFileSync(path.join(__dirname, 'en', 'blog-post.html'), 'utf8');

let newArUrls = [];
let newEnUrls = [];

// 3. Generate HTML for each post
blogPosts.forEach(post => {
  ['ar', 'en'].forEach(lang => {
    const isEn = lang === 'en';
    let content = isEn ? enTemplate : arTemplate;
    const locale = isEn ? 'en_SA' : 'ar_SA';
    
    const postTitle = isEn ? (post.title_en || post.title) : (post.title_ar || post.title);
    const postExcerpt = isEn ? (post.excerpt_en || post.excerpt) : (post.excerpt_ar || post.excerpt);
    const postAuthor = isEn ? (post.author_en || post.author) : (post.author_ar || post.author);
    const postImage = post.image;
    const slug = post.slug;
    
    const url = isEn ? `${domain}/en/blog/${slug}/` : `${domain}/blog/${slug}/`;
    const arUrl = `${domain}/blog/${slug}/`;
    const enUrl = `${domain}/en/blog/${slug}/`;
    
    // Store for sitemap
    if (isEn) newEnUrls.push({ url: enUrl, altAr: arUrl });
    else newArUrls.push({ url: arUrl, altEn: enUrl });

    // Ensure path is right for canonical
    content = content.replace(/<link\s+rel="canonical"[^>]*>/gi, '');
    content = content.replace(/<link\s+rel="alternate"\s+hreflang=[^>]*>/gi, '');
    content = content.replace(/<title[^>]*>.*?<\/title>/gi, '');
    content = content.replace(/<meta\s+name="description"[^>]*>/gi, '');
    content = content.replace(/<meta\s+property="og:[^>]*>/gi, '');
    content = content.replace(/<meta\s+name="twitter:[^>]*>/gi, '');
    content = content.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');

    const tags = `
      <title>${postTitle} | Adonix Digital</title>
      <meta name="description" content="${postExcerpt}" />
      <link rel="canonical" href="${url}" />
      <link rel="alternate" hreflang="ar-SA" href="${arUrl}" />
      <link rel="alternate" hreflang="en-SA" href="${enUrl}" />
      <link rel="alternate" hreflang="x-default" href="${arUrl}" />
      <meta property="og:title" content="${postTitle}" />
      <meta property="og:description" content="${postExcerpt}" />
      <meta property="og:type" content="article" />
      <meta property="og:url" content="${url}" />
      <meta property="og:image" content="${domain}${postImage}" />
      <meta property="og:site_name" content="Adonix Digital" />
      <meta property="og:locale" content="${locale}" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="${postTitle}" />
      <meta name="twitter:description" content="${postExcerpt}" />
      <meta name="twitter:image" content="${domain}${postImage}" />
      <meta name="twitter:url" content="${url}" />
    `;
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": postTitle,
      "image": `${domain}${postImage}`,
      "author": { "@type": "Organization", "name": postAuthor },
      "publisher": { "@type": "Organization", "name": "Adonix Digital", "logo": { "@type": "ImageObject", "url": `${domain}/adonixlogot.svg` } },
      "description": postExcerpt
    };
    
    const schemaTag = `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
    
    const langSwitcherPath = isEn ? `/blog/${slug}/` : `/en/blog/${slug}/`;
    content = content.replace(/<a[^>]*id="lang-toggle"[^>]*>.*?<\/a>/i, `<a href="${langSwitcherPath}" id="lang-toggle" class="lang-btn" style="text-decoration:none;" ${!isEn ? '' : 'data-translate="nav_lang_ar"'}>${isEn ? 'العربية' : 'English'}</a>`);
    
    const baseUrl = isEn ? '/en/' : '/';
    content = content.replace(/href="about\.html"/g, `href="${baseUrl}about.html"`);
    content = content.replace(/href="services\.html"/g, `href="${baseUrl}services.html"`);
    content = content.replace(/href="blog\.html"/g, `href="${baseUrl}blog.html"`);
    content = content.replace(/href="products\.html"/g, `href="${baseUrl}products.html"`);
    content = content.replace(/href="contact\.html"/g, `href="${baseUrl}contact.html"`);
    content = content.replace(/href="audit\.html"/g, `href="${baseUrl}audit.html"`);
    
    // Inject Static H1
    content = content.replace(/id="post-hero"[^>]*>[\s\S]*?<\/div>/, `id="post-hero"><h1>${postTitle}</h1></div>`);
    
    const insertIndex = content.indexOf('<!-- SEO Implementation -->');
    if (insertIndex !== -1) {
      content = content.slice(0, insertIndex) + tags + schemaTag + '\n    ' + content.slice(insertIndex);
    } else {
      content = content.replace('</head>', tags + schemaTag + '\n</head>');
    }
    
    const outDir = path.join(isEn ? enBlogDir : arBlogDir, slug);
    ensureDir(outDir);
    fs.writeFileSync(path.join(outDir, 'index.html'), content);
  });
});

console.log(`Generated ${newArUrls.length} Arabic and ${newEnUrls.length} English static blog pages.`);

// 4. Update Sitemaps
const updateSitemap = (file, newUrls, isEn) => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove existing blog-post URLs if they exist (to avoid duplicates from past implementation)
  const existingMatches = content.match(/<url>[\s\S]*?<\/url>/g);
  let finalUrls = '';
  if (existingMatches) {
    existingMatches.forEach(match => {
      // Keep everything except the dynamic blog-post.html
      if (!match.includes('blog-post.html')) {
        finalUrls += match + '\n';
      }
    });
  }

  // Append new static URLs
  newUrls.forEach(item => {
    finalUrls += `  <url>\n    <loc>${item.url}</loc>\n    <xhtml:link rel="alternate" hreflang="en-SA" href="${isEn ? item.url : item.altEn}" />\n    <xhtml:link rel="alternate" hreflang="ar-SA" href="${isEn ? item.altAr : item.url}" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${isEn ? item.altAr : item.url}" />\n  </url>\n`;
  });

  const newSitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${finalUrls}</urlset>`;
  fs.writeFileSync(filePath, newSitemap);
};

updateSitemap('sitemap_ar.xml', newArUrls, false);
updateSitemap('sitemap_en.xml', newEnUrls, true);
console.log('Sitemaps updated automatically.');

// 5. Generate a dynamic config for vite to pick up the new files
const dynamicInputs = {};
blogPosts.forEach(post => {
  dynamicInputs[`ar_blog_${post.slug.replace(/-/g, '_')}`] = path.join(__dirname, `blog/${post.slug}/index.html`);
  dynamicInputs[`en_blog_${post.slug.replace(/-/g, '_')}`] = path.join(__dirname, `en/blog/${post.slug}/index.html`);
});

fs.writeFileSync(path.join(__dirname, 'blog_inputs.json'), JSON.stringify(dynamicInputs, null, 2));
console.log('Generated blog_inputs.json for Vite.');
