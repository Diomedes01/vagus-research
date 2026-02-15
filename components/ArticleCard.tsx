import Link from 'next/link'
import TopicTag from './TopicTag'

interface ArticleCardProps {
  title: string
  slug: string
  topic: string
  excerpt: string
  date: string
  readTime: string
}

export default function ArticleCard({
  title,
  slug,
  topic,
  excerpt,
  date,
  readTime,
}: ArticleCardProps) {
  return (
    <Link href={`/library/${slug}`} className="group block">
      <article className="bg-white border border-border rounded-xl p-6 h-full transition-all duration-200 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5">
        <div className="flex items-center gap-3 mb-4">
          <TopicTag topic={topic} />
          <span className="text-xs text-text-light font-mono">{readTime}</span>
        </div>
        <h3 className="font-display text-xl font-medium text-text-primary mb-3 group-hover:text-accent-blue transition-colors leading-snug">
          {title}
        </h3>
        <p className="text-sm text-text-muted leading-relaxed line-clamp-2 mb-4">
          {excerpt}
        </p>
        <time className="text-xs text-text-light font-mono">
          {new Date(date).toLocaleDateString('en-AU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </article>
    </Link>
  )
}
