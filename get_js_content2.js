const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://weave-schools-shine.lovable.app/', { waitUntil: 'networkidle' });

  const content = await page.content();
  fs.writeFileSync('rendered_lovable.html', content);

  const buttons = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('a, button'));
    return btns.map(b => ({
      text: b.innerText.trim(),
      classes: b.className,
      bgColor: window.getComputedStyle(b).backgroundColor,
      color: window.getComputedStyle(b).color,
      borderRadius: window.getComputedStyle(b).borderRadius,
      padding: window.getComputedStyle(b).padding,
      fontSize: window.getComputedStyle(b).fontSize,
      fontFamily: window.getComputedStyle(b).fontFamily,
      fontWeight: window.getComputedStyle(b).fontWeight,
    })).filter(b => b.text && b.text.length > 0 && b.text.length < 50);
  });

  const headings = await page.evaluate(() => {
    const hs = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    return hs.map(h => ({
      tag: h.tagName,
      text: h.innerText.trim(),
      fontSize: window.getComputedStyle(h).fontSize,
      fontWeight: window.getComputedStyle(h).fontWeight,
      fontFamily: window.getComputedStyle(h).fontFamily,
      color: window.getComputedStyle(h).color,
      lineHeight: window.getComputedStyle(h).lineHeight,
    })).filter(h => h.text && h.text.length > 0);
  });

  const bodyText = await page.evaluate(() => {
    const ps = Array.from(document.querySelectorAll('p, span'));
    return ps.map(p => ({
      text: p.innerText.trim(),
      fontSize: window.getComputedStyle(p).fontSize,
      fontWeight: window.getComputedStyle(p).fontWeight,
      fontFamily: window.getComputedStyle(p).fontFamily,
      color: window.getComputedStyle(p).color,
      lineHeight: window.getComputedStyle(p).lineHeight,
    })).filter(p => p.text && p.text.length > 0).slice(0, 15);
  });

  fs.writeFileSync('lovable_components.json', JSON.stringify({buttons, headings, bodyText}, null, 2));

  await browser.close();
})();
