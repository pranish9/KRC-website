import { useSearchParams, Link, useLocation } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, CheckCircle2, CalendarCheck, AlertTriangle, Power, Users, Flame, PhoneCall } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Seo, Button, Img, SIZES } from '../components/ui'
import { Field, SmartForm, useToday } from '../components/Form'
import { services, getService } from '../data/services'
import { products, getProduct, npr } from '../data/products'
import { SITE } from '../data/site'
import { IMG } from '../data/images'


function ContactAside() {
  return (
    <aside className="grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-1">
      {[
        [Phone, 'Hotline (24/7)', SITE.hotline, SITE.hotlineHref],
        [Phone, 'Office', SITE.office, SITE.officeHref],
        [Mail, 'Email', SITE.email, `mailto:${SITE.email}`],
        [MapPin, 'Visit us', SITE.address, SITE.mapLink],
      ].map(([I, l, v, href]) => (
        <a key={l} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="card flex items-center gap-4 p-5 transition hover:-translate-y-0.5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-soft text-navy"><I size={20} /></span>
          <span><span className="block text-xs font-bold uppercase tracking-wider text-muted">{l}</span><span className="font-bold text-navy">{v}</span></span>
        </a>
      ))}
      <div className="rounded-3xl bg-navy p-6 text-white sm:col-span-2 lg:col-span-1">
        <p className="flex items-center gap-2 font-bold"><Clock size={18} className="text-brand" /> Opening hours</p>
        <ul className="mt-3 space-y-1.5 text-sm text-white/80">{SITE.hours.map((h) => <li key={h.day} className="flex justify-between gap-4"><span>{h.day}</span><span className="font-semibold text-white">{h.time}</span></li>)}</ul>
      </div>
    </aside>
  )
}

export function Enquiry() {
  const [sp] = useSearchParams()
  const product = getProduct(sp.get('product') || '')
  const service = getService(sp.get('service') || '')
  return (
    <>
      <Seo title="Enquiry" description="Send an enquiry to Kathmandu Repairing Center about a product, service or project." />
      <PageHero eyebrow="Enquiry" title="How can we help?" text="Ask about a product, a service, a quotation or anything else. We reply within 2 working hours." crumbs={[{ label: 'Enquiry' }]} />
      <section className="section pt-10">
        <div className="container-site grid gap-8 lg:grid-cols-3">
          <SmartForm subject={product ? `Product enquiry – ${product.name}` : 'General enquiry'} submitLabel="Send enquiry" className="card p-6 md:p-10 lg:col-span-2">
            {product && (
              <div className="mb-8 flex items-center gap-4 rounded-2xl bg-bg p-4">
                <Img src={product.image} alt="" sizes={SIZES.thumb} className="h-16 w-16 rounded-xl" />
                <div className="flex-1"><p className="text-xs font-bold uppercase text-muted">Enquiring about</p><p className="font-bold text-navy">{product.name}</p></div>
                <p className="font-extrabold text-navy">{npr(product.price)}</p>
              </div>
            )}
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Enquiry type" name="type" required options={['Product', 'Service', 'Quotation for a project', 'Maintenance contract (AMC)', 'Other']} defaultValue={product ? 'Product' : service ? 'Service' : ''} />
              {product ? (
                <Field label="Product" name="product" options={products.map((p) => p.name)} defaultValue={product.name} />
              ) : (
                <Field label="Service (optional)" name="service" options={services.map((s) => s.title)} defaultValue={service?.title} />
              )}
              {product && <Field label="Quantity" name="quantity" type="number" min="1" defaultValue="1" />}
              {product && <Field label="Need installation?" name="installation" options={['Yes', 'No', 'Not sure']} defaultValue="Not sure" />}
              <Field label="Full name" name="name" required autoComplete="name" />
              <Field label="Phone" name="phone" type="tel" required autoComplete="tel" placeholder="98XXXXXXXX" />
              <Field label="Email" name="email" type="email" autoComplete="email" />
              <Field label="Company (optional)" name="company" autoComplete="organization" />
              <Field className="md:col-span-2" label="Your message" name="message" rows={5} required placeholder="Tell us what you need…" />
              <Field label="Preferred contact" name="contact_by" options={['Phone call', 'WhatsApp / Viber', 'Email']} defaultValue="Phone call" />
            </div>
          </SmartForm>
          <ContactAside />
        </div>
      </section>
    </>
  )
}

