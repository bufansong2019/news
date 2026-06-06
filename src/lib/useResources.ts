import { useState, useEffect, useCallback } from 'react'

export interface ResourceData {
  id: string
  title: string
  category: string
  filename: string
  size: string
  date: string
}

const RESOURCES_URL = 'https://public.f1sh.org/news/resources.json'

export function useResources() {
  const [resources, setResources] = useState<ResourceData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchResources = useCallback(() => {
    setLoading(true)
    setError(null)
    fetch(RESOURCES_URL)
      .then(r => {
        if (!r.ok) throw new Error(`请求失败 (${r.status})`)
        return r.json()
      })
      .then(data => {
        setResources(data)
        setLoading(false)
      })
      .catch(e => {
        setError(e.message || '加载失败')
        setLoading(false)
      })
  }, [])

  useEffect(() => { fetchResources() }, [fetchResources])

  return { resources, loading, error, retry: fetchResources }
}

export function useResource(id: string) {
  const { resources, loading, error, retry } = useResources()
  const resource = resources.find(r => r.id === id)
  return { resource, loading, error, retry }
}
