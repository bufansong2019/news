export interface ArticleFrontmatter {
  title: string
  date: string
  category: string
  tags: string[]
  description: string
  pdf?: string
  slug?: string
  sticky?: boolean
  featured?: boolean
  mustread?: boolean
  subject?: string
}

export interface Article {
  slug: string
  frontmatter: ArticleFrontmatter
  content: string
}
