import re
with open('rendered_lovable.html', 'r') as f:
    text = f.read()

styles = re.findall(r'(\.[a-zA-Z0-9_-]+)[^{]*\{([^}]+)\}', text)
for cls, content in styles:
    if 'bg-gradient' in cls or 'gold' in cls or 'primary' in cls or 'btn' in cls:
        print(f"{cls} {{ {content} }}")
