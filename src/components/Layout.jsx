import { useEffect } from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import { Phone, MessageCircle } from 'lucide-react'
import Navbar from './Navbar'
import Footer from './Footer'
import { SITE } from '../data/site'
import { Button } from './ui'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export function CtaBand() {
  return (
    <section className="container-site pb-20">
      <div className="relative overflow-hidden rounded-[28px] bg-brand px-6 py-10 sm:py-14 md:rounded-[36px] md:px-14">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border-[40px] border-navy/5" />
        <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl">Have a project or a problem? Let’s talk today.</h2>
            <p className="mt-3 text-base text-navy/70 sm:text-lg">Free site survey for new projects inside the Kathmandu Valley.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button to="/book" variant="dark">Book a site visit</Button>
            <Button to="/enquiry" variant="light">Send enquiry</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:font-bold focus:text-navy">Skip to content</a>
      <ScrollTop />
      <Navbar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />

      {/* Floating quick actions */}
      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex flex-col gap-3 sm:bottom-5 sm:right-5">
        <a href={SITE.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid h-12 w-12 place-items-center rounded-full bg-ok sm:h-14 sm:w-14 text-white shadow-xl transition hover:scale-105"><MessageCircle /></a>
        <a href={SITE.hotlineHref} aria-label="Call hotline" className="relative grid h-12 w-12 place-items-center rounded-full bg-danger sm:h-14 sm:w-14 text-white shadow-xl transition hover:scale-105">
          <span className="absolute inset-0 animate-ping rounded-full bg-danger opacity-30" />
          <Phone className="relative" />
        </a>
      </div>
    </div>
  )
}

export function NotFoundInline({ what = 'page', back = '/' }) {
  return (
    <div className="container-site py-32 text-center">
      <h1 className="text-4xl">Sorry, this {what} was not found.</h1>
      <Link to={back} className="mt-6 inline-block font-bold text-navy underline">Go back</Link>
    </div>
  )
}
