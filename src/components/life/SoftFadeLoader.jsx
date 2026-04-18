import { motion, useReducedMotion } from 'framer-motion'

function SoftFadeLoader() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-40 bg-[#fafaf7]"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.45 }}
    />
  )
}

export default SoftFadeLoader
