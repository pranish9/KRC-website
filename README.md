# Kathmandu Repairing Center – Company Website

Official website of **Kathmandu Repairing Center Pvt. Ltd. (KRC)**, Gusingal, Lalitpur.
This is a frontend-only site built with React 18, Vite, Tailwind CSS and React Router. It needs no server or database.

## Pages (27 routes)

Home · About · Team · Services · Service detail ×6 · Projects · Project record ×9 · Products · Product detail ×12 ·
Technicians · Technician profile ×4 · Book a technician ×4 · Book a site visit · Enquiry · Contact · Emergency 24/7 ·
Testimonials · FAQ · Blog · Blog post ×3 · Search · Privacy · Terms · Sitemap · Thank you · Booking confirmed · 404

## Getting started

### Requirements

- Node.js 18 or newer
- npm (included with Node.js)

### Install and start the development server

```bash
git clone <repository-url>
cd krc-website
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`). The dev server supports hot reload while you edit the site.

### Production build

```bash
npm run build
npm run preview
```

The production-ready site is generated in `dist/`. `npm run preview` serves that build locally so you can check it before deployment.

### Optional form delivery setup

Forms work without configuration by opening the visitor's email app with the message ready to send. To deliver submissions through Web3Forms instead:

1. Get a free access key at https://web3forms.com using the company email.
2. Copy `.env.example` to `.env` in the project root.
3. Set `VITE_WEB3FORMS_KEY` in `.env` to the key.
4. Restart the dev server or rebuild the site for the change to take effect.

Do not commit `.env`; add the same variable to your hosting provider's environment settings for production.

## Edit content (no coding needed)

All text, prices and photos are in `src/data/`:

| File | What it holds |
|---|---|
| `site.js` | Phone numbers, email, address, hours, social links, stats |
| `services.js` | The 6 services |
| `projects.js` | Project records: photos, videos, specs, documents, warranty |
| `products.js` | Products and prices (NPR) |
| `team.js` | Management and technicians |
| `content.js` | Testimonials, FAQ, blog posts |
| `images.js` | Photo library |

**Adding real project photos:** copy them to `public/images/projects/` and use them in `projects.js`, for example
`photos: ['/images/projects/089-1.jpg', '/images/projects/089-2.jpg']`.
**Videos:** `videos: [{ title: 'Panel testing', youtubeId: 'abc123' }]`, or `{ title: '...', src: '/videos/089.mp4' }`.
**Documents:** put PDFs in `public/docs/` and use `documents: [{ name: 'Test report', url: '/docs/089-test.pdf' }]`.

Stock photos load from Unsplash for now. To keep copies on your own site, run `npm run images:download` once.

Forms include a hidden honeypot field that helps stop spam bots.

## Deploy on Cloudflare Pages (free, secure)

1. Push this repo to GitHub.
2. Go to Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → select this repo.
3. Use these settings: framework preset **Vite**, build command `npm run build`, output directory `dist`.
4. If using Web3Forms, add `VITE_WEB3FORMS_KEY` in the Pages environment variables, then deploy.
5. Under Custom domains, add `krc.com.np` once the domain is registered (free for Nepali companies at register.com.np).

`public/_redirects` handles page refreshes, and `public/_headers` adds security headers. Netlify reads the same two files.
