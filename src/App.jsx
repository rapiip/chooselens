import { lazy, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import ErrorBoundary from './components/common/ErrorBoundary'
import LensTransition from './components/common/LensTransition'
import { Web3Skeleton, CybersecSkeleton, LifeSkeleton } from './components/common/LensSkeletons'
import ReturnVisitPrompt from './components/common/ReturnVisitPrompt'
import RouteMeta from './components/common/RouteMeta'
import LensSelectionPage from './pages/LensSelectionPage'
import NotFoundPage from './pages/NotFoundPage'

const Web3Page = lazy(() => import('./pages/Web3Page'))
const CybersecPage = lazy(() => import('./pages/CybersecPage'))
const LifePage = lazy(() => import('./pages/LifePage'))
const DevHeatmapPage = lazy(() => import('./pages/DevHeatmapPage'))
const ConnectionGraphPage = lazy(() => import('./pages/ConnectionGraphPage'))

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
    <ErrorBoundary>
      <RouteMeta title={meta.title} description={meta.description} />
      <LensTransition />
      <ReturnVisitPrompt />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LensSelectionPage />} />
          <Route
            path="/web3"
            element={
              <Suspense fallback={<Web3Skeleton />}>
                <Web3Page />
              </Suspense>
            }
          />
          <Route
            path="/cybersecurity"
            element={
              <Suspense fallback={<CybersecSkeleton />}>
                <CybersecPage />
              </Suspense>
            }
          />
          <Route
            path="/life"
            element={
              <Suspense fallback={<LifeSkeleton />}>
                <LifePage />
              </Suspense>
            }
          />
          <Route
            path="/dev"
            element={
              <Suspense fallback={null}>
                <DevHeatmapPage />
              </Suspense>
            }
          />
          <Route
            path="/connections"
            element={
              <Suspense fallback={null}>
                <ConnectionGraphPage />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </ErrorBoundary>
  )
}

export default App
