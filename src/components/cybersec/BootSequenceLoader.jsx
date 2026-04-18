import { motion, useReducedMotion } from 'framer-motion'

const lines = [
  'Initializing security protocols...',
  'Loading threat intelligence database... [OK]',
  'Establishing encrypted connection... [OK]',
  'Scanning environment... [OK]',
  'Access granted. Welcome.',
]

function BootSequenceLoader() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-40 flex items-center justify-center bg-[#020304]/94 px-6"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.2 }}
    >
      <div className="w-full max-w-2xl rounded-sm border border-accent bg-card p-6 font-mono text-sm text-accent">
        {lines.map((line, index) => (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 6 }}
            key={line}
            transition={{ duration: reduceMotion ? 0.01 : 0.12, delay: reduceMotion ? 0 : index * 0.12 }}
          >
            {line}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default BootSequenceLoader
