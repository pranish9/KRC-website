import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Search as SearchIcon, Calendar, Clock } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Seo, Img, Button, Stars, SectionHead, JsonLd } from '../components/ui'
import { TestimonialCard, BlogCard } from '../components/Cards'
import FaqItem from '../components/FaqItem'
import { CtaBand, NotFoundInline } from '../components/Layout'
import { testimonials, faqs, posts, getPost } from '../data/content'
import { services } from '../data/services'
import { projects } from '../data/projects'
import { products } from '../data/products'
import { technicians } from '../data/team'
import { SITE } from '../data/site'
import { IMG } from '../data/images'

export function Testimonials() {
  const avg = (testimonials.reduce((a, t) => a + t.rating, 0) / testimonials.length).toFixed(1)
  return (
    <>
      <Seo title="Testimonials" description="Reviews from KRC clients across the Kathmandu Valley." />
      <PageHero eyebrow="Testimonials" title="Trusted by homes and businesses" crumbs={[{ label: 'Testimonials' }]} image={IMG.vintageBulbs}>
        <div className="flex items-center gap-4 text-white">
          <span className="text-5xl font-extrabold text-brand">{avg}</span>
          <span><Stars value={Number(avg)} size={18} /><span className="mt-1 block text-sm text-white/70">Average from {testimonials.length * 41}+ reviews</span></span>
        </div>
      </PageHero>
      <section className="section">
        <div className="container-site grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => <TestimonialCard key={t.name} t={t} />)}
        </div>
      </section>
      <CtaBand />
    </>
  )
}

export function Faq() {
  const cats = ['All', ...new Set(faqs.map((f) => f.cat))]
  const [c, setC] = useState('All')
  const [q, setQ] = useState('')
  const list = faqs.filter((f) => (c === 'All' || f.cat === c) && (f.q + f.a).toLowerCase().includes(q.toLowerCase()))
  return (
    <>
      <Seo title="FAQ" description="Answers to common questions about KRC services, pricing, warranty and products." />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        }}
      />
      <PageHero eyebrow="FAQ" title="Frequently asked questions" crumbs={[{ label: 'FAQ' }]} />
      <section className="section">
        <div className="container-site mx-auto max-w-3xl">
          <label className="relative block">
            <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search questions" className="input pl-11" aria-label="Search questions" />
          </label>
          <div className="my-6 flex flex-wrap gap-2">{cats.map((x) => <button key={x} onClick={() => setC(x)} className={`chip ${c === x ? 'chip-active' : ''}`}>{x}</button>)}</div>
          <div className="space-y-3">{list.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}</div>
          {!list.length && <p className="rounded-3xl bg-white p-8 text-center">No matching questions. <Link to="/enquiry" className="font-bold underline">Ask us directly</Link>.</p>}
          <div className="mt-12 rounded-[28px] bg-navy p-8 text-center text-white">
            <h2 className="text-2xl text-white">Still have a question?</h2>
            <div className="mt-5 flex flex-wrap justify-center gap-3"><Button to="/enquiry">Send enquiry</Button><Button href={SITE.hotlineHref} variant="ghostLight" icon="phone">Call us</Button></div>
          </div>
        </div>
      </section>
    </>
  )
}

