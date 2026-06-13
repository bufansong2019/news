import { Link } from 'react-router-dom'
import { getDateSortedArticles } from '@/lib/content'
import ArticleCard from '@/components/article/ArticleCard'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import EmptyState from '@/components/ui/EmptyState'

export default function RecentArticles() {
  const articles = getDateSortedArticles().slice(0, 5)
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[18px] font-semibold">最新资讯</h3>
          <Link to="/category" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors no-underline">
            查看全部
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        {articles.length === 0 ? (
          <EmptyState title="暂无文章" />
        ) : (
          articles.map(article => (
            <ArticleCard key={article.slug} article={article} />
          ))
        )}
      </CardContent>
    </Card>
  )
}
