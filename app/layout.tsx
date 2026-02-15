import type { Metadata } from 'next'
import { Newsreader, Inter, JetBrains_Mono } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import '@/styles/globals.css'

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Vagus Research — The Science of Vagus Nerve Stimulation',
    template: '%s | Vagus Research',
  },
  description:
    'An academic research platform dedicated to the science of vagus nerve stimulation. Curated evidence, peer-reviewed research, and educational resources.',
  metadataBase: new URL('https://vagusresearch.com.au'),
  openGraph: {
    title: 'Vagus Research — The Science of Vagus Nerve Stimulation',
    description:
      'An academic research platform dedicated to the science of vagus nerve stimulation.',
    url: 'https://vagusresearch.com.au',
    siteName: 'Vagus Research',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vagus Research',
    description:
      'The Science of Vagus Nerve Stimulation',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en-AU"
      className={`${newsreader.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body text-text-body bg-bg-primary antialiased">
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
