import { useParams, Link } from 'react-router-dom'
import { CheckCircle2, Phone } from 'lucide-react'
import PageHero from '../components/PageHero'
import { SectionHead, Img, Seo, Button } from '../components/ui'
import { ServiceCard, ProjectCard } from '../components/Cards'
import FaqItem from '../components/FaqItem'
import { CtaBand, NotFoundInline } from '../components/Layout'
import { services, getService } from '../data/services'
import { projects } from '../data/projects'
import { faqs } from '../data/content'
import { SITE } from '../data/site'
import { IMG } from '../data/images'
import { getIcon } from '../components/icons'

export function Services() {
  return (
    <>
      <Seo title="Services" description="Electrical design, interior lighting, repair & maintenance, security systems, consultancy and standby technicians." />
      <PageHero eyebrow="Services" title="Everything electrical, under one roof" text="Six specialised services — from first drawing to after-sales support." crumbs={[{ label: 'Services' }]} image={IMG.controlPanel} />
      <section className="section">
        <div className="container-site grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => <ServiceCard key={s.slug} s={s} i={i} />)}
        </div>
      </section>
      <CtaBand />
    </>
  )
}

export function ServiceDetail() {
  const { slug } = useParams()
  const s = getService(slug)
  if (!s) return <NotFoundInline what="service" back="/services" />
  const Ico = getIcon(s.icon)
  const related = projects.filter((p) => p.service === s.slug).slice(0, 2)

  return (
    <>
      <Seo title={s.title} description={s.short} image={s.image} />
      <PageHero eyebrow="Service" title={s.title} text={s.short} crumbs={[{ label: 'Services', to: '/services' }, { label: s.title }]} image={s.image}>
        <div className="flex flex-wrap gap-3">
          <Button to={`/book?service=${s.slug}`}>Book this service</Button>
          <Button href={SITE.hotlineHref} variant="ghostLight" icon="phone">Call now</Button>
        </div>
      </PageHero>

      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Img src={s.image} alt={s.title} sizes="(min-width: 1024px) 800px, 100vw" className="h-64 w-full rounded-[24px] sm:h-[360px] sm:rounded-[32px] lg:h-[420px]" />
            <h2 className="mt-10 text-3xl">Overview</h2>
            <p className="mt-4 text-lg leading-relaxed">{s.intro}</p>

            <h2 className="mt-10 text-3xl">What’s included</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {s.includes.map((x) => (
                <li key={x} className="flex gap-3 rounded-2xl bg-white p-4 font-semibold text-navy"><CheckCircle2 className="shrink-0 text-ok" size={22} /> {x}</li>
              ))}
            </ul>

            <h2 className="mt-12 text-3xl">How we work</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {s.process.map((p, i) => (
                <div key={p.title} className="rounded-3xl bg-navy p-6 text-white">
                  <p className="text-3xl font-extrabold text-brand">0{i + 1}</p>
                  <h3 className="mt-4 text-lg text-white">{p.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{p.text}</p>
                </div>
              ))}
            </div>

            {related.length > 0 && (
              <>
                <h2 className="mt-12 text-3xl">Related projects</h2>
                <div className="mt-5 grid gap-6 md:grid-cols-2">
                  {related.map((p) => <ProjectCard key={p.slug} p={p} />)}
                </div>
              </>
            )}

            <h2 className="mt-12 text-3xl">Common questions</h2>
            <div className="mt-5 space-y-3">
              {faqs.slice(2, 6).map((f) => <div key={f.q} className="rounded-3xl ring-1 ring-line"><FaqItem q={f.q} a={f.a} /></div>)}
            </div>
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <div className="grid gap-6 md:grid-cols-2 lg:sticky lg:top-28 lg:grid-cols-1">
              <div className="card p-7">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand text-navy"><Ico /></span>
                <p className="mt-5 text-sm font-bold uppercase tracking-wider text-muted">Starting price</p>
                <p className="mt-1 text-2xl font-extrabold text-navy">{s.priceFrom}</p>
                <div className="mt-6 grid gap-3">
                  <Button to={`/book?service=${s.slug}`} className="w-full">Book a site visit</Button>
                  <Button to={`/enquiry?service=${s.slug}`} variant="outline" className="w-full">Ask a question</Button>
                </div>
              </div>
              <div className="card p-3">
                <p className="px-4 pt-4 text-sm font-bold uppercase tracking-wider text-muted">Other services</p>
                <ul className="mt-2">
                  {services.filter((x) => x.slug !== s.slug).map((x) => (
                    <li key={x.slug}><Link to={`/services/${x.slug}`} className="block rounded-2xl px-4 py-3 font-semibold text-navy hover:bg-bg">{x.title}</Link></li>
                  ))}
                </ul>
              </div>
              <a href={SITE.hotlineHref} className="flex items-center gap-4 rounded-3xl bg-danger p-6 text-white">
                <Phone /> <span><span className="block text-sm opacity-80">Emergency 24/7</span><span className="text-xl font-extrabold">{SITE.hotline}</span></span>
              </a>
            </div>
          </aside>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
