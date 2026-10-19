// Build-time renderer: scripts/prerender.mjs uses this to write each page as ready-made HTML,
// so search engines, AI tools and link previews see the content without running JavaScript.
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import { SITE } from './data/site'
import { services } from './data/services'
import { projects } from './data/projects'
import { products } from './data/products'
import { faqs } from './data/content'

export function render(url) {
  const helmetContext = {}
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>,
  )
  const { helmet } = helmetContext
  const head = ['title', 'meta', 'link', 'script'].map((k) => helmet[k].toString()).join('')
  return { html, head }
}

// Plain-text summary for AI assistants (https://llmstxt.org).
export function llmsTxt(siteUrl) {
  const hours = SITE.hours.map((h) => `${h.day}: ${h.time}`).join('; ')
  return `# ${SITE.name}

> ${SITE.name} (${SITE.short}) is an electrical engineering company in ${SITE.address}, founded in ${SITE.founded} by ${SITE.founder}. It designs, installs, repairs and maintains electrical systems for homes, businesses and industry across the Kathmandu Valley, sells electrical and security products, and runs a 24/7 emergency line.

- Emergency hotline (24/7): ${SITE.hotline}
- Office: ${SITE.office}
- Email: ${SITE.email}
- Address: ${SITE.address}
- Hours: ${hours}

## Services
${services.map((s) => `- [${s.title}](${siteUrl}/services/${s.slug}): ${s.short}`).join('\n')}

## Projects
${projects.map((p) => `- [${p.title}](${siteUrl}/projects/${p.slug}): ${p.sector}, ${p.location}`).join('\n')}

## Products
${products.map((p) => `- [${p.name}](${siteUrl}/products/${p.slug}): ${p.brand}, ${p.category}`).join('\n')}

## Common questions
${faqs.map((f) => `- **${f.q}** ${f.a}`).join('\n')}

## Contact and booking
- [Book a site visit](${siteUrl}/book)
- [Send an enquiry](${siteUrl}/enquiry)
- [Emergency help](${siteUrl}/emergency)
- [Contact](${siteUrl}/contact)
`
}
