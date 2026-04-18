function TransactionFeed({ items }) {
  return (
    <div className="section-frame glow-border h-full p-5">
      <p className="eyebrow">// mempool.feed</p>
      <div className="mt-4 space-y-3 font-mono text-sm text-muted">
        {items.map((item) => (
          <div className="rounded-md border border-border bg-card px-4 py-3" key={item}>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TransactionFeed
