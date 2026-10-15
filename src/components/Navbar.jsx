import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X, Phone, Search, Mail, Clock } from 'lucide-react'
import { getIcon } from './icons'
import { NAV, SITE } from '../data/site'
import { services } from '../data/services'
import { Button } from './ui'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [drop, setDrop] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
    setDrop(null)
  }, [pathname])

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="hidden bg-navy text-sm text-white/80 md:block">
        <div className="container-site flex h-10 items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><Clock size={14} className="text-brand" /> Sun–Fri 10–5 · Sat 10–3</span>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-white"><Mail size={14} className="text-brand" /> {SITE.email}</a>
          </div>
          <Link to="/emergency" className="flex items-center gap-2 font-semibold text-brand hover:underline">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-danger" /></span>
            24/7 Emergency: {SITE.hotline}
          </Link>
        </div>
      </div>

      <nav className={`border-b border-line/60 bg-white/95 backdrop-blur transition-shadow ${scrolled ? 'shadow-[0_8px_30px_-12px_rgba(10,26,51,.18)]' : ''}`}>
        <div className="container-site flex h-[76px] items-center justify-between gap-4">
          <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="Kathmandu Repairing Center home">
            <img src="/images/logo.png" alt="KRC logo" className="h-11 w-auto" />
            <span className="hidden leading-tight sm:block">
              <span className="block text-[15px] font-extrabold text-navy">Kathmandu Repairing</span>
              <span className="block text-xs font-semibold tracking-wide text-body">Center Pvt. Ltd.</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 xl:flex" onMouseLeave={() => setDrop(null)}>
            {NAV.map((item) => (
              <li key={item.label} className="relative" onMouseEnter={() => setDrop(item.children || item.mega ? item.label : null)}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-1 rounded-full px-3.5 py-2 text-[15px] font-semibold transition ${
                      isActive ? 'bg-brand-soft text-navy' : 'text-body hover:text-navy'
                    }`
                  }
                >
                  {item.label}
                  {(item.children || item.mega) && <ChevronDown size={15} className={`transition ${drop === item.label ? 'rotate-180' : ''}`} />}
                </NavLink>

                {item.children && drop === item.label && (
                  <div className="absolute left-0 top-full pt-3">
                    <div className="fade-in w-56 rounded-3xl bg-white p-2 shadow-2xl ring-1 ring-line">
                      {item.children.map((c) => (
                        <Link key={c.to} to={c.to} className="block rounded-2xl px-4 py-3 text-sm font-semibold text-navy hover:bg-bg">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {item.mega && drop === item.label && (
                  <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                    <div className="fade-in grid w-[640px] grid-cols-2 gap-1 rounded-3xl bg-white p-3 shadow-2xl ring-1 ring-line">
                      {services.map((s) => {
                        const Ico = getIcon(s.icon)
                        return (
                          <Link key={s.slug} to={`/services/${s.slug}`} className="flex gap-3 rounded-2xl p-3 hover:bg-bg">
                            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-navy"><Ico size={20} /></span>
                            <span>
                              <span className="block text-sm font-bold text-navy">{s.title}</span>
                              <span className="line-clamp-2 text-xs text-body">{s.short}</span>
                            </span>
                          </Link>
                        )
                      })}
                      <Link to="/services" className="col-span-2 mt-1 rounded-2xl bg-navy p-3 text-center text-sm font-bold text-white hover:bg-navy-2">
                        View all services →
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a href={SITE.hotlineHref} className="hidden items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-sm font-bold text-navy 2xl:flex">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-soft"><Phone size={16} /></span>
              {SITE.hotline}
            </a>
            <Button to="/book" className="hidden whitespace-nowrap sm:inline-flex">Book a visit</Button>
            <button onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center rounded-full bg-navy text-white xl:hidden" aria-label="Open menu">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <div className="absolute inset-0 bg-navy/60" onClick={() => setOpen(false)} />
          <div className="fade-in absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <img src="/images/logo.png" alt="KRC" className="h-10" />
              <button onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-bg" aria-label="Close menu"><X size={20} /></button>
            </div>
            <ul className="space-y-1">
              {NAV.map((item) => (
                <li key={item.label}>
                  <NavLink to={item.to} end={item.to === '/'} className={({ isActive }) => `block rounded-2xl px-4 py-3 font-bold ${isActive ? 'bg-brand-soft text-navy' : 'text-navy'}`}>
                    {item.label}
                  </NavLink>
                  {item.children && (
                    <div className="ml-4 border-l border-line pl-2">
                      {item.children.slice(1).map((c) => (
                        <Link key={c.to} to={c.to} className="block px-4 py-2 text-sm font-semibold text-body">{c.label}</Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
              <li><Link to="/search" className="flex items-center gap-2 px-4 py-3 font-bold text-navy"><Search size={16} /> Search</Link></li>
            </ul>
            <div className="mt-auto space-y-3 pt-8">
              <Button to="/book" className="w-full">Book a site visit</Button>
              <Button href={SITE.hotlineHref} variant="dark" icon="phone" className="w-full">Call {SITE.hotline}</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
