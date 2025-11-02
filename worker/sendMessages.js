/**
 * Background Worker Script for Sending Messages via Twilio
 * 
 * This script:
 * 1. Reads queued messages from the database
 * 2. Verifies consent records
 * 3. Sends messages via Twilio (or stubs if Twilio not configured)
 * 4. Updates message status and logs
 * 
 * Run with: node worker/sendMessages.js
 * Or schedule with cron: */5 * * * * node /path/to/worker/sendMessages.js
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('ERROR: Missing Supabase credentials')
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Initialize Twilio (optional)
let twilioClient = null
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER

if (twilioAccountSid && twilioAuthToken) {
  try {
    const twilio = require('twilio')
    twilioClient = twilio(twilioAccountSid, twilioAuthToken)
    console.log('✅ Twilio client initialized')
  } catch (error) {
    console.warn('⚠️  Twilio module not installed, messages will be stubbed')
    console.warn('   Install with: npm install twilio')
  }
} else {
  console.warn('⚠️  Twilio credentials not configured, messages will be stubbed')
  console.warn('   Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER')
}

/**
 * Check if message attempts to impersonate a relative
 * Returns true if impersonation detected
 */
function detectImpersonation(elderName, messageType, messageTypeOther, elderPersonality) {
  const impersonationKeywords = [
    'son', 'daughter', 'grandson', 'granddaughter', 'nephew', 'niece',
    'cousin', 'sibling', 'brother', 'sister', 'mom', 'dad', 'mother', 'father',
    'your son', 'your daughter', 'your grandson', 'your granddaughter',
    'I am your', 'this is your', 'from your', 'your family'
  ]
  
  const textToCheck = `${messageType} ${messageTypeOther || ''} ${elderPersonality}`.toLowerCase()
  
  for (const keyword of impersonationKeywords) {
    if (textToCheck.includes(keyword.toLowerCase())) {
      return true
    }
  }
  
  return false
}

/**
 * Generate message content that does NOT impersonate relatives
 */
function generateMessage(elderName, messageType, messageTypeOther, elderPersonality) {
  const greetings = [
    `Hello ${elderName},`,
    `Dear ${elderName},`,
    `Hi ${elderName},`,
  ]
  
  const messageParts = {
    birthday: [
      'We hope this message finds you well on your special day!',
      'Wishing you a wonderful birthday filled with joy and happiness.',
      'May your birthday bring you many reasons to smile.',
    ],
    holiday: [
      'Wishing you peace and joy during this holiday season.',
      'We hope you\'re doing well and surrounded by warmth this holiday.',
      'May this holiday bring you comfort and happiness.',
    ],
    check_in: [
      'We wanted to check in and see how you\'re doing.',
      'Thinking of you and hoping you\'re having a good day.',
      'We wanted to reach out and send you warm thoughts.',
    ],
    encouragement: [
      'We wanted to send you some encouragement and let you know someone is thinking of you.',
      'You are valued and cared for. We hope this message brightens your day.',
      'Sending you positive thoughts and encouragement today.',
    ],
    other: [
      messageTypeOther || 'We wanted to reach out and send you warm thoughts.',
    ]
  }
  
  const closings = [
    '\n\nWith warm regards,\nDignity Dialogue',
    '\n\nBest wishes,\nDignity Dialogue',
    '\n\nSincerely,\nDignity Dialogue Companion Care',
  ]
  
  const greeting = greetings[Math.floor(Math.random() * greetings.length)]
  const messagePart = messageParts[messageType]?.[0] || messageParts.other[0]
  const closing = closings[Math.floor(Math.random() * closings.length)]
  
  return `${greeting}\n\n${messagePart}${closing}`
}

/**
 * Send message via Twilio or stub
 */
async function sendMessage(to, messageContent, intakeId) {
  if (twilioClient && twilioPhoneNumber) {
    try {
      const message = await twilioClient.messages.create({
        body: messageContent,
        from: twilioPhoneNumber,
        to: to,
      })
      
      console.log(`✅ Message sent via Twilio: ${message.sid}`)
      return { success: true, messageSid: message.sid, error: null }
    } catch (error) {
      console.error(`❌ Twilio error: ${error.message}`)
      return { success: false, messageSid: null, error: error.message }
    }
  } else {
    // Stub: log what would be sent
    console.log('📱 [STUB] Message would be sent:')
    console.log(`   To: ${to}`)
    console.log(`   Content: ${messageContent.substring(0, 100)}...`)
    console.log(`   Intake ID: ${intakeId}`)
    console.log('   To enable Twilio, set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER')
    return { success: true, messageSid: 'stub-message-id', error: null }
  }
}

/**
 * Verify consent for an intake
 */
