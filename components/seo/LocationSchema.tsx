import React from 'react';
import { generateLocationSchema } from '@/lib/seo-utils';

interface LocationSchemaProps {
  locationName: string;
  lat: number;
  lng: number;
  description: string;
}

export const LocationSchema: React.FC<LocationSchemaProps> = ({
  locationName,
  lat,
  lng,
  description,
}) => {
  const schema = generateLocationSchema(locationName, lat, lng, description);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

