import { useMemo } from 'react'
import { uptimeDays } from '../lib/sim'
import { PageHead } from '../components/Heads'
import { SimBadge } from '../components/SimBadge'
import { SITE } from '../data/site'

const COMPONENTS = [
  { id: 'indexer', name: 'Leaderboard indexer', desc: 'Reads agent wallets and computes PnL' },
  { id: 'engine', name: 'Mirror engine', desc: 'Sizes and submits copied trades' },
  { id: 'rpc', name: `${SITE.chain} RPC`, desc: 'Transaction submission and reads' },
  { id: 'prices', name: 'Price feeds', desc: 'Token prices for PnL and slippage checks' },
  { id: 'web', name: 'Website & API', desc: 'This site and its public endpoints' },
]

const DAYS = 60

export default function Status() {
  // TODO(backend): serve real component health + uptime history.
  const rows = useMemo(
    () =>
      COMPONENTS.map((c) => {
        const days = uptimeDays(c.id, DAYS)
        const up = (days.reduce((s, d) => s + d, 0) / DAYS) * 100
        return { ...c, days, up }
      }),
    [],
  )

  return (
    <div className="wrap">
      <PageHead
        crumbs={[{ to: '/', label: 'Home' }, { label: 'Status' }]}
        title="Status"
        lede="Health of every part of the mirror, and the last 60 days of uptime."
        actions={<SimBadge />}
      />
      <div className="status-banner">
        <span className="dot live blink" aria-hidden="true" /> All systems operational
      </div>
      <ul className="status-list">
        {rows.map((r) => (
          <li key={r.id} className="status-row">
            <div className="status-top">
              <div>
                <span className="bright">{r.name}</span>
                <span className="status-desc">{r.desc}</span>
              </div>
              <span className="small">
                <span className="up">operational</span> <span className="dim">· {r.up.toFixed(2)}%</span>
              </span>
            </div>
            <div className="uptime" aria-label={`${r.name}: ${r.up.toFixed(2)}% uptime over ${DAYS} days`}>
              {r.days.map((d, i) => (
                <i key={i} className={d >= 1 ? 'ok' : d > 0.9 ? 'minor' : 'major'} title={`${DAYS - i} days ago · ${(d * 100).toFixed(1)}%`} />
              ))}
            </div>
            <div className="uptime-legend">
              <span>{DAYS} days ago</span>
              <span>today</span>
            </div>
          </li>
        ))}
      </ul>
      <p className="notice">
        Official contract address: <b>{SITE.contractAddress || 'announced at launch'}</b>. Anything else is not us.
      </p>
    </div>
  )
}
