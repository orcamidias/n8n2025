const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync('output.html', 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

console.log("--- TITLE ---", document.title);

const colors = new Set();
const styles = document.querySelectorAll('style');
styles.forEach(s => {
  const matches = s.textContent.match(/--[a-zA-Z0-9-]+:\s*[^;]+;/g);
  if (matches) {
    matches.forEach(m => console.log(m));
  }
});
