import type React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

interface DetailBreadcrumbProps {
  icon: React.ComponentType<{ className?: string }>
  home: string
  homeHref: string
  category?: string
  categoryHref?: string
  title: string
  children?: React.ReactNode
}

export default function DetailBreadcrumb({
  icon: Icon,
  home,
  homeHref,
  category,
  categoryHref,
  title,
  children,
}: DetailBreadcrumbProps) {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-1 min-w-0">
        <button
          onClick={() => navigate(-1)}
          className="shrink-0 p-1 -ml-1 rounded-md hover:bg-muted transition-colors text-muted-foreground"
          aria-label="返回上一页"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground min-w-0">
          <Link to={homeHref} className="flex items-center gap-1 hover:text-primary transition-colors shrink-0">
            <Icon className="h-3.5 w-3.5" />
            {home}
          </Link>
          {category && categoryHref && (
            <>
              <span className="shrink-0">/</span>
              <Link to={categoryHref} className="hover:text-primary transition-colors shrink-0">
                {category}
              </Link>
            </>
          )}
          <span className="shrink-0">/</span>
          <span className="text-foreground truncate">{title}</span>
        </nav>
      </div>
      {children && (
        <div className="flex items-center gap-2 shrink-0">
          {children}
        </div>
      )}
    </div>
  )
}
