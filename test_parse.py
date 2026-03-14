from bs4 import BeautifulSoup

with open('rendered_output.html', 'r') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

print("--- TEXT BLOCKS ---")
for el in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'button']):
    text = el.get_text(strip=True)
    if text and len(text) > 10 and len(text) < 200:
        print(f"{el.name}: {text}")
