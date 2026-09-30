import { useEffect, useState } from 'react'

const cache = new Map<string, unknown>()

/** Loads /api/<name>.json (static fixtures in public/api). TODO(backend): point at the real API. */
export function useFixture<T>(name: string): { data: T | null; error: string | null } {
  const [state, setState] = useState<{ data: T | null; error: string | null }>(() => ({
    data: (cache.get(name) as T | undefined) ?? null,
    error: null,
  }))

  useEffect(() => {
    if (cache.has(name)) {
      setState({ data: cache.get(name) as T, error: null })
      return
    }
    let alive = true
    fetch(`${import.meta.env.BASE_URL}api/${name}.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json() as Promise<T>
      })
      .then((d) => {
        cache.set(name, d)
        if (alive) setState({ data: d, error: null })
      })
      .catch((e: unknown) => {
        if (alive) setState({ data: null, error: String(e) })
      })
    return () => {
      alive = false
    }
  }, [name])

  return state
}
