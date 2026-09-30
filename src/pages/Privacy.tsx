import { PageHead } from '../components/Heads'

// TODO(branding): review before launch and match to your actual hosting/analytics setup.
export default function Privacy() {
  return (
    <div className="wrap narrow">
      <PageHead crumbs={[{ to: '/', label: 'Home' }, { label: 'Privacy' }]} title="Privacy" lede="Draft — last updated before launch." />
      <div className="prose">
        <section>
          <h2>What we see</h2>
          <p>
            Your public wallet address and the limits you set. Trades on a public blockchain are public by nature — that
            includes mirrored trades.
          </p>
        </section>
        <section>
          <h2>What we never ask for</h2>
          <p>Seed phrases, private keys, passwords or identity documents. If someone asks for these in our name, it is a scam.</p>
        </section>
        <section>
          <h2>Cookies</h2>
          <p>
            The site stores one preference in your browser: light or dark theme. No tracking cookies are used by default.
          </p>
        </section>
      </div>
    </div>
  )
}
