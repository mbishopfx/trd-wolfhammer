import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { LOCATION_CONTENT } from '@/lib/location-data';
import { LOCATIONS, SERVICES, BUSINESS_INFO } from '@/lib/constants';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { LocationSchema } from '@/components/seo/LocationSchema';
import { AnimatedSection } from '@/components/AnimatedSection';
import { CTAButton } from '@/components/CTAButton';
import { ServiceCard } from '@/components/ServiceCard';
import {
  PhoneRingingIcon,
  LocationPinIcon,
  ClockIcon,
  ShieldCheckIcon,
  MapIcon,
} from '@/components/icons';

interface LocationPageProps {
  params: Promise<{
    location: string;
  }>;
}

export async function generateStaticParams() {
  return LOCATIONS.map((location) => ({
    location: location.slug,
  }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { location } = await params;
  const locationContent = LOCATION_CONTENT[location];
  
  if (!locationContent) {
    return {
      title: 'Location Not Found',
    };
  }

  return {
    title: `Plumber in ${locationContent.name}, ${locationContent.state} | Emergency Service`,
    description: locationContent.metaDescription,
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { location } = await params;
  const locationContent = LOCATION_CONTENT[location];
  const locationInfo = LOCATIONS.find((l) => l.slug === location);

  if (!locationContent || !locationInfo) {
    notFound();
  }

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Service Areas', url: '/#service-areas' },
    { name: `${locationContent.name}, ${locationContent.state}`, url: `/locations/${location}` },
  ];

  const featuredServices = SERVICES.filter((s) => s.featured).slice(0, 6);

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <LocationSchema
        locationName={locationContent.name}
        lat={locationContent.coordinates.lat}
        lng={locationContent.coordinates.lng}
        description={locationContent.metaDescription}
      />

      <div className="bg-gray-50 min-h-screen">
        {/* Sticky Emergency CTA */}
        <div className="sticky top-16 z-30 bg-emergency text-white py-3 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <p className="text-sm sm:text-base font-semibold">
              Emergency Plumber in {locationContent.name}? Call Now!
            </p>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="bg-white text-emergency px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-100 transition-all"
            >
              {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-trust to-trust-dark text-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-6">
                <LocationPinIcon size={32} />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {locationContent.h1}
              </h1>
              
              <p className="text-xl mb-8 text-blue-100 max-w-3xl">
                {locationContent.heroDescription}
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-8 max-w-2xl">
                <div className="flex items-center gap-3 bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-lg">
                  <ClockIcon size={24} className="flex-shrink-0" />
                  <div>
                    <p className="font-semibold">24/7 Emergency Service</p>
                    <p className="text-sm text-blue-100">{locationContent.responseTime.split(':')[1]}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-lg">
                  <ShieldCheckIcon size={24} className="flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Licensed & Insured</p>
                    <p className="text-sm text-blue-100">{BUSINESS_INFO.experience}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <CTAButton
                  href={`tel:${BUSINESS_INFO.phone}`}
                  variant="primary"
                  size="lg"
                  icon={<PhoneRingingIcon size={24} />}
                  className="bg-white text-trust hover:bg-gray-100"
                >
                  Call Now
                </CTAButton>
                <CTAButton
                  href={`sms:${BUSINESS_INFO.sms}`}
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-trust"
                >
                  Text Us
                </CTAButton>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Local Problems Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-professional mb-4">
                Common Plumbing Problems in {locationContent.name}
              </h2>
              <p className="text-lg text-gray-600">
                We understand the unique challenges facing {locationContent.name} homes
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {locationContent.localProblems.map((problem, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="bg-gray-50 rounded-lg p-6 flex items-start gap-3">
                    <span className="text-emergency font-bold text-xl flex-shrink-0">✕</span>
                    <p className="text-gray-700">{problem}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-12 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-professional mb-4">
                Why Choose Us for {locationContent.name} Plumbing
              </h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locationContent.whyChooseUs.map((reason, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="bg-white rounded-lg p-6 flex items-start gap-3 h-full shadow-md">
                    <ShieldCheckIcon size={24} className="text-success flex-shrink-0 mt-1" />
                    <p className="text-gray-700">{reason}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Neighborhoods Section */}
        <section className="py-12 bg-professional text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-10 rounded-full mb-4">
                <MapIcon size={40} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Neighborhoods We Serve in {locationContent.name}
              </h2>
              <p className="text-xl text-blue-100">
                Fast response throughout the {locationContent.name} area
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
                {locationContent.neighborhoods.map((neighborhood, index) => (
                  <div
                    key={index}
                    className="bg-white bg-opacity-10 backdrop-blur-sm px-4 py-2 rounded-full"
                  >
                    <span className="text-blue-100">{neighborhood}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Services in This Area */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-professional mb-4">
                Plumbing Services in {locationContent.name}
              </h2>
              <p className="text-lg text-gray-600">
                Comprehensive plumbing solutions for {locationContent.name} residents
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {featuredServices.map((service, index) => (
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

            <AnimatedSection className="text-center">
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-professional mb-4">
                  Service Highlights for {locationContent.name}
                </h3>
                <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                  {locationContent.serviceHighlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-3 text-left">
                      <ShieldCheckIcon size={20} className="text-trust flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Response Time Section */}
        <section className="py-12 bg-success text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection>
              <ClockIcon size={64} className="mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Fast Response Times in {locationContent.name}
              </h2>
              <p className="text-2xl mb-8 text-green-100">
                {locationContent.responseTime}
              </p>
              <p className="text-lg text-green-100 mb-8">
                We understand that plumbing emergencies can&#39;t wait. Our {locationContent.name} team is
                ready to respond quickly to protect your home.
              </p>
              <CTAButton
                href={`tel:${BUSINESS_INFO.phone}`}
                variant="primary"
                size="lg"
                icon={<PhoneRingingIcon size={24} />}
                className="bg-white text-success hover:bg-gray-100"
              >
                Call for Emergency Service
              </CTAButton>
            </AnimatedSection>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-emergency text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Need a Plumber in {locationContent.name}?
              </h2>
              <p className="text-xl mb-8 text-red-100">
                Call now for fast, professional service from your local licensed master plumber
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
                  href="/"
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-emergency"
                >
                  View All Services
                </CTAButton>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </>
  );
}

