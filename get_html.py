import urllib.request

url = "https://tecereducacional.com.br/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')

with open('output.html', 'w') as f:
    f.write(html)
