import { AnimatePresence, motion } from 'framer-motion'
import { useAmbientSound } from '../../hooks/useAmbientSound'

const lensStyles = {
  web3: {
    active: 'border-[#00D4FF]/40 bg-[#00D4FF]/10 text-[#00D4FF]',
    inactive: 'border-white/10 bg-white/5 text-gray-500',
    glow: '#00D4FF',
  },
  cybersecurity: {
    active: 'border-[#00FF41]/40 bg-[#00FF41]/10 text-[#00FF41]',
    inactive: 'border-white/10 bg-white/5 text-gray-500',
    glow: '#00FF41',
  },
  life: {
    active: 'border-[#C4622D]/30 bg-[#C4622D]/10 text-[#C4622D]',
    inactive: 'border-black/10 bg-black/5 text-gray-400',
    glow: '#C4622D',
  },
}

function SoundToggle({ lens }) {
  const { muted, isPlaying, toggle } = useAmbientSound(lens)
  const styles = lensStyles[lens] || lensStyles.web3

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <motion.button
        animate={{ scale: 1 }}
        aria-label={muted ? 'Unmute ambient sound' : 'Mute ambient sound'}
        className={`group relative flex items-center gap-2 rounded-full border px-3 py-2.5 backdrop-blur-sm transition-colors ${
          muted ? styles.inactive : styles.active
        }`}
        initial={{ scale: 0.9, opacity: 0 }}
        onClick={toggle}
        title={muted ? 'Click to enable ambient sound' : 'Click to mute'}
        transition={{ delay: 1, duration: 0.3 }}
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Sound wave icon or muted icon */}
        {muted ? (
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-3.72a.75.75 0 0 1 1.28.53v18.88a.75.75 0 0 1-1.28.53l-4.72-3.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-3.72a.75.75 0 0 1 1.28.53v18.88a.75.75 0 0 1-1.28.53l-4.72-3.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}

        {/* Playing indicator — animated bars */}
        <AnimatePresence>
          {isPlaying && !muted && (
            <motion.div
              animate={{ opacity: 1 }}
              className="flex items-end gap-[2px]"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  animate={{ height: [3, 10, 5, 8, 3] }}
                  className="w-[2px] rounded-full"
                  key={i}
                  style={{ backgroundColor: styles.glow }}
                  transition={{
                    duration: 1.2 + i * 0.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.15,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tooltip on hover */}
        <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/90 px-3 py-1.5 text-xs text-gray-300 opacity-0 transition-opacity group-hover:opacity-100">
          {muted ? 'Enable ambient sound' : 'Ambient sound on'}
        </span>
      </motion.button>
    </div>
  )
}

export default SoundToggle
