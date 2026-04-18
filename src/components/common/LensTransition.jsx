import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useLensStore } from '../../store/lensStore'
import { overlayVariants } from '../../utils/transitions'

function LensTransition() {
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  const transitionState = useLensStore((state) => state.transitionState)
  const setTransitionState = useLensStore((state) => state.setTransitionState)
  const [visible, setVisible] = useState(false)

  const overlayStyle = useMemo(
    () => overlayVariants[location.pathname] ?? overlayVariants['/'],
    [location.pathname],
  )

  useEffect(() => {
    setVisible(true)
    setTransitionState('transitioning')

    const timer = window.setTimeout(
      () => {
        setVisible(false)
        setTransitionState('complete')
      },
      reduceMotion ? 30 : 650,
    )

    return () => window.clearTimeout(timer)
  }, [location.pathname, reduceMotion, setTransitionState])

  return (
    <motion.div
      aria-hidden="true"
      animate={{
        opacity: visible || transitionState === 'transitioning' ? 1 : 0,
        scaleY: visible ? 1 : 0,
      }}
      className="pointer-events-none fixed inset-0 z-50 origin-top"
      style={overlayStyle}
      transition={{ duration: reduceMotion ? 0.01 : 0.45, ease: 'easeOut' }}
    />
  )
}

export default LensTransition
