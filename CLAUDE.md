# Vagus Research — Project Guidelines

## Project Overview
**vagusresearch.com.au** — A minimalist, academic-grade research platform dedicated to vagus nerve stimulation (VNS) science. The platform serves as an authoritative information hub featuring a curated research library, searchable evidence database, video content, and newsletter capture. It will eventually promote an AZOROS taVNS device, but the primary purpose is education and authority-building.

## Brand
- **Name:** Vagus Research
- **Tagline:** "The Science of Vagus Nerve Stimulation"
- **Company:** AZOROS PTY LTD, Melbourne, Australia
- **Domain:** vagusresearch.com.au
- **Positioning:** Academic authority meets premium health tech. NOT wellness-woo, NOT a generic health blog. Think Nature Index meets Stripe documentation.

## Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Content:** MDX for articles (stored in /content/articles/)
- **Deployment:** Vercel
- **SEO:** next-sitemap, structured data (JSON-LD), Open Graph images
- **Analytics:** Vercel Analytics (add later)
- **Newsletter:** Placeholder form (will connect to ConvertKit/Mailchimp later)
- **Video:** YouTube/Vimeo embeds
- **Search:** Client-side filtering with Fuse.js for evidence database

## Design System

### Aesthetic Direction
**Minimalist academic** — generous white space, structured typography hierarchy, subtle data-driven accents. The site should feel like reading a beautifully typeset research paper, not a marketing page.

Inspiration: Nature.com article layout, PubMed's data structure, Stripe's documentation clarity, The Lancet's typography.

### Colors
```
--bg-primary: #FAFAFA          (off-white background)
--bg-white: #FFFFFF             (card backgrounds)
--bg-dark: #0A1628              (navy — hero sections, footer)
--bg-dark-mid: #111D33          (dark cards)
--accent-blue: #2D7DD2          (links, interactive elements)
--accent-teal: #00B8A9          (CTAs, highlights, badges)
--accent-teal-light: rgba(0,184,169,0.08)  (teal tint backgrounds)
--text-primary: #1A1A2E         (headings)
--text-body: #374151            (body text)
--text-muted: #6B7280           (captions, metadata)
--text-light: #9CA3AF           (subtle labels)
--border: #E5E7EB               (dividers, card borders)
--border-light: #F3F4F6         (subtle separators)
```

### Typography
```
--font-display: 'Newsreader', Georgia, serif     (headings — academic journal feel)
--font-body: 'Inter', system-ui, sans-serif       (body text — clean, readable)
--font-mono: 'JetBrains Mono', monospace          (data labels, stats, code)
```

Load via Google Fonts:
- Newsreader: weights 300, 400, 500, 600 (italic variants too)
- Inter: weights 400, 500, 600
- JetBrains Mono: weight 400, 500

### Typography Scale
```
Hero title:      Newsreader 48-64px, weight 300, tracking -0.02em
Section title:   Newsreader 32-40px, weight 400
Article title:   Newsreader 28-32px, weight 500
Card heading:    Inter 18-20px, weight 600
Body:            Inter 16-17px, weight 400, line-height 1.75
Caption/meta:    Inter 13-14px, weight 500, tracking 0.02em
Data label:      JetBrains Mono 12-13px, weight 500, uppercase, tracking 0.1em
```

