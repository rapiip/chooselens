import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import IdleAlertNotification from '../components/cybersec/IdleAlertNotification'
import BootSequenceLoader from '../components/cybersec/BootSequenceLoader'
import InteractiveTerminal from '../components/cybersec/InteractiveTerminal'
import NmapProjectCard from '../components/cybersec/NmapProjectCard'
import PersistentNav from '../components/common/PersistentNav'
import ReadingProgress from '../components/common/ReadingProgress'
import SoundToggle from '../components/common/SoundToggle'
import { cybersecContent } from '../content/cybersec.content'
import { useDeepLink } from '../hooks/useDeepLink'
import { useEngagementTracker } from '../hooks/useEngagementTracker'
import { useIdleDetection } from '../hooks/useIdleDetection'
import { useTheme } from '../hooks/useTheme'
import { cybersecTheme } from '../themes/cybersec.theme'
import { pageVariants } from '../utils/transitions'

function asciiBar(percent) {
  const filled = Math.round(percent / 5)
  return `[${'█'.repeat(filled)}${'░'.repeat(20 - filled)}] ${percent}%`
}

function CybersecPage() {
  const reduceMotion = useReducedMotion()
  const [showLoader, setShowLoader] = useState(!reduceMotion)
  const [desktopIdleEnabled, setDesktopIdleEnabled] = useState(false)
  const idle = useIdleDetection(30000, desktopIdleEnabled)

  useTheme(cybersecTheme, 'cybersecurity')
  useDeepLink([showLoader])
  useEngagementTracker('cybersecurity', ['about', 'projects', 'skills', 'contact'])

  useEffect(() => {
    if (reduceMotion) return undefined

    const timer = window.setTimeout(() => setShowLoader(false), 1050)
    return () => window.clearTimeout(timer)
  }, [reduceMotion])

  useEffect(() => {
    const syncViewport = () => setDesktopIdleEnabled(window.innerWidth >= 768)
    syncViewport()
    window.addEventListener('resize', syncViewport)
    return () => window.removeEventListener('resize', syncViewport)
  }, [])

  return (
    <motion.main
      animate="animate"
      className="app-shell scanlines relative overflow-hidden"
      exit="exit"
      initial="initial"
      variants={pageVariants.cybersec}
    >
      <AnimatePresence>{showLoader ? <BootSequenceLoader /> : null}</AnimatePresence>
      <ReadingProgress accent="#00FF41" secondary="#FFB700" />
      <IdleAlertNotification idle={idle} />

      <div className="container-wide relative z-10 py-8 md:py-10">
        <section className="grid min-h-[86vh] items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-5 font-mono">
            <p className="eyebrow">Cybersecurity Lens</p>
            <h1 className="terminal-caret text-4xl font-semibold tracking-tight text-accent md:text-6xl">
              {cybersecContent.hero.heading}
            </h1>
            <div className="space-y-2 text-base leading-8 text-text">
              {cybersecContent.hero.lines.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {cybersecContent.hero.ctas.map((cta) => (
                <a
                  className="rounded-sm border border-accent px-4 py-3 text-sm text-text"
                  href={cta.href}
                  key={cta.label}
                  rel={cta.href.startsWith('http') ? 'noreferrer' : undefined}
                  target={cta.href.startsWith('http') ? '_blank' : undefined}
                >
                  [{cta.label}]
                </a>
              ))}
            </div>
          </div>

          <div className="section-frame rounded-sm p-5 font-mono">
            <div className="mb-4 text-accent">root@rafif-alton:~$ cat summary.log</div>
            <div className="space-y-3 text-sm text-muted">
              <div>[INFO] Persona ini mengutamakan struktur dan keterbacaan.</div>
              <div>[INFO] Placeholder dipakai agar tidak ada klaim yang melampaui bukti.</div>
              <div>[INFO] Semua komponen tetap siap diisi report, temuan, dan artefak nyata.</div>
            </div>
          </div>
        </section>

        <section className="py-12 font-mono" id="about">
          <div className="section-frame rounded-sm p-6 md:p-8">
            <div className="text-accent">{cybersecContent.about.command}</div>
            <div className="mt-5 space-y-4 text-base leading-8 text-muted">
              {cybersecContent.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {cybersecContent.about.stats.map((stat) => (
                <div className="rounded-sm border border-border bg-card px-4 py-3 text-sm text-text" key={stat}>
                  {stat}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 font-mono" id="projects">
          <div className="mb-5 text-accent">root@rafif-alton:~$ ls -la assessments/</div>
          <div className="grid gap-5 xl:grid-cols-2">
            {cybersecContent.projects.map((project) => (
              <NmapProjectCard key={project.target} project={project} />
            ))}
          </div>
        </section>

        <section className="grid gap-6 py-12 xl:grid-cols-[0.85fr_1.15fr]" id="skills">
          <div className="section-frame rounded-sm p-6 font-mono">
            <div className="text-accent">root@rafif-alton:~$ cat skills.txt | grep -v "0%"</div>
            <div className="mt-5 space-y-4 text-sm text-text">
              {cybersecContent.skills.map((skill) => (
                <div key={skill.label}>
                  <div>{asciiBar(skill.percent)}</div>
                  <div className="mt-1 text-muted">{skill.label}</div>
                </div>
              ))}
            </div>
          </div>

          <InteractiveTerminal content={cybersecContent} />
        </section>

        <section className="py-12 font-mono" id="contact">
          <div className="section-frame rounded-sm p-6 md:p-8">
            <div className="text-accent">{cybersecContent.contact.heading}</div>
            <p className="mt-4 text-base leading-8 text-muted">{cybersecContent.contact.intro}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {cybersecContent.contact.actions.map((action) => (
                <a
                  className="rounded-sm border border-accent px-4 py-3 text-sm text-text"
                  href={action.href}
                  key={action.label}
                  rel={action.href.startsWith('http') ? 'noreferrer' : undefined}
                  target={action.href.startsWith('http') ? '_blank' : undefined}
                >
                  [{action.label}]
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>

      <PersistentNav anchors={['about', 'projects', 'skills', 'contact']} lens="cybersecurity" />
      <SoundToggle lens="cybersecurity" />
    </motion.main>
  )
}

export default CybersecPage
