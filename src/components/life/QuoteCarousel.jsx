import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

function QuoteCarousel({ quotes }) {
  const [index, setIndex] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return undefined

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % quotes.length)
    }, 6000)

    return () => window.clearInterval(timer)
  }, [quotes.length, reduceMotion])

  return (
    <div className="section-frame grain relative overflow-hidden p-8">
      <div className="relative min-h-[150px]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl font-heading text-3xl italic leading-tight text-text md:text-4xl"
            exit={{ opacity: 0, y: -12 }}
            initial={{ opacity: 0, y: 12 }}
            key={quotes[index]}
            transition={{ duration: reduceMotion ? 0.01 : 0.45 }}
          >
            “{quotes[index]}”
          </motion.blockquote>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default QuoteCarousel
