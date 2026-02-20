import { Metadata } from 'next'

const siteConfig = {
  name: 'Vagus Research',
  description: 'The Science of Vagus Nerve Stimulation — an academic research platform dedicated to evidence-based VNS science.',
  url: 'https://vagusresearch.com.au',
  ogImage: '/images/og/default.jpg',
  creator: 'Vagus Research',
}

export function generateMetadata({
  title,
  description,
  path = '',
  image,
  type = 'website',
}: {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article'
}): Metadata {
  const url = `${siteConfig.url}${path}`
  const ogImage = image || siteConfig.ogImage

  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_AU',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export function generateArticleJsonLd({
  title,
  description,
  datePublished,
  url,
  image,
}: {
  title: string
  description: string
  datePublished: string
  url: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished,
    url,
    image: image || siteConfig.ogImage,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/logo.png`,
      },
    },
  }
}

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    founder: {
      '@type': 'Organization',
      name: siteConfig.creator,
    },
  }
}

export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/evidence?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateCollectionPageJsonLd({
  name,
  description,
  url,
}: {
  name: string
  description: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  }
}

export function generateDatasetJsonLd({
  name,
  description,
  url,
  size,
}: {
  name: string
  description: string
  url: string
  size: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name,
    description,
    url,
    creator: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    distribution: {
      '@type': 'DataDownload',
      contentUrl: url,
      encodingFormat: 'text/html',
    },
    size: `${size} studies`,
  }
}

export function generateAboutPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${siteConfig.name}`,
    description: siteConfig.description,
    url: `${siteConfig.url}/about`,
    mainEntity: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Melbourne',
        addressRegion: 'Victoria',
        addressCountry: 'AU',
      },
      founder: {
        '@type': 'Organization',
        name: siteConfig.creator,
      },
    },
  }
}

export function generateVideoPageJsonLd({
  name,
  description,
  url,
}: {
  name: string
  description: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
    about: {
      '@type': 'Thing',
      name: 'Vagus Nerve Stimulation',
    },
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  }
}
