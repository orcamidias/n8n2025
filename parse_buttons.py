import json

with open('lovable_components.json', 'r') as f:
    data = json.load(f)

for btn in data.get('buttons', []):
    print(f"Text: {btn.get('text')}")
    print(f"bgColor: {btn.get('bgColor')}")
    print(f"color: {btn.get('color')}")
    print(f"borderRadius: {btn.get('borderRadius')}")
    print(f"padding: {btn.get('padding')}")
    print(f"fontSize: {btn.get('fontSize')}")
    print(f"fontFamily: {btn.get('fontFamily')}")
    print(f"fontWeight: {btn.get('fontWeight')}")
    print("---")
