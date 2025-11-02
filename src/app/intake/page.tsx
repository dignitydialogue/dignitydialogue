'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ReCAPTCHA from 'react-google-recaptcha'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

// E.164 phone validation
const phoneRegex = /^\+[1-9]\d{1,14}$/

const intakeSchema = z.object({
  requester_name: z.string().min(1, 'Requester name is required'),
  elder_name: z.string().min(1, 'Elder name is required'),
  elder_phone: z.string()
    .min(1, 'Phone number is required')
    .regex(phoneRegex, 'Phone number must be in E.164 format (e.g., +1234567890)'),
  message_type: z.enum(['birthday', 'holiday', 'check_in', 'encouragement', 'other'], {
    required_error: 'Please select a message type',
  }),
  message_type_other: z.string().optional(),
  elder_age: z.coerce.number().int().min(0, 'Age must be a positive number'),
  elder_personality: z.string().min(10, 'Please provide at least 10 characters describing the elder\'s personality'),
  requester_contact: z.string().min(1, 'Contact information is required'),
  consent_elder_confirmed: z.boolean().refine(val => val === true, {
    message: 'You must confirm that the elder has consented',
  }),
  consent_no_impersonation: z.boolean().refine(val => val === true, {
    message: 'You must acknowledge that Dignity Dialogue will not impersonate relatives',
  }),
  recaptcha_token: z.string().min(1, 'Please complete the reCAPTCHA verification'),
})

type IntakeFormData = z.infer<typeof intakeSchema>

