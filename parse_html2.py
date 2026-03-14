from bs4 import BeautifulSoup
import json

with open('output.html', 'r') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

# Get all text blocks and structure
print("--- HEADINGS ---")
for h in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
    print(f"{h.name}: {h.get_text(strip=True)[:100]}")

print("\n--- BUTTONS ---")
for b in soup.find_all(['a', 'button']):
    text = b.get_text(strip=True)
    if text:
        print(f"Text: {text}, Classes: {b.get('class', [])}")
