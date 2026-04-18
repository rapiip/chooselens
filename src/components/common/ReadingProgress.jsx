import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

function ReadingProgress({ accent = 'var(--color-accent-primary)', secondary = 'var(--color-accent-secondary)' }) {
  const { scrollYProgress } = useScroll()
  const reduceMotion = useReducedMotion()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 1000 : 120,
    damping: 30,
    mass: 0.2,
  })

  return (
    <motion.div
      className="read-progress"
      style={{
        scaleX,
        background: `linear-gradient(90deg, ${accent}, ${secondary})`,
      }}
    />
  )
}

export default ReadingProgress
