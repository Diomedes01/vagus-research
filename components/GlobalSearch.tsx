'use client'

import { useEffect, useState } from 'react'
import CommandPalette from './CommandPalette'

interface SearchItem {
  title: string
  type: 'article' | 'study' | 'video' | 'page'
  href: string
  meta?: string
}

export default function GlobalSearch() {
  const [items, setItems] = useState<SearchItem[]>([])

  useEffect(() => {
    fetch('/api/search-index')
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch(() => {})
  }, [])

  return <CommandPalette items={items} />
}
