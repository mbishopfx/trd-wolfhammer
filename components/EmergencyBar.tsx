'use client';

import React from 'react';
import { PhoneRingingIcon, Badge247Icon } from './icons';
import { BUSINESS_INFO } from '@/lib/constants';

export const EmergencyBar: React.FC = () => {
  const handleCall = () => {
    window.location.href = `tel:${BUSINESS_INFO.phone}`;
  };

  return (
    <div className="bg-emergency text-white py-2 px-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge247Icon size={20} className="text-white" />
          <span className="text-sm font-medium hidden sm:inline">
            24/7 Emergency Plumbing Service
          </span>
          <span className="text-sm font-medium sm:hidden">
            24/7 Emergency
          </span>
        </div>
        <button
          onClick={handleCall}
          className="flex items-center gap-2 bg-white !text-black px-4 py-1.5 rounded-full font-bold text-sm hover:bg-gray-100 transition-all transform hover:scale-105 animate-pulse-emergency"
        >
          <PhoneRingingIcon size={18} className="text-emergency" />
          <span>{BUSINESS_INFO.phone}</span>
        </button>
      </div>
    </div>
  );
};

