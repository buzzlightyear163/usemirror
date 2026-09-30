import { Link } from 'react-router-dom'
import { MirrorBot } from '../components/MirrorBot'

export default function NotFound({ what = 'this page' }: { what?: string }) {
  return (
    <div className="wrap narrow nf">
      <MirrorBot width={180} className="nf-bot" />
      <p className="eyebrow">404</p>
      <h1>Nothing to mirror here.</h1>
      <p className="lede">We couldn't find {what}. Even the #1 bot misses sometimes.</p>
      <div className="actions">
        <Link to="/" className="btn primary">
          Back home
        </Link>
        <Link to="/leaderboard" className="btn">
          Leaderboard
        </Link>
      </div>
    </div>
  )
}
