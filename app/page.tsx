import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard'
import StatsBar from '@/components/StatsBar'
import NewsletterForm from '@/components/NewsletterForm'
import FadeIn from '@/components/FadeIn'
import { getFeaturedArticles } from '@/lib/articles'
import { generateMetadata as genMeta, generateOrganizationJsonLd, generateWebsiteJsonLd } from '@/lib/seo'

export const metadata: Metadata = genMeta({
  title: 'The Science of Vagus Nerve Stimulation',
  description:
    'An academic research platform dedicated to vagus nerve stimulation science. Curated evidence from 177+ studies, peer-reviewed articles, and educational resources.',
  path: '',
})

const topics = [
  'Anxiety',
  'Depression',
  'Sleep',
  'Inflammation',
  'Pain',
  'Epilepsy',
  'Recovery',
  'Neuroplasticity',
  'Gut Health',
  'Heart Health',
  'Tinnitus',
  'PTSD',
]

export default function HomePage() {
  const featured = getFeaturedArticles()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateOrganizationJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateWebsiteJsonLd()),
        }}
      />

      {/* Hero */}
      <section className="bg-bg-primary">
        <div className="max-w-layout mx-auto px-6 py-24 md:py-32 lg:py-40 text-center">
          <FadeIn>
            <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-accent-teal mb-6">
              Evidence-Based Research Platform
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 className="font-display text-[40px] md:text-[56px] lg:text-[64px] font-light tracking-[-0.02em] text-bg-dark leading-[1.1] max-w-4xl mx-auto mb-6">
              The Science of Vagus Nerve Stimulation
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-lg md:text-xl text-text-body max-w-2xl mx-auto leading-relaxed mb-10">
              A curated collection of peer-reviewed research, clinical evidence, and educational
              resources on vagus nerve stimulation.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/library"
                className="inline-flex items-center justify-center px-6 py-3 bg-bg-dark text-white text-sm font-medium rounded-lg hover:bg-bg-dark/90 transition-colors"
              >
                Explore the Library
              </Link>
              <Link
                href="/evidence"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-bg-dark text-sm font-medium rounded-lg border border-border hover:border-text-muted transition-colors"
              >
                Evidence Database
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured Research */}
      <section className="bg-white border-y border-border">
        <div className="max-w-layout mx-auto px-6 py-20 md:py-24">
          <FadeIn>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-text-light mb-2">
                  Latest Research
                </p>
                <h2 className="font-display text-3xl md:text-[36px] text-text-primary">
                  Featured Articles
                </h2>
              </div>
              <Link
                href="/library"
                className="hidden sm:inline-flex items-center text-sm text-accent-blue hover:underline"
              >
                View all
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((article, i) => (
              <FadeIn key={article.slug} delay={i * 100}>
                <ArticleCard
                  title={article.frontmatter.title}
                  slug={article.slug}
                  topic={article.frontmatter.topic}
                  excerpt={article.frontmatter.excerpt}
                  date={article.frontmatter.date}
                  readTime={article.frontmatter.readTime}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <StatsBar />

      {/* Topic Navigator */}
      <section className="bg-bg-primary">
        <div className="max-w-layout mx-auto px-6 py-20 md:py-24 text-center">
          <FadeIn>
            <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-text-light mb-2">
              Browse by Topic
            </p>
            <h2 className="font-display text-3xl md:text-[36px] text-text-primary mb-10">
              Research Areas
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {topics.map((topic) => (
                <Link
                  key={topic}
                  href={`/library?topic=${encodeURIComponent(topic)}`}
                  className="px-5 py-2.5 bg-white border border-border rounded-full text-sm font-medium text-text-body hover:border-accent-teal hover:text-accent-teal transition-colors"
                >
                  {topic}
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Newsletter */}
      <FadeIn>
        <div className="border-t border-border">
          <NewsletterForm />
        </div>
      </FadeIn>
    </>
  )
}
