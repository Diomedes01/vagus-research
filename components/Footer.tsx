import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-bg-dark text-white">
      <div className="max-w-layout mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <span className="font-mono text-[13px] font-medium tracking-[0.15em] uppercase text-white/90">
              Vagus Research
            </span>
            <p className="mt-3 text-sm text-white/60 leading-relaxed max-w-md">
              An academic research platform dedicated to the science of vagus nerve stimulation.
              Curated evidence, peer-reviewed research, and educational resources.
            </p>
            <p className="mt-4 text-xs text-white/40">
              A project by AZOROS PTY LTD, Melbourne, Australia
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-white/40 mb-4">
              Navigate
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: '/library', label: 'Research Library' },
                { href: '/evidence', label: 'Evidence Database' },
                { href: '/videos', label: 'Videos' },
                { href: '/about', label: 'About' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-white/40 mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/#newsletter" className="text-sm text-white/60 hover:text-white transition-colors">
                  Newsletter
                </Link>
              </li>
              <li>
                <Link href="/about#contact" className="text-sm text-white/60 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-xs text-white/40 leading-relaxed max-w-3xl">
            <strong className="text-white/50">Medical Disclaimer:</strong> The content on this website is for
            informational and educational purposes only. It is not intended as medical advice, diagnosis, or
            treatment. Always consult a qualified healthcare professional before making decisions about your
            health or beginning any form of neuromodulation therapy. Vagus nerve stimulation devices should
            only be used under appropriate medical guidance.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} AZOROS PTY LTD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
