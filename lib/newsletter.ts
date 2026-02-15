/**
 * Newsletter provider abstraction.
 *
 * Swap the active provider by changing the export at the bottom.
 * Each provider implements the same interface — just add your API
 * keys to .env.local and switch the export.
 *
 * Environment variables needed per provider:
 *   ConvertKit:  CONVERTKIT_API_KEY, CONVERTKIT_FORM_ID
 *   Mailchimp:   MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID, MAILCHIMP_SERVER
 */

export interface NewsletterProvider {
  subscribe(email: string): Promise<{ success: boolean; message: string }>
}

// ─── Console provider (default — logs to stdout) ────────────────────────────

const consoleProvider: NewsletterProvider = {
  async subscribe(email: string) {
    console.log(`[newsletter] New subscriber: ${email}`)
    return {
      success: true,
      message: 'Thank you. You\u2019ll receive our latest research summaries.',
    }
  },
}

// ─── ConvertKit ─────────────────────────────────────────────────────────────

const convertKitProvider: NewsletterProvider = {
  async subscribe(email: string) {
    const apiKey = process.env.CONVERTKIT_API_KEY
    const formId = process.env.CONVERTKIT_FORM_ID

    if (!apiKey || !formId) {
      throw new Error('CONVERTKIT_API_KEY and CONVERTKIT_FORM_ID must be set')
    }

    const res = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: apiKey, email }),
      }
    )

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.message || 'ConvertKit subscription failed')
    }

    return {
      success: true,
      message: 'Thank you. You\u2019ll receive our latest research summaries.',
    }
  },
}

// ─── Mailchimp ──────────────────────────────────────────────────────────────

const mailchimpProvider: NewsletterProvider = {
  async subscribe(email: string) {
    const apiKey = process.env.MAILCHIMP_API_KEY
    const listId = process.env.MAILCHIMP_LIST_ID
    const server = process.env.MAILCHIMP_SERVER // e.g. "us1"

    if (!apiKey || !listId || !server) {
      throw new Error(
        'MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID, and MAILCHIMP_SERVER must be set'
      )
    }

    const res = await fetch(
      `https://${server}.api.mailchimp.com/3.0/lists/${listId}/members`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `apikey ${apiKey}`,
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
        }),
      }
    )

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      if (data.title === 'Member Exists') {
        return { success: true, message: 'You are already subscribed.' }
      }
      throw new Error(data.detail || 'Mailchimp subscription failed')
    }

    return {
      success: true,
      message: 'Thank you. You\u2019ll receive our latest research summaries.',
    }
  },
}

// ─── Active provider ────────────────────────────────────────────────────────
// Change this to `convertKitProvider` or `mailchimpProvider` when ready.

export const newsletter: NewsletterProvider = consoleProvider

// Suppress unused-variable warnings — these are ready to swap in.
void convertKitProvider
void mailchimpProvider
