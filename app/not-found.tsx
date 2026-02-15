import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-layout mx-auto px-6 py-32 text-center">
      <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-text-light mb-4">
        404
      </p>
      <h1 className="font-display text-4xl text-text-primary mb-4">Page Not Found</h1>
      <p className="text-text-muted mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center px-6 py-3 bg-text-primary text-white text-sm font-medium rounded-lg hover:bg-text-primary/90 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}
