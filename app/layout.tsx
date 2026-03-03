import type { Metadata } from 'next'
import { Newsreader, Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import GlobalSearch from '@/components/GlobalSearch'
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
  metadataBase: new URL('https://vagusresearch.com'),
  openGraph: {
    title: 'Vagus Research — The Science of Vagus Nerve Stimulation',
    description:
      'An academic research platform dedicated to the science of vagus nerve stimulation. Curated evidence from 177+ studies.',
    url: 'https://vagusresearch.com',
    siteName: 'Vagus Research',
    images: [
      {
        url: '/images/og/default.jpg',
        width: 1200,
        height: 630,
        alt: 'Vagus Research — The Science of Vagus Nerve Stimulation',
        type: 'image/jpeg',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vagusresearch',
    creator: '@vagusresearch',
    title: 'Vagus Research — The Science of Vagus Nerve Stimulation',
    description:
      'An academic research platform dedicated to the science of vagus nerve stimulation.',
    images: [
      {
        url: '/images/og/default.jpg',
        width: 1200,
        height: 630,
        alt: 'Vagus Research — The Science of Vagus Nerve Stimulation',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'og:locale:alternate': 'en_US',
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="alternate" type="application/rss+xml" title="Vagus Research" href="/feed.xml" />
        <meta name="theme-color" content="#0A1628" />
      </head>
      <body className="font-body text-text-body bg-bg-primary antialiased">
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <BackToTop />
        <GlobalSearch />
        <Analytics />
      </body>
    </html>
  )
}
