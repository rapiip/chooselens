import { lazy, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import LensTransition from './components/common/LensTransition'
import RouteMeta from './components/common/RouteMeta'
import LensSelectionPage from './pages/LensSelectionPage'

const Web3Page = lazy(() => import('./pages/Web3Page'))
const CybersecPage = lazy(() => import('./pages/CybersecPage'))
const LifePage = lazy(() => import('./pages/LifePage'))

const routeMeta = {
  '/': {
    title: 'Choose Your Lens',
    description:
      'Pilih cara mengenal Rafif Alton melalui tiga perspektif yang berbeda: Web3, Cybersecurity, dan Kehidupan Saya.',
  },
  '/web3': {
    title: 'Rafif Alton — Web3 Developer & DeFi Researcher',
    description:
      'Building on Lisk. Community-first. On-chain by default. Explore Web3 projects, blockchain research, and ecosystem notes.',
  },
  '/cybersecurity': {
    title: 'Rafif Alton — Penetration Tester & Security Researcher',
    description:
      'A terminal-inspired portfolio focused on web security, vulnerability assessment, and technical credibility.',
  },
  '/life': {
    title: 'Rafif Alton — Mahasiswa, Pelajar, Penulis',
    description:
      'A warmer editorial lens into what Rafif is learning, reading, and thinking about beyond the terminal and the chain.',
  },
}

function App() {
  const location = useLocation()
  const meta = routeMeta[location.pathname] ?? routeMeta['/']

  return (
    <>
      <RouteMeta title={meta.title} description={meta.description} />
      <LensTransition />
      <Suspense fallback={null}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LensSelectionPage />} />
            <Route path="/web3" element={<Web3Page />} />
            <Route path="/cybersecurity" element={<CybersecPage />} />
            <Route path="/life" element={<LifePage />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  )
}

export default App