export function Book() {
  const [sp] = useSearchParams()
  const today = useToday()
  const service = getService(sp.get('service') || '')
  return (
    <>
      <Seo title="Book a Site Visit" description="Book a free site survey or a repair visit from KRC." />
      <PageHero eyebrow="Book a visit" title="Book a site visit" text="Free survey for new projects inside the valley. Repair visits from Rs 500." crumbs={[{ label: 'Book' }]} image={IMG.panelTest} />
      <section className="section pt-10">
        <div className="container-site grid gap-8 lg:grid-cols-3">
          <SmartForm subject="Site visit booking" submitLabel="Book my visit" thankYou="/booking-confirmed" className="card p-6 md:p-10 lg:col-span-2">
            <h2 className="text-2xl">Visit details</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <Field label="Service needed" name="service" required options={services.map((s) => s.title)} defaultValue={service?.title} />
              <Field label="Property type" name="property" required options={['House / apartment', 'Shop / office', 'Restaurant / hotel', 'Factory / industry', 'Hospital / school', 'Other']} />
              <Field label="Preferred date" name="date" type="date" required key={today} min={today || undefined} defaultValue={today} />
              <Field label="Preferred time" name="time" options={['Morning (10–12)', 'Afternoon (12–3)', 'Late afternoon (3–5)']} defaultValue="Morning (10–12)" />
              <Field className="md:col-span-2" label="Describe the work" name="message" rows={4} placeholder="e.g. New 3-storey house, need complete wiring design and quotation" />
            </div>
            <h2 className="mt-10 text-2xl">Your details</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <Field label="Full name" name="name" required autoComplete="name" />
              <Field label="Phone" name="phone" type="tel" required autoComplete="tel" placeholder="98XXXXXXXX" />
              <Field label="Email" name="email" type="email" autoComplete="email" />
              <Field label="Site address" name="address" required placeholder="Tole, municipality, district" />
            </div>
          </SmartForm>
          <aside className="grid content-start gap-4 md:grid-cols-2 lg:grid-cols-1">
            <div className="card p-7">
              <h3 className="text-xl">What happens next?</h3>
              <ol className="mt-4 space-y-4">
                {['We call to confirm date & time', 'An engineer visits and inspects', 'You receive a written quotation', 'Work starts only after your approval'].map((t, i) => (
                  <li key={t} className="flex gap-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand text-sm font-extrabold text-navy">{i + 1}</span><span className="pt-1 font-semibold text-navy">{t}</span></li>
                ))}
              </ol>
            </div>
            <a href={SITE.hotlineHref} className="flex items-center gap-4 rounded-3xl bg-danger p-6 text-white">
              <Phone /> <span><span className="block text-sm opacity-80">Need help right now?</span><span className="text-xl font-extrabold">{SITE.hotline}</span></span>
            </a>
          </aside>
        </div>
      </section>
    </>
  )
}

export function Contact() {
  return (
    <>
      <Seo title="Contact" description="Contact Kathmandu Repairing Center – Gusingal, Lalitpur. Hotline +977 985-1082575." />
      <PageHero eyebrow="Contact" title="Let’s talk" text="Visit our office in Gusingal, call us, or send a message — whichever is easiest." crumbs={[{ label: 'Contact' }]} />
      <section className="section pt-10">
        <div className="container-site grid gap-8 lg:grid-cols-3">
          <SmartForm subject="Contact form" submitLabel="Send message" className="card p-6 md:p-10 lg:col-span-2">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Full name" name="name" required autoComplete="name" />
              <Field label="Phone" name="phone" type="tel" required autoComplete="tel" />
              <Field label="Email" name="email" type="email" autoComplete="email" />
              <Field label="Subject" name="topic" options={['General question', 'Quotation', 'Complaint / feedback', 'Job application', 'Other']} defaultValue="General question" />
              <Field className="md:col-span-2" label="Message" name="message" rows={6} required />
            </div>
          </SmartForm>
          <ContactAside />
        </div>
        <div className="container-site mt-10">
          <div className="overflow-hidden rounded-[32px] bg-white p-3">
            <iframe title="KRC location map" src={SITE.mapEmbed} className="h-72 w-full rounded-[24px] sm:h-[420px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            <a href={SITE.mapLink} target="_blank" rel="noreferrer" className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-bg p-3 font-bold text-navy hover:bg-brand-soft"><MapPin size={18} /> Open in Google Maps</a>
          </div>
        </div>
      </section>
    </>
  )
}