### Layout Principles
- Max content width: 720px for article text (optimal reading width)
- Max layout width: 1200px for grids and cards
- Generous padding: 80-120px vertical section spacing
- Cards: white bg, subtle border (#E5E7EB), 12-16px border radius, soft shadow on hover
- Minimal use of color — let typography and whitespace do the work
- No decorative gradients or background patterns — clean and flat

## Site Structure & Pages

### 1. Homepage (/)
**Layout:**
- **Nav:** Sticky, minimal. Logo "VAGUS RESEARCH" in small caps tracking. Links: Library, Evidence, Videos, About. CTA: "Subscribe" button.
- **Hero:** Full-width, off-white background. Large Newsreader heading: "The Science of Vagus Nerve Stimulation". Subtitle in muted text. NO background image — let the typography speak.
- **Featured Research:** 3 latest articles displayed as clean cards with title, topic tag, read time, and date. Subtle hover lift.
- **Key Stats Bar:** Dark navy bar with 4 statistics in JetBrains Mono: "177 Studies Analysed", "6,322+ Subjects", "21+ Clinical Populations", "30+ Years of Research"
- **Topic Navigator:** Grid of topic pills/tags that link to filtered library views (Anxiety, Sleep, Inflammation, Depression, Recovery, Neuroplasticity, Gut Health, Pain, etc.)
- **Newsletter CTA:** Clean section with heading, description, email input, and submit button. "Join researchers and practitioners exploring the science of vagus nerve stimulation."
- **Footer:** Logo, nav links, AZOROS PTY LTD credit, medical disclaimer, social links.

### 2. Research Library (/library)
**Layout:**
- Heading: "Research Library"
- Filter bar: Topic tags (clickable pills), search input
- Article grid: Cards showing title, topic tag, excerpt (2 lines), read time, date, thumbnail if available
- Pagination or infinite scroll
- Each card links to /library/[slug]

### 3. Article Page (/library/[slug])
**Layout:**
- Article header: Title (Newsreader 32px), topic tag, date, read time, author
- Article body: MDX rendered content, max-width 720px centered
- Key Finding boxes: Teal-bordered callout boxes for important takeaways
- Citations: Numbered references at bottom, linked inline
- Related articles: 3 cards at bottom
- Sidebar (desktop): Table of contents, sticky scroll
- CTA: Newsletter signup at bottom of every article

### 4. Evidence Database (/evidence)
**Layout:**
- Heading: "Evidence Database"
- Description: "A curated collection of peer-reviewed research on vagus nerve stimulation"
- Search bar with filters: Condition, Year range, Journal, Study type (RCT, meta-analysis, pilot, review)
- Results as a clean table/list: Study title, Authors (first author et al.), Journal, Year, Condition, Key finding (one line), Link to PubMed
- Initially populated with 30-50 key studies from the research I've already gathered
- JetBrains Mono for data labels and metadata

### 5. Videos (/videos)
**Layout:**
- Heading: "Videos"
- Grid of video cards with thumbnails, titles, duration, topic tags
- Each card opens a modal or dedicated page with embedded video player
- Categories: Explainers, Mechanism of Action, Research Summaries, Device Demonstrations
- Initially: Placeholder layout with 6-8 video slots (we'll generate/source content)

### 6. About (/about)
**Layout:**
- Mission statement
- Brief intro to AZOROS PTY LTD
- Why this platform exists
- Medical disclaimer (prominent)
- Contact information

## Content / MDX Articles

Articles are stored as MDX files in `/content/articles/` with frontmatter:

```mdx
---
title: "What Is Vagus Nerve Stimulation? A Complete Guide"
slug: "what-is-vagus-nerve-stimulation"
topic: "Foundation"
tags: ["VNS", "taVNS", "neuromodulation", "guide"]
excerpt: "A comprehensive overview of vagus nerve stimulation — what it is, how it works, and what the research shows."
date: "2026-02-15"
readTime: "12 min read"
author: "Vagus Research"
featured: true
image: "/images/articles/vns-guide-hero.jpg"
---
```

## SEO Requirements

### Technical SEO
- next-sitemap for automatic sitemap.xml generation
- robots.txt allowing all crawlers
- Canonical URLs on every page
- JSON-LD structured data: Article, FAQPage, Organization, WebSite
- Open Graph + Twitter Card meta tags on every page
- Dynamic OG images generated per article (use @vercel/og or similar)
- Clean URL structure: /library/[slug], /evidence, /videos
- Proper heading hierarchy (single H1 per page)
- Image alt text on everything
- Core Web Vitals optimised (Vercel handles most of this)

### Content SEO
- Every article targets a specific primary keyword
- Meta titles: "[Article Title] | Vagus Research"
- Meta descriptions: 150-160 chars, include primary keyword
- Internal linking between related articles
- FAQ schema on articles that include question/answer content

## Evidence Database Schema

```typescript
interface Study {
  id: string;
  title: string;
  authors: string;           // "Kim et al." format
  journal: string;
  year: number;
  condition: string;         // Primary condition studied
  studyType: string;         // RCT, meta-analysis, pilot, systematic review, narrative review
  subjects: number | null;   // Number of participants
  keyFinding: string;        // One-line summary
  pubmedUrl: string;         // Link to PubMed or journal
  stimulationType: string;   // taVNS, tcVNS, iVNS
  tags: string[];
}
```

Store as JSON in `/content/evidence.json` — loaded and filtered client-side.

## Newsletter Form
- Email input + submit button
- Client-side validation
- On submit: POST to /api/subscribe (initially just stores in a JSON file or returns success)
- Success message: "Thank you. You'll receive our latest research summaries."
- Will connect to ConvertKit/Mailchimp API later

## Important Content Guidelines
- Always cite peer-reviewed sources
- Use language like "research suggests," "clinical trials have shown," "evidence indicates"
- Never make therapeutic claims about AZOROS products
- Include medical disclaimer on every page footer
- Educational framing only — this is NOT a product marketing site
- Australian English spelling (analyse, colour, organisation, etc.)

## File Structure
```
vagus-research/
├── app/
│   ├── layout.tsx          (root layout with nav + footer)
│   ├── page.tsx            (homepage)
│   ├── library/
│   │   ├── page.tsx        (article listing)
│   │   └── [slug]/
│   │       └── page.tsx    (individual article)
│   ├── evidence/
│   │   └── page.tsx        (searchable database)
│   ├── videos/
│   │   └── page.tsx        (video grid)
│   ├── about/
│   │   └── page.tsx        (about page)
│   └── api/
│       └── subscribe/
│           └── route.ts    (newsletter API)
├── components/
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── ArticleCard.tsx
│   ├── TopicTag.tsx
│   ├── StatsBar.tsx
│   ├── NewsletterForm.tsx
│   ├── EvidenceTable.tsx
│   ├── VideoCard.tsx
│   ├── KeyFinding.tsx      (callout box for articles)
│   ├── TableOfContents.tsx
│   └── SearchBar.tsx
├── content/
│   ├── articles/           (MDX files)
│   │   ├── what-is-vns.mdx
│   │   ├── vagus-nerve-explained.mdx
│   │   └── ...
│   └── evidence.json       (study database)
├── lib/
│   ├── articles.ts         (MDX loading utilities)
│   ├── evidence.ts         (evidence data utilities)
│   └── seo.ts              (metadata helpers)
├── public/
│   ├── images/
│   │   ├── articles/
│   │   └── og/
│   └── favicon.ico
├── styles/
│   └── globals.css
├── tailwind.config.ts
├── next.config.js
├── next-sitemap.config.js
└── package.json
```

## Starter Articles to Include (Create 3 for Launch)

### Article 1: "What Is Vagus Nerve Stimulation? A Complete Guide"
Primary keyword: vagus nerve stimulation
Pillar content — comprehensive overview.

### Article 2: "Is Vagus Nerve Stimulation Safe? What 177 Studies Tell Us"
Primary keyword: is vagus nerve stimulation safe
References Kim et al. 2022 meta-analysis.

### Article 3: "Vagus Nerve Stimulation for Anxiety: What the Research Shows"
Primary keyword: vagus nerve stimulation anxiety
Condition-specific — high search volume.

## Deployment
- Push to GitHub repository: vagus-research
- Connect to Vercel
- Add custom domain: vagusresearch.com.au
- Enable Vercel Analytics
