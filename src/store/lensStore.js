import { create } from 'zustand'

export const useLensStore = create((set) => ({
  activeLens: null,
  transitionState: 'idle',
  enterLens: (lens) => set({ activeLens: lens, transitionState: 'transitioning' }),
  switchLens: (lens) => set({ activeLens: lens, transitionState: 'transitioning' }),
  setTransitionState: (transitionState) => set({ transitionState }),
  resetLens: () => set({ activeLens: null, transitionState: 'idle' }),
}))
