import { Card, CardContent } from '@/components/ui/card';
import { Shield, Heart, Users, Lock, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-sage-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About DignityDialogue
            </h1>
            <p className="text-xl text-muted-foreground">
              Our mission is to combat senior isolation through compassionate telephone companionship
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Our Story & Mission
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                DignityDialogue was born from a simple observation: too many seniors in our communities 
                are facing profound loneliness and isolation. Whether they have no children or relatives nearby, have lost 
                loved ones, or simply find themselves alone in their golden years, these deserving individuals often go 
                days without meaningful human connection.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                We believe that every senior deserves to hear a friendly voice, share their stories, and feel valued. 
                Our trained companions provide more than just conversation—we offer emotional support, genuine friendship, 
                and the reassurance that someone cares. Each call is an opportunity to brighten a day, share a laugh, 
                and remind seniors that they are not alone.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Through our telephone companionship service, we're building bridges across generations and communities, 
                one compassionate conversation at a time. Our mission is to ensure that no senior has to face their 
                golden years in silence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            How Our Service Works
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6">
                <CardContent className="pt-0">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                        1
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Request Received</h3>
                      <p className="text-muted-foreground">
                        A concerned neighbor, social worker, or community member submits a request for companionship 
                        on behalf of a senior, providing details about their personality and preferences.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="pt-0">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                        2
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Careful Matching</h3>
                      <p className="text-muted-foreground">
                        Our team reviews the request and matches the senior with a compatible companion based on 
                        personality, interests, and communication style.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="pt-0">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                        3
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">First Connection</h3>
                      <p className="text-muted-foreground">
                        The companion initiates the first call, introducing themselves and beginning to build 
                        rapport through warm, friendly conversation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="pt-0">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                        4
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Ongoing Companionship</h3>
                      <p className="text-muted-foreground">
                        Regular scheduled calls continue, building a lasting friendship that provides emotional 
                        support and genuine human connection.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Code of Ethics Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              Our Code of Ethics
            </h2>
            <Card className="p-8 border-2 border-primary/20">
              <CardContent className="pt-0">
                <div className="flex items-center space-x-3 mb-6">
                  <Shield className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-semibold">Commitment to Excellence</h3>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Respectful Conversations</h4>
                      <p className="text-muted-foreground">
                        All conversations are respectful, non-judgmental, and appropriate. Our companions are 
                        trained to maintain professional boundaries while providing genuine emotional support.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Strictly Non-Sexual</h4>
                      <p className="text-muted-foreground">
                        Our service is strictly platonic and non-sexual. Any inappropriate conversation is 
                        immediately terminated and reported.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">No Medical or Financial Advice</h4>
                      <p className="text-muted-foreground">
                        Our companions provide emotional support and friendship only. They do not offer medical, 
                        financial, or legal advice under any circumstances.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Privacy & Confidentiality</h4>
                      <p className="text-muted-foreground">
                        All conversations are strictly confidential. Personal information is never shared with 
                        third parties except as required by law.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Privacy & Security Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Lock className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Privacy & Security Commitment
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We take data privacy and security seriously. All personal information is protected with 
              industry-standard encryption and security measures. We never sell, rent, or share personal 
              data with unauthorized third parties.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Compassionate Care</h3>
                <p className="text-sm text-muted-foreground">
                  Every interaction is guided by empathy and respect
                </p>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Trained Companions</h3>
                <p className="text-sm text-muted-foreground">
                  All companions undergo rigorous background checks and training
                </p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Safe & Secure</h3>
                <p className="text-sm text-muted-foreground">
                  Your loved one's safety and privacy are our top priorities
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}