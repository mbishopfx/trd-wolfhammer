'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SERVICES, LOCATIONS, BUSINESS_INFO } from '@/lib/constants';
import { PhoneRingingIcon } from './icons';

export const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="WOLFHAMMER PLUMBING Logo"
              width={60}
              height={60}
              className="h-14 w-14"
            />
            <span className="ml-3 text-lg sm:text-xl font-bold text-black">
              WOLFHAMMER PLUMBING
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Services Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="text-professional hover:text-trust font-medium transition-colors">
                Services
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg py-2 z-50">
                  {SERVICES.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="block px-4 py-2 text-sm text-professional hover:bg-gray-50 hover:text-trust transition-colors"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Locations Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setLocationsOpen(true)}
              onMouseLeave={() => setLocationsOpen(false)}
            >
              <button className="text-professional hover:text-trust font-medium transition-colors">
                Service Areas
              </button>
              {locationsOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                  {LOCATIONS.map((location) => (
                    <Link
                      key={location.slug}
                      href={`/locations/${location.slug}`}
                      className="block px-4 py-2 text-sm text-professional hover:bg-gray-50 hover:text-trust transition-colors"
                    >
                      {location.name}, {location.state}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="text-professional hover:text-trust font-medium transition-colors"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="text-professional hover:text-trust font-medium transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Emergency Call Button (Desktop) */}
          <div className="hidden lg:block">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center gap-2 bg-emergency text-white px-6 py-3 rounded-full font-bold hover:bg-emergency-dark transition-all transform hover:scale-105"
            >
              <PhoneRingingIcon size={20} />
              <span>Emergency Service</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-professional hover:bg-gray-100"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/"
              className="block text-professional hover:text-trust font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            {/* Services */}
            <div>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="w-full text-left text-professional hover:text-trust font-medium py-2"
              >
                Services
              </button>
              {servicesOpen && (
                <div className="pl-4 space-y-2 mt-2">
                  {SERVICES.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="block text-sm text-professional hover:text-trust py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Locations */}
            <div>
              <button
                onClick={() => setLocationsOpen(!locationsOpen)}
                className="w-full text-left text-professional hover:text-trust font-medium py-2"
              >
                Service Areas
              </button>
              {locationsOpen && (
                <div className="pl-4 space-y-2 mt-2">
                  {LOCATIONS.map((location) => (
                    <Link
                      key={location.slug}
                      href={`/locations/${location.slug}`}
                      className="block text-sm text-professional hover:text-trust py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {location.name}, {location.state}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="block text-professional hover:text-trust font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>

            <Link
              href="/contact"
              className="block text-professional hover:text-trust font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Mobile Emergency Button */}
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center justify-center gap-2 bg-emergency text-white px-6 py-3 rounded-full font-bold mt-4"
            >
              <PhoneRingingIcon size={20} />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

