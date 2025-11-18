import { BUSINESS_INFO } from './constants';

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

export function generatePageTitle(pageTitle: string): string {
  return `${pageTitle} | ${BUSINESS_INFO.name} | ${BUSINESS_INFO.address}`;
}

export function generateMetaDescription(description: string): string {
  return description.substring(0, 160);
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    name: BUSINESS_INFO.name,
    image: '/logo.png',
    '@id': process.env.NEXT_PUBLIC_SITE_URL || '',
    url: process.env.NEXT_PUBLIC_SITE_URL || '',
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '',
      addressLocality: 'Cave Spring',
      addressRegion: 'VA',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.2296,
      longitude: -79.9842,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    priceRange: '$$',
    areaServed: [
      {
        '@type': 'City',
        name: 'Cave Spring, VA',
      },
      {
        '@type': 'City',
        name: 'Roanoke, VA',
      },
      {
        '@type': 'City',
        name: 'Salem, VA',
      },
      {
        '@type': 'City',
        name: 'Hollins, VA',
      },
      {
        '@type': 'City',
        name: 'Vinton, VA',
      },
    ],
  };
}

export function generateServiceSchema(serviceName: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    provider: {
      '@type': 'Plumber',
      name: BUSINESS_INFO.name,
      telephone: BUSINESS_INFO.phone,
      email: BUSINESS_INFO.email,
    },
    areaServed: {
      '@type': 'State',
      name: 'Virginia',
    },
    description: description,
    url: url,
  };
}

export function generateLocationSchema(
  locationName: string,
  lat: number,
  lng: number,
  description: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/locations/${locationName.toLowerCase().replace(' ', '-')}`,
    name: `${BUSINESS_INFO.name} - ${locationName}`,
    description: description,
    telephone: BUSINESS_INFO.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: locationName,
      addressRegion: 'VA',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: lat,
      longitude: lng,
    },
  };
}

