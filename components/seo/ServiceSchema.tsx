import React from 'react';
import { generateServiceSchema } from '@/lib/seo-utils';

interface ServiceSchemaProps {
  serviceName: string;
  description: string;
  url: string;
}

export const ServiceSchema: React.FC<ServiceSchemaProps> = ({
  serviceName,
  description,
  url,
}) => {
  const schema = generateServiceSchema(serviceName, description, url);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

