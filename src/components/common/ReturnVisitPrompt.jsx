import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLensStore } from '../../store/lensStore'

const lensLabels = {
  web3: 'Web3 Lens',
  cybersecurity: 'Cybersecurity Lens',
  life: 'Kehidupan Saya',
}

const lensRoutes = {
  web3: '/web3',
  cybersecurity: '/cybersecurity',
  life: '/life',
}

const lensAccents = {
  web3: '#00D4FF',
  cybersecurity: '#00FF41',
  life: '#C4622D',
}

function timeAgo(timestamp) {
  const diff = Date.now() - timestamp
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (days > 0) return `${days} hari lalu`
  if (hours > 0) return `${hours} jam lalu`
  if (minutes > 0) return `${minutes} menit lalu`
  return 'baru saja'
}

function ReturnVisitPrompt() {
  const savedLens = useLensStore((state) => state.savedLens)
  const dismissed = useLensStore((state) => state.returnPromptDismissed)
  const dismissReturnPrompt = useLensStore((state) => state.dismissReturnPrompt)
  const getLastVisitTimestamp = useLensStore((state) => state.getLastVisitTimestamp)

  const [visible, setVisible] = useState(false)
  const [lastVisit, setLastVisit] = useState(null)

  useEffect(() => {
    if (!savedLens || dismissed) return

    const ts = getLastVisitTimestamp()
    if (ts) {
      setLastVisit(ts)
      // Only show if last visit was more than 30 seconds ago (not a page reload)
      const elapsed = Date.now() - ts
      if (elapsed > 30000) {
        const timer = setTimeout(() => setVisible(true), 800)
        return () => clearTimeout(timer)
      }
    }
    return undefined
  }, [savedLens, dismissed, getLastVisitTimestamp])

  const handleDismiss = () => {
    setVisible(false)
    dismissReturnPrompt()
  }

  if (!savedLens || dismissed) return null

  const accent = lensAccents[savedLens] || '#9AA4FF'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="fixed bottom-6 left-6 z-50 max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#0E1220]/95 p-5 shadow-2xl backdrop-blur-md"
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-3 flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: accent }}
            />
            <span className="font-mono text-xs uppercase tracking-wider text-gray-400">
              Welcome back
            </span>
          </div>

          <p className="text-sm leading-6 text-gray-200">
            Terakhir kamu di{' '}
            <span className="font-semibold" style={{ color: accent }}>
              {lensLabels[savedLens]}
            </span>
            {lastVisit && (
              <span className="text-gray-500"> ({timeAgo(lastVisit)})</span>
            )}
          </p>

          <div className="mt-4 flex gap-3">
            <Link
              className="rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
              onClick={handleDismiss}
              style={{ backgroundColor: `${accent}22`, border: `1px solid ${accent}44`, color: accent }}
              to={lensRoutes[savedLens]}
            >
              Lanjutkan
            </Link>
            <button
              className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 transition-colors hover:border-white/20 hover:text-gray-200"
              onClick={handleDismiss}
              type="button"
            >
              Pilih ulang
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ReturnVisitPrompt
