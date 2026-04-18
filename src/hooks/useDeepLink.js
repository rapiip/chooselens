import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useDeepLink(dependencies = []) {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return

    const timer = window.setTimeout(() => {
      const target = document.getElementById(location.hash.replace('#', ''))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 200)

    return () => window.clearTimeout(timer)
  }, [location.hash, ...dependencies])
}
