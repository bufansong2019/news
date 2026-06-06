export interface ResourceInfo {
  id: string
  title: string
  category: string
  size: string
  date: string
}

export const allResources: ResourceInfo[] = [
  { id: 'gaoxiang-zhenti-2024h2', title: '2024下半年高项真题（综合知识）', category: '真题试卷', size: '2.3MB', date: '2025-12-01' },
  { id: 'gaoxiang-dagang', title: '信息系统项目管理师大纲（第4版）', category: '考试大纲', size: '1.1MB', date: '2025-10-15' },
  { id: 'lunwen-moban', title: '高项论文万能写作模板', category: '论文资料', size: '0.5MB', date: '2025-09-20' },
  { id: 'gaoxiang-zhenti-2024h1', title: '2024上半年高项真题（综合知识）', category: '真题试卷', size: '2.1MB', date: '2025-07-15' },
  { id: 'ruanjian-shejishi-dagang', title: '软件设计师考试大纲', category: '考试大纲', size: '0.8MB', date: '2025-06-01' },
]

export const resourceDetailMap: Record<string, { title: string; filename: string; size: string; date: string; category: string }> = {
  'gaoxiang-zhenti-2024h2': {
    title: '2024下半年高项真题（综合知识）',
    filename: 'gaoxiang-zhenti-2024h2.pdf',
    size: '2.3MB', date: '2025-12-01', category: '真题试卷',
  },
  'gaoxiang-dagang': {
    title: '信息系统项目管理师大纲（第4版）',
    filename: 'gaoxiang-dagang.pdf',
    size: '1.1MB', date: '2025-10-15', category: '考试大纲',
  },
  'lunwen-moban': {
    title: '高项论文万能写作模板',
    filename: 'lunwen-moban.pdf',
    size: '0.5MB', date: '2025-09-20', category: '论文资料',
  },
  'gaoxiang-zhenti-2024h1': {
    title: '2024上半年高项真题（综合知识）',
    filename: 'gaoxiang-zhenti-2024h1.pdf',
    size: '2.1MB', date: '2025-07-15', category: '真题试卷',
  },
  'ruanjian-shejishi-dagang': {
    title: '软件设计师考试大纲',
    filename: 'ruanjian-shejishi-dagang.pdf',
    size: '0.8MB', date: '2025-06-01', category: '考试大纲',
  },
}

export function getSortedResources(): ResourceInfo[] {
  return [...allResources].sort((a, b) => b.date.localeCompare(a.date))
}
