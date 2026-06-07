import type React from 'react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { TriangleAlert, RefreshCw } from 'lucide-react'

interface ErrorStateProps {
  error: string
  onRetry?: () => void
  title?: string
  children?: React.ReactNode
}

export default function ErrorState({ error, onRetry, title = '加载失败', children }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center py-16">
      <TriangleAlert className="h-10 w-10 text-red-400 mb-4" />
      <p className="text-sm text-red-500 font-medium mb-1">{title}</p>
      <p className="text-xs text-muted-foreground mb-5">{error}</p>
      {onRetry && (
        <button onClick={onRetry} className={cn(buttonVariants({ variant: 'outline' }), 'inline-flex items-center gap-1.5 cursor-pointer')}>
          <RefreshCw className="h-3.5 w-3.5" />
          重试
        </button>
      )}
      {children}
    </div>
  )
}
