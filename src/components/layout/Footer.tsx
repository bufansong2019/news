export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-muted text-muted-foreground text-center py-6 mt-auto text-sm border-t">
      <p>&copy; {year} 软考通备考资讯站 — 让软考更简单</p>
    </footer>
  )
}
