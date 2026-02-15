import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const articlesDirectory = path.join(process.cwd(), 'content/articles')

export interface ArticleFrontmatter {
  title: string
  slug: string
  topic: string
  tags: string[]
  excerpt: string
  date: string
  readTime: string
  author: string
  featured: boolean
  image?: string
}

export interface Article {
  frontmatter: ArticleFrontmatter
  content: string
  slug: string
}

export function getAllArticles(): Article[] {
  const fileNames = fs.readdirSync(articlesDirectory)
  const articles = fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(articlesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        frontmatter: data as ArticleFrontmatter,
        content,
        slug,
      }
    })

  return articles.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  )
}

export function getArticleBySlug(slug: string): Article | null {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      frontmatter: data as ArticleFrontmatter,
      content,
      slug,
    }
  } catch {
    return null
  }
}

export function getFeaturedArticles(): Article[] {
  return getAllArticles().filter((a) => a.frontmatter.featured).slice(0, 3)
}

export function getArticlesByTopic(topic: string): Article[] {
  return getAllArticles().filter(
    (a) => a.frontmatter.topic.toLowerCase() === topic.toLowerCase()
  )
}

export function getAllTopics(): string[] {
  const articles = getAllArticles()
  const topics = new Set(articles.map((a) => a.frontmatter.topic))
  return Array.from(topics)
}

export function getAllTags(): string[] {
  const articles = getAllArticles()
  const tags = new Set(articles.flatMap((a) => a.frontmatter.tags))
  return Array.from(tags)
}
