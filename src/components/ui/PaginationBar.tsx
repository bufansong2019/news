import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from './button'

interface Props {
  current: number
  total: number
  baseUrl: string
}

function pageUrl(baseUrl: string, page: number): string {
  const separator = baseUrl.includes('?') ? '&' : '?'
  return `${baseUrl}${separator}page=${page}`
}

function getPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const range = 1
  const pages: (number | 'ellipsis')[] = [1]

  const start = Math.max(2, current - range)
  const end = Math.min(total - 1, current + range)

  if (start > 2) pages.push('ellipsis')

  for (let i = start; i <= end; i++) {
    if (i > 1 && i < total) pages.push(i)
  }

  if (end < total - 1) pages.push('ellipsis')

  if (total > 1) pages.push(total)

  return pages
}

export default function PaginationBar({ current, total, baseUrl }: Props) {
  if (total <= 1) return null

  const pages = getPageNumbers(current, total)

  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      {current > 1 && (
        <Link
          to={pageUrl(baseUrl, current - 1)}
          className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      )}
      {pages.map((p, i) =>
        p === 'ellipsis' ? (
          <span key={`e-${i}`} className="flex items-center justify-center w-9 h-9">
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </span>
        ) : (
          <Link
            key={p}
            to={pageUrl(baseUrl, p)}
            className={cn(buttonVariants({ variant: p === current ? 'outline' : 'ghost', size: 'icon' }))}
          >
            {p}
          </Link>
        )
      )}
      {current < total && (
        <Link
          to={pageUrl(baseUrl, current + 1)}
          className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  )
}
