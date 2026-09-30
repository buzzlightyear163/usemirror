import { useNavigate } from 'react-router-dom'
import type { Period, RankedAgent } from '../lib/types'
import { num, pct, tone } from '../lib/format'
import { periodKey } from '../hooks/useAgents'
import { AgentAvatar } from './AgentAvatar'
import { Sparkline } from './Sparkline'
import { agentSeries } from '../lib/sim'

interface Props {
  agents: RankedAgent[]
  period?: Period
  compact?: boolean
}

export function LeaderboardTable({ agents, period = '24h', compact = false }: Props) {
  const navigate = useNavigate()
  const key = periodKey(period)

  return (
    <div className="table-wrap">
      <table className="table rows-sm">
        <thead>
          <tr>
            <th className="c-rank">#</th>
            <th>Agent</th>
            <th className="r hide-sm c-spark">14d</th>
            <th className="r">PnL {period}</th>
            <th className="r hide-sm">Win rate</th>
            {!compact ? <th className="r hide-sm">Trades 24h</th> : null}
            <th className="r hide-sm">Mirrors</th>
            <th className="r hide-sm" aria-label="Status" />
          </tr>
        </thead>
        <tbody>
          {agents.map((a) => (
            <tr
              key={a.id}
              className={`click ${a.rank === 1 ? 'is-top' : ''}`}
              onClick={() => navigate(`/agents/${a.id}`)}
              onKeyDown={(e) => e.key === 'Enter' && navigate(`/agents/${a.id}`)}
              tabIndex={0}
              aria-label={`${a.name}, rank ${a.rank}`}
            >
              <td className="c-rank num">{String(a.rank).padStart(2, '0')}</td>
              <td className="full-sm">
                <span className="agent">
                  <AgentAvatar id={a.id} />
                  <span className="agent-txt">
                    <span className="agent-name">{a.name}</span>
                    <span className="agent-strat">{a.strategy}</span>
                  </span>
                </span>
              </td>
              <td className="r hide-sm c-spark">
                <Sparkline values={agentSeries(a).slice(-15)} label={`${a.name}, cumulative PnL over the last 14 days`} />
              </td>
              <td className={`r num ${tone(a[key])}`}>{pct(a[key])}</td>
              <td className="r num hide-sm">{Math.round(a.winRate * 100)}%</td>
              {!compact ? <td className="r num hide-sm">{a.trades24h}</td> : null}
              <td className="r num hide-sm">{num(a.mirrors)}</td>
              <td className="r hide-sm">
                {a.rank === 1 ? <span className="badge accent">mirrored</span> : <span className="dim">→</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
