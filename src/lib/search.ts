import MiniSearch from 'minisearch'
import { allArticles } from '@/lib/content'
import { allResources } from '@/lib/resources'

export type SearchResult = {
  type: 'article' | 'resource'
  slug: string
  title: string
  description: string
  category: string
  date: string
}

const miniSearch = new MiniSearch({
  fields: ['title', 'description', 'content', 'tags'],
  storeFields: ['type', 'slug', 'title', 'description', 'category', 'date'],
  searchOptions: {
    boost: { title: 3, description: 2, content: 1 },
    fuzzy: 0.2,
  },
})

miniSearch.addAll(
  allArticles.map((article, id) => ({
    id: String(id),
    type: 'article',
    slug: article.slug,
    title: article.frontmatter.title,
    description: article.frontmatter.description,
    category: article.frontmatter.category,
    date: article.frontmatter.date,
    content: article.content,
    tags: article.frontmatter.tags.join(' '),
  }))
)

function searchQuery(query: string): SearchResult[] {
  const q = query.trim().toLowerCase()
  if (!q) return []

  const articleResults = miniSearch.search(q).map(r => ({
    type: 'article' as const,
    slug: r.slug as string,
    title: r.title as string,
    description: r.description as string,
    category: r.category as string,
    date: r.date as string,
  }))

  const resourceResults = allResources
    .filter(r => r.title.toLowerCase().includes(q) || r.category.toLowerCase().includes(q))
    .map(r => ({
      type: 'resource' as const,
      slug: r.id,
      title: r.title,
      description: r.category,
      category: r.category,
      date: r.date,
    }))

  return [...articleResults, ...resourceResults]
}

export function searchArticles(query: string): SearchResult[] {
  return searchQuery(query)
}
