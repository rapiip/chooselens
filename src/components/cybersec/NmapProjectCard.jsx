import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

function NmapProjectCard({ project }) {
  const [scanning, setScanning] = useState(false)

  useEffect(() => {
    if (!scanning) return undefined

    const timer = window.setTimeout(() => setScanning(false), 420)
    return () => window.clearTimeout(timer)
  }, [scanning])

  return (
    <motion.article
      className="section-frame relative overflow-hidden rounded-sm p-5 font-mono text-sm"
      onHoverStart={() => setScanning(true)}
      whileHover={{ y: -4 }}
    >
      {scanning ? (
        <div className="absolute inset-0 grid place-items-center bg-[#030508]/92 text-accent">
          Scanning target...
        </div>
      ) : null}
      <div className="space-y-2 text-muted">
        <div>
          <span className="text-accent">TARGET</span> : {project.target}
        </div>
        <div>
          <span className="text-accent">SCAN TYPE</span> : {project.scanType}
        </div>
        <div>
          <span className="text-accent">TOOLS</span> : {project.tools}
        </div>
        <div>
          <span className="text-accent">STATUS</span> : {project.status}
        </div>
      </div>
      <p className="mt-4 leading-7 text-text">{project.findings}</p>
    </motion.article>
  )
}

export default NmapProjectCard
