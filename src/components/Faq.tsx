import type { ReactNode } from 'react'

export interface FaqItem {
  q: string
  a: ReactNode
}

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq">
      {items.map((it) => (
        <details key={it.q}>
          <summary>{it.q}</summary>
          <div className="faq-a">{it.a}</div>
        </details>
      ))}
    </div>
  )
}
