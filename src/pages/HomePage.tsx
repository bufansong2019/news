import WelcomeBanner from '@/components/home/WelcomeBanner'
import RecentArticles from '@/components/home/RecentArticles'
import SiteActivity from '@/components/home/SiteActivity'
import SidebarWidgets from '@/components/home/SidebarWidgets'
import SEO from '@/components/ui/SEO'

export default function HomePage() {
  return (
    <>
      <SEO title="软考通资讯站" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          <div className="space-y-6">
            <WelcomeBanner />
            <RecentArticles />
            <SiteActivity />
          </div>
          <SidebarWidgets />
        </div>
      </div>
    </>
  )
}
