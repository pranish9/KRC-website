import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

export default function FaqItem({ q, a, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={`rounded-3xl transition ${open ? 'bg-navy text-white' : 'bg-white'}`}>
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-4 p-6 text-left" aria-expanded={open}>
        <span className={`text-lg font-bold ${open ? 'text-white' : 'text-navy'}`}>{q}</span>
        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${open ? 'bg-brand text-navy' : 'bg-bg text-navy'}`}>
          {open ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>
      {open && <p className="fade-in px-6 pb-6 leading-relaxed text-white/75">{a}</p>}
    </div>
  )
}