export function Blog() {
  const [first, ...rest] = posts
  return (
    <>
      <Seo title="Blog" description="Electrical safety tips, buying guides and news from KRC." />
      <PageHero eyebrow="Blog" title="Tips, guides & news" crumbs={[{ label: 'Blog' }]} />
      <section className="section">
        <div className="container-site">
          <Link to={`/blog/${first.slug}`} className="group card mb-10 grid overflow-hidden p-3 lg:grid-cols-2">
            <Img src={first.image} alt={first.title} className="h-72 w-full rounded-[20px] lg:h-96" />
            <div className="flex flex-col justify-center p-6 md:p-10">
              <span className="eyebrow w-fit">Featured · {first.cat}</span>
              <h2 className="mt-4 text-3xl leading-tight group-hover:underline">{first.title}</h2>
              <p className="mt-3 text-lg">{first.excerpt}</p>
              <p className="mt-5 text-sm font-semibold">{first.date} · {first.read}</p>
            </div>
          </Link>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{rest.map((p) => <BlogCard key={p.slug} p={p} />)}</div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}

export function BlogPost() {
  const { slug } = useParams()
  const p = getPost(slug)
  if (!p) return <NotFoundInline what="article" back="/blog" />
  return (
    <>
      <Seo title={p.title} description={p.excerpt} image={p.image} />
      <article className="container-site max-w-3xl py-12">
        <nav className="mb-6 text-sm"><Link to="/">Home</Link> / <Link to="/blog">Blog</Link></nav>
        <span className="eyebrow">{p.cat}</span>
        <h1 className="mt-4 text-4xl leading-tight md:text-5xl">{p.title}</h1>
        <p className="mt-4 flex gap-5 text-sm font-semibold"><span className="flex items-center gap-1.5"><Calendar size={15} /> {p.date}</span><span className="flex items-center gap-1.5"><Clock size={15} /> {p.read}</span></p>
        <Img src={p.image} alt={p.title} sizes="(min-width: 768px) 800px, 100vw" priority className="my-8 h-80 w-full rounded-[28px] md:h-[440px]" />
        <div className="prose-krc text-lg">
          {p.body.map(([tag, c], i) =>
            tag === 'h2' ? <h2 key={i}>{c}</h2> : tag === 'ul' ? <ul key={i}>{c.map((x) => <li key={x}>{x}</li>)}</ul> : <p key={i}>{c}</p>,
          )}
        </div>
        <div className="mt-10 rounded-[28px] bg-brand p-8">
          <h2 className="text-2xl">Need an expert to check it?</h2>
          <div className="mt-4"><Button to="/book" variant="dark">Book an inspection</Button></div>
        </div>
      </article>
      <section className="container-site pb-20">
        <h2 className="mb-6 text-2xl">More articles</h2>
        <div className="grid gap-6 md:grid-cols-3">{posts.filter((x) => x.slug !== p.slug).map((x) => <BlogCard key={x.slug} p={x} />)}</div>
      </section>
    </>
  )
}

export function Search() {
  const [q, setQ] = useState('')
  const results = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (s.length < 2) return []
    const all = [
      ...services.map((x) => ({ type: 'Service', title: x.title, text: x.short, to: `/services/${x.slug}` })),
      ...projects.map((x) => ({ type: 'Project', title: `#${x.number} ${x.title}`, text: `${x.client} · ${x.location}`, to: `/projects/${x.slug}` })),
      ...products.map((x) => ({ type: 'Product', title: x.name, text: x.summary, to: `/products/${x.slug}` })),
      ...technicians.map((x) => ({ type: 'Technician', title: x.name, text: x.role, to: `/technicians/${x.slug}` })),
      ...posts.map((x) => ({ type: 'Article', title: x.title, text: x.excerpt, to: `/blog/${x.slug}` })),
      ...faqs.map((x) => ({ type: 'FAQ', title: x.q, text: x.a, to: '/faq' })),
    ]
    return all.filter((r) => (r.title + r.text).toLowerCase().includes(s))
  }, [q])
  return (
    <>
      <Seo title="Search" />
      <section className="container-site max-w-3xl py-14">
        <h1 className="text-4xl">Search</h1>
        <label className="relative mt-6 block">
          <SearchIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try ‘CCTV’, ‘generator’ or ‘hospital’" className="input py-4 pl-12 text-lg" aria-label="Search the website" />
        </label>
        <div className="mt-8 space-y-3">
          {results.map((r) => (
            <Link key={r.type + r.to + r.title} to={r.to} className="card block p-5 hover:ring-2 hover:ring-brand">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">{r.type}</span>
              <p className="font-bold text-navy">{r.title}</p>
              <p className="line-clamp-1 text-sm">{r.text}</p>
            </Link>
          ))}
          {q.length >= 2 && !results.length && <p className="rounded-3xl bg-white p-8 text-center">No results for “{q}”.</p>}
        </div>
      </section>
    </>
  )
}

