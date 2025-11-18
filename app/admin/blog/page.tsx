'use client';

import React from 'react';
import { WrenchIcon, ClockIcon } from '@/components/icons';

export default function AdminBlogPage() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-professional mb-2">Blog Management</h2>
        <p className="text-gray-600">
          Manage blog posts and content via Sanity CMS
        </p>
      </div>

      {/* Sanity Integration Notice */}
      <div className="bg-gradient-to-br from-professional to-professional-light text-white rounded-xl p-8 mb-8">
        <div className="flex items-start gap-4">
          <WrenchIcon size={48} className="flex-shrink-0 opacity-80" />
          <div>
            <h3 className="text-2xl font-bold mb-3">
              Awaiting Sanity CMS Integration
            </h3>
            <p className="text-blue-100 mb-4">
              This page will provide blog post management once Sanity CMS credentials are configured.
              The system is ready for integration - just provide the API details.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Overview */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-bold text-professional mb-4">
            Planned Blog Features
          </h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-trust font-bold">✓</span>
              <span>Auto-post new content from Sanity</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-trust font-bold">✓</span>
              <span>SEO-optimized blog pages</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-trust font-bold">✓</span>
              <span>Category and tag management</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-trust font-bold">✓</span>
              <span>Draft and publish workflow</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-trust font-bold">✓</span>
              <span>Image optimization and CDN</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-trust font-bold">✓</span>
              <span>Scheduled publishing</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-bold text-professional mb-4">
            Content Strategy
          </h4>
          <div className="space-y-3 text-gray-700">
            <div>
              <p className="font-semibold text-professional">Recommended Topics:</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Winter plumbing tips for Roanoke</li>
                <li>• When to replace your water heater</li>
                <li>• Signs you need a plumber</li>
                <li>• DIY vs professional plumbing</li>
                <li>• Maintaining older home plumbing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Instructions */}
      <div className="bg-white rounded-lg shadow p-8">
        <h4 className="text-lg font-bold text-professional mb-4 flex items-center gap-2">
          <ClockIcon size={24} className="text-trust" />
          Integration Checklist
        </h4>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-xs">1</span>
            </div>
            <div>
              <p className="font-semibold text-professional">Set up Sanity Studio</p>
              <p className="text-sm text-gray-600">Create Sanity project and configure schemas</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-xs">2</span>
            </div>
            <div>
              <p className="font-semibold text-professional">Add environment variables</p>
              <p className="text-sm text-gray-600">NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-xs">3</span>
            </div>
            <div>
              <p className="font-semibold text-professional">Configure webhooks</p>
              <p className="text-sm text-gray-600">Set up auto-sync from Sanity to this dashboard</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-xs">4</span>
            </div>
            <div>
              <p className="font-semibold text-professional">Test integration</p>
              <p className="text-sm text-gray-600">Create test post and verify auto-publish</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

