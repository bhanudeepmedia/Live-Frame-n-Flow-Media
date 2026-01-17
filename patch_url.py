
import os

file_path = "assets/index-DyCuOWM7.js"

with open(file_path, "r") as f:
    content = f.read()

replacements = [
    ('path: "/founder"', 'path: "/founder-bhanudeep"'),
    ('path:"/founder"', 'path:"/founder-bhanudeep"'),
    ('to: "/founder"', 'to: "/founder-bhanudeep"'),
    ('to:"/founder"', 'to:"/founder-bhanudeep"'),
]

new_content = content
for target, replacement in replacements:
    if target in new_content:
        print(f"Found '{target}', replacing with '{replacement}'")
        new_content = new_content.replace(target, replacement)
    else:
        print(f"Target '{target}' not found (might be already patched or different format)")

if new_content != content:
    with open(file_path, "w") as f:
        f.write(new_content)
    print("SUCCESS: File updated")
else:
    print("NO CHANGE: Content appeared already up to date or strings not found.")
