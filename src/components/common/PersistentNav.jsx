import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toAnchorLabel } from '../../utils/formatters'

const variants = {
  web3: {
    trigger:
      'rounded-[22px] border border-accent bg-card px-4 py-3 font-mono text-xs uppercase tracking-[0.24em] text-text shadow-glow',
    panel: 'rounded-[18px] border border-accent bg-surface p-3 shadow-glow',
  },
  cybersecurity: {
    trigger:
      'rounded-sm border border-accent bg-card px-4 py-3 font-mono text-sm text-text',
    panel: 'rounded-sm border border-accent bg-surface p-3 font-mono',
  },
  life: {
    trigger:
      'rounded-full border border-border bg-card px-4 py-3 font-accent text-sm font-medium text-text shadow-soft',
    panel: 'rounded-[20px] border border-border bg-card p-3 shadow-soft',
  },
}

function PersistentNav({ lens, anchors }) {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const label = useMemo(() => {
    if (lens === 'web3') return 'HEX NAV'
    if (lens === 'cybersecurity') return '[>_]'
    return 'menu'
  }, [lens])

  const styles = variants[lens]

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
            className={`mt-3 min-w-[220px] ${styles.panel}`}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            onMouseLeave={() => setOpen(false)}
            transition={{ duration: 0.18 }}
          >
            <div className="mb-2 border-b border-border pb-2 text-xs uppercase tracking-[0.24em] text-muted">
              {location.pathname}
            </div>
            <div className="flex flex-col gap-2 text-sm">
              {anchors.map((anchor) => (
                <a href={`${location.pathname}#${anchor}`} key={anchor}>
                  {lens === 'cybersecurity' ? `$ jump ${anchor}` : toAnchorLabel(anchor)}
                </a>
              ))}
              <Link to="/">Switch Lens</Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default PersistentNav
