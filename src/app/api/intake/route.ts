import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createIntake, createConsentLog, updateIntakeStatus } from '@/lib/supabase'

const phoneRegex = /^\+[1-9]\d{1,14}$/

const intakeSchema = z.object({
  requester_name: z.string().min(1),
  elder_name: z.string().min(1),
  elder_phone: z.string().regex(phoneRegex, 'Phone must be in E.164 format'),
  message_type: z.enum(['birthday', 'holiday', 'check_in', 'encouragement', 'other']),
  message_type_other: z.string().optional(),
  elder_age: z.coerce.number().int().min(0),
  elder_personality: z.string().min(10),
  requester_contact: z.string().min(1),
  consent_elder_confirmed: z.boolean().refine(val => val === true),
  consent_no_impersonation: z.boolean().refine(val => val === true),
  recaptcha_token: z.string().min(1),
})

// Verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY
  if (!secretKey) {
    console.warn('RECAPTCHA_SECRET_KEY not set, skipping verification')
    return true // In development, allow if not configured
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    })

    const data = await response.json()
    return data.success === true
  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    return false
  }
}

// Simulate sending confirmation email (replace with actual email service)
async function sendConfirmationEmail(requesterContact: string, intakeId: string) {
  console.log('📧 Confirmation email would be sent to:', requesterContact)
  console.log('   Intake ID:', intakeId)
  console.log('   Message: Your intake form has been received and will be processed soon.')
  
  // TODO: Replace with actual email service (e.g., SendGrid, Resend, etc.)
  // Example:
  // await emailService.send({
  //   to: requesterContact,
  //   subject: 'Dignity Dialogue - Intake Form Received',
  //   body: `Thank you for your submission. Your intake ID is: ${intakeId}`
  // })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input schema
    const validationResult = intakeSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Verify reCAPTCHA
    const isRecaptchaValid = await verifyRecaptcha(data.recaptcha_token)
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 400 }
      )
    }

    // Get client IP and user agent for consent logging
    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                      request.headers.get('x-real-ip') || 
                      'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Create intake record
    const { data: intake, error: intakeError } = await createIntake({
      requester_name: data.requester_name,
      elder_name: data.elder_name,
      elder_phone: data.elder_phone,
      message_type: data.message_type,
      message_type_other: data.message_type_other,
      elder_age: data.elder_age,
      elder_personality: data.elder_personality,
      requester_contact: data.requester_contact,
      consent_elder_confirmed: data.consent_elder_confirmed,
      consent_no_impersonation: data.consent_no_impersonation,
      recaptcha_token: data.recaptcha_token,
      status: 'pending',
    })

    if (intakeError || !intake) {
      console.error('Database error creating intake:', intakeError)
      return NextResponse.json(
        { error: 'Failed to save intake. Please try again.' },
        { status: 500 }
      )
    }

    // Create consent audit logs
    await createConsentLog({
      intake_id: intake.id,
      consent_type: 'elder_consent',
      consented: data.consent_elder_confirmed,
      ip_address: ipAddress,
      user_agent: userAgent,
    })

    await createConsentLog({
      intake_id: intake.id,
      consent_type: 'no_impersonation',
      consented: data.consent_no_impersonation,
      ip_address: ipAddress,
      user_agent: userAgent,
    })

    // Update status to queued for processing
    await updateIntakeStatus(intake.id, 'queued')

    // Send confirmation email (simulated)
    await sendConfirmationEmail(data.requester_contact, intake.id)

    return NextResponse.json({
      success: true,
      message: 'Intake form submitted successfully',
      intake_id: intake.id,
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

