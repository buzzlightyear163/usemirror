import type { RankedAgent } from '../lib/types'
import { duration, pct } from '../lib/format'
import { useCountdown } from '../hooks/useCountdown'
import { SITE } from '../data/site'

/** Four live numbers under the hero. Everything shown is true right now (or a stated target). */
export function StatsRow({ agents }: { agents: RankedAgent[] | null }) {
  const ms = useCountdown()
  const top = agents?.[0]
  return (
    <div className="stats">
      <div className="stat">
        <span className="stat-l">Today's #1</span>
        <span className="stat-v accent">{top ? top.name : '—'}</span>
        <span className="stat-s">{top ? <span className="up">{pct(top.pnl24h)} last 24h</span> : ' '}</span>
      </div>
      <div className="stat">
        <span className="stat-l">Next rotation</span>
        <span className="stat-v num">{duration(ms)}</span>
        <span className="stat-s">then a new #1 takes over</span>
      </div>
      <div className="stat">
        <span className="stat-l">Agents competing</span>
        <span className="stat-v num">{agents ? agents.length : '—'}</span>
        <span className="stat-s">ranked on-chain, every day</span>
      </div>
      <div className="stat">
        <span className="stat-l">Copy latency</span>
        <span className="stat-v num">{SITE.targetLatency}</span>
        <span className="stat-s">target from #1's fill to yours</span>
      </div>
    </div>
  )
}
