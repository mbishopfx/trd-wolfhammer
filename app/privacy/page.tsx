import React from 'react';
import type { Metadata } from 'next';
import { BUSINESS_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy | Emergency Plumbing Services',
  description: 'Privacy policy for our plumbing services website.',
  robots: 'noindex, nofollow',
};

export default function PrivacyPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-professional mb-6">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-professional mt-8 mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-700 mb-4">
              When you use our website or contact us for services, we may collect:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Name and contact information (phone, email)</li>
              <li>Service request details</li>
              <li>Location information for service delivery</li>
              <li>Website usage data and analytics</li>
            </ul>

            <h2 className="text-2xl font-bold text-professional mt-8 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Provide plumbing services and respond to your requests</li>
              <li>Communicate about appointments and services</li>
              <li>Improve our website and services</li>
              <li>Send service updates and important information</li>
            </ul>

            <h2 className="text-2xl font-bold text-professional mt-8 mb-4">
              Information Sharing
            </h2>
            <p className="text-gray-700 mb-6">
              We do not sell, trade, or rent your personal information to third parties. We may
              share information only when required by law or to provide our services.
            </p>

            <h2 className="text-2xl font-bold text-professional mt-8 mb-4">
              Data Security
            </h2>
            <p className="text-gray-700 mb-6">
              We implement appropriate security measures to protect your personal information from
              unauthorized access, alteration, or disclosure.
            </p>

            <h2 className="text-2xl font-bold text-professional mt-8 mb-4">
              Your Rights
            </h2>
            <p className="text-gray-700 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Access your personal information</li>
              <li>Request corrections to your data</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <h2 className="text-2xl font-bold text-professional mt-8 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 mb-4">
              If you have questions about this privacy policy or your personal information, please
              contact us:
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong>{' '}
              <a href={`tel:${BUSINESS_INFO.phone}`} className="text-trust hover:underline">
                {BUSINESS_INFO.phone}
              </a>
              <br />
              <strong>Email:</strong>{' '}
              <a href={`mailto:${BUSINESS_INFO.email}`} className="text-trust hover:underline">
                {BUSINESS_INFO.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

