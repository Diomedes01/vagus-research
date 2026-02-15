'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus('success')
        setMessage('Thank you. You\u2019ll receive our latest research summaries.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage('Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <section id="newsletter" className="bg-bg-primary">
      <div className="max-w-layout mx-auto px-6 py-20 md:py-28">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl text-text-primary mb-4">
            Stay Current with the Research
          </h2>
          <p className="text-text-muted mb-8 leading-relaxed">
            Join researchers and practitioners exploring the science of vagus nerve stimulation.
            Receive curated research summaries and evidence updates.
          </p>

          {status === 'success' ? (
            <div className="bg-accent-teal-light border border-accent-teal/20 rounded-xl p-6">
              <p className="text-accent-teal font-medium">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3 bg-white border border-border rounded-lg text-sm text-text-body placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-accent-teal/20 focus:border-accent-teal transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 bg-accent-teal text-white text-sm font-medium rounded-lg hover:bg-accent-teal/90 transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-3 text-sm text-red-500">{message}</p>
          )}

          <p className="mt-4 text-xs text-text-light">
            No spam. Unsubscribe at any time. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  )
}
