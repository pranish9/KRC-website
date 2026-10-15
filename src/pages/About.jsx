import { Target, Eye, HeartHandshake, ShieldCheck, Lightbulb, Clock } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Button, SectionHead, Img, Seo } from '../components/ui'
import { CtaBand } from '../components/Layout'
import { SITE } from '../data/site'
import { IMG, CEO } from '../data/images'
import { leadership } from '../data/team'

const timeline = [
  ['2009', 'KRC opens a small repair workshop in Gusingal, Lalitpur.'],
  ['2013', 'Registered as Kathmandu Repairing Center Pvt. Ltd.; first commercial projects.'],
  ['2017', 'Electrical design & consultancy team formed with licensed engineers.'],
  ['2020', 'Security systems and product sales added; 24/7 emergency line launched.'],
  ['2025', '850+ projects completed for homes, hotels, hospitals, banks and industry.'],
]

export default function About() {
  return (
    <>
      <Seo title="About Us" description="Learn about Kathmandu Repairing Center Pvt. Ltd., our story, values and leadership." />
      <PageHero eyebrow="About KRC" title="Honest electrical work since 2009" text="Electrical engineering consulting, execution and product sales — built on trust, safety and always being there when the power goes out." crumbs={[{ label: 'About' }]} image={IMG.hardhatTool} />

      <section className="section">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Our story</span>
            <h2 className="mt-4 text-3xl leading-tight md:text-5xl">From a small workshop to a full engineering company</h2>
            <p className="mt-5 text-lg">
              {SITE.founder} started KRC as a small repair workshop in Gusingal with one promise: do the job right, and be there when clients need you. Word spread, and today our engineers and technicians design, build and maintain electrical systems across the Kathmandu Valley.
            </p>
            <p className="mt-4 text-lg">We still work the same way — a written quotation before work begins, genuine materials, neat installation, and a phone that is answered at any hour.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Img src={IMG.screwdriverPanel} alt="Technician at work" className="h-80 w-full rounded-[28px]" />
            <Img src={IMG.wiresBox} alt="Wiring work" className="mt-12 h-80 w-full rounded-[28px]" />
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site grid gap-6 md:grid-cols-3">
          {[
            [Target, 'Mission', 'To deliver safe, reliable and affordable electrical solutions with honesty and care.'],
            [Eye, 'Vision', 'To be Nepal’s most trusted name for electrical engineering and after-sales service.'],
            [HeartHandshake, 'Promise', 'Clear prices, quality materials, tidy work and support long after hand-over.'],
          ].map(([I, t, d]) => (
            <div key={t} className="rounded-[28px] bg-bg p-8">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand text-navy"><I /></span>
              <h3 className="mt-6 text-2xl">{t}</h3>
              <p className="mt-2 text-lg">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CEO message */}
      <section className="section">
        <div className="container-site">
          <div className="grid overflow-hidden rounded-[36px] bg-navy lg:grid-cols-5">
            <img src={CEO} alt={SITE.founder} className="h-full max-h-[560px] w-full object-cover object-top lg:col-span-2" />
            <div className="p-8 text-white md:p-14 lg:col-span-3">
              <span className="eyebrow-dark">Message from the founder</span>
              <p className="mt-6 text-2xl font-semibold leading-relaxed md:text-3xl">
                “Electricity is invisible until something goes wrong. Our job is to make sure it never does — and when it does, to be the first people you call.”
              </p>
              <p className="mt-8 text-xl font-extrabold text-brand">{SITE.founder}</p>
              <p className="text-white/70">Founder &amp; CEO, Kathmandu Repairing Center</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site">
          <SectionHead center eyebrow="Our journey" title="Milestones" />
          <ol className="relative mx-auto max-w-3xl border-l-2 border-line pl-8">
            {timeline.map(([y, t]) => (
              <li key={y} className="mb-10 last:mb-0">
                <span className="absolute -left-[11px] mt-1.5 h-5 w-5 rounded-full border-4 border-white bg-brand ring-2 ring-brand" />
                <p className="text-2xl font-extrabold text-navy">{y}</p>
                <p className="mt-1 text-lg">{t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <SectionHead eyebrow="Why clients choose us" title="Values we work by" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [ShieldCheck, 'Safety first', 'Every job tested and built to code.'],
              [Lightbulb, 'Honest advice', 'We recommend only what you need.'],
              [Clock, 'Always there', '24/7 support, festivals included.'],
              [HeartHandshake, 'Long-term care', 'Project records and after-sales.'],
            ].map(([I, t, d]) => (
              <div key={t} className="card p-7">
                <I className="text-navy" size={28} />
                <h3 className="mt-5 text-xl">{t}</h3>
                <p className="mt-2">{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center"><Button to="/team" variant="dark">Meet the team</Button></div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
