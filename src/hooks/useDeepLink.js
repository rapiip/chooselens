import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export function useDeepLink(dependencies = []) {
  const location = useLocation()
  // Use a ref to track dependencies without spreading into the dep array
  const depsRef = useRef(dependencies)
  depsRef.current = dependencies

  // Track a simple "ready" signal derived from dependencies
  // When all deps are falsy (e.g., loaders dismissed), we consider it ready
  const isReady = dependencies.every((dep) => !dep)

  useEffect(() => {
    if (!location.hash) return undefined
    if (!isReady) return undefined

    const timer = window.setTimeout(() => {
      const target = document.getElementById(location.hash.replace('#', ''))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 200)

    return () => window.clearTimeout(timer)
  }, [location.hash, isReady])
}
