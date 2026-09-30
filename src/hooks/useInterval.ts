import { useEffect, useRef } from 'react'

/** setInterval that always calls the latest callback. Pass null to pause. */
export function useInterval(cb: () => void, delay: number | null): void {
  const saved = useRef(cb)
  useEffect(() => {
    saved.current = cb
  }, [cb])
  useEffect(() => {
    if (delay === null) return
    const id = window.setInterval(() => saved.current(), delay)
    return () => window.clearInterval(id)
  }, [delay])
}
