import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'bg-white': 'var(--bg-white)',
        'bg-dark': 'var(--bg-dark)',
        'bg-dark-mid': 'var(--bg-dark-mid)',
        'accent-blue': 'var(--accent-blue)',
        'accent-teal': 'var(--accent-teal)',
        'accent-teal-light': 'var(--accent-teal-light)',
        'text-primary': 'var(--text-primary)',
        'text-body': 'var(--text-body)',
        'text-muted': 'var(--text-muted)',
        'text-light': 'var(--text-light)',
        'border': 'var(--border)',
        'border-light': 'var(--border-light)',
      },
      fontFamily: {
        display: ['Newsreader', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      maxWidth: {
        'article': '720px',
        'layout': '1200px',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '720px',
            color: 'var(--text-body)',
            h1: {
              fontFamily: 'Newsreader, Georgia, serif',
              fontWeight: '400',
              color: 'var(--text-primary)',
            },
            h2: {
              fontFamily: 'Newsreader, Georgia, serif',
              fontWeight: '400',
              color: 'var(--text-primary)',
            },
            h3: {
              fontFamily: 'Newsreader, Georgia, serif',
              fontWeight: '500',
              color: 'var(--text-primary)',
            },
            a: {
              color: 'var(--accent-blue)',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            strong: {
              color: 'var(--text-primary)',
            },
            blockquote: {
              borderLeftColor: 'var(--accent-teal)',
              color: 'var(--text-body)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
