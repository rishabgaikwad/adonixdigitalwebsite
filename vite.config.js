import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let blogInputs = {};
const blogInputsPath = resolve(__dirname, 'blog_inputs.json');
if (fs.existsSync(blogInputsPath)) {
  blogInputs = JSON.parse(fs.readFileSync(blogInputsPath, 'utf8'));
}

export default defineConfig({
  server: {
    port: 3000
  },
  build: {
    rollupOptions: {
      input: {
        ...blogInputs,
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        services: resolve(__dirname, 'services.html'),
        contact: resolve(__dirname, 'contact.html'),
        products: resolve(__dirname, 'products.html'),
        blog: resolve(__dirname, 'blog.html'),
        blogpost: resolve(__dirname, 'blog-post.html'),
        audit: resolve(__dirname, 'audit.html'),
        thankyouaudit: resolve(__dirname, 'thank-you-audit.html'),
        en_main: resolve(__dirname, 'en/index.html'),
        en_about: resolve(__dirname, 'en/about.html'),
        en_services: resolve(__dirname, 'en/services.html'),
        en_contact: resolve(__dirname, 'en/contact.html'),
        en_products: resolve(__dirname, 'en/products.html'),
        en_blog: resolve(__dirname, 'en/blog.html'),
        en_blogpost: resolve(__dirname, 'en/blog-post.html'),
        en_audit: resolve(__dirname, 'en/audit.html'),
        en_thankyouaudit: resolve(__dirname, 'en/thank-you-audit.html')
      }
    }
  }
});
