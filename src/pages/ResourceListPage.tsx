import { useParams, useSearchParams } from 'react-router-dom'
import ResourceCard from '@/components/resource/ResourceCard'
import { useResources } from '@/lib/useResources'
import { paginateArticles } from '@/lib/content'
import PaginationBar from '@/components/ui/PaginationBar'
import PageHeader from '@/components/ui/PageHeader'
import FilterPills from '@/components/ui/FilterPills'
import SEO from '@/components/ui/SEO'
import ErrorState from '@/components/ui/ErrorState'
import EmptyState from '@/components/ui/EmptyState'
import { FolderOpen } from 'lucide-react'
import { resourceCatSlugs, resourceCategories } from '@/lib/resources'

const PAGE_SIZE = 12

export default function ResourceListPage() {
  const { catSlug } = useParams<{ catSlug: string }>()
  const [searchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1', 10) || 1
  const { resources, loading, error, retry } = useResources()

  const activeCat = catSlug ? resourceCatSlugs[catSlug] || '' : ''
  const filtered = activeCat ? resources.filter(r => r.category === activeCat) : resources
  const { items, total } = paginateArticles(filtered, page, PAGE_SIZE)

  const pageTitle = activeCat || '资料库'

  if (loading) {
    return (
      <>
        <SEO title={pageTitle} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <PageHeader icon={FolderOpen} title="资料库" description="PDF 资料在线阅读与下载" />
          <p className="text-sm text-muted-foreground">加载中...</p>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <SEO title={pageTitle} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <PageHeader icon={FolderOpen} title="资料库" description="PDF 资料在线阅读与下载" />
          <ErrorState error={error} onRetry={retry} />
        </div>
      </>
    )
  }

  return (
    <>
      <SEO title={pageTitle} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader icon={FolderOpen} title="资料库" description="PDF 资料在线阅读与下载" />

      <FilterPills
        items={[
          { label: '全部', href: '/resources', value: '' },
          ...resourceCategories.map(slug => ({
            label: resourceCatSlugs[slug],
            href: `/resources/category/${slug}`,
            value: slug,
          })),
        ]}
        activeValue={catSlug || ''}
      />

      {items.length === 0 ? (
        <EmptyState icon={FolderOpen} title="暂无资料" description="该分类下还没有资料" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <ResourceCard key={item.id} resource={item} />
          ))}
        </div>
      )}

      <PaginationBar current={page} total={total} baseUrl={catSlug ? `/resources/category/${catSlug}` : '/resources'} />
      </div>
    </>
  )
}
