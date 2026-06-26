'use client';

import Head from 'next/head';
import { SEO } from '@/constants/app';

interface SEOMetadataProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  locale?: string;
  noindex?: boolean;
  canonical?: string;
}

export default function SEOMetadata({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  siteName = SEO.SITE_NAME,
  locale = 'en_US',
  noindex = false,
  canonical,
}: SEOMetadataProps) {
  const pageTitle = title ? `${title} | ${SEO.DEFAULT_TITLE}` : SEO.DEFAULT_TITLE;
  const pageDescription = description || SEO.DEFAULT_DESCRIPTION;
  const pageImage = image || SEO.DEFAULT_IMAGE;
  const pageUrl = url || SEO.DEFAULT_URL;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={keywords || 'Cincinnati Tamil Sangam, Tamil culture, Cincinnati, Tamil community, cultural events, Tamil language'} />
      <meta name="author" content={SEO.SITE_NAME} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      <meta name="twitter:site" content={SEO.TWITTER_HANDLE} />
      <meta name="twitter:creator" content={SEO.TWITTER_HANDLE} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#1976d2" />
      <meta name="msapplication-TileColor" content="#1976d2" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={SEO.SITE_NAME} />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': type === 'website' ? 'Organization' : 'WebPage',
            name: SEO.SITE_NAME,
            description: pageDescription,
            url: pageUrl,
            image: pageImage,
            sameAs: [
              'https://facebook.com/cincinnatitamil',
              'https://twitter.com/cincinnatitamil',
              'https://instagram.com/cincinnatitamil',
              'https://youtube.com/cincinnatitamil',
            ],
            address: {
              '@type': 'PostalAddress',
              streetAddress: '1234 Heritage Lane',
              addressLocality: 'Cincinnati',
              addressRegion: 'OH',
              postalCode: '45202',
              addressCountry: 'US',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '(513) 555-0123',
              contactType: 'customer service',
              email: 'info@cincinnatitamil.org',
            },
          }),
        }}
      />
    </Head>
  );
}

// Page-specific SEO components
export function HomePageSEO() {
  return (
    <SEOMetadata
      title="Home"
      description="Welcome to Cincinnati Tamil Sangam - Preserving and promoting Tamil culture and heritage in Cincinnati through cultural events, educational programs, and community activities."
      keywords="Tamil Sangam, Cincinnati, Tamil culture, cultural events, Tamil classes, community"
      type="website"
    />
  );
}

export function AboutPageSEO() {
  return (
    <SEOMetadata
      title="About Us"
      description="Learn about Cincinnati Tamil Sangam's mission, history, and commitment to preserving Tamil culture and heritage in the Cincinnati community."
      keywords="about Cincinnati Tamil Sangam, Tamil culture history, mission, values"
    />
  );
}

export function EventsPageSEO() {
  return (
    <SEOMetadata
      title="Events"
      description="Join Cincinnati Tamil Sangam for cultural events, festivals, workshops, and community gatherings celebrating Tamil heritage and traditions."
      keywords="Tamil events, cultural festivals, Pongal, Tamil New Year, workshops, community events"
    />
  );
}

export function MembershipPageSEO() {
  return (
    <SEOMetadata
      title="Membership"
      description="Become a member of Cincinnati Tamil Sangam and join our community dedicated to preserving Tamil culture through various membership options and benefits."
      keywords="Tamil membership, join Cincinnati Tamil Sangam, membership benefits, family membership"
    />
  );
}

export function DonatePageSEO() {
  return (
    <SEOMetadata
      title="Donate"
      description="Support Cincinnati Tamil Sangam's mission through your generous donations. Help us preserve and promote Tamil culture and heritage in Cincinnati."
      keywords="donate to Tamil Sangam, support Tamil culture, charitable donations, Cincinnati Tamil community"
    />
  );
}

export function ContactPageSEO() {
  return (
    <SEOMetadata
      title="Contact"
      description="Get in touch with Cincinnati Tamil Sangam. Find our contact information, location, and hours for all inquiries about our programs and events."
      keywords="contact Cincinnati Tamil Sangam, Tamil Sangam address, phone, email, location"
    />
  );
}
