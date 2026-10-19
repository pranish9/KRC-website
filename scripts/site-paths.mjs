// Shared by vite.config.js (sitemap, robots.txt, share tags) and scripts/prerender.mjs.
import fs from 'node:fs'
import { SITE } from '../src/data/site.js'

// Address the site is served from. On Vercel this is the production domain (the .vercel.app
// address, or your own domain once it is added in Vercel), so share previews always point
// at a live URL. Elsewhere it falls back to SITE.url.
export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : SITE.url

const STATIC_ROUTES = [
  '/', '/about', '/team', '/services', '/projects', '/products', '/technicians', '/book', '/enquiry',
  '/contact', '/emergency', '/testimonials', '/faq', '/blog', '/privacy', '/terms', '/sitemap',
]

// Detail pages, read from the slugs in the data files so new entries appear automatically.
const DETAIL_ROUTES = [
  ['services', 'src/data/services.js'],
  ['projects', 'src/data/projects.js'],
  ['products', 'src/data/products.js'],
  ['technicians', 'src/data/team.js'],
  ['blog', 'src/data/content.js'],
]

const slugsIn = (file) => [...fs.readFileSync(file, 'utf8').matchAll(/\bslug:\s*'([^']+)'/g)].map((m) => m[1])

// Every public page, as listed in the sitemap.
export const sitemapPaths = () => [
  ...STATIC_ROUTES,
  ...DETAIL_ROUTES.flatMap(([base, file]) => slugsIn(file).map((s) => `/${base}/${s}`)),
]

// Pages built as ready-made HTML: the sitemap plus pages search engines can skip.
export const prerenderPaths = () => [
  ...sitemapPaths(),
  '/search',
  ...slugsIn('src/data/team.js').map((s) => `/technicians/${s}/book`),
]
