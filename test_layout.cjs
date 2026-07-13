const puppeteer = require('puppeteer');

const pages = [
  '',
  'about.html',
  'services.html',
  'products.html',
  'contact.html',
  'blog.html'
];
const breakpoints = [1200, 1024, 768, 480, 375];
const baseUrl = 'http://localhost:3000/';

async function runTests() {
  const browser = await puppeteer.launch({ headless: 'new' });
  let report = '# Layout Testing Report\n\n';

  for (const page of pages) {
    const url = baseUrl + page;
    report += `## Page: /${page || 'index.html'}\n\n`;
    const bPage = await browser.newPage();
    
    // Test LTR
    for (const width of breakpoints) {
      await bPage.setViewport({ width, height: 800 });
      await bPage.goto(url, { waitUntil: 'load' });
      
      const overflowInfo = await bPage.evaluate(() => {
        const sw = document.documentElement.scrollWidth;
        const iw = window.innerWidth;
        
        let badElements = [];
        if (sw > iw) {
          const elements = document.querySelectorAll('*');
          for (let i = 0; i < elements.length; i++) {
            if (elements[i].scrollWidth > iw || elements[i].getBoundingClientRect().right > iw) {
              if (elements[i].tagName !== 'HTML' && elements[i].tagName !== 'BODY' && elements[i].tagName !== 'SCRIPT') {
                badElements.push(elements[i].tagName + (elements[i].className ? '.' + elements[i].className.split(' ').join('.') : ''));
              }
            }
          }
        }
        return {
          hasOverflow: sw > iw,
          sw, iw,
          elements: badElements.slice(0, 5) // top 5
        };
      });

      if (overflowInfo.hasOverflow) {
        report += `- **${width}px (LTR):** ❌ Horizontal Overflow! (ScrollWidth: ${overflowInfo.sw}px, WindowWidth: ${overflowInfo.iw}px)\n`;
        report += `  - Problem elements: ${overflowInfo.elements.join(', ')}\n`;
      } else {
        report += `- **${width}px (LTR):** ✅ Clean\n`;
      }
    }

    // Test RTL + Hamburger Menu specifically on index (768px)
    if (page === '') {
      await bPage.setViewport({ width: 768, height: 800 });
      await bPage.goto(url, { waitUntil: 'load' });
      
      // trigger RTL
      await bPage.evaluate(() => {
        document.documentElement.dir = 'rtl';
      });
      await new Promise(r => setTimeout(r, 500));
      
      const rtlHamburgerTest = await bPage.evaluate(() => {
        const btn = document.querySelector('.mobile-toggle-btn');
        if(!btn) return 'No hamburger button found';
        
        const btnRect = btn.getBoundingClientRect();
        // in RTL, hamburger is usually on the right or left depending on design
        // checking if it works and menu opens correctly
        btn.click();
        return {
          btnX: btnRect.x,
          btnRight: btnRect.right,
          windowWidth: window.innerWidth
        };
      });
      
      await new Promise(r => setTimeout(r, 500));
      const menuTest = await bPage.evaluate(() => {
        const menu = document.querySelector('.mobile-menu-overlay');
        const isActive = menu && menu.classList.contains('active');
        const isRtl = window.getComputedStyle(menu).direction === 'rtl';
        return `Hamburger Position in RTL: x=${rtlHamburgerTest.btnX} (Right aligned: ${Math.abs(rtlHamburgerTest.btnRight - window.innerWidth) < 50}). Menu active: ${isActive}. Menu RTL: ${isRtl}`;
      });
      
      report += `- **RTL Test (768px):** Menu opens: ${menuTest}\n`;
    }
    
    await bPage.close();
  }

  await browser.close();
  
  const fs = require('fs');
  fs.writeFileSync('c:/Users/rishab/adonixdigital/test_report.md', report);
  console.log('Report generated at test_report.md');
}

runTests().catch(console.error);
