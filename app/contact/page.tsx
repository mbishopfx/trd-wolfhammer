'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AnimatedSection } from '@/components/AnimatedSection';
import { CTAButton } from '@/components/CTAButton';
import {
  PhoneRingingIcon,
  LocationPinIcon,
  ClockIcon,
  ShieldCheckIcon,
} from '@/components/icons';
import { BUSINESS_INFO, LOCATIONS } from '@/lib/constants';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
        reset();
        
        // Reset submitted state after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert('Failed to submit. Please try calling us directly.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit. Please try calling us directly.');
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-trust to-trust-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Get in touch for emergency service or schedule an appointment
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <AnimatedSection>
              <div className="text-center bg-gray-50 rounded-lg p-8 h-full">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emergency bg-opacity-10 rounded-full mb-4">
                  <PhoneRingingIcon size={32} className="text-emergency" />
                </div>
                <h3 className="text-xl font-bold text-professional mb-3">Call Us</h3>
                <p className="text-gray-600 mb-4">
                  For fastest response, call us directly
                </p>
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="text-trust font-bold text-lg hover:underline"
                >
                  {BUSINESS_INFO.phone}
                </a>
                <p className="text-sm text-gray-500 mt-2">24/7 Emergency Line</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="text-center bg-gray-50 rounded-lg p-8 h-full">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-trust bg-opacity-10 rounded-full mb-4">
                  <ClockIcon size={32} className="text-trust" />
                </div>
                <h3 className="text-xl font-bold text-professional mb-3">Business Hours</h3>
                <div className="text-gray-600 space-y-1">
                  <p className="font-semibold text-emergency">24/7 Emergency Service</p>
                  <p className="mt-4">Office Hours:</p>
                  <p>Monday - Friday: 8am - 5pm</p>
                  <p>Saturday: 9am - 2pm</p>
                  <p>Sunday: Emergency Only</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="text-center bg-gray-50 rounded-lg p-8 h-full">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-success bg-opacity-10 rounded-full mb-4">
                  <LocationPinIcon size={32} className="text-success" />
                </div>
                <h3 className="text-xl font-bold text-professional mb-3">Service Area</h3>
                <p className="text-gray-600 mb-3">
                  Proudly serving:
                </p>
                <div className="text-sm text-gray-600 space-y-1">
                  {LOCATIONS.map((location) => (
                    <p key={location.slug}>{location.name}, {location.state}</p>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto">
            <AnimatedSection delay={0.3}>
              <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                <h2 className="text-3xl font-bold text-professional mb-6 text-center">
                  Request Service or Get a Quote
                </h2>

                {submitted && (
                  <div className="mb-6 p-4 bg-success bg-opacity-10 border border-success rounded-lg">
                    <p className="text-success font-semibold text-center">
                      Thank you! Your message has been sent. We&#39;ll get back to you soon.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      {...register('name')}
                      type="text"
                      id="name"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-trust ${
                        errors.name ? 'border-emergency' : 'border-gray-200'
                      }`}
                      placeholder="John Smith"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-emergency">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email and Phone */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        {...register('email')}
                        type="email"
                        id="email"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-trust ${
                          errors.email ? 'border-emergency' : 'border-gray-200'
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-emergency">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        {...register('phone')}
                        type="tel"
                        id="phone"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-trust ${
                          errors.phone ? 'border-emergency' : 'border-gray-200'
                        }`}
                        placeholder="(540) 123-4567"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-emergency">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Service */}
                  <div>
                    <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                      Service Needed *
                    </label>
                    <select
                      {...register('service')}
                      id="service"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-trust ${
                        errors.service ? 'border-emergency' : 'border-gray-200'
                      }`}
                    >
                      <option value="">Select a service...</option>
                      <option value="Emergency Plumbing">Emergency Plumbing</option>
                      <option value="Water Heater">Water Heater Repair/Installation</option>
                      <option value="Drain Cleaning">Drain Cleaning & Sewer Services</option>
                      <option value="Leak Detection">Leak Detection & Repair</option>
                      <option value="Toilet/Fixture">Toilet & Fixture Repairs</option>
                      <option value="Remodel">Bathroom/Kitchen Remodel</option>
                      <option value="Sump Pump">Sump Pump & Waterproofing</option>
                      <option value="Protection Plan">Home Protection Plan</option>
                      <option value="Other">Other/Not Sure</option>
                    </select>
                    {errors.service && (
                      <p className="mt-1 text-sm text-emergency">{errors.service.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      {...register('message')}
                      id="message"
                      rows={5}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-trust ${
                        errors.message ? 'border-emergency' : 'border-gray-200'
                      }`}
                      placeholder="Please describe your plumbing issue or what service you need..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-emergency">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-8 py-4 rounded-full font-bold text-lg transition-all ${
                      isSubmitting
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-trust text-white hover:bg-trust-dark transform hover:scale-105'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    For emergencies, please call us directly at <a href={`tel:${BUSINESS_INFO.phone}`} className="text-emergency font-semibold hover:underline">{BUSINESS_INFO.phone}</a>
                  </p>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-16 bg-emergency text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Have a Plumbing Emergency?
            </h2>
            <p className="text-xl mb-8 text-red-100">
              Don&#39;t wait for email responses. Call now for immediate assistance!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton
                href={`tel:${BUSINESS_INFO.phone}`}
                variant="primary"
                size="lg"
                icon={<PhoneRingingIcon size={24} />}
                className="bg-white text-black hover:bg-gray-100"
              >
                {BUSINESS_INFO.phone}
              </CTAButton>
              <CTAButton
                href={`sms:${BUSINESS_INFO.sms}`}
                variant="outline"
                size="lg"
                className="bg-transparent border-white text-white hover:bg-white hover:text-emergency"
              >
                Text Us
              </CTAButton>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <AnimatedSection>
              <div className="flex flex-col items-center">
                <ShieldCheckIcon size={40} className="text-trust mb-2" />
                <p className="font-semibold text-professional">Licensed Master Plumber</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="flex flex-col items-center">
                <ShieldCheckIcon size={40} className="text-success mb-2" />
                <p className="font-semibold text-professional">{BUSINESS_INFO.experience}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="flex flex-col items-center">
                <ShieldCheckIcon size={40} className="text-emergency mb-2" />
                <p className="font-semibold text-professional">1-Year Labor Guarantee</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <div className="flex flex-col items-center">
                <ShieldCheckIcon size={40} className="text-professional mb-2" />
                <p className="font-semibold text-professional">24/7 Emergency Service</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}

