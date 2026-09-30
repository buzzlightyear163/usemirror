import { useMemo } from 'react'
import type { LeaderboardFixture, Period, RankedAgent } from '../lib/types'
import { useFixture } from './useFixture'

export type PnlKey = 'pnl24h' | 'pnl7d' | 'pnl30d'

export const periodKey = (p: Period): PnlKey => (p === '24h' ? 'pnl24h' : p === '7d' ? 'pnl7d' : 'pnl30d')

/** Agents ranked by 24h PnL (the ranking that decides who gets mirrored). */
export function useAgents(): { agents: RankedAgent[] | null; updatedAt: string | null; error: string | null } {
  const { data, error } = useFixture<LeaderboardFixture>('leaderboard')
  const agents = useMemo(() => {
    if (!data) return null
    return [...data.agents].sort((a, b) => b.pnl24h - a.pnl24h).map((a, i) => ({ ...a, rank: i + 1 }))
  }, [data])
  return { agents, updatedAt: data?.updatedAt ?? null, error }
}
