import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, Phone, Clock, Shield, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function ServicesPage() {
  const services = [
    {
      icon: Heart,
      title: 'Birthday Messages',
      description: 'Send warm birthday wishes to brighten their special day',
    },
    {
      icon: Heart,
      title: 'Holiday Greetings',
      description: 'Compassionate messages during holidays when loneliness can be most acute',
    },
    {
      icon: Heart,
      title: 'Regular Check-ins',
      description: 'Periodic messages to show someone cares and is thinking of them',
    },
    {
      icon: Heart,
      title: 'Encouragement',
      description: 'Uplifting messages during difficult times or to celebrate milestones',
    },
  ]

  const values = [
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'All information is kept confidential and secure',
    },
    {
      icon: CheckCircle2,
      title: 'Verified Consent',
      description: 'We require explicit consent and maintain detailed audit logs',
    },
    {
      icon: Heart,
      title: 'Compassionate Care',
      description: 'Messages are crafted with genuine care and respect',
    },
    {
      icon: Clock,
      title: 'Reliable Service',
      description: 'Timely delivery of messages when they matter most',
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-sage-50 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Our Services
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Providing compassionate companion messages to isolated seniors
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Message Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <Card key={index}>
                  <CardHeader>
                    <service.icon className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Commitment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <Card key={index}>
                  <CardHeader>
                    <value.icon className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Request a companion message for someone you care about
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/intake" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Submit Intake Form
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

