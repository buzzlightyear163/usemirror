import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { SITE } from '../data/site'
import { shortAddr } from '../lib/format'
import { CopyButton } from './CopyButton'
import { Logo } from './Logo'

const NAV = [
  { to: '/#how', label: 'How it works', hash: true },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/feed', label: 'Live feed' },
  { to: '/docs', label: 'Docs' },
]

function ContractChip() {
  const ca = SITE.contractAddress
  return (
    <span className="ca">
      <span className="dim">CA</span>
      {ca ? <CopyButton text={ca} label={shortAddr(ca)} className="ca-btn" /> : <span className="muted">soon</span>}
    </span>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => setOpen(false), [pathname, hash])

  return (
    <header className="hdr">
      <div className="wrap hdr-in">
        <Link to="/" className="brand-link" aria-label={`${SITE.name} home`}>
          <Logo />
        </Link>
        <nav className="nav" aria-label="Main">
          {NAV.map((n) =>
            n.hash ? (
              <Link key={n.to} to={n.to}>
                {n.label}
              </Link>
            ) : (
              <NavLink key={n.to} to={n.to} className={({ isActive }) => (isActive ? 'active' : undefined)}>
                {n.label}
              </NavLink>
            ),
          )}
        </nav>
        <span className="grow" />
        <Link to="/status" className="pill hide-md">
          <span className="dot live" aria-hidden="true" /> engine online
        </Link>
        <span className="hide-md">
          <ContractChip />
        </span>
        <Link to="/link" className="btn primary sm hide-sm">
          Start mirroring
        </Link>
        <button
          type="button"
          className="btn sm menu-btn"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      <div id="mobile-nav" className={`mnav ${open ? 'open' : ''}`}>
        {NAV.map((n) => (
          <Link key={n.to} to={n.to}>
            {n.label}
          </Link>
        ))}
        <Link to="/status">Status</Link>
        <Link to="/link" className="bright">
          Start mirroring →
        </Link>
        <div className="mnav-ca">
          <ContractChip />
        </div>
      </div>
    </header>
  )
}