async function verifyConsent(intakeId) {
  try {
    // Get the intake record
    const { data: intake, error: intakeError } = await supabase
      .from('intakes')
      .select('*')
      .eq('id', intakeId)
      .single()
    
    if (intakeError || !intake) {
      return { valid: false, reason: 'Intake record not found' }
    }
    
    // Check consent flags
    if (!intake.consent_elder_confirmed) {
      return { valid: false, reason: 'Elder consent not confirmed' }
    }
    
    if (!intake.consent_no_impersonation) {
      return { valid: false, reason: 'No impersonation consent not confirmed' }
    }
    
    // Check consent logs
    const { data: consentLogs, error: logsError } = await supabase
      .from('consent_logs')
      .select('*')
      .eq('intake_id', intakeId)
      .eq('consented', true)
    
    if (logsError) {
      return { valid: false, reason: 'Error checking consent logs' }
    }
    
    const hasElderConsent = consentLogs?.some(log => log.consent_type === 'elder_consent')
    const hasNoImpersonationConsent = consentLogs?.some(log => log.consent_type === 'no_impersonation')
    
    if (!hasElderConsent || !hasNoImpersonationConsent) {
      return { valid: false, reason: 'Consent logs incomplete' }
    }
    
    return { valid: true, intake }
  } catch (error) {
    console.error('Error verifying consent:', error)
    return { valid: false, reason: error.message }
  }
}

/**
 * Process queued messages
 */
async function processQueuedMessages() {
  console.log(`\n${new Date().toISOString()} - Starting message processing...`)
  
  try {
    // Get queued intakes
    const { data: queuedIntakes, error: fetchError } = await supabase
      .from('intakes')
      .select('*')
      .eq('status', 'queued')
      .order('created_at', { ascending: true })
      .limit(10) // Process 10 at a time
    
    if (fetchError) {
      throw fetchError
    }
    
    if (!queuedIntakes || queuedIntakes.length === 0) {
      console.log('   No queued messages to process')
      return
    }
    
    console.log(`   Found ${queuedIntakes.length} queued message(s)`)
    
    for (const intake of queuedIntakes) {
      console.log(`\n   Processing intake: ${intake.id}`)
      
      // Verify consent
      const consentCheck = await verifyConsent(intake.id)
      if (!consentCheck.valid) {
        console.log(`   ❌ Consent verification failed: ${consentCheck.reason}`)
        await supabase
          .from('intakes')
          .update({ 
            status: 'rejected',
            error_message: `Consent verification failed: ${consentCheck.reason}`
          })
          .eq('id', intake.id)
        
        // Log rejection
        await supabase
          .from('message_logs')
          .insert({
            intake_id: intake.id,
            status: 'rejected',
            sent_to: intake.elder_phone,
            error_message: consentCheck.reason,
          })
        continue
      }
      
      // Check for impersonation attempts
      const isImpersonation = detectImpersonation(
        intake.elder_name,
        intake.message_type,
        intake.message_type_other,
        intake.elder_personality
      )
      
      if (isImpersonation) {
        console.log(`   ❌ Impersonation detected - rejecting`)
        await supabase
          .from('intakes')
          .update({ 
            status: 'rejected',
            error_message: 'Message content attempts to impersonate a relative - rejected'
          })
          .eq('id', intake.id)
        
        // Log rejection
        await supabase
          .from('message_logs')
          .insert({
            intake_id: intake.id,
            status: 'rejected',
            sent_to: intake.elder_phone,
            error_message: 'Impersonation attempt detected',
          })
        continue
      }
      
      // Generate message content
      const messageContent = generateMessage(
        intake.elder_name,
        intake.message_type,
        intake.message_type_other,
        intake.elder_personality
      )
      
      // Send message
      const sendResult = await sendMessage(
        intake.elder_phone,
        messageContent,
        intake.id
      )
      
      // Update intake status
      if (sendResult.success) {
        await supabase
          .from('intakes')
          .update({ 
            status: 'sent',
            sent_at: new Date().toISOString()
          })
          .eq('id', intake.id)
        
        // Create message log
        await supabase
          .from('message_logs')
          .insert({
            intake_id: intake.id,
            twilio_message_sid: sendResult.messageSid,
            status: 'sent',
            sent_to: intake.elder_phone,
            message_content: messageContent,
          })
        
        console.log(`   ✅ Message sent successfully`)
      } else {
        await supabase
          .from('intakes')
          .update({ 
            status: 'failed',
            error_message: sendResult.error
          })
          .eq('id', intake.id)
        
        // Create message log
        await supabase
          .from('message_logs')
          .insert({
            intake_id: intake.id,
            status: 'failed',
            sent_to: intake.elder_phone,
            message_content: messageContent,
            error_message: sendResult.error,
          })
        
        console.log(`   ❌ Failed to send: ${sendResult.error}`)
      }
    }
    
    console.log(`\n✅ Processing complete`)
  } catch (error) {
    console.error('❌ Error processing messages:', error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  processQueuedMessages()
    .then(() => {
      console.log('Worker completed successfully')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Worker failed:', error)
      process.exit(1)
    })
}

module.exports = { processQueuedMessages, verifyConsent, sendMessage, detectImpersonation }

