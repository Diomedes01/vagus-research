import { Metadata } from 'next'
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

const stats = [
  { value: '30+', label: 'Years of VNS Research' },
  { value: '55', label: 'Verified Studies' },
  { value: 'Melbourne', label: 'Australia' },
]

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
      <section className="relative overflow-hidden" style={{ backgroundColor: '#080E1C' }}>
        {/* Background pulse decoration */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
          <svg width="600" height="600" viewBox="0 0 600 600" fill="none">
            <circle cx="300" cy="300" r="250" stroke="#00C8B4" strokeWidth="1" />
            <circle cx="300" cy="300" r="180" stroke="#00C8B4" strokeWidth="0.5" />
            <circle cx="300" cy="300" r="110" stroke="#00C8B4" strokeWidth="0.5" />
            <path
              d="M50 300 L150 300 L190 180 L230 420 L270 120 L310 400 L350 300 L550 300"
              stroke="#00C8B4"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="max-w-layout mx-auto px-6 py-20 md:py-28 relative z-10">
          <FadeIn>
            <p className="font-mono text-[11px] tracking-[0.15em] uppercase mb-5" style={{ color: '#00C8B4' }}>
              Our Mission
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 className="font-display text-[40px] md:text-[56px] lg:text-[64px] font-light tracking-[-0.02em] text-white leading-[1.1] max-w-3xl mb-6">
              About Vagus Research
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-lg md:text-xl max-w-2xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              An academic-grade information platform dedicated to the science of vagus nerve
              stimulation. Bridging the gap between clinical research and public understanding.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Stats Strip */}
      <section style={{ backgroundColor: '#0A1220' }}>
        <div className="max-w-layout mx-auto px-6 py-10">
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 80}>
                <div className="text-center">
                  <div className="font-mono text-2xl md:text-3xl font-medium mb-1" style={{ color: '#00C8B4' }}>
                    {stat.value}
                  </div>
                  <div className="font-mono text-[11px] tracking-[0.1em] uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {stat.label}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Platform Exists */}
      <section style={{ backgroundColor: '#080E1C' }}>
        <div className="max-w-layout mx-auto px-6 py-20 md:py-24">
          <FadeIn>
            <p className="font-mono text-[11px] tracking-[0.15em] uppercase mb-10" style={{ color: '#00C8B4' }}>
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
                    fill="#00C8B4"
                    opacity="0.3"
                  />
                </svg>
                <p className="font-display text-[24px] md:text-[28px] font-light text-white leading-[1.4] tracking-[-0.01em]">
                  High-quality scientific information should be accessible. We curate, synthesise,
                  and contextualise the peer-reviewed literature so anyone can explore what the
                  science actually shows.
                </p>
              </div>
            </FadeIn>
            {/* Right — body text */}
            <FadeIn delay={200}>
              <div className="space-y-5" style={{ color: 'rgba(255,255,255,0.6)' }}>
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
      <section style={{ backgroundColor: '#0A1220' }}>
        <div className="max-w-layout mx-auto px-6 py-20 md:py-24">
          <FadeIn>
            <p className="font-mono text-[11px] tracking-[0.15em] uppercase mb-3" style={{ color: '#00C8B4' }}>
              Our Approach
            </p>
            <h2 className="font-display text-3xl md:text-[36px] text-white mb-12">
              How We Work
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {approaches.map((item, i) => (
              <FadeIn key={item.title} delay={i * 100}>
                <div
                  className="rounded-xl p-6 h-full"
                  style={{
                    backgroundColor: '#080E1C',
                    borderLeft: '3px solid #00C8B4',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderLeftColor: '#00C8B4',
                    borderLeftWidth: '3px',
                  }}
                >
                  <h3 className="font-display text-lg text-white font-medium mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* About Us + Contact */}
      <section style={{ backgroundColor: '#080E1C' }}>
        <div className="max-w-layout mx-auto px-6 py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left — About Us */}
            <FadeIn>
              <div>
                <p className="font-mono text-[11px] tracking-[0.15em] uppercase mb-3" style={{ color: '#00C8B4' }}>
                  About Us
                </p>
                <h2 className="font-display text-3xl text-white mb-6">
                  Based in Melbourne
                </h2>
                <div className="space-y-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <p className="leading-relaxed">
                    Vagus Research is based in Melbourne, Australia. We are dedicated to advancing
                    the field of neuromodulation through education, research communication, and
                    the development of accessible transcutaneous vagus nerve stimulation (taVNS)
                    technology.
                  </p>
                  <p className="leading-relaxed">
                    Our team draws on expertise in neuroscience, clinical research methodology,
                    and science communication to create resources that are both rigorous and
                    accessible.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-2">
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>Brought to you by</span>
                  <span className="text-sm font-medium" style={{ color: '#00C8B4' }}>
                    AZOROS PTY LTD
                  </span>
                </div>
              </div>
            </FadeIn>

            {/* Right — Contact Card */}
            <FadeIn delay={100}>
              <div
                id="contact"
                className="rounded-xl p-8"
                style={{
                  backgroundColor: '#0A1220',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <p className="font-mono text-[11px] tracking-[0.15em] uppercase mb-3" style={{ color: '#00C8B4' }}>
                  Contact
                </p>
                <h3 className="font-display text-2xl text-white mb-6">
                  Get in Touch
                </h3>
                <div className="space-y-5">
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.08em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      Email
                    </p>
                    <a
                      href="mailto:hello@vagusresearch.com"
                      className="text-white hover:underline underline-offset-4 transition-colors"
                      style={{ textDecorationColor: '#00C8B4' }}
                    >
                      hello@vagusresearch.com
                    </a>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.08em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      Location
                    </p>
                    <p className="text-white">Melbourne, Victoria, Australia</p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.08em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      Enquiries
                    </p>
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
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
      <section style={{ backgroundColor: '#0A1220' }}>
        <div className="max-w-layout mx-auto px-6 pb-20">
          <FadeIn>
            <div
              className="rounded-xl p-6 md:p-8"
              style={{
                backgroundColor: '#080E1C',
                border: '1px solid rgba(255,255,255,0.06)',
                borderLeft: '3px solid #D97706',
              }}
            >
              <h3 className="font-display text-lg text-white mb-3">Medical Disclaimer</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
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
      <div style={{ backgroundColor: '#080E1C' }}>
        <NewsletterForm />
      </div>
    </>
  )
}
