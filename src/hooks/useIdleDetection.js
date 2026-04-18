import { useEffect, useState } from 'react'

export function useIdleDetection(timeout = 30000, enabled = true) {
  const [idle, setIdle] = useState(false)

  useEffect(() => {
    if (!enabled) return undefined

    let timer

    const reset = () => {
      window.clearTimeout(timer)
      setIdle(false)
      timer = window.setTimeout(() => setIdle(true), timeout)
    }

    const events = ['mousemove', 'keydown', 'scroll', 'touchstart']
    events.forEach((event) => window.addEventListener(event, reset))
    reset()

    return () => {
      window.clearTimeout(timer)
      events.forEach((event) => window.removeEventListener(event, reset))
    }
  }, [enabled, timeout])

  return idle
}
