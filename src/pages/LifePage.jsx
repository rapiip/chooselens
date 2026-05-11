import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import PersistentNav from '../components/common/PersistentNav'
import ReadingProgress from '../components/common/ReadingProgress'
import SoundToggle from '../components/common/SoundToggle'
import CurrentlyObsessedWith from '../components/life/CurrentlyObsessedWith'
import LearningJournal from '../components/life/LearningJournal'
import QuoteCarousel from '../components/life/QuoteCarousel'
import ReadingTime, { SectionReadingBadge } from '../components/life/ReadingTime'
import SoftFadeLoader from '../components/life/SoftFadeLoader'
import { lifeContent } from '../content/life.content'
import { useDeepLink } from '../hooks/useDeepLink'
import { useEngagementTracker } from '../hooks/useEngagementTracker'
import { useTheme } from '../hooks/useTheme'
import { lifeTheme } from '../themes/life.theme'
import { pageVariants } from '../utils/transitions'

function LifePage() {
  const reduceMotion = useReducedMotion()
  const [showLoader, setShowLoader] = useState(!reduceMotion)

  useTheme(lifeTheme, 'life')
  useDeepLink([showLoader])
  useEngagementTracker('life', ['about', 'journal', 'interests', 'contact'])

  useEffect(() => {
    if (reduceMotion) return undefined

    const timer = window.setTimeout(() => setShowLoader(false), 700)
    return () => window.clearTimeout(timer)
  }, [reduceMotion])

  return (
    <motion.main
      animate="animate"
      className="app-shell grain relative overflow-hidden"
      exit="exit"
      initial="initial"
      variants={pageVariants.life}
    >
      <AnimatePresence>{showLoader ? <SoftFadeLoader /> : null}</AnimatePresence>
      <ReadingProgress accent="#C4622D" secondary="#2D6A4F" />

      <div className="container-wide relative z-10 py-8 md:py-10">
        <section className="grid min-h-[88vh] items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="eyebrow">Kehidupan Saya Lens</p>
            <h1 className="mt-4 max-w-3xl font-heading text-5xl leading-tight md:text-7xl">{lifeContent.hero.name}</h1>
            <p className="mt-5 max-w-2xl text-xl leading-9 text-muted">{lifeContent.hero.tagline}</p>
            <div className="mt-6">
              <ReadingTime content={lifeContent} />
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              {lifeContent.hero.ctas.map((cta) => (
                <a
                  className="rounded-full border border-border bg-card px-5 py-3 font-accent text-sm font-medium text-text shadow-soft hover:-translate-y-1"
                  href={cta.href}
                  key={cta.label}
                  rel={cta.href.startsWith('http') || cta.href.startsWith('mailto:') ? 'noreferrer' : undefined}
                  target={cta.href.startsWith('http') ? '_blank' : undefined}
                >
                  {cta.label}
                </a>
              ))}
            </div>
          </div>

          <div className="section-frame grain relative overflow-hidden p-6 md:p-8">
            <div className="absolute inset-x-10 top-8 h-32 rounded-full bg-[#f0cc98]/35 blur-3xl" />
            <div className="relative grid gap-4">
              <div className="h-72 rounded-[28px] bg-[linear-gradient(135deg,#f0ebe4,#e6c9a8)] p-6">
                <div className="h-full rounded-[24px] border border-white/55 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.65),rgba(255,255,255,0.2))]" />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-[18px] bg-card p-4 shadow-soft">
                  <div className="font-accent text-xs uppercase tracking-[0.22em] text-muted">Mood</div>
                  <div className="mt-2 text-lg text-text">Editorial, warm, and deliberately unhurried.</div>
                </div>
                <div className="rounded-[18px] bg-card p-4 shadow-soft">
                  <div className="font-accent text-xs uppercase tracking-[0.22em] text-muted">Current lens</div>
                  <div className="mt-2 text-lg text-text">Learning through context, not just output.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12" id="about">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="section-frame bg-card p-6 md:p-8">
              <div className="flex items-center justify-between">
                <p className="eyebrow">{lifeContent.about.title}</p>
                <SectionReadingBadge texts={lifeContent.about.paragraphs} />
              </div>
              <div className="mt-6 space-y-5 text-xl leading-9 text-muted">
                {lifeContent.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <QuoteCarousel quotes={lifeContent.quotes} />
          </div>
        </section>

        <section className="py-12" id="journal">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Learning Journal</p>
              <h2 className="mt-3 font-heading text-4xl text-text md:text-5xl">Catatan perjalanan belajar</h2>
            </div>
            <SectionReadingBadge
              texts={lifeContent.journalEntries.map((e) => `${e.title} ${e.reflection}`)}
            />
          </div>
          <div className="section-frame bg-card p-6 md:p-8">
            <LearningJournal entries={lifeContent.journalEntries} />
          </div>
        </section>

        <section className="py-12">
          <div className="mb-8">
            <p className="eyebrow">Currently Obsessed With</p>
            <h2 className="mt-3 font-heading text-4xl text-text md:text-5xl">Hal-hal yang sedang saya kejar</h2>
          </div>
          <CurrentlyObsessedWith items={lifeContent.obsessions} />
        </section>

        <section className="py-12" id="interests">
          <div className="section-frame bg-card p-6 md:p-8">
            <p className="eyebrow">Interests</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {lifeContent.interests.map((interest) => (
                <div
                  className="rounded-full border border-border bg-surface px-4 py-3 font-accent text-sm text-text"
                  key={interest}
                >
                  {interest}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12" id="contact">
          <div className="section-frame bg-card p-6 md:p-8">
            <p className="eyebrow">{lifeContent.contact.title}</p>
            <h2 className="mt-3 font-heading text-4xl text-text">Tulis seperti kepada teman.</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">{lifeContent.contact.intro}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {lifeContent.contact.actions.map((action) => (
                <a
                  className="rounded-full border border-border px-5 py-3 font-accent text-sm font-medium text-text shadow-soft"
                  href={action.href}
                  key={action.label}
                  rel={action.href.startsWith('http') ? 'noreferrer' : undefined}
                  target={action.href.startsWith('http') ? '_blank' : undefined}
                >
                  {action.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>

      <PersistentNav anchors={['about', 'journal', 'interests', 'contact']} lens="life" />
      <SoundToggle lens="life" />
    </motion.main>
  )
}

export default LifePage
