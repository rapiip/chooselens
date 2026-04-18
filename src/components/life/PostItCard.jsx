import { motion } from 'framer-motion'

function PostItCard({ item }) {
  return (
    <motion.article
      className="relative overflow-hidden rounded-[18px] border border-[#d8c9a7] bg-[#fff6d9] p-5 text-[#473924] shadow-soft"
      whileHover={{ y: -6, rotate: -1 }}
    >
      <div className="absolute right-4 top-4 h-12 w-12 rounded-full bg-[#f1d88f]/50 blur-xl" />
      <h3 className="relative font-accent text-lg font-semibold">{item.topic}</h3>
      <p className="relative mt-3 text-sm leading-7">{item.reason}</p>
      <div className="relative mt-5 text-xs uppercase tracking-[0.24em] text-[#886f46]">{item.resource}</div>
    </motion.article>
  )
}

export default PostItCard
