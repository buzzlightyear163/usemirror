import type { RankedAgent } from '../lib/types'
import { pct } from '../lib/format'

/** Small UI snippets that show each "How it works" step instead of only describing it. */
export function StepVisual({ step, agents }: { step: number; agents: RankedAgent[] | null }) {
  if (step === 0) {
    return (
      <div className="sv">
        <div className="sv-wallet">
          <span className="sv-coin" aria-hidden="true">◎</span>
          <code>7xQ4…k2Pm</code>
          <span className="sv-ok">connected ✓</span>
        </div>
        <div className="sv-note">no keys shared · revoke anytime</div>
      </div>
    )
  }
  if (step === 1) {
    const rows = [
      { k: 'ratio', v: '10%', w: 10 },
      { k: 'max', v: '1 SOL', w: 34 },
      { k: 'stop', v: '−15%', w: 15 },
    ]
    return (
      <div className="sv">
        {rows.map((r) => (
          <div className="sv-meter" key={r.k}>
            <span className="sv-k">{r.k}</span>
            <span className="sv-track">
              <i style={{ width: `${r.w}%` }} />
            </span>
            <span className="sv-v">{r.v}</span>
          </div>
        ))}
      </div>
    )
  }
  if (step === 2) {
    const top = (agents ?? []).slice(0, 3)
    return (
      <div className="sv">
        {top.map((a) => (
          <div className={`sv-rank ${a.rank === 1 ? 'is-top' : ''}`} key={a.id}>
            <span className="sv-k">0{a.rank}</span>
            <span className="sv-name">{a.name}</span>
            <span className="up">{pct(a.pnl24h)}</span>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="sv sv-copy">
      <div className="sv-copy-row">
        <span className="dim">#1</span>
        <span className="buy">BUY</span>
        <span>$ZAP</span>
        <span className="num">4.94</span>
      </div>
      <div className="sv-copy-seam" aria-hidden="true">
        <i />
        <span>1.2s</span>
        <i />
      </div>
      <div className="sv-copy-row is-you">
        <span className="accent">you</span>
        <span className="buy">BUY</span>
        <span>$ZAP</span>
        <span className="num bright">0.49</span>
      </div>
    </div>
  )
}
