import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, BadgeCheck, MapPin, Briefcase, Languages, Award, Clock, CheckCircle2 } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Seo, Img, Button, Stars } from '../components/ui'
import { TechCard } from '../components/Cards'
import { Field, SmartForm, useToday } from '../components/Form'
import { CtaBand, NotFoundInline } from '../components/Layout'
import { technicians, getTechnician } from '../data/team'
import { testimonials } from '../data/content'
import { services } from '../data/services'
import { IMG } from '../data/images'

export function Technicians() {
  const [onlyAvail, setOnlyAvail] = useState(false)
  const list = onlyAvail ? technicians.filter((t) => t.available) : technicians
  return (
    <>
      <Seo title="Technicians" description="Book a verified KRC electrician, engineer or CCTV specialist." />
      <PageHero eyebrow="Technicians" title="Book a verified technician" text="All technicians are KRC staff — trained, insured and accountable to us." crumbs={[{ label: 'Technicians' }]} image={IMG.fixingCable} />
      <section className="section">
        <div className="container-site">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <p className="font-semibold">{list.length} technicians</p>
            <label className="flex cursor-pointer items-center gap-3 font-semibold text-navy">
              <input type="checkbox" checked={onlyAvail} onChange={(e) => setOnlyAvail(e.target.checked)} className="h-5 w-5 accent-navy" /> Available today only
            </label>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((t) => <TechCard key={t.slug} t={t} />)}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}

