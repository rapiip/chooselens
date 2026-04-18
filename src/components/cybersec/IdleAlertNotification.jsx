import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

function IdleAlertNotification({ idle }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!idle) {
      setVisible(false)
      return
    }

    setVisible(true)
    const timer = window.setTimeout(() => setVisible(false), 3000)
    return () => window.clearTimeout(timer)
  }, [idle])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-24 left-5 z-40 max-w-sm rounded-sm border border-accent2 bg-card p-4 font-mono text-xs text-text"
          exit={{ opacity: 0, y: 10 }}
          initial={{ opacity: 0, y: 10 }}
        >
          <div className="text-accent2">[ALERT] Unusual inactivity detected</div>
          <div className="mt-2 text-muted">Monitoring continued. Threat neutralized automatically.</div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default IdleAlertNotification
