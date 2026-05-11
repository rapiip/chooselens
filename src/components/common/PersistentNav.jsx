import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toAnchorLabel } from '../../utils/formatters'

const variants = {
  web3: {
    trigger:
      'rounded-[22px] border border-accent bg-card px-4 py-3 font-mono text-xs uppercase tracking-[0.24em] text-text shadow-glow',
    panel: 'rounded-[18px] border border-accent bg-surface p-3 shadow-glow',
    activeDot: 'bg-[#00D4FF]',
    crossoverAccent: 'text-[#00D4FF]',
  },
  cybersecurity: {
    trigger:
      'rounded-sm border border-accent bg-card px-4 py-3 font-mono text-sm text-text',
    panel: 'rounded-sm border border-accent bg-surface p-3 font-mono',
    activeDot: 'bg-[#00FF41]',
    crossoverAccent: 'text-[#00FF41]',
  },
  life: {
    trigger:
      'rounded-full border border-border bg-card px-4 py-3 font-accent text-sm font-medium text-text shadow-soft',
    panel: 'rounded-[20px] border border-border bg-card p-3 shadow-soft',
    activeDot: 'bg-[#C4622D]',
    crossoverAccent: 'text-[#C4622D]',
  },
}

const allLenses = [
  { key: 'web3', to: '/web3', label: 'Web3', accent: '#00D4FF' },
  { key: 'cybersecurity', to: '/cybersecurity', label: 'Cybersec', accent: '#00FF41' },
  { key: 'life', to: '/life', label: 'Life', accent: '#C4622D' },
]

function PersistentNav({ lens, anchors }) {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const observerRef = useRef(null)

  const label = useMemo(() => {
    if (lens === 'web3') return 'HEX NAV'
    if (lens === 'cybersecurity') return '[>_]'
    return 'menu'
  }, [lens])

  const styles = variants[lens]
  const otherLenses = useMemo(() => allLenses.filter((l) => l.key !== lens), [lens])

  // Scroll-aware active section tracking
  const updateActiveSection = useCallback(() => {
    if (!anchors || anchors.length === 0) return

    const scrollY = window.scrollY
    const windowHeight = window.innerHeight
    let current = null

    for (let i = anchors.length - 1; i >= 0; i--) {
      const element = document.getElementById(anchors[i])
      if (element) {
        const rect = element.getBoundingClientRect()
        const offsetTop = rect.top + scrollY
        if (scrollY >= offsetTop - windowHeight * 0.4) {
          current = anchors[i]
          break
        }
      }
    }

    setActiveSection(current)
  }, [anchors])

  useEffect(() => {
    updateActiveSection()

    // Use IntersectionObserver for efficiency
    const observers = []
    const sectionMap = new Map()

    anchors.forEach((anchor) => {
      const element = document.getElementById(anchor)
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              sectionMap.set(anchor, entry.isIntersecting)
            })
            // Find the last visible section
            let lastVisible = null
            for (const a of anchors) {
              if (sectionMap.get(a)) lastVisible = a
            }
            if (lastVisible) setActiveSection(lastVisible)
          },
          { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
        )
        observer.observe(element)
        observers.push(observer)
      }
    })

    observerRef.current = observers

    // Fallback scroll listener for edge cases
    window.addEventListener('scroll', updateActiveSection, { passive: true })

    return () => {
      observers.forEach((obs) => obs.disconnect())
      window.removeEventListener('scroll', updateActiveSection)
    }
  }, [anchors, updateActiveSection])

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        aria-expanded={open}
        aria-label={`Open ${lens} navigation`}
        className={styles.trigger}
        onClick={() => setOpen((current) => !current)}
        onMouseEnter={() => setOpen(true)}
        type="button"
      >
        {label}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`absolute bottom-full right-0 mb-3 min-w-[240px] ${styles.panel}`}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            onMouseLeave={() => setOpen(false)}
            transition={{ duration: 0.18 }}
          >
            {/* Current page sections */}
            <div className="mb-2 border-b border-border pb-2 text-xs uppercase tracking-[0.24em] text-muted">
              {location.pathname}
            </div>
            <div className="flex flex-col gap-1 text-sm">
              {anchors.map((anchor) => {
                const isActive = activeSection === anchor
                return (
                  <a
                    className={`flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors ${
                      isActive ? 'bg-white/5' : 'hover:bg-white/5'
                    }`}
                    href={`${location.pathname}#${anchor}`}
                    key={anchor}
                    onClick={() => setOpen(false)}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-all ${
                        isActive ? `${styles.activeDot} scale-125` : 'bg-gray-600 scale-100'
                      }`}
                    />
                    <span className={isActive ? styles.crossoverAccent : ''}>
                      {lens === 'cybersecurity' ? `$ jump ${anchor}` : toAnchorLabel(anchor)}
                    </span>
                  </a>
                )
              })}
            </div>

            {/* Lens Crossover — switch to other lenses */}
            <div className="mt-3 border-t border-border pt-3">
              <div className="mb-2 text-xs uppercase tracking-[0.24em] text-muted">
                Switch Lens
              </div>
              <div className="flex flex-col gap-1 text-sm">
                {otherLenses.map((otherLens) => (
                  <Link
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-white/5"
                    key={otherLens.key}
                    onClick={() => setOpen(false)}
                    to={otherLens.to}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: otherLens.accent }}
                    />
                    <span className="text-gray-300">{otherLens.label}</span>
                    <span className="ml-auto text-xs text-gray-500">→</span>
                  </Link>
                ))}
                <Link
                  className="mt-1 flex items-center gap-2 rounded-md px-2 py-1.5 text-muted transition-colors hover:bg-white/5"
                  onClick={() => setOpen(false)}
                  to="/"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#9AA4FF]" />
                  <span>All Lenses</span>
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default PersistentNav
