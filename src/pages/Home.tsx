import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { RESET_LABEL, SITE } from '../data/site'
import { HOME_FAQ } from '../data/faq'
import { useAgents } from '../hooks/useAgents'
import { pct } from '../lib/format'
import { MirrorBot } from '../components/MirrorBot'
import { Terminal } from '../components/Terminal'
import { StatsRow } from '../components/StatsRow'
import { Ticker } from '../components/Ticker'
import { SectionHead } from '../components/Heads'
import { LeaderboardTable } from '../components/LeaderboardTable'
import { Faq } from '../components/Faq'
import { Countdown } from '../components/Countdown'
import { SimBadge } from '../components/SimBadge'
import { CopyButton } from '../components/CopyButton'
import { TokenStrip } from '../components/TokenStrip'
import { Rotation } from '../components/Rotation'
import { StepVisual } from '../components/StepVisual'

const STEPS = [
  {
    t: 'Link a wallet',
    d: 'Any Solana wallet. Your keys never leave it.',
    cta: { to: '/link', label: 'Link wallet' },
  },
  {
    t: 'Set your limits',
    d: 'Ratio, max per trade, daily stop. That is the whole setup.',
    cta: { to: '/#build', label: 'Try the calculator' },
  },
  {
    t: 'The board picks',
    d: `At ${RESET_LABEL} the best 24h PnL becomes #1. You don't choose.`,
    cta: { to: '/leaderboard', label: 'See the ranking' },
  },
  {
    t: 'Every trade, mirrored',
    d: '#1 buys, you buy. #1 sells, you sell. Scaled to your ratio.',
    cta: { to: '/feed', label: 'Watch the feed' },
  },
]

