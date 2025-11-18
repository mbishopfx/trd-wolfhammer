import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SERVICE_CONTENT } from '@/lib/service-data';
import { SERVICES, BUSINESS_INFO } from '@/lib/constants';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { ServiceSchema } from '@/components/seo/ServiceSchema';
import { AnimatedSection } from '@/components/AnimatedSection';
import { CTAButton } from '@/components/CTAButton';
import { ServiceCard } from '@/components/ServiceCard';
import {
  PhoneRingingIcon,
  ShieldCheckIcon,
  ClockIcon,
  PricingIcon,
} from '@/components/icons';

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const serviceContent = SERVICE_CONTENT[slug];
  
  if (!serviceContent) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: serviceContent.title + ' | Cave Spring & Roanoke, VA',
    description: serviceContent.metaDescription,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const serviceContent = SERVICE_CONTENT[slug];
  const serviceInfo = SERVICES.find((s) => s.slug === slug);

  if (!serviceContent || !serviceInfo) {
    notFound();
  }

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/#services' },
    { name: serviceContent.title, url: `/services/${slug}` },
  ];

  const relatedServices = SERVICES.filter((s) =>
    serviceContent.relatedServices.includes(s.slug)
  );

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <ServiceSchema
        serviceName={serviceContent.title}
        description={serviceContent.metaDescription}
        url={`${baseUrl}/services/${slug}`}
      />

      <div className="bg-gray-50 min-h-screen">
        {/* Sticky Emergency CTA */}
        <div className="sticky top-16 z-30 bg-emergency text-white py-3 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <p className="text-sm sm:text-base font-semibold">
              Need {serviceContent.title}? Call Now!
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
        <section className="bg-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h1 className="text-4xl md:text-5xl font-bold text-professional mb-6">
                {serviceContent.h1}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {serviceContent.heroDescription}
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                  <ClockIcon size={24} className="text-trust flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-professional">24/7 Available</p>
                    <p className="text-sm text-gray-600">Emergency service</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                  <ShieldCheckIcon size={24} className="text-success flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-professional">Licensed & Insured</p>
                    <p className="text-sm text-gray-600">Master plumber</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                  <PricingIcon size={24} className="text-trust flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-professional">Upfront Pricing</p>
                    <p className="text-sm text-gray-600">No surprises</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <CTAButton
                  href={`tel:${BUSINESS_INFO.phone}`}
                  variant="primary"
                  size="lg"
                  icon={<PhoneRingingIcon size={24} />}
                >
                  Call for Service
                </CTAButton>
                <CTAButton href="#quote" variant="secondary" size="lg">
                  Request Free Quote
                </CTAButton>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Problems Section */}
        <section className="py-12 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <AnimatedSection>
                <h2 className="text-3xl font-bold text-professional mb-6">
                  Are You Experiencing These Problems?
                </h2>
                <ul className="space-y-3">
                  {serviceContent.problems.map((problem, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-emergency font-bold text-xl flex-shrink-0">✕</span>
                      <span className="text-gray-700">{problem}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <h2 className="text-3xl font-bold text-professional mb-6">
                  Our Solutions
                </h2>
                <ul className="space-y-3">
                  {serviceContent.solutions.map((solution, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <ShieldCheckIcon size={24} className="text-success flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{solution}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-professional mb-4">
                How We Fix It
              </h2>
              <p className="text-lg text-gray-600">
                Our proven process for {serviceContent.title.toLowerCase()}
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviceContent.process.map((step, index) => (
                <AnimatedSection key={step.step} delay={index * 0.1}>
                  <div className="bg-gray-50 rounded-lg p-6 h-full">
                    <div className="w-12 h-12 bg-trust text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold text-professional mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-12 bg-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-start gap-4 mb-6">
                <PricingIcon size={40} className="text-trust flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-professional mb-2">
                    Transparent Pricing
                  </h2>
                  <p className="text-gray-600">{serviceContent.pricingMessage}</p>
                </div>
              </div>
              <CTAButton
                href={`tel:${BUSINESS_INFO.phone}`}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Call for Free Estimate
              </CTAButton>
            </AnimatedSection>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="py-12 bg-professional text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Greg&#39;s Expertise in {serviceContent.title}
              </h2>
              <p className="text-xl text-blue-100">{BUSINESS_INFO.experience} serving your community</p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {serviceContent.expertise.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <ShieldCheckIcon size={24} className="text-success-light flex-shrink-0 mt-1" />
                    <span className="text-blue-100">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AnimatedSection className="text-center mb-12">
                <h2 className="text-3xl font-bold text-professional mb-4">
                  Related Services
                </h2>
                <p className="text-lg text-gray-600">
                  Other plumbing services we provide
                </p>
              </AnimatedSection>

              <div className="grid md:grid-cols-3 gap-6">
                {relatedServices.map((service, index) => (
                  <AnimatedSection key={service.slug} delay={index * 0.1}>
                    <ServiceCard
                      title={service.title}
                      description={service.shortDescription}
                      slug={service.slug}
                      icon={service.icon}
                      featured={false}
                    />
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section id="quote" className="py-16 bg-emergency text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready for {serviceContent.title}?
              </h2>
              <p className="text-xl mb-8 text-red-100">
                Call now for fast, professional service from a licensed master plumber
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
                  href={`sms:${BUSINESS_INFO.sms}`}
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-emergency"
                >
                  Text Us Now
                </CTAButton>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </>
  );
}

