import { SITE } from '../data/site'

export function SimBadge({ label = 'simulated preview' }: { label?: string }) {
  if (!SITE.demo) return null
  return (
    <span className="badge sim" title="Shown with simulated data until launch">
      {label}
    </span>
  )
}
