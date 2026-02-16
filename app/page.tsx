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
      <section className="bg-bg-primary relative overflow-hidden">
        {/* Decorative nerve pathway SVG */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute right-[-8%] top-1/2 -translate-y-1/2 h-[120%] w-auto hidden md:block"
          style={{ opacity: 0.06 }}
          viewBox="0 0 400 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main trunk */}
          <path
            d="M200 0 C200 60, 195 120, 190 180 C185 240, 175 280, 170 340 C165 400, 160 440, 155 500 C150 560, 148 620, 145 680 C142 740, 140 800, 138 900"
            stroke="#0A1628"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Upper branch — right */}
          <path
            d="M195 120 C220 115, 260 130, 300 110 C320 100, 345 85, 370 75"
            stroke="#0A1628"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Upper branch — left */}
          <path
            d="M198 100 C180 95, 150 105, 120 90 C100 82, 75 70, 50 65"
            stroke="#0A1628"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Upper-right sub-branch */}
          <path
            d="M300 110 C310 130, 330 150, 355 160"
            stroke="#0A1628"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Mid branch — right (cardiac) */}
          <path
            d="M180 260 C210 255, 250 270, 290 250 C310 240, 340 225, 365 220"
            stroke="#0A1628"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Cardiac sub-branch */}
          <path
            d="M260 265 C270 290, 285 310, 310 320"
            stroke="#0A1628"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Mid branch — left (pulmonary) */}
          <path
            d="M175 300 C150 295, 115 310, 80 290 C60 280, 35 265, 15 255"
            stroke="#0A1628"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Pulmonary sub-branch */}
          <path
            d="M115 305 C105 325, 90 345, 65 355"
            stroke="#0A1628"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Lower branch — right (hepatic) */}
          <path
            d="M162 440 C190 435, 230 450, 270 430 C295 420, 320 405, 350 395"
            stroke="#0A1628"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Hepatic sub-branch */}
          <path
            d="M240 445 C250 465, 265 485, 290 495"
            stroke="#0A1628"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Lower branch — left (gastric) */}
          <path
            d="M158 480 C135 478, 100 490, 65 475 C45 467, 25 455, 5 445"
            stroke="#0A1628"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Deep branch — right (intestinal) */}
          <path
            d="M150 580 C175 575, 215 590, 250 575 C275 565, 300 550, 330 540"
            stroke="#0A1628"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Deep branch — left */}
          <path
            d="M148 620 C125 618, 95 630, 60 615 C40 607, 20 595, 0 585"
            stroke="#0A1628"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Terminal branches */}
          <path
            d="M142 720 C165 718, 195 730, 225 720"
            stroke="#0A1628"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M140 760 C120 758, 95 765, 70 755"
            stroke="#0A1628"
            strokeWidth="1"
            strokeLinecap="round"
          />
          {/* Node dots along main trunk */}
          <circle cx="195" cy="120" r="4" fill="#0A1628" />
          <circle cx="190" cy="180" r="3" fill="#0A1628" />
          <circle cx="180" cy="260" r="4" fill="#0A1628" />
          <circle cx="175" cy="300" r="3" fill="#0A1628" />
          <circle cx="170" cy="340" r="4" fill="#0A1628" />
          <circle cx="162" cy="440" r="3" fill="#0A1628" />
          <circle cx="155" cy="500" r="4" fill="#0A1628" />
          <circle cx="150" cy="580" r="3" fill="#0A1628" />
          <circle cx="145" cy="680" r="3" fill="#0A1628" />
          {/* Branch endpoint dots */}
          <circle cx="370" cy="75" r="2.5" fill="#0A1628" />
          <circle cx="50" cy="65" r="2.5" fill="#0A1628" />
          <circle cx="355" cy="160" r="2" fill="#0A1628" />
          <circle cx="365" cy="220" r="2.5" fill="#0A1628" />
          <circle cx="310" cy="320" r="2" fill="#0A1628" />
          <circle cx="15" cy="255" r="2.5" fill="#0A1628" />
          <circle cx="65" cy="355" r="2" fill="#0A1628" />
          <circle cx="350" cy="395" r="2.5" fill="#0A1628" />
          <circle cx="290" cy="495" r="2" fill="#0A1628" />
          <circle cx="330" cy="540" r="2" fill="#0A1628" />
        </svg>

        <div className="max-w-layout mx-auto px-6 py-24 md:py-32 lg:py-40 text-center relative z-10">
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
