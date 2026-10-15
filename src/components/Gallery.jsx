import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react'
import { Img } from './ui'

export function Lightbox({ images, index, onClose, onIndex }) {
  const n = images.length
  const prev = useCallback(() => onIndex((index - 1 + n) % n), [index, n, onIndex])
  const next = useCallback(() => onIndex((index + 1) % n), [index, n, onIndex])

  useEffect(() => {
    const k = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', k)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', k)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-navy/95 backdrop-blur" role="dialog" aria-modal="true">
      <div className="flex items-center justify-between p-4 text-white">
        <span className="font-bold">{index + 1} / {n}</span>
        <button onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Close"><X /></button>
      </div>
      <div className="relative flex flex-1 items-center justify-center px-4" onClick={onClose}>
        <img src={images[index]} alt="" className="max-h-[78vh] max-w-full rounded-2xl object-contain" onClick={(e) => e.stopPropagation()} />
        {n > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-3 grid h-12 w-12 place-items-center rounded-full bg-white text-navy md:left-8" aria-label="Previous"><ChevronLeft /></button>
            <button onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-3 grid h-12 w-12 place-items-center rounded-full bg-brand text-navy md:right-8" aria-label="Next"><ChevronRight /></button>
          </>
        )}
      </div>
      <div className="flex justify-center gap-2 overflow-x-auto p-4">
        {images.map((src, i) => (
          <button key={i} onClick={() => onIndex(i)} className={`h-16 w-24 shrink-0 overflow-hidden rounded-xl ring-2 transition ${i === index ? 'ring-brand' : 'opacity-50 ring-transparent hover:opacity-100'}`}>
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

// Bento-style photo gallery that opens a full-screen lightbox.
export default function Gallery({ images, title = 'Photo' }) {
  const [open, setOpen] = useState(null)
  if (!images?.length) return null
  const layout = ['md:col-span-2 md:row-span-2', '', '', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2']
  return (
    <>
      <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-cols-4">
        {images.map((src, i) => (
          <button key={i} onClick={() => setOpen(i)} className={`group relative overflow-hidden rounded-3xl ${layout[i % layout.length]}`} aria-label={`Open ${title} ${i + 1}`}>
            <Img src={src} alt={`${title} ${i + 1}`} className="h-full w-full transition duration-500 group-hover:scale-105" />
            <span className="absolute inset-0 grid place-items-center bg-navy/0 opacity-0 transition group-hover:bg-navy/40 group-hover:opacity-100">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-navy"><Expand size={20} /></span>
            </span>
          </button>
        ))}
      </div>
      {open != null && <Lightbox images={images} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </>
  )
}
