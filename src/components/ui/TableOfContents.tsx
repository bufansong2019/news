import { cn } from '@/lib/utils'
import type { TocItem } from '@/lib/headings'

interface TableOfContentsProps {
  items: TocItem[]
  activeId: string
  onItemClick?: () => void
}

export default function TableOfContents({ items, activeId, onItemClick }: TableOfContentsProps) {
  if (items.length === 0) return null

  return (
    <nav className="border-l-2 border-border">
      {items.map(item => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={onItemClick}
          className={cn(
            'block text-sm py-1.5 pl-3 no-underline transition-colors border-l-2 -ml-[2px]',
            activeId === item.id
              ? 'text-primary border-primary font-medium'
              : 'text-muted-foreground border-transparent hover:text-foreground',
            item.level === 3 && 'pl-6 text-xs',
            item.level === 4 && 'pl-9 text-xs',
          )}
        >
          {item.text}
        </a>
      ))}
    </nav>
  )
}
