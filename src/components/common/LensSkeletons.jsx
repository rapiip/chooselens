import { motion } from 'framer-motion'

// Web3 Skeleton — blinking hex grid with floating particles
export function Web3Skeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0F]">
      <div className="relative w-full max-w-md px-6 text-center">
        {/* Hex grid background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(0,212,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,212,255,0.12) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />

        {/* Pulsing blocks */}
        <div className="relative space-y-4">
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            className="mx-auto h-3 w-24 rounded bg-[#00D4FF]/20"
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            className="mx-auto h-8 w-64 rounded-md bg-[#00D4FF]/10"
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          />
          <motion.div
            animate={{ opacity: [0.15, 0.4, 0.15] }}
            className="mx-auto h-4 w-48 rounded bg-[#00D4FF]/10"
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          />

          {/* Floating particle dots */}
          <div className="mt-8 flex justify-center gap-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                animate={{ y: [-4, 4, -4], opacity: [0.4, 1, 0.4] }}
                className="h-2 w-2 rounded-full bg-[#00D4FF]"
                key={i}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>

          <motion.p
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-[#00D4FF]/60"
            transition={{ duration: 2, repeat: Infinity }}
          >
            Confirming block...
          </motion.p>
        </div>
      </div>
    </div>
  )
}

// Cybersec Skeleton — boot text sequence
export function CybersecSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030508]">
      <div className="w-full max-w-lg px-6 font-mono text-sm">
        <div className="space-y-2 text-[#00FF41]/70">
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0 }}
          >
            [BOOT] Initializing secure environment...
          </motion.div>
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            [LOAD] Mounting encrypted partitions...
          </motion.div>
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            [AUTH] Verifying session integrity...
          </motion.div>
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            className="mt-4 text-[#FFB700]"
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }}
          >
            [WAIT] Rendering terminal interface...
          </motion.div>
        </div>

        {/* Scanline effect */}
        <motion.div
          animate={{ y: ['0%', '100%'] }}
          className="pointer-events-none fixed inset-x-0 top-0 h-1 bg-[#00FF41]/10"
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />

        {/* Blinking cursor */}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          className="mt-4 inline-block text-[#00FF41]"
          transition={{ duration: 1, repeat: Infinity, ease: 'steps(1)' }}
        >
          █
        </motion.span>
      </div>
    </div>
  )
}

// Life Skeleton — soft gradient pulse with warm tones
export function LifeSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAF7]">
      <div className="w-full max-w-sm px-6 text-center">
        {/* Warm gradient orb */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
          className="mx-auto h-32 w-32 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(196,98,45,0.25) 0%, rgba(196,98,45,0.05) 70%, transparent 100%)',
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Content lines */}
        <div className="mt-8 space-y-3">
          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            className="mx-auto h-3 w-20 rounded-full bg-[#C4622D]/15"
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            animate={{ opacity: [0.15, 0.4, 0.15] }}
            className="mx-auto h-6 w-56 rounded-full bg-[#C4622D]/10"
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          />
          <motion.div
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            className="mx-auto h-4 w-40 rounded-full bg-[#C4622D]/10"
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
        </div>

        <motion.p
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          className="mt-8 font-serif text-sm italic text-[#C4622D]/50"
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          Memuat cerita...
        </motion.p>
      </div>
    </div>
  )
}
