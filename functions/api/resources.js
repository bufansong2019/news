// Pages Function: GET /api/resources

export async function onRequestGet() {
  const resources = [
    { id: 'gaoxiang-zhenti-2024h2', title: '2024下半年高项真题（综合知识）', category: '真题试卷', size: '2.3MB', date: '2025-12-01' },
    { id: 'gaoxiang-dagang', title: '信息系统项目管理师大纲（第4版）', category: '考试大纲', size: '1.1MB', date: '2025-10-15' },
    { id: 'lunwen-moban', title: '高项论文万能写作模板', category: '论文资料', size: '0.5MB', date: '2025-09-20' },
  ]

  return new Response(JSON.stringify(resources), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
