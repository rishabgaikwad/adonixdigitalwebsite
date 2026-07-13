const puppeteer = require('puppeteer');
const fs = require('fs');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  
  // Wait for loader to finish
  await new Promise(r => setTimeout(r, 2000));
  
  // 0%
  await page.screenshot({ path: 'C:/Users/rishab/.gemini/antigravity-ide/brain/c0e1047b-9696-48f1-8ecc-133d1f5e73ce/screenshot_0.png' });
  
  // 10%
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.1));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'C:/Users/rishab/.gemini/antigravity-ide/brain/c0e1047b-9696-48f1-8ecc-133d1f5e73ce/screenshot_10.png' });
  
  // 20%
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.2));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'C:/Users/rishab/.gemini/antigravity-ide/brain/c0e1047b-9696-48f1-8ecc-133d1f5e73ce/screenshot_20.png' });
  
  // 100%
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'C:/Users/rishab/.gemini/antigravity-ide/brain/c0e1047b-9696-48f1-8ecc-133d1f5e73ce/screenshot_100.png' });
  
  await browser.close();
})();
