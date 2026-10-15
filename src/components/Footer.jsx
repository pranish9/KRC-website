import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, ArrowUpRight } from 'lucide-react'
import { SITE } from '../data/site'
import { services } from '../data/services'
import { asset } from '../lib/asset'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-navy text-white/70">
      <div className="container-site">
        {/* Emergency strip */}
        <div className="relative -top-0 flex flex-col items-start justify-between gap-6 border-b border-white/10 py-12 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-brand">Power problem right now?</p>
            <h3 className="mt-2 text-3xl text-white md:text-4xl">We answer 24 hours, 7 days a week.</h3>
          </div>
          <a href={SITE.hotlineHref} className="group inline-flex items-center gap-4 rounded-full bg-brand py-2 pl-7 pr-2 text-lg font-extrabold text-navy">
            {SITE.hotline}
            <span className="grid h-12 w-12 place-items-center rounded-full bg-navy text-brand transition group-hover:rotate-12"><Phone size={20} /></span>
          </a>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <img src={asset('images/logo-white.png')} alt="KRC" className="h-14 w-auto" />
            <p className="mt-5 max-w-sm leading-relaxed">
              {SITE.name} — electrical engineering consulting, execution and product sales in Lalitpur since {SITE.founded}.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                [Facebook, SITE.social.facebook, 'Facebook'],
                [Instagram, SITE.social.instagram, 'Instagram'],
                [Linkedin, SITE.social.linkedin, 'LinkedIn'],
              ].map(([I, href, label]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-brand hover:text-navy">
                  <I size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-5 text-base text-white">Services</h4>
            <ul className="space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.slug}><Link to={`/services/${s.slug}`} className="hover:text-brand">{s.title}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-5 text-base text-white">Company</h4>
            <ul className="space-y-3 text-sm">
              {[
                ['About us', '/about'], ['Our team', '/team'], ['Projects', '/projects'], ['Products', '/products'],
                ['Technicians', '/technicians'], ['Testimonials', '/testimonials'], ['Blog', '/blog'], ['FAQ', '/faq'],
              ].map(([l, to]) => (
                <li key={to}><Link to={to} className="hover:text-brand">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-5 text-base text-white">Get in touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-brand" /> {SITE.address}</li>
              <li className="flex gap-3"><Phone size={18} className="mt-0.5 shrink-0 text-brand" /> <span><a href={SITE.hotlineHref} className="hover:text-brand">{SITE.hotline}</a><br /><a href={SITE.officeHref} className="hover:text-brand">{SITE.office}</a></span></li>
              <li className="flex gap-3"><Mail size={18} className="mt-0.5 shrink-0 text-brand" /> <a href={`mailto:${SITE.email}`} className="hover:text-brand">{SITE.email}</a></li>
            </ul>
            <Link to="/enquiry" className="mt-6 inline-flex items-center gap-2 font-bold text-brand hover:underline">Send an enquiry <ArrowUpRight size={16} /></Link>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {SITE.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/terms" className="hover:text-white">Terms</Link>
            <Link to="/sitemap" className="hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
