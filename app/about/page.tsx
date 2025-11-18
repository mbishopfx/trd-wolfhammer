import React from 'react';
import type { Metadata } from 'next';
import { AnimatedSection } from '@/components/AnimatedSection';
import { CTAButton } from '@/components/CTAButton';
import {
  ShieldCheckIcon,
  WrenchIcon,
  PhoneRingingIcon,
  ClockIcon,
  GuaranteeIcon,
  VeteranIcon,
} from '@/components/icons';
import { BUSINESS_INFO, CREDENTIALS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Us | Licensed Master Plumber | Cave Spring & Roanoke, VA',
  description: '16+ years of expert plumbing experience. State licensed master plumber, gas fitter, and backflow inspector. Family-owned plumbing business serving Cave Spring and Roanoke.',
};

export default function AboutPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-professional to-professional-light text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About Our Plumbing Company
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              {BUSINESS_INFO.experience} of professional plumbing service in Cave Spring, Roanoke, and surrounding areas
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-professional mb-6">
                Your Trusted Local Plumbing Experts
              </h2>
              <div className="space-y-4 text-gray-700 text-lg">
                <p>
                  We&#39;re a family-owned plumbing business dedicated to serving the Cave Spring and Roanoke
                  communities with honest, professional plumbing services. Since our founding, we&#39;ve built
                  our reputation on quality workmanship, fair pricing, and exceptional customer service.
                </p>
                <p>
                  Our team is led by Greg, a state licensed master plumber with {BUSINESS_INFO.experience} of
                  hands-on experience. We specialize in emergency plumbing, water heater services, drain cleaning,
                  leak detection, and complete plumbing installations for residential and commercial properties.
                </p>
                <p>
                  What sets us apart is our commitment to the local community. We understand the unique challenges
                  of Roanoke-area homes, especially older properties built in the 1950s-1980s that require
                  specialized knowledge of aging plumbing systems.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-trust bg-opacity-10 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-trust mb-2">16+</div>
                  <p className="text-gray-700 font-medium">Years Experience</p>
                </div>
                <div className="bg-success bg-opacity-10 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-success mb-2">24/7</div>
                  <p className="text-gray-700 font-medium">Emergency Service</p>
                </div>
                <div className="bg-emergency bg-opacity-10 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-emergency mb-2">100%</div>
                  <p className="text-gray-700 font-medium">Licensed & Insured</p>
                </div>
                <div className="bg-professional bg-opacity-10 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-professional mb-2">1 Year</div>
                  <p className="text-gray-700 font-medium">Labor Guarantee</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Greg's Credentials */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-trust bg-opacity-10 rounded-full mb-6">
              <WrenchIcon size={48} className="text-trust" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-professional mb-4">
              Meet Greg - Your Master Plumber
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              State licensed master plumber with extensive training and certifications
            </p>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <AnimatedSection>
                    <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center mb-6">
                      <div className="text-center p-8">
                        <ShieldCheckIcon size={80} className="text-trust mx-auto mb-4" />
                        <p className="text-gray-600">
                          Professional Photo<br />Coming Soon
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                </div>

                <AnimatedSection delay={0.2}>
                  <h3 className="text-2xl font-bold text-professional mb-6">
                    Certifications & Expertise
                  </h3>
                  <div className="space-y-3">
                    {CREDENTIALS.map((credential, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <ShieldCheckIcon size={24} className="text-success flex-shrink-0 mt-1" />
                        <span className="text-gray-700">{credential}</span>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-gray-700 text-lg">
                  Greg&#39;s extensive experience includes residential and commercial plumbing, boiler systems,
                  pump installations, gas fitting, and backflow prevention. He stays current with the latest
                  plumbing technologies and techniques to provide the best service to every customer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-professional mb-4">
              Our Commitment to You
            </h2>
            <p className="text-xl text-gray-600">
              Values that guide our business every day
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emergency bg-opacity-10 rounded-full mb-4">
                  <ClockIcon size={32} className="text-emergency" />
                </div>
                <h3 className="text-xl font-bold text-professional mb-3">Fast Response</h3>
                <p className="text-gray-600">
                  We understand plumbing emergencies can&#39;t wait. We respond quickly to protect your home
                  from damage.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-trust bg-opacity-10 rounded-full mb-4">
                  <ShieldCheckIcon size={32} className="text-trust" />
                </div>
                <h3 className="text-xl font-bold text-professional mb-3">Honest Service</h3>
                <p className="text-gray-600">
                  Upfront pricing, transparent communication, and honest recommendations. No surprises, no hidden fees.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-success bg-opacity-10 rounded-full mb-4">
                  <GuaranteeIcon size={32} className="text-success" />
                </div>
                <h3 className="text-xl font-bold text-professional mb-3">Quality Guaranteed</h3>
                <p className="text-gray-600">
                  We stand behind our work with a 1-year labor guarantee. Your satisfaction is our priority.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-professional bg-opacity-10 rounded-full mb-4">
                  <WrenchIcon size={32} className="text-professional" />
                </div>
                <h3 className="text-xl font-bold text-professional mb-3">Expert Craftsmanship</h3>
                <p className="text-gray-600">
                  Master plumber with 16+ years experience and continuing education in the latest plumbing techniques.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-trust bg-opacity-10 rounded-full mb-4">
                  <PhoneRingingIcon size={32} className="text-trust" />
                </div>
                <h3 className="text-xl font-bold text-professional mb-3">Local & Available</h3>
                <p className="text-gray-600">
                  Family-owned local business. We&#39;re here for you 24/7, not just during business hours.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-success bg-opacity-10 rounded-full mb-4">
                  <VeteranIcon size={32} className="text-success" />
                </div>
                <h3 className="text-xl font-bold text-professional mb-3">Community Focused</h3>
                <p className="text-gray-600">
                  Special discounts for veterans and first responders. Proud to serve those who serve us.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emergency text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience the Difference?
            </h2>
            <p className="text-xl mb-8 text-red-100">
              Call now and discover why families trust us with their plumbing needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton
                href={`tel:${BUSINESS_INFO.phone}`}
                variant="primary"
                size="lg"
                icon={<PhoneRingingIcon size={24} />}
                className="bg-white text-emergency hover:bg-gray-100"
              >
                {BUSINESS_INFO.phone}
              </CTAButton>
              <CTAButton
                href="/contact"
                variant="outline"
                size="lg"
                className="bg-transparent border-white text-white hover:bg-white hover:text-emergency"
              >
                Contact Us
              </CTAButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

