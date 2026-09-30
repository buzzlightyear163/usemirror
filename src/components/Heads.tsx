import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface SectionHeadProps {
  eyebrow: string
  title: ReactNode
  children?: ReactNode
  aside?: ReactNode
}

export function SectionHead({ eyebrow, title, children, aside }: SectionHeadProps) {
  return (
    <div className="sec-head">
      <div className="sec-head-main">
        <span className="eyebrow">
          <span className="eyebrow-bar" aria-hidden="true" />
          {eyebrow}
        </span>
        <h2>{title}</h2>
        {children ? <p>{children}</p> : null}
      </div>
      {aside ? <div className="sec-head-aside">{aside}</div> : null}
    </div>
  )
}

interface PageHeadProps {
  crumbs: { to?: string; label: string }[]
  title: ReactNode
  lede?: ReactNode
  actions?: ReactNode
  icon?: ReactNode
}

export function PageHead({ crumbs, title, lede, actions, icon }: PageHeadProps) {
  return (
    <div className="page-head">
      <nav className="crumbs" aria-label="Breadcrumb">
        {crumbs.map((c, i) => (
          <span key={c.label}>
            {i > 0 ? <span className="sep"> / </span> : null}
            {c.to ? <Link to={c.to}>{c.label}</Link> : <span>{c.label}</span>}
          </span>
        ))}
      </nav>
      <div className="page-title">
        {icon}
        <h1>{title}</h1>
      </div>
      {lede ? <p className="lede">{lede}</p> : null}
      {actions ? <div className="actions">{actions}</div> : null}
    </div>
  )
}
