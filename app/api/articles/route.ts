import { NextResponse } from 'next/server'
import { getAllArticles } from '@/lib/articles'

export async function GET() {
  const articles = getAllArticles()

  const data = articles.map((a) => ({
    title: a.frontmatter.title,
    slug: a.slug,
    topic: a.frontmatter.topic,
    tags: a.frontmatter.tags,
    excerpt: a.frontmatter.excerpt,
    date: a.frontmatter.date,
    readTime: a.frontmatter.readTime,
    featured: a.frontmatter.featured,
  }))

  return NextResponse.json(data)
}
