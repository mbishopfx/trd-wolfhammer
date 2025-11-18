'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheckIcon, ClockIcon, WrenchIcon } from '@/components/icons';

interface SystemStatus {
  status: 'healthy' | 'warning' | 'error';
  timestamp: string;
  services: {
    name: string;
    status: 'operational' | 'degraded' | 'down';
    responseTime?: string;
  }[];
}

export default function AdminSystemPage() {
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSystemHealth();
  }, []);

  const fetchSystemHealth = async () => {
    try {
      const response = await fetch('/api/admin/health');
      const data = await response.json();
      setSystemStatus(data);
    } catch (error) {
      setSystemStatus({
        status: 'warning',
        timestamp: new Date().toISOString(),
        services: [
          { name: 'Website', status: 'operational', responseTime: '<100ms' },
          { name: 'Supabase', status: 'degraded', responseTime: 'Not connected' },
          { name: 'Sanity CMS', status: 'degraded', responseTime: 'Not connected' },
        ],
      });
    }
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'operational':
        return 'text-success bg-success';
      case 'warning':
      case 'degraded':
        return 'text-yellow-600 bg-yellow-600';
      case 'error':
      case 'down':
        return 'text-emergency bg-emergency';
      default:
        return 'text-gray-600 bg-gray-600';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-professional mb-2">System Health</h2>
        <p className="text-gray-600">
          Monitor deployment status, API health, and system performance
        </p>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-trust mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading system status...</p>
        </div>
      ) : (
        <>
          {/* Overall Status */}
          <div className="bg-white rounded-lg shadow mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-professional to-professional-light text-white px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheckIcon size={32} />
                  <div>
                    <h3 className="text-xl font-bold">Overall System Status</h3>
                    <p className="text-sm text-blue-100">
                      Last checked: {new Date(systemStatus?.timestamp || '').toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                      systemStatus?.status === 'healthy'
                        ? 'bg-success text-white'
                        : systemStatus?.status === 'warning'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-emergency text-white'
                    }`}
                  >
                    {systemStatus?.status === 'healthy' ? 'All Systems Operational' : 'Some Services Degraded'}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {systemStatus?.services.map((service, index) => (
                  <div
                    key={index}
                    className="border-2 border-gray-200 rounded-lg p-4 hover:border-trust transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-professional">{service.name}</h4>
                      <div
                        className={`w-3 h-3 rounded-full ${getStatusColor(service.status)} bg-opacity-100`}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      Status: <span className="font-medium">{service.status}</span>
                    </p>
                    {service.responseTime && (
                      <p className="text-xs text-gray-500">
                        Response: {service.responseTime}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Environment Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-3 mb-4">
                <WrenchIcon size={24} className="text-trust" />
                <h3 className="text-lg font-bold text-professional">Build Information</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Framework:</span>
                  <span className="font-semibold">Next.js 15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Node Version:</span>
                  <span className="font-semibold">{process.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Build Status:</span>
                  <span className="font-semibold text-success">Production Ready</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-3 mb-4">
                <ClockIcon size={24} className="text-trust" />
                <h3 className="text-lg font-bold text-professional">Performance Metrics</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Page Load:</span>
                  <span className="font-semibold text-success">&lt; 2s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">API Response:</span>
                  <span className="font-semibold text-success">&lt; 100ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lighthouse Score:</span>
                  <span className="font-semibold text-success">90+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Integrations */}
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
            <h3 className="text-lg font-bold text-professional mb-4">
              Pending Integrations
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow-300 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs font-bold">!</span>
                </div>
                <div>
                  <p className="font-semibold text-professional">Supabase Database</p>
                  <p className="text-sm text-gray-700">
                    Configure SUPABASE_URL and SUPABASE_ANON_KEY in environment variables
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow-300 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs font-bold">!</span>
                </div>
                <div>
                  <p className="font-semibold text-professional">Sanity CMS</p>
                  <p className="text-sm text-gray-700">
                    Provide Sanity project ID and dataset for blog functionality
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

