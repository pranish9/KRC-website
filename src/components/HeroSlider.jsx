import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, ShieldCheck, Clock, Pause, Play } from 'lucide-react'
import { Button, Img, SIZES } from './ui'
import { IMG, PERSON } from '../data/images'
import { SITE } from '../data/site'

const slides = [
  {
    eyebrow: 'Electrical Engineering · Since 2009',
    title: <>Powering Nepal’s homes, businesses &amp; <span className="text-brand">industries.</span></>,
    text: 'Design, installation, repair and maintenance by licensed engineers — with a technician ready 24/7.',
    image: IMG.hardhatInstall,
  },
  {
    eyebrow: 'Panels · DBs · Changeovers',
    title: <>Safe, tidy panels built to <span className="text-brand">last for decades.</span></>,
    text: 'From a single home DB to 400 A industrial panels, we build to code and hand over full drawings.',
    image: IMG.controlPanel,
  },
  {
    eyebrow: 'Lighting · CCTV · Products',
    title: <>Light it beautifully. <span className="text-brand">Watch it securely.</span></>,
    text: 'Lighting design for restaurants and hotels, plus CCTV and genuine electrical products with warranty.',
    image: IMG.vintageBulbs,
  },
]

export default function HeroSlider() {
  const [i, setI] = useState(0)
  // Autoplay stops for good once the visitor uses the controls or presses pause,
  // and holds while the pointer or keyboard focus is inside the slider.
  const [stopped, setStopped] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  // Only slides that have been (or are about to be) shown load their photo.
  const [seen, setSeen] = useState(() => new Set([0]))
  // The first slide shows straight away; only later slide changes fade in.
  const [moved, setMoved] = useState(false)
  const n = slides.length

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setStopped(true)
  }, [])

  useEffect(() => {
    if (stopped) return
    setSeen((prev) => (prev.has((i + 1) % n) ? prev : new Set(prev).add((i + 1) % n)))
  }, [i, n, stopped])

  useEffect(() => {
    if (stopped || hovered || focused) return
    const t = setTimeout(() => {
      setMoved(true)
      setI((i + 1) % n)
    }, 6000)
    return () => clearTimeout(t)
  }, [i, stopped, hovered, focused, n])

  const go = (k) => {
    setStopped(true)
    setMoved(true)
    setSeen((prev) => new Set(prev).add(k))
    setI(k)
  }

  const s = slides[i]
  return (
    <section
      className="container-site pt-6"
      aria-roledescription="carousel"
      aria-label="KRC highlights"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocused(false)}
    >
      <div className="relative overflow-hidden rounded-[28px] bg-navy md:rounded-[36px]">
        {slides.map((sl, k) =>
          seen.has(k) ? (
            <Img key={k} src={sl.image} alt="" sizes={SIZES.full} priority={k === 0} className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${k === i ? 'opacity-100' : 'opacity-0'}`} />
          ) : null,
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/20" />

        <div className="relative grid min-h-[560px] gap-10 px-5 pb-28 pt-10 sm:px-8 sm:pt-14 md:min-h-[620px] md:px-14 md:py-20 lg:grid-cols-12">
          <div key={i} className={`${moved ? 'fade-in ' : ''}flex flex-col justify-center lg:col-span-7`} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${n}`} aria-live={stopped ? 'polite' : 'off'}>
            <span className="eyebrow-dark w-fit">{s.eyebrow}</span>
            <h1 className="mt-6 text-[34px] leading-[1.08] text-white sm:text-5xl md:text-6xl xl:text-7xl">{s.title}</h1>
            <p className="mt-5 max-w-xl text-base text-white/75 sm:mt-6 sm:text-lg">{s.text}</p>
            <div className="mt-8 flex flex-wrap gap-3 sm:mt-9">
              <Button to="/book">Book a site visit</Button>
              <Button href={SITE.hotlineHref} variant="ghostLight" icon="phone">Call 24/7</Button>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <div className="flex shrink-0 -space-x-3">
                {[0, 1, 2, 3].map((k) => <img key={k} src={PERSON} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover ring-4 ring-navy sm:h-11 sm:w-11" />)}
              </div>
              <div className="text-sm text-white/80">
                <span className="font-extrabold text-white">850+ projects</span> trusted by homes,<br className="hidden sm:block" /> restaurants, banks &amp; hospitals
              </div>
            </div>
          </div>

          <div className="hidden flex-col justify-end gap-4 lg:col-span-5 lg:flex lg:items-end">
            <div className="w-72 rounded-3xl bg-white/10 p-5 text-white backdrop-blur-md ring-1 ring-white/20">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand text-navy"><Clock size={20} /></span>
                <div><p className="text-2xl font-extrabold">40 min</p><p className="text-xs text-white/70">Average emergency arrival</p></div>
              </div>
            </div>
            <div className="w-72 rounded-3xl bg-white p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ok/10 text-ok"><ShieldCheck size={20} /></span>
                <div><p className="text-2xl font-extrabold text-navy">12-month</p><p className="text-xs">Workmanship warranty</p></div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 left-5 flex items-center gap-3 sm:bottom-6 sm:left-auto sm:right-6 md:bottom-10 md:right-10">
          <div className="mr-2 hidden gap-1.5 sm:flex">
            {slides.map((_, k) => (
              <button key={k} onClick={() => go(k)} aria-label={`Show slide ${k + 1}`} aria-current={k === i ? 'true' : undefined} className={`h-2 rounded-full transition-all ${k === i ? 'w-8 bg-brand' : 'w-2 bg-white/40'}`} />
            ))}
          </div>
          <button onClick={() => setStopped(!stopped)} className="grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white hover:text-navy" aria-label={stopped ? 'Play slideshow' : 'Pause slideshow'}>
            {stopped ? <Play size={18} /> : <Pause size={18} />}
          </button>
          <button onClick={() => go((i - 1 + n) % n)} className="grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white hover:text-navy" aria-label="Previous slide"><ChevronLeft /></button>
          <button onClick={() => go((i + 1) % n)} className="grid h-12 w-12 place-items-center rounded-full bg-brand text-navy hover:bg-white" aria-label="Next slide"><ChevronRight /></button>
        </div>
      </div>
    </section>
  )
}
