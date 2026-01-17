
import os
import re

# We are looking at the original file (reverted)
file_path = "assets/index-DyCuOWM7.js"

with open(file_path, "r") as f:
    content = f.read()

# Pattern: path: "/founder", element: ...
# Regex to capture the exact structure including component variables
# Minified code often looks like: path:"/founder",element:r.jsx(O4,{})
# We want to capture the whole route definition object or function call.
# Let's find the string first.

match = re.search(r'\{path:"/founder",element:[^}]+\}\)', content)
if not match:
    # Try with spaces
    match = re.search(r'\{path: "/founder", element:[^}]+\}\)', content)

if match:
    found_str = match.group(0) # e.g. {path:"/founder",element:r.jsx(O4,{})})
    print(f"FOUND: {found_str}")
    
    # Create Duplicate
    # structure: {path:"/founder",...})
    # We want: {path:"/founder",...}),r.jsx(Cn,{path:"/bhanudeep-founder",...})
    # Wait, the surrounding context matters. 
    # Usually: children:[r.jsx(Cn,{path:"/",...}), r.jsx(Cn,{path:"/founder",element:r.jsx(O4,{})})]
    # So we prefer to replace `r.jsx(Cn,{path:"/founder",element:r.jsx(O4,{})})` 
    # with `r.jsx(Cn,{path:"/founder",element:r.jsx(O4,{})}),r.jsx(Cn,{path:"/bhanudeep-founder",element:r.jsx(O4,{})})`
    
    # Let's locate the full call `r.jsx(Cn,` preceding it?
    # We might need a slightly wider window.
    
    start_idx = match.start()
    end_idx = match.end()
    
    # Look back for "r.jsx(Cn," or similar
    # We will just verify if we can safely duplicate the MATCHED string if it looks like a complete object/callee
    
    # Alternative: Just replace the string `path:"/founder"` with `path:"/founder"` ... wait that does nothing
    # We need to inject the sibling.
    
    # Let's try to match the whole r.jsx(...) call.
    # It balances parenthesis? tough in regex.
    pass
else:
    print("NOT FOUND")
