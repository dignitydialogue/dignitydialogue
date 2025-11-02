import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Users, Phone, Heart, CheckCircle, Clock, MessageCircle } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-sage-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              How Our Service Works
            </h1>
            <p className="text-xl text-muted-foreground">
              A simple, step-by-step process to connect seniors with compassionate companions
            </p>
          </div>
        </div>
      </section>

      {/* Main Process Steps */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
              Getting Started is Easy
            </h2>
            
            <div className="space-y-12">
              {/* Step 1 */}
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <Card className="p-8 h-full">
                    <CardContent className="pt-0">
                      <div className="flex items-center space-x-3 mb-4">
                        <Users className="h-8 w-8 text-primary" />
                        <h3 className="text-2xl font-semibold">Provide Senior's Details</h3>
                      </div>
                      <p className="text-lg text-muted-foreground mb-4">
                        You provide us with information about the senior who would benefit from companionship, 
                        including their personality, interests, and communication preferences.
                      </p>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">What we need to know:</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Senior's name, age, and contact information</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Personality traits and interests</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Preferred conversation topics</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Best times to call</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <Card className="p-8 h-full">
                    <CardContent className="pt-0">
                      <div className="flex items-center space-x-3 mb-4">
                        <Heart className="h-8 w-8 text-primary" />
                        <h3 className="text-2xl font-semibold">We Review & Match</h3>
                      </div>
                      <p className="text-lg text-muted-foreground mb-4">
                        Our team carefully reviews your request and matches the senior with a compatible companion 
                        based on personality, interests, and communication style.
                      </p>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Our matching process includes:</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Personality compatibility assessment</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Interest and hobby alignment</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Communication style matching</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Background-checked, trained companions</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <Card className="p-8 h-full">
                    <CardContent className="pt-0">
                      <div className="flex items-center space-x-3 mb-4">
                        <Phone className="h-8 w-8 text-primary" />
                        <h3 className="text-2xl font-semibold">We Initiate the First Call</h3>
                      </div>
                      <p className="text-lg text-muted-foreground mb-4">
                        The companion makes the first call, introducing themselves and beginning to build 
                        rapport through warm, friendly conversation tailored to the senior's preferences.
                      </p>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">First call expectations:</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Warm, friendly introduction</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Conversation based on provided preferences</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Building comfort and trust</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Scheduling future calls</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <Card className="p-8 h-full">
                    <CardContent className="pt-0">
                      <div className="flex items-center space-x-3 mb-4">
                        <MessageCircle className="h-8 w-8 text-primary" />
                        <h3 className="text-2xl font-semibold">Ongoing Companionship</h3>
                      </div>
                      <p className="text-lg text-muted-foreground mb-4">
                        Regular scheduled calls continue, building a lasting friendship that provides 
                        consistent emotional support and genuine human connection.
                      </p>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">What to expect ongoing:</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Regular scheduled calls (frequency based on needs)</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Personalized conversation topics</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Emotional support and friendship</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Consistent, reliable companionship</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Our Service Special */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
              What Makes Our Service Special
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 text-center">
                <CardContent className="pt-0">
                  <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Flexible Scheduling</h3>
                  <p className="text-muted-foreground">
                    Calls are scheduled at times that work best for the senior, 
                    ensuring they're always comfortable and ready to chat.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 text-center">
                <CardContent className="pt-0">
                  <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Genuine Connections</h3>
                  <p className="text-muted-foreground">
                    Our companions build real friendships based on shared interests 
                    and authentic care for the senior's wellbeing.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 text-center">
                <CardContent className="pt-0">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Professional Care</h3>
                  <p className="text-muted-foreground">
                    All companions are thoroughly screened, trained, and supervised 
                    to ensure the highest quality of care.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Take the first step in bringing companionship to a senior who needs it. 
            Our simple form makes it easy to request a call today.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
            <Link href="/request-call" className="flex items-center space-x-2">
              <span>Request a Call Now</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}