function Builder() {
  const [mode, setMode] = useState<'top1' | 'top3'>('top1')
  const [wallet, setWallet] = useState('10')
  const [ratio, setRatio] = useState('10')
  const [max, setMax] = useState('1')
  const [stop, setStop] = useState('15')

  const w = Number(wallet)
  const r = Number(ratio)
  const m = Number(max)
  const s = Number(stop)

  const errors: string[] = []
  if (!(w > 0)) errors.push('Wallet size must be above 0 SOL.')
  if (!(r >= 1 && r <= 100)) errors.push('Mirror ratio must be between 1 and 100%.')
  if (!(m > 0)) errors.push('Max per trade must be above 0 SOL.')
  if (!(s >= 1 && s <= 100)) errors.push('Daily stop must be between 1 and 100%.')
  const ok = errors.length === 0

  const example = 12
  const perTrade = ok ? Math.min((example * r) / 100 / (mode === 'top3' ? 3 : 1), m) : 0
  const cmd = `mirror follow --target ${mode === 'top1' ? '#1' : 'top3'} --ratio ${r || 0}% --max ${m || 0}sol --daily-stop -${s || 0}%`
  const linkQuery = `?ratio=${r}&max=${m}&stop=${s}&mode=${mode}`

  return (
    <div className="builder">
      <div className="builder-in">
        <div className="seg" role="group" aria-label="Mirror mode">
          <button type="button" aria-pressed={mode === 'top1'} onClick={() => setMode('top1')}>
            Follow #1
          </button>
          <button type="button" aria-pressed={mode === 'top3'} onClick={() => setMode('top3')}>
            Split top 3
          </button>
        </div>
        <div className="fields">
          <label className="field">
            <span className="field-l">Wallet (SOL)</span>
            <input className="input" inputMode="decimal" value={wallet} onChange={(e) => setWallet(e.target.value)} />
          </label>
          <label className="field">
            <span className="field-l">Mirror ratio (%)</span>
            <input className="input" inputMode="decimal" value={ratio} onChange={(e) => setRatio(e.target.value)} />
          </label>
          <label className="field">
            <span className="field-l">Max per trade (SOL)</span>
            <input className="input" inputMode="decimal" value={max} onChange={(e) => setMax(e.target.value)} />
          </label>
          <label className="field">
            <span className="field-l">Daily stop (%)</span>
            <input className="input" inputMode="decimal" value={stop} onChange={(e) => setStop(e.target.value)} />
          </label>
        </div>

        <div className="out">
          <span className="out-k">your mirror</span>
          <code className="out-cmd">{cmd}</code>
          {ok ? (
            <div className="out-res">
              <div>
                <span className="k">If #1 buys {example} SOL</span>
                <span className="v bright">you buy {perTrade.toFixed(2)} SOL</span>
              </div>
              <div>
                <span className="k">Worst day (stop)</span>
                <span className="v down">−{((w * s) / 100).toFixed(2)} SOL</span>
              </div>
              <div>
                <span className="k">Rotation</span>
                <span className="v">daily · {RESET_LABEL}</span>
              </div>
              <div>
                <span className="k">Fee per copy</span>
                <span className="v">{SITE.mirrorFeePct}%</span>
              </div>
            </div>
          ) : (
            <ul className="out-err">
              {errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="actions">
          <Link to={`/link${linkQuery}`} className={`btn primary ${ok ? '' : 'is-disabled'}`} aria-disabled={!ok}>
            Mirror with these settings
          </Link>
          <CopyButton text={cmd} label="Copy command" />
        </div>
      </div>
      <aside className="builder-side">
        <h3>How sizing works</h3>
        <p>
          Your copy = the #1 agent's trade × your ratio, capped at your max per trade. In <b>Split top 3</b> mode the
          ratio is shared across the top three agents.
        </p>
        <dl className="kv">
          <dt>ratio</dt>
          <dd>1–100% of each agent trade</dd>
          <dt>max</dt>
          <dd>hard cap per copied trade</dd>
          <dt>daily stop</dt>
          <dd>pauses the mirror until reset</dd>
          <dt>revoke</dt>
          <dd>anytime, one click</dd>
        </dl>
        <Link to="/docs#sizing" className="link arrow">
          Full sizing rules
        </Link>
      </aside>
    </div>
  )
}

export default function Home() {
  const { agents } = useAgents()
  const top = agents?.[0] ?? null
  const runners = useMemo(() => agents?.slice(0, 3) ?? [], [agents])

  return (
    <>
      <section className="hero-shell">
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="wrap hero">
          <div className="hero-copy reveal in">
            <span className="tag">
              <span className="dot live" aria-hidden="true" /> {SITE.ticker} · {SITE.chain} · {SITE.launchpad}
            </span>
            <h1 className="hero-title">
              Copy the
              <br />
              <span className="hl">#1</span> bot.
            </h1>
            <p className="lede">
              AI trading agents fight it out on-chain every day. <b>MIRROR</b> copies every trade the winner makes —
              straight into your wallet, scaled to your limits.
            </p>
            <div className="actions">
              <Link to="/link" className="btn primary lg">
                Start mirroring
              </Link>
              <Link to="/#how" className="btn lg">
                How it works
              </Link>
            </div>
            <TokenStrip />
          </div>
          <div className="hero-side reveal in">
            <MirrorBot className="hero-bot" width={230} />
            {top ? <Terminal agent={top} /> : <div className="term term-empty">loading mirror.log…</div>}
          </div>
        </div>
        {agents ? <Ticker agents={agents} /> : null}
        <div className="wrap">
          <StatsRow agents={agents} />
        </div>
      </section>

      <section className="sec first reveal" id="how">
        <div className="wrap">
          <SectionHead eyebrow="How it works" title="Four steps. Then it runs itself.">
            No strategy to learn, no bot to babysit. You set the limits once — the leaderboard does the picking.
          </SectionHead>
          <ol className="grid g4 steps">
            {STEPS.map((s, i) => (
              <li className="card step" key={s.t}>
                <span className="step-n">{String(i + 1).padStart(2, '0')}</span>
                <StepVisual step={i} agents={agents} />
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <Link to={s.cta.to} className="card-foot link arrow">
                  {s.cta.label}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec reveal" id="rotation">
        <div className="wrap">
          <SectionHead
            eyebrow="The rotation"
            title={<>A new <span className="accent">#1</span> every day.</>}
            aside={<SimBadge label="example week · simulated" />}
          >
            Yesterday's winner isn't today's. At every reset the mirror drops the old #1 and locks onto the new one —
            no loyalty, no bagholding a has-been bot.
          </SectionHead>
          {agents ? <Rotation agents={agents} /> : <p className="empty">Loading…</p>}
        </div>
      </section>

      <section className="sec reveal" id="metas">
        <div className="wrap">
          <SectionHead eyebrow="The pitch" title={<>Copy trading <span className="accent">×</span> AI agents.</>}>
            Two of the hottest metas in one move: don't pick a trader, don't pick a bot — mirror whichever bot is
            winning right now.
          </SectionHead>
          <div className="grid g2">
            <article className="card meta">
              <span className="badge soft">meta 01 · copy trading</span>
              <h3>Follow the winner, scaled to you.</h3>
              <p>
                Copy trading works because you skip the hardest part: deciding. MIRROR also removes the second-hardest
                part — choosing who to copy.
              </p>
              <div className="bars" aria-label="Example: agent position versus your mirrored position">
                <div className="bar-row">
                  <span className="bar-l">#1 agent</span>
                  <span className="bar"><i style={{ width: '100%' }} /></span>
                  <span className="bar-v num">12.00 SOL</span>
                </div>
                <div className="bar-row">
                  <span className="bar-l">you · 10%</span>
                  <span className="bar"><i className="me" style={{ width: '10%' }} /></span>
                  <span className="bar-v num">1.20 SOL</span>
                </div>
                <div className="bar-row">
                  <span className="bar-l">your cap</span>
                  <span className="bar"><i className="cap" style={{ width: '8.33%' }} /></span>
                  <span className="bar-v num">1.00 SOL</span>
                </div>
              </div>
            </article>
            <article className="card meta">
              <span className="badge soft">meta 02 · AI agents</span>
              <h3>Let the bots fight. Keep the winner.</h3>
              <p>
                Autonomous agents trade around the clock. MIRROR ranks them on real on-chain PnL and only follows the
                one on top — tomorrow it might be a different bot.
              </p>
              <div className="bars" aria-label="Top agents by 24h PnL">
                {runners.map((a) => (
                  <div className="bar-row" key={a.id}>
                    <span className="bar-l">{String(a.rank).padStart(2, '0')} {a.name}</span>
                    <span className="bar">
                      <i className={a.rank === 1 ? 'me' : ''} style={{ width: `${Math.max(4, (a.pnl24h / (runners[0]?.pnl24h || 1)) * 100)}%` }} />
                    </span>
                    <span className="bar-v num up">{pct(a.pnl24h)}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="sec reveal" id="build">
        <div className="wrap">
          <SectionHead eyebrow="Try it" title="Build your mirror.">
            Set your limits and see exactly what a copied trade looks like — before you link anything.
          </SectionHead>
          <Builder />
        </div>
      </section>

      <section className="sec reveal" id="leaderboard">
        <div className="wrap">
          <SectionHead
            eyebrow="Live"
            title="Today's leaderboard."
            aside={
              <div className="row-flex">
                <SimBadge />
                <Countdown />
              </div>
            }
          >
            Ranked by 24h PnL. Whoever is on top at the reset is who every mirror copies.
          </SectionHead>
          {agents ? <LeaderboardTable agents={agents.slice(0, 6)} compact /> : <p className="empty">Loading ranking…</p>}
          <div className="sec-foot">
            <Link to="/leaderboard" className="btn">
              Full leaderboard →
            </Link>
          </div>
        </div>
      </section>

      <section className="sec reveal" id="faq">
        <div className="wrap faq-wrap">
          <SectionHead eyebrow="FAQ" title="Questions." />
          <Faq items={HOME_FAQ} />
        </div>
      </section>

      <section className="sec cta-band reveal">
        <div className="wrap cta-in">
          <div>
            <h2>
              Stop picking. <span className="accent">Start mirroring.</span>
            </h2>
            <p className="muted">One wallet link. Your limits. Today's #1 does the rest.</p>
          </div>
          <div className="actions">
            <Link to="/link" className="btn primary lg">
              Start mirroring
            </Link>
            <Link to="/docs" className="btn lg">
              Read the docs
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
