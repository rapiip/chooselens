import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { selectionTheme } from '../themes/selection.theme'
import { useTheme } from '../hooks/useTheme'
import { pageVariants } from '../utils/transitions'

const panels = [
  {
    lens: 'web3',
    to: '/web3',
    title: 'Web3 Lens',
    copy: 'Untuk orang yang membaca reputasi lewat sistem, protokol, dan konteks on-chain.',
    previewClass:
      'bg-[radial-gradient(circle_at_top,_rgba(0,212,255,0.32),transparent_40%),linear-gradient(180deg,#0a0a0f,#101828)]',
    accent: '#00D4FF',
  },
  {
    lens: 'cybersecurity',
    to: '/cybersecurity',
    title: 'Cybersecurity Lens',
    copy: 'Untuk pembaca yang lebih percaya pada presisi, struktur, dan klaim yang bisa diuji.',
    previewClass:
      'bg-[radial-gradient(circle_at_top,_rgba(0,255,65,0.2),transparent_45%),linear-gradient(180deg,#030508,#08120c)]',
    accent: '#00FF41',
  },
  {
    lens: 'life',
    to: '/life',
    title: 'Kehidupan Saya',
    copy: 'Untuk orang yang ingin melihat sisi yang lebih hangat, reflektif, dan manusiawi.',
    previewClass:
      'bg-[radial-gradient(circle_at_top,_rgba(196,98,45,0.24),transparent_45%),linear-gradient(180deg,#f5f0e8,#efe6d6)]',
    accent: '#C4622D',
  },
]

