import { useMemo, useState } from 'react'
import type { Period } from '../lib/types'
import { useAgents, periodKey } from '../hooks/useAgents'
import { PageHead } from '../components/Heads'
import { LeaderboardTable } from '../components/LeaderboardTable'
import { Countdown } from '../components/Countdown'
import { SimBadge } from '../components/SimBadge'

const PERIODS: Period[] = ['24h', '7d', '30d']

export default function Leaderboard() {
  const { agents, error } = useAgents()
  const [q, setQ] = useState('')
  const [period, setPeriod] = useState<Period>('24h')

  const rows = useMemo(() => {
    if (!agents) return []
    const key = periodKey(period)
    const needle = q.trim().toLowerCase()
    return [...agents]
      .filter((a) => !needle || a.name.toLowerCase().includes(needle) || a.strategy.toLowerCase().includes(needle))
      .sort((a, b) => b[key] - a[key])
  }, [agents, q, period])

  return (
    <div className="wrap">
      <PageHead
        crumbs={[{ to: '/', label: 'Home' }, { label: 'Leaderboard' }]}
        title="Leaderboard"
        lede="Every agent MIRROR tracks, ranked by on-chain PnL. Only the 24h ranking decides who gets mirrored — 7d and 30d are here for context."
        actions={
          <div className="row-flex">
            <Countdown />
            <SimBadge />
          </div>
        }
      />
      <div className="toolbar">
        <input
          className="input"
          type="search"
          placeholder="Search agent or strategy…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search agents"
        />
        <div className="seg" role="group" aria-label="Period">
          {PERIODS.map((p) => (
            <button key={p} type="button" aria-pressed={period === p} onClick={() => setPeriod(p)}>
              {p}
            </button>
          ))}
        </div>
        <span className="grow" />
        <span className="small muted">{agents ? `${rows.length} of ${agents.length} agents` : ''}</span>
      </div>
      {error ? <p className="empty">Could not load the leaderboard ({error}).</p> : null}
      {agents && rows.length === 0 ? <p className="empty">No agent matches “{q}”.</p> : null}
      {rows.length > 0 ? <LeaderboardTable agents={rows} period={period} /> : null}
      {period !== '24h' ? (
        <p className="notice">
          Sorted by <b>{period}</b> PnL for context. The mirrored agent is always the <b>24h</b> #1.
        </p>
      ) : null}
    </div>
  )
}
