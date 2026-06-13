import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getArticleBySlug, getArticleByCategoryAndSlug, categoryFromSlug, categoryColors } from '@/lib/content'
import { Card, CardContent } from '@/components/ui/card'
import DetailBreadcrumb from '@/components/ui/DetailBreadcrumb'
import SEO from '@/components/ui/SEO'

import { Paperclip, Download, Newspaper, List, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import ErrorState from '@/components/ui/ErrorState'
import { buttonVariants } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { extractHeadings, rehypeHeadingIds } from '@/lib/headings'
import TableOfContents from '@/components/ui/TableOfContents'

export default function ArticlePage() {
  const { slug, catSlug, articleSlug } = useParams<{ slug?: string; catSlug?: string; articleSlug?: string }>()
  const article = slug ? getArticleBySlug(slug) : (catSlug && articleSlug ? getArticleByCategoryAndSlug(catSlug, articleSlug) : undefined)

  if (!article) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <ErrorState title="文章不存在" error="该文章可能已被删除或链接有误">
          <Link to="/" className="text-primary text-sm hover:underline">返回首页</Link>
        </ErrorState>
      </div>
    )
  }

  const { frontmatter, content } = article

  const headings = extractHeadings(content)
  const [activeId, setActiveId] = useState(headings.length > 0 ? headings[0].id : '')
  const [mobileTocOpen, setMobileTocOpen] = useState(false)

  useEffect(() => {
    if (headings.length === 0) return
    setActiveId(headings[0].id)
    const onScroll = () => {
      let current = headings[0].id
      for (const item of headings) {
        const el = document.getElementById(item.id)
        if (el && el.getBoundingClientRect().top <= 96) {
          current = item.id
        } else {
          break
        }
      }
      setActiveId(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [headings])

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

      <div className="flex gap-8">
        <article className="flex-1 min-w-0">
          {/* Mobile TOC — floating button + overlay */}
          {headings.length > 0 && (
            <>
              <button
                onClick={() => setMobileTocOpen(true)}
                className="lg:hidden fixed right-6 bottom-20 z-40 h-10 w-10 rounded-full border bg-background shadow-md flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="目录"
              >
                <List className="h-4 w-4" />
              </button>
              {mobileTocOpen && (
                <div className="lg:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between px-4 h-14 border-b shrink-0">
                      <h4 className="text-sm font-semibold">目录</h4>
                      <button
                        onClick={() => setMobileTocOpen(false)}
                        className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-muted transition-colors"
                        aria-label="关闭目录"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto px-4 py-4">
                      <TableOfContents items={headings} activeId={activeId} onItemClick={() => setMobileTocOpen(false)} />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

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
                {frontmatter.sticky && <span className="shrink-0 text-xs px-[6px] py-[2px] rounded font-medium bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">置顶</span>}
                {frontmatter.featured && <span className="shrink-0 text-xs px-[6px] py-[2px] rounded font-medium bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">精华</span>}
                {frontmatter.mustread && <span className="shrink-0 text-xs px-[6px] py-[2px] rounded font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">必读</span>}
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
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHeadingIds]}>{content}</ReactMarkdown>
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

        {/* Desktop TOC */}
        {headings.length > 0 && (
          <aside className="hidden lg:block w-56 shrink-0 self-start sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">目录</h4>
            <TableOfContents items={headings} activeId={activeId} />
          </aside>
        )}
      </div>

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
