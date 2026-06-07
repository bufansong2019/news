import type React from 'react'
import { Inbox } from 'lucide-react'

interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>
  title?: string
  description?: string
}

export default function EmptyState({ icon: Icon = Inbox, title = '暂无内容', description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center py-16">
      <Icon className="h-10 w-10 text-muted-foreground/40 mb-4" />
      <p className="text-sm text-muted-foreground font-medium mb-1">{title}</p>
      {description && <p className="text-xs text-muted-foreground/60">{description}</p>}
    </div>
  )
}
