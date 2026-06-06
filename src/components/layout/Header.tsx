import { useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Sun, Moon, Monitor, Menu, X, Search, Home, Newspaper, FolderOpen, Info, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/lib/theme'
import { cn } from '@/lib/utils'

const navItems = [
  { label: '首页', path: '/', icon: Home },
  { label: '资讯', path: '/category', icon: Newspaper },
  { label: '资料库', path: '/resources', icon: FolderOpen },
  { label: '关于', path: '/about', icon: Info },
]

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const searchParams = new URLSearchParams(location.search)
  const q = searchParams.get('q') || ''

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 grid grid-cols-3 items-center">
        <Link to="/" className="flex items-center gap-2 shrink-0 no-underline justify-self-start">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-primary">软考通</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center justify-center gap-6">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'text-sm font-medium transition-colors no-underline inline-flex items-center gap-1.5',
                  isActive(item.path)
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center justify-end gap-1 sm:gap-2">
          {/* Desktop search */}
          <div className="hidden md:relative md:flex items-center">
            <Search className="absolute left-2.5 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              placeholder="搜索文章、资料..."
              defaultValue={q}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && inputRef.current?.value.trim()) {
                  navigate(`/search?q=${encodeURIComponent(inputRef.current.value.trim())}`)
                }
              }}
              className="h-8 w-40 lg:w-56 rounded-md border bg-background pl-8 pr-2 text-xs outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
            />
          </div>

          {/* Mobile search link */}
          <Link
            to="/search"
            className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-muted transition-colors"
          >
            <Search className="h-4 w-4 text-muted-foreground" />
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? '切换深色模式' : theme === 'dark' ? '切换跟随系统' : '切换浅色模式'}
          >
            {theme === 'light' ? (
              <Sun className="h-4 w-4" />
            ) : theme === 'dark' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Monitor className="h-4 w-4" />
            )}
          </Button>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="菜单"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t bg-background px-4 pb-4 pt-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'inline-flex items-center gap-2 text-sm font-medium py-2 px-3 rounded-md transition-colors no-underline',
                  isActive(item.path)
                    ? 'text-primary bg-primary/5'
                    : 'text-muted-foreground hover:text-primary hover:bg-muted'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}
