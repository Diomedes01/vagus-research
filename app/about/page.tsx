import { Metadata } from 'next'
import NewsletterForm from '@/components/NewsletterForm'
import { generateMetadata as genMeta, generateAboutPageJsonLd } from '@/lib/seo'

const jsonLd = generateAboutPageJsonLd()

export const metadata: Metadata = genMeta({
  title: 'About',
  description:
    'Vagus Research is an academic platform by AZOROS PTY LTD, dedicated to curating and communicating the science of vagus nerve stimulation.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-layout mx-auto px-6 py-16 md:py-20">
        <div className="max-w-article mx-auto">
          <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-text-light mb-2">
            Our Mission
          </p>
          <h1 className="font-display text-4xl md:text-[44px] text-text-primary mb-8">
            About Vagus Research
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-text-body leading-relaxed">
              Vagus Research is an academic-grade information platform dedicated to the science
              of vagus nerve stimulation (VNS). Our mission is to bridge the gap between clinical
              research and public understanding — providing accessible, evidence-based resources
              for researchers, clinicians, and informed individuals.
            </p>

            <h2 className="font-display text-2xl text-text-primary mt-12 mb-4">Why This Platform Exists</h2>
            <p>
              Vagus nerve stimulation has been the subject of over three decades of clinical
              research, spanning epilepsy, depression, inflammation, anxiety, and numerous other
              conditions. Yet much of this evidence remains locked behind journal paywalls or
              scattered across hundreds of publications.
            </p>
            <p>
              We believe that high-quality scientific information should be accessible.
              Vagus Research curates, synthesises, and contextualises the peer-reviewed
              literature so that anyone can explore what the science actually shows —
              without hype, without exaggeration, and without therapeutic claims.
            </p>

            <h2 className="font-display text-2xl text-text-primary mt-12 mb-4">Our Approach</h2>
            <p>
              Every article and resource on this platform is grounded in peer-reviewed
              research. We cite specific studies, note sample sizes and methodological
              limitations, and use careful language — &ldquo;research suggests,&rdquo;
              &ldquo;evidence indicates,&rdquo; &ldquo;clinical trials have shown.&rdquo;
            </p>
            <p>
              We are not a wellness blog. We are not selling miracle cures. We are a
              research platform that takes the science seriously.
            </p>

            <h2 className="font-display text-2xl text-text-primary mt-12 mb-4">About AZOROS</h2>
            <p>
              Vagus Research is a project of <strong>AZOROS PTY LTD</strong>, based in
              Melbourne, Australia. AZOROS is dedicated to advancing the field of
              neuromodulation through education, research communication, and the development
              of accessible transcutaneous vagus nerve stimulation (taVNS) technology.
            </p>

            <h2 className="font-display text-2xl text-text-primary mt-12 mb-4" id="contact">
              Contact
            </h2>
            <p>
              For enquiries about Vagus Research, research collaborations, or press
              requests, please reach out:
            </p>
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:hello@vagusresearch.com.au" className="text-accent-blue hover:underline">
                hello@vagusresearch.com.au
              </a>
            </p>
            <p>
              <strong>Location:</strong> Melbourne, Victoria, Australia
            </p>

            {/* Medical Disclaimer */}
            <div className="mt-12 p-6 bg-bg-primary border border-border rounded-xl">
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
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <NewsletterForm />
      </div>
    </>
  )
}
