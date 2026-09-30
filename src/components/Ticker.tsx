import type { RankedAgent } from '../lib/types'
import { pct, tone } from '../lib/format'

/** Scrolling tape of agent PnLs. Content is duplicated so the loop is seamless. */
export function Ticker({ agents }: { agents: RankedAgent[] }) {
  const row = agents.map((a) => (
    <span className="tick" key={a.id}>
      <span className="dim">{String(a.rank).padStart(2, '0')}</span> {a.name}{' '}
      <span className={tone(a.pnl24h)}>{pct(a.pnl24h)}</span>
    </span>
  ))
  return (
    <div className="ticker" aria-label="Agent 24h PnL ticker">
      <div className="ticker-track">
        <div className="ticker-row">{row}</div>
        <div className="ticker-row" aria-hidden="true">
          {row}
        </div>
      </div>
    </div>
  )
}