export function TechnicianProfile() {
  const { slug } = useParams()
  const t = getTechnician(slug)
  if (!t) return <NotFoundInline what="technician" back="/technicians" />
  return (
    <>
      <Seo title={`${t.name} – ${t.role}`} description={t.about} />
      <section className="container-site pt-8">
        <nav className="mb-6 text-sm"><Link to="/">Home</Link> / <Link to="/technicians">Technicians</Link> / <span className="font-semibold text-navy">{t.name}</span></nav>
        <div className="grid overflow-hidden rounded-[28px] bg-navy md:grid-cols-3 md:rounded-[36px]">
          <Img src={t.photo} alt={t.name} className="h-80 w-full object-top sm:h-96 md:h-full" />
          <div className="p-6 text-white sm:p-8 md:col-span-2 lg:p-12">
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${t.available ? 'bg-ok' : 'bg-white/15'}`}>● {t.available ? 'Available today' : 'Busy today — book for later'}</span>
            <h1 className="mt-4 flex flex-wrap items-center gap-2 text-4xl text-white md:text-5xl">{t.name} <BadgeCheck className="text-brand" size={32} /></h1>
            <p className="mt-2 text-xl text-white/70">{t.role}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
              <Stars value={t.rating} /> <span className="font-bold">{t.rating}</span> <span className="text-white/60">({t.reviews} reviews)</span>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 xl:grid-cols-4">
              {[[Briefcase, `${t.experience} yrs`, 'Experience'], [CheckCircle2, t.jobs, 'Jobs done'], [Star, t.rating, 'Rating'], [MapPin, t.distance, 'From office']].map(([I, v, l]) => (
                <div key={l} className="rounded-2xl bg-white/10 p-4"><I size={18} className="text-brand" /><p className="mt-2 text-2xl font-extrabold">{v}</p><p className="text-xs text-white/60">{l}</p></div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to={`/technicians/${t.slug}/book`}>Book now</Button>
              <Button to="/emergency" variant="ghostLight" icon="phone">Emergency</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-10">
        <div className="container-site grid gap-6 lg:grid-cols-3">
          <div className="card p-6 sm:p-8 lg:col-span-2">
            <h2 className="text-2xl">About</h2>
            <p className="mt-3 text-lg leading-relaxed">{t.about}</p>
            <h3 className="mt-8 text-xl">Skills</h3>
            <div className="mt-3 flex flex-wrap gap-2">{t.skills.map((s) => <span key={s} className="rounded-full bg-brand-soft px-4 py-2 font-semibold text-navy">{s}</span>)}</div>
            <h3 className="mt-8 text-xl">Recent reviews</h3>
            <div className="mt-4 space-y-4">
              {testimonials.slice(0, 3).map((r) => (
                <div key={r.name} className="rounded-2xl bg-bg p-5">
                  <div className="flex items-center justify-between"><span className="font-bold text-navy">{r.name}</span><Stars value={r.rating} size={14} /></div>
                  <p className="mt-2">{r.quote}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid content-start gap-6 md:grid-cols-2 lg:grid-cols-1">
            <div className="card p-7">
              <h3 className="flex items-center gap-2 text-lg"><Award size={20} /> Certifications</h3>
              <ul className="mt-3 space-y-2">{t.certifications.map((c) => <li key={c} className="flex gap-2"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-ok" /> {c}</li>)}</ul>
            </div>
            <div className="card p-7">
              <h3 className="flex items-center gap-2 text-lg"><Languages size={20} /> Languages</h3>
              <p className="mt-2">{t.languages.join(', ')}</p>
            </div>
            <div className="card p-7">
              <h3 className="flex items-center gap-2 text-lg"><Clock size={20} /> Working hours</h3>
              <p className="mt-2">Sun–Fri 10 AM – 5 PM, Sat 10 AM – 3 PM. Emergency calls any time.</p>
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}

const slots = ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM']

export function BookTechnician() {
  const { slug } = useParams()
  const today = useToday()
  const t = getTechnician(slug)
  const [slot, setSlot] = useState(slots[0])
  if (!t) return <NotFoundInline what="technician" back="/technicians" />
  return (
    <>
      <Seo title={`Book ${t.name}`} />
      <PageHero eyebrow="Booking" title={`Book ${t.name}`} text={`${t.role} · ${t.experience} years experience`} crumbs={[{ label: 'Technicians', to: '/technicians' }, { label: t.name, to: `/technicians/${t.slug}` }, { label: 'Book' }]} />
      <section className="section pt-10">
        <div className="container-site grid gap-8 lg:grid-cols-3">
          <SmartForm subject={`Technician booking – ${t.name}`} submitLabel="Confirm booking" thankYou="/booking-confirmed" state={{ tech: t.name, slot }} className="card p-6 md:p-10 lg:col-span-2">
            <input type="hidden" name="technician" value={t.name} />
            <input type="hidden" name="time" value={slot} />
            <h2 className="text-2xl">1. Choose date &amp; time</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <Field label="Date" name="date" type="date" required key={today} min={today || undefined} defaultValue={today} />
              <div>
                <span className="label">Time slot</span>
                <div className="flex flex-wrap gap-2">
                  {slots.map((s) => <button type="button" key={s} onClick={() => setSlot(s)} className={`chip ${slot === s ? 'chip-active' : ''}`}>{s}</button>)}
                </div>
              </div>
            </div>
            <h2 className="mt-10 text-2xl">2. What do you need?</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <Field label="Service" name="service" required options={services.map((s) => s.title)} />
              <Field label="Urgency" name="urgency" options={['Normal', 'Within 24 hours', 'Emergency']} defaultValue="Normal" />
              <Field className="md:col-span-2" label="Describe the problem or job" name="message" rows={4} placeholder="e.g. Breaker keeps tripping when the water pump starts" />
            </div>
            <h2 className="mt-10 text-2xl">3. Your details</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <Field label="Full name" name="name" required autoComplete="name" />
              <Field label="Phone" name="phone" type="tel" required autoComplete="tel" placeholder="98XXXXXXXX" pattern="[0-9+\-\s]{7,}" />
              <Field label="Email" name="email" type="email" autoComplete="email" />
              <Field label="Address / location" name="address" required placeholder="Tole, municipality" />
            </div>
          </SmartForm>

          <aside className="space-y-6">
            <div className="card p-6 lg:sticky lg:top-28">
              <div className="flex items-center gap-4">
                <Img src={t.photo} alt={t.name} className="h-16 w-16 rounded-2xl" />
                <div><p className="font-extrabold text-navy">{t.name}</p><p className="text-sm">{t.role}</p></div>
              </div>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between"><dt>Selected time</dt><dd className="font-bold text-navy">{slot}</dd></div>
                <div className="flex justify-between"><dt>Visit charge</dt><dd className="font-bold text-navy">From Rs 500</dd></div>
                <div className="flex justify-between"><dt>Payment</dt><dd className="font-bold text-navy">After the job</dd></div>
              </dl>
              <p className="mt-6 rounded-2xl bg-brand-soft p-4 text-sm text-navy">We’ll call you to confirm the time before the technician leaves.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
