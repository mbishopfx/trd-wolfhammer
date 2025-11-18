import React from 'react';
import { NextSeo } from 'next-seo';
import { generatePageTitle, generateMetaDescription, SEOProps } from '@/lib/seo-utils';

export const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  ogImage = '/logo.png',
  noindex = false,
}) => {
  const fullTitle = generatePageTitle(title);
  const metaDescription = generateMetaDescription(description);

  return (
    <NextSeo
      title={fullTitle}
      description={metaDescription}
      canonical={canonical}
      noindex={noindex}
      openGraph={{
        title: fullTitle,
        description: metaDescription,
        url: canonical,
        type: 'website',
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      }}
      twitter={{
        cardType: 'summary_large_image',
      }}
    />
  );
};

