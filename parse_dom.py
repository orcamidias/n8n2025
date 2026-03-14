import json
with open('dom_analysis.json', 'r') as f:
    content = f.read()

# Try to find the JSON parts if there's other text
print(content[:1000])
