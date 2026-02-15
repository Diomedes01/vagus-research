import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const subscribersFile = path.join(process.cwd(), 'content', 'subscribers.json')

function getSubscribers(): string[] {
  try {
    const data = fs.readFileSync(subscribersFile, 'utf8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

function saveSubscribers(subscribers: string[]) {
  fs.writeFileSync(subscribersFile, JSON.stringify(subscribers, null, 2))
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    const subscribers = getSubscribers()

    if (subscribers.includes(email.toLowerCase())) {
      return NextResponse.json(
        { message: 'You are already subscribed.' },
        { status: 200 }
      )
    }

    subscribers.push(email.toLowerCase())
    saveSubscribers(subscribers)

    return NextResponse.json(
      { message: 'Thank you. You\u2019ll receive our latest research summaries.' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
