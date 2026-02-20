import { notFound } from 'next/navigation'
import { getAllArticles, getArticleBySlug } from '@/lib/articles'
import { generateMetadata as genMeta, generateArticleJsonLd } from '@/lib/seo'
import ArticleCard from '@/components/ArticleCard'
import TableOfContents from '@/components/TableOfContents'
import NewsletterForm from '@/components/NewsletterForm'
import TopicTag from '@/components/TopicTag'
import ReadingProgress from '@/components/ReadingProgress'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import type { Metadata } from 'next'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}

  const ogImage = `/api/og?title=${encodeURIComponent(article.frontmatter.title)}&topic=${encodeURIComponent(article.frontmatter.topic)}`

  return genMeta({
    title: article.frontmatter.title,
    description: article.frontmatter.excerpt,
    path: `/library/${params.slug}`,
    image: ogImage,
    type: 'article',
  })
}

// Simple markdown to HTML converter for article content
function renderMarkdown(content: string): string {
  let html = content
    // Headers
    .replace(/^### (.*$)/gim, '<h3 id="$1">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 id="$1">$1</h2>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p>')
    // Line breaks
    .replace(/\n/g, '<br/>')
    // Lists
    .replace(/^- (.*$)/gim, '<li>$1</li>')

  // Fix heading IDs (remove special chars, lowercase, spaces to hyphens)
  html = html.replace(/id="([^"]*)"/g, (_, id) => {
    const cleanId = id.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
    return `id="${cleanId}"`
  })

  // Wrap in paragraph if not already
  if (!html.startsWith('<')) {
    html = `<p>${html}</p>`
  }

  return html
}

export default function ArticlePage({ params }: PageProps) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  const allArticles = getAllArticles()
  // Prefer same-topic articles, fill with others if needed
  const sameTopic = allArticles.filter(
    (a) => a.slug !== params.slug && a.frontmatter.topic === article.frontmatter.topic
  )
  const others = allArticles.filter(
    (a) => a.slug !== params.slug && a.frontmatter.topic !== article.frontmatter.topic
  )
  const related = [...sameTopic, ...others].slice(0, 3)

  const { frontmatter, content } = article

  return (
    <>
      <ReadingProgress />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateArticleJsonLd({
              title: frontmatter.title,
              description: frontmatter.excerpt,
              datePublished: frontmatter.date,
              url: `https://vagusresearch.com.au/library/${params.slug}`,
              image: frontmatter.image,
            })
          ),
        }}
      />

      <article className="max-w-layout mx-auto px-6 py-12 md:py-16">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Library', href: '/library' },
            { label: frontmatter.title },
          ]}
        />

        <div className="flex gap-16">
          {/* Main content */}
          <div className="flex-1 min-w-0 max-w-article">
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <TopicTag topic={frontmatter.topic} size="md" />
                <span className="text-sm text-text-light font-mono">{frontmatter.readTime}</span>
              </div>
              <h1 className="font-display text-[32px] md:text-[40px] font-medium text-text-primary leading-[1.2] mb-4">
                {frontmatter.title}
              </h1>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4 text-sm text-text-muted">
                  <span>{frontmatter.author}</span>
                  <span className="text-text-light">&middot;</span>
                  <time dateTime={frontmatter.date}>
                    {new Date(frontmatter.date).toLocaleDateString('en-AU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <ShareButtons title={frontmatter.title} slug={params.slug} />
              </div>
            </header>

            {/* Article body */}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-bg-primary border border-border-light rounded-full text-xs text-text-muted font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden xl:block w-64 shrink-0">
            <TableOfContents />
          </aside>
        </div>
      </article>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="bg-white border-t border-border">
          <div className="max-w-layout mx-auto px-6 py-16">
            <h2 className="font-display text-2xl text-text-primary mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((a) => (
                <ArticleCard
                  key={a.slug}
                  title={a.frontmatter.title}
                  slug={a.slug}
                  topic={a.frontmatter.topic}
                  excerpt={a.frontmatter.excerpt}
                  date={a.frontmatter.date}
                  readTime={a.frontmatter.readTime}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <NewsletterForm />
    </>
  )
}
