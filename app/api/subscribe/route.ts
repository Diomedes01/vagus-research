import { NextRequest, NextResponse } from 'next/server'
import { newsletter } from '@/lib/newsletter'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    const result = await newsletter.subscribe(email)

    return NextResponse.json(
      { message: result.message },
      { status: 200 }
    )
  } catch (err) {
    console.error('[subscribe]', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
