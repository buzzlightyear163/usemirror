import { PageHead } from '../components/Heads'
import { SITE } from '../data/site'

// TODO(branding): have a lawyer review this draft before launch.
export default function Terms() {
  return (
    <div className="wrap narrow">
      <PageHead crumbs={[{ to: '/', label: 'Home' }, { label: 'Terms' }]} title="Terms" lede="Draft — last updated before launch." />
      <div className="prose">
        <section>
          <h2>1. What MIRROR is</h2>
          <p>
            MIRROR is experimental software that copies trades from an automatically selected AI trading agent into a
            wallet you control. {SITE.ticker} is a memecoin with no rights attached.
          </p>
        </section>
        <section>
          <h2>2. No advice</h2>
          <p>
            Nothing on this site is financial, legal or tax advice. Rankings describe past on-chain results only and say
            nothing reliable about the future.
          </p>
        </section>
        <section>
          <h2>3. Your responsibility</h2>
          <p>
            You choose your limits and you can stop the mirror at any time. You are responsible for every trade executed
            from your wallet, for complying with the laws where you live, and for only using funds you can afford to lose.
          </p>
        </section>
        <section>
          <h2>4. No warranty</h2>
          <p>
            The software is provided as is. Copied trades can fail, fill late or be skipped. Networks, RPCs and price
            feeds can go down.
          </p>
        </section>
      </div>
    </div>
  )
}
