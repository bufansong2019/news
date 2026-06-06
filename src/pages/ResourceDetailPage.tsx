import { useParams, Link } from 'react-router-dom'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import DetailBreadcrumb from '@/components/ui/DetailBreadcrumb'
import SEO from '@/components/ui/SEO'
import ErrorState from '@/components/ui/ErrorState'
import { cn } from '@/lib/utils'
import { useResource } from '@/lib/useResources'
import { FolderOpen, Download } from 'lucide-react'
import { pdfUrl, categoryToSlug } from '@/lib/resources'

export default function ResourceDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { resource, loading, error, retry } = useResource(id || '')

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
        <p className="text-sm text-muted-foreground">加载中...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <ErrorState error={error} onRetry={retry} />
      </div>
    )
  }

  if (!resource) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h1 className="text-xl font-bold mb-4">资料不存在</h1>
        <Link to="/resources" className="text-primary text-sm hover:underline">返回资料库</Link>
      </div>
    )
  }

  const catSlug = categoryToSlug[resource.category] || ''

  return (
    <>
      <SEO title={resource.title} description={`${resource.category} · ${resource.size}`} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <DetailBreadcrumb
        icon={FolderOpen}
        home="资料库"
        homeHref="/resources"
        category={resource.category}
        categoryHref={catSlug ? `/resources/category/${catSlug}` : undefined}
        title={resource.title}
      >
        <Badge variant="secondary">{resource.category}</Badge>
        <span className="text-sm text-muted-foreground">{resource.date}</span>
      </DetailBreadcrumb>

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{resource.title}</h1>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-sm text-muted-foreground">{resource.size}</span>
          <a
            href={`${pdfUrl(resource.filename)}`}
            download
            className={cn(buttonVariants(), 'inline-flex items-center gap-1')}
          >
            <Download className="h-4 w-4" />
            下载
          </a>
        </div>
      </div>

      <Card>
        <CardContent className="p-0 overflow-hidden rounded-lg" style={{ height: '75vh' }}>
          <iframe
            src={`${pdfUrl(resource.filename)}`}
            className="w-full h-full border-0"
            title={resource.title}
          />
        </CardContent>
      </Card>
      </div>
    </>
  )
}
