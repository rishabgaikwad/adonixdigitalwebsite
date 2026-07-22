import { blogPosts } from './blogData.js';

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  let slug = urlParams.get('slug');
  if (!slug) {
    const pathParts = window.location.pathname.split('/');
    // Check if the URL is like /blog/slug/ or /en/blog/slug/
    const blogIndex = pathParts.indexOf('blog');
    if (blogIndex !== -1 && pathParts.length > blogIndex + 1) {
      slug = pathParts[blogIndex + 1];
    }
  }

  const postHero = document.getElementById('post-hero');
  const postContent = document.getElementById('post-content');
  const relatedGrid = document.getElementById('related-grid');

  const post = blogPosts.find(p => p.slug === slug);

  function getCategoryColor(category) {
    if (category === 'Company News') return '#facc15';
    if (category === 'AI & Automation') return '#22d3ee';
    return '#888';
  }

  // Determine related posts once so they don't randomize on language change
  let relatedPosts = [];
  if (post && relatedGrid) {
    const otherPosts = blogPosts.filter(p => p.id !== post.id);
    relatedPosts = otherPosts.sort(() => 0.5 - Math.random()).slice(0, 3);
  }

  function renderPost() {
    if (!post) {
      if (postHero) postHero.innerHTML = '<h1 style="color:white;">Post Not Found</h1><a href="blog.html" style="color:#22d3ee; margin-top:2rem;">&larr; Back to Blog</a>';
      return;
    }

    const catColor = getCategoryColor(post.category);
    const lang = document.documentElement.lang || 'en';
    const getField = (obj, field) => obj[`${field}_${lang}`] || obj[field];

    if (postHero) {
      
      // Dynamic SEO Injection for Blog Post
      const postTitle = getField(post, 'title');
      const postExcerpt = getField(post, 'excerpt');
      
      document.title = postTitle + " | Adonix Digital";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", postExcerpt);
      
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", postTitle);
      
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", postExcerpt);
      
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) ogImage.setAttribute("content", "https://adonixdigital.com" + post.image);
      
      const twTitle = document.querySelector('meta[name="twitter:title"]');
      if (twTitle) twTitle.setAttribute("content", postTitle);
      
      const twDesc = document.querySelector('meta[name="twitter:description"]');
      if (twDesc) twDesc.setAttribute("content", postExcerpt);
      
      const twImage = document.querySelector('meta[name="twitter:image"]');
      if (twImage) twImage.setAttribute("content", "https://adonixdigital.com" + post.image);

      // JSON-LD BlogPosting Schema
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": postTitle,
        "image": "https://adonixdigital.com" + post.image,
        "author": {
          "@type": "Organization",
          "name": getField(post, 'author')
        },
        "publisher": {
          "@type": "Organization",
          "name": "Adonix Digital",
          "logo": {
            "@type": "ImageObject",
            "url": "https://adonixdigital.com/adonixlogot.svg"
          }
        },
        "description": postExcerpt
      });
      document.head.appendChild(script);

      postHero.innerHTML = `
        <div style="background-image: url('${post.image}'); background-size: cover; background-position: center; background-repeat: no-repeat; border-radius: 20px; width: 100%; min-height: 400px; margin-bottom: 2rem; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.5); display: flex; flex-direction: column; justify-content: flex-end;">
           <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%); border-radius: 20px; z-index: 1;"></div>
           <div style="position: relative; z-index: 2; padding: 3rem 2rem; display: flex; flex-direction: column; align-items: center;">
              <div class="badge fade-in" style="margin-bottom: 1rem; border-color: ${catColor}; color: ${catColor}; box-shadow: none;">${getField(post, 'category')}</div>
              <h1 class="main-headline fade-in" style="font-size: clamp(2rem, 5vw, 3.5rem); text-align: center; margin-bottom: 1.5rem; text-shadow: 0 4px 20px rgba(0,0,0,0.8); max-width: 900px; line-height: 1.2;">${getField(post, 'title')}</h1>
              <div class="fade-in" style="display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 1rem; font-size: 1rem; color: rgba(255,255,255,0.8);">
                <span>${getField(post, 'author')}</span> <span style="color: rgba(255,255,255,0.4);">&bull;</span> <span>${getField(post, 'date')}</span> <span style="color: rgba(255,255,255,0.4);">&bull;</span> <span>${getField(post, 'readTime')}</span>
              </div>
           </div>
        </div>
      `;
    }

    if (postContent) {
      postContent.innerHTML = getField(post, 'content');
      
      // Simple styling adjustments for content
      const headings = postContent.querySelectorAll('h3');
      headings.forEach(h => {
        h.style.color = 'white';
        h.style.marginTop = '2.5rem';
        h.style.marginBottom = '1rem';
        h.style.fontSize = '1.8rem';
      });
      const paragraphs = postContent.querySelectorAll('p');
      paragraphs.forEach(p => {
        p.style.marginBottom = '1.5rem';
        p.style.fontSize = '1.1rem';
      });
      const lists = postContent.querySelectorAll('ul, ol');
      lists.forEach(l => {
        l.style.marginBottom = '1.5rem';
        l.style.paddingLeft = '1.5rem';
        l.style.fontSize = '1.1rem';
      });
      const listItems = postContent.querySelectorAll('li');
      listItems.forEach(li => {
        li.style.marginBottom = '0.5rem';
      });

      // Table styling to fix text congestion
      const tables = postContent.querySelectorAll('table');
      tables.forEach(t => {
        const wrapper = document.createElement('div');
        wrapper.style.overflowX = 'auto';
        wrapper.style.width = '100%';
        t.parentNode.insertBefore(wrapper, t);
        wrapper.appendChild(t);
      });
      tables.forEach(t => {
        t.style.width = '100%';
        t.style.borderCollapse = 'collapse';
        t.style.marginBottom = '2.5rem';
        t.style.marginTop = '1.5rem';
      });
      const tableCells = postContent.querySelectorAll('th, td');
      tableCells.forEach(tc => {
        tc.style.padding = '1rem';
        tc.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        tc.style.textAlign = 'start';
        tc.style.lineHeight = '1.5';
      });
      const tableHeaders = postContent.querySelectorAll('th');
      tableHeaders.forEach(th => {
        th.style.backgroundColor = 'rgba(255,255,255,0.05)';
        th.style.fontWeight = 'bold';
        th.style.color = '#22d3ee';
      });

      // Extract and render FAQ section as an accordion in a new card
      const headings3 = Array.from(postContent.querySelectorAll('h3'));
      const faqHeading = headings3.find(h => h.textContent.includes('Frequently Asked Questions') || h.textContent.includes('الأسئلة الشائعة'));
      
      let faqSection = document.getElementById('faq-section');
      if (faqHeading) {
        const faqItems = [];
        let curr = faqHeading.nextElementSibling;
        while (curr && curr.tagName === 'P' && curr.querySelector('strong')) {
          faqItems.push(curr);
          curr = curr.nextElementSibling;
        }
        
        if (faqItems.length > 0) {
          const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": []
          };
          let accordionHtml = `<h3 style="color: white; margin-bottom: 1.5rem; font-size: 1.8rem; text-align: start;">${faqHeading.innerHTML}</h3>`;
          
          faqItems.forEach(item => {
            const strongTag = item.querySelector('strong');
            let question = strongTag ? strongTag.innerHTML : '';
            let answer = strongTag ? item.innerHTML.replace(strongTag.outerHTML, '').replace(/^<br\s*\/?>/, '').trim() : '';
            
            if (question && answer) {
              faqSchema.mainEntity.push({
                "@type": "Question",
                "name": question.replace(/<[^>]+>/g, ''),
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": answer.replace(/<[^>]+>/g, '')
                }
              });
            }
            
            accordionHtml += `
               <div class="faq-item" style="border-bottom: 1px solid rgba(255,255,255,0.1); padding: 1rem 0;">
                 <div class="faq-question" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-weight: bold; color: #22d3ee; font-size: 1.1rem; transition: color 0.3s ease;" onmouseover="this.style.color='white'" onmouseout="this.style.color='#22d3ee'" onclick="const ans = this.nextElementSibling; const icon = this.querySelector('.faq-icon'); if(ans.style.display === 'none'){ ans.style.display = 'block'; icon.textContent = '-'; } else { ans.style.display = 'none'; icon.textContent = '+'; }">
                   <span>${question}</span>
                   <span class="faq-icon" style="font-size: 1.5rem; font-weight: normal;">+</span>
                 </div>
                 <div class="faq-answer" style="display: none; padding-top: 1rem; color: rgba(255,255,255,0.8); line-height: 1.8;">${answer}</div>
               </div>
            `;
          });
          
          if (!faqSection) {
            faqSection = document.createElement('section');
            faqSection.id = 'faq-section';
            faqSection.style.paddingTop = '2vh';
            faqSection.style.paddingBottom = '5vh';
            faqSection.style.position = 'relative';
            
            const containerSec = postContent.closest('section');
            containerSec.insertAdjacentElement('afterend', faqSection);
          }
          
          faqSection.innerHTML = `
            <div class="container">
              <div class="glass no-tilt" style="max-width: 750px; margin: 0 auto; padding: clamp(1.5rem, 5vw, 3rem); border-radius: 20px; text-align: start; line-height: 1.8; color: rgba(255,255,255,0.8); overflow-wrap: anywhere;">
                ${accordionHtml}
              </div>
            </div>
          `;
          
          faqHeading.remove();
          faqItems.forEach(item => item.remove());
          
          if (faqSchema.mainEntity.length > 0) {
            const faqScript = document.createElement('script');
            faqScript.type = 'application/ld+json';
            faqScript.text = JSON.stringify(faqSchema, null, 2);
            document.head.appendChild(faqScript);
          }
        } else if (faqSection) {
          faqSection.remove();
        }
      } else if (faqSection) {
        faqSection.remove();
      }
    }

    if (relatedGrid) {
      relatedGrid.innerHTML = '';
      relatedPosts.forEach(rp => {
        const rpColor = getCategoryColor(rp.category);
        const card = document.createElement('a');
        card.href = `blog-post.html?slug=${rp.slug}`;
        card.style.textDecoration = 'none';
        card.innerHTML = `
          <div class="glass" style="display: flex; flex-direction: column; height: 100%; padding: 1.5rem; border-radius: 20px; transition: all 0.3s ease; border-top: 2px solid ${rpColor};" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.5)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
            <div style="background: url('${rp.image}') center/cover no-repeat; border-radius: 15px; height: 150px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; position: relative;">
               <div style="position: absolute; inset: 0; background: linear-gradient(135deg, rgba(0,0,0,0.2), rgba(0,0,0,0.7)); border-radius: 15px;"></div>
            </div>
            <div style="flex: 1; text-align: left; display: flex; flex-direction: column;">
              <div style="margin-bottom: 0.5rem;">
                <span style="color: ${rpColor}; font-size: 0.75rem; font-weight: 600; background: rgba(255,255,255,0.1); padding: 0.2rem 0.6rem; border-radius: 50px;">${getField(rp, 'category')}</span>
              </div>
              <h4 style="color: white; font-size: 1.1rem; margin-bottom: 1rem; line-height: 1.3;">${getField(rp, 'title')}</h4>
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: rgba(255,255,255,0.4); margin-top: auto;">
                <span>${getField(rp, 'date')}</span>
                <span>${getField(rp, 'readTime')}</span>
              </div>
          </div>
        `;
        relatedGrid.appendChild(card);
      });
    }
  }

  // Initial render
  renderPost();

  // Watch for language changes on the document element
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes" && mutation.attributeName === "lang") {
        renderPost();
      }
    });
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

});
