import React from 'react';
import { generateLocalBusinessSchema } from '@/lib/seo-utils';

export const LocalBusinessSchema: React.FC = () => {
  const schema = generateLocalBusinessSchema();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