export function Emergency() {
  return (
    <>
      <Seo title="24/7 Emergency" description="Electrical emergency in Kathmandu Valley? Call KRC 24/7 on +977 985-1082575." />
      <section className="container-site pt-6">
        <div className="relative overflow-hidden rounded-[36px] bg-danger px-6 py-16 text-white md:px-14 md:py-24">
          <Img src={IMG.powerLines} alt="" sizes={SIZES.full} className="absolute inset-0 h-full w-full opacity-15 mix-blend-multiply" />
          <div className="relative max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider">● Available 24 hours · 7 days</span>
            <h1 className="mt-5 text-4xl leading-tight text-white md:text-6xl">Electrical emergency? Call now.</h1>
            <p className="mt-4 text-xl text-white">Average arrival inside the valley: about 40 minutes.</p>
            <a href={SITE.hotlineHref} className="mt-8 inline-flex items-center gap-4 rounded-full bg-white py-2 pl-8 pr-2 text-2xl font-extrabold text-danger md:text-3xl">
              {SITE.hotline}<span className="grid h-14 w-14 place-items-center rounded-full bg-danger text-white"><PhoneCall /></span>
            </a>
            <p className="mt-4 text-white">Or call the office: <a href={SITE.officeHref} className="font-bold underline">{SITE.office}</a></p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-site">
          <h2 className="text-3xl md:text-4xl">While you wait — stay safe</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              [Power, 'Switch off the main', 'Turn off the main switch or MCB if it is safe to reach.'],
              [Users, 'Keep people away', 'Keep children and pets away from the affected area.'],
              [Flame, 'Never use water', 'On an electrical fire use a CO₂ or dry-powder extinguisher, or sand.'],
              [AlertTriangle, 'Don’t touch', 'Never touch fallen wires or anyone in contact with live current.'],
            ].map(([I, t, d]) => (
              <div key={t} className="card p-7">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-danger/10 text-danger"><I /></span>
                <h3 className="mt-5 text-xl">{t}</h3>
                <p className="mt-2">{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-3xl bg-navy p-8 text-white">
            <p className="text-lg">Fire or injury? Call <a href="tel:101" className="font-extrabold text-brand">101</a> (Fire) or <a href="tel:102" className="font-extrabold text-brand">102</a> (Ambulance) first, then call us.</p>
          </div>
        </div>
      </section>
    </>
  )
}

export function ThankYou({ booking }) {
  const { state } = useLocation()
  const name = state?.name ? `, ${state.name.split(' ')[0]}` : ''
  return (
    <>
      <Seo title={booking ? 'Booking Received' : 'Thank You'} />
      <section className="container-site py-20">
        <div className="mx-auto max-w-2xl rounded-[36px] bg-white p-8 text-center md:p-14">
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-ok/10 text-ok">{booking ? <CalendarCheck size={40} /> : <CheckCircle2 size={40} />}</span>
          <h1 className="mt-6 text-3xl md:text-5xl">{booking ? `Booking received${name}!` : `Thank you${name}!`}</h1>
          <p className="mt-4 text-lg">
            {state?.mailto
              ? 'Your email app has opened with your details — please press Send to deliver it. Prefer to talk? Call us anytime.'
              : booking
                ? 'We’ve received your request. Our team will call you shortly to confirm the date and time.'
                : 'Your message has reached us. We usually reply within 2 working hours.'}
          </p>
          {booking && state?.tech && (
            <div className="mx-auto mt-6 max-w-sm rounded-2xl bg-bg p-5 text-left text-sm">
              <div className="flex justify-between py-1"><span>Technician</span><span className="font-bold text-navy">{state.tech}</span></div>
              {state.slot && <div className="flex justify-between py-1"><span>Time</span><span className="font-bold text-navy">{state.slot}</span></div>}
            </div>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/" variant="dark">Back to home</Button>
            <Button href={SITE.hotlineHref} variant="outline" icon="phone">{SITE.hotline}</Button>
          </div>
          <p className="mt-8 text-sm">While you wait, see our <Link to="/projects" className="font-bold text-navy underline">recent projects</Link>.</p>
        </div>
      </section>
    </>
  )
}
