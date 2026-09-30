import { useEffect, useState } from 'react'
import { SITE } from '../data/site'

export function msToNextReset(now = Date.now(), hourUtc: number = SITE.resetHourUtc): number {
  const d = new Date(now)
  const today = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), hourUtc)
  return today > now ? today - now : today + 86_400_000 - now
}

/** Milliseconds until the next daily leaderboard reset, ticking every second. */
export function useCountdown(): number {
  const [ms, setMs] = useState(() => msToNextReset())
  useEffect(() => {
    const id = window.setInterval(() => setMs(msToNextReset()), 1000)
    return () => window.clearInterval(id)
  }, [])
  return ms
}
