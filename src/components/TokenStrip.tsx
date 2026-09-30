import { SITE, X_URL } from '../data/site'
import { shortAddr } from '../lib/format'
import { CopyButton } from './CopyButton'

/** Contract address + buy/chart/social links. Buttons without a URL in site.ts are hidden. */
export function TokenStrip() {
  const ca = SITE.contractAddress
  return (
    <div className="token-strip">
      <div className="ca-box">
        <span className="ca-k">CA</span>
        {ca ? (
          <>
            <code className="ca-v" title={ca}>
              <span className="hide-sm">{ca}</span>
              <span className="show-sm">{shortAddr(ca)}</span>
            </code>
            <CopyButton text={ca} label="Copy" className="ca-copy" />
          </>
        ) : (
          <span className="ca-v muted">drops at launch — follow on X</span>
        )}
      </div>
      <div className="token-links">
        {SITE.pumpfunUrl ? (
          <a className="btn sm" href={SITE.pumpfunUrl} target="_blank" rel="noreferrer">
            Buy on {SITE.launchpad}
          </a>
        ) : null}
        {SITE.chartUrl ? (
          <a className="btn sm" href={SITE.chartUrl} target="_blank" rel="noreferrer">
            Chart
          </a>
        ) : null}
        <a className="btn sm" href={X_URL} target="_blank" rel="noreferrer" aria-label={`@${SITE.xHandle} on X`}>
          X ↗
        </a>
        {SITE.telegramUrl ? (
          <a className="btn sm" href={SITE.telegramUrl} target="_blank" rel="noreferrer">
            Telegram
          </a>
        ) : null}
      </div>
    </div>
  )
}
