import { SITE } from '../data/site'

const KEY = import.meta.env.VITE_WEB3FORMS_KEY

// Fields used only for spam checks; never sent.
const TRAP_FIELDS = ['botcheck', 'krc_hp']
const MIN_FILL_MS = 3000 // people take longer than this to fill a form; bots don't
const MAX_LINKS = 2

// True when a submission looks automated. Bots are told it worked so they don't retry.
export function looksLikeSpam(data, openedAt) {
  if (TRAP_FIELDS.some((k) => data[k])) return true
  if (openedAt && Date.now() - openedAt < MIN_FILL_MS) return true
  const links = Object.values(data).join(' ').match(/https?:\/\/|www\./gi) || []
  return links.length > MAX_LINKS
}

// Sends a form to the company email.
// With a Web3Forms key (free) the message is delivered silently.
// Without a key, the visitor's email app opens with the details filled in.
export async function submitForm(subject, data, { openedAt } = {}) {
  if (looksLikeSpam(data, openedAt)) return { ok: true, spam: true }

  const clean = Object.fromEntries(
    Object.entries(data).filter(([k, v]) => !TRAP_FIELDS.includes(k) && v !== '' && v != null),
  )

  if (KEY) {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: KEY,
        subject: `[KRC Website] ${subject}`,
        from_name: 'KRC Website',
        ...clean,
      }),
    })
    const json = await res.json().catch(() => ({}))
    if (!res.ok || json.success === false) {
      throw new Error(json.message || 'Could not send. Please call us instead.')
    }
    return { ok: true }
  }

  const body = Object.entries(clean)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')
  window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
    '[KRC Website] ' + subject,
  )}&body=${encodeURIComponent(body)}`
  return { ok: true, mailto: true }
}
