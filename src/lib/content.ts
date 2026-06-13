import type { Article, ArticleFrontmatter } from '@/types/content'

function parseFrontmatter(raw: string): { data: Record<string, string | string[]>; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { data: {}, content: raw.trim() }

  const data: Record<string, string | string[]> = {}
  const lines = match[1].split('\n')

  for (const line of lines) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    let value: string | string[] = line.slice(colonIdx + 1).trim().replace(/^['"]|['"]$/g, '')
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(v => v.trim().replace(/^['"]|['"]$/g, ''))
    }
    data[key] = value
  }

  return { data, content: match[2].trim() }
}

function slugFromPath(path: string): string {
  return path.replace(/\\/g, '/').split('/').pop()?.replace(/\.md$/, '') ?? ''
}

const modules = import.meta.glob('/src/contents/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

export const allArticles: Article[] = Object.entries(modules).map(([path, raw]) => {
  const { data, content } = parseFrontmatter(raw as string)
  const frontmatter: ArticleFrontmatter = {
    title: data.title as string || '',
    date: data.date as string || '',
    category: data.category as string || '',
    tags: (Array.isArray(data.tags) ? data.tags : []) as string[],
    description: data.description as string || '',
    pdf: data.pdf as string | undefined,
    slug: data.slug as string | undefined,
    sticky: data.sticky === 'true',
    featured: data.featured === 'true',
    mustread: data.mustread === 'true',
    subject: data.subject as string | undefined,
  }
  const slug = frontmatter.slug || slugFromPath(path)
  return { slug, frontmatter, content }
})

export function getSortedArticles(): Article[] {
  return [...allArticles].sort((a, b) => {
    if (a.frontmatter.sticky && !b.frontmatter.sticky) return -1
    if (!a.frontmatter.sticky && b.frontmatter.sticky) return 1
    return b.frontmatter.date.localeCompare(a.frontmatter.date)
  })
}

export function getDateSortedArticles(): Article[] {
  return [...allArticles].sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date))
}

export function getArticlesByCategory(category: string): Article[] {
  return allArticles
    .filter(a => a.frontmatter.category === category)
    .sort((a, b) => {
      if (a.frontmatter.sticky && !b.frontmatter.sticky) return -1
      if (!a.frontmatter.sticky && b.frontmatter.sticky) return 1
      return b.frontmatter.date.localeCompare(a.frontmatter.date)
    })
}

export function getArticleBySlug(slug: string): Article | undefined {
  return allArticles.find(a => a.slug === slug)
}

export function getArticleByCategoryAndSlug(catSlug: string, articleSlug: string): Article | undefined {
  const category = categorySlugMap[catSlug]
  if (!category) return undefined
  return allArticles.find(a => a.frontmatter.category === category && a.slug === articleSlug)
}

export function articleUrl(article: Article): string {
  const catSlug = slugToCategory[article.frontmatter.category]
  return catSlug ? `/category/${catSlug}/${article.slug}` : `/article/${article.slug}`
}

const categorySlugMap: Record<string, string> = {
  'news': '软考资讯',
  'guide': '备考攻略',
  'other': '其他内容',
}

const slugToCategory: Record<string, string> = Object.fromEntries(
  Object.entries(categorySlugMap).map(([k, v]) => [v, k])
)

export function getCategorySlugs(): string[] {
  return Object.keys(categorySlugMap)
}

export function categoryFromSlug(slug: string): string | undefined {
  return categorySlugMap[slug]
}

export function slugFromCategory(category: string): string {
  return slugToCategory[category] || category
}

export const subjectSlugMap: Record<string, string> = {
  'software-designer': '软件设计师 [中级]',
}

export const subjectSlugs = Object.keys(subjectSlugMap)

export function getSubjectSlugs(): string[] {
  return subjectSlugs
}

export function subjectFromSlug(slug: string): string | undefined {
  return subjectSlugMap[slug]
}

export const categoryColors: Record<string, string> = {
  '软考资讯': 'bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300',
  '备考攻略': 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  '其他内容': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts: Record<string, number> = {}
  for (const a of allArticles) {
    for (const tag of a.frontmatter.tags) {
      counts[tag] = (counts[tag] || 0) + 1
    }
  }
  return Object.entries(counts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
}

export function paginateArticles<T>(items: T[], page: number, pageSize = 10) {
  const total = Math.max(1, Math.ceil(items.length / pageSize))
  const safePage = Math.max(1, Math.min(page, total))
  return {
    items: items.slice((safePage - 1) * pageSize, safePage * pageSize),
    total,
    page: safePage,
  }
}
