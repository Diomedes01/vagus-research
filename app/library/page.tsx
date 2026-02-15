'use client'

import { Suspense, useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import ArticleCard from '@/components/ArticleCard'
import SearchBar from '@/components/SearchBar'

interface ArticleData {
  title: string
  slug: string
  topic: string
  tags: string[]
  excerpt: string
  date: string
  readTime: string
  featured: boolean
}

function useArticles() {
  const [articles, setArticles] = useState<ArticleData[]>([])

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => res.json())
      .then(setArticles)
      .catch(() => setArticles([]))
  }, [])

  return articles
}

function LibraryContent() {
  const searchParams = useSearchParams()
  const initialTopic = searchParams.get('topic') || ''

  const [search, setSearch] = useState('')
  const [activeTopic, setActiveTopic] = useState(initialTopic)

  const articles = useArticles()

  const topics = useMemo(() => {
    const set = new Set(articles.map((a) => a.topic))
    return Array.from(set).sort()
  }, [articles])

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      if (activeTopic && article.topic !== activeTopic) return false
      if (search) {
        const q = search.toLowerCase()
        return (
          article.title.toLowerCase().includes(q) ||
          article.excerpt.toLowerCase().includes(q) ||
          article.tags.some((t) => t.toLowerCase().includes(q))
        )
      }
      return true
    })
  }, [articles, activeTopic, search])

  return (
    <div className="max-w-layout mx-auto px-6 py-16 md:py-20">
      <div className="mb-12">
        <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-text-light mb-2">
          Browse & Search
        </p>
        <h1 className="font-display text-4xl md:text-[44px] text-text-primary mb-4">
          Research Library
        </h1>
        <p className="text-text-muted max-w-2xl">
          Explore our collection of evidence-based articles on vagus nerve stimulation,
          covering mechanisms, clinical applications, and the latest research findings.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="md:w-80">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search articles..."
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTopic('')}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
              !activeTopic
                ? 'bg-text-primary text-white'
                : 'bg-white border border-border text-text-muted hover:border-text-light'
            }`}
          >
            All
          </button>
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => setActiveTopic(topic === activeTopic ? '' : topic)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeTopic === topic
                  ? 'bg-text-primary text-white'
                  : 'bg-white border border-border text-text-muted hover:border-text-light'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Article Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.slug}
              title={article.title}
              slug={article.slug}
              topic={article.topic}
              excerpt={article.excerpt}
              date={article.date}
              readTime={article.readTime}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-text-muted">No articles found matching your criteria.</p>
          <button
            onClick={() => {
              setSearch('')
              setActiveTopic('')
            }}
            className="mt-2 text-sm text-accent-blue hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}

export default function LibraryPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-layout mx-auto px-6 py-16 md:py-20">
          <div className="mb-12">
            <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-text-light mb-2">
              Browse & Search
            </p>
            <h1 className="font-display text-4xl md:text-[44px] text-text-primary mb-4">
              Research Library
            </h1>
          </div>
          <div className="text-center py-20 text-text-muted">Loading...</div>
        </div>
      }
    >
      <LibraryContent />
    </Suspense>
  )
}
