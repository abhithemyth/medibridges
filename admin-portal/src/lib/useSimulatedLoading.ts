import { useEffect, useState } from 'react'

/**
 * Simulates a short fetch so loading skeletons are visible in the prototype.
 * Phase 2 will replace this with real API calls.
 */
export function useSimulatedLoading(delay = 550): boolean {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), delay)
    return () => clearTimeout(t)
  }, [delay])
  return loading
}
