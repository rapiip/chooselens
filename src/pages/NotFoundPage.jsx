import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLensStore } from '../store/lensStore'

const lensStyles = {
  web3: {
    bg: 'bg-[#0A0A0F]',
    accent: 'text-[#00D4FF]',
    border: 'border-[#00D4FF]/20',
    title: '0x404',
    subtitle: 'RESOURCE_NOT_FOUND',
    message: 'The contract you requested does not exist on this chain.',
    btnClass: 'border-[#00D4FF] text-[#00D4FF] hover:bg-[#00D4FF]/10',
    font: 'font-mono',
    decoration: (
      <div className="mb-8 font-mono text-sm text-[#7A8899] space-y-1">
        <div>{'>'} tx_hash: 0x000...dead</div>
        <div>{'>'} block: undefined</div>
        <div>{'>'} status: REVERTED</div>
      </div>
    ),
  },
  cybersecurity: {
    bg: 'bg-[#030508]',
    accent: 'text-[#00FF41]',
    border: 'border-[#00FF41]/20',
    title: 'ERROR 404',
    subtitle: 'SEGMENTATION FAULT',
    message: 'Target not found. Access denied or resource does not exist.',
    btnClass: 'border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41]/10',
    font: 'font-mono',
    decoration: (
      <div className="mb-8 font-mono text-sm text-[#5A7A5A] space-y-1">
        <div>root@rafif-alton:~$ curl -I /unknown</div>
        <div>HTTP/1.1 404 Not Found</div>
        <div>Connection: close</div>
        <div className="text-[#FF3B30]">[!] Target unreachable. Aborting.</div>
      </div>
    ),
  },
  life: {
    bg: 'bg-[#FAFAF7]',
    accent: 'text-[#C4622D]',
    border: 'border-[#C4622D]/15',
    title: 'Halaman tidak ditemukan',
    subtitle: 'Sepertinya kamu tersesat...',
    message: 'Tidak apa-apa. Kadang jalan yang salah justru membawa kita ke tempat yang menarik.',
    btnClass: 'border-[#C4622D]/30 text-[#C4622D] hover:bg-[#C4622D]/5',
    font: 'font-serif',
    decoration: (
      <div className="mb-8 text-lg italic text-[#888880]">
        "Not all those who wander are lost."
      </div>
    ),
  },
}

const defaultStyle = {
  bg: 'bg-[#07080C]',
  accent: 'text-[#9AA4FF]',
  border: 'border-[#9AA4FF]/15',
  title: '404',
  subtitle: 'Page Not Found',
  message: 'The page you are looking for does not exist. Choose a lens to explore.',
  btnClass: 'border-[#9AA4FF]/40 text-[#9AA4FF] hover:bg-[#9AA4FF]/10',
  font: 'font-mono',
  decoration: null,
}

function NotFoundPage() {
  const activeLens = useLensStore((state) => state.activeLens)
  const savedLens = typeof window !== 'undefined' ? localStorage.getItem('chooselens-last-lens') : null
  const lens = activeLens || savedLens
  const style = lensStyles[lens] || defaultStyle

  return (
    <motion.main
      animate={{ opacity: 1, y: 0 }}
      className={`flex min-h-screen items-center justify-center px-6 ${style.bg}`}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-lg text-center">
        <motion.h1
          animate={{ opacity: 1, scale: 1 }}
          className={`${style.font} text-7xl font-bold ${style.accent} md:text-9xl`}
          initial={{ opacity: 0, scale: 0.9 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          {style.title}
        </motion.h1>

        <motion.p
          animate={{ opacity: 1 }}
          className={`mt-4 ${style.font} text-lg tracking-wide ${style.accent} uppercase`}
          initial={{ opacity: 0 }}
          transition={{ delay: 0.25 }}
        >
          {style.subtitle}
        </motion.p>

        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 0.4 }}
        >
          {style.decoration}
        </motion.div>

        <motion.p
          animate={{ opacity: 1 }}
          className="mt-4 text-base leading-7 text-gray-400"
          initial={{ opacity: 0 }}
          transition={{ delay: 0.5 }}
        >
          {style.message}
        </motion.p>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            className={`rounded-md border px-5 py-3 text-sm font-medium transition-colors ${style.btnClass}`}
            to="/"
          >
            {lens === 'life' ? 'Kembali ke Beranda' : lens === 'cybersecurity' ? '$ cd ~/' : lens === 'web3' ? 'Return to Origin' : 'Go Home'}
          </Link>
          {lens && (
            <Link
              className={`rounded-md border px-5 py-3 text-sm font-medium transition-colors ${style.btnClass}`}
              to={`/${lens === 'cybersecurity' ? 'cybersecurity' : lens}`}
            >
              {lens === 'life' ? 'Lanjut Baca' : lens === 'cybersecurity' ? '$ resume session' : lens === 'web3' ? 'Reconnect' : 'Continue'}
            </Link>
          )}
        </motion.div>
      </div>
    </motion.main>
  )
}

export default NotFoundPage
