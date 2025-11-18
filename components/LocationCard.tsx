'use client';

import React from 'react';
import Link from 'next/link';
import { LocationPinIcon } from './icons';

interface LocationCardProps {
  name: string;
  state: string;
  slug: string;
  description: string;
}

export const LocationCard: React.FC<LocationCardProps> = ({
  name,
  state,
  slug,
  description,
}) => {
  return (
    <Link href={`/locations/${slug}`}>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all transform hover:-translate-y-1 h-full border-2 border-transparent hover:border-trust">
        <div className="flex flex-col items-center text-center">
          <div className="bg-trust bg-opacity-10 p-4 rounded-full mb-4">
            <LocationPinIcon size={32} className="text-trust" />
          </div>
          <h3 className="text-xl font-bold text-professional mb-1">
            {name}, {state}
          </h3>
          <p className="text-gray-600 text-sm mt-2">{description}</p>
          <div className="mt-4">
            <span className="text-trust font-semibold text-sm hover:underline">
              View Service Area →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

