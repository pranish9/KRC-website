import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2, AlertCircle } from 'lucide-react'
import { submitForm } from '../lib/submitForm'
import { Button } from './ui'

// Today's date (YYYY-MM-DD, visitor's local time). Empty until the page is running in the
// browser, so prerendered pages never carry the build date.
export function useToday() {
  const [today, setToday] = useState('')
  useEffect(() => setToday(new Date().toLocaleDateString('en-CA')), [])
  return today
}

export function Field({ label, name, type = 'text', required, options, rows, placeholder, defaultValue, className = '', ...rest }) {
  const id = `f-${name}`
  return (
    <div className={className}>
      <label htmlFor={id} className="label">{label}{required && <span className="text-danger"> *</span>}</label>
      {options ? (
        <select id={id} name={name} required={required} defaultValue={defaultValue ?? ''} className="input appearance-none" {...rest}>
          <option value="" disabled>Select…</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : rows ? (
        <textarea id={id} name={name} required={required} rows={rows} placeholder={placeholder} defaultValue={defaultValue} className="input resize-y" {...rest} />
      ) : (
        <input id={id} name={name} type={type} required={required} placeholder={placeholder} defaultValue={defaultValue} className="input" {...rest} />
      )}
    </div>
  )
}

// Wraps any form: collects fields, sends to email, then goes to the thank-you page.
export function SmartForm({ subject, children, submitLabel = 'Send', thankYou = '/thank-you', state, className = '' }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const openedAt = useRef(0)
  const nav = useNavigate()

  useEffect(() => {
    openedAt.current = Date.now()
  }, [])

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    const data = Object.fromEntries(new FormData(e.currentTarget).entries())
    try {
      const r = await submitForm(subject, data, { openedAt: openedAt.current })
      nav(thankYou, { state: { ...state, name: data.name, mailto: r.mailto, subject, data } })
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className={className}>
      {/* Honeypots for spam bots — hidden from people and screen readers */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>Leave this empty <input type="text" name="krc_hp" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {children}
      {error && (
        <p className="mt-5 flex items-center gap-2 rounded-2xl bg-danger/10 p-4 text-sm font-semibold text-danger"><AlertCircle size={18} /> {error}</p>
      )}
      <div className="mt-7 flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={busy}>
          {busy ? <span className="flex items-center gap-2"><Loader2 size={18} className="animate-spin" /> Sending…</span> : submitLabel}
        </Button>
        <p className="text-xs text-muted">We reply within 2 working hours. Your details are only used to contact you.</p>
      </div>
    </form>
  )
}
