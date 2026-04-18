import { motion, useReducedMotion } from 'framer-motion'

const steps = ['■ □ □  0 / 3 confirmations', '■ ■ □  1 / 3 confirmations', '■ ■ ■  2 / 3 confirmations']

function BlockConfirmLoader() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-40 flex items-center justify-center bg-[#05070c]/88 px-6"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.25 }}
    >
      <div className="w-full max-w-xl rounded-md border border-accent bg-card p-6 font-mono text-sm text-text shadow-glow">
        <div className="text-accent">Block Confirming...</div>
        <div className="mt-4 space-y-2 text-muted">
          {steps.map((step, index) => (
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -8 }}
              key={step}
              transition={{ duration: reduceMotion ? 0.01 : 0.2, delay: reduceMotion ? 0 : index * 0.14 }}
            >
              {step}
            </motion.div>
          ))}
        </div>
        <motion.div
          animate={{ opacity: 1 }}
          className="mt-4 text-accent2"
          initial={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.2, delay: reduceMotion ? 0 : 0.45 }}
        >
          ✓ Confirmed — Web3 Lens ready
        </motion.div>
      </div>
    </motion.div>
  )
}

export default BlockConfirmLoader
