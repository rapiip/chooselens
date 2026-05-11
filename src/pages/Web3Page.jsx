import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import PersistentNav from '../components/common/PersistentNav'
import ReadingProgress from '../components/common/ReadingProgress'
import SoundToggle from '../components/common/SoundToggle'
import BlockConfirmLoader from '../components/web3/BlockConfirmLoader'
import ContractCard from '../components/web3/ContractCard'
import HexParticleBackground from '../components/web3/HexParticleBackground'
import TransactionFeed from '../components/web3/TransactionFeed'
import { useDeepLink } from '../hooks/useDeepLink'
import { useEngagementTracker } from '../hooks/useEngagementTracker'
import { useTheme } from '../hooks/useTheme'
import { web3Content } from '../content/web3.content'
import { web3Theme } from '../themes/web3.theme'
import { pageVariants } from '../utils/transitions'

function Web3Page() {
  const reduceMotion = useReducedMotion()
  const [showLoader, setShowLoader] = useState(!reduceMotion)

  useTheme(web3Theme, 'web3')
  useDeepLink([showLoader])
  useEngagementTracker('web3', ['about', 'projects', 'skills', 'contact'])

  useEffect(() => {
    if (reduceMotion) return undefined

    const timer = window.setTimeout(() => setShowLoader(false), 1100)
    return () => window.clearTimeout(timer)
  }, [reduceMotion])

  return (
    <motion.main
      animate="animate"
      className="app-shell relative overflow-hidden"
      exit="exit"
      initial="initial"
      variants={pageVariants.web3}
    >
      <AnimatePresence>{showLoader ? <BlockConfirmLoader /> : null}</AnimatePresence>
      <ReadingProgress />
      <div className="absolute inset-0">
        <HexParticleBackground />
      </div>

      <div className="container-wide relative z-10 py-8 md:py-10">
        <section className="grid min-h-[90vh] items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <p className="eyebrow">Web3 Lens</p>
            <div className="inline-flex rounded-full border border-accent bg-card px-4 py-2 font-mono text-sm text-accent2">
              {web3Content.hero.address}
            </div>
            <h1 className="max-w-4xl font-heading text-5xl leading-tight md:text-7xl">
              Building systems that feel native to the chain.
            </h1>
            <p className="max-w-2xl text-xl leading-9 text-muted">{web3Content.hero.tagline}</p>
            <div className="flex flex-wrap gap-4">
              {web3Content.hero.ctas.map((cta) => (
                <a
                  className="rounded-md border border-accent bg-card px-5 py-3 font-mono text-sm uppercase tracking-[0.16em] text-text hover:-translate-y-1 hover:border-accent"
                  href={cta.href}
                  key={cta.label}
                  rel={cta.href.startsWith('http') ? 'noreferrer' : undefined}
                  target={cta.href.startsWith('http') ? '_blank' : undefined}
                >
                  {cta.label} →
                </a>
              ))}
            </div>
            <div className="inline-flex items-center gap-3 rounded-md border border-accent bg-card px-4 py-3 font-mono text-sm text-muted">
              <span className="h-2.5 w-2.5 rounded-full bg-[#1ff28f]" />
              {web3Content.hero.status}
            </div>
          </div>

          <div className="section-frame glow-border relative overflow-hidden p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,212,255,0.16),transparent_50%)]" />
            <div className="relative">
              <div className="mx-auto grid h-56 w-56 place-items-center rounded-[30px] border border-accent bg-[radial-gradient(circle_at_30%_30%,rgba(255,215,0,0.25),transparent_30%),radial-gradient(circle_at_70%_60%,rgba(0,212,255,0.24),transparent_35%),#10151f] shadow-glow">
                <div className="grid h-36 w-36 place-items-center rounded-[24px] border border-white/10 bg-card font-heading text-3xl text-accent">
                  0xRA
                </div>
              </div>
              <div className="mt-6 grid gap-3 font-mono text-sm text-muted">
                <div className="rounded-md border border-border bg-card px-4 py-3">module: community-first positioning</div>
                <div className="rounded-md border border-border bg-card px-4 py-3">surface: draft-ready for real case studies</div>
                <div className="rounded-md border border-border bg-card px-4 py-3">mode: frontend + research + ecosystem thinking</div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 py-12 lg:grid-cols-[1.15fr_0.85fr]" id="about">
          <div className="section-frame glow-border p-6 md:p-8">
            <p className="eyebrow">{web3Content.about.title}</p>
            <div className="mt-6 space-y-5 text-lg leading-8 text-muted">
              {web3Content.about.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            {web3Content.about.stats.map((stat) => (
              <div className="section-frame glow-border p-5" key={stat.label}>
                <div className="font-mono text-xs uppercase tracking-[0.22em] text-muted">{stat.label}</div>
                <div className="mt-3 font-heading text-2xl text-text">{stat.value}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12" id="projects">
          <div className="mb-6 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">// deployed_contracts/</p>
              <h2 className="mt-3 font-heading text-4xl text-text">Projects & signals</h2>
            </div>
          </div>
          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
              {web3Content.projects.map((project) => (
                <ContractCard key={project.name} project={project} />
              ))}
            </div>
            <TransactionFeed items={web3Content.transactionFeed} />
          </div>
        </section>

        <section className="py-12" id="skills">
          <div className="section-frame glow-border overflow-hidden p-6 md:p-8">
            <p className="eyebrow">// stack.json</p>
            <div className="mt-6 overflow-x-auto rounded-md border border-border bg-card p-5 font-mono text-sm leading-8 text-text">
              <div>{'{'}</div>
              {Object.entries(web3Content.skills).map(([group, values], groupIndex, groups) => (
                <div className="pl-6" key={group}>
                  <span className="text-accent2">"{group}"</span>: [
                  {values.map((skill, index) => (
                    <span className="relative inline-block pl-2" key={skill.name}>
                      <span className="group cursor-help text-accent" tabIndex={0}>
                        "{skill.name}"
                        <span className="pointer-events-none absolute left-0 top-full z-10 mt-2 hidden rounded-md border border-accent bg-bg px-3 py-2 text-xs text-text group-hover:block group-focus:block">
                          Gas: {skill.gas}
                        </span>
                      </span>
                      {index !== values.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                  ]{groupIndex !== groups.length - 1 ? ',' : ''}
                </div>
              ))}
              <div>{'}'}</div>
            </div>
          </div>
        </section>

        <section className="py-12" id="contact">
          <div className="section-frame glow-border grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-end md:p-8">
            <div>
              <p className="eyebrow">{web3Content.contact.title}</p>
              <h2 className="mt-3 font-heading text-4xl text-text">Open a clean connection path</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">{web3Content.contact.intro}</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              {web3Content.contact.actions.map((action) => (
                <a
                  className="rounded-md border border-accent px-4 py-3 font-mono text-sm uppercase tracking-[0.18em] text-accent"
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

      <PersistentNav anchors={['about', 'projects', 'skills', 'contact']} lens="web3" />
      <SoundToggle lens="web3" />
    </motion.main>
  )
}

export default Web3Page
