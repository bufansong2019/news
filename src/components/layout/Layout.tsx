import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ArrowUpToLine } from 'lucide-react'
import { cn } from '@/lib/utils'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={cn(
          'fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border bg-background shadow-md transition-all hover:bg-muted',
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        )}
        aria-label="回到顶部"
      >
        <ArrowUpToLine className="h-4 w-4" />
      </button>
    </div>
  )
}
