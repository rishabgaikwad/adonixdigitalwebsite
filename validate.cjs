const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  let errors = 0;
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('CONSOLE ERROR:', msg.text());
      errors++;
    } else {
      console.log('CONSOLE LOG:', msg.text());
    }
  });
  page.on('pageerror', error => {
    console.log('PAGE ERROR:', error.message);
    errors++;
  });

  await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));
  
  const snaps = [0, 0.10, 0.25, 0.50, 0.75, 1.0];
  for (let s of snaps) {
    await page.evaluate((scrollRatio) => {
      window.scrollTo(0, document.body.scrollHeight * scrollRatio);
    }, s);
    await new Promise(r => setTimeout(r, 800));
    const label = (s * 100).toString();
    await page.screenshot({ path: `C:/Users/rishab/.gemini/antigravity-ide/brain/c0e1047b-9696-48f1-8ecc-133d1f5e73ce/screenshot_${label}.png` });
    console.log(`Captured ${label}% scroll`);
  }
  
  console.log(`Finished with ${errors} console errors.`);
  await browser.close();
})();
