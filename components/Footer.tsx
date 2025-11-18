'use client';

import React from 'react';
import Link from 'next/link';
import {
  BUSINESS_INFO,
  SERVICES,
  LOCATIONS,
  CREDENTIALS,
} from '@/lib/constants';
import {
  PhoneRingingIcon,
  LocationPinIcon,
  ClockIcon,
  ShieldCheckIcon,
} from './icons';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-professional text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Services Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">Service Areas</h3>
            <ul className="space-y-2">
              {LOCATIONS.map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/locations/${location.slug}`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {location.name}, {location.state}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <PhoneRingingIcon size={20} className="mt-1 flex-shrink-0" />
                <div>
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                  <p className="text-xs text-gray-400 mt-1">
                    Click to call now
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <LocationPinIcon size={20} className="mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    Serving {BUSINESS_INFO.address} & Surrounding Areas
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <ClockIcon size={20} className="mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm font-medium">
                    {BUSINESS_INFO.hours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* About/Certifications Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <div className="space-y-3">
              <Link
                href="/about"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                About Our Company
              </Link>
              <Link
                href="/contact"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Contact Us
              </Link>
              <div className="pt-2">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <ShieldCheckIcon size={18} />
                  <span>Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300 mt-2">
                  <ShieldCheckIcon size={18} />
                  <span>{BUSINESS_INFO.experience} Experience</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300 mt-2">
                  <ShieldCheckIcon size={18} />
                  <span>1-Year Labor Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} {BUSINESS_INFO.name}. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/sitemap"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

