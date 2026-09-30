import { useCountdown } from '../hooks/useCountdown'
import { duration } from '../lib/format'

export function Countdown({ prefix = 'next reset in' }: { prefix?: string }) {
  const ms = useCountdown()
  return (
    <span className="countdown">
      <span className="dot live" aria-hidden="true" />
      <span className="muted">{prefix}</span> <span className="bright num">{duration(ms)}</span>
    </span>
  )
}
