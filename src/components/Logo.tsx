interface Props {
  size?: number
}

/** Brand mark: a filled block and its outlined reflection across a dashed mirror line. */
export function LogoMark({ size = 22 }: Props) {
  return (
    <svg className="logo-mark" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" shapeRendering="crispEdges">
      <rect x="0.75" y="0.75" width="22.5" height="22.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="3" x2="12" y2="21" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 2" />
      <rect x="4.5" y="7" width="5" height="10" fill="currentColor" />
      <rect x="15.1" y="7.6" width="3.8" height="8.8" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export function Logo() {
  return (
    <span className="brand">
      <LogoMark />
      <span className="brand-word">
        mirro<span className="brand-flip">r</span>
      </span>
    </span>
  )
}
