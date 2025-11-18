'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  PhoneRingingIcon,
  ShieldCheckIcon,
  ClockIcon,
  WrenchIcon,
} from '@/components/icons';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Check if already authenticated
    const adminToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('admin_token='))
      ?.split('=')[1];

    if (adminToken) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        document.cookie = `admin_token=${data.token}; path=/; max-age=86400`; // 24 hours
        setIsAuthenticated(true);
      } else {
        setError(data.error || 'Invalid password');
      }
    } catch (err) {
      setError('Authentication failed');
    }
  };

  const handleLogout = () => {
    document.cookie = 'admin_token=; path=/; max-age=0';
    setIsAuthenticated(false);
    setPassword('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-trust mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-professional to-professional-light">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-trust bg-opacity-10 rounded-full mb-4">
              <ShieldCheckIcon size={32} className="text-trust" />
            </div>
            <h1 className="text-3xl font-bold text-professional mb-2">
              Admin Access
            </h1>
            <p className="text-gray-600">Enter password to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-trust"
                placeholder="Enter admin password"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-emergency bg-opacity-10 border border-emergency rounded-lg">
                <p className="text-emergency text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-trust text-white px-6 py-3 rounded-full font-bold hover:bg-trust-dark transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: '/admin/leads', label: 'Leads', icon: PhoneRingingIcon },
    { href: '/admin/blog', label: 'Blog', icon: WrenchIcon },
    { href: '/admin/system', label: 'System Health', icon: ClockIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-professional text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-white text-professional px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <nav className="mb-8 flex space-x-2 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-trust text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Page Content */}
        <div>{children}</div>
      </div>
    </div>
  );
}

