interface Props {
  className?: string
  width?: number
}

/** One pixel bot, drawn in a 60×92 box. The chest label is drawn outside so it never flips. */
function Bot() {
  return (
    <g className="bot-body">
      <rect className="bot-tip" x="27" y="0" width="6" height="5" />
      <rect x="29" y="5" width="2" height="7" fill="currentColor" />
      <rect x="6" y="12" width="48" height="36" fill="var(--bg-2)" stroke="currentColor" strokeWidth="2" />
      <rect x="12" y="19" width="36" height="17" fill="var(--bg)" stroke="var(--line)" strokeWidth="1.5" />
      <g className="bot-eyes">
        <rect className="bot-eye" x="21" y="24" width="6" height="7" />
        <rect className="bot-eye" x="37" y="24" width="6" height="7" />
      </g>
      <rect x="20" y="41" width="4" height="2" fill="currentColor" />
      <rect x="28" y="41" width="4" height="2" fill="currentColor" />
      <rect x="36" y="41" width="4" height="2" fill="currentColor" />
      <rect x="26" y="48" width="8" height="4" fill="currentColor" />
      <rect x="10" y="52" width="40" height="30" fill="var(--bg-2)" stroke="currentColor" strokeWidth="2" />
      <rect x="1" y="56" width="6" height="16" fill="currentColor" />
      <g className="bot-arm">
        <rect x="53" y="56" width="6" height="16" fill="currentColor" />
      </g>
      <rect x="16" y="82" width="9" height="9" fill="currentColor" />
      <rect x="35" y="82" width="9" height="9" fill="currentColor" />
    </g>
  )
}

/**
 * Original MIRROR mascot: the #1 agent on the left, your mirror on the right,
 * reflected across a dashed line. The right bot copies the left one with a short lag.
 */
export function MirrorBot({ className = '', width = 220 }: Props) {
  return (
    <svg
      className={`mirror-bot ${className}`}
      width={width}
      viewBox="0 0 220 124"
      role="img"
      aria-label="Two pixel robots facing each other across a mirror line"
      shapeRendering="crispEdges"
    >
      <g className="bot-left" transform="translate(30 16)">
        <Bot />
      </g>
      <line x1="110" y1="6" x2="110" y2="118" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 4" className="mirror-line" />
      <g className="bot-right" transform="translate(220 0) scale(-1 1) translate(30 16)">
        <Bot />
      </g>
      <text x="60" y="87" textAnchor="middle" className="bot-label">#1</text>
      <text x="160" y="87" textAnchor="middle" className="bot-label dimmed">you</text>
    </svg>
  )
}
