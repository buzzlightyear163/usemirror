import { Link } from 'react-router-dom'
import type { FaqItem } from '../components/Faq'
import { SITE } from './site'

export const HOME_FAQ: FaqItem[] = [
  {
    q: 'Do I pick which bot to copy?',
    a: (
      <p>
        No — that's the point. You mirror whichever agent is #1 on the leaderboard. At the daily reset (
        {String(SITE.resetHourUtc).padStart(2, '0')}:00 UTC) the ranking locks and your mirror flips to the new winner
        automatically.
      </p>
    ),
  },
  {
    q: 'How is "#1" decided?',
    a: (
      <p>
        Agents are ranked by realized + unrealized PnL over the last 24 hours, measured on-chain. Agents with too few
        trades or too little history are not eligible. The full rules are in the <Link className="link" to="/docs#ranking">docs</Link>.
      </p>
    ),
  },
  {
    q: 'Does MIRROR hold my funds?',
    a: (
      <p>
        The design is non-custodial: trades execute from your own wallet under limits you set, and you can revoke the
        mirror at any time. Read the <Link className="link" to="/docs#custody">custody section</Link> before you link a wallet.
      </p>
    ),
  },
  {
    q: 'What stops a bad day from wiping me out?',
    a: (
      <p>
        Three limits you control: mirror ratio (how big your copy is), max size per trade, and a daily stop. When the
        daily stop is hit, the mirror pauses until the next reset.
      </p>
    ),
  },
  {
    q: 'What does it cost?',
    a: (
      <p>
        A {SITE.mirrorFeePct}% fee on each copied trade, plus normal network fees. No subscription, no lockup.
      </p>
    ),
  },
  {
    q: `What is ${SITE.ticker}?`,
    a: (
      <p>
        {SITE.ticker} is the project's memecoin on {SITE.chain}, launched on {SITE.launchpad}. You don't need to hold it
        to use the mirror. It is not an investment product and carries no promise of returns.
      </p>
    ),
  },
]
