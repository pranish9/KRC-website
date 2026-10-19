// Runs after `vite build`: renders every page to static HTML in dist/ and writes llms.txt.
// Pages are saved as dist/<path>.html (served at /<path> by Vercel's cleanUrls), and the
// untouched app shell is kept as dist/app.html for any other URL.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { SITE_URL, prerenderPaths } from './site-paths.mjs'

const dist = path.resolve('dist')
const ssrDir = path.resolve('dist-ssr')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const { render, llmsTxt } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

if (!template.includes('<div id="root"></div>')) throw new Error('dist/index.html has no empty #root to fill')

fs.writeFileSync(path.join(dist, 'app.html'), template)

// Each page brings its own title, description, share tags and canonical link,
// so the template's defaults (marked data-rh) are removed first.
const shell = template
  .replace(/<title>[\s\S]*?<\/title>\s*/, '')
  .replace(/\s*<(meta|link)\b[^>]*data-rh="true"[^>]*>/g, '')

const paths = prerenderPaths()
for (const url of paths) {
  const { html, head } = render(url)
  const page = shell.replace('</head>', `${head}\n  </head>`).replace('<div id="root"></div>', `<div id="root">${html}</div>`)
  const file = path.join(dist, url === '/' ? 'index.html' : `${url.slice(1)}.html`)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, page)
}

fs.writeFileSync(path.join(dist, 'llms.txt'), llmsTxt(SITE_URL))
fs.rmSync(ssrDir, { recursive: true, force: true })
console.log(`Prerendered ${paths.length} pages and llms.txt for ${SITE_URL}`)
