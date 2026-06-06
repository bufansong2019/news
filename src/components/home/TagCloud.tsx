import { Link } from 'react-router-dom'
import { getAllTags } from '@/lib/content'

export default function TagCloud() {
  const tags = getAllTags()
  if (tags.length === 0) return null

  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map(({ tag }) => (
        <Link
          key={tag}
          to={`/search?q=${encodeURIComponent(tag)}`}
          className="inline-flex text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors no-underline"
        >
          {tag}
        </Link>
      ))}
    </div>
  )
}
