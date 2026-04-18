import PostItCard from './PostItCard'

function CurrentlyObsessedWith({ items }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <PostItCard item={item} key={item.topic} />
      ))}
    </div>
  )
}

export default CurrentlyObsessedWith
