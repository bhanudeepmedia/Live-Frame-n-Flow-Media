
with open('/Users/bhanudeep/Downloads/dist/assets/index-DyCuOWM7.js', 'r') as f:
    content = f.read()
    index = content.find('V4=')
    if index != -1:
        print(content[index-100:index+3000])
    else:
        print("V4 not found")
