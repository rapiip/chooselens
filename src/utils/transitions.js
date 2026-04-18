export const pageVariants = {
  selection: {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.65 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  },
  web3: {
    initial: { opacity: 0, y: 26, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8 } },
    exit: { opacity: 0, y: -18, filter: 'blur(6px)', transition: { duration: 0.35 } },
  },
  cybersec: {
    initial: { opacity: 0, x: -16 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.45 } },
    exit: { opacity: 0, x: 16, transition: { duration: 0.2 } },
  },
  life: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.75 } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
  },
}

export const overlayVariants = {
  '/': { background: 'rgba(154, 164, 255, 0.12)' },
  '/web3': { background: 'rgba(0, 212, 255, 0.16)' },
  '/cybersecurity': { background: 'rgba(0, 255, 65, 0.16)' },
  '/life': { background: 'rgba(196, 98, 45, 0.14)' },
}
