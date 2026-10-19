import fs from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { SITE } from './src/data/site.js'

// Address the site is served from. On Vercel this is the production domain (the .vercel.app
// address, or your own domain once it is added in Vercel), so share previews always point
// at a live URL. Elsewhere it falls back to SITE.url.
const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
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

function sitemapXml() {
  const paths = [...STATIC_ROUTES, ...DETAIL_ROUTES.flatMap(([base, file]) => slugsIn(file).map((s) => `/${base}/${s}`))]
  const urls = paths.map((p) => `  <url><loc>${SITE_URL}${p === '/' ? '/' : p}</loc></url>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

const robotsTxt = () => `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`

// Google business listing data (schema.org), built from src/data/site.js.
function localBusinessJson() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    name: SITE.name,
    alternateName: SITE.short,
    url: SITE_URL + '/',
    logo: `${SITE_URL}/images/logo.png`,
    image: `${SITE_URL}/images/og-image.png`,
    description: SITE.tagline,
    telephone: SITE.hotline.replace(/[^\d+]/g, ''),
    email: SITE.email,
    foundingDate: String(SITE.founded),
    founder: { '@type': 'Person', name: SITE.founder },
    address: { '@type': 'PostalAddress', streetAddress: 'Gusingal', addressLocality: 'Lalitpur', addressCountry: 'NP' },
    areaServed: 'Kathmandu Valley',
    // Keep in step with SITE.hours.
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '10:00', closes: '17:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '10:00', closes: '15:00' },
    ],
    contactPoint: { '@type': 'ContactPoint', telephone: SITE.hotline.replace(/[^\d+]/g, ''), contactType: 'emergency', hoursAvailable: 'Mo-Su 00:00-23:59' },
  })
}

function seoFiles() {
  return {
    name: 'krc-seo-files',
    transformIndexHtml(html) {
      return html
        .replaceAll('__SITE_URL__', SITE_URL)
        .replace('<!-- LOCAL_BUSINESS_JSON -->', `<script type="application/ld+json">${localBusinessJson()}</script>`)
    },
    configureServer(server) {
      server.middlewares.use('/sitemap.xml', (_req, res) => {
        res.setHeader('Content-Type', 'application/xml')
        res.end(sitemapXml())
      })
      server.middlewares.use('/robots.txt', (_req, res) => res.end(robotsTxt()))
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml() })
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTxt() })
    },
  }
}

export default defineConfig({
  plugins: [react(), seoFiles()],
  // Lets the app build absolute share-image URLs for the same address.
  define: { 'import.meta.env.VITE_SITE_URL': JSON.stringify(SITE_URL) },
})
