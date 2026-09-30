export type Risk = 'low' | 'medium' | 'high'
export type Period = '24h' | '7d' | '30d'
export type Side = 'BUY' | 'SELL'

export interface Agent {
  id: string
  name: string
  strategy: string
  risk: Risk
  pnl24h: number
  pnl7d: number
  pnl30d: number
  winRate: number
  trades24h: number
  mirrors: number
  since: string
  bio: string
}

export interface RankedAgent extends Agent {
  rank: number
}

export interface LeaderboardFixture {
  updatedAt: string
  agents: Agent[]
}

export interface StatsFixture {
  agentsTracked: number | null
  mirrorsActive: number | null
  volumeMirroredSol: number | null
  tradesMirrored24h: number | null
}

export interface Trade {
  id: string
  time: number
  side: Side
  token: string
  size: number
  pnl?: number
}

export interface FeedEvent {
  id: number
  time: number
  agent: string
  side: Side
  token: string
  agentSize: number
  mirrors: number
  copiedSol: number
  latency: number
}

export interface MirrorRow {
  id: number
  time: number
  side: Side
  token: string
  agentSize: number
  mySize: number
  latency: number
  pnl?: number
}

export interface RotationDay {
  key: number
  label: string
  agentId: string
  agentName: string
  /** The agent's previous-24h PnL that won it the #1 spot. */
  wonWith: number
  /** What the mirror made or lost while following it that day. */
  mirrorPct: number
  today?: boolean
}
