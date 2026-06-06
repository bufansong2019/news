import SEO from '@/components/ui/SEO'

export default function AboutPage() {
  return (
    <>
      <SEO title="关于" description="软考通资讯站介绍、内容分类和技术栈" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">关于本站</h1>
      <div className="prose prose-sm prose-slate dark:prose-invert max-w-none space-y-4">
        <p>软考通是一个专注于软考备考的轻量级资讯站，由一名正在备战软考高级的考生维护。</p>
        <h2>内容</h2>
        <ul>
          <li><strong>情报速递</strong> — 考试政策、通知、行业资讯</li>
          <li><strong>备考攻略</strong> — 学习计划、资料推荐、工具分享</li>
          <li><strong>知识精粹</strong> — 错题复盘、难点解析、专题笔记</li>
          <li><strong>实战论文</strong> — 论文拆解、范文分析</li>
        </ul>
        <h2>技术栈</h2>
        <p>React + shadcn/ui + Vite，部署于 Cloudflare Pages，PDF 存储于 Cloudflare R2。</p>
      </div>
      </div>
    </>
  )
}
