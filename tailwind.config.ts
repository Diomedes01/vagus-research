import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#FAFAFA',
        'bg-white': '#FFFFFF',
        'bg-dark': '#0A1628',
        'bg-dark-mid': '#111D33',
        'accent-blue': '#2D7DD2',
        'accent-teal': '#00B8A9',
        'accent-teal-light': 'rgba(0,184,169,0.08)',
        'text-primary': '#1A1A2E',
        'text-body': '#374151',
        'text-muted': '#6B7280',
        'text-light': '#9CA3AF',
        'border': '#E5E7EB',
        'border-light': '#F3F4F6',
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
            color: '#374151',
            h1: {
              fontFamily: 'Newsreader, Georgia, serif',
              fontWeight: '400',
              color: '#1A1A2E',
            },
            h2: {
              fontFamily: 'Newsreader, Georgia, serif',
              fontWeight: '400',
              color: '#1A1A2E',
            },
            h3: {
              fontFamily: 'Newsreader, Georgia, serif',
              fontWeight: '500',
              color: '#1A1A2E',
            },
            a: {
              color: '#2D7DD2',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            strong: {
              color: '#1A1A2E',
            },
            blockquote: {
              borderLeftColor: '#00B8A9',
              color: '#374151',
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
