import { useEffect } from 'react'
import { useLensStore } from '../store/lensStore'
import { applyTheme } from '../utils/applyTheme'

export function useTheme(theme, lens) {
  const enterLens = useLensStore((state) => state.enterLens)
  const resetLens = useLensStore((state) => state.resetLens)
  const setTransitionState = useLensStore((state) => state.setTransitionState)

  useEffect(() => {
    applyTheme(theme)

    if (lens) {
      enterLens(lens)
      const timer = window.setTimeout(() => {
        setTransitionState('complete')
      }, 450)

      return () => {
        window.clearTimeout(timer)
      }
    }

    resetLens()
    return undefined
  }, [enterLens, lens, resetLens, setTransitionState, theme])
}
