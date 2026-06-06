import type React from 'react'

interface PageHeaderProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

export default function PageHeader({ icon: Icon, title, description }: PageHeaderProps) {
  return (
    <>
      <div className="flex items-center gap-2 mb-1">
        <Icon className="h-5 w-5 text-primary" />
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <p className="text-sm text-muted-foreground mb-6">{description}</p>
    </>
  )
}
