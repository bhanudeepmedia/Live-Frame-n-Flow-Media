// Enforces Handover §8 meta limits: titles under 60 chars, descriptions 150-160.
// Also fails on budget-signalling language and the removed refund claim (§6, §8).
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const source = readFileSync('src/data/seo.ts', 'utf8')
const titles = [...source.matchAll(/title:\s*'([^']+)'/g)].map((m) => m[1])
const descs = [...source.matchAll(/description:\s*\n?\s*(?:'([^']+)'|"([^"]+)")/g)].map((m) => m[1] ?? m[2])
let failed = false

for (const t of titles) if (t.length >= 60) { console.error(`Title too long (${t.length}): ${t}`); failed = true }
for (const d of descs) if (d.length < 150 || d.length > 160) { console.error(`Description ${d.length} chars (need 150-160): ${d}`); failed = true }

const banned = /\b(affordable|cheap|low-cost|budget|100% refund|refund guarantee)\b/i
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p)
    else if (/\.(tsx?|html)$/.test(name)) {
      readFileSync(p, 'utf8').split('\n').forEach((line, i) => {
        if (banned.test(line) && !line.trim().startsWith('*') && !line.trim().startsWith('//')) {
          console.error(`${p}:${i + 1}: ${line.trim()}`); failed = true
        }
      })
    }
  }
}
walk('src')
if (/refund|ADD_YOUR_BING/i.test(readFileSync('index.html', 'utf8'))) { console.error('index.html contains a refund claim or Bing placeholder'); failed = true }

if (failed) process.exit(1)
console.log(`SEO check passed (${titles.length} titles, ${descs.length} descriptions).`)
