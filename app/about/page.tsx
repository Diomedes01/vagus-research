import { Metadata } from 'next'
import Image from 'next/image'
import NewsletterForm from '@/components/NewsletterForm'
import FadeIn from '@/components/FadeIn'
import { generateMetadata as genMeta, generateAboutPageJsonLd } from '@/lib/seo'

const jsonLd = generateAboutPageJsonLd()

export const metadata: Metadata = genMeta({
  title: 'About',
  description:
    'Vagus Research is an academic platform dedicated to curating and communicating the science of vagus nerve stimulation.',
  path: '/about',
})

const approaches = [
  {
    title: 'Peer-Reviewed Only',
    description:
      'Every claim on this platform is grounded in published, peer-reviewed research. We cite specific studies, note sample sizes, and acknowledge methodological limitations.',
  },
  {
    title: 'Verified Citations',
    description:
      'All references are verified against their original sources. We link directly to PubMed, journal pages, and DOIs so you can check the evidence yourself.',
  },
  {
    title: 'No Commercial Bias',
    description:
      'We are an educational resource, not a marketing channel. We use careful language — "research suggests," "evidence indicates" — and never make therapeutic claims.',
  },
]

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/about-hero.png"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#080E1C]/60 dark:bg-[#080E1C]/80" />
        <div className="max-w-layout mx-auto px-6 py-20 md:py-28 relative z-10">
          <FadeIn>
            <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-accent-teal mb-5">
              Our Mission
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 className="font-display text-[40px] md:text-[56px] lg:text-[64px] font-light tracking-[-0.02em] text-white leading-[1.1] max-w-3xl mb-6">
              About Vagus Research
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed">
              An academic-grade information platform dedicated to the science of vagus nerve
              stimulation. Bridging the gap between clinical research and public understanding.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Why This Platform Exists */}
      <section className="bg-bg-white border-y border-border">
        <div className="max-w-layout mx-auto px-6 py-20 md:py-24">
          <FadeIn>
            <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-accent-teal mb-10">
              Why This Platform Exists
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left — pull quote */}
            <FadeIn delay={100}>
              <div>
                <svg width="48" height="40" viewBox="0 0 48 40" fill="none" className="mb-6">
                  <path
                    d="M0 24.8C0 14.4 6.4 6.4 19.2 0L22.4 5.6C15.2 9.6 11.2 14.8 10.4 20.8H19.2V40H0V24.8ZM25.6 24.8C25.6 14.4 32 6.4 44.8 0L48 5.6C40.8 9.6 36.8 14.8 36 20.8H44.8V40H25.6V24.8Z"
                    fill="#00B8A9"
                    opacity="0.25"
                  />
                </svg>
                <p className="font-display text-[24px] md:text-[28px] font-light text-text-primary leading-[1.4] tracking-[-0.01em]">
                  High-quality scientific information should be accessible. We curate, synthesise,
                  and contextualise the peer-reviewed literature so anyone can explore what the
                  science actually shows.
                </p>
              </div>
            </FadeIn>
            {/* Right — body text */}
            <FadeIn delay={200}>
              <div className="space-y-5 text-text-body">
                <p className="leading-relaxed">
                  Vagus nerve stimulation has been the subject of over three decades of clinical
                  research, spanning epilepsy, depression, inflammation, anxiety, and numerous
                  other conditions. Yet much of this evidence remains locked behind journal
                  paywalls or scattered across hundreds of publications.
                </p>
                <p className="leading-relaxed">
                  Vagus Research exists to change that. We make the peer-reviewed literature
                  accessible — without hype, without exaggeration, and without therapeutic claims.
                  Every article is grounded in evidence, every citation is verified, and every
                  claim is carefully qualified.
                </p>
                <p className="leading-relaxed">
                  Whether you&apos;re a researcher, clinician, or simply someone who wants to
                  understand the science, this platform is built for you.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-bg-primary">
        <div className="max-w-layout mx-auto px-6 py-20 md:py-24">
          <FadeIn>
            <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-accent-teal mb-3">
              Our Approach
            </p>
            <h2 className="font-display text-3xl md:text-[36px] text-text-primary mb-12">
              How We Work
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {approaches.map((item, i) => (
              <FadeIn key={item.title} delay={i * 100}>
                <div className="bg-bg-white rounded-xl p-6 h-full border border-border" style={{ borderLeft: '3px solid #00B8A9' }}>
                  <h3 className="font-display text-lg text-text-primary font-medium mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* About Us + Contact */}
      <section className="bg-bg-white border-y border-border">
        <div className="max-w-layout mx-auto px-6 py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left — About Us */}
            <FadeIn>
              <div>
                <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-accent-teal mb-3">
                  About Us
                </p>
                <h2 className="font-display text-3xl text-text-primary mb-6">
                  Based in Melbourne
                </h2>
                <div className="space-y-4 text-text-body">
                  <p className="leading-relaxed">
                    Vagus Research is an initiative by AZOROS PTY LTD, based in Melbourne,
                    Australia. We are dedicated to advancing the field of neuromodulation through
                    education, research communication, and the development of accessible
                    transcutaneous vagus nerve stimulation (taVNS) technology.
                  </p>
                  <p className="leading-relaxed">
                    Our team draws on expertise in neuroscience, clinical research methodology,
                    and science communication to create resources that are both rigorous and
                    accessible.
                  </p>
                  <p className="leading-relaxed">
                    AZOROS is developing a taVNS device informed by the peer-reviewed research
                    presented on this platform. Our approach is research-first — we believe that
                    understanding the science is a prerequisite to building effective technology.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Right — Contact Card */}
            <FadeIn delay={100}>
              <div
                id="contact"
                className="bg-bg-primary rounded-xl p-8 border border-border"
              >
                <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-accent-teal mb-3">
                  Contact
                </p>
                <h3 className="font-display text-2xl text-text-primary mb-6">
                  Get in Touch
                </h3>
                <div className="space-y-5">
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-text-light mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:hello@vagusresearch.com"
                      className="text-accent-blue hover:underline underline-offset-4 transition-colors"
                    >
                      hello@vagusresearch.com
                    </a>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-text-light mb-1">
                      Location
                    </p>
                    <p className="text-text-primary">Melbourne, Victoria, Australia</p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-text-light mb-1">
                      Enquiries
                    </p>
                    <p className="text-sm text-text-muted">
                      Research collaborations, press requests, and general enquiries welcome.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <section className="bg-bg-primary">
        <div className="max-w-layout mx-auto px-6 py-16">
          <FadeIn>
            <div className="bg-bg-white rounded-xl p-6 md:p-8 border border-border" style={{ borderLeft: '3px solid #D97706' }}>
              <h3 className="font-display text-lg text-text-primary mb-3">Medical Disclaimer</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                The content on this website is for informational and educational purposes only.
                It is not intended as medical advice, diagnosis, or treatment. Always consult
                a qualified healthcare professional before making decisions about your health
                or beginning any form of neuromodulation therapy. Vagus nerve stimulation
                devices should only be used under appropriate medical guidance. The information
                presented here is based on peer-reviewed research and should not be interpreted
                as endorsement of any particular treatment or device.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Newsletter */}
      <div className="border-t border-border">
        <NewsletterForm />
      </div>
    </>
  )
}
