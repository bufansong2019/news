import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { useResources } from '@/lib/useResources'
import { cn } from '@/lib/utils'
import TagCloud from '@/components/home/TagCloud'
import { FileText, Sparkles } from 'lucide-react'

function calcDaysUntil(target: Date): number {
  const now = new Date()
  const diff = target.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

const examDate = import.meta.env.VITE_EXAM_DATE || '2026-11-07'

export default function SidebarWidgets() {
  const [days, setDays] = useState(() => calcDaysUntil(new Date(examDate)))
  const { resources } = useResources()
  const hotResources = resources.slice(0, 5)

  useEffect(() => {
    const timer = setInterval(() => setDays(calcDaysUntil(new Date(examDate))), 86400000)
    return () => clearInterval(timer)
  }, [])

  return (
    <aside className="space-y-6">
      {/* 倒计时卡片 */}
      <Card className={cn(
        'text-center border-orange-200 dark:border-orange-800',
        days === 0
          ? 'bg-gradient-to-b from-red-50 via-orange-50 to-yellow-50 dark:from-red-950 dark:to-card'
          : 'bg-gradient-to-b from-orange-50 to-white dark:from-orange-950 dark:to-card'
      )}>
        <CardContent className="p-6">
          {days === 0 ? (
            <>
              <p className="text-lg text-red-600 dark:text-red-400 font-bold mb-2 animate-pulse">
                软考加油，旗开得胜！
              </p>
              <div className="flex items-center justify-center h-[55px] text-red-500 dark:text-red-400 mb-2 animate-pulse">
                <Sparkles className="h-10 w-10" />
              </div>
              <span className="text-xs text-muted-foreground bg-red-100 dark:bg-red-900 px-3 py-1 rounded-full inline-block animate-pulse">
                考试时间: {examDate.split('-')[0]}年{examDate.split('-')[1]}月{examDate.split('-')[2]}日
              </span>
            </>
          ) : (
            <>
              <p className="text-lg text-orange-700 dark:text-orange-400 font-semibold mb-2">
                距离下半年软考统考还剩
              </p>
              <div className="flex items-center justify-center h-[55px] text-[46px] font-extrabold text-orange-500 mb-2">
                {days}
                <span className="text-base font-normal text-muted-foreground ml-1">天</span>
              </div>
              <span className="text-xs text-muted-foreground bg-orange-100 dark:bg-orange-900 px-3 py-1 rounded-full inline-block">
                考试时间: {examDate.split('-')[0]}年{examDate.split('-')[1]}月{examDate.split('-')[2]}日
              </span>
            </>
          )}
        </CardContent>
      </Card>

      {/* 标签云 */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-[18px] font-semibold mb-4">热门标签</h3>
          <TagCloud />
        </CardContent>
      </Card>

      {/* 最新资料 */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-[18px] font-semibold mb-5">最新资料</h3>
          <div className="space-y-3">
            {hotResources.map(item => (
              <Link
                key={item.id}
                to={`/resources/${item.id}`}
                className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors no-underline"
              >
                <FileText className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

    </aside>
  )
}
