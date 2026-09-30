import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import type { RankedAgent } from '../lib/types'
import { pct, tone } from '../lib/format'
import { rotationWeek } from '../lib/sim'
import { AgentAvatar } from './AgentAvatar'

/** Illustrative week of daily rotations, losing days included. */
export function Rotation({ agents }: { agents: RankedAgent[] }) {
  const days = useMemo(() => rotationWeek(agents), [agents])
  const done = days.filter((d) => !d.today)
  const green = done.filter((d) => d.mirrorPct >= 0).length
  const net = (done.reduce((acc, d) => acc * (1 + d.mirrorPct / 100), 1) - 1) * 100
  const maxAbs = Math.max(...days.map((d) => Math.abs(d.mirrorPct)), 1)

  return (
    <>
      <ol className="rot">
        {days.map((d) => (
          <li key={d.key} className={`rot-day ${d.today ? 'is-today' : ''}`}>
            <span className="rot-date">{d.today ? 'today' : d.label}</span>
            <Link to={`/agents/${d.agentId}`} className="rot-agent">
              <AgentAvatar id={d.agentId} size={22} />
              <span>{d.agentName}</span>
            </Link>
            <span className="rot-won">
              won #1 with <span className="up">{pct(d.wonWith)}</span>
            </span>
            <span className="rot-bar" aria-hidden="true">
              <i className={d.mirrorPct >= 0 ? 'pos' : 'neg'} style={{ height: `${(Math.abs(d.mirrorPct) / maxAbs) * 100}%` }} />
            </span>
            <span className={`rot-res num ${tone(d.mirrorPct)}`}>
              {pct(d.mirrorPct)}
              <span className="rot-res-l">{d.today ? 'so far' : 'mirror day'}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="rot-sum">
        Last 6 finished days: <b>{green} green</b> · <b>{done.length - green} red</b> · net{' '}
        <b className={tone(net)}>{pct(net)}</b>. The spot is won on <i>yesterday's</i> PnL — the mirror earns or loses on
        <i> today's</i>. That gap is the risk.
      </p>
    </>
  )
}
