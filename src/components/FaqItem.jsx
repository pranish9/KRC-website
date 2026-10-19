import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

export default function FaqItem({ q, a, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={`rounded-3xl transition ${open ? 'bg-navy text-white' : 'bg-white'}`}>
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6" aria-expanded={open}>
        <span className={`text-base font-bold sm:text-lg ${open ? 'text-white' : 'text-navy'}`}>{q}</span>
        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${open ? 'bg-brand text-navy' : 'bg-bg text-navy'}`}>
          {open ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>
      {open && <p className="fade-in px-5 pb-5 leading-relaxed sm:px-6 sm:pb-6 text-white/75">{a}</p>}
    </div>
  )
}
