import { Link } from 'react-router-dom'
import { CheckCircle2, ArrowUpRight, Phone, Award, Users, Clock, ShieldCheck } from 'lucide-react'
import HeroSlider from '../components/HeroSlider'
import { Button, SectionHead, Img, Seo } from '../components/ui'
import { ServiceCard, ProjectCard, ProductCard, TestimonialCard, TechCard } from '../components/Cards'
import FaqItem from '../components/FaqItem'
import { CtaBand } from '../components/Layout'
import { services } from '../data/services'
import { projects } from '../data/projects'
import { products } from '../data/products'
import { technicians } from '../data/team'
import { testimonials, faqs } from '../data/content'
import { SITE } from '../data/site'
import { IMG, CEO } from '../data/images'

const clients = ['Caltex', 'Trisara', 'Buddha Bar', 'City Hospital', 'ABC Company', 'XYZ Company', 'Hotel Thamel', 'Banquet Hall']

export default function Home() {
  return (
    <>
      <Seo description="Kathmandu Repairing Center – electrical design, installation, repair, CCTV and products in Lalitpur. Licensed engineers and a 24/7 emergency line." />
      <HeroSlider />

      {/* Clients marquee */}
      <section className="container-site py-10">
        <p className="mb-5 text-center text-sm font-bold uppercase tracking-wider text-muted">Trusted by businesses across the valley</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {clients.map((c) => <span key={c} className="text-xl font-extrabold text-navy/30">{c}</span>)}
        </div>
      </section>

      {/* About */}
      <section className="section pt-8">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="grid grid-cols-5 gap-4">
              <Img src={IMG.panelTest} alt="Engineer testing a panel" className="col-span-3 h-[440px] w-full rounded-[32px]" />
              <div className="col-span-2 flex flex-col gap-4">
                <Img src={IMG.breakers} alt="Circuit breakers" className="h-[210px] w-full rounded-[28px]" />
                <div className="flex h-[214px] flex-col justify-end rounded-[28px] bg-navy p-6 text-white">
                  <p className="text-5xl font-extrabold text-brand">15+</p>
                  <p className="mt-1 font-semibold">Years keeping the valley powered</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <span className="eyebrow">About KRC</span>
            <h2 className="mt-4 text-3xl leading-tight md:text-5xl">One trusted team for every electrical need.</h2>
            <p className="mt-5 text-lg">
              Kathmandu Repairing Center Pvt. Ltd. is an electrical engineering consulting, execution and product sales company in Gusingal, Lalitpur. We design, install and maintain electrical systems for homes, businesses and industries — and we pick up the phone at 2 AM too.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {['Licensed electrical engineers', 'Genuine branded materials', 'Written quotation, no surprises', '12-month workmanship warranty', 'Project records kept for you', '24/7 emergency response'].map((t) => (
                <li key={t} className="flex items-center gap-2.5 font-semibold text-navy"><CheckCircle2 size={20} className="shrink-0 text-ok" /> {t}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Button to="/about" variant="dark">More about us</Button>
              <div className="flex items-center gap-3">
                <img src={CEO} alt={SITE.founder} className="h-12 w-12 rounded-full object-cover object-top" />
                <div><p className="font-bold text-navy">{SITE.founder}</p><p className="text-sm">Founder &amp; CEO</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-white">
        <div className="container-site">
          <SectionHead eyebrow="What we do" title="Services built around safety and reliability" action={<Button to="/services" variant="outline">All services</Button>} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => <ServiceCard key={s.slug} s={s} i={i} />)}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-site py-16">
        <div className="grid gap-4 rounded-[36px] bg-navy p-6 md:grid-cols-4 md:p-10">
          {SITE.stats.map((s, i) => {
            const I = [Award, Users, Clock, ShieldCheck][i]
            return (
              <div key={s.label} className="rounded-3xl bg-white/5 p-6 text-white">
                <I className="text-brand" />
                <p className="mt-4 text-4xl font-extrabold md:text-5xl">{s.value}</p>
                <p className="mt-1 text-white/70">{s.label}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Projects */}
      <section className="section pt-4">
        <div className="container-site">
          <SectionHead eyebrow="Our work" title="Recent projects, each with its own record" text="Every project keeps its photos, specs, documents and warranty online — for the client’s future reference." action={<Button to="/projects" variant="outline">All projects</Button>} />
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7"><ProjectCard p={projects[0]} large /></div>
            <div className="grid gap-6 lg:col-span-5">
              <ProjectCard p={projects[1]} />
            </div>
            <div className="lg:col-span-5"><ProjectCard p={projects[2]} /></div>
            <div className="lg:col-span-7"><ProjectCard p={projects[3]} /></div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section bg-white">
        <div className="container-site">
          <SectionHead center eyebrow="How it works" title="From your call to a safe switch-on" />
          <div className="grid gap-6 md:grid-cols-4">
            {[
              ['01', 'Call or book', 'Tell us what you need by phone, WhatsApp or the booking form.'],
              ['02', 'Free site survey', 'An engineer visits, inspects and listens.'],
              ['03', 'Clear quotation', 'Written price with materials and labour listed.'],
              ['04', 'Work & hand-over', 'Neat work, testing report and warranty.'],
            ].map(([n, t, d]) => (
              <div key={n} className="group rounded-[28px] bg-bg p-7 transition hover:bg-navy">
                <p className="text-5xl font-extrabold text-brand">{n}</p>
                <h3 className="mt-6 text-xl group-hover:text-white">{t}</h3>
                <p className="mt-2 group-hover:text-white/70">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technicians */}
      <section className="section">
        <div className="container-site">
          <SectionHead eyebrow="Book a technician" title="Verified technicians, ready when you are" action={<Button to="/technicians" variant="outline">All technicians</Button>} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {technicians.map((t) => <TechCard key={t.slug} t={t} />)}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section bg-white">
        <div className="container-site">
          <SectionHead eyebrow="Shop" title="Genuine electrical & security products" action={<Button to="/products" variant="outline">All products</Button>} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>

      {/* Emergency banner */}
      <section className="container-site py-16">
        <div className="relative overflow-hidden rounded-[36px] bg-navy">
          <Img src={IMG.powerLines} alt="" className="absolute inset-0 h-full w-full opacity-25" />
          <div className="relative grid gap-8 p-8 md:p-14 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-danger px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">● Emergency 24/7</span>
              <h2 className="mt-5 text-3xl text-white md:text-5xl">Sparks, smoke or a total blackout?</h2>
              <p className="mt-4 text-lg text-white/70">Switch off the main supply, keep everyone away and call us. A technician is on the way, day or night.</p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <a href={SITE.hotlineHref} className="flex items-center gap-4 rounded-full bg-danger py-2 pl-7 pr-2 text-2xl font-extrabold text-white">
                {SITE.hotline}<span className="grid h-14 w-14 place-items-center rounded-full bg-white text-danger"><Phone /></span>
              </a>
              <Link to="/emergency" className="flex items-center gap-1 font-bold text-brand hover:underline">What to do in an emergency <ArrowUpRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section pt-4">
        <div className="container-site">
          <SectionHead eyebrow="Testimonials" title="What our clients say" action={<Button to="/testimonials" variant="outline">All reviews</Button>} />
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => <TestimonialCard key={t.name} t={t} />)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-white">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-4 text-3xl leading-tight md:text-5xl">Questions people often ask</h2>
            <p className="mt-4 text-lg">Can’t find your answer? Call us or send an enquiry — we reply quickly.</p>
            <div className="mt-8"><Button to="/faq" variant="dark">See all FAQs</Button></div>
          </div>
          <div className="space-y-3 lg:col-span-7">
            {faqs.slice(0, 5).map((f, i) => <div key={f.q} className="rounded-3xl ring-1 ring-line"><FaqItem q={f.q} a={f.a} defaultOpen={i === 0} /></div>)}
          </div>
        </div>
      </section>

      <div className="pt-20"><CtaBand /></div>
    </>
  )
}
