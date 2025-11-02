'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Phone, Heart, Shield, AlertCircle, CheckCircle, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function RequestCallPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    // Requester Information
    requesterName: '',
    requesterEmail: '',
    requesterPhone: '',
    relationship: '',
    
    // Senior Information
    seniorName: '',
    seniorPhone: '',
    seniorAge: '',
    seniorPersonality: '',
    
    // Call Preferences
    conversationTopics: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Requester validation
    if (!formData.requesterName.trim()) {
      newErrors.requesterName = 'Your full name is required';
    }
    if (!formData.requesterEmail.trim()) {
      newErrors.requesterEmail = 'Your email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.requesterEmail)) {
      newErrors.requesterEmail = 'Please enter a valid email address';
    }

    // Senior validation
    if (!formData.seniorName.trim()) {
      newErrors.seniorName = "Senior's full name is required";
    }
    if (!formData.seniorPhone.trim()) {
      newErrors.seniorPhone = "Senior's phone number is required";
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.seniorPhone)) {
      newErrors.seniorPhone = 'Please enter a valid phone number';
    }
    if (!formData.seniorAge.trim()) {
      newErrors.seniorAge = "Senior's age is required";
    } else if (isNaN(Number(formData.seniorAge)) || Number(formData.seniorAge) < 65) {
      newErrors.seniorAge = 'Please enter a valid age (65+)';
    }
    if (!formData.seniorPersonality.trim()) {
      newErrors.seniorPersonality = 'Personality and interests are required';
    }
    if (!formData.conversationTopics.trim()) {
      newErrors.conversationTopics = 'Conversation topics are required';
    }

    // Consent validation
    if (!formData.consent) {
      newErrors.consent = 'You must confirm you have the senior\'s consent';
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
      const response = await fetch('/api/companion-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit request');
      }
      
      setIsSubmitted(true);
      toast({
        title: "Request Submitted Successfully!",
        description: "We'll review your request and contact you within 24-48 hours.",
      });
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Error",
        description: error instanceof Error ? error.message : "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
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
                Request Received!
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Thank you for your compassionate request. We'll be in touch soon.
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
                    <div className="space-y-4 text-left">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold mt-0.5">
                          1
                        </div>
                        <div>
                          <h3 className="font-semibold">Review Process</h3>
                          <p className="text-muted-foreground">
                            Our team will review your request within 24 hours
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold mt-0.5">
                          2
                        </div>
                        <div>
                          <h3 className="font-semibold">Companion Matching</h3>
                          <p className="text-muted-foreground">
                            We'll match the senior with a compatible companion
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold mt-0.5">
                          3
                        </div>
                        <div>
                          <h3 className="font-semibold">First Call</h3>
                          <p className="text-muted-foreground">
                            The companion will initiate the first friendly call
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="pt-6">
                      <p className="text-muted-foreground mb-4">
                        If you have any questions, please don't hesitate to contact us.
                      </p>
                      <Button asChild>
                        <a href="mailto:contact@dignitydialogue.com">
                          Contact Us
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
              <Phone className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Request a Call for Someone
            </h1>
            <p className="text-xl text-muted-foreground">
              Fill out this form to request compassionate telephone companionship for a senior
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Requester Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Your Information (The Requester)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="requesterName">
                        Your Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="requesterName"
                        value={formData.requesterName}
                        onChange={(e) => handleInputChange('requesterName', e.target.value)}
                        placeholder="John Smith"
                        className={errors.requesterName ? 'border-red-500' : ''}
                      />
                      {errors.requesterName && (
                        <p className="text-sm text-red-500 flex items-center space-x-1">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.requesterName}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="requesterEmail">
                        Your Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="requesterEmail"
                        type="email"
                        value={formData.requesterEmail}
                        onChange={(e) => handleInputChange('requesterEmail', e.target.value)}
                        placeholder="john@example.com"
                        className={errors.requesterEmail ? 'border-red-500' : ''}
                      />
                      {errors.requesterEmail && (
                        <p className="text-sm text-red-500 flex items-center space-x-1">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.requesterEmail}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="requesterPhone">
                        Your Phone Number
                      </Label>
                      <Input
                        id="requesterPhone"
                        type="tel"
                        value={formData.requesterPhone}
                        onChange={(e) => handleInputChange('requesterPhone', e.target.value)}
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="relationship">
                        Your Relationship to the Senior
                      </Label>
                      <Select onValueChange={(value) => handleInputChange('relationship', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="neighbor">Neighbor</SelectItem>
                          <SelectItem value="social-worker">Social Worker</SelectItem>
                          <SelectItem value="friend">Friend</SelectItem>
                          <SelectItem value="community-member">Community Member</SelectItem>
                          <SelectItem value="caregiver">Caregiver</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Senior Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5 text-primary" />
                    <span>Senior's Information (The Recipient)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="seniorName">
                        Senior's Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="seniorName"
                        value={formData.seniorName}
                        onChange={(e) => handleInputChange('seniorName', e.target.value)}
                        placeholder="Mary Johnson"
                        className={errors.seniorName ? 'border-red-500' : ''}
                      />
                      {errors.seniorName && (
                        <p className="text-sm text-red-500 flex items-center space-x-1">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.seniorName}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="seniorPhone">
                        Senior's Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="seniorPhone"
                        type="tel"
                        value={formData.seniorPhone}
                        onChange={(e) => handleInputChange('seniorPhone', e.target.value)}
                        placeholder="(555) 123-4567"
                        className={errors.seniorPhone ? 'border-red-500' : ''}
                      />
                      {errors.seniorPhone && (
                        <p className="text-sm text-red-500 flex items-center space-x-1">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.seniorPhone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seniorAge">
                      Senior's Age <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="seniorAge"
                      type="number"
                      value={formData.seniorAge}
                      onChange={(e) => handleInputChange('seniorAge', e.target.value)}
                      placeholder="75"
                      className={errors.seniorAge ? 'border-red-500' : ''}
                    />
                    {errors.seniorAge && (
                      <p className="text-sm text-red-500 flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.seniorAge}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seniorPersonality">
                      Senior's General Personality & Interests <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="seniorPersonality"
                      value={formData.seniorPersonality}
                      onChange={(e) => handleInputChange('seniorPersonality', e.target.value)}
                      placeholder="e.g., Loves gardening and old jazz music, a bit shy but enjoys hearing about the weather and local news, former teacher who likes to talk about history..."
                      rows={4}
                      className={errors.seniorPersonality ? 'border-red-500' : ''}
                    />
                    {errors.seniorPersonality && (
                      <p className="text-sm text-red-500 flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.seniorPersonality}</span>
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Call Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>Call Preferences</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="conversationTopics">
                      Desired Conversation Topics <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="conversationTopics"
                      value={formData.conversationTopics}
                      onChange={(e) => handleInputChange('conversationTopics', e.target.value)}
                      placeholder="e.g., Just be a friendly voice and ask about their day, pretend to be a distant niece/nephew checking in, talk about classic films from the 1950s, discuss gardening and weather..."
                      rows={4}
                      className={errors.conversationTopics ? 'border-red-500' : ''}
                    />
                    {errors.conversationTopics && (
                      <p className="text-sm text-red-500 flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.conversationTopics}</span>
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Consent and Privacy */}
              <Card className="border-2 border-primary/20">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="consent"
                        checked={formData.consent}
                        onCheckedChange={(checked) => handleInputChange('consent', checked as boolean)}
                      />
                      <div className="space-y-2">
                        <Label htmlFor="consent" className="text-sm font-normal">
                          By submitting this form, I confirm that I have the senior's consent to be contacted by DignityDialogue for this compassionate service. <span className="text-red-500">*</span>
                        </Label>
                        {errors.consent && (
                          <p className="text-sm text-red-500 flex items-center space-x-1">
                            <AlertCircle className="h-4 w-4" />
                            <span>{errors.consent}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">Privacy Notice</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Your information is protected and will only be used to provide the companionship service. 
                        We never sell or share personal data with unauthorized third parties.
                      </p>
                      <p className="text-sm">
                        <a href="/privacy-policy" className="text-primary hover:underline">
                          Read our full Privacy Policy
                        </a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Phone className="h-5 w-5 mr-2" />
                      Submit Request
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}