import { useSearchParams, Link } from 'react-router-dom'
import { searchArticles } from '@/lib/search'
import { paginateArticles, slugFromCategory } from '@/lib/content'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import PaginationBar from '@/components/ui/PaginationBar'
import SEO from '@/components/ui/SEO'
import { Search, Newspaper, FileText } from 'lucide-react'

const PAGE_SIZE = 10

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q') || ''
  const page = parseInt(searchParams.get('page') || '1', 10) || 1
  const results = searchArticles(q)
  const { items, total } = paginateArticles(results, page, PAGE_SIZE)

  return (
    <>
      <SEO title={q ? `搜索: ${q}` : '搜索'} description={`搜索"${q}"的结果`} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-2 mb-2">
        <Search className="h-5 w-5 text-muted-foreground" />
        <h1 className="text-xl font-bold">搜索: &ldquo;{q}&rdquo;</h1>
      </div>
      <p className="text-sm text-muted-foreground mb-6">共找到 {results.length} 条结果</p>

      {items.map((result) => {
        const isArticle = result.type === 'article'
        const link = isArticle
          ? `/category/${slugFromCategory(result.category)}/${result.slug}`
          : `/resources/${result.slug}`
        const Icon = isArticle ? Newspaper : FileText

        return (
          <Link key={`${result.type}-${result.slug}`} to={link}>
            <Card className="mb-3 hover:border-primary/30 transition-all">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs">{result.category}</Badge>
                      {!isArticle && <Badge variant="outline" className="text-xs">资料</Badge>}
                      <span className="text-xs text-muted-foreground">{result.date}</span>
                    </div>
                    <h3 className="font-semibold text-sm">{result.title}</h3>
                    {isArticle && result.description && (
                      <p className="text-xs text-muted-foreground mt-1">{result.description}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}

      {results.length === 0 && q && (
        <p className="text-sm text-muted-foreground">没有找到匹配的结果</p>
      )}

      <PaginationBar current={page} total={total} baseUrl={`/search?q=${encodeURIComponent(q)}`} />
      </div>
    </>
  )
}
