import { Metadata } from 'next'

export const siteConfig = {
  name: 'Vagus Research',
  description: 'The Science of Vagus Nerve Stimulation — an academic research platform dedicated to evidence-based VNS science.',
  url: 'https://vagusresearch.com',
  ogImage: '/images/og/default.jpg',
  creator: 'Vagus Research',
  twitterHandle: '@vagusresearch',
}

export function generateMetadata({
  title,
  description,
  path = '',
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  section,
  tags,
}: {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
}): Metadata {
  const url = `${siteConfig.url}${path}`
  const ogImage = image || `/api/og?title=${encodeURIComponent(title)}`

  const openGraph: Metadata['openGraph'] = {
    title,
    description,
    url,
    siteName: siteConfig.name,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title,
        type: 'image/png',
      },
    ],
    locale: 'en_AU',
    type,
  }

  if (type === 'article' && openGraph) {
    Object.assign(openGraph, {
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
      ...(tags && { tags }),
      authors: [siteConfig.name],
    })
  }

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph,
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
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
  dateModified,
  slug,
  image,
  section,
  tags,
}: {
  title: string
  description: string
  datePublished: string
  dateModified?: string
  slug: string
  image?: string
  section?: string
  tags?: string[]
}) {
  const url = `${siteConfig.url}/library/${slug}`
  const ogImage = image
    ? `${siteConfig.url}${image}`
    : `${siteConfig.url}/api/og?title=${encodeURIComponent(title)}${section ? `&topic=${encodeURIComponent(section)}` : ''}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    url,
    image: ogImage,
    ...(section && { articleSection: section }),
    ...(tags && { keywords: tags.join(', ') }),
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    inLanguage: 'en-AU',
  }
}

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/images/logo.png`,
    },
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

export function generateFAQJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateBreadcrumbJsonLd(
  items: { name: string; url?: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  }
}
