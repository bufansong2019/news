import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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

export default function PaginationBar({ current, total, baseUrl }: Props) {
  if (total <= 1) return null

  const pages: number[] = []
  for (let i = 1; i <= total; i++) pages.push(i)

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
      {pages.map(p => (
        <Link
          key={p}
          to={pageUrl(baseUrl, p)}
          className={cn(buttonVariants({ variant: p === current ? 'outline' : 'ghost', size: 'icon' }))}
        >
          {p}
        </Link>
      ))}
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
