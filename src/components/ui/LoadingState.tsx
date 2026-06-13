import { LoaderCircle } from 'lucide-react'

interface LoadingStateProps {
  text?: string
}

export default function LoadingState({ text = '加载中...' }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center py-16">
      <LoaderCircle className="h-8 w-8 text-muted-foreground/40 mb-4 animate-spin" />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  )
}
