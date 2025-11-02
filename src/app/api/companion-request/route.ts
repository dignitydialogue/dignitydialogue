import { NextRequest, NextResponse } from 'next/server'
import { createCompanionRequest, getCompanionRequests } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const {
      requesterName,
      requesterEmail,
      requesterPhone,
      relationship,
      seniorName,
      seniorPhone,
      seniorAge,
      seniorPersonality,
      conversationTopics,
      consent
    } = body

    // Basic validation
    if (!requesterName || !requesterEmail || !seniorName || !seniorPhone || !seniorAge || !seniorPersonality || !conversationTopics || !consent) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(requesterEmail)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/
    if (!phoneRegex.test(seniorPhone)) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      )
    }

    // Age validation
    if (isNaN(Number(seniorAge)) || Number(seniorAge) < 65) {
      return NextResponse.json(
        { error: 'Senior must be 65 years or older' },
        { status: 400 }
      )
    }

    // Create companion request
    const { data, error } = await createCompanionRequest({
      requester: {
        full_name: requesterName,
        email: requesterEmail,
        phone_number: requesterPhone || null,
        relationship: relationship || 'Other'
      },
      senior: {
        full_name: seniorName,
        phone_number: seniorPhone,
        age: Number(seniorAge),
        personality: seniorPersonality,
        conversation_topics: conversationTopics,
        status: 'PENDING'
      }
    })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to save request. Please try again.' },
        { status: 500 }
      )
    }

    // Log notification (for manual email follow-up)
    console.log('New Companion Request Received:', {
      requester: requesterName,
      email: requesterEmail,
      senior: seniorName,
      requestId: data?.id,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json({
      success: true,
      message: 'Companion request submitted successfully',
      requestId: data?.id
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
    const { data, error } = await getCompanionRequests()
    
    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch requests' },
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