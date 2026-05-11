import { motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllEngagementData, resetEngagementData } from '../hooks/useEngagementTracker'

const lensConfig = {
  web3: {
    label: 'Web3',
    accent: '#00D4FF',
    sections: ['about', 'projects', 'skills', 'contact'],
  },
  cybersecurity: {
    label: 'Cybersecurity',
    accent: '#00FF41',
    sections: ['about', 'projects', 'skills', 'contact'],
  },
  life: {
    label: 'Life',
    accent: '#C4622D',
    sections: ['about', 'journal', 'interests', 'contact'],
  },
}

function formatDuration(seconds) {
  if (!seconds || seconds === 0) return '0s'
  if (seconds < 60) return `${seconds}s`
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`
}

function HeatBar({ value, maxValue, color }) {
  const percent = maxValue > 0 ? Math.min((value / maxValue) * 100, 100) : 0

  return (
    <div className="relative h-6 w-full overflow-hidden rounded-md bg-white/5">
      <motion.div
        animate={{ width: `${percent}%` }}
        className="absolute inset-y-0 left-0 rounded-md"
        initial={{ width: 0 }}
        style={{ backgroundColor: `${color}40` }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        animate={{ width: `${percent}%` }}
        className="absolute inset-y-0 left-0 rounded-md opacity-60"
        initial={{ width: 0 }}
        style={{ backgroundColor: color }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      />
    </div>
  )
}

function LensHeatmap({ lensKey, data, maxSeconds }) {
  const config = lensConfig[lensKey]
  if (!config) return null

  const lensData = data[lensKey] || {}
  const totalSeconds = Object.values(lensData).reduce((sum, s) => sum + (s.seconds || 0), 0)
  const totalVisits = Object.values(lensData).reduce((sum, s) => sum + (s.visits || 0), 0)

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: config.accent }}
          />
          <h3 className="font-mono text-lg font-semibold text-white">
            {config.label}
          </h3>
        </div>
        <div className="flex gap-4 text-xs text-gray-500">
          <span>{formatDuration(totalSeconds)} total</span>
          <span>{totalVisits} section views</span>
        </div>
      </div>

      <div className="space-y-3">
        {config.sections.map((section) => {
          const sectionData = lensData[section] || { seconds: 0, visits: 0 }

          return (
            <div className="grid grid-cols-[100px_1fr_80px_50px] items-center gap-3" key={section}>
              <span className="font-mono text-sm text-gray-400 capitalize">
                {section}
              </span>
              <HeatBar
                color={config.accent}
                maxValue={maxSeconds}
                value={sectionData.seconds}
              />
              <span className="text-right font-mono text-xs text-gray-500">
                {formatDuration(sectionData.seconds)}
              </span>
              <span className="text-right font-mono text-xs text-gray-600">
                {sectionData.visits}x
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function DevHeatmapPage() {
  const [data, setData] = useState({})
  const [lastRefresh, setLastRefresh] = useState(Date.now())

  const refreshData = useCallback(() => {
    setData(getAllEngagementData())
    setLastRefresh(Date.now())
  }, [])

  useEffect(() => {
    refreshData()
    // Auto-refresh every 3 seconds
    const interval = setInterval(refreshData, 3000)
    return () => clearInterval(interval)
  }, [refreshData])

  const handleReset = () => {
    if (window.confirm('Reset all engagement data? This cannot be undone.')) {
      resetEngagementData()
      refreshData()
    }
  }

  // Calculate global max for consistent bar scaling
  const allSeconds = Object.values(data).flatMap((lens) =>
    Object.values(lens).map((s) => s.seconds || 0)
  )
  const maxSeconds = Math.max(...allSeconds, 1)

  // Overall stats
  const totalTime = allSeconds.reduce((sum, s) => sum + s, 0)
  const totalSections = allSeconds.length
  const mostVisitedLens = Object.entries(data).sort(
    (a, b) =>
      Object.values(b[1]).reduce((s, v) => s + (v.seconds || 0), 0) -
      Object.values(a[1]).reduce((s, v) => s + (v.seconds || 0), 0)
  )[0]

  const hasData = totalSections > 0

  return (
    <motion.main
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#07080C] px-6 py-10"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-md border border-[#9AA4FF]/30 bg-[#9AA4FF]/10 px-2 py-1 font-mono text-xs text-[#9AA4FF]">
                /dev
              </span>
              <span className="font-mono text-xs text-gray-600">
                Developer Easter Egg
              </span>
            </div>
            <h1 className="mt-4 font-mono text-3xl font-bold text-white md:text-4xl">
              Visitor Engagement Heatmap
            </h1>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Real-time visualization of how visitors engage with each section across all lenses.
              Data is stored locally in the browser.
            </p>
          </div>
          <Link
            className="rounded-lg border border-white/10 px-4 py-2 font-mono text-sm text-gray-400 transition-colors hover:border-white/20 hover:text-white"
            to="/"
          >
            ← Back
          </Link>
        </div>

        {/* Summary Cards */}
        {hasData && (
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <div className="font-mono text-xs uppercase tracking-wider text-gray-500">
                Total Engagement
              </div>
              <div className="mt-2 font-mono text-2xl font-bold text-white">
                {formatDuration(totalTime)}
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <div className="font-mono text-xs uppercase tracking-wider text-gray-500">
                Sections Tracked
              </div>
              <div className="mt-2 font-mono text-2xl font-bold text-white">
                {totalSections}
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <div className="font-mono text-xs uppercase tracking-wider text-gray-500">
                Most Engaged Lens
              </div>
              <div className="mt-2 font-mono text-2xl font-bold" style={{
                color: mostVisitedLens ? lensConfig[mostVisitedLens[0]]?.accent || '#fff' : '#fff'
              }}>
                {mostVisitedLens ? lensConfig[mostVisitedLens[0]]?.label || '—' : '—'}
              </div>
            </div>
          </div>
        )}

        {/* Heatmaps per lens */}
        {hasData ? (
          <div className="space-y-6">
            {Object.keys(lensConfig).map((lensKey) => (
              <LensHeatmap
                data={data}
                key={lensKey}
                lensKey={lensKey}
                maxSeconds={maxSeconds}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-12 text-center">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-white/5">
              <svg
                className="h-8 w-8 text-gray-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-mono text-lg text-white">No engagement data yet</h3>
            <p className="mt-2 text-sm text-gray-500">
              Visit the lens pages and scroll through sections to start collecting data.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link className="rounded-lg border border-[#00D4FF]/30 px-4 py-2 text-sm text-[#00D4FF]" to="/web3">
                Web3
              </Link>
              <Link className="rounded-lg border border-[#00FF41]/30 px-4 py-2 text-sm text-[#00FF41]" to="/cybersecurity">
                Cybersec
              </Link>
              <Link className="rounded-lg border border-[#C4622D]/30 px-4 py-2 text-sm text-[#C4622D]" to="/life">
                Life
              </Link>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
          <div className="flex items-center gap-3 text-xs text-gray-600">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-500" />
            Auto-refreshing every 3s
            <span className="text-gray-700">|</span>
            Last: {new Date(lastRefresh).toLocaleTimeString()}
          </div>
          <div className="flex gap-3">
            <button
              className="rounded-lg border border-white/10 px-4 py-2 font-mono text-xs text-gray-400 transition-colors hover:border-white/20 hover:text-white"
              onClick={refreshData}
              type="button"
            >
              Refresh
            </button>
            <button
              className="rounded-lg border border-red-500/20 px-4 py-2 font-mono text-xs text-red-400 transition-colors hover:border-red-500/40 hover:text-red-300"
              onClick={handleReset}
              type="button"
            >
              Reset Data
            </button>
          </div>
        </div>

        {/* Raw Data (collapsible) */}
        {hasData && (
          <details className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <summary className="cursor-pointer font-mono text-xs text-gray-500">
              Raw JSON data
            </summary>
            <pre className="mt-4 overflow-x-auto rounded-lg bg-black/30 p-4 font-mono text-xs text-gray-400">
              {JSON.stringify(data, null, 2)}
            </pre>
          </details>
        )}
      </div>
    </motion.main>
  )
}

export default DevHeatmapPage
