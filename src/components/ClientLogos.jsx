import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Pause, Play } from 'lucide-react'
import { clients } from '../data/content'
import { getProject } from '../data/projects'
import { asset } from '../lib/asset'

const initials = (name) => {
  const words = name.split(/\s+/)
  return (words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 2)).toUpperCase()
}

function ClientTile({ c, hidden }) {
  const p = getProject(c.project)
  return (
    <li>
      <Link
        to={p ? `/projects/${p.slug}` : '/projects'}
        tabIndex={hidden ? -1 : undefined}
        className="group flex h-20 w-48 items-center gap-3 rounded-2xl bg-white px-4 ring-1 ring-line transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-16px_rgba(10,26,51,.35)] hover:ring-navy/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy sm:h-24 sm:w-56"
      >
        {c.logo ? (
          <img src={asset(c.logo)} alt="" loading="lazy" className="h-10 w-12 shrink-0 object-contain opacity-70 grayscale transition group-hover:opacity-100 group-hover:grayscale-0" />
        ) : (
          <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy text-sm font-extrabold tracking-wide text-brand transition group-hover:bg-brand group-hover:text-navy">
            {initials(c.name)}
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-extrabold text-navy">{c.name}</span>
          <span className="block truncate text-xs font-semibold text-body">{p?.sector ?? 'Client'}</span>
          <span className="mt-0.5 flex items-center gap-1 text-xs font-bold text-navy opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
            View project <ArrowUpRight size={12} />
          </span>
        </span>
      </Link>
    </li>
  )
}

// Slowly scrolling strip of client logos. Pauses on hover, keyboard focus or the pause button;
// shows as a still, wrapped grid when the visitor prefers reduced motion.
export default function ClientLogos() {
  const [paused, setPaused] = useState(false)
  return (
    <section className="py-10" aria-labelledby="clients-title">
      <div className="container-site mb-6 flex items-center justify-center gap-3">
        <h2 id="clients-title" className="text-center text-sm font-bold uppercase tracking-wider text-muted">Trusted by businesses across the valley</h2>
        <button
          onClick={() => setPaused(!paused)}
          className="marquee-toggle grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-navy ring-1 ring-line transition hover:bg-navy hover:text-white"
          aria-label={paused ? 'Play client logos' : 'Pause client logos'}
          aria-pressed={paused}
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
        </button>
      </div>
      <div className="marquee overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]" data-paused={paused || undefined}>
        <div className="marquee-track flex w-max">
          <ul className="flex gap-3 pr-3">
            {clients.map((c) => <ClientTile key={c.name} c={c} />)}
          </ul>
          {/* Second copy makes the loop seamless; hidden from screen readers and keyboard. */}
          <ul className="marquee-dup flex gap-3 pr-3" aria-hidden="true">
            {clients.map((c) => <ClientTile key={c.name} c={c} hidden />)}
          </ul>
        </div>
      </div>
    </section>
  )
}
