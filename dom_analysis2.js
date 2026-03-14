const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://tecereducacional.com.br/', { waitUntil: 'networkidle' });

  const results = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('a, button'));
    const btns = buttons.map(b => ({
      text: b.innerText.trim(),
      classes: b.className,
      bgColor: window.getComputedStyle(b).backgroundColor,
      color: window.getComputedStyle(b).color,
      borderRadius: window.getComputedStyle(b).borderRadius,
      padding: window.getComputedStyle(b).padding,
      fontSize: window.getComputedStyle(b).fontSize,
      fontFamily: window.getComputedStyle(b).fontFamily,
      fontWeight: window.getComputedStyle(b).fontWeight,
    })).filter(b => b.text.length > 0 && b.text.length < 50);

    const hs = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const headings = hs.map(h => ({
      tag: h.tagName,
      text: h.innerText.trim(),
      fontSize: window.getComputedStyle(h).fontSize,
      fontWeight: window.getComputedStyle(h).fontWeight,
      fontFamily: window.getComputedStyle(h).fontFamily,
      color: window.getComputedStyle(h).color,
      lineHeight: window.getComputedStyle(h).lineHeight,
    })).filter(h => h.text.length > 0);

    const ps = Array.from(document.querySelectorAll('p'));
    const bodyText = ps.map(p => ({
      text: p.innerText.trim(),
      fontSize: window.getComputedStyle(p).fontSize,
      fontWeight: window.getComputedStyle(p).fontWeight,
      fontFamily: window.getComputedStyle(p).fontFamily,
      color: window.getComputedStyle(p).color,
      lineHeight: window.getComputedStyle(p).lineHeight,
    })).filter(p => p.text.length > 0).slice(0, 5);

    return { btns, headings, bodyText };
  });

  const { btns, headings, bodyText } = results;

  console.log("--- BUTTONS ---");
  const uniqueButtons = [];
  const seenBtnStyles = new Set();
  for (const b of btns) {
    const key = `${b.bgColor}-${b.color}-${b.borderRadius}-${b.padding}-${b.fontSize}`;
    if (!seenBtnStyles.has(key)) {
      seenBtnStyles.add(key);
      uniqueButtons.push(b);
    }
  }
  console.log(JSON.stringify(uniqueButtons.slice(0, 10), null, 2));

  console.log("\n--- HEADINGS ---");
  const uniqueHeadings = [];
  const seenHeadingStyles = new Set();
  for (const h of headings) {
    const key = `${h.tag}-${h.fontSize}-${h.fontWeight}-${h.fontFamily}-${h.lineHeight}`;
    if (!seenHeadingStyles.has(key)) {
      seenHeadingStyles.add(key);
      uniqueHeadings.push(h);
    }
  }
  console.log(JSON.stringify(uniqueHeadings.slice(0, 10), null, 2));

  console.log("\n--- BODY TEXT ---");
  console.log(JSON.stringify(bodyText, null, 2));

  await browser.close();
})();
