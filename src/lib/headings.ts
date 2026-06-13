export interface TocItem {
  id: string
  text: string
  level: number
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9一-鿿\-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

function stripMarkdown(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '$1').replace(/`(.+?)`/g, '$1').replace(/\*(.+?)\*/g, '$1')
}

export function extractHeadings(markdown: string): TocItem[] {
  const regex = /^(#{2,4})\s+(.+)$/gm
  const items: TocItem[] = []
  let match
  while ((match = regex.exec(markdown)) !== null) {
    const text = stripMarkdown(match[2].trim())
    items.push({ id: slugify(text), text, level: match[1].length })
  }
  return items
}

function nodeText(node: any): string {
  if (node.type === 'text') return node.value
  if (node.children) return node.children.map((c: any) => nodeText(c)).join('')
  return ''
}

import { visit } from 'unist-util-visit'

export function rehypeHeadingIds() {
  return (tree: any) => {
    visit(tree, 'element', (node: any) => {
      if (['h2', 'h3', 'h4'].includes(node.tagName)) {
        const text = nodeText(node)
        if (!node.properties) node.properties = {}
        node.properties.id = slugify(text)
        node.properties.style = 'scroll-margin-top: 5rem'
      }
    })
  }
}
