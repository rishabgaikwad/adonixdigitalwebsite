import { blogPosts } from './blogData.js';

document.addEventListener('DOMContentLoaded', () => {
  const featuredContainer = document.getElementById('featured-post-container');
  const gridContainer = document.getElementById('blog-grid');
  const filtersContainer = document.getElementById('blog-filters');

  let activeCategory = 'All';
  const categories = ['All', 'AI & Automation', 'Marketing', 'Company News', 'Product Updates'];

  function getCategoryColor(category) {
    if (category === 'Company News') return '#facc15'; // gold
    if (category === 'AI & Automation') return '#22d3ee'; // cyan
    return '#888'; // muted gray for others
  }

  function renderFilters() {
    const lang = document.documentElement.lang || 'en';
    const catTranslations = {
      'All': { en: 'All', ar: 'الكل' },
      'Company News': { en: 'Company News', ar: 'أخبار الشركة' },
      'AI & Automation': { en: 'AI & Automation', ar: 'الذكاء الاصطناعي والأتمتة' },
      'Marketing': { en: 'Marketing', ar: 'التسويق' },
      'Product Updates': { en: 'Product Updates', ar: 'تحديثات المنتج' }
    };
    filtersContainer.innerHTML = '';
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.textContent = catTranslations[cat] ? catTranslations[cat][lang] : cat;
      const isActive = cat === activeCategory;
      
      let baseStyle = "padding: 0.5rem 1.5rem; border-radius: 50px; font-weight: 600; font-size: 0.9rem; cursor: pointer; transition: all 0.3s ease;";
      
      if (isActive) {
        // active state logic based on category
        let color = getCategoryColor(cat);
        if (cat === 'All') color = '#facc15';
        btn.style = baseStyle + `background: transparent; border: 1px solid ${color}; color: ${color}; box-shadow: 0 0 10px rgba(${color === '#facc15' ? '250,204,21' : '34,211,238'}, 0.2);`;
      } else {
        btn.style = baseStyle + "background: transparent; border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.5);";
      }

      btn.addEventListener('click', () => {
        activeCategory = cat;
        renderFilters();
        renderPosts();
      });

      filtersContainer.appendChild(btn);
    });
  }

  function renderPosts() {
    const lang = document.documentElement.lang || 'en';
    const getField = (obj, field) => obj[`${field}_${lang}`] || obj[field];

    const featuredPost = blogPosts.find(p => p.featured);
    const standardPosts = blogPosts.filter(p => !p.featured);
    
    // Filter logic
    const filteredPosts = activeCategory === 'All' 
      ? standardPosts 
      : standardPosts.filter(p => p.category === activeCategory);

    // Render Featured (only show if 'All' or matches category)
    if (featuredContainer && featuredPost) {
      if (activeCategory === 'All' || featuredPost.category === activeCategory) {
        featuredContainer.style.display = 'block';
        const catColor = getCategoryColor(featuredPost.category);
        featuredContainer.innerHTML = `
          <a href="${lang === 'ar' ? '/blog/' : '/en/blog/'}${featuredPost.slug}/" style="text-decoration: none;">
            <div class="glass" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; padding: clamp(1.5rem, 5vw, 2rem); border-radius: 20px; transition: all 0.3s ease; border-top: 2px solid ${catColor};" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.5)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
              <div style="background: url('${featuredPost.image}') center/cover no-repeat; border-radius: 15px; min-height: 300px; display: flex; align-items: center; justify-content: center; position: relative;">
                 <div style="position: absolute; inset: 0; background: linear-gradient(135deg, rgba(0,0,0,0.2), rgba(0,0,0,0.6)); border-radius: 15px;"></div>
              </div>
              <div style="display: flex; flex-direction: column; justify-content: center; text-align: left;">
                <div style="margin-bottom: 1rem;">
                  <span style="background: rgba(255,255,255,0.1); color: ${catColor}; padding: 0.3rem 1rem; border-radius: 50px; font-size: 0.8rem; font-weight: 600;">${getField(featuredPost, 'category')}</span>
                </div>
                <h2 style="font-size: 2.5rem; color: white; margin-bottom: 1rem; line-height: 1.2;">${getField(featuredPost, 'title')}</h2>
                <p style="color: rgba(255,255,255,0.6); margin-bottom: 1.5rem; line-height: 1.6; font-size: 1.1rem;">${getField(featuredPost, 'excerpt')}</p>
                <div style="display: flex; align-items: center; gap: 1rem; font-size: 0.9rem; color: rgba(255,255,255,0.4); margin-bottom: 2rem;">
                  <span>${getField(featuredPost, 'author')}</span> &bull; <span>${getField(featuredPost, 'date')}</span> &bull; <span>${getField(featuredPost, 'readTime')}</span>
                </div>
                <div>
                  <span style="color: #22d3ee; font-weight: 600; display: inline-flex; align-items: center; gap: 0.5rem;">${lang === 'ar' ? 'اقرأ المقال \u2190' : 'Read Article &rarr;'}</span>
                </div>
              </div>
            </div>
          </a>
        `;
      } else {
        featuredContainer.style.display = 'none';
      }
    }

    // Render Grid
    if (gridContainer) {
      gridContainer.innerHTML = '';
      filteredPosts.forEach(post => {
        const catColor = getCategoryColor(post.category);
        const card = document.createElement('a');
        card.href = `${lang === 'ar' ? '/blog/' : '/en/blog/'}${post.slug}/`;
        card.style.textDecoration = 'none';
        card.innerHTML = `
          <div class="glass" style="display: flex; flex-direction: column; height: 100%; padding: 1.5rem; border-radius: 20px; transition: all 0.3s ease; border-top: 2px solid ${catColor};" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.5)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
            <div style="background: url('${post.image}') center/cover no-repeat; border-radius: 15px; height: 200px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; position: relative;">
               <div style="position: absolute; inset: 0; background: linear-gradient(135deg, rgba(0,0,0,0.2), rgba(0,0,0,0.7)); border-radius: 15px;"></div>
            </div>
            <div style="flex: 1; text-align: left; display: flex; flex-direction: column;">
              <div style="margin-bottom: 1rem;">
                <span style="background: rgba(255,255,255,0.1); color: ${catColor}; padding: 0.3rem 0.8rem; border-radius: 50px; font-size: 0.75rem; font-weight: 600;">${getField(post, 'category')}</span>
              </div>
              <h3 style="font-size: 1.4rem; color: white; margin-bottom: 1rem; line-height: 1.3;">${getField(post, 'title')}</h3>
              <p style="color: rgba(255,255,255,0.6); margin-bottom: 1.5rem; line-height: 1.6; font-size: 0.95rem; flex: 1;">${getField(post, 'excerpt')}</p>
              <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.8rem; color: rgba(255,255,255,0.4); border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem;">
                <span>${getField(post, 'author')}</span>
                <span>${getField(post, 'readTime')}</span>
              </div>
            </div>
          </div>
        `;
        gridContainer.appendChild(card);
      });
    }
  }

  if (filtersContainer) renderFilters();
  if (gridContainer || featuredContainer) renderPosts();

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes" && mutation.attributeName === "lang") {
        if (filtersContainer) renderFilters();
        if (gridContainer || featuredContainer) renderPosts();
      }
    });
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
});
