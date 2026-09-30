import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Agent, MirrorRow } from '../lib/types'
import { clock, pct } from '../lib/format'
import { makeMirrorRow } from '../lib/sim'
import { useInterval } from '../hooks/useInterval'
import { RESET_LABEL, SITE } from '../data/site'

const RATIO = 10
const VISIBLE = 6

interface Row extends MirrorRow {
  copied: boolean
}

interface Props {
  agent: Agent
}

/**
 * Hero panel, split down the middle: the #1 agent trades on the left,
 * your mirror copies it on the right a moment later. Simulated while SITE.demo is true.
 */
export function Terminal({ agent }: Props) {
  const start = useMemo(() => Date.now(), [])
  const next = useRef(VISIBLE)
  const timers = useRef<number[]>([])
  const [rows, setRows] = useState<Row[]>(() =>
    Array.from({ length: VISIBLE }, (_, k) => ({ ...makeMirrorRow(k, RATIO, start - (VISIBLE - k) * 2400), copied: true })),
  )
  const [copies, setCopies] = useState(VISIBLE)

  const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  const tick = useCallback(() => {
    const k = next.current++
    const row: Row = { ...makeMirrorRow(k, RATIO, Date.now()), copied: false }
    setRows((prev) => [...prev, row].slice(-VISIBLE))
    const t = window.setTimeout(() => {
      setRows((prev) => prev.map((r) => (r.id === k ? { ...r, copied: true } : r)))
      setCopies((c) => c + 1)
    }, 350 + row.latency * 300)
    timers.current.push(t)
  }, [])

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), [])
  useInterval(tick, reduced ? null : 2400)

  return (
    <div className="term hud">
      <div className="term-head">
        <span className="term-dots" aria-hidden="true">
          <i /> <i /> <i />
        </span>
        <span>mirror.log</span>
        <span className="grow" />
        <span className="term-live">
          <span className="dot live blink" aria-hidden="true" /> live{SITE.demo ? ' · sim' : ''}
        </span>
      </div>

      <div className="term-sys">
        <span className="dim">{RESET_LABEL}</span> rotation · #1 → <b>{agent.name}</b>{' '}
        <span className="up">{pct(agent.pnl24h)} 24h</span>
      </div>

      <div className="split-head">
        <span>
          <span className="dim">#1</span> <b>{agent.name}</b>
        </span>
        <span className="seam-cap" aria-hidden="true" />
        <span className="r">
          <b className="accent">YOU</b> <span className="dim">× {RATIO}%</span>
        </span>
      </div>

      <div className="split-body" role="log" aria-live="off" aria-label="The #1 agent's trades and your mirrored copies">
        {rows.map((r) => (
          <div key={r.id} className={`mrow ${r.copied ? 'is-copied' : 'is-pending'}`}>
            <span className="m-agent">
              <span className="m-time">{clock(r.time)}</span>
              <span className={`m-side ${r.side === 'BUY' ? 'buy' : 'sell'}`}>{r.side}</span>
              <span className="m-token">{r.token}</span>
              <span className="m-size num">{r.agentSize.toFixed(2)}</span>
            </span>
            <span className="m-seam" aria-hidden="true">
              <i />
            </span>
            <span className="m-you">
              {r.copied ? (
                <>
                  <span className="m-size num bright">{r.mySize.toFixed(2)}</span>
                  <span className="m-token">{r.token}</span>
                  <span className={`m-side ${r.side === 'BUY' ? 'buy' : 'sell'}`}>{r.side}</span>
                  <span className={`m-tail ${r.pnl === undefined ? '' : r.pnl >= 0 ? 'up' : 'down'}`}>
                    {r.pnl === undefined ? `✓ ${r.latency}s` : pct(r.pnl)}
                  </span>
                </>
              ) : (
                <span className="m-pending">copying…</span>
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="term-foot">
        <span>
          copied <b className="num">{copies}</b> trades
        </span>
        <span>
          sizes in <b>SOL</b>
        </span>
        <span>
          daily stop <b>−15%</b>
        </span>
      </div>
    </div>
  )
}
