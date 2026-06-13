import { useParams, useSearchParams } from 'react-router-dom'
import { getArticlesByCategory, getSortedArticles, paginateArticles, categoryFromSlug, getCategorySlugs, getSubjectSlugs, subjectFromSlug } from '@/lib/content'
import ArticleCard from '@/components/article/ArticleCard'
import PaginationBar from '@/components/ui/PaginationBar'
import PageHeader from '@/components/ui/PageHeader'
import FilterPills from '@/components/ui/FilterPills'
import SEO from '@/components/ui/SEO'
import EmptyState from '@/components/ui/EmptyState'
import ErrorState from '@/components/ui/ErrorState'
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
  const activeSubject = searchParams.get('subject') || ''

  const categoryName = slug ? categoryFromSlug(slug) : undefined
  let all = categoryName ? getArticlesByCategory(categoryName) : getSortedArticles()

  if (activeSubject) {
    const subjectName = subjectFromSlug(activeSubject)
    if (subjectName) {
      all = all.filter(a => a.frontmatter.subject === subjectName)
    }
  }

  const { items: articles, total } = paginateArticles(all, page, PAGE_SIZE)

  function makeBaseUrl(categorySlug: string | undefined) {
    let url = categorySlug ? `/category/${categorySlug}` : '/category'
    if (activeSubject) url += `?subject=${activeSubject}`
    return url
  }
  const baseUrl = makeBaseUrl(slug)

  if (slug && !categoryName) {
    return (
      <>
        <SEO title="分类不存在" />
        <ErrorState title="分类不存在" error="请检查链接是否正确" />
      </>
    )
  }

  const pageTitle = categoryName || '资讯'
  const pageDesc = categoryName ? `${categoryName}分类下的软考备考文章` : '软考备考资讯 · 政策通知 · 学习经验'

  function subjectHref(subject: string) {
    const params = new URLSearchParams(searchParams)
    if (subject) {
      params.set('subject', subject)
    } else {
      params.delete('subject')
    }
    params.delete('page')
    const qs = params.toString()
    return slug ? `/category/${slug}${qs ? '?' + qs : ''}` : `/category${qs ? '?' + qs : ''}`
  }

  function categoryHref(catSlug: string) {
    const params = new URLSearchParams(searchParams)
    params.delete('page')
    const qs = params.toString()
    const base = catSlug ? `/category/${catSlug}` : '/category'
    return qs ? `${base}?${qs}` : base
  }

  return (
    <>
      <SEO title={pageTitle} description={pageDesc} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader icon={Newspaper} title="资讯" description={pageDesc} />

      <FilterPills
        items={filterTabs.map(tab => ({
          label: tab.label,
          href: categoryHref(tab.value),
          value: tab.value,
        }))}
        activeValue={slug || ''}
      />

      <FilterPills
        items={[
          { label: '全部', href: subjectHref(''), value: '' },
          ...getSubjectSlugs().map(s => ({
            label: subjectFromSlug(s)!,
            href: subjectHref(s),
            value: s,
          })),
        ]}
        activeValue={activeSubject}
      />

      {articles.length === 0 && (
        <EmptyState icon={Newspaper} title="暂无文章" description="该分类下还没有文章" />
      )}
      {articles.map(article => (
        <ArticleCard key={article.slug} article={article} />
      ))}
      <PaginationBar current={page} total={total} baseUrl={baseUrl} />
      </div>
    </>
  )
}
