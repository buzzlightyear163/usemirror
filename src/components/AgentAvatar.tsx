import { hashString, mulberry32 } from '../lib/rng'

/** Mirror-symmetric 5×5 identicon generated from the agent id. */
export function AgentAvatar({ id, size = 28 }: { id: string; size?: number }) {
  const r = mulberry32(hashString(id))
  const cells: [number, number][] = []
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 3; x++) {
      if (r() > 0.5) {
        cells.push([x, y])
        if (x < 2) cells.push([4 - x, y])
      }
    }
  }
  const accent = r() > 0.5
  return (
    <span className="avatar" style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 7 7" width="100%" height="100%" shapeRendering="crispEdges">
        {cells.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x + 1} y={y + 1} width="1" height="1" fill={accent ? 'var(--accent)' : 'var(--bright)'} />
        ))}
      </svg>
    </span>
  )
}
