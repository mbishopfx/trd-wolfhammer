'use client';

import React from 'react';
import Link from 'next/link';
import { BreadcrumbItem } from '@/lib/seo-utils';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={item.url} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-400">/</span>
            )}
            {index === items.length - 1 ? (
              <span className="text-gray-600 font-medium">{item.name}</span>
            ) : (
              <Link
                href={item.url}
                className="text-trust hover:text-trust-dark transition-colors"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

