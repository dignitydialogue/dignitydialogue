import { NextRequest, NextResponse } from 'next/server'
import { createContactSubmission, getContactSubmissions } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { name, email, message } = body

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Create contact submission
    const { data, error } = await createContactSubmission({
      name,
      email,
      message,
      status: 'PENDING'
    })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to save message. Please try again.' },
        { status: 500 }
      )
    }

    // Log notification (for manual email follow-up)
    console.log('New Contact Form Submission:', {
      name,
      email,
      submissionId: data?.id,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      submissionId: data?.id
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { data, error } = await getContactSubmissions()
    
    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch submissions' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}