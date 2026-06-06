import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import HomePage from '@/pages/HomePage'
import CategoryPage from '@/pages/CategoryPage'
import ArticlePage from '@/pages/ArticlePage'
import SearchPage from '@/pages/SearchPage'
import AboutPage from '@/pages/AboutPage'
import ResourceListPage from '@/pages/ResourceListPage'
import ResourceDetailPage from '@/pages/ResourceDetailPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="/category/:catSlug/:articleSlug" element={<ArticlePage />} />
          <Route path="/resources" element={<ResourceListPage />} />
          <Route path="/resources/category/:catSlug" element={<ResourceListPage />} />
          <Route path="/resources/:id" element={<ResourceDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
