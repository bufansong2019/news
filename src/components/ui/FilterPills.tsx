import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export interface FilterPillItem {
  label: string
  href: string
  value: string
}

interface FilterPillsProps {
  items: FilterPillItem[]
  activeValue: string
}

export default function FilterPills({ items, activeValue }: FilterPillsProps) {
  return (
    <div className="flex flex-wrap gap-1.5 mb-6">
      {items.map(item => (
        <Link
          key={item.value}
          to={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
            'rounded-full text-xs',
            activeValue === item.value && 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
          )}
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}
