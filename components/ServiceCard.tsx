'use client';

import React from 'react';
import Link from 'next/link';
import {
  WrenchIcon,
  WaterHeaterIcon,
  DrainIcon,
  LeakDetectorIcon,
  ToiletIcon,
  BathtubIcon,
  SumpPumpIcon,
  ProtectionIcon,
} from './icons';

interface ServiceCardProps {
  title: string;
  description: string;
  slug: string;
  icon: string;
  featured?: boolean;
}

const iconMap: { [key: string]: React.ComponentType<{ size?: number; className?: string }> } = {
  emergency: WrenchIcon,
  waterHeater: WaterHeaterIcon,
  drain: DrainIcon,
  leak: LeakDetectorIcon,
  toilet: ToiletIcon,
  remodel: BathtubIcon,
  sumpPump: SumpPumpIcon,
  protection: ProtectionIcon,
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  slug,
  icon,
  featured = false,
}) => {
  const IconComponent = iconMap[icon] || WrenchIcon;

  return (
    <Link href={`/services/${slug}`}>
      <div className={`bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all transform hover:-translate-y-1 h-full border-2 ${featured ? 'border-emergency' : 'border-transparent hover:border-trust'}`}>
        <div className="flex flex-col items-center text-center">
          <div className={`${featured ? 'bg-emergency' : 'bg-trust'} bg-opacity-10 p-4 rounded-full mb-4`}>
            <IconComponent size={40} className={featured ? 'text-emergency' : 'text-trust'} />
          </div>
          <h3 className="text-xl font-bold text-professional mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
          <div className="mt-4">
            <span className="text-trust font-semibold text-sm hover:underline">
              Learn More →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

