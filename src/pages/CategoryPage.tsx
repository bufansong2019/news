import { useParams, useSearchParams } from 'react-router-dom'
import { getArticlesByCategory, getSortedArticles, paginateArticles, categoryFromSlug, getCategorySlugs } from '@/lib/content'
import ArticleCard from '@/components/article/ArticleCard'
import PaginationBar from '@/components/ui/PaginationBar'
import PageHeader from '@/components/ui/PageHeader'
import FilterPills from '@/components/ui/FilterPills'
import SEO from '@/components/ui/SEO'
import { Newspaper } from 'lucide-react'

const PAGE_SIZE = 10

const filterTabs = [
  { label: '全部', value: '' },
  ...getCategorySlugs().map(s => ({ label: categoryFromSlug(s)!, value: s })),
]

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const [searchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1', 10) || 1

  const categoryName = slug ? categoryFromSlug(slug) : undefined
  const all = categoryName ? getArticlesByCategory(categoryName) : getSortedArticles()

  const { items: articles, total } = paginateArticles(all, page, PAGE_SIZE)
  const baseUrl = slug ? `/category/${slug}` : '/category'

  if (slug && !categoryName) {
    return (
      <>
        <SEO title="分类不存在" />
        <p className="text-sm text-muted-foreground p-8">分类不存在</p>
      </>
    )
  }

  const pageTitle = categoryName || '资讯'
  const pageDesc = categoryName ? `${categoryName}分类下的软考备考文章` : '软考备考资讯 · 政策通知 · 学习经验'

  return (
    <>
      <SEO title={pageTitle} description={pageDesc} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader icon={Newspaper} title="资讯" description={pageDesc} />

      <FilterPills
        items={filterTabs.map(tab => ({
          label: tab.label,
          href: tab.value ? `/category/${tab.value}` : '/category',
          value: tab.value,
        }))}
        activeValue={slug || ''}
      />

      {articles.length === 0 && (
        <p className="text-muted-foreground text-sm">暂无文章</p>
      )}
      {articles.map(article => (
        <ArticleCard key={article.slug} article={article} />
      ))}
      <PaginationBar current={page} total={total} baseUrl={baseUrl} />
      </div>
    </>
  )
}
