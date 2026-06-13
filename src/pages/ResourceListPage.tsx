import { useParams, useSearchParams } from 'react-router-dom'
import ResourceCard from '@/components/resource/ResourceCard'
import { useResources } from '@/lib/useResources'
import { paginateArticles, subjectFromSlug, getSubjectSlugs } from '@/lib/content'
import PaginationBar from '@/components/ui/PaginationBar'
import PageHeader from '@/components/ui/PageHeader'
import FilterPills from '@/components/ui/FilterPills'
import SEO from '@/components/ui/SEO'
import ErrorState from '@/components/ui/ErrorState'
import EmptyState from '@/components/ui/EmptyState'
import LoadingState from '@/components/ui/LoadingState'
import { FolderOpen } from 'lucide-react'
import { resourceCatSlugs, resourceCategories } from '@/lib/resources'

const PAGE_SIZE = 12

export default function ResourceListPage() {
  const { catSlug } = useParams<{ catSlug: string }>()
  const [searchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1', 10) || 1
  const { resources, loading, error, retry } = useResources()
  const activeSubject = searchParams.get('subject') || ''

  const activeCat = catSlug ? resourceCatSlugs[catSlug] || '' : ''
  let filtered = activeCat ? resources.filter(r => r.category === activeCat) : resources

  if (activeSubject) {
    const subjectName = subjectFromSlug(activeSubject)
    if (subjectName) {
      filtered = filtered.filter(r => r.subject === subjectName)
    }
  }

  const { items, total } = paginateArticles(filtered, page, PAGE_SIZE)

  const pageTitle = activeCat || '资料库'

  function resBaseUrl() {
    let url = catSlug ? `/resources/category/${catSlug}` : '/resources'
    if (activeSubject) url += `?subject=${activeSubject}`
    return url
  }

  function subjectHref(subject: string) {
    const params = new URLSearchParams(searchParams)
    if (subject) {
      params.set('subject', subject)
    } else {
      params.delete('subject')
    }
    params.delete('page')
    const qs = params.toString()
    if (!catSlug) return `/resources${qs ? '?' + qs : ''}`
    return `/resources/category/${catSlug}${qs ? '?' + qs : ''}`
  }

  function categoryHref(cat: string) {
    const params = new URLSearchParams(searchParams)
    params.delete('page')
    const qs = params.toString()
    const base = cat ? `/resources/category/${cat}` : '/resources'
    return qs ? `${base}?${qs}` : base
  }

  if (loading) {
    return (
      <>
        <SEO title={pageTitle} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <PageHeader icon={FolderOpen} title="资料库" description="PDF 资料在线阅读与下载" />
          <LoadingState />
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
          { label: '全部', href: categoryHref(''), value: '' },
          ...resourceCategories.map(slug => ({
            label: resourceCatSlugs[slug],
            href: categoryHref(slug),
            value: slug,
          })),
        ]}
        activeValue={catSlug || ''}
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

      {items.length === 0 ? (
        <EmptyState icon={FolderOpen} title="暂无资料" description="该分类下还没有资料" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <ResourceCard key={item.id} resource={item} />
          ))}
        </div>
      )}

      <PaginationBar current={page} total={total} baseUrl={resBaseUrl()} />
      </div>
    </>
  )
}
