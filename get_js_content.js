const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://tecereducacional.com.br/', { waitUntil: 'networkidle' });

  const content = await page.content();
  fs.writeFileSync('rendered_output.html', content);
  await browser.close();
})();
