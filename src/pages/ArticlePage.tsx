import { useParams, Link } from 'react-router-dom'
import { getArticleBySlug, getArticleByCategoryAndSlug, categoryFromSlug, categoryColors } from '@/lib/content'
import { Card, CardContent } from '@/components/ui/card'
import DetailBreadcrumb from '@/components/ui/DetailBreadcrumb'
import SEO from '@/components/ui/SEO'

import { Paperclip, Download, Newspaper } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function ArticlePage() {
  const { slug, catSlug, articleSlug } = useParams<{ slug?: string; catSlug?: string; articleSlug?: string }>()
  const article = slug ? getArticleBySlug(slug) : (catSlug && articleSlug ? getArticleByCategoryAndSlug(catSlug, articleSlug) : undefined)

  if (!article) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h1 className="text-xl font-bold mb-4">文章不存在</h1>
        <Link to="/" className="text-primary text-sm hover:underline">返回首页</Link>
      </div>
    )
  }

  const { frontmatter, content } = article

  return (
    <>
      <SEO title={frontmatter.title} description={frontmatter.description} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <DetailBreadcrumb
        icon={Newspaper}
        home="资讯"
        homeHref="/category"
        category={catSlug ? categoryFromSlug(catSlug) : undefined}
        categoryHref={catSlug ? `/category/${catSlug}` : undefined}
        title={frontmatter.title}
      >
        <span className={`text-[11px] px-[6px] py-[2px] rounded font-medium ${categoryColors[frontmatter.category] || 'bg-muted text-muted-foreground'}`}>
          {frontmatter.category}
        </span>
        <span className="text-sm text-muted-foreground">{frontmatter.date}</span>
      </DetailBreadcrumb>

      <article>
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-bold min-w-0">{frontmatter.title}</h1>
          </div>
          <div className="flex sm:hidden items-center gap-2 mb-2">
            <span className={`text-[11px] px-[6px] py-[2px] rounded font-medium ${categoryColors[frontmatter.category] || 'bg-muted text-muted-foreground'}`}>
              {frontmatter.category}
            </span>
            <span className="text-xs text-muted-foreground">{frontmatter.date}</span>
          </div>
          <p className="text-muted-foreground text-sm">{frontmatter.description}</p>
          {(frontmatter.tags.length > 0 || frontmatter.sticky || frontmatter.featured || frontmatter.mustread) && (
            <div className="flex flex-wrap items-center gap-2 mt-3">
              {frontmatter.sticky && <span className="shrink-0 text-[11px] px-[6px] py-[2px] rounded font-medium bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">置顶</span>}
              {frontmatter.featured && <span className="shrink-0 text-[11px] px-[6px] py-[2px] rounded font-medium bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">精华</span>}
              {frontmatter.mustread && <span className="shrink-0 text-[11px] px-[6px] py-[2px] rounded font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">必读</span>}
              {frontmatter.tags.map(tag => (
                <Link
                  key={tag}
                  to={`/search?q=${encodeURIComponent(tag)}`}
                  className="inline-flex h-5 items-center rounded-full border border-border px-2 py-0.5 text-xs font-medium text-foreground no-underline hover:bg-muted hover:text-muted-foreground transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="prose prose-sm prose-slate dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>

        {frontmatter.pdf && (
          <Card className="mt-8 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Paperclip className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">附件资料</p>
                  <p className="text-xs text-muted-foreground">{frontmatter.pdf}</p>
                </div>
              </div>
              <a
                href={frontmatter.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-1')}
              >
                <Download className="h-3 w-3" />
                下载
              </a>
            </CardContent>
          </Card>
        )}
      </article>

      {/* 评论区占位 */}
      <div className="mt-12 border-t pt-8">
        <p className="text-sm text-muted-foreground text-center">
          评论区（评论插件集成位置）
        </p>
      </div>
      </div>
    </>
  )
}
