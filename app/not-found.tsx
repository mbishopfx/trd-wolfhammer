import React from 'react';
import Link from 'next/link';
import { CTAButton } from '@/components/CTAButton';
import { WrenchIcon, PhoneRingingIcon } from '@/components/icons';
import { BUSINESS_INFO } from '@/lib/constants';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-200px)] bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-emergency bg-opacity-10 rounded-full mb-6">
          <WrenchIcon size={60} className="text-emergency" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold text-professional mb-4">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-bold text-professional mb-4">
          Oops! Page Not Found
        </h2>
        
        <p className="text-lg text-gray-600 mb-8">
          Looks like this pipe has sprung a leak! The page you&#39;re looking for doesn&#39;t exist or has been moved.
        </p>

        <div className="space-y-4 mb-8">
          <p className="text-gray-700 font-medium">
            But don&#39;t worry, we can still help with your plumbing needs:
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto">
            <Link
              href="/"
              className="bg-trust text-white px-6 py-3 rounded-full font-semibold hover:bg-trust-dark transition-all"
            >
              Go to Homepage
            </Link>
            <Link
              href="/#services"
              className="bg-gray-200 text-professional px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition-all"
            >
              View Services
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-300">
          <p className="text-lg text-gray-700 mb-4 font-semibold">
            Have a plumbing emergency?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton
              href={`tel:${BUSINESS_INFO.phone}`}
              variant="primary"
              size="lg"
              icon={<PhoneRingingIcon size={24} />}
            >
              Call {BUSINESS_INFO.phone}
            </CTAButton>
            <CTAButton
              href="/contact"
              variant="secondary"
              size="lg"
            >
              Contact Us
            </CTAButton>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Common pages you might be looking for:</p>
          <div className="flex flex-wrap justify-center gap-4 mt-3">
            <Link href="/services/emergency-plumbing" className="hover:text-trust transition-colors">
              Emergency Plumbing
            </Link>
            <span>•</span>
            <Link href="/services/water-heater-repair-installation" className="hover:text-trust transition-colors">
              Water Heaters
            </Link>
            <span>•</span>
            <Link href="/locations/cave-spring" className="hover:text-trust transition-colors">
              Cave Spring
            </Link>
            <span>•</span>
            <Link href="/about" className="hover:text-trust transition-colors">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

