import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin, Calendar, Quote, Star, BadgeCheck } from 'lucide-react'
import { Img, Stars } from './ui'
import { getIcon } from './icons'
import { npr } from '../data/products'

export function ServiceCard({ s, i }) {
  const Ico = getIcon(s.icon)
  return (
    <Link to={`/services/${s.slug}`} className="group card relative flex flex-col overflow-hidden p-3 transition hover:-translate-y-1">
      <div className="relative h-52 overflow-hidden rounded-[20px]">
        <Img src={s.image} alt={s.title} className="h-full w-full transition duration-500 group-hover:scale-105" />
        {i != null && <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold text-navy">0{i + 1}</span>}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="relative z-10 -mt-11 mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-brand text-navy shadow-lg ring-4 ring-white"><Ico size={24} /></span>
        <h3 className="text-xl">{s.title}</h3>
        <p className="mt-2 flex-1 text-[15px]">{s.short}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-navy">
          Learn more <span className="grid h-8 w-8 place-items-center rounded-full bg-navy text-white transition group-hover:rotate-45 group-hover:bg-brand group-hover:text-navy"><ArrowUpRight size={16} /></span>
        </span>
      </div>
    </Link>
  )
}

export function ProjectCard({ p, large }) {
  return (
    <Link to={`/projects/${p.slug}`} className={`group relative block overflow-hidden rounded-[28px] bg-navy ${large ? 'h-[340px] sm:h-[420px] md:h-[520px]' : 'h-[320px] sm:h-[380px]'}`}>
      <Img src={p.cover} alt={p.title} className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
      <div className="absolute left-5 top-5 flex gap-2">
        <span className="rounded-full bg-brand px-3 py-1 text-xs font-extrabold text-navy">#{p.number}</span>
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white backdrop-blur">{p.sector}</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
        <div>
          <h3 className="text-xl text-white sm:text-2xl">{p.title}</h3>
          <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/70">
            <span className="flex items-center gap-1.5"><MapPin size={14} /> {p.location}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {p.completed}</span>
          </p>
        </div>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-navy transition group-hover:rotate-45 group-hover:bg-brand"><ArrowUpRight size={20} /></span>
      </div>
    </Link>
  )
}

export function ProductCard({ p }) {
  return (
    <div className="group card flex flex-col overflow-hidden p-3">
      <Link to={`/products/${p.slug}`} className="relative block h-56 overflow-hidden rounded-[20px] bg-bg">
        <Img src={p.image} alt={p.name} className="h-full w-full transition duration-500 group-hover:scale-105" />
        <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${p.inStock ? 'bg-ok/90 text-white' : 'bg-white text-body'}`}>
          {p.inStock ? 'In stock' : 'On order'}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-3 pt-4">
        <p className="text-xs font-bold uppercase tracking-wider text-muted">{p.brand} · {p.category}</p>
        <Link to={`/products/${p.slug}`} className="mt-1.5 text-lg font-extrabold leading-snug text-navy hover:underline">{p.name}</Link>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-xl font-extrabold text-navy">{npr(p.price)}</span>
          <Link to={`/enquiry?product=${p.slug}`} className="rounded-full bg-navy px-4 py-2 text-sm font-bold text-white transition hover:bg-brand hover:text-navy">Enquire</Link>
        </div>
      </div>
    </div>
  )
}

export function TechCard({ t }) {
  return (
    <div className="card flex flex-col p-3">
      <div className="relative h-64 overflow-hidden rounded-[20px]">
        <Img src={t.photo} alt={t.name} className="h-full w-full object-top" />
        <span className={`absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${t.available ? 'bg-ok text-white' : 'bg-white text-body'}`}>
          <span className={`h-2 w-2 rounded-full ${t.available ? 'bg-white' : 'bg-muted'}`} /> {t.available ? 'Available today' : 'Busy today'}
        </span>
        <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-extrabold text-navy"><Star size={14} className="fill-brand text-brand" /> {t.rating}</span>
      </div>
      <div className="flex flex-1 flex-col p-3 pt-4">
        <h3 className="flex items-center gap-1.5 text-lg">{t.name} <BadgeCheck size={18} className="text-ok" /></h3>
        <p className="text-sm font-semibold text-body">{t.role} · {t.experience} yrs</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {t.skills.slice(0, 3).map((s) => <span key={s} className="rounded-full bg-bg px-2.5 py-1 text-xs font-semibold text-navy">{s}</span>)}
        </div>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <Link to={`/technicians/${t.slug}`} className="rounded-full border-2 border-navy py-2.5 text-center text-sm font-bold text-navy transition hover:bg-navy hover:text-white">View profile</Link>
          <Link to={`/technicians/${t.slug}/book`} className="rounded-full bg-brand py-2.5 text-center text-sm font-bold text-navy transition hover:bg-navy hover:text-white">Book now</Link>
        </div>
      </div>
    </div>
  )
}

export function TestimonialCard({ t }) {
  return (
    <figure className="card flex h-full flex-col p-6 sm:p-7">
      <div className="flex items-center justify-between">
        <Stars value={t.rating} />
        <Quote size={32} className="text-brand" />
      </div>
      <blockquote className="mt-5 flex-1 text-lg font-medium leading-relaxed text-navy">“{t.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        <Img src={t.photo} alt={t.name} className="h-12 w-12 rounded-full" />
        <span>
          <span className="block font-bold text-navy">{t.name}</span>
          <span className="text-sm">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  )
}

export function BlogCard({ p }) {
  return (
    <Link to={`/blog/${p.slug}`} className="group card flex flex-col overflow-hidden p-3">
      <div className="h-56 overflow-hidden rounded-[20px]">
        <Img src={p.image} alt={p.title} className="h-full w-full transition duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-muted">{p.cat} · {p.date}</p>
        <h3 className="mt-2 text-xl leading-snug group-hover:underline">{p.title}</h3>
        <p className="mt-2 line-clamp-2 text-[15px]">{p.excerpt}</p>
        <span className="mt-4 text-sm font-bold text-navy">Read article →</span>
      </div>
    </Link>
  )
}
