import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CTAButton } from '@/components/CTAButton';
import { AnimatedSection } from '@/components/AnimatedSection';
import { ServiceCard } from '@/components/ServiceCard';
import { LocationCard } from '@/components/LocationCard';
import { EmergencyQuiz } from '@/components/EmergencyQuiz';
import {
  PhoneRingingIcon,
  BurstPipeIcon,
  WaterHeaterIcon,
  ToiletIcon,
  DrainIcon,
  LeakDetectorIcon,
  SumpPumpIcon,
  ShieldCheckIcon,
  PricingIcon,
  HomeIcon,
  GuaranteeIcon,
  VeteranIcon,
  WrenchIcon,
  MapIcon,
  ProtectionIcon,
} from '@/components/icons';
import {
  BUSINESS_INFO,
  SERVICES,
  LOCATIONS,
  EMERGENCY_PROBLEMS,
  WHY_CHOOSE_US,
  CREDENTIALS,
} from '@/lib/constants';

export default function HomePage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-trust to-trust-dark text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <AnimatedSection>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                24/7 Emergency Plumbing in Cave Spring & Roanoke
              </h1>
              <p className="text-xl md:text-2xl mb-4 text-blue-100">
                Fast, Reliable, Local
              </p>
              <p className="text-lg mb-8 text-blue-100">
                Locally Owned • Licensed & Insured • Same-Day Service • 1-Year Labor Guarantee
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <CTAButton
                  href={`tel:${BUSINESS_INFO.phone}`}
                  variant="primary"
                  size="lg"
                  icon={<PhoneRingingIcon size={24} />}
                >
                  Call Now
                </CTAButton>
                <CTAButton
                  href={`sms:${BUSINESS_INFO.sms}`}
                  variant="outline"
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 border-white"
                >
                  Text Us
                </CTAButton>
                <CTAButton
                  href="#quote"
                  variant="secondary"
                  size="lg"
                >
                  Get Free Quote
                </CTAButton>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <ShieldCheckIcon size={24} className="text-success-light" />
                  <span className="text-sm">Licensed Master Plumber</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheckIcon size={24} className="text-success-light" />
                  <span className="text-sm">{BUSINESS_INFO.experience}</span>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="flex justify-center">
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="Emergency Plumbing Services"
                  width={400}
                  height={400}
                  className="rounded-full shadow-2xl"
                  priority
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Emergency Problem Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-professional mb-4">
              Common Emergency Problems We Fix
            </h2>
            <p className="text-lg text-gray-600">
              Fast response to your plumbing emergencies
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EMERGENCY_PROBLEMS.slice(0, 6).map((problem, index) => {
              const iconMap: any = {
                burstPipe: BurstPipeIcon,
                waterHeater: WaterHeaterIcon,
                toilet: ToiletIcon,
                drain: DrainIcon,
                leak: LeakDetectorIcon,
              };
              const IconComponent = iconMap[problem.icon] || WrenchIcon;
              
              return (
                <AnimatedSection key={problem.id} delay={index * 0.1}>
                  <Link href={problem.serviceLink}>
                    <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all border-2 border-transparent hover:border-emergency">
                      <div className="flex items-start gap-4">
                        <div className="bg-emergency bg-opacity-10 p-3 rounded-full">
                          <IconComponent size={32} className="text-emergency" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-professional mb-2">
                            {problem.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            {problem.description}
                          </p>
                          <span className="text-emergency font-semibold text-sm hover:underline">
                            Get Help Now →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emergency Quiz Section */}
      <section id="quote" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-professional mb-4">
              Need Help Now?
            </h2>
            <p className="text-lg text-gray-600">
              Tell us your problem in 60 seconds and we&#39;ll get back to you immediately
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <EmergencyQuiz />
          </AnimatedSection>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-professional mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-600">
              Your trusted local plumbing experts
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_CHOOSE_US.map((item, index) => {
              const iconMap: any = {
                emergency: PhoneRingingIcon,
                pricing: PricingIcon,
                local: HomeIcon,
                shield: ShieldCheckIcon,
                guarantee: GuaranteeIcon,
                veteran: VeteranIcon,
              };
              const IconComponent = iconMap[item.icon] || ShieldCheckIcon;

              return (
                <AnimatedSection key={item.title} delay={index * 0.1}>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-trust bg-opacity-10 rounded-full mb-4">
                      <IconComponent size={32} className="text-trust" />
                    </div>
                    <h3 className="text-xl font-bold text-professional mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Area Map Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-trust bg-opacity-10 rounded-full mb-4">
              <MapIcon size={40} className="text-trust" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-professional mb-4">
              Serving Your Community
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              Professional plumbing services across Southwest Virginia
            </p>
            <p className="text-sm text-gray-500">
              Cave Spring • Roanoke • Salem • Hollins • Vinton
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {LOCATIONS.map((location, index) => (
              <AnimatedSection key={location.slug} delay={index * 0.1}>
                <LocationCard
                  name={location.name}
                  state={location.state}
                  slug={location.slug}
                  description={location.description}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-professional mb-4">
              Our Plumbing Services
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive solutions for all your plumbing needs
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, index) => (
              <AnimatedSection key={service.slug} delay={index * 0.1}>
                <ServiceCard
                  title={service.title}
                  description={service.shortDescription}
                  slug={service.slug}
                  icon={service.icon}
                  featured={service.featured}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Greg's Credentials Section */}
      <section className="py-16 bg-professional text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Meet Your Master Plumber
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Greg brings {BUSINESS_INFO.experience} of expert plumbing experience to every job
              </p>
              
              <div className="space-y-3">
                {CREDENTIALS.map((credential, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <ShieldCheckIcon size={24} className="text-success-light flex-shrink-0 mt-1" />
                    <span className="text-blue-100">{credential}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white bg-opacity-10 rounded-lg p-8 backdrop-blur-sm">
                <div className="aspect-square bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                  <p className="text-center text-blue-100">
                    Professional Photo Coming Soon
                  </p>
                </div>
                <p className="text-center text-sm text-blue-100">
                  State Licensed Master Plumber
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Home Protection Plan CTA */}
      <section className="py-16 bg-gradient-to-br from-success to-success-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-6">
              <ProtectionIcon size={48} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Home Protection Plan
            </h2>
            <p className="text-xl mb-6 text-green-100">
              Monthly service plan starting at $19-$29/month
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-8 text-left">
              <div className="flex items-start gap-3">
                <ShieldCheckIcon size={24} className="flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Annual Inspection</p>
                  <p className="text-sm text-green-100">Preventive maintenance</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheckIcon size={24} className="flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Priority Emergency Service</p>
                  <p className="text-sm text-green-100">Jump the queue</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheckIcon size={24} className="flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Discounted Rates</p>
                  <p className="text-sm text-green-100">Save on all services</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheckIcon size={24} className="flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Water Heater Flush & Drain Check</p>
                  <p className="text-sm text-green-100">Included annually</p>
                </div>
              </div>
            </div>
            <CTAButton
              href="/services/home-protection-plan"
              variant="primary"
              size="lg"
              className="bg-white text-black hover:bg-gray-100"
            >
              Learn More About Protection Plans
            </CTAButton>
          </AnimatedSection>
        </div>
      </section>

      {/* Final Emergency CTA */}
      <section className="py-16 bg-emergency text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Plumbing Emergency? We&#39;re Here 24/7
            </h2>
            <p className="text-xl mb-8 text-red-100">
              Burst pipe at 2 AM? We&#39;re already on the way. No hot water? Same-day water heater replacement.
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
                Text for Quick Response
              </CTAButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

