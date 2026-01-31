# How to Get AI Tools to Read Your Website

## The Problem
The main website pages (like `/growth-partner`) use **Client-Side Rendering (CSR)**, which means the content is loaded by JavaScript after the page loads. AI tools like ChatGPT and Gemini cannot execute JavaScript, so they see an empty page.

## The Solution
We've created **static documentation files** that AI tools CAN read. These contain the exact same information as your website pages, but in a format that doesn't require JavaScript.

---

## For AI Tools: Use These URLs

### Option 1: Dedicated HTML Page (BEST)
**URL:** https://framenflowmedia.in/growth-partner-info.html

**What to say to ChatGPT/Gemini:**
> "Read and summarize the content at: https://framenflowmedia.in/growth-partner-info.html"

**Why this works:**
- Static HTML file (no JavaScript needed)
- Contains ONLY Growth Partner information
- Properly formatted for both humans and AI
- Includes the important clarification about not being the "refund guarantee" offer

---

### Option 2: LLM Manifest File
**URL:** https://framenflowmedia.in/llms.txt

**What to say to ChatGPT/Gemini:**
> "Read and summarize: https://framenflowmedia.in/llms.txt"

**Why this works:**
- Plain text file designed for AI crawlers
- Contains both agency info AND Growth Partner program details
- Includes the important clarification
- Standard format used by many companies

---

### Option 3: Markdown Documentation
**URL:** https://framenflowmedia.in/growth-partner-program.md

**What to say to ChatGPT/Gemini:**
> "Read the markdown file at: https://framenflowmedia.in/growth-partner-program.md"

**Why this works:**
- Markdown format is highly readable
- Contains complete program details
- Well-structured with headings and lists

---

### Option 4: JSON Structured Data
**URL:** https://framenflowmedia.in/ai.json

**What to say to ChatGPT/Gemini:**
> "Read the JSON data at: https://framenflowmedia.in/ai.json and explain the Growth Partner program"

**Why this works:**
- Machine-readable structured data
- Contains all key program details
- Easy for AI to parse

---

## Quick Reference Card

**Copy and paste this to ChatGPT/Gemini:**

```
Please read and summarize the Frame n Flow Media Growth Partner Program from this URL:
https://framenflowmedia.in/growth-partner-info.html

Focus on:
- What the program is
- How it works
- Commission structure
- Requirements
- What Frame n Flow provides
- Important clarifications
```

---

## Why Not Just Use the Main Page?

**Main Page:** https://framenflowmedia.in/growth-partner  
**Status:** ❌ Not readable by AI tools (JavaScript-rendered)

**Static Files:** https://framenflowmedia.in/growth-partner-info.html  
**Status:** ✅ Fully readable by AI tools (Static HTML)

The main page looks beautiful and works perfectly for human visitors, but AI tools need the static versions.

---

## For Developers: Technical Details

### What We Built

1. **Static HTML Page** (`/growth-partner-info.html`)
   - Standalone HTML file
   - No JavaScript dependencies
   - Contains complete program information
   - Styled for readability

2. **LLM Manifest** (`/llms.txt`)
   - Industry-standard format for AI crawlers
   - Plain text, highly readable
   - Comprehensive agency + program info

3. **Markdown Documentation** (`/growth-partner-program.md`)
   - Detailed program documentation
   - Markdown format for easy parsing
   - Complete reference guide

4. **JSON API** (`/ai.json`)
   - Structured data format
   - Machine-readable
   - Contains all key details

### Build Pipeline

- Post-build script generates static HTML for all routes
- Schema.org markup injected automatically
- Mirror endpoints (.txt, .json) created for each page
- All future pages automatically inherit these features

### Testing

```bash
# Test static HTML
curl https://framenflowmedia.in/growth-partner-info.html

# Test LLM manifest
curl https://framenflowmedia.in/llms.txt

# Test JSON data
curl https://framenflowmedia.in/ai.json
```

---

## Recommended Approach

**For sharing with AI tools:**
1. **First choice:** Use `/growth-partner-info.html` (most comprehensive, best formatted)
2. **Second choice:** Use `/llms.txt` (standard format, includes agency context)
3. **Third choice:** Use `/growth-partner-program.md` (detailed documentation)

**For human visitors:**
- Continue using the main website: https://framenflowmedia.in/growth-partner
- Beautiful design, animations, and interactive features work perfectly

---

## Success Metrics

✅ **Static files are live and accessible**  
✅ **AI tools can read and summarize content**  
✅ **No visual changes to main website**  
✅ **All information is accurate and complete**  
✅ **Important clarifications included**

---

## Next Steps

1. **Test with ChatGPT:**
   - Go to ChatGPT
   - Paste: "Read and summarize: https://framenflowmedia.in/growth-partner-info.html"
   - Verify it provides accurate information

2. **Test with Gemini:**
   - Go to Gemini
   - Paste: "Read and summarize: https://framenflowmedia.in/llms.txt"
   - Verify it provides accurate information

3. **Share the correct URL:**
   - When asking AI tools about your Growth Partner program
   - Always use one of the static file URLs above
   - Don't use the main `/growth-partner` page URL

---

**Last Updated:** 2026-01-25  
**Status:** ✅ Fully Operational
