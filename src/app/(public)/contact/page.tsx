'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // EmailJS configuration - Replace with your actual values from EmailJS dashboard
  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_xxxxxxx';
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_xxxxxxx';
  const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'xxxxxxxxxxxxxxx';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error('Please enter your full name');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter your email address');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!formData.message.trim()) {
      toast.error('Please enter your message');
      return false;
    }
    if (formData.message.trim().length < 10) {
      toast.error('Message should be at least 10 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Initialize EmailJS with your public key
      emailjs.init(EMAILJS_PUBLIC_KEY);

      // Send email using EmailJS
      const templateParams = {
        from_name: formData.fullName,
        from_email: formData.email,
        message: formData.message,
       
        
      };

      console.log(" formData.fullName","formData.email")

      console.log('EmailJS Config:', {
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID,
        publicKey: EMAILJS_PUBLIC_KEY ? 'Set' : 'Not Set'
      });
      console.log('Template Params:', templateParams);

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (result.status === 200) {
        toast.success('Message sent successfully! I\'ll get back to you soon.', {
          icon: <CheckCircle className="h-4 w-4" />,
          duration: 5000,
        });
        
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          message: ''
        });
      }
    } catch (error: unknown) {
      console.error('EmailJS Error:', error);
      
      // More detailed error logging
      const emailError = error as { text?: string; message?: string };
      if (emailError.text) {
        console.error('Error details:', emailError.text);
        toast.error(`Failed to send message: ${emailError.text}`);
      } else if (emailError.message) {
        console.error('Error message:', emailError.message);
        toast.error(`Failed to send message: ${emailError.message}`);
      } else {
        toast.error('Failed to send message. Please check your EmailJS configuration and try again.');
      }
      
      // Show configuration help if likely config issue
      if (emailError.text?.includes('Invalid') || emailError.text?.includes('not found')) {
        toast.error('Please check your EmailJS Service ID, Template ID, and Public Key in your .env.local file');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you. 
            Send me a message and I&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="hover:shadow-lg transition-shadow duration-300 bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <Mail className="h-5 w-5" />
                  Email Me
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-2">Send me an email directly</p>
                <a 
                  href="mailto:rizwanhossainrahat400@gmail.com" 
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  rizwanhossainrahat400@gmail.com
                </a>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Phone className="h-5 w-5" />
                  Call Me
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-2">Let&apos;s have a conversation</p>
                <a 
                  href="tel:+1234567890" 
                  className="text-green-600 hover:text-green-800 font-medium transition-colors"
                >
                  +8801861738648
                </a>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-600">
                  <MapPin className="h-5 w-5" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">Based in</p>
                <p className="text-purple-600 font-medium">
                  Dhaka,Bangladesh
                </p>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-white-800">Connect With Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/rizwanhossainrahat" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    GitHub
                  </a>
                  <a 
                    href="https://linkedin.com/in/rizwanhossainrahat" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a 
                    href="https://www.facebook.com/rizwan.rahat.3" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sky-500 hover:text-sky-700 transition-colors"
                  >
                    Facebook
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white-800">
                  Send Me a Message
                </CardTitle>
                <p className="text-gray-600">
                  Fill out the form below and I&apos;ll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-sm font-medium text-white-700">
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-white-700">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium text-white-700">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project, ask a question, or just say hello..."
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full resize-none"
                      required
                      disabled={isLoading}
                    />
                    <p className="text-xs text-gray-500">
                      Minimum 10 characters ({formData.message.length}/10)
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      disabled={isLoading || !formData.fullName || !formData.email || !formData.message}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-md transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                    
                   
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

       
       
      </div>
    </div>
  );
};

export default ContactPage;