import { motion } from 'framer-motion'

function ContractCard({ project }) {
  return (
    <motion.article
      className="section-frame glow-border flex h-full flex-col gap-4 p-5"
      whileHover={{ y: -6 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-heading text-lg text-text">{project.name}</div>
          <div className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            {project.network}
          </div>
        </div>
        <span className="rounded-md border border-accent px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
          {project.status}
        </span>
      </div>
      <p className="text-sm leading-7 text-muted">{project.description}</p>
      <a className="mt-auto font-mono text-sm text-accent" href={project.link}>
        Open slot →
      </a>
    </motion.article>
  )
}

export default ContractCard
