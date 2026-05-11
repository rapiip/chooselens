import { useEffect, useRef } from 'react'

const STORAGE_KEY = 'chooselens-engagement'

function getEngagementData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveEngagementData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // localStorage unavailable
  }
}

/**
 * Tracks how long each section is visible on screen.
 * Stores cumulative seconds per section in localStorage.
 *
 * @param {string} lens - Current lens identifier (web3, cybersecurity, life)
 * @param {string[]} sections - Array of section IDs to track
 */
export function useEngagementTracker(lens, sections) {
  const timersRef = useRef({})
  const visibleRef = useRef(new Set())

  useEffect(() => {
    if (!lens || !sections || sections.length === 0) return undefined

    const observers = []

    // Tick every second to accumulate time for visible sections
    const interval = setInterval(() => {
      if (visibleRef.current.size === 0) return

      const data = getEngagementData()
      if (!data[lens]) data[lens] = {}

      visibleRef.current.forEach((sectionId) => {
        if (!data[lens][sectionId]) {
          data[lens][sectionId] = { seconds: 0, visits: 0 }
        }
        data[lens][sectionId].seconds += 1
      })

      saveEngagementData(data)
    }, 1000)

    // Track which sections are in the viewport
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleRef.current.add(sectionId)

              // Count unique visits (only once per page session)
              if (!timersRef.current[sectionId]) {
                timersRef.current[sectionId] = true
                const data = getEngagementData()
                if (!data[lens]) data[lens] = {}
                if (!data[lens][sectionId]) {
                  data[lens][sectionId] = { seconds: 0, visits: 0 }
                }
                data[lens][sectionId].visits += 1
                saveEngagementData(data)
              }
            } else {
              visibleRef.current.delete(sectionId)
            }
          })
        },
        { threshold: 0.3 }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      clearInterval(interval)
      observers.forEach((obs) => obs.disconnect())
      visibleRef.current.clear()
    }
  }, [lens, sections])
}

/**
 * Get all engagement data from localStorage
 */
export function getAllEngagementData() {
  return getEngagementData()
}

/**
 * Reset all engagement data
 */
export function resetEngagementData() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // localStorage unavailable
  }
}
