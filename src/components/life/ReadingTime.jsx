import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

const WORDS_PER_MINUTE = 200 // Average Indonesian reading speed

function countWords(text) {
  if (!text) return 0
  return text.trim().split(/\s+/).filter(Boolean).length
}

function formatTime(minutes) {
  if (minutes < 1) return '< 1 min'
  if (minutes === 1) return '1 min'
  return `${Math.ceil(minutes)} min`
}

// Calculates reading time for the entire page content
export function useReadingTime(content) {
  return useMemo(() => {
    let totalWords = 0

    // Hero
    totalWords += countWords(content.hero?.tagline)

    // About
    if (content.about?.paragraphs) {
      content.about.paragraphs.forEach((p) => {
        totalWords += countWords(p)
      })
    }

    // Journal entries
    if (content.journalEntries) {
      content.journalEntries.forEach((entry) => {
        totalWords += countWords(entry.title)
        totalWords += countWords(entry.reflection)
      })
    }

    // Quotes
    if (content.quotes) {
      content.quotes.forEach((q) => {
        totalWords += countWords(q)
      })
    }

    // Obsessions
    if (content.obsessions) {
      content.obsessions.forEach((obs) => {
        totalWords += countWords(obs.topic)
        totalWords += countWords(obs.reason)
        totalWords += countWords(obs.resource)
      })
    }

    const minutes = totalWords / WORDS_PER_MINUTE
    return {
      words: totalWords,
      minutes: Math.ceil(minutes),
      formatted: formatTime(minutes),
    }
  }, [content])
}

// Section-level reading time for individual blocks
export function useSectionReadingTime(texts) {
  return useMemo(() => {
    let totalWords = 0
    const textArray = Array.isArray(texts) ? texts : [texts]
    textArray.forEach((t) => {
      totalWords += countWords(t)
    })
    const minutes = totalWords / WORDS_PER_MINUTE
    return {
      words: totalWords,
      minutes: Math.ceil(minutes),
      formatted: formatTime(minutes),
    }
  }, [texts])
}

// Visual component shown at the top of the page
function ReadingTime({ content }) {
  const { words, formatted } = useReadingTime(content)
  const [scrollPercent, setScrollPercent] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const percent = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0
      setScrollPercent(Math.round(percent))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 shadow-soft"
      initial={{ opacity: 0, y: 8 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >
      {/* Book icon */}
      <svg
        className="h-4 w-4 text-accent"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span className="font-accent text-sm text-muted">
        {formatted} baca
      </span>

      <span className="text-xs text-subtle">
        ({words} kata)
      </span>

      {scrollPercent > 5 && (
        <motion.span
          animate={{ opacity: 1 }}
          className="ml-1 font-mono text-xs text-accent"
          initial={{ opacity: 0 }}
        >
          {scrollPercent}%
        </motion.span>
      )}
    </motion.div>
  )
}

// Inline badge for individual sections
export function SectionReadingBadge({ texts }) {
  const { formatted } = useSectionReadingTime(texts)

  return (
    <span className="inline-flex items-center gap-1.5 font-accent text-xs text-subtle">
      <svg
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {formatted}
    </span>
  )
}

export default ReadingTime
