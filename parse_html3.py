from bs4 import BeautifulSoup
with open('output.html', 'r') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
print(soup.prettify()[:1000])
