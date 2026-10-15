import { SITE } from '../data/site'

const KEY = import.meta.env.VITE_WEB3FORMS_KEY

// Sends a form to the company email.
// With a Web3Forms key (free) the message is delivered silently.
// Without a key, the visitor's email app opens with the details filled in.
export async function submitForm(subject, data) {
  if (data.botcheck) return { ok: true } // honeypot: bots fill hidden fields

  const clean = Object.fromEntries(
    Object.entries(data).filter(([k, v]) => k !== 'botcheck' && v !== '' && v != null),
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
