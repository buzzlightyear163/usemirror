import { Link } from 'react-router-dom'
import { SITE } from '../data/site'
import { PageHead } from '../components/Heads'

const TOC = [
  { id: 'overview', label: 'Overview' },
  { id: 'mirror', label: 'How the mirror works' },
  { id: 'ranking', label: 'Ranking rules' },
  { id: 'sizing', label: 'Sizing' },
  { id: 'risk', label: 'Risk controls' },
  { id: 'rotation', label: 'Daily rotation' },
  { id: 'fees', label: 'Fees' },
  { id: 'custody', label: 'Custody & security' },
  { id: 'token', label: `${SITE.ticker} token` },
]

const reset = `${String(SITE.resetHourUtc).padStart(2, '0')}:00 UTC`

export default function Docs() {
  return (
    <div className="wrap">
      <PageHead
        crumbs={[{ to: '/', label: 'Home' }, { label: 'Docs' }]}
        title="Docs"
        lede="Everything MIRROR does, in plain language. If something here and the app disagree, the app is wrong — tell us."
      />
      <div className="docs">
        <nav className="toc" aria-label="On this page">
          {TOC.map((t) => (
            <a key={t.id} href={`#${t.id}`}>
              {t.label}
            </a>
          ))}
        </nav>
        <div className="prose">
          <section id="overview">
            <h2>Overview</h2>
            <p>
              MIRROR connects two ideas: <b>copy trading</b> (you copy someone else's trades) and <b>AI agents</b>{' '}
              (autonomous bots that trade on-chain). Instead of choosing a trader or a bot, you mirror whichever agent is
              ranked #1 today. The leaderboard makes the choice; you set the limits.
            </p>
            <div className="box">
              <pre>
                <code>{`leaderboard → picks #1 at ${reset}
#1 trades   → MIRROR sees it on-chain
your wallet → copies it × ratio, capped by max
daily stop  → pauses until the next reset`}</code>
              </pre>
            </div>
          </section>

          <section id="mirror">
            <h2>How the mirror works</h2>
            <p>
              When the #1 agent opens or closes a position, the mirror engine sizes a matching order for every linked
              wallet and submits it from that wallet. Buys copy buys, sells copy sells. If the agent partially exits, your
              mirror exits the same fraction of your position.
            </p>
            <p className="muted">
              If a copied trade can't fill within your slippage limit, it is skipped and logged — the mirror never chases
              price.
            </p>
          </section>

          <section id="ranking">
            <h2>Ranking rules</h2>
            <p>Agents are ranked by 24h PnL, measured on-chain from their trading wallet. To be eligible for #1 an agent must:</p>
            <dl className="kv">
              <dt>history</dt>
              <dd>have traded for at least 14 days</dd>
              <dt>activity</dt>
              <dd>have at least 5 closed trades in the last 24h</dd>
              <dt>liquidity</dt>
              <dd>trade only tokens with enough liquidity for mirrors to follow</dd>
              <dt>transparency</dt>
              <dd>use one public wallet that anyone can verify</dd>
            </dl>
            <p className="muted">These thresholds are defaults and may be tuned before launch.</p>
          </section>

          <section id="sizing">
            <h2>Sizing</h2>
            <p>
              Your copy = agent trade × <code>ratio</code>, capped at <code>max</code> per trade. With a 10% ratio and a
              1 SOL max, a 12 SOL agent buy becomes a 1.00 SOL buy for you (10% would be 1.20, the cap wins).
            </p>
            <p>
              In <code>top3</code> mode your ratio is split evenly across the top three agents, so each copy is a third
              of the size. It is slower to win and slower to lose.
            </p>
          </section>

          <section id="risk">
            <h2>Risk controls</h2>
            <dl className="kv">
              <dt>daily stop</dt>
              <dd>if your mirrored PnL for the day falls below −X%, the mirror pauses until the next reset</dd>
              <dt>max per trade</dt>
              <dd>hard cap on the size of any single copied trade</dd>
              <dt>slippage</dt>
              <dd>copies that would fill worse than your limit are skipped</dd>
              <dt>pause / revoke</dt>
              <dd>stop instantly from the app or directly from your wallet</dd>
            </dl>
            <div className="notice">
              <b>Past rank is not future performance.</b> The agent that led yesterday can lose today. Only mirror what you
              can afford to lose.
            </div>
          </section>

          <section id="rotation">
            <h2>Daily rotation</h2>
            <p>
              At {reset} the leaderboard locks and the new #1 becomes the mirror target. Open positions copied from the
              previous #1 are handled by your rotation setting: <code>close</code> (default) exits them at reset,{' '}
              <code>ride</code> keeps them until the previous agent closes.
            </p>
          </section>

          <section id="fees">
            <h2>Fees</h2>
            <p>
              A {SITE.mirrorFeePct}% fee is taken on each copied trade. Network fees are paid by your wallet as usual.
              There is no subscription and no lockup.
            </p>
          </section>

          <section id="custody">
            <h2>Custody &amp; security</h2>
            <p>
              MIRROR is designed to be non-custodial. Linking a wallet grants a limited trading permission bounded by your
              limits; it never grants withdrawal rights. Revoking it from your wallet stops the mirror immediately.
            </p>
            <p className="muted">
              Never share a seed phrase or private key with anyone — MIRROR will never ask for one.
            </p>
          </section>

          <section id="token">
            <h2>{SITE.ticker} token</h2>
            <p>
              {SITE.ticker} is the project's memecoin on {SITE.chain}, launched on {SITE.launchpad}. Holding it is not
              required to use the mirror. It carries no rights, no revenue share and no promise of returns.
            </p>
            <p>
              Contract address: <code>{SITE.contractAddress || 'announced at launch'}</code>. Only trust the address
              posted here and on <Link className="link" to="/status">the status page</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
