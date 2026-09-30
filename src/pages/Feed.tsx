import { useCallback, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { FeedEvent } from '../lib/types'
import { useAgents } from '../hooks/useAgents'
import { useInterval } from '../hooks/useInterval'
import { makeFeedEvent } from '../lib/sim'
import { clock, num, sol } from '../lib/format'
import { PageHead } from '../components/Heads'
import { SimBadge } from '../components/SimBadge'
import { Countdown } from '../components/Countdown'

type Filter = 'all' | 'BUY' | 'SELL'
const MAX_ROWS = 40

export default function Feed() {
  const { agents } = useAgents()
  const top = agents?.[0]?.name ?? 'AUGUR-7'
  const counter = useRef(24)
  const [paused, setPaused] = useState(false)
  const [filter, setFilter] = useState<Filter>('all')
  const [events, setEvents] = useState<FeedEvent[]>(() => {
    const now = Date.now()
    return Array.from({ length: 24 }, (_, i) => makeFeedEvent(i, 'AUGUR-7', now - (24 - i) * 7000)).reverse()
  })

  // TODO(backend): subscribe to the mirror engine's event stream instead of simulating.
  const tick = useCallback(() => {
    const e = makeFeedEvent(counter.current++, top, Date.now())
    setEvents((prev) => [e, ...prev].slice(0, MAX_ROWS))
  }, [top])
  useInterval(tick, paused ? null : 2600)

  const rows = useMemo(() => (filter === 'all' ? events : events.filter((e) => e.side === filter)), [events, filter])
  const totalCopied = useMemo(() => events.reduce((s, e) => s + e.copiedSol, 0), [events])

  return (
    <div className="wrap">
      <PageHead
        crumbs={[{ to: '/', label: 'Home' }, { label: 'Live feed' }]}
        title="Live feed"
        lede="Every trade today's #1 makes, and how much of it was mirrored across all linked wallets. Newest first."
        actions={
          <div className="row-flex">
            <span className="pill">
              <span className={`dot ${paused ? 'off' : 'live blink'}`} aria-hidden="true" /> {paused ? 'paused' : 'streaming'}
            </span>
            <Countdown />
            <SimBadge />
          </div>
        }
      />
      <div className="toolbar">
        <div className="seg" role="group" aria-label="Filter by side">
          {(['all', 'BUY', 'SELL'] as Filter[]).map((f) => (
            <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {f === 'all' ? 'All' : f === 'BUY' ? 'Buys' : 'Sells'}
            </button>
          ))}
        </div>
        <button type="button" className="btn sm" onClick={() => setPaused((p) => !p)}>
          {paused ? 'Resume' : 'Pause'}
        </button>
        <span className="grow" />
        <span className="small muted">
          {events.length} events · <span className="bright">{sol(totalCopied, 1)}</span> copied
        </span>
      </div>
      <div className="table-wrap">
        <table className="table rows-sm feed-table">
          <thead>
            <tr>
              <th>Time (UTC)</th>
              <th>Agent</th>
              <th>Side</th>
              <th>Token</th>
              <th className="r">Agent size</th>
              <th className="r hide-sm">Mirrors</th>
              <th className="r">Copied</th>
              <th className="r hide-sm">Latency</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => (
              <tr key={e.id} className="feed-row">
                <td className="muted num">{clock(e.time)}</td>
                <td className="bright">{e.agent}</td>
                <td>
                  <span className={`side ${e.side === 'BUY' ? 'buy' : 'sell'}`}>{e.side}</span>
                </td>
                <td className="bright">{e.token}</td>
                <td className="r num">{sol(e.agentSize)}</td>
                <td className="r num hide-sm">{num(e.mirrors)}</td>
                <td className="r num accent">{sol(e.copiedSol, 1)}</td>
                <td className="r num hide-sm muted">{e.latency}s</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length === 0 ? <p className="empty">No {filter === 'BUY' ? 'buys' : 'sells'} in the last {events.length} events.</p> : null}
      <p className="notice">
        Want your wallet in this feed? <Link className="link" to="/link">Link a wallet</Link> and set your limits.
      </p>
    </div>
  )
}
