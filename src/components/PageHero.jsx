import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Img } from './ui'

// Navy page header with breadcrumbs, used on every inner page.
export default function PageHero({ eyebrow, title, text, crumbs = [], image, children }) {
  return (
    <section className="container-site pt-6">
      <div className="relative overflow-hidden rounded-[32px] bg-navy px-6 py-14 text-white md:px-14 md:py-20">
        {image && (
          <>
            <Img src={image} alt="" className="absolute inset-0 h-full w-full opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/40" />
          </>
        )}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand/10 blur-2xl" />
        <div className="relative max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1.5 text-sm text-white/60">
            <Link to="/" className="hover:text-white">Home</Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-1.5">
                <ChevronRight size={14} />
                {c.to ? <Link to={c.to} className="hover:text-white">{c.label}</Link> : <span className="text-brand">{c.label}</span>}
              </span>
            ))}
          </nav>
          {eyebrow && <span className="eyebrow-dark">{eyebrow}</span>}
          <h1 className="mt-4 text-4xl leading-[1.08] text-white md:text-6xl">{title}</h1>
          {text && <p className="mt-5 max-w-2xl text-lg text-white/70">{text}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  )
}
