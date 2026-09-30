export const pct = (n: number, digits = 1): string =>
  `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.abs(n).toFixed(digits)}%`

export const sol = (n: number, digits = 2): string => `${n.toFixed(digits)} SOL`

export const num = (n: number): string => n.toLocaleString('en-US')

export const compact = (n: number): string =>
  Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(n)

const pad = (v: number) => String(v).padStart(2, '0')

/** HH:MM:SS in UTC */
export const clock = (t: number | Date): string => {
  const d = new Date(t)
  return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`
}

export const duration = (ms: number): string => {
  const s = Math.max(0, Math.floor(ms / 1000))
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`
}

export const ago = (t: number, now = Date.now()): string => {
  const s = Math.max(0, Math.round((now - t) / 1000))
  if (s < 60) return `${s}s ago`
  if (s < 3600) return `${Math.floor(s / 60)}m ago`
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`
  return `${Math.floor(s / 86400)}d ago`
}

export const tone = (n: number): 'up' | 'down' | '' => (n > 0 ? 'up' : n < 0 ? 'down' : '')

export const shortAddr = (a: string): string => (a.length > 12 ? `${a.slice(0, 4)}…${a.slice(-4)}` : a)
