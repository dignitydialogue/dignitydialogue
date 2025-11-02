'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Download, LogOut, Shield, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface Intake {
  id: string
  requester_name: string
  elder_name: string
  elder_phone: string
  message_type: string
  message_type_other?: string
  elder_age: number
  elder_personality: string
  requester_contact: string
  consent_elder_confirmed: boolean
  consent_no_impersonation: boolean
  status: string
  created_at: string
  processed_at?: string
  sent_at?: string
  error_message?: string
}

interface ConsentLog {
  id: string
  intake_id: string
  consent_type: string
  consented: boolean
  ip_address?: string
  user_agent?: string
  created_at: string
}

interface MessageLog {
  id: string
  intake_id: string
  twilio_message_sid?: string
  status: string
  sent_to: string
  message_content?: string
  error_message?: string
  sent_at: string
  created_at: string
}

export default function AdminPage() {
  const [user, setUser] = useState<any>(null)
  const [intakes, setIntakes] = useState<Intake[]>([])
  const [consentLogs, setConsentLogs] = useState<ConsentLog[]>([])
  const [messageLogs, setMessageLogs] = useState<MessageLog[]>([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        loadData()
      } else {
        setLoading(false)
      }
    } catch (error) {
      console.error('Error checking user:', error)
      setLoading(false)
    }
  }

  const loadData = async () => {
    try {
      // Load intakes
      const { data: intakesData, error: intakesError } = await supabase
        .from('intakes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100)

      if (intakesError) throw intakesError
      setIntakes(intakesData || [])

      // Load consent logs
      const { data: consentData, error: consentError } = await supabase
        .from('consent_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100)

      if (consentError) throw consentError
      setConsentLogs(consentData || [])

      // Load message logs
      const { data: messageData, error: messageError } = await supabase
        .from('message_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100)

      if (messageError) throw messageError
      setMessageLogs(messageData || [])

      setLoading(false)
    } catch (error) {
      console.error('Error loading data:', error)
      setError('Failed to load data')
      setLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSigningIn(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      setUser(data.user)
      await loadData()
    } catch (error: any) {
      setError(error.message || 'Failed to sign in')
    } finally {
      setIsSigningIn(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setIntakes([])
    setConsentLogs([])
    setMessageLogs([])
  }

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return

    const headers = Object.keys(data[0])
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header]
          // Escape commas and quotes in CSV
          if (value === null || value === undefined) return ''
          const stringValue = String(value)
          if (stringValue.includes(',') || stringValue.includes('"')) {
            return `"${stringValue.replace(/"/g, '""')}"`
          }
          return stringValue
        }).join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      pending: 'secondary',
      queued: 'default',
      sent: 'default',
      failed: 'destructive',
      rejected: 'destructive',
    }

    return (
      <Badge variant={variants[status] || 'secondary'}>
        {status.toUpperCase()}
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <CardTitle>Admin Login</CardTitle>
            </div>
            <CardDescription>
              Please sign in to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSigningIn}>
                {isSigningIn ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage intake entries, consent logs, and message logs</p>
        </div>
        <Button variant="outline" onClick={handleSignOut}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>

      <Tabs defaultValue="intakes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="intakes">Intakes ({intakes.length})</TabsTrigger>
          <TabsTrigger value="consent">Consent Logs ({consentLogs.length})</TabsTrigger>
          <TabsTrigger value="messages">Message Logs ({messageLogs.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="intakes">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Intake Entries</CardTitle>
                  <CardDescription>All intake form submissions</CardDescription>
                </div>
                <Button onClick={() => exportToCSV(intakes, 'intakes')}>
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Requester</TableHead>
                      <TableHead>Elder</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {intakes.map((intake) => (
                      <TableRow key={intake.id}>
                        <TableCell className="font-mono text-xs">{intake.id.substring(0, 8)}...</TableCell>
                        <TableCell>{intake.requester_name}</TableCell>
                        <TableCell>{intake.elder_name}</TableCell>
                        <TableCell>{intake.elder_phone}</TableCell>
                        <TableCell>
                          {intake.message_type}
                          {intake.message_type_other && ` (${intake.message_type_other})`}
                        </TableCell>
                        <TableCell>{getStatusBadge(intake.status)}</TableCell>
                        <TableCell>{new Date(intake.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consent">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Consent Logs</CardTitle>
                  <CardDescription>Audit trail of consent acknowledgments</CardDescription>
                </div>
                <Button onClick={() => exportToCSV(consentLogs, 'consent-logs')}>
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Intake ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Consented</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {consentLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-xs">{log.intake_id.substring(0, 8)}...</TableCell>
                        <TableCell>{log.consent_type}</TableCell>
                        <TableCell>
                          <Badge variant={log.consented ? 'default' : 'destructive'}>
                            {log.consented ? 'Yes' : 'No'}
                          </Badge>
                        </TableCell>
                        <TableCell>{log.ip_address || 'N/A'}</TableCell>
                        <TableCell>{new Date(log.created_at).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Message Logs</CardTitle>
                  <CardDescription>Logs of sent messages and delivery status</CardDescription>
                </div>
                <Button onClick={() => exportToCSV(messageLogs, 'message-logs')}>
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Intake ID</TableHead>
                      <TableHead>Sent To</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Twilio SID</TableHead>
                      <TableHead>Sent At</TableHead>
                      <TableHead>Error</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messageLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-xs">{log.intake_id.substring(0, 8)}...</TableCell>
                        <TableCell>{log.sent_to}</TableCell>
                        <TableCell>{getStatusBadge(log.status)}</TableCell>
                        <TableCell className="font-mono text-xs">
                          {log.twilio_message_sid || 'N/A'}
                        </TableCell>
                        <TableCell>{new Date(log.sent_at || log.created_at).toLocaleString()}</TableCell>
                        <TableCell className="text-sm text-destructive">
                          {log.error_message || '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

