import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, PointerEvent } from 'react'
import { pct } from '../lib/format'

interface Props {
  series: number[]
  label?: string
}

const H = 220
const PAD = { t: 12, r: 12, b: 24, l: 44 }

/** Responsive SVG line chart of cumulative PnL % with hover/keyboard readout. */
export function PnlChart({ series, label = 'Cumulative PnL, last 30 days' }: Props) {
  const box = useRef<HTMLDivElement>(null)
  const [w, setW] = useState(600)
  const [hover, setHover] = useState<number | null>(null)

  useEffect(() => {
    const el = box.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setW(Math.max(260, Math.floor(e.contentRect.width))))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const min = Math.min(0, ...series)
  const max = Math.max(0, ...series)
  const span = max - min || 1
  const x = (i: number) => PAD.l + (i / (series.length - 1)) * (w - PAD.l - PAD.r)
  const y = (v: number) => PAD.t + (1 - (v - min) / span) * (H - PAD.t - PAD.b)
  const d = series.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')
  const area = `${d} L${x(series.length - 1).toFixed(1)},${y(0).toFixed(1)} L${x(0).toFixed(1)},${y(0).toFixed(1)} Z`
  const ticks = [max, (max + min) / 2, min]
  const last = series[series.length - 1]
  const idx = hover ?? series.length - 1

  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = e.clientX - rect.left
    const i = Math.round(((px - PAD.l) / (w - PAD.l - PAD.r)) * (series.length - 1))
    setHover(Math.min(series.length - 1, Math.max(0, i)))
  }

  const onKey = (e: KeyboardEvent<SVGSVGElement>) => {
    if (e.key === 'ArrowLeft') setHover((h) => Math.max(0, (h ?? series.length - 1) - 1))
    if (e.key === 'ArrowRight') setHover((h) => Math.min(series.length - 1, (h ?? series.length - 1) + 1))
  }

  return (
    <div ref={box}>
      <svg
        className={`chart ${last >= 0 ? 'up' : 'down'}`}
        width={w}
        height={H}
        viewBox={`0 0 ${w} ${H}`}
        onPointerMove={onMove}
        onPointerLeave={() => setHover(null)}
        onKeyDown={onKey}
        tabIndex={0}
        role="img"
        aria-label={`${label}. Ends at ${pct(last)}.`}
      >
        {ticks.map((t) => (
          <g key={t}>
            <line className="grid-l" x1={PAD.l} x2={w - PAD.r} y1={y(t)} y2={y(t)} />
            <text x={PAD.l - 8} y={y(t) + 3} textAnchor="end">
              {pct(t, 0)}
            </text>
          </g>
        ))}
        <line className="zero" x1={PAD.l} x2={w - PAD.r} y1={y(0)} y2={y(0)} />
        <path className="area" d={area} />
        <path className="line" d={d} />
        <text x={PAD.l} y={H - 6}>30d ago</text>
        <text x={w - PAD.r} y={H - 6} textAnchor="end">today</text>
        <line className="hair" x1={x(idx)} x2={x(idx)} y1={PAD.t} y2={H - PAD.b} />
        <rect className="pt" x={x(idx) - 3} y={y(series[idx]) - 3} width="6" height="6" />
      </svg>
      <p className="chart-read">
        Day {idx - series.length + 1 === 0 ? '0 (today)' : idx - series.length + 1} ·{' '}
        <span className={series[idx] >= 0 ? 'up' : 'down'}>{pct(series[idx])}</span>
      </p>
    </div>
  )
}
