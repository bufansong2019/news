import { Link } from 'react-router-dom'
import type { Article } from '@/types/content'
import { articleUrl, categoryColors } from '@/lib/content'

export default function ArticleCard({ article }: { article: Article }) {
  const { frontmatter } = article
  return (
    <Link to={articleUrl(article)} className="flex flex-row flex-wrap items-center gap-x-2 py-[14px] border-b last:border-b-0 last:pb-0 hover:bg-muted px-3 -mx-3 rounded transition-colors no-underline">
      <span className={`shrink-0 text-[11px] px-[6px] py-[2px] rounded font-medium ${categoryColors[frontmatter.category] || 'bg-muted text-muted-foreground'}`}>
        {frontmatter.category}
      </span>
      {frontmatter.sticky && <span className="shrink-0 text-[11px] px-[6px] py-[2px] rounded font-medium bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">置顶</span>}
      {frontmatter.featured && <span className="shrink-0 text-[11px] px-[6px] py-[2px] rounded font-medium bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">精华</span>}
      {frontmatter.mustread && <span className="shrink-0 text-[11px] px-[6px] py-[2px] rounded font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">必读</span>}
      <span className="text-sm text-foreground truncate min-w-0 flex-1">
        {frontmatter.title}
      </span>
      <span className="text-xs text-muted-foreground shrink-0">{frontmatter.date}</span>
    </Link>
  )
}
