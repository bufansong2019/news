import { useParams, useSearchParams } from 'react-router-dom'
import ResourceCard from '@/components/resource/ResourceCard'
import { allResources } from '@/lib/resources'
import { paginateArticles } from '@/lib/content'
import PaginationBar from '@/components/ui/PaginationBar'
import PageHeader from '@/components/ui/PageHeader'
import FilterPills from '@/components/ui/FilterPills'
import SEO from '@/components/ui/SEO'
import { FolderOpen } from 'lucide-react'

const PAGE_SIZE = 12

const resourceCatSlugs: Record<string, string> = {
  zhenti: '真题试卷',
  dagang: '考试大纲',
  lunwen: '论文资料',
}
const resourceCategories = Object.keys(resourceCatSlugs)

export default function ResourceListPage() {
  const { catSlug } = useParams<{ catSlug: string }>()
  const [searchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1', 10) || 1

  const activeCat = catSlug ? resourceCatSlugs[catSlug] || '' : ''
  const filtered = activeCat ? allResources.filter(r => r.category === activeCat) : allResources
  const { items: resources, total } = paginateArticles(filtered, page, PAGE_SIZE)

  const pageTitle = activeCat || '资料库'

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

      {resources.length === 0 ? (
        <p className="text-sm text-muted-foreground">暂无资料</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {resources.map(item => (
            <ResourceCard key={item.id} resource={item} />
          ))}
        </div>
      )}

      <PaginationBar current={page} total={total} baseUrl={catSlug ? `/resources/category/${catSlug}` : '/resources'} />
      </div>
    </>
  )
}