export default function IntakePage() {
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [recaptchaKey] = useState(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<IntakeFormData>({
    resolver: zodResolver(intakeSchema),
    defaultValues: {
      consent_elder_confirmed: false,
      consent_no_impersonation: false,
    },
  })

  const messageType = watch('message_type')
  const consentElder = watch('consent_elder_confirmed')
  const consentNoImpersonation = watch('consent_no_impersonation')

  const onRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token)
    if (token) {
      setValue('recaptcha_token', token, { shouldValidate: true })
    }
  }

  const onSubmit = async (data: IntakeFormData) => {
    if (!recaptchaToken) {
      toast({
        title: 'Verification Required',
        description: 'Please complete the reCAPTCHA verification',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          recaptcha_token: recaptchaToken,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit intake form')
      }

      setSubmitStatus('success')
      toast({
        title: 'Success',
        description: 'Your intake form has been submitted successfully. You will receive a confirmation email shortly.',
      })

      // Reset form
      window.location.href = '/intake?success=true'
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitStatus('error')
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to submit intake form. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <CardTitle>Form Submitted Successfully</CardTitle>
            </div>
            <CardDescription>
              Thank you for your submission. We have received your intake form and will process it shortly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              You should receive a confirmation email at the contact information you provided.
            </p>
            <Button asChild>
              <a href="/">Return to Home</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Companion Message Intake Form</h1>
        <p className="text-muted-foreground text-lg">
          Request a compassionate companion message for an elderly person
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Intake Information</CardTitle>
          <CardDescription>
            Please provide all required information. All fields marked with * are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Requester Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Requester Information</h3>
              
              <div>
                <Label htmlFor="requester_name">
                  Requester Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="requester_name"
                  {...register('requester_name')}
                  placeholder="Your full name"
                  aria-invalid={errors.requester_name ? 'true' : 'false'}
                />
                {errors.requester_name && (
                  <p className="text-sm text-destructive mt-1">{errors.requester_name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="requester_contact">
                  Requester Contact <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="requester_contact"
                  {...register('requester_contact')}
                  placeholder="Email or phone number where we can reach you"
                  aria-invalid={errors.requester_contact ? 'true' : 'false'}
                />
                {errors.requester_contact && (
                  <p className="text-sm text-destructive mt-1">{errors.requester_contact.message}</p>
                )}
              </div>
            </div>

            {/* Elder Information */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="text-lg font-semibold">Elder Information</h3>
              
              <div>
                <Label htmlFor="elder_name">
                  Elder Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="elder_name"
                  {...register('elder_name')}
                  placeholder="Full name of the elderly person"
                  aria-invalid={errors.elder_name ? 'true' : 'false'}
                />
                {errors.elder_name && (
                  <p className="text-sm text-destructive mt-1">{errors.elder_name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="elder_phone">
                  Elder Phone Number (E.164 format) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="elder_phone"
                  {...register('elder_phone')}
                  placeholder="+1234567890"
                  aria-invalid={errors.elder_phone ? 'true' : 'false'}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Format: +[country code][number], e.g., +12025551234
                </p>
                {errors.elder_phone && (
                  <p className="text-sm text-destructive mt-1">{errors.elder_phone.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="elder_age">
                  Elder Age <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="elder_age"
                  type="number"
                  {...register('elder_age')}
                  placeholder="65"
                  min="0"
                  aria-invalid={errors.elder_age ? 'true' : 'false'}
                />
                {errors.elder_age && (
                  <p className="text-sm text-destructive mt-1">{errors.elder_age.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="elder_personality">
                  Elder Personality <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="elder_personality"
                  {...register('elder_personality')}
                  placeholder="Describe the elder's personality, interests, communication style, etc. (minimum 10 characters)"
                  rows={4}
                  aria-invalid={errors.elder_personality ? 'true' : 'false'}
                />
                {errors.elder_personality && (
                  <p className="text-sm text-destructive mt-1">{errors.elder_personality.message}</p>
                )}
              </div>
            </div>

            {/* Message Type */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="text-lg font-semibold">Message Details</h3>
              
              <div>
                <Label htmlFor="message_type">
                  Message Type <span className="text-destructive">*</span>
                </Label>
                <Select
                  onValueChange={(value) => {
                    setValue('message_type', value as any)
                    trigger('message_type')
                  }}
                  value={messageType}
                >
                  <SelectTrigger id="message_type" className="w-full">
                    <SelectValue placeholder="Select a message type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="birthday">Birthday</SelectItem>
                    <SelectItem value="holiday">Holiday</SelectItem>
                    <SelectItem value="check_in">Check-in</SelectItem>
                    <SelectItem value="encouragement">Encouragement</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <input
                  type="hidden"
                  {...register('message_type')}
                />
                {errors.message_type && (
                  <p className="text-sm text-destructive mt-1">{errors.message_type.message}</p>
                )}
              </div>

              {messageType === 'other' && (
                <div>
                  <Label htmlFor="message_type_other">
                    Please specify message type <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="message_type_other"
                    {...register('message_type_other')}
                    placeholder="Describe the message type"
                    aria-invalid={errors.message_type_other ? 'true' : 'false'}
                  />
                  {errors.message_type_other && (
                    <p className="text-sm text-destructive mt-1">{errors.message_type_other.message}</p>
                  )}
                </div>
              )}
            </div>

            {/* Consent Checkboxes */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="text-lg font-semibold">Consent and Acknowledgments</h3>
              
              <div className="space-y-2">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consent_elder_confirmed"
                    checked={consentElder}
                    onCheckedChange={(checked) => {
                      setValue('consent_elder_confirmed', checked === true)
                      trigger('consent_elder_confirmed')
                    }}
                    aria-invalid={errors.consent_elder_confirmed ? 'true' : 'false'}
                  />
                  <Label
                    htmlFor="consent_elder_confirmed"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    <span className="text-destructive">*</span> I confirm that the elder has provided explicit consent to receive companion messages from Dignity Dialogue.
                  </Label>
                </div>
                {errors.consent_elder_confirmed && (
                  <p className="text-sm text-destructive mt-1 ml-7">{errors.consent_elder_confirmed.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consent_no_impersonation"
                    checked={consentNoImpersonation}
                    onCheckedChange={(checked) => {
                      setValue('consent_no_impersonation', checked === true)
                      trigger('consent_no_impersonation')
                    }}
                    aria-invalid={errors.consent_no_impersonation ? 'true' : 'false'}
                  />
                  <Label
                    htmlFor="consent_no_impersonation"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    <span className="text-destructive">*</span> I understand that Dignity Dialogue will NOT impersonate relatives or family members. All messages will be sent from Dignity Dialogue as a companion service.
                  </Label>
                </div>
                {errors.consent_no_impersonation && (
                  <p className="text-sm text-destructive mt-1 ml-7">{errors.consent_no_impersonation.message}</p>
                )}
              </div>
            </div>

            {/* reCAPTCHA */}
            <div className="border-t pt-6">
              <Label>Security Verification <span className="text-destructive">*</span></Label>
              <div className="mt-2">
                <ReCAPTCHA
                  sitekey={recaptchaKey}
                  onChange={onRecaptchaChange}
                />
                {errors.recaptcha_token && (
                  <p className="text-sm text-destructive mt-2">{errors.recaptcha_token.message}</p>
                )}
              </div>
            </div>

            {submitStatus === 'error' && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  There was an error submitting your form. Please try again.
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Intake Form'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

