import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import type { ResourceData } from '@/lib/useResources'
import { FileText, BadgeCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ResourceCard({ resource }: { resource: ResourceData }) {
  return (
    <Link to={`/resources/${resource.id}`}>
      <Card className={cn(
        'hover:border-primary/30 transition-all hover:-translate-y-0.5 h-full relative',
        resource.featured && 'border-amber-300 dark:border-amber-700 bg-gradient-to-br from-amber-50/50 to-white dark:from-amber-950/20 dark:to-card'
      )}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
              resource.featured
                ? "bg-amber-100 dark:bg-amber-900"
                : "bg-blue-50 dark:bg-blue-950"
            )}>
              {resource.featured
                ? <BadgeCheck className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                : <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              }
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-muted-foreground">{resource.category}</span>
              </div>
              <h3 className="text-sm font-semibold mb-1 line-clamp-2">{resource.title}</h3>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{resource.size}</span>
                <span>{resource.date}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