function LensSelectionPage() {
  const reduceMotion = useReducedMotion()
  const hoverResetRef = useRef(null)
  const panelGroupRef = useRef(null)
  const [activeLens, setActiveLens] = useState(null)
  const [isPointerMode, setIsPointerMode] = useState(false)
  const [spotlight, setSpotlight] = useState({
    x: 0,
    y: 0,
    opacity: 0,
    color: panels[0].accent,
  })

  useTheme(selectionTheme)

  useEffect(() => {
    if (!document.fonts?.load) return undefined

    document.fonts.load('1rem "JetBrains Mono"')
    document.fonts.load('1rem "Playfair Display"')
    document.fonts.load('1rem "Source Serif 4"')
    return undefined
  }, [])

  useEffect(() => {
    const syncViewport = () => setIsPointerMode(window.innerWidth >= 768)
    syncViewport()
    window.addEventListener('resize', syncViewport)
    return () => window.removeEventListener('resize', syncViewport)
  }, [])

  useEffect(
    () => () => {
      if (hoverResetRef.current) {
        window.clearTimeout(hoverResetRef.current)
      }
    },
    [],
  )

  const clearPendingReset = () => {
    if (hoverResetRef.current) {
      window.clearTimeout(hoverResetRef.current)
      hoverResetRef.current = null
    }
  }

  const updateSpotlightPosition = (event, accent) => {
    const rect = panelGroupRef.current?.getBoundingClientRect()
    if (!rect) return

    setSpotlight((current) => ({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      opacity: 1,
      color: accent ?? current.color,
    }))
  }

  const activateLens = (panel, event) => {
    clearPendingReset()
    setActiveLens(panel.lens)

    if (isPointerMode && !reduceMotion && event) {
      updateSpotlightPosition(event, panel.accent)
      return
    }

    const rect = panelGroupRef.current?.getBoundingClientRect()
    if (!rect) return

    setSpotlight({
      x: rect.width / 2,
      y: rect.height / 2,
      opacity: 0.22,
      color: panel.accent,
    })
  }

  const scheduleReset = () => {
    clearPendingReset()
    hoverResetRef.current = window.setTimeout(() => {
      setActiveLens(null)
      setSpotlight((current) => ({
        ...current,
        opacity: 0,
      }))
    }, 140)
  }

  return (
    <motion.main
      animate="animate"
      className="app-shell selection-noise relative overflow-hidden"
      exit="exit"
      initial="initial"
      variants={pageVariants.selection}
    >
      <div className="container-wide flex min-h-screen flex-col py-8 md:py-10">
        <div className="max-w-3xl">
          <p className="eyebrow">Choose Your Lens</p>
          <h1 className="mt-4 max-w-2xl font-heading text-4xl leading-tight text-text md:text-6xl">
            Pilih cara kamu mengenal saya.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
            Satu orang, tiga perspektif, tiga suasana yang benar-benar berbeda.
          </p>
        </div>

        <div
          className="selection-stage mt-10 flex flex-1 flex-col gap-4 lg:flex-row"
          onMouseLeave={scheduleReset}
          onMouseMove={(event) => {
            if (!isPointerMode || reduceMotion || !activeLens) return
            updateSpotlightPosition(event)
          }}
          ref={panelGroupRef}
        >
          <motion.div
            animate={{
              background: `radial-gradient(circle at center, ${spotlight.color} 0%, transparent 72%)`,
              opacity: isPointerMode && !reduceMotion ? spotlight.opacity : 0,
              x: spotlight.x - 180,
              y: spotlight.y - 180,
            }}
            aria-hidden="true"
            className="selection-spotlight"
            transition={{
              type: 'spring',
              stiffness: 180,
              damping: 28,
              mass: 0.8,
            }}
          />
          {panels.map((panel) => {
            const isActive = activeLens === panel.lens
            const grow = activeLens
              ? isActive
                ? 1.4
                : 0.85
              : 1

            return (
              <motion.div
                animate={{
                  flexGrow: grow,
                  y: isActive ? -8 : 0,
                  scale: activeLens && !isActive ? 0.985 : 1,
                  boxShadow: isActive
                    ? `0 28px 60px rgba(0, 0, 0, 0.24), 0 0 0 1px ${panel.accent}40`
                    : '0 20px 40px rgba(17, 17, 17, 0.08)',
                }}
                className={`relative flex min-h-[38vh] flex-1 overflow-hidden rounded-[28px] border border-border ${panel.previewClass} selection-panel`}
                key={panel.lens}
                layout
                onHoverEnd={scheduleReset}
                onHoverStart={(event) => activateLens(panel, event)}
                transition={{
                  layout: { duration: reduceMotion ? 0.01 : 0.42 },
                  duration: reduceMotion ? 0.01 : 0.42,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.div
                  animate={{
                    opacity: isActive ? 1 : 0,
                  }}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at top, ${panel.accent}26, transparent 58%)`,
                  }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.35 }}
                />
                <Link
                  className="relative flex h-full w-full flex-col justify-between p-6 text-white md:p-8"
                  onBlur={scheduleReset}
                  onFocus={() => activateLens(panel)}
                  to={panel.to}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.5))]" />
                  <motion.div
                    animate={{
                      y: isActive ? -3 : 0,
                      opacity: activeLens && !isActive ? 0.72 : 1,
                    }}
                    className="relative flex items-center justify-between"
                    transition={{ duration: reduceMotion ? 0.01 : 0.28 }}
                  >
                    <span className="rounded-full border border-white/20 px-3 py-1 font-mono text-xs uppercase tracking-[0.22em]">
                      {panel.title}
                    </span>
                    <motion.span
                      animate={{
                        x: isActive ? 4 : 0,
                        opacity: isActive ? 1 : 0.76,
                      }}
                      className="font-mono text-xs uppercase tracking-[0.22em]"
                      style={{ color: panel.accent }}
                      transition={{ duration: reduceMotion ? 0.01 : 0.28 }}
                    >
                      enter →
                    </motion.span>
                  </motion.div>
                  <motion.div
                    animate={{
                      y: isActive ? -2 : 0,
                      opacity: activeLens && !isActive ? 0.84 : 1,
                    }}
                    className="relative"
                    transition={{ duration: reduceMotion ? 0.01 : 0.32 }}
                  >
                    <motion.div
                      animate={{
                        scale: isActive ? 1.02 : 1,
                        borderColor: isActive ? `${panel.accent}66` : 'rgba(255,255,255,0.1)',
                        boxShadow: isActive ? `0 18px 40px ${panel.accent}22` : '0 12px 24px rgba(0,0,0,0.12)',
                        filter: isActive ? 'brightness(1.08)' : 'brightness(1)',
                      }}
                      className="mb-4 h-28 rounded-[20px] border bg-white/5 backdrop-blur-sm"
                      transition={{ duration: reduceMotion ? 0.01 : 0.35 }}
                    >
                      {panel.lens === 'web3' ? (
                        <div className="hex-grid h-full rounded-[20px]" />
                      ) : panel.lens === 'cybersecurity' ? (
                        <div className="flex h-full items-center px-4 font-mono text-sm text-[#00FF41]">
                          <span className="terminal-caret">root@rafif:~$</span>
                        </div>
                      ) : (
                        <div className="grain h-full bg-[linear-gradient(135deg,rgba(255,255,255,0.8),rgba(231,183,122,0.35))]" />
                      )}
                    </motion.div>
                    <motion.h2
                      animate={{ y: isActive ? -2 : 0 }}
                      className="font-heading text-3xl md:text-4xl"
                      transition={{ duration: reduceMotion ? 0.01 : 0.25 }}
                    >
                      {panel.title}
                    </motion.h2>
                    <p className="mt-3 max-w-md text-base leading-7 text-white/78">{panel.copy}</p>
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Subtle connection link */}
        <div className="mt-6 flex justify-center pb-6">
          <Link
            className="group flex items-center gap-2 rounded-full border border-white/5 px-4 py-2 font-mono text-xs text-white/30 transition-all hover:border-white/15 hover:text-white/60"
            to="/connections"
          >
            <svg
              className="h-3.5 w-3.5 transition-transform group-hover:rotate-12"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Lihat bagaimana semuanya terhubung
          </Link>
        </div>
      </div>
    </motion.main>
  )
}

export default LensSelectionPage
