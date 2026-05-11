import { create } from 'zustand'

const STORAGE_KEY = 'chooselens-last-lens'
const TIMESTAMP_KEY = 'chooselens-last-visit'

function loadSavedLens() {
  try {
    return localStorage.getItem(STORAGE_KEY) || null
  } catch {
    return null
  }
}

function saveLens(lens) {
  try {
    if (lens) {
      localStorage.setItem(STORAGE_KEY, lens)
      localStorage.setItem(TIMESTAMP_KEY, Date.now().toString())
    }
  } catch {
    // localStorage unavailable
  }
}

export const useLensStore = create((set) => ({
  activeLens: null,
  savedLens: loadSavedLens(),
  transitionState: 'idle',
  returnPromptDismissed: false,

  enterLens: (lens) => {
    saveLens(lens)
    set({ activeLens: lens, transitionState: 'transitioning', savedLens: lens })
  },

  switchLens: (lens) => {
    saveLens(lens)
    set({ activeLens: lens, transitionState: 'transitioning', savedLens: lens })
  },

  setTransitionState: (transitionState) => set({ transitionState }),

  resetLens: () => set({ activeLens: null, transitionState: 'idle' }),

  dismissReturnPrompt: () => set({ returnPromptDismissed: true }),

  getSavedLens: () => loadSavedLens(),

  getLastVisitTimestamp: () => {
    try {
      const ts = localStorage.getItem(TIMESTAMP_KEY)
      return ts ? parseInt(ts, 10) : null
    } catch {
      return null
    }
  },
}))
