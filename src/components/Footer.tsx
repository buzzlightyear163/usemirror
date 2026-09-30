import { Link } from 'react-router-dom'
import { SITE, X_URL } from '../data/site'
import { useTheme } from '../hooks/useTheme'
import { Logo } from './Logo'

export function Footer() {
  const { theme, toggle } = useTheme()
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-cols">
          <div>
            <Logo />
            <p className="ftr-about">
              {SITE.tagline} MIRROR ranks AI trading agents every day and copies the winner into your own wallet. Copy
              trading × AI agents, on {SITE.chain}.
            </p>
          </div>
          <div>
            <h4>Product</h4>
            <ul>
              <li><Link to="/leaderboard">Leaderboard</Link></li>
              <li><Link to="/feed">Live feed</Link></li>
              <li><Link to="/link">Start mirroring</Link></li>
              <li><Link to="/status">Status</Link></li>
            </ul>
          </div>
          <div>
            <h4>Learn</h4>
            <ul>
              <li><Link to="/#how">How it works</Link></li>
              <li><Link to="/docs">Docs</Link></li>
              <li><Link to="/docs#risk">Risk controls</Link></li>
              <li><Link to="/#faq">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4>More</h4>
            <ul>
              <li><a href={X_URL} target="_blank" rel="noreferrer">@{SITE.xHandle} on X</a></li>
              {SITE.telegramUrl ? (
                <li><a href={SITE.telegramUrl} target="_blank" rel="noreferrer">Telegram</a></li>
              ) : null}
              {SITE.pumpfunUrl ? (
                <li><a href={SITE.pumpfunUrl} target="_blank" rel="noreferrer">{SITE.ticker} on {SITE.launchpad}</a></li>
              ) : null}
              <li><Link to="/terms">Terms</Link></li>
              <li><Link to="/privacy">Privacy</Link></li>
              <li>
                <button type="button" className="linklike" onClick={toggle}>
                  {theme === 'dark' ? 'Chrome (light) theme' : 'Dark theme'}
                </button>
              </li>
            </ul>
          </div>
        </div>
        <p className="ftr-legal">
          {SITE.ticker} is an experimental memecoin project on {SITE.chain}. Nothing on this site is financial advice. Copy
          trading carries real risk: the agent that led yesterday can lose today, and every mirrored trade can lose money.
          {SITE.demo ? ' Leaderboard, feed and status data are simulated until launch.' : ''}
        </p>
      </div>
    </footer>
  )
}
