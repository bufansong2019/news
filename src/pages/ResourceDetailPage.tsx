import { useParams, Link } from 'react-router-dom'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import DetailBreadcrumb from '@/components/ui/DetailBreadcrumb'
import SEO from '@/components/ui/SEO'
import ErrorState from '@/components/ui/ErrorState'
import { cn } from '@/lib/utils'
import { useResource } from '@/lib/useResources'
import { FolderOpen, Download, FileText, ExternalLink } from 'lucide-react'
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <ErrorState title="资料不存在" error="该资料可能已被删除或链接有误">
          <Link to="/resources" className={cn(buttonVariants({ variant: 'outline' }), 'inline-flex items-center gap-1')}>
            <FolderOpen className="h-3.5 w-3.5" />
            返回资料库
          </Link>
        </ErrorState>
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

      <div className="sm:flex sm:items-center sm:justify-between mb-4">
        <h1 className="text-2xl font-bold">{resource.title}</h1>
        <div className="hidden sm:flex items-center gap-3 shrink-0">
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
      <div className="flex sm:hidden items-center gap-2 mb-4">
        <Badge variant="secondary">{resource.category}</Badge>
        <span className="text-sm text-muted-foreground">{resource.date}</span>
        <span className="text-sm text-muted-foreground">{resource.size}</span>
        <a
          href={`${pdfUrl(resource.filename)}`}
          download
          className={cn(buttonVariants(), 'inline-flex items-center gap-1 ml-auto')}
        >
          <Download className="h-4 w-4" />
          下载
        </a>
      </div>

      <object
        data={pdfUrl(resource.filename)}
        type="application/pdf"
        className="w-full border-0 rounded-lg overflow-hidden"
        style={{ height: '75vh' }}
        title={resource.title}
      >
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <div className="flex flex-col items-center">
            <FileText className="h-10 w-10 text-muted-foreground/40 mb-4" />
            <p className="text-sm text-muted-foreground font-medium">您的浏览器不支持PDF预览</p>
            <p className="text-xs text-muted-foreground/60 mt-1">请在新标签页中打开或下载查看</p>
          </div>
          <a
            href={pdfUrl(resource.filename)}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: 'outline' }), 'inline-flex items-center gap-1')}
          >
            <ExternalLink className="h-4 w-4" />
            在新标签页中打开
          </a>
        </div>
      </object>
      </div>
    </>
  )
}
