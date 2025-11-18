import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SERVICES, LOCATIONS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Sitemap | Emergency Plumbing Services',
  description: 'Complete sitemap of our plumbing services website.',
};

export default function SitemapPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-professional mb-8">Sitemap</h1>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Pages */}
            <div>
              <h2 className="text-xl font-bold text-professional mb-4">Main Pages</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-trust hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-trust hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-trust hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h2 className="text-xl font-bold text-professional mb-4">Services</h2>
              <ul className="space-y-2">
                {SERVICES.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-trust hover:underline"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Locations */}
            <div>
              <h2 className="text-xl font-bold text-professional mb-4">Service Areas</h2>
              <ul className="space-y-2">
                {LOCATIONS.map((location) => (
                  <li key={location.slug}>
                    <Link
                      href={`/locations/${location.slug}`}
                      className="text-trust hover:underline"
                    >
                      {location.name}, {location.state}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

