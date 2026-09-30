import { useState } from 'react'

interface Props {
  text: string
  label?: string
  className?: string
  disabled?: boolean
}

export function CopyButton({ text, label = 'Copy', className = 'btn', disabled }: Props) {
  const [done, setDone] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setDone(true)
    window.setTimeout(() => setDone(false), 1400)
  }

  return (
    <button type="button" className={className} onClick={copy} disabled={disabled} aria-live="polite">
      {done ? 'Copied ✓' : label}
    </button>
  )
}
