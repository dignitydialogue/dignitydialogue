import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Public client (browser)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client with service role (admin operations)
export function createServerClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set')
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

// Database types for new intake system
export type MessageStatus = 'pending' | 'queued' | 'sent' | 'failed' | 'rejected'
export type MessageType = 'birthday' | 'holiday' | 'check_in' | 'encouragement' | 'other'

export interface Intake {
  id: string
  requester_name: string
  elder_name: string
  elder_phone: string
  message_type: MessageType
  message_type_other?: string
  elder_age: number
  elder_personality: string
  requester_contact: string
  consent_elder_confirmed: boolean
  consent_no_impersonation: boolean
  recaptcha_token?: string
  status: MessageStatus
  created_at: string
  updated_at: string
  processed_at?: string
  sent_at?: string
  error_message?: string
}

export interface ConsentLog {
  id: string
  intake_id: string
  consent_type: string
  consented: boolean
  ip_address?: string
  user_agent?: string
  created_at: string
}

export interface MessageLog {
  id: string
  intake_id: string
  twilio_message_sid?: string
  status: MessageStatus
  sent_to: string
  message_content?: string
  error_message?: string
  sent_at: string
  created_at: string
}

// Helper functions for database operations
export async function createIntake(intakeData: Omit<Intake, 'id' | 'created_at' | 'updated_at'>) {
  const serverClient = createServerClient()
  try {
    const { data, error } = await serverClient
      .from('intakes')
      .insert([intakeData])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error creating intake:', error)
    return { data: null, error }
  }
}

export async function createConsentLog(logData: Omit<ConsentLog, 'id' | 'created_at'>) {
  const serverClient = createServerClient()
  try {
    const { data, error } = await serverClient
      .from('consent_logs')
      .insert([logData])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error creating consent log:', error)
    return { data: null, error }
  }
}

export async function getIntakes(limit = 100) {
  const serverClient = createServerClient()
  try {
    const { data, error } = await serverClient
      .from('intakes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching intakes:', error)
    return { data: null, error }
  }
}

export async function getIntakeWithConsent(intakeId: string) {
  const serverClient = createServerClient()
  try {
    const { data: intake, error: intakeError } = await serverClient
      .from('intakes')
      .select('*')
      .eq('id', intakeId)
      .single()

    if (intakeError) throw intakeError

    const { data: consentLogs, error: consentError } = await serverClient
      .from('consent_logs')
      .select('*')
      .eq('intake_id', intakeId)

    if (consentError) throw consentError

    return { 
      data: { ...intake, consent_logs: consentLogs }, 
      error: null 
    }
  } catch (error) {
    console.error('Error fetching intake with consent:', error)
    return { data: null, error }
  }
}

export async function getMessageLogs(intakeId?: string) {
  const serverClient = createServerClient()
  try {
    let query = serverClient
      .from('message_logs')
      .select('*')
      .order('created_at', { ascending: false })

    if (intakeId) {
      query = query.eq('intake_id', intakeId)
    }

    const { data, error } = await query

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching message logs:', error)
    return { data: null, error }
  }
}

export async function updateIntakeStatus(
  intakeId: string, 
  status: MessageStatus, 
  errorMessage?: string
) {
  const serverClient = createServerClient()
  try {
    const updateData: any = { status }
    if (status === 'sent') {
      updateData.sent_at = new Date().toISOString()
    } else if (status === 'queued') {
      updateData.processed_at = new Date().toISOString()
    }
    if (errorMessage) {
      updateData.error_message = errorMessage
    }

    const { data, error } = await serverClient
      .from('intakes')
      .update(updateData)
      .eq('id', intakeId)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error updating intake status:', error)
    return { data: null, error }
  }
}

export async function createMessageLog(logData: Omit<MessageLog, 'id' | 'created_at'>) {
  const serverClient = createServerClient()
  try {
    const { data, error } = await serverClient
      .from('message_logs')
      .insert([logData])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error creating message log:', error)
    return { data: null, error }
  }
}

export async function getQueuedIntakes() {
  const serverClient = createServerClient()
  try {
    const { data, error } = await serverClient
      .from('intakes')
      .select('*')
      .eq('status', 'queued')
      .order('created_at', { ascending: true })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching queued intakes:', error)
    return { data: null, error }
  }
}
