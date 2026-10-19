import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowUpRight, Phone, Star } from 'lucide-react'
import { SITE } from '../data/site'
import { asset } from '../lib/asset'

const styles = {
  primary: 'bg-brand text-navy hover:bg-[#ffd54f]',
  dark: 'bg-navy text-white hover:bg-navy-2',
  light: 'bg-white text-navy hover:bg-brand-soft',
  outline: 'border-2 border-navy text-navy hover:bg-navy hover:text-white',
  ghostLight: 'border-2 border-white/30 text-white hover:bg-white hover:text-navy',
}
const chip = {
  primary: 'bg-navy text-brand',
  dark: 'bg-brand text-navy',
  light: 'bg-navy text-white',
  outline: 'bg-navy text-white group-hover:bg-brand group-hover:text-navy',
  ghostLight: 'bg-brand text-navy',
}

// Pill button with a round icon chip, as in the v5 design.
export function Button({ to, href, onClick, type = 'button', variant = 'primary', icon = 'arrow', children, className = '', disabled, ...rest }) {
  const Icon = icon === 'phone' ? Phone : icon === 'arrow' ? ArrowUpRight : null
  const cls = `group inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full py-2 font-bold transition-all duration-200 disabled:opacity-60 ${
    Icon ? 'pl-6 pr-2' : 'px-7 py-3.5'
  } ${styles[variant]} ${className}`
  const inner = (
    <>
      <span className={Icon ? 'py-1.5' : ''}>{children}</span>
      {Icon && (
        <span className={`grid h-10 w-10 place-items-center rounded-full transition-transform duration-200 group-hover:rotate-45 ${chip[variant]}`}>
          <Icon size={18} strokeWidth={2.5} className={icon === 'phone' ? 'group-hover:-rotate-45 transition-transform' : ''} />
        </span>
      )}
    </>
  )
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>
  return <button type={type} onClick={onClick} className={cls} disabled={disabled} {...rest}>{inner}</button>
}

export function SectionHead({ eyebrow, title, text, center, dark, action }) {
  return (
    <div className={`mb-10 flex flex-col gap-6 md:mb-14 ${center ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'}`}>
      <div className={center ? 'max-w-2xl' : 'max-w-2xl'}>
        {eyebrow && <span className={dark ? 'eyebrow-dark' : 'eyebrow'}>{eyebrow}</span>}
        <h2 className={`mt-4 text-[28px] leading-tight sm:text-4xl lg:text-5xl ${dark ? 'text-white' : ''}`}>{title}</h2>
        {text && <p className={`mt-4 text-base sm:text-lg ${dark ? 'text-white/70' : ''}`}>{text}</p>}
      </div>
      {action}
    </div>
  )
}

// Image with graceful fallback (navy panel with logo) if the photo fails to load.
export function Img({ src, alt = '', className = '', ...rest }) {
  const [err, setErr] = useState(false)
  if (err || !src)
    return (
      <div className={`relative flex flex-col items-center justify-center gap-3 overflow-hidden bg-gradient-to-br from-navy to-navy-2 p-4 text-center ${className}`} role="img" aria-label={alt}>
        <span className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#FFC727_1px,transparent_1px),linear-gradient(90deg,#FFC727_1px,transparent_1px)] [background-size:28px_28px]" />
        <img src={asset('images/logo-white.png')} alt="" className="relative w-1/4 max-w-[110px] opacity-40" />
        {alt && <span className="relative max-w-[90%] text-xs font-semibold text-white/50">{alt}</span>}
      </div>
    )
  return <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setErr(true)} className={`object-cover ${className}`} {...rest} />
}

export function Stars({ value = 5, size = 16 }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} className={i <= Math.round(value) ? 'fill-brand text-brand' : 'text-line'} />
      ))}
    </span>
  )
}

export function Seo({ title, description, image }) {
  const t = title ? `${title} | Kathmandu Repairing Center` : `${SITE.name} | Electrical Engineering, Lalitpur`
  return (
    <Helmet>
      <title>{t}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={t} />
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      <meta property="og:type" content="website" />
    </Helmet>
  )
}
