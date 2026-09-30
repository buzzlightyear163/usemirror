import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAgents } from '../hooks/useAgents'
import { agentSeries, agentTrades } from '../lib/sim'
import { ago, num, pct, sol, tone } from '../lib/format'
import { PageHead } from '../components/Heads'
import { AgentAvatar } from '../components/AgentAvatar'
import { PnlChart } from '../components/PnlChart'
import { SimBadge } from '../components/SimBadge'
import { Countdown } from '../components/Countdown'
import NotFound from './NotFound'

export default function AgentPage() {
  const { id = '' } = useParams()
  const { agents } = useAgents()
  const agent = agents?.find((a) => a.id === id) ?? null
  const now = useMemo(() => Date.now(), [])
  const series = useMemo(() => (agent ? agentSeries(agent) : []), [agent])
  const trades = useMemo(() => (agent ? agentTrades(agent, 10, now) : []), [agent, now])

  if (!agents) {
    return (
      <div className="wrap">
        <p className="empty">Loading agent…</p>
      </div>
    )
  }
  if (!agent) return <NotFound what={`agent “${id}”`} />

  const isTop = agent.rank === 1

  return (
    <div className="wrap">
      <PageHead
        crumbs={[{ to: '/', label: 'Home' }, { to: '/leaderboard', label: 'Leaderboard' }, { label: agent.name }]}
        icon={<AgentAvatar id={agent.id} size={40} />}
        title={agent.name}
        lede={agent.bio}
        actions={
          <div className="row-flex">
            <span className="badge">#{agent.rank} today</span>
            <span className="badge soft">{agent.strategy}</span>
            <span className="badge soft">risk: {agent.risk}</span>
            {isTop ? <span className="badge accent">currently mirrored</span> : null}
            <SimBadge />
          </div>
        }
      />

      <div className="grid split-main">
        <div className="stack">
          <div className="card">
            <div className="card-head">
              <h3>PnL · 30 days</h3>
              <span className={`num ${tone(agent.pnl30d)}`}>{pct(agent.pnl30d)}</span>
            </div>
            <PnlChart series={series} />
          </div>

          <div className="card">
            <div className="card-head">
              <h3>Recent trades</h3>
              <span className="small muted">{isTop ? 'being mirrored' : 'not mirrored'}</span>
            </div>
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>When</th>
                    <th>Side</th>
                    <th>Token</th>
                    <th className="r">Size</th>
                    <th className="r">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {trades.map((t) => (
                    <tr key={t.id}>
                      <td className="muted">{ago(t.time, now)}</td>
                      <td>
                        <span className={`side ${t.side === 'BUY' ? 'buy' : 'sell'}`}>{t.side}</span>
                      </td>
                      <td className="bright">{t.token}</td>
                      <td className="r num">{sol(t.size)}</td>
                      <td className={`r num ${t.pnl !== undefined ? tone(t.pnl) : 'dim'}`}>
                        {t.pnl !== undefined ? pct(t.pnl) : 'open'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <aside className="stack">
          <div className="card">
            <dl className="kv">
              <dt>Rank (24h)</dt>
              <dd className="bright">#{agent.rank}</dd>
              <dt>PnL 24h</dt>
              <dd className={tone(agent.pnl24h)}>{pct(agent.pnl24h)}</dd>
              <dt>PnL 7d</dt>
              <dd className={tone(agent.pnl7d)}>{pct(agent.pnl7d)}</dd>
              <dt>PnL 30d</dt>
              <dd className={tone(agent.pnl30d)}>{pct(agent.pnl30d)}</dd>
              <dt>Win rate</dt>
              <dd>{Math.round(agent.winRate * 100)}%</dd>
              <dt>Trades 24h</dt>
              <dd>{agent.trades24h}</dd>
              <dt>Mirrors</dt>
              <dd>{num(agent.mirrors)}</dd>
              <dt>Active since</dt>
              <dd>{agent.since}</dd>
            </dl>
          </div>
          <div className="notice">
            {isTop ? (
              <>
                <b>{agent.name} is today's #1.</b> Every active mirror is copying its trades until the next reset.
              </>
            ) : (
              <>
                You can't follow <b>{agent.name}</b> directly — MIRROR always copies the 24h #1. If it tops the board at
                the next reset, your mirror switches to it automatically.
              </>
            )}
          </div>
          <Countdown />
          <div className="actions">
            <Link to="/link" className="btn primary">
              Start mirroring
            </Link>
            <Link to="/leaderboard" className="btn">
              ← Leaderboard
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
