import { Link } from 'react-router-dom'
import type { Article } from '@/types/content'
import { articleUrl, categoryColors } from '@/lib/content'

export default function ArticleCard({ article }: { article: Article }) {
  const { frontmatter } = article
  return (
    <div className="flex items-center justify-between py-[14px] border-b last:border-b-0 last:pb-0">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <span className={`shrink-0 text-[11px] px-[6px] py-[2px] rounded font-medium ${categoryColors[frontmatter.category] || 'bg-muted text-muted-foreground'}`}>
          {frontmatter.category}
        </span>
        {frontmatter.sticky && <span className="shrink-0 text-[11px] px-[6px] py-[2px] rounded font-medium bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">置顶</span>}
        {frontmatter.featured && <span className="shrink-0 text-[11px] px-[6px] py-[2px] rounded font-medium bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">精华</span>}
        <Link to={articleUrl(article)} className="text-sm text-foreground hover:text-primary transition-colors truncate no-underline">
          {frontmatter.title}
        </Link>
      </div>
      <span className="text-xs text-muted-foreground shrink-0 ml-4">{frontmatter.date}</span>
    </div>
  )
}
