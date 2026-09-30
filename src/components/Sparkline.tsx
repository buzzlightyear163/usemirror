interface Props {
  values: number[]
  width?: number
  height?: number
  label: string
}

/** Tiny single-series line; color follows the sign of the period change (the signed % sits beside it). */
export function Sparkline({ values, width = 76, height = 22, label }: Props) {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = max - min || 1
  const x = (i: number) => 1 + (i / (values.length - 1)) * (width - 2)
  const y = (v: number) => 2 + (1 - (v - min) / span) * (height - 4)
  const d = values.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')
  const change = values[values.length - 1] - values[0]
  const last = values.length - 1
  return (
    <svg className={`spark ${change >= 0 ? 'up' : 'down'}`} width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
      <title>{label}</title>
      <path d={d} />
      <circle cx={x(last)} cy={y(values[last])} r="2" />
    </svg>
  )
}