export function Legal({ kind }) {
  const privacy = kind === 'privacy'
  return (
    <>
      <Seo title={privacy ? 'Privacy Policy' : 'Terms & Conditions'} />
      <PageHero eyebrow="Legal" title={privacy ? 'Privacy Policy' : 'Terms & Conditions'} text="Last updated: October 2026" crumbs={[{ label: privacy ? 'Privacy' : 'Terms' }]} />
      <section className="section">
        <div className="container-site prose-krc max-w-3xl rounded-[28px] bg-white p-8 text-lg md:p-12">
          {privacy ? (
            <>
              <p>{SITE.name} (“KRC”, “we”) respects your privacy. This page explains what information we collect through this website and how we use it.</p>
              <h2>Information we collect</h2>
              <ul><li>Details you enter in our forms: name, phone, email, address and your message.</li><li>Basic, anonymous visit statistics (pages viewed, device type).</li></ul>
              <h2>How we use it</h2>
              <p>Only to reply to you, arrange visits, prepare quotations and provide after-sales service. We never sell or share your information with marketers.</p>
              <h2>How long we keep it</h2>
              <p>Enquiries are kept for up to 2 years. Project records are kept for as long as the system we installed is in use, so we can support you in the future.</p>
              <h2>Your choices</h2>
              <p>You may ask us to see, correct or delete your details at any time by emailing <a className="font-bold underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
              <h2>Cookies</h2>
              <p>This website does not use advertising cookies. Embedded maps and videos may set their own cookies.</p>
            </>
          ) : (
            <>
              <p>By using this website or booking our services you agree to the following terms.</p>
              <h2>Quotations</h2>
              <p>All quotations are valid for 15 days unless stated otherwise. Work begins after written or verbal approval.</p>
              <h2>Prices</h2>
              <p>Product prices on this website are in Nepali rupees and may change without notice. Final prices are confirmed on enquiry.</p>
              <h2>Warranty</h2>
              <ul><li>Workmanship warranty: 12 months from hand-over unless stated in the project record.</li><li>Products: manufacturer warranty applies.</li><li>Warranty does not cover misuse, overload, voltage surges or work by others.</li></ul>
              <h2>Payment</h2>
              <p>Small jobs are paid on completion. Projects follow the payment schedule in the quotation.</p>
              <h2>Cancellations</h2>
              <p>Please inform us at least 4 hours before a booked visit.</p>
              <h2>Governing law</h2>
              <p>These terms are governed by the laws of Nepal.</p>
            </>
          )}
        </div>
      </section>
    </>
  )
}

export function Sitemap() {
  const groups = [
    ['Main', [['Home', '/'], ['About', '/about'], ['Team', '/team'], ['Contact', '/contact'], ['Emergency 24/7', '/emergency'], ['Search', '/search']]],
    ['Services', services.map((s) => [s.title, `/services/${s.slug}`])],
    ['Projects', projects.map((p) => [`#${p.number} ${p.title}`, `/projects/${p.slug}`])],
    ['Products', products.map((p) => [p.name, `/products/${p.slug}`])],
    ['Technicians', technicians.map((t) => [t.name, `/technicians/${t.slug}`])],
    ['More', [['Book a visit', '/book'], ['Enquiry', '/enquiry'], ['Testimonials', '/testimonials'], ['FAQ', '/faq'], ['Blog', '/blog'], ['Privacy', '/privacy'], ['Terms', '/terms']]],
  ]
  return (
    <>
      <Seo title="Sitemap" />
      <PageHero eyebrow="Sitemap" title="All pages" crumbs={[{ label: 'Sitemap' }]} />
      <section className="section">
        <div className="container-site grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map(([g, links]) => (
            <div key={g} className="card p-7">
              <h2 className="text-xl">{g}</h2>
              <ul className="mt-3 space-y-2">{links.map(([l, to]) => <li key={to}><Link to={to} className="font-semibold text-body hover:text-navy">{l}</Link></li>)}</ul>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export function NotFound() {
  return (
    <>
      <Seo title="Page not found" />
      <section className="container-site py-24 text-center">
        <p className="text-[120px] font-extrabold leading-none text-navy md:text-[180px]">4<span className="text-brand">0</span>4</p>
        <h1 className="mt-4 text-3xl md:text-4xl">Looks like this circuit is broken.</h1>
        <p className="mx-auto mt-3 max-w-md text-lg">The page you’re looking for doesn’t exist or has moved.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3"><Button to="/" variant="dark">Back to home</Button><Button to="/search" variant="outline">Search the site</Button></div>
      </section>
    </>
  )
}
