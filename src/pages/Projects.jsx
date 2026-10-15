import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPin, Calendar, Clock, Building2, Briefcase, ShieldCheck, FileText, Download, Quote, ChevronLeft, ChevronRight, PlayCircle, Printer, Share2 } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Seo, Img, Button } from '../components/ui'
import { ProjectCard } from '../components/Cards'
import Gallery from '../components/Gallery'
import { CtaBand, NotFoundInline } from '../components/Layout'
import { projects, getProject, sectors } from '../data/projects'
import { getService } from '../data/services'
import { IMG } from '../data/images'

export function Projects() {
  const [f, setF] = useState('All')
  const list = f === 'All' ? projects : projects.filter((p) => p.sector === f)
  return (
    <>
      <Seo title="Projects" description="Completed electrical projects by KRC — each with photos, specifications and documents." />
      <PageHero eyebrow="Portfolio" title="Projects we’re proud of" text="Open any project to see its full record — photos, videos, specifications, documents and warranty." crumbs={[{ label: 'Projects' }]} image={IMG.buildingWires} />
      <section className="section">
        <div className="container-site">
          <div className="mb-10 flex flex-wrap gap-2">
            {sectors.map((s) => (
              <button key={s} onClick={() => setF(s)} className={`chip ${f === s ? 'chip-active' : ''}`}>{s}</button>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => <ProjectCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}

function VideoBlock({ v }) {
  if (v.youtubeId)
    return (
      <div className="overflow-hidden rounded-3xl bg-navy">
        <div className="aspect-video">
          <iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}`} title={v.title} loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        </div>
        <p className="p-4 font-bold text-white">{v.title}</p>
      </div>
    )
  return (
    <div className="overflow-hidden rounded-3xl bg-navy">
      <video className="aspect-video w-full" src={v.src} controls preload="metadata" />
      <p className="p-4 font-bold text-white">{v.title}</p>
    </div>
  )
}

export function ProjectDetail() {
  const { slug } = useParams()
  const p = getProject(slug)
  if (!p) return <NotFoundInline what="project" back="/projects" />
  const idx = projects.indexOf(p)
  const prev = projects[(idx - 1 + projects.length) % projects.length]
  const next = projects[(idx + 1) % projects.length]
  const svc = getService(p.service)

  const facts = [
    [Building2, 'Client', p.client],
    [Briefcase, 'Sector', p.sector],
    [MapPin, 'Location', p.location],
    [Calendar, 'Completed', p.completed],
    [Clock, 'Duration', p.duration],
    [ShieldCheck, 'Warranty until', p.warrantyUntil],
  ]

  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) await navigator.share({ title: p.title, url })
      else {
        await navigator.clipboard.writeText(url)
        alert('Link copied')
      }
    } catch { /* cancelled */ }
  }

  return (
    <>
      <Seo title={`${p.title} – Project #${p.number}`} description={p.challenge} image={p.cover} />
      <PageHero eyebrow={`Project record #${p.number}`} title={p.title} text={`${p.client} · ${p.location}`} crumbs={[{ label: 'Projects', to: '/projects' }, { label: `#${p.number}` }]} image={p.cover}>
        <div className="flex flex-wrap gap-3 print:hidden">
          <button onClick={share} className="chip"><Share2 size={16} /> Share</button>
          <button onClick={() => window.print()} className="chip"><Printer size={16} /> Print record</button>
        </div>
      </PageHero>

      <section className="section pt-10">
        <div className="container-site">
          {/* Key facts */}
          <div className="grid gap-3 rounded-[28px] bg-white p-3 sm:grid-cols-3 lg:grid-cols-6">
            {facts.map(([I, l, v]) => (
              <div key={l} className="rounded-2xl bg-bg p-4">
                <I size={18} className="text-navy" />
                <p className="mt-3 text-xs font-bold uppercase tracking-wider text-muted">{l}</p>
                <p className="mt-0.5 font-bold text-navy">{v}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-14 text-3xl">Photo gallery</h2>
          <p className="mb-6 mt-2">Tap any photo to view it full-screen.</p>
          <Gallery images={p.photos} title={p.title} />

          <div className="mt-14 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-[28px] bg-white p-8">
                  <span className="eyebrow">The challenge</span>
                  <p className="mt-5 text-lg leading-relaxed">{p.challenge}</p>
                </div>
                <div className="rounded-[28px] bg-navy p-8 text-white">
                  <span className="eyebrow-dark">Our solution</span>
                  <p className="mt-5 text-lg leading-relaxed text-white/80">{p.solution}</p>
                </div>
              </div>

              <h2 className="mt-12 text-3xl">Results</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {p.results.map((r) => (
                  <div key={r.label} className="rounded-3xl bg-brand p-6">
                    <p className="text-4xl font-extrabold text-navy">{r.value}</p>
                    <p className="mt-1 font-semibold text-navy/80">{r.label}</p>
                  </div>
                ))}
              </div>

              <h2 className="mt-12 text-3xl">Videos</h2>
              {p.videos.length ? (
                <div className="mt-5 grid gap-6 md:grid-cols-2">{p.videos.map((v) => <VideoBlock key={v.title} v={v} />)}</div>
              ) : (
                <div className="mt-5 flex items-center gap-4 rounded-3xl border-2 border-dashed border-line bg-white p-6">
                  <PlayCircle className="shrink-0 text-muted" size={36} />
                  <p>Site videos for this project will be added here. Ask us if you need a copy now.</p>
                </div>
              )}

              {p.review && (
                <figure className="mt-12 rounded-[28px] bg-white p-8 md:p-10">
                  <Quote className="text-brand" size={40} />
                  <blockquote className="mt-4 text-2xl font-semibold leading-relaxed text-navy">“{p.review.quote}”</blockquote>
                  <figcaption className="mt-5 font-bold text-body">— {p.review.by}</figcaption>
                </figure>
              )}
            </div>

            <aside className="space-y-6 lg:col-span-4">
              <div className="card p-7">
                <h3 className="text-xl">Technical specifications</h3>
                <dl className="mt-4 divide-y divide-line">
                  {p.specs.map((s) => (
                    <div key={s.label} className="py-3">
                      <dt className="text-xs font-bold uppercase tracking-wider text-muted">{s.label}</dt>
                      <dd className="mt-0.5 font-semibold text-navy">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="card p-7">
                <h3 className="text-xl">Documents</h3>
                {p.documents.length ? (
                  <ul className="mt-4 space-y-2">
                    {p.documents.map((d) => (
                      <li key={d.name}><a href={d.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl bg-bg p-3 font-semibold text-navy hover:bg-brand-soft"><FileText size={18} /> <span className="flex-1">{d.name}</span> <Download size={16} /></a></li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm">Drawings, test reports and warranty cards are available to the client on request.</p>
                )}
              </div>
              {svc && (
                <Link to={`/services/${svc.slug}`} className="block rounded-[28px] bg-navy p-7 text-white">
                  <p className="text-sm text-white/60">Service used</p>
                  <p className="mt-1 text-xl font-extrabold">{svc.title} →</p>
                </Link>
              )}
              <div className="rounded-[28px] bg-brand p-7">
                <h3 className="text-xl">Need something similar?</h3>
                <p className="mt-2 text-navy/70">Get a free site survey and quotation.</p>
                <div className="mt-5"><Button to="/book" variant="dark">Book a visit</Button></div>
              </div>
            </aside>
          </div>

          <div className="mt-16 grid gap-4 border-t border-line pt-10 sm:grid-cols-2 print:hidden">
            <Link to={`/projects/${prev.slug}`} className="group flex items-center gap-4 rounded-3xl bg-white p-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-bg group-hover:bg-brand"><ChevronLeft /></span>
              <Img src={prev.cover} alt="" className="hidden h-16 w-20 rounded-2xl sm:block" />
              <span><span className="block text-xs font-bold uppercase text-muted">Previous · #{prev.number}</span><span className="font-bold text-navy">{prev.title}</span></span>
            </Link>
            <Link to={`/projects/${next.slug}`} className="group flex items-center justify-end gap-4 rounded-3xl bg-white p-4 text-right">
              <span><span className="block text-xs font-bold uppercase text-muted">Next · #{next.number}</span><span className="font-bold text-navy">{next.title}</span></span>
              <Img src={next.cover} alt="" className="hidden h-16 w-20 rounded-2xl sm:block" />
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-bg group-hover:bg-brand"><ChevronRight /></span>
            </Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
