// Simulated data generators used while SITE.demo is true.
// TODO(backend): replace with real indexer / mirror-engine data.
import type { Agent, FeedEvent, MirrorRow, RotationDay, Side, Trade } from './types'
import { hashString, mulberry32, pick } from './rng'

export const TOKENS = ['$NEON', '$GLOW', '$ZAP', '$DRIP', '$ORBIT', '$MOTH', '$PIXL', '$KITE', '$FERN', '$VOLT', '$HALO', '$RUNE'] as const

const B58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

export function fakeAddress(seed: string, len = 44): string {
  const r = mulberry32(hashString(seed))
  let s = ''
  for (let i = 0; i < len; i++) s += B58[Math.floor(r() * B58.length)]
  return s
}

/** Cumulative PnL % per day, ending at the agent's 30d PnL. */
export function agentSeries(agent: Agent, days = 30): number[] {
  const r = mulberry32(hashString(`${agent.id}:series`))
  const vol = 2 + Math.abs(agent.pnl30d) / 22
  const pts = [0]
  let v = 0
  for (let i = 1; i <= days; i++) {
    v += (r() - 0.47) * vol * 2
    pts.push(v)
  }
  const drift = agent.pnl30d - pts[days]
  return pts.map((p, i) => +(p + drift * (i / days)).toFixed(2))
}

export function agentTrades(agent: Agent, n: number, now: number): Trade[] {
  const r = mulberry32(hashString(`${agent.id}:trades`))
  let t = now - r() * 90_000
  const out: Trade[] = []
  for (let i = 0; i < n; i++) {
    const side: Side = r() > 0.45 ? 'BUY' : 'SELL'
    out.push({
      id: `${agent.id}-${i}`,
      time: t,
      side,
      token: pick(r, TOKENS),
      size: +(0.4 + r() * 6).toFixed(2),
      pnl: side === 'SELL' ? +((r() - 0.32) * 42).toFixed(1) : undefined,
    })
    t -= 60_000 + r() * 1_800_000
  }
  return out
}

export function makeFeedEvent(i: number, agent: string, time: number): FeedEvent {
  const r = mulberry32(hashString(`feed:${i}`))
  const agentSize = +(0.5 + r() * 7.5).toFixed(2)
  const mirrors = 40 + Math.floor(r() * 260)
  return {
    id: i,
    time,
    agent,
    side: r() > 0.42 ? 'BUY' : 'SELL',
    token: pick(r, TOKENS),
    agentSize,
    mirrors,
    copiedSol: +(agentSize * mirrors * (0.02 + r() * 0.06)).toFixed(1),
    latency: +(0.6 + r() * 1.3).toFixed(1),
  }
}

/** Hero split terminal: trade k of the #1 agent and your mirrored copy of it. */
export function makeMirrorRow(k: number, ratioPct: number, time: number): MirrorRow {
  const r = mulberry32(hashString(`mirror:${k}`))
  const side: Side = r() > 0.45 ? 'BUY' : 'SELL'
  const agentSize = +(0.8 + r() * 6).toFixed(2)
  return {
    id: k,
    time,
    side,
    token: pick(r, TOKENS),
    agentSize,
    mySize: +((agentSize * ratioPct) / 100).toFixed(2),
    latency: +(0.7 + r() * 1.0).toFixed(1),
    pnl: side === 'SELL' ? +((r() - 0.3) * 36).toFixed(1) : undefined,
  }
}

const DAY = 86_400_000
const WEEKDAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
/** Signs for the six finished days, so the example week always shows losing days too. */
const SIGNS = [1, 1, -1, 1, -1, 1]

/**
 * Illustrative 7-day rotation: which agent was #1 each day, what it won the spot with
 * (its previous 24h) and what the mirror made or lost while following it that day.
 */
export function rotationWeek(agents: Agent[], now = Date.now()): RotationDay[] {
  const today = Math.floor(now / DAY)
  const days: RotationDay[] = []
  for (let i = 6; i >= 0; i--) {
    const day = today - i
    const d = new Date(day * DAY)
    const label = `${WEEKDAY[d.getUTCDay()]} ${d.getUTCDate()}`
    if (i === 0) {
      const top = agents[0]
      days.push({ key: day, label, agentId: top.id, agentName: top.name, wonWith: top.pnl24h, mirrorPct: 2.4, today: true })
      continue
    }
    const r = mulberry32(hashString(`rotation:${day}`))
    const agent = agents[Math.floor(r() * Math.min(agents.length, 7))]
    const sign = SIGNS[(6 - i + (day % 3)) % SIGNS.length]
    const mag = sign > 0 ? 1.5 + r() * 6 : 1.5 + r() * 5
    days.push({
      key: day,
      label,
      agentId: agent.id,
      agentName: agent.name,
      wonWith: +(14 + r() * 40).toFixed(1),
      mirrorPct: +(sign * mag).toFixed(1),
    })
  }
  return days
}

/** Deterministic 0..1 uptime-ish values for status bars. */
export function uptimeDays(seed: string, days: number): number[] {
  const r = mulberry32(hashString(`uptime:${seed}`))
  return Array.from({ length: days }, () => {
    const x = r()
    return x > 0.97 ? 0.6 + r() * 0.3 : x > 0.93 ? 0.95 + r() * 0.04 : 1
  })
}
