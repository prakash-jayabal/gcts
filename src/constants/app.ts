// Application constants and configuration

export const APP_CONFIG = {
  name: 'Cincinnati Tamil Sangam',
  description: 'Preserving and promoting Tamil culture and heritage in Cincinnati',
  url: 'https://cincinnatitamil.org',
  version: '1.0.0',
  author: 'Cincinnati Tamil Sangam',
} as const;

export const CONTACT_INFO = {
  email: 'info@cincinnatitamil.org',
  phone: '(513) 555-0123',
  address: '1234 Heritage Lane, Cincinnati, OH 45202',
} as const;

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/cincinnatitamil',
  twitter: 'https://twitter.com/cincinnatitamil',
  instagram: 'https://instagram.com/cincinnatitamil',
  youtube: 'https://youtube.com/cincinnatitamil',
} as const;

export const MEMBERSHIP_TYPES = {
  INDIVIDUAL: 'individual',
  FAMILY: 'family',
  STUDENT: 'student',
  LIFETIME: 'lifetime',
} as const;

export const MEMBERSHIP_PRICES = {
  [MEMBERSHIP_TYPES.INDIVIDUAL]: 50,
  [MEMBERSHIP_TYPES.FAMILY]: 100,
  [MEMBERSHIP_TYPES.STUDENT]: 25,
  [MEMBERSHIP_TYPES.LIFETIME]: 1000,
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  MEMBER: 'member',
  VOLUNTEER: 'volunteer',
  GUEST: 'guest',
} as const;

export const EVENT_CATEGORIES = {
  CULTURAL: 'cultural',
  EDUCATIONAL: 'education',
  SOCIAL: 'social',
  FUNDRAISING: 'fundraising',
  YOUTH: 'youth',
} as const;

export const DONATION_TYPES = {
  ONE_TIME: 'one-time',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly',
} as const;

export const VOLUNTEER_SKILLS = [
  'Teaching',
  'Event Planning',
  'Photography',
  'Tamil Language',
  'Music',
  'Dance',
  'Leadership',
  'Administration',
  'Communication',
  'Youth Mentoring',
] as const;

export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

export const BREAKPOINTS = {
  XS: 0,
  SM: 600,
  MD: 900,
  LG: 1200,
  XL: 1536,
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const;

export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\(\d{3}\)\s\d{3}-\d{4}$/,
  ZIP_REGEX: /^\d{5}(-\d{4})?$/,
} as const;

export const ACCESSIBILITY = {
  SKIP_TO_CONTENT_ID: 'skip-to-content',
  MAIN_CONTENT_ID: 'main-content',
  ANNOUNCEMENT_ID: 'announcement',
} as const;

export const SEO = {
  DEFAULT_TITLE: APP_CONFIG.name,
  DEFAULT_DESCRIPTION: APP_CONFIG.description,
  DEFAULT_IMAGE: '/images/og-image.jpg',
  DEFAULT_URL: APP_CONFIG.url,
  SITE_NAME: APP_CONFIG.name,
  TWITTER_HANDLE: '@cincinnatitamil',
} as const;
