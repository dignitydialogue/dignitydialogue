import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Shield, Users, Phone, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-sage-50 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Heart className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              DignityDialogue
              <span className="block text-2xl md:text-3xl text-primary mt-2">
                Companion Care
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 italic">
              "Lending an Ear, Mending a Heart."
            </p>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              In a world where many seniors face isolation, we provide compassionate telephone companionship 
              that brings warmth, connection, and hope to those who need it most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                <Link href="/request-call" className="flex items-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>Request a Call for Someone</span>
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link href="/about" className="flex items-center space-x-2">
                  <span>Learn More About Us</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Crisis of Loneliness Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              The Crisis of Loneliness
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Millions of seniors across our country face profound loneliness and isolation. 
              Without regular social contact, many experience declining mental and physical health. 
              At DignityDialogue, we believe no senior should feel alone. 
              Our trained companions provide the human connection that makes all the difference— 
              one compassionate conversation at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center p-6 border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Compassionate Listeners</h3>
                <p className="text-muted-foreground">
                  Our companions are trained to listen with empathy, understanding, and genuine care. 
                  Every conversation is an opportunity to brighten someone's day.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <Shield className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Ethical & Secure</h3>
                <p className="text-muted-foreground">
                  We maintain the highest ethical standards with strict privacy protections. 
                  All conversations are respectful, appropriate, and confidential.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <Heart className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Personalized Companionship</h3>
                <p className="text-muted-foreground">
                  Each senior receives tailored companionship based on their interests, personality, 
                  and emotional needs. We build genuine, lasting connections.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Help a senior in your life experience the warmth of regular companionship. 
            It only takes a moment to request a call that could change everything.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
            <Link href="/request-call" className="flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>Request a Call Today</span>
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}