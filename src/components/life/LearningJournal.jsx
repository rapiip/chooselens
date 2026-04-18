function LearningJournal({ entries }) {
  return (
    <div className="space-y-6">
      {entries.map((entry, index) => (
        <article className="relative pl-8" key={`${entry.date}-${entry.title}`}>
          <div className="absolute left-0 top-2 h-full w-px bg-border" />
          <div className="absolute left-[-6px] top-2 h-3 w-3 rounded-full bg-accent" />
          <div className="font-accent text-xs uppercase tracking-[0.28em] text-muted">{entry.date}</div>
          <h3 className="mt-2 font-heading text-2xl text-text">{entry.title}</h3>
          <p className="mt-3 max-w-2xl text-lg leading-8 text-muted">{entry.reflection}</p>
          {index !== entries.length - 1 ? <div className="mt-6 border-b border-border" /> : null}
        </article>
      ))}
    </div>
  )
}

export default LearningJournal
