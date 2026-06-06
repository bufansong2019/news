import { Link } from 'react-router-dom'
import { BookOpen, Target, Rocket, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const monthNames = ['', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

function getStages() {
  const examDate = import.meta.env.VITE_EXAM_DATE || '2026-11-07'
  const month = parseInt(examDate.slice(5, 7), 10)

  const period冲刺 = monthNames[month]
  const period强化 = monthNames[month - 1]
  const baseStart = month - 3
  const baseEnd = month - 2
  const period基础 = baseStart >= 1 ? `${monthNames[baseStart].replace('月', '')}-${monthNames[baseEnd]}` : monthNames[baseEnd]

  return [
    { icon: BookOpen, title: '基础阶段', period: period基础, desc: '通读教材，建立知识框架，配合大纲梳理考点' },
    { icon: Target, title: '强化阶段', period: period强化, desc: '刷真题、背论文模板，重点攻克计算题和案例分析' },
    { icon: Rocket, title: '冲刺阶段', period: period冲刺, desc: '模拟考试、查漏补缺，调整心态迎接考试' },
  ]
}

export default function SiteActivity() {
  const stages = getStages()
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[18px] font-semibold">备考指南</h3>
          <Link to="/resources" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors no-underline">
            进入资料库
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stages.map((stage) => {
            const Icon = stage.icon
            return (
              <div key={stage.title} className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium">{stage.title}</span>
                  <span className="text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded">{stage.period}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{stage.desc}</p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
