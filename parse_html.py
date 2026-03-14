from bs4 import BeautifulSoup
import re

with open('output.html', 'r') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
print(f"Title: {soup.title.string if soup.title else 'No Title'}")

css_vars = []
for style in soup.find_all('style'):
    text = style.string
    if text:
        vars = re.findall(r'(--[^:]+:\s*[^;]+;)', text)
        css_vars.extend(vars)

print("\n--- CSS Variables ---")
for v in list(set(css_vars))[:50]:
    print(v)
