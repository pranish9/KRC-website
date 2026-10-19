import fs from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { SITE } from './src/data/site.js'

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
  const urls = paths.map((p) => `  <url><loc>${SITE.url}${p === '/' ? '/' : p}</loc></url>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

// Google business listing data (schema.org), built from src/data/site.js.
function localBusinessJson() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    name: SITE.name,
    alternateName: SITE.short,
    url: SITE.url + '/',
    logo: `${SITE.url}/images/logo.png`,
    image: `${SITE.url}/images/og-image.png`,
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
        .replaceAll('__SITE_URL__', SITE.url)
        .replace('<!-- LOCAL_BUSINESS_JSON -->', `<script type="application/ld+json">${localBusinessJson()}</script>`)
    },
    configureServer(server) {
      server.middlewares.use('/sitemap.xml', (_req, res) => {
        res.setHeader('Content-Type', 'application/xml')
        res.end(sitemapXml())
      })
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml() })
    },
  }
}

export default defineConfig({
  plugins: [react(), seoFiles()],
})
