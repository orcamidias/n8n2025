from bs4 import BeautifulSoup

with open('rendered_lovable.html', 'r') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

print("--- Classes used in Buttons ---")
for el in soup.find_all(['button', 'a']):
    print(el.get('class'))
