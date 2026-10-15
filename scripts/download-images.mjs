// Downloads every stock photo used in src/data/images.js into public/images/stock
// and rewrites images.js to use the local copies (faster, no outside dependency).
// Usage: npm run images:download
import fs from 'node:fs/promises'
import path from 'node:path'

const file = path.resolve('src/data/images.js')
let src = await fs.readFile(file, 'utf8')
const outDir = path.resolve('public/images/stock')
await fs.mkdir(outDir, { recursive: true })

const re = /(\w+): u\('([\w-]+)'\)/g
let m, count = 0
const replacements = []
while ((m = re.exec(src))) {
  const [full, key, id] = m
  const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80&fm=jpg`
  const res = await fetch(url)
  if (!res.ok) { console.warn('skip', key, res.status); continue }
  await fs.writeFile(path.join(outDir, `${key}.jpg`), Buffer.from(await res.arrayBuffer()))
  replacements.push([full, `${key}: '/images/stock/${key}.jpg'`])
  console.log('saved', key)
  count++
}
for (const [a, b] of replacements) src = src.replace(a, b)
await fs.writeFile(file, src)
console.log(`Done: ${count} images saved and images.js updated.`)
