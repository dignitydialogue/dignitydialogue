'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Heart, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Your name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Your email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Your message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }
      
      setIsSubmitted(true);
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24-48 hours.",
      });
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Error",
        description: error instanceof Error ? error.message : "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col">
        <section className="bg-gradient-to-br from-blue-50 to-sage-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Message Received!
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Thank you for reaching out. We'll be in touch soon.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card className="p-8">
                <CardContent className="pt-0">
                  <div className="text-center space-y-4">
                    <h2 className="text-2xl font-semibold">What Happens Next?</h2>
                    <p className="text-muted-foreground">
                      Our team will review your message and respond within 24-48 hours. 
                      If your inquiry is urgent, please don't hesitate to call us directly.
                    </p>
                    <div className="pt-6 space-y-4">
                      <Button asChild className="w-full">
                        <a href="mailto:contact@dignitydialogue.com">
                          <Mail className="h-4 w-4 mr-2" />
                          Email Us Directly
                        </a>
                      </Button>
                      <Button asChild variant="outline" className="w-full">
                        <a href="tel:+15551234567">
                          <Phone className="h-4 w-4 mr-2" />
                          Call Us: (555) 123-4567
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-sage-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Heart className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground">
              We're here to help and answer any questions you may have
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                  <p className="text-muted-foreground mb-8">
                    Whether you have questions about our service, want to request a call for someone, 
                    or need more information about how we can help, we're here for you.
                  </p>
                </div>

                <div className="space-y-6">
                  <Card className="p-6">
                    <CardContent className="pt-0">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                          <Mail className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Email</h3>
                          <p className="text-muted-foreground">contact@dignitydialogue.com</p>
                          <p className="text-sm text-muted-foreground">privacy@dignitydialogue.com</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="p-6">
                    <CardContent className="pt-0">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                          <Phone className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Phone</h3>
                          <p className="text-muted-foreground">(555) 123-4567</p>
                          <p className="text-sm text-muted-foreground">Mon-Fri: 9AM-6PM EST</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="p-6">
                    <CardContent className="pt-0">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                          <MapPin className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Mailing Address</h3>
                          <p className="text-muted-foreground">PO Box 12345</p>
                          <p className="text-muted-foreground">Anytown, USA 12345</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Emergency Information */}
                <Card className="p-6 border-2 border-amber-200 bg-amber-50">
                  <CardContent className="pt-0">
                    <h3 className="font-semibold text-amber-800 mb-2">Emergency Information</h3>
                    <p className="text-sm text-amber-700">
                      If this is an emergency involving a senior's immediate safety or well-being, 
                      please contact local emergency services or adult protective services in your area.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div>
                <Card className="p-8">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle>Send Us a Message</CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 pt-0">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Your Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="John Smith"
                          className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && (
                          <p className="text-sm text-red-500 flex items-center space-x-1">
                            <AlertCircle className="h-4 w-4" />
                            <span>{errors.name}</span>
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="john@example.com"
                          className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500 flex items-center space-x-1">
                            <AlertCircle className="h-4 w-4" />
                            <span>{errors.email}</span>
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">
                          Message <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder="Tell us how we can help you..."
                          rows={6}
                          className={errors.message ? 'border-red-500' : ''}
                        />
                        {errors.message && (
                          <p className="text-sm text-red-500 flex items-center space-x-1">
                            <AlertCircle className="h-4 w-4" />
                            <span>{errors.message}</span>
                          </p>
                        )}
                      </div>

                      <Button 
                        type="submit" 
                        size="lg" 
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <Card className="p-6">
                <CardContent className="pt-0">
                  <h3 className="font-semibold mb-3">How quickly will I receive a response?</h3>
                  <p className="text-muted-foreground">
                    We typically respond to all inquiries within 24-48 hours during business days.
                  </p>
                </CardContent>
              </Card>
              <Card className="p-6">
                <CardContent className="pt-0">
                  <h3 className="font-semibold mb-3">Can I request a call for multiple seniors?</h3>
                  <p className="text-muted-foreground">
                    Yes, you can submit separate requests for each senior who needs companionship.
                  </p>
                </CardContent>
              </Card>
              <Card className="p-6">
                <CardContent className="pt-0">
                  <h3 className="font-semibold mb-3">Is there a cost for the service?</h3>
                  <p className="text-muted-foreground">
                    Please contact us directly for information about our service fees and any available assistance programs.
                  </p>
                </CardContent>
              </Card>
              <Card className="p-6">
                <CardContent className="pt-0">
                  <h3 className="font-semibold mb-3">How do I know the senior is safe?</h3>
                  <p className="text-muted-foreground">
                    All companions undergo thorough background checks and training. We also have safety protocols in place.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}