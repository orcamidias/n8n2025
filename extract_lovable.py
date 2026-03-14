import urllib.request
import re

url = "https://weave-schools-shine.lovable.app/"

try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')

    # Find CSS files
    css_links = re.findall(r'<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"', html)
    print("CSS Links found:", css_links)

    # Extract embedded styles
    styles = re.findall(r'<style[^>]*>(.*?)</style>', html, re.DOTALL)

    # Fetch external CSS content
    css_content = "".join(styles)
    for link in css_links:
        if link.startswith('/'):
            link = "https://weave-schools-shine.lovable.app" + link
        elif not link.startswith('http'):
            continue
        try:
            req_css = urllib.request.Request(link, headers={'User-Agent': 'Mozilla/5.0'})
            css_content += urllib.request.urlopen(req_css).read().decode('utf-8')
        except Exception as e:
            print(f"Failed to fetch {link}: {e}")

    # Extract colors
    hex_colors = set(re.findall(r'#[0-9a-fA-F]{3,6}\b', css_content))
    rgb_colors = set(re.findall(r'rgba?\([^)]+\)', css_content))

    # Extract fonts
    fonts = set(re.findall(r'font-family:\s*([^;]+);', css_content))

    print("\n--- HEX COLORS ---")
    for c in list(hex_colors)[:20]: print(c.lower())

    print("\n--- FONTS ---")
    for f in list(fonts)[:10]: print(f.strip())

    # Extract title and meta description
    title = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE)
    if title: print("\n--- TITLE ---\n", title.group(1))

    meta_desc = re.search(r'<meta[^>]*name="description"[^>]*content="([^"]+)"', html, re.IGNORECASE)
    if meta_desc: print("\n--- META DESC ---\n", meta_desc.group(1))

    print("\n--- SOME TEXT CONTENT ---")
    # basic strip tags
    text = re.sub(r'<[^>]+>', ' ', html)
    text = re.sub(r'\s+', ' ', text)
    print(text[:1000])

    print("\n--- CSS Variables ---")
    vars = re.findall(r'(--[^:]+:\s*[^;]+;)', css_content)
    for v in vars[:30]: print(v)

except Exception as e:
    print("Error:", e)
