import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import type { ResourceData } from '@/lib/useResources'
import { FileText } from 'lucide-react'

export default function ResourceCard({ resource }: { resource: ResourceData }) {
  return (
    <Link to={`/resources/${resource.id}`}>
      <Card className="hover:border-primary/30 transition-all hover:-translate-y-0.5 h-full">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center shrink-0">
              <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs text-muted-foreground mb-1">{resource.category}</div>
              <h3 className="text-sm font-semibold mb-2 line-clamp-2">{resource.title}</h3>
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
