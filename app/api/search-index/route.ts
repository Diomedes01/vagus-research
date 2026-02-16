import { NextResponse } from 'next/server'
import { getAllArticles } from '@/lib/articles'
import evidenceData from '@/content/evidence.json'

const videos = [
  { title: 'How Vagus Nerve Stimulation Works', topic: 'Foundation' },
  { title: 'The Cholinergic Anti-Inflammatory Pathway', topic: 'Inflammation' },
  { title: 'taVNS vs Implanted VNS', topic: 'Foundation' },
  { title: 'Vagus Nerve and Sleep', topic: 'Sleep' },
  { title: 'Understanding the Auricular Branch', topic: 'Foundation' },
  { title: 'VNS for Anxiety and Stress', topic: 'Anxiety' },
  { title: 'The Safety Profile of taVNS', topic: 'Safety' },
  { title: 'Future of Neuromodulation', topic: 'Foundation' },
]

const pages = [
  { title: 'Research Library', href: '/library' },
  { title: 'Evidence Database', href: '/evidence' },
  { title: 'Videos', href: '/videos' },
  { title: 'About', href: '/about' },
]

export async function GET() {
  const articles = getAllArticles()

  const items = [
    // Pages
    ...pages.map((p) => ({
      title: p.title,
      type: 'page' as const,
      href: p.href,
    })),
    // Articles
    ...articles.map((a) => ({
      title: a.frontmatter.title,
      type: 'article' as const,
      href: `/library/${a.slug}`,
      meta: `${a.frontmatter.topic} · ${a.frontmatter.readTime}`,
    })),
    // Studies
    ...evidenceData.map((s) => ({
      title: s.title,
      type: 'study' as const,
      href: s.doi || s.pubmedUrl,
      meta: `${s.authors} · ${s.journal} ${s.year}`,
    })),
    // Videos
    ...videos.map((v) => ({
      title: v.title,
      type: 'video' as const,
      href: '/videos',
      meta: v.topic,
    })),
  ]

  return NextResponse.json(items)
}
