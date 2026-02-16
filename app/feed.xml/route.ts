import { getAllArticles } from '@/lib/articles'

export async function GET() {
  const articles = getAllArticles()
  const siteUrl = 'https://vagusresearch.com.au'

  const itemsXml = articles
    .map(
      (article) => `    <item>
      <title><![CDATA[${article.frontmatter.title}]]></title>
      <link>${siteUrl}/library/${article.slug}</link>
      <guid isPermaLink="true">${siteUrl}/library/${article.slug}</guid>
      <description><![CDATA[${article.frontmatter.excerpt}]]></description>
      <pubDate>${new Date(article.frontmatter.date).toUTCString()}</pubDate>
      <category>${article.frontmatter.topic}</category>
    </item>`
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Vagus Research</title>
    <link>${siteUrl}</link>
    <description>The Science of Vagus Nerve Stimulation — peer-reviewed research, clinical evidence, and educational resources.</description>
    <language>en-AU</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